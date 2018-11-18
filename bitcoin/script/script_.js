// Copyright (c) 2009-2010 Satoshi Nakamoto
// Copyright (c) 2009-2018 The Bitcoin Core developers
// Distributed under the MIT software license, see the accompanying
// file COPYING or http://www.opensource.org/licenses/mit-license.php.

// Maximum number of bytes pushable to the stack
const MAX_SCRIPT_ELEMENT_SIZE = 520;

// Maximum number of non-push operations per script
const MAX_OPS_PER_SCRIPT = 201;

// Maximum number of public keys per multisig
const MAX_PUBKEYS_PER_MULTISIG = 20;

// Maximum script length in bytes
const MAX_SCRIPT_SIZE = 10000;

// Maximum number of values on script interpreter stack
const MAX_STACK_SIZE = 1000;

// Threshold for nLockTime: below this value it is interpreted as block number,
// otherwise as UNIX timestamp.
const LOCKTIME_THRESHOLD = 500000000; // Tue Nov  5 00:53:20 1985 UTC

/** Script opcodes */
// push value
const OP_0			= 0x00;
const OP_FALSE		= OP_0;
const OP_PUSHDATA1	= 0x4c;
const OP_PUSHDATA2	= 0x4d;
const OP_PUSHDATA4	= 0x4e;
const OP_1NEGATE	= 0x4f;
const OP_RESERVED	= 0x50;
const OP_1			= 0x51;
const OP_TRUE		= OP_1;
const OP_2			= 0x52;
const OP_3			= 0x53;
const OP_4			= 0x54;
const OP_5			= 0x55;
const OP_6			= 0x56;
const OP_7			= 0x57;
const OP_8			= 0x58;
const OP_9			= 0x59;
const OP_10			= 0x5a;
const OP_11			= 0x5b;
const OP_12			= 0x5c;
const OP_13			= 0x5d;
const OP_14			= 0x5e;
const OP_15			= 0x5f;
const OP_16			= 0x60;

// control
const OP_NOP		= 0x61;
const OP_VER 		= 0x62;
const OP_IF 		= 0x63;
const OP_NOTIF 		= 0x64;
const OP_VERIF 		= 0x65;
const OP_VERNOTIF 	= 0x66;
const OP_ELSE 		= 0x67;
const OP_ENDIF 		= 0x68;
const OP_VERIFY 	= 0x69;
const OP_RETURN 	= 0x6a;

// stack ops
const OP_TOALTSTACK = 0x6b;
const OP_FROMALTSTACK 
					= 0x6c;
const OP_2DROP 		= 0x6d;
const OP_2DUP 		= 0x6e;
const OP_3DUP 		= 0x6f;
const OP_2OVER 		= 0x70;
const OP_2ROT 		= 0x71;
const OP_2SWAP 		= 0x72;
const OP_IFDUP 		= 0x73;
const OP_DEPTH 		= 0x74;
const OP_DROP 		= 0x75;
const OP_DUP 		= 0x76;
const OP_NIP 		= 0x77;
const OP_OVER 		= 0x78;
const OP_PICK 		= 0x79;
const OP_ROLL 		= 0x7a;
const OP_ROT 		= 0x7b;
const OP_SWAP 		= 0x7c;
const OP_TUCK 		= 0x7d;

// splice ops
const OP_CAT 		= 0x7e;
const OP_SUBSTR 	= 0x7f;
const OP_LEFT 		= 0x80;
const OP_RIGHT 		= 0x81;
const OP_SIZE 		= 0x82;

// bit logic
const OP_INVERT 	= 0x83;
const OP_AND 		= 0x84;
const OP_OR 		= 0x85;
const OP_XOR 		= 0x86;
const OP_EQUAL 		= 0x87;
const OP_EQUALVERIFY
					= 0x88;
const OP_RESERVED1 	= 0x89;
const OP_RESERVED2 	= 0x8a;

// numeric
const OP_1ADD 		= 0x8b;
const OP_1SUB 		= 0x8c;
const OP_2MUL 		= 0x8d;
const OP_2DIV 		= 0x8e;
const OP_NEGATE 	= 0x8f;
const OP_ABS 		= 0x90;
const OP_NOT 		= 0x91;
const OP_0NOTEQUAL 	= 0x92;

const OP_ADD 		= 0x93;
const OP_SUB 		= 0x94;
const OP_MUL 		= 0x95;
const OP_DIV 		= 0x96;
const OP_MOD 		= 0x97;
const OP_LSHIFT 	= 0x98;
const OP_RSHIFT 	= 0x99;

const OP_BOOLAND 	= 0x9a;
const OP_BOOLOR 	= 0x9b;
const OP_NUMEQUAL 	= 0x9c;
const OP_NUMEQUALVERIFY
					= 0x9d;
const OP_NUMNOTEQUAL
					= 0x9e;
const OP_LESSTHAN 	= 0x9f;
const OP_GREATERTHAN
					= 0xa0;
const OP_LESSTHANOREQUAL
					= 0xa1;
const OP_GREATERTHANOREQUAL
					= 0xa2;
const OP_MIN 		= 0xa3;
const OP_MAX 		= 0xa4;

const OP_WITHIN 	= 0xa5;

// crypto
const OP_RIPEMD160 	= 0xa6;
const OP_SHA1 		= 0xa7;
const OP_SHA256 	= 0xa8;
const OP_HASH160 	= 0xa9;
const OP_HASH256 	= 0xaa;
const OP_CODESEPARATOR
					= 0xab;
const OP_CHECKSIG 	= 0xac;
const OP_CHECKSIGVERIFY
					= 0xad;
const OP_CHECKMULTISIG
					= 0xae;
const OP_CHECKMULTISIGVERIFY
					= 0xaf;

// expansion
const OP_NOP1 		= 0xb0;
const OP_CHECKLOCKTIMEVERIFY
					= 0xb1;
const OP_NOP2 		= OP_CHECKLOCKTIMEVERIFY;
const OP_CHECKSEQUENCEVERIFY 
					= 0xb2;
const OP_NOP3 		= OP_CHECKSEQUENCEVERIFY;
const OP_NOP4 		= 0xb3;
const OP_NOP5 		= 0xb4;
const OP_NOP6 		= 0xb5;
const OP_NOP7 		= 0xb6;
const OP_NOP8 		= 0xb7;
const OP_NOP9 		= 0xb8;
const OP_NOP10 		= 0xb9;

const OP_INVALIDOPCODE
					= 0xff;

// Maximum value that an opcode can be
const MAX_OPCODE = OP_NOP10;

const GetOPName = [];
// push value
GetOPName[OP_0] 					= "0";
GetOPName[OP_PUSHDATA1]				= "OP_PUSHDATA1";
GetOPName[OP_PUSHDATA2]				= "OP_PUSHDATA2";
GetOPName[OP_PUSHDATA4]				= "OP_PUSHDATA4";
GetOPName[OP_1NEGATE]				= "-1";
GetOPName[OP_RESERVED]				= "OP_RESERVED";
GetOPName[OP_1]						= "1";
GetOPName[OP_2]						= "2";
GetOPName[OP_3]						= "3";
GetOPName[OP_4]						= "4";
GetOPName[OP_5]						= "5";
GetOPName[OP_6]						= "6";
GetOPName[OP_7]						= "7";
GetOPName[OP_8]						= "8";
GetOPName[OP_9]						= "9";
GetOPName[OP_10]					= "10";
GetOPName[OP_11]					= "11";
GetOPName[OP_12]					= "12";
GetOPName[OP_13]					= "13";
GetOPName[OP_14]					= "14";
GetOPName[OP_15]					= "15";
GetOPName[OP_16]					= "16";

// control
GetOPName[OP_NOP]					= "OP_NOP";
GetOPName[OP_VER]					= "OP_VER";
GetOPName[OP_IF]					= "OP_IF";
GetOPName[OP_NOTIF]					= "OP_NOTIF";
GetOPName[OP_VERIF]					= "OP_VERIF";
GetOPName[OP_VERNOTIF]				= "OP_VERNOTIF";
GetOPName[OP_ELSE]					= "OP_ELSE";
GetOPName[OP_ENDIF]					= "OP_ENDIF";
GetOPName[OP_VERIFY]				= "OP_VERIFY";
GetOPName[OP_RETURN]				= "OP_RETURN";

// stack ops
GetOPName[OP_TOALTSTACK]			= "OP_TOALTSTACK";
GetOPName[OP_FROMALTSTACK]			= "OP_FROMALTSTACK";
GetOPName[OP_2DROP]					= "OP_2DROP";
GetOPName[OP_2DUP]					= "OP_2DUP";
GetOPName[OP_3DUP]					= "OP_3DUP";
GetOPName[OP_2OVER]					= "OP_2OVER";
GetOPName[OP_2ROT]					= "OP_2ROT";
GetOPName[OP_2SWAP]					= "OP_2SWAP";
GetOPName[OP_IFDUP]					= "OP_IFDUP";
GetOPName[OP_DEPTH]					= "OP_DEPTH";
GetOPName[OP_DROP]					= "OP_DROP";
GetOPName[OP_DUP]					= "OP_DUP";
GetOPName[OP_NIP]					= "OP_NIP";
GetOPName[OP_OVER]					= "OP_OVER";
GetOPName[OP_PICK]					= "OP_PICK";
GetOPName[OP_ROLL]					= "OP_ROLL";
GetOPName[OP_ROT]					= "OP_ROT";
GetOPName[OP_SWAP]					= "OP_SWAP";
GetOPName[OP_TUCK]					= "OP_TUCK";

// splice ops
GetOPName[OP_CAT]					= "OP_CAT";
GetOPName[OP_SUBSTR]				= "OP_SUBSTR";
GetOPName[OP_LEFT]					= "OP_LEFT";
GetOPName[OP_RIGHT]					= "OP_RIGHT";
GetOPName[OP_SIZE]					= "OP_SIZE";

// bit logic
GetOPName[OP_INVERT]				= "OP_INVERT";
GetOPName[OP_AND]					= "OP_AND";
GetOPName[OP_OR]					= "OP_OR";
GetOPName[OP_XOR]					= "OP_XOR";
GetOPName[OP_EQUAL]					= "OP_EQUAL";
GetOPName[OP_EQUALVERIFY]			= "OP_EQUALVERIFY";
GetOPName[OP_RESERVED1]				= "OP_RESERVED1";
GetOPName[OP_RESERVED2]				= "OP_RESERVED2";

// numeric
GetOPName[OP_1ADD]					= "OP_1ADD";
GetOPName[OP_1SUB]					= "OP_1SUB";
GetOPName[OP_2MUL]					= "OP_2MUL";
GetOPName[OP_2DIV]					= "OP_2DIV";
GetOPName[OP_NEGATE]				= "OP_NEGATE";
GetOPName[OP_ABS]					= "OP_ABS";
GetOPName[OP_NOT]					= "OP_NOT";
GetOPName[OP_0NOTEQUAL]				= "OP_0NOTEQUAL";
GetOPName[OP_ADD]					= "OP_ADD";
GetOPName[OP_SUB]					= "OP_SUB";
GetOPName[OP_MUL]					= "OP_MUL";
GetOPName[OP_DIV]					= "OP_DIV";
GetOPName[OP_MOD]					= "OP_MOD";
GetOPName[OP_LSHIFT]				= "OP_LSHIFT";
GetOPName[OP_RSHIFT]				= "OP_RSHIFT";
GetOPName[OP_BOOLAND]				= "OP_BOOLAND";
GetOPName[OP_BOOLOR]				= "OP_BOOLOR";
GetOPName[OP_NUMEQUAL]				= "OP_NUMEQUAL";
GetOPName[OP_NUMEQUALVERIFY]		= "OP_NUMEQUALVERIFY";
GetOPName[OP_NUMNOTEQUAL]			= "OP_NUMNOTEQUAL";
GetOPName[OP_LESSTHAN]				= "OP_LESSTHAN";
GetOPName[OP_GREATERTHAN]			= "OP_GREATERTHAN";
GetOPName[OP_LESSTHANOREQUAL]		= "OP_LESSTHANOREQUAL";
GetOPName[OP_GREATERTHANOREQUAL]	= "OP_GREATERTHANOREQUAL";
GetOPName[OP_MIN]					= "OP_MIN";
GetOPName[OP_MAX]					= "OP_MAX";
GetOPName[OP_WITHIN]				= "OP_WITHIN";

// crypto
GetOPName[OP_RIPEMD160]				= "OP_RIPEMD160";
GetOPName[OP_SHA1]					= "OP_SHA1";
GetOPName[OP_SHA256]				= "OP_SHA256";
GetOPName[OP_HASH160]				= "OP_HASH160";
GetOPName[OP_HASH256]				= "OP_HASH256";
GetOPName[OP_CODESEPARATOR]			= "OP_CODESEPARATOR";
GetOPName[OP_CHECKSIG]				= "OP_CHECKSIG";
GetOPName[OP_CHECKSIGVERIFY]		= "OP_CHECKSIGVERIFY";
GetOPName[OP_CHECKMULTISIG]			= "OP_CHECKMULTISIG";
GetOPName[OP_CHECKMULTISIGVERIFY]	= "OP_CHECKMULTISIGVERIFY";

// expansion
GetOPName[OP_NOP1]					= "OP_NOP1";
GetOPName[OP_CHECKLOCKTIMEVERIFY]	= "OP_CHECKLOCKTIMEVERIFY";
GetOPName[OP_CHECKSEQUENCEVERIFY]	= "OP_CHECKSEQUENCEVERIFY";
GetOPName[OP_NOP4]					= "OP_NOP4";
GetOPName[OP_NOP5]					= "OP_NOP5";
GetOPName[OP_NOP6]					= "OP_NOP6";
GetOPName[OP_NOP7]					= "OP_NOP7";
GetOPName[OP_NOP8]					= "OP_NOP8";
GetOPName[OP_NOP9]					= "OP_NOP9";
GetOPName[OP_NOP10]					= "OP_NOP10";

GetOPName[OP_INVALIDOPCODE]			= "OP_INVALIDOPCODE";