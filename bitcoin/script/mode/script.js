// Syntax highlighter for Bitcoin Script
CodeMirror.defineSimpleMode('script', {
	start: [
		// The regex matches the token, the token property contains the type
		{
			// Disabled OP_ codes
			regex: /OP\_(CAT|SUBSTR|LEFT|RIGHT|INVERT|AND|OR|XOR|2MUL|2DIV|MUL|DIV|MOD|LSHIFT|RSHIFT)\b/,
			token: 'error'
		},
		{
			// Constants
			regex: /OP\_([0-9]|1[0-6]|PUSHDATA[1-2]|PUSHDATA4|1NEGATE|TRUE|FALSE)\b/,
			token: 'number'
		},
		{
			// Flow control
			regex: /OP\_(NOP|IF|NOTIF|ELSE|ENDIF|VERIFY|RETURN)\b/,
			token: 'keyword'
		},
		{
			// Stack
			regex: /OP\_(TOALTSTACK|FROMALTSTACK|IFDUP|DEPTH|DROP|DUP|NIP|OVER|PICK|ROLL|ROT|SWAP|TUCK|2DROP|[2-3]DUP|2OVER|2ROT|2SWAP)\b/,
			token: 'keyword'
		},
		{
			// Splice
			regex: /OP\_(SIZE)\b/,
			token: 'keyword'
		},
		{
			// Bitwise Logic
			regex: /OP\_(EQUAL|EQUALVERIFY)\b/,
			token: 'keyword'
		},
		{
			// Arithmetic
			regex: /OP\_(1ADD|1SUB|NEGATIVE|ABS|NOT|0NOTEQUAL|ADD|SUB|BOOLAND|BOOLOR|NUMEQUAL|NUMEQUALVERIFY|NUMNOTEQUAL|LESSTHAN|GREATERTHAN|LESSTHANOREQUAL|GREATERTHANOREQUAL|MIN|MAX|WITHIN)\b/,
			token: 'keyword'
		},
		{
			// Cryptographic functions
			regex: /OP\_(RIPEMD160|SHA1|SHA256|HASH160|HASH256|CODESEPARATOR|CHECKSIG|CHECKSIGVERIFY|CHECKMUTLISIG|CHECKMULTISIGVERIFY)\b/,
			token: 'keyword'
		},
		{
			// Locktime (previously OP_NOP2 and OP_NOP3, auto-invalidated)
			// add syntax for old OP_ codes, recommend change highlight
			regex: /OP\_(CHECKLOCKTIMEVERIFY|CHECKSEQUENCEVERIFY|NOP[2-3])\b/,
			token: 'keyword'
		},
		{
			// Pseudo-words
			regex: /OP\_(PUBKEYHASH|PUBKEY|INVALIDOPCODE)\b/,
			token: 'keyword'
		},
		{
			// Reserved (auto-invalidated)
			regex: /OP\_(RESERVED|VER|VERIF|VERNOTIF|RESERVED[1-2]|NOP1|NOP[0-9]|NOP10)\b/,
			token: 'keyword'
		},
		{
			// Unknown OP code
			regex: /OP\_(.+?)\b/,
			token: 'variable-3'
		},
		{
			// hexadecimal number
			regex: /0[xX][0-9a-fA-F]+\b/,
			token: 'def'
		},
		{
			// comments (not supported, but for sharing)
			regex: /\/\/.*/,
			token: 'comment',
		}
	]
});