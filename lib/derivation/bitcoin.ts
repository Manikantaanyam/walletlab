import { BIP32Factory } from "bip32";
import * as ecc from "tiny-secp256k1";
import * as bitcoin from "bitcoinjs-lib";
import { mnemonicToSeedSync } from "bip39";

const bip32 = BIP32Factory(ecc);

export default function BitcoinWallet(mnemonics: string) {
  const seed = mnemonicToSeedSync(mnemonics);

  // path for bitcoin (44(legacy) or 84(right now using))
  const path = "m/84'/0'/0'/0/0";

  // unlike ethers bitcoinjs-lib requires bip32 for deriving keys
  const root = bip32.fromSeed(seed);

  // contains both public and private keys
  const child = root.derivePath(path);

  // testnet is for testing (has diff networks regtest)
  // diff networks bitcoin, regtest, testnet(for dev)
  const { address } = bitcoin.payments.p2wpkh({
    // pubkey is for turning the child.publicKey into a bitcoin address or wallet
    pubkey: child.publicKey,
    network: bitcoin.networks.testnet,
  });

  // toWif actually converts the raw bytes to base58 also adds checksum and some other things
  return {
    publicKey: address,
    secretKey: child.toWIF(),
  };
}
