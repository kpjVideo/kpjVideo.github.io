function changeText( obj, text ){
	$(obj).text( text );
	$(obj).removeClass( "blinking" );
	setTimeout(function(){
		$(obj).addClass( "blinking" );
	},1);
}

function getSpeed( ){
	return( 50 - $("#sSpeed").val() );
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const K = [
	0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5, 0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
	0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3, 0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
	0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC, 0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
	0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7, 0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
	0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13, 0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
	0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3, 0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
	0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5, 0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
	0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208, 0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
];

/*
	Ch( $x, $y, $z )
	Description: Choose function defined by NSA/Department of Commerce ( x AND y ) XOR ( ( NOT x ) AND z )
*/
function Ch( x, y, z ){
	return ( ( x & y ) ^ ( ( ~x ) & z ) );
}

/*
	Maj( $x, $y, $z )
	Description: Majority function defined by NSA/Department of Commerce ( x AND y ) XOR ( x AND z ) XOR ( y AND z )
*/
function Maj( x, y, z ){
	return ( ( x & y ) ^ ( x & z ) ^ ( y & z ) );
}

/*
	ROTR( $x, $t )
	Description: Rotate-right function defined by NSA/Department of Commerce (circular bitshift right T times)  
*/
function ROTR( x, t ){
	return( ( x >>> t ) | ( x << ( 32 - t ) ) ) >>> 0;
}

/*
	SHR( $x, $t )
	Description: Rotate-right function defined by Department of Commerce (right shift T times)  
*/
function SHR( x, t ){
	return ( x >>> t );
}

/*
	Σ0( $x )
	Description: Σ0 (Big-Sigma0) function defined by Department of Commerce ( ROTR( x, 2 ) XOR ROTR( x, 13 ) XOR ROTR( x, 22 ) )
*/
function Σ0( x ){
	var s0 = ROTR( x, 2 );
	var s1 = ROTR( x, 13 );
	var s2 = ROTR( x, 22 );

	return ( s0 ^ s1 ^ s2 );
}

/*
	Σ1( $x )
	Description: Σ1 (Big-Sigma1) function defined by Department of Commerce ( ROTR( x, 6 ) XOR ROTR( x, 11 ) XOR ROTR( x, 25 ) )
*/
function Σ1( x ){
	return ( ROTR( x, 6 ) ^ ROTR( x, 11 ) ^ ROTR( x, 25 ) );
}

/*
	σ0( $x )
	Description: σ0 (little-sigma0) function defined by Department of Commerce ( ROTR( x, 7 ) XOR ROTR( x, 18 ) XOR SHR( x, 3 ) )
*/
function σ0( x ){
	return ( ROTR( x, 7 ) ^ ROTR( x, 18 ) ^ SHR( x, 3 ) );
}

/*
	σ1( $x )
	Description: σ1 (little-sigma1) function defined by Department of Commerce ( ROTR( x, 17 ) XOR ROTR( x, 19 ) XOR SHR( x, 10 ) )
*/
function σ1( x ){
	return ( ROTR( x, 17 ) ^ ROTR( x, 19 ) ^ SHR( x, 10 ) );
}

/*
	padLength( $x )
	Description: Returns number of zeros required to make string a length in a multiple of 512
*/
function padLength( x, numBlocks ){
	var k = ( 512 * ( numBlocks - 1 ) + 447 - ( 8 * x.length ) );

	return k;
}

function hex2bin( hex ){
	return( parseInt( hex, 16 ).toString( 2 ) ).padStart( 8, '0' );
}

function dec2bin( dec ){
	return( dec >>> 0 ).toString( 2 );
}

function pad(n, width, z) {
	z = z || '0';
	n = n + '';
	return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function toPaddedHexString(num, len) {
    str = num.toString(16);
    return "0".repeat(len - str.length) + str;
}

/*
	messageBinary( $str )
	Description: Returns the binary representation of our string input
*/
function messageBinary( str ){
	var msg = "";

	for( var i = 0; i < str.length; i++ ){
		var hex = str[i].charCodeAt(0).toString(16);
		msg += hex2bin( hex );
	}

	return msg;
}
	
/*
	messageStruct( $str )
	Description: Returns the padded out binary (string in binary + 1 seperator + padding zeros + 64 bit length of binary before seperator)
*/
function messageStruct( str, numBlocks ){
	var m = messageBinary( str );
	var l = m.length;
	m += "1";

	for( var i = 0; i < padLength( str, numBlocks ); i++ ){
		m += "0";
	}

	m += pad( dec2bin( l ), 64 );

	return m;
}

/*
	messageScheduler( $str, &$h )
	bit mask is used several times to prevent integer overflow on systems higher than 32 bits
*/
async function messageScheduler( str ){
	var hash 		= 0x00000000;
	var numBlocks 	= Math.floor( 1 + ( ( ( 8 * str.length ) + 16 + 64 ) / 512 ) );
	var x 			= messageStruct( str, numBlocks );

	// 8 working variable constants (fractional portion of square root of first 8 prime numbers)
	var hInit = [
		0x6A09E667, 0xBB67AE85, 0x3C6EF372, 0xA54FF53A, 0x510E527F, 0x9B05688C, 0x1F83D9AB, 0x5BE0CD19
	];

	var A, B, C, D, E, F, G, H;

	// Iterate for X amount of chunks (for each time our binary input meets 512 bits)
	for( var chunk = 0; chunk < numBlocks; chunk++ ){
		var M = [];

		$(".mSch").text("Message Scheduler (" + ( chunk + 1 ) + "/" + numBlocks + ")");
		// Define our 64-entry message schedule array (32 bit words)
		for( var i = ( 512 * chunk ); i < ( 512 * ( chunk + 1 ) ); i += 32 ){
			M.push(x.substring( i, i + 32 ));
		}

		// Create a fixed length array for our working values
		var W = [];

		// Copy chunk into first 16 words [0..15] of the message scheduler array
		for( var i = 0; i < 16; i++ ){
			changeText( '.iter', '0x' + pad( i.toString( 16 ).toUpperCase(), 2 ) );
			await sleep(getSpeed());

			n = parseInt( M[ i ], 2 );
			W[i] = n;

			var t = ".m" + i;
			changeText( t, '0x' + pad( n.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
		}

		// Remaining [16..63] all defined on page 22 of FIPS 180-4
		for( var i = 16; i < 64; i++ ){
			changeText( '.iter', '0x' + pad( i.toString( 16 ).toUpperCase(), 2 ) );
			await sleep(getSpeed());

			// run littleSigma0 on word 15 before current
			var s0 = σ0( W[ i - 15 ] ) >>> 0;
			changeText( ".s0_data", '0x' + pad( s0.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());

			// run littleSigma1 on word 2 before current
			var s1 = σ1( W[ i - 2 ] ) >>> 0;
			changeText( ".s1_data", '0x' + pad( s1.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());

			// Sum word from 16 before current, littleSigma0, word from 7 before current, and littleSigma1
			var sum = ( W[ i - 16 ] + s0 + W[ i - 7 ] + s1 ) >>> 0;
			W[ i ] = sum;
			
			var t = ".m" + i;
			changeText( t, '0x' + pad( sum.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
		}

		// initialize 8 working variables with constants
		A = hInit[0];
		changeText( '.varA', '0x' + pad( hInit[0].toString( 16 ).toUpperCase(), 8 ) );
		await sleep(getSpeed());
		B = hInit[1];
		changeText( '.varB', '0x' + pad( hInit[1].toString( 16 ).toUpperCase(), 8 ) );
		await sleep(getSpeed());
		C = hInit[2];
		changeText( '.varC', '0x' + pad( hInit[2].toString( 16 ).toUpperCase(), 8 ) );
		await sleep(getSpeed());
		D = hInit[3];
		changeText( '.varD', '0x' + pad( hInit[3].toString( 16 ).toUpperCase(), 8 ) );
		await sleep(getSpeed());
		E = hInit[4];
		changeText( '.varE', '0x' + pad( hInit[4].toString( 16 ).toUpperCase(), 8 ) );
		await sleep(getSpeed());
		F = hInit[5];
		changeText( '.varF', '0x' + pad( hInit[5].toString( 16 ).toUpperCase(), 8 ) );
		await sleep(getSpeed());
		G = hInit[6];
		changeText( '.varG', '0x' + pad( hInit[6].toString( 16 ).toUpperCase(), 8 ) );
		await sleep(getSpeed());
		H = hInit[7];
		changeText( '.varH', '0x' + pad( hInit[7].toString( 16 ).toUpperCase(), 8 ) );
		await sleep(getSpeed());

		for( var t = 0; t < 64; t++ ){
			changeText( '.iter', '0x' + pad( t.toString( 16 ).toUpperCase(), 2 ) );
			await sleep(getSpeed());

			var S1 = Σ1( E ) >>> 0;
			changeText( '.S1_data', '0x' + pad( S1.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			var ch = Ch( E, F, G ) >>> 0;
			changeText( '.ch_data', '0x' + pad( ch.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());

			var temp1 = H >>> 0;
			changeText( '.t1', '0x' + pad( temp1.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			temp1 += S1 >>> 0;
			changeText( '.t1', '0x' + pad( temp1.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			temp1 += ch >>> 0;
			changeText( '.t1', '0x' + pad( temp1.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			temp1 += K[ t ] >>> 0;
			changeText( '.t1', '0x' + pad( temp1.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			temp1 += W[ t ] >>> 0;
			changeText( '.t1', '0x' + pad( temp1.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());

			var S0 = Σ0( A ) >>> 0;
			changeText( '.S0_data', '0x' + pad( S0.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			var maj = Maj( A, B, C ) >>> 0;
			changeText( '.mj_data', '0x' + pad( maj.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			var temp2 = S0 >>> 0;
			changeText( '.t2', '0x' + pad( temp2.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			temp2 += maj >>> 0;
			changeText( '.t2', '0x' + pad( temp2.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());

			H = G;
			changeText( '.varH', '0x' + pad( H.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			G = F;
			changeText( '.varG', '0x' + pad( G.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			F = E;
			changeText( '.varF', '0x' + pad( F.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			E = (D + temp1) >>> 0;
			changeText( '.varE', '0x' + pad( E.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			D = C;
			changeText( '.varD', '0x' + pad( D.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			C = B;
			changeText( '.varC', '0x' + pad( C.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			B = A;
			changeText( '.varB', '0x' + pad( B.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			A = (temp1 + temp2) >>> 0;
			changeText( '.varA', '0x' + pad( A.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
		}

		// Redefine constants for next chunk loop
		hInit[0] += (A) >>> 0;
		hInit[1] += (B) >>> 0;
		hInit[2] += (C) >>> 0;
		hInit[3] += (D) >>> 0;
		hInit[4] += (E) >>> 0;
		hInit[5] += (F) >>> 0;
		hInit[6] += (G) >>> 0;
		hInit[7] += (H) >>> 0;

		// concatenate our 8 hash pieces into final hash
		var d = "";  //= sprintf( "%08X%08X%08X%08X%08X%08X%08X%08X", hInit[0], hInit[1], hInit[2], hInit[3], hInit[4], hInit[5], hInit[6], hInit[7] );
		for( var i = 0; i < 8; i++ ){
			var res = hInit[ i ] >>> 0;
			changeText( '.res' + i, '0x' + pad( res.toString( 16 ).toUpperCase(), 8 ) );
			await sleep(getSpeed());
			d += res.toString( 16 ).toUpperCase();
		}

		// Final hash assignment
		var hash = d;
	}

	changeText( '.finalHash', hash );
	await sleep(getSpeed());
	$("#start").attr("disabled", false);

	// last hash/final iteration is the input's hash
	return hash;
}