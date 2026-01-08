import { HDNodeWallet } from "ethers";

// Ethereum uses secp256k1 curve
export default function EthereumWallet(mnemonic: string) {
  // Ehtereum path
  const path = `m/44'/60'/0'/0/0`;

  // need not need to create a seed phrase from mnemonics it does this internally
  // the empty string is for password (by default "") also called 13th word which is used in converting mneomincs to seed
  const wallet = HDNodeWallet.fromPhrase(mnemonic, "", path);

  return {
    publicKey: wallet.address,
    secretKey: wallet.privateKey,
  };
}
