import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { mnemonicToSeedSync } from "bip39";

export function SolonaWallet(mnemonic: string) {
  if (!mnemonic) {
    return {
      msg: "No mnemonics",
    };
  }
  const seed = mnemonicToSeedSync(mnemonic);
  const path = `m/44'/501'/0'/0'`;

  // derived path is nothing but it uses path to generate different keys from the same seed
  const derivedSeed = derivePath(path, seed.toString("hex")).key;

  // returns Uint8Array
  const secretKey = Keypair.fromSeed(derivedSeed).secretKey;

  // returns a publickey object later on we convet it into base58 string
  const publicKey = Keypair.fromSecretKey(secretKey).publicKey.toBase58();

  //converting secretkey to base58(a way to represent binary data(bytes) as a readable string)
  const secretKeyBase58 = bs58.encode(secretKey);

  return {
    publicKey,
    secretKey: secretKeyBase58,
  };
}
