/*
    Included: script_error.js
*/

const PUBLIC_KEY_SIZE             = 65;
const COMPRESSED_PUBLIC_KEY_SIZE  = 33;
const SIGNATURE_SIZE              = 72;
const COMPACT_SIGNATURE_SIZE      = 65;

const SCRIPT_VERIFY_NONE  = 0;

// Evaluate P2SH subscripts (BIP16).
const SCRIPT_VERIFY_P2SH  = (1 << 0);

// Passing a non-strict-DER signature or one with undefined hashtype to a checksig operation causes script failure.
// Evaluating a pubkey that is not (0x04 + 64 bytes) or (0x02 or 0x03 + 32 bytes) by checksig causes script failure.
// (not used or intended as a consensus rule).
const SCRIPT_VERIFY_STRICTENC = (1 << 1);

// Passing a non-strict-DER signature to a checksig operation causes script failure (BIP62 rule 1)
const SCRIPT_VERIFY_DERSIG= (1 << 2);

// Passing a non-strict-DER signature or one with S > order/2 to a checksig operation causes script failure
// (BIP62 rule 5).
const SCRIPT_VERIFY_LOW_S = (1 << 3);

// verify dummy stack item consumed by CHECKMULTISIG is of zero-length (BIP62 rule 7).
const SCRIPT_VERIFY_NULLDUMMY = (1 << 4);

// Using a non-push operator in the scriptSig causes script failure (BIP62 rule 2).
const SCRIPT_VERIFY_SIGPUSHONLY = (1 << 5);

// Require minimal encodings for all push operations (OP_0... OP_16, OP_1NEGATE where possible, direct
// pushes up to 75 bytes, OP_PUSHDATA up to 255 bytes, OP_PUSHDATA2 for anything larger). Evaluating
// any other push causes the script to fail (BIP62 rule 3).
// In addition, whenever a stack element is interpreted as a number, it must be of minimal length (BIP62 rule 4).
const SCRIPT_VERIFY_MINIMALDATA = (1 << 6);

// Discourage use of NOPs reserved for upgrades (NOP1-10)
//
// Provided so that nodes can avoid accepting or mining transactions
// containing executed NOP's whose meaning may change after a soft-fork,
// thus rendering the script invalid; with this flag set executing
// discouraged NOPs fails the script. This verification flag will never be
// a mandatory flag applied to scripts in a block. NOPs that are not
// executed, e.g.  within an unexecuted IF ENDIF block, are *not* rejected.
// NOPs that have associated forks to give them new meaning (CLTV, CSV)
// are not subject to this rule.
const SCRIPT_VERIFY_DISCOURAGE_UPGRADABLE_NOPS  = (1 << 7);

// Require that only a single stack element remains after evaluation. This changes the success criterion from
// "At least one stack element must remain, and when interpreted as a boolean, it must be true" to
// "Exactly one stack element must remain, and when interpreted as a boolean, it must be true".
// (BIP62 rule 6)
// Note: CLEANSTACK should never be used without P2SH or WITNESS.
const SCRIPT_VERIFY_CLEANSTACK = (1 << 8);

// Verify CHECKLOCKTIMEVERIFY
//
// See BIP65 for details.
const SCRIPT_VERIFY_CHECKLOCKTIMEVERIFY = (1 << 9);

// support CHECKSEQUENCEVERIFY opcode
//
// See BIP112 for details
const SCRIPT_VERIFY_CHECKSEQUENCEVERIFY = (1 << 10);

// Support segregated witness
//
const SCRIPT_VERIFY_WITNESS = (1 << 11);

// Making v1-v16 witness program non-standard
//
const SCRIPT_VERIFY_DISCOURAGE_UPGRADABLE_WITNESS_PROGRAM = (1 << 12);

// Segwit script only: Require the argument of OP_IF/NOTIF to be exactly 0x01 or empty vector
//
const SCRIPT_VERIFY_MINIMALIF = (1 << 13);

// Signature(s) must be empty vector if a CHECK(MULTI)SIG operation failed
//
const SCRIPT_VERIFY_NULLFAIL = (1 << 14);

// Public keys in segregated witness scripts must be compressed
//
const SCRIPT_VERIFY_WITNESS_PUBKEYTYPE = (1 << 15);

// Making OP_CODESEPARATOR and FindAndDelete fail any non-segwit scripts
//
const SCRIPT_VERIFY_CONST_SCRIPTCODE = (1 << 16);

const SIGVERSION_BASE = 0;

function set_success( ret ){
    if(ret)
        ret = SCRIPT_ERR_OK;

    return true;
}

function set_error( ret, serror ){
    if(ret)
        ret = serror;

    return false;
}

function CastToBool( vch ){
    for( var i = 0; i < vch.length(); i++ ){
        if( vch[i] != 0 ){
            if( i == vch.length()-1 && vch[i] == 0x80 )
                return false;

            return true;
        }
    }

    return false;
}

/**
 * Script is a stack machine (like Forth) that evaluates a predicate
 * returning a bool indicating valid or not.  There are no loops.
 */

function stacktop( stack, i ){
    return stack[ stack.length() + i ];
}

function altstacktop( altstack, i ){
    return altstack[ altstack.length() + i ];
}

function popstack( stack )
{
    if ( stack.length() == 0 )
        console.log("popstack(): stack empty");
    stack.pop();
}

function IsCompressedOrUncompressedPubKey( vchPubKey ) {
    if (vchPubKey.length() < COMPRESSED_PUBLIC_KEY_SIZE) {
        //  Non-canonical public key: too short
        return false;
    }
    if (vchPubKey[0] == 0x04) {
        if (vchPubKey.length() != PUBLIC_KEY_SIZE) {
            //  Non-canonical public key: invalid length for uncompressed key
            return false;
        }
    } else if (vchPubKey[0] == 0x02 || vchPubKey[0] == 0x03) {
        if (vchPubKey.length() != COMPRESSED_PUBLIC_KEY_SIZE) {
            //  Non-canonical public key: invalid length for compressed key
            return false;
        }
    } else {
        //  Non-canonical public key: neither compressed nor uncompressed
        return false;
    }
    return true;
}

function IsCompressedPubKey( vchPubKey ) {
    if (vchPubKey.length() != COMPRESSED_PUBLIC_KEY_SIZE) {
        //  Non-canonical public key: invalid length for compressed key
        return false;
    }
    if (vchPubKey[0] != 0x02 && vchPubKey[0] != 0x03) {
        //  Non-canonical public key: invalid prefix for compressed key
        return false;
    }
    return true;
}

/**
 * A canonical signature exists of: <30> <total len> <02> <len R> <R> <02> <len S> <S> <hashtype>
 * Where R and S are not negative (their first byte has its highest bit not set), and not
 * excessively padded (do not start with a 0 byte, unless an otherwise negative number follows,
 * in which case a single 0 byte is necessary and even required).
 *
 * See https://bitcointalk.org/index.php?topic=8392.msg127623#msg127623
 *
 * This function is consensus-critical since BIP66.
 */
function IsValidSignatureEncoding( sig ) {
    // Format: 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S] [sighash]
    // * total-length: 1-byte length descriptor of everything that follows,
    //   excluding the sighash byte.
    // * R-length: 1-byte length descriptor of the R value that follows.
    // * R: arbitrary-length big-endian encoded R value. It must use the shortest
    //   possible encoding for a positive integer (which means no null bytes at
    //   the start, except a single one when the next byte has its highest bit set).
    // * S-length: 1-byte length descriptor of the S value that follows.
    // * S: arbitrary-length big-endian encoded S value. The same rules apply.
    // * sighash: 1-byte value indicating what data is hashed (not part of the DER
    //   signature)

    // Minimum and maximum size constraints.
    if (sig.length() < 9) return false;
    if (sig.length() > 73) return false;

    // A signature is of type 0x30 (compound).
    if (sig[0] != 0x30) return false;

    // Make sure the length covers the entire signature.
    if (sig[1] != sig.length() - 3) return false;

    // Extract the length of the R element.
    var lenR = sig[3];

    // Make sure the length of the S element is still inside the signature.
    if (5 + lenR >= sig.length()) return false;

    // Extract the length of the S element.
    var lenS = sig[5 + lenR];

    // Verify that the length of the signature matches the sum of the length
    // of the elements.
    if ((size_t)(lenR + lenS + 7) != sig.length()) return false;

    // Check whether the R element is an integer.
    if (sig[2] != 0x02) return false;

    // Zero-length integers are not allowed for R.
    if (lenR == 0) return false;

    // Negative numbers are not allowed for R.
    if (sig[4] & 0x80) return false;

    // Null bytes at the start of R are not allowed, unless R would
    // otherwise be interpreted as a negative number.
    if (lenR > 1 && (sig[4] == 0x00) && !(sig[5] & 0x80)) return false;

    // Check whether the S element is an integer.
    if (sig[lenR + 4] != 0x02) return false;

    // Zero-length integers are not allowed for S.
    if (lenS == 0) return false;

    // Negative numbers are not allowed for S.
    if (sig[lenR + 6] & 0x80) return false;

    // Null bytes at the start of S are not allowed, unless S would otherwise be
    // interpreted as a negative number.
    if (lenS > 1 && (sig[lenR + 6] == 0x00) && !(sig[lenR + 7] & 0x80)) return false;

    return true;
}

/*
function IsLowDERSignature( vchSig, serror ) {
    if (!IsValidSignatureEncoding(vchSig)) {
        return set_error(serror, SCRIPT_ERR_SIG_DER);
    }
    // https://bitcoin.stackexchange.com/a/12556:
    //     Also note that inside transaction signatures, an extra hashtype byte
    //     follows the actual signature data.
    std::vector<unsigned char> vchSigCopy(vchSig.begin(), vchSig.begin() + vchSig.size() - 1);
    // If the S value is above the order of the curve divided by two, its
    // complement modulo the order could have been used instead, which is
    // one byte shorter when encoded correctly.
    if (!CPubKey::CheckLowS(vchSigCopy)) {
        return set_error(serror, SCRIPT_ERR_SIG_HIGH_S);
    }
    return true;
}
*/

class BaseSignatureChecker{
    CheckSig(scriptSig, vchPubKey, scriptCode, sigversion){
        return false;
    }

    CheckLockTime(nLockTime){
        return false;
    }

    CheckSequence(nSequence){
        return false;
    }
}