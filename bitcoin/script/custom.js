$( document ).ready(function() {
	var code = $("#script")[0];
	var editor = CodeMirror.fromTextArea(code, {
		lineNumbers : false,
		lineWrapping : true,
		theme : "monokai",
	});

	var code2 = $("#asm")[0];
	var editor2 = CodeMirror.fromTextArea(code2, {
		lineNumbers : false,
		lineWrapping : true,
		theme : "monokai",
	});

	editor.setSize("100%", null);
	editor.setValue("// Push header hash -- (0x20 bytes)\n0xAF42031E805FF493A07341E2F74FF58149D22AB9BA19F61343E2C86C71C5D66D\n// Hash digest (original header popped from stack) -- (0xA8 hex flag)\nOP_SHA256\n// Push expected result (expected will become 2nd stack item) -- (0x20 bytes)\n0x6fe28c0ab6f1b372c1a6a246ae63f74f931e8365e15a089c68d6190000000000\n// Compare top 2 items in stack, 1 if true -- (0x9C hex flag)\nOP_NUMEQUAL");

	function interpretScript( input ){
		// Remove comments + whitespace
		input = input.replace(/\/\/.*/g, "");
		input = input.replace(/\r?\n|\r/g, " ");
		input = input.replace(/\b\s+\b/g, " ");

		var separator	= input.split(" ");
		var assembly	= "";

		separator.forEach(function( element ){
			//try {
				if( element == "" || element == " " || element == null ){
					console.log("null element?");
					return;
				}

				if( element.toLowerCase().startsWith( "0x" ) ){
					var len 	= element.substr( 2, element.length ).length;
					var bytes 	= len / 2;

					if( bytes % 1 > 0 ){
						throw "Odd hexadecimal digits, something is probably wrong...";
					}

					// Append number of bytes to push
					assembly += '0x' + bytes.toString(16).padStart(2, '0') + ' ';
					// Append bytes
					assembly += '0x' + element.toLowerCase().substr(2, element.length) + ' ';

					return;
				}

				var temp_asm = eval( element );	
				temp_asm = temp_asm.toString( 16 );

				assembly += '0x';
				assembly += temp_asm;
				assembly += ' ';
			//}
			//catch( error ) {
			//	console.log( "Error" );
			//}
		});

		return assembly;
	}

	function getOPName( input ){
		return ( GetOPName[ input ] || input );
	}

	function prependStackItem( text, empty ){
		if( empty ){
			$( "#stack_vis" ).empty();
			$( "#stack_vis" ).prepend("<hr/>");
		}

		if( text != null ){
			var to_add = "<h5>" + text + "</h5>";
			$(to_add).hide().prependTo("#stack_vis").fadeIn(500);
			$( "#stack_vis" ).prepend("<hr/>");
		}
	}

	function stacktop( i, stack ){
		return stack[stack.size() + i];
	}

	class CScriptNum {
		constructor( n, fRequireMinimal = null, nMaxNumSize = 4 ){
			if( fRequireMinimal != null ){
				if( n.length > nMaxNumSize ){
					throw "script number overflow";
				}

				if( fRequireMinimal && n.length > 0 ){
					if( ( n.back() & 0x7F ) == 0 ){
						if( n.size() <= 1 || ( n[n.size() - 2] & 0x80 ) == 0 ){
							throw "non-minimally encoded script number";
						}
					}
				}

				this.m_value = set_vch( n );
				return;
			}

			this.m_value = n;
		}

		set_vch( vch ){
		    if (vch.empty())
		        return 0;

		    var result = 0;
		    for (i = 0; i != vch.size(); ++i)
		        result |= vch[i] << 8*i;

		    // If the input vector's most significant byte is 0x80, remove it from
		    // the result's msb and return a negative.
		    if (vch.back() & 0x80)
		        return -((result & ~(0x80 << (8 * (vch.size() - 1)))));

		    return result;
		}

		serialize( value ){
			if( value == 0 )
				return [];

			var result = [];
			var neg = value < 0;
			var absvalue = neg ? -value : value;

			while( absvalue ){
				result.push_back( absvalue & 0xFF );
				absvalue >>= 8;
			}

			if( result[result.length - 1] & 0x80 )
				result.push_back(neg ? 0x80 : 0 );
			else if( neg )
				result[result.length - 1] |= 0x80;

			return result;
		}

		getvch(){
			return this.serialize( this.m_value );
		}
    }

	Array.prototype.count = function(lit = false) {
	    if ( !lit ) { return this.length}
	    else {
	        var count = 0;
	        for ( var i=0; i < this.length; i++ ) {
	            if ( lit == this[i] ){
	                count++
	            }
	        }
	        return count;
	    }
	}

	Array.prototype.back = function(){
		return this.peekBack();
	}

	Array.prototype.size = function(){
		return this.length;
	}

	Array.prototype.empty = function(){
		return this.length == 0;
	}

	Array.prototype.popstack = function(){
		if( this.empty() )
			throw "popstack(): stack empty";

		removeStackItem();
		return this.pop();
	}

	Array.prototype.push_back = function( x, str = false ){
		addStackItem( x );
		addStackItem( x, true );

		if( str ){
			this.push( x );
			return;
		}

		this.push( parseInt( x ) );
	}

	Array.prototype.stacktop = function( i ){
		return this[this.length + i];
	}

	Array.prototype.assign = function( i, y ){
		for( var x = 0; x < i; x++ ){
			this[x] = y;
		}
	}

	function printStack( stack, notes = "", type = "STACK" ){
		for( var i = 0; i < stack.size(); i++ ){
			console.log( type + "_DEBUG: [" + notes + "] [" + i + "] " + stack[i] );
		}
	}

	function evaluateScript( stack, script ){ //, flags, sigversion, serror ){
		var script_decode = interpretScript( script ).split( " " );
		script = [];

		// Empty animated stacks
		$( "#stack_vis" ).empty();
		$( "#stack_vis_log" ).empty();

		script_decode.forEach(function( element, index ){
			
			if( element == "" || element == " " || element == null ){
				return;
			}

			var pInt = parseInt( element );
			
			if( pInt > MAX_OPCODE )
				script[ index ] = element.substring( 2, element.length );
			else
				script[ index ] = pInt;
		});

		const bnOne 	= 1;
		const bnZero 	= 0;
		var pbegincode 	= stack[ 0 ];
		var pend 		= stack[ stack.length - 1 ];
		var pushNextData = false;

		// Script initial -------------------------------
		// printStack( script, "SCRIPT INITIAL", "SCRIPT" );
		// Script initial -------------------------------

		script.forEach( function( opcode, index ){
			setTimeout( function() {
			
			if( pushNextData ){
				stack.push_back( opcode, true );
				pushNextData = false;
			}

			if( 0 <= opcode && opcode <= OP_PUSHDATA4 ){
				pushNextData = true;
			}

			if( GetOPName[ opcode ] && ( opcode <= 0x51 || opcode > 0x60 ) ){
				addStackItem( GetOPName[ opcode ], true );
			}

			switch( opcode ){
				/* Disabled OP_ Codes */
				case OP_CAT:
				case OP_SUBSTR:
				case OP_LEFT:
				case OP_RIGHT:
				case OP_INVERT:
				case OP_AND:
				case OP_OR:
				case OP_XOR:
				case OP_2MUL:
				case OP_2DIV:
				case OP_MUL:
				case OP_DIV:
				case OP_MOD:
				case OP_LSHIFT:
				case OP_RSHIFT:
					throw "SCRIPT_ERR_DISABLED_OPCODE";
					break;
				case OP_NOP:
					break;
				case OP_1NEGATE:
				case OP_1:
				case OP_2:
				case OP_3:
				case OP_4:
				case OP_5:
				case OP_6:
				case OP_7:
				case OP_8:
				case OP_9:
				case OP_10:
				case OP_11:
				case OP_12:
				case OP_13:
				case OP_14:
				case OP_15:
				case OP_16:
				{
					var x = ( parseInt( opcode ) - parseInt( OP_1 - 1 ) );
					stack.push_back( x );
				}
				break;

                //
                // Numeric
                //

                case OP_1ADD:
                case OP_1SUB:
                case OP_NEGATE:
                case OP_ABS:
                case OP_NOT:
                case OP_0NOTEQUAL:
                {
                    // (in -- out)
                    if (stack.size() < 1)
                        throw "SCRIPT_ERR_INVALID_STACK_OPERATION";

                    var bn = stacktop( -1, stack );

                    switch ( opcode )
                    {
                    case OP_1ADD:       bn += bnOne; break;
                    case OP_1SUB:       bn -= bnOne; break;
                    case OP_NEGATE:     bn = -bn; break;
                    case OP_ABS:        if (bn < bnZero) bn = -bn; break;
                    case OP_NOT:        bn = Number(bn == bnZero); break;
                    case OP_0NOTEQUAL:  bn = Number(bn != bnZero); break;
                    default:            throw("invalid opcode"); break;
                    }
                    stack.popstack();
                    stack.push_back( bn );
                }
                break;

                case OP_ADD:
                case OP_SUB:
                case OP_BOOLAND:
                case OP_BOOLOR:
                case OP_NUMEQUAL:
                case OP_NUMEQUALVERIFY:
                case OP_NUMNOTEQUAL:
                case OP_LESSTHAN:
                case OP_GREATERTHAN:
                case OP_LESSTHANOREQUAL:
                case OP_GREATERTHANOREQUAL:
                case OP_MIN:
                case OP_MAX:
                {
                    // (x1 x2 -- out)
                    if (stack.size() < 2)
                        throw "SCRIPT_ERR_INVALID_STACK_OPERATION";

                    var bn1 = stack.stacktop( -2 );
                    var bn2 = stack.stacktop( -1 );
                    var bn = 0;

                    switch (opcode)
                    {
                    	case OP_ADD:
                    		bn = bn1 + bn2;
                        	break;

                    	case OP_SUB:
                       		bn = bn1 - bn2;
                        	break;

                    	case OP_BOOLAND:             bn = Number(bn1 != bnZero && bn2 != bnZero); break;
                    	case OP_BOOLOR:              bn = Number(bn1 != bnZero || bn2 != bnZero); break;
                    	case OP_NUMEQUAL:            bn = Number(bn1 == bn2); break;
                    	case OP_NUMEQUALVERIFY:      bn = Number(bn1 == bn2); break;
                    	case OP_NUMNOTEQUAL:         bn = Number(bn1 != bn2); break;
                    	case OP_LESSTHAN:            bn = Number(bn1 < bn2); break;
                    	case OP_GREATERTHAN:         bn = Number(bn1 > bn2); break;
                    	case OP_LESSTHANOREQUAL:     bn = Number(bn1 <= bn2); break;
                    	case OP_GREATERTHANOREQUAL:  bn = Number(bn1 >= bn2); break;
                    	case OP_MIN:                 bn = Number(bn1 < bn2 ? bn1 : bn2); break;
                    	case OP_MAX:                 bn = Number(bn1 > bn2 ? bn1 : bn2); break;
                    	default:                     throw("invalid opcode"); break;
                    }

                    stack.popstack();
                    stack.popstack();
                    stack.push_back( bn );

                    printStack( stack, "Numeric operation" );

                    if (opcode == OP_NUMEQUALVERIFY)
                    {
                        if ( stack.stacktop( -1 ) )
                            stack.popstack();
                        else
                            throw "SCRIPT_ERR_NUMEQUALVERIFY";
                    }
                }
                break;
                case OP_WITHIN:
                {
                    // (x min max -- out)
                    if (stack.size() < 3)
                        throw "SCRIPT_ERR_INVALID_STACK_OPERATION";
                    
                    var bn1 = stack.stacktop( -3 );
                    var bn2 = stack.stacktop( -2 );
                    var bn3 = stack.stacktop( -1 );
                    var fValue = (bn2 <= bn1 && bn1 < bn3);
                    stack.popstack();
                    stack.popstack();
                    stack.popstack();
                    stack.push_back(fValue ? 1 : 0);
                }
                break;


                //
                // Crypto
                //
                case OP_RIPEMD160:
                case OP_SHA1:
                case OP_SHA256:
                case OP_HASH160:
                case OP_HASH256:
                {
                    // (in -- hash)
                    if (stack.size() < 1)
                        throw "SCRIPT_ERR_INVALID_STACK_OPERATION";
                    var vch = stack.stacktop( -1 );
                    var hashType = ( ( opcode == OP_RIPEMD160 || opcode == OP_SHA1 || opcode == OP_HASH160 ) ? 20 : 32 );
                    var vchHash = 0x00;
                    var encoded = CryptoJS.enc.Hex.parse( vch );

                    if (opcode == OP_RIPEMD160)
                    	vchHash = CryptoJS.RIPEMD160( encoded );
                    else if (opcode == OP_SHA1)
                    	vchHash = CryptoJS.SHA1( encoded );
                    else if (opcode == OP_SHA256)
                    	vchHash = CryptoJS.SHA256( encoded );
                    else if (opcode == OP_HASH160)
                    	vchHash = CryptoJS.RIPEMD160( CryptoJS.SHA256( encoded ) );
                    else if (opcode == OP_HASH256)
                    	vchHash = CryptoJS.SHA256( CryptoJS.SHA256( encoded ) );
                    
                    stack.popstack();
                    stack.push_back(vchHash, true); // Too large for pushing as int
                }
                break;
                case OP_CHECKSIG:
                case OP_CHECKSIGVERIFY:
                {
                    // (sig pubkey -- bool)
                    if (stack.size() < 2)
                        throw "SCRIPT_ERR_INVALID_STACK_OPERATION";

                    var vchSig    = stack.stacktop( -2 );
                    var vchPubKey = stack.stacktop( -1 );

                    // Disabled for now
                }
                break;
			}
			}, index * 1000 );
		});
		
		printStack(stack, "RESULT");
	}


	function addStackItem( item, log = false ){
		var id = "#stack_vis";
		var idx = $( ".stackItem" ).length;

		if( log ){
			idx = -1;
			id = "#stack_vis_log";
		}

		var to_add = "<h5 class='stackItem' id='" + idx + "'>" + item + "</h5>";
		$(to_add).hide().prependTo(id).fadeIn(500);
	}

	function removeStackItem( ){
		$("#stack_vis .stackItem:first-child").last().remove();
	}

	function playStackAnim( script ){
		var stack = [];
		evaluateScript( stack, script );
	}

	$( "#asmConv" ).click(function() {
		var script = editor.getValue();
		var asm = interpretScript( script );
		editor2.setValue( asm );
		playStackAnim( script );
	});

	$( "#stackAnim" ).click(function() {
		var script = editor.getValue();
		playStackAnim( script );
	});
});