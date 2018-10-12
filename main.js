/*
	Non implementation specific functions
*/

function changeText( obj, text ){
	$( obj ).text( text );
	$( obj ).removeClass( 'blinking' );

	setTimeout(function(){
		$( obj ).addClass( 'blinking' );
	}, 1 );
}

function getSpeed( ){
	return( 50 - $( '#sSpeed' ).val() );
}

function sleep(ms) {
  return new Promise( resolve => setTimeout( resolve, ms ) );
}

function hex2bin( hex ){
	return( parseInt( hex, 16 ).toString( 2 ) ).padStart( 8, '0' );
}

function dec2bin( dec ){
	return( dec >>> 0 ).toString( 2 );
}

function pad( str, width ) {
	return str.padStart( width, '0' );
}

function toPaddedHexString( num, len ) {
    str = num.toString( 16 );
    return '0'.repeat( len - str.length ) + str;
}