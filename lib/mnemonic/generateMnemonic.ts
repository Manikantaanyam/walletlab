import { generateMnemonic } from "bip39";

export function generateNewMnemonic(): string {
  return generateMnemonic(128);
}
