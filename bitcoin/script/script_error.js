const
	SCRIPT_ERR_OK 							= 0,
	SCRIPT_ERR_UNKNOWN_ERROR 				= 1,
	SCRIPT_ERR_EVAL_FALSE					= 2,
	SCRIPT_ERR_OP_RETURN					= 3,

	/* Max sizes */
	SCRIPT_ERR_SCRIPT_SIZE					= 4,
	SCRIPT_ERR_PUSH_SIZE					= 5,
	SCRIPT_ERR_OP_COUNT						= 6,
	SCRIPT_ERR_STACK_SIZE					= 7,
	SCRIPT_ERR_SIG_COUNT					= 8,
	SCRIPT_ERR_PUBKEY_COUNT					= 9,

	/* Failed verify operations */
	SCRIPT_ERR_VERIFY 						= 10,
	SCRIPT_ERR_EQUALVERIFY 					= 11,
	SCRIPT_ERR_CHECKMULTISIGVERIFY 			= 12,
	SCRIPT_ERR_CHECKSIGVERIFY 				= 13,
	SCRIPT_ERR_NUMEQUALVERIFY 				= 14,

	/* Logical/Format/Canonical errors */
	SCRIPT_ERR_BAD_OPCODE 					= 15,
	SCRIPT_ERR_DISABLED_OPCODE 				= 16,
	SCRIPT_ERR_INVALID_STACK_OPERATION 		= 17,
	SCRIPT_ERR_INVALID_ALTSTACK_OPERATION 	= 18,
	SCRIPT_ERR_UNBALANCED_CONDITIONAL 		= 19,

	/* CHECKLOCKTIMEVERIFY and CHECKSEQUENCEVERIFY */
	SCRIPT_ERR_NEGATIVE_LOCKTIME 			= 20,
	SCRIPT_ERR_UNSATISFIED_LOCKTIME 		= 21,

	/* Malleability */
	SCRIPT_ERR_SIG_HASHTYPE 				= 22,
	SCRIPT_ERR_SIG_DER 						= 23,
	SCRIPT_ERR_MINIMALDATA 					= 24,
	SCRIPT_ERR_SIG_PUSHONLY 				= 25,
	SCRIPT_ERR_SIG_HIGH_S 					= 26,
	SCRIPT_ERR_SIG_NULLDUMMY 				= 27,
	SCRIPT_ERR_PUBKEYTYPE 					= 28,
	SCRIPT_ERR_CLEANSTACK 					= 29,
	SCRIPT_ERR_MINIMALIF 					= 30,
	SCRIPT_ERR_SIG_NULLFAIL 				= 31,

	/* softfork safeness */
	SCRIPT_ERR_DISCOURAGE_UPGRADABLE_NOPS	= 32,
	SCRIPT_ERR_DISCOURAGE_UPGRADABLE_WITNESS_PROGRAM = 33,

	/* segregated witness */
	SCRIPT_ERR_WITNESS_PROGRAM_WRONG_LENGTH	= 34,
	SCRIPT_ERR_WITNESS_PROGRAM_WITNESS_EMPTY= 35,
	SCRIPT_ERR_WITNESS_PROGRAM_MISMATCH		= 36,
	SCRIPT_ERR_WITNESS_MALLEATED 			= 37,
	SCRIPT_ERR_WITNESS_MALLEATED_P2SH 		= 38,
	SCRIPT_ERR_WITNESS_UNEXPECTED 			= 39,
	SCRIPT_ERR_WITNESS_PUBKEYTYPE  			= 40,

	/* Constant scriptCode */
	SCRIPT_ERR_OP_CODESEPARATOR 			= 41,
	SCRIPT_ERR_SIG_FINDANDDELETE 			= 42,

	SCRIPT_ERR_ERROR_COUNT					= 43;

const
	SCRIPT_ERR_LAST 						= SCRIPT_ERR_ERROR_COUNT;

function ScriptErrorString( ScriptError )
{
    switch ( ScriptError )
    {
        case SCRIPT_ERR_OK:
            return "No error";
        case SCRIPT_ERR_EVAL_FALSE:
            return "Script evaluated without error but finished with a false/empty top stack element";
        case SCRIPT_ERR_VERIFY:
            return "Script failed an OP_VERIFY operation";
        case SCRIPT_ERR_EQUALVERIFY:
            return "Script failed an OP_EQUALVERIFY operation";
        case SCRIPT_ERR_CHECKMULTISIGVERIFY:
            return "Script failed an OP_CHECKMULTISIGVERIFY operation";
        case SCRIPT_ERR_CHECKSIGVERIFY:
            return "Script failed an OP_CHECKSIGVERIFY operation";
        case SCRIPT_ERR_NUMEQUALVERIFY:
            return "Script failed an OP_NUMEQUALVERIFY operation";
        case SCRIPT_ERR_SCRIPT_SIZE:
            return "Script is too big";
        case SCRIPT_ERR_PUSH_SIZE:
            return "Push value size limit exceeded";
        case SCRIPT_ERR_OP_COUNT:
            return "Operation limit exceeded";
        case SCRIPT_ERR_STACK_SIZE:
            return "Stack size limit exceeded";
        case SCRIPT_ERR_SIG_COUNT:
            return "Signature count negative or greater than pubkey count";
        case SCRIPT_ERR_PUBKEY_COUNT:
            return "Pubkey count negative or limit exceeded";
        case SCRIPT_ERR_BAD_OPCODE:
            return "Opcode missing or not understood";
        case SCRIPT_ERR_DISABLED_OPCODE:
            return "Attempted to use a disabled opcode";
        case SCRIPT_ERR_INVALID_STACK_OPERATION:
            return "Operation not valid with the current stack size";
        case SCRIPT_ERR_INVALID_ALTSTACK_OPERATION:
            return "Operation not valid with the current altstack size";
        case SCRIPT_ERR_OP_RETURN:
            return "OP_RETURN was encountered";
        case SCRIPT_ERR_UNBALANCED_CONDITIONAL:
            return "Invalid OP_IF construction";
        case SCRIPT_ERR_NEGATIVE_LOCKTIME:
            return "Negative locktime";
        case SCRIPT_ERR_UNSATISFIED_LOCKTIME:
            return "Locktime requirement not satisfied";
        case SCRIPT_ERR_SIG_HASHTYPE:
            return "Signature hash type missing or not understood";
        case SCRIPT_ERR_SIG_DER:
            return "Non-canonical DER signature";
        case SCRIPT_ERR_MINIMALDATA:
            return "Data push larger than necessary";
        case SCRIPT_ERR_SIG_PUSHONLY:
            return "Only non-push operators allowed in signatures";
        case SCRIPT_ERR_SIG_HIGH_S:
            return "Non-canonical signature: S value is unnecessarily high";
        case SCRIPT_ERR_SIG_NULLDUMMY:
            return "Dummy CHECKMULTISIG argument must be zero";
        case SCRIPT_ERR_MINIMALIF:
            return "OP_IF/NOTIF argument must be minimal";
        case SCRIPT_ERR_SIG_NULLFAIL:
            return "Signature must be zero for failed CHECK(MULTI)SIG operation";
        case SCRIPT_ERR_DISCOURAGE_UPGRADABLE_NOPS:
            return "NOPx reserved for soft-fork upgrades";
        case SCRIPT_ERR_DISCOURAGE_UPGRADABLE_WITNESS_PROGRAM:
            return "Witness version reserved for soft-fork upgrades";
        case SCRIPT_ERR_PUBKEYTYPE:
            return "Public key is neither compressed or uncompressed";
        case SCRIPT_ERR_CLEANSTACK:
            return "Extra items left on stack after execution";
        case SCRIPT_ERR_WITNESS_PROGRAM_WRONG_LENGTH:
            return "Witness program has incorrect length";
        case SCRIPT_ERR_WITNESS_PROGRAM_WITNESS_EMPTY:
            return "Witness program was passed an empty witness";
        case SCRIPT_ERR_WITNESS_PROGRAM_MISMATCH:
            return "Witness program hash mismatch";
        case SCRIPT_ERR_WITNESS_MALLEATED:
            return "Witness requires empty scriptSig";
        case SCRIPT_ERR_WITNESS_MALLEATED_P2SH:
            return "Witness requires only-redeemscript scriptSig";
        case SCRIPT_ERR_WITNESS_UNEXPECTED:
            return "Witness provided for non-witness script";
        case SCRIPT_ERR_WITNESS_PUBKEYTYPE:
            return "Using non-compressed keys in segwit";
        case SCRIPT_ERR_OP_CODESEPARATOR:
            return "Using OP_CODESEPARATOR in non-witness script";
        case SCRIPT_ERR_SIG_FINDANDDELETE:
            return "Signature is found in scriptCode";
        case SCRIPT_ERR_UNKNOWN_ERROR:
        case SCRIPT_ERR_ERROR_COUNT:
        default: break;
    }
    return "unknown error";
}