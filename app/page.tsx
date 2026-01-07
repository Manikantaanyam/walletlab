"use client";

import { SolonaWallet } from "@/lib/derivation/solona";
import { generateNewMnemonic } from "@/lib/mnemonic/generateMnemonic";
import { useEffect, useState } from "react";

export default function Home() {
  const [mnemonics, setMnemonics] = useState("");
  const [publicKey, setPublicKey] = useState<string | undefined>("");
  const [secretKey, setSecretKey] = useState<string | undefined>("");
  const [visible, setVisible] = useState<boolean>(false);

  async function generateWallet() {
    const mnemonicsString = generateNewMnemonic();
    setMnemonics(mnemonicsString);
    const keyPair = SolonaWallet(mnemonicsString);
    setPublicKey(keyPair.publicKey);
    setSecretKey(keyPair.secretKey);
  }

  // if (mnemonics.length === 0) {
  //   return <div>Loading..</div>;
  // }

  async function copyMnemonics(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.log("error occured during copying the content", e);
    }
  }

  return (
    <div className=" flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4">
        <div className="mt-10 flex items-start">
          <button
            onClick={() => generateWallet()}
            className="px-6 py-2 bg-orange-400 rounded-md"
          >
            generate wallet
          </button>
        </div>
        {secretKey && (
          <div>
            <div className="grid grid-cols-3 gap-4 mb-10">
              {mnemonics.split(" ").map((word) => (
                <p>{word}</p>
              ))}
            </div>

            <div className="mb-4 ">
              <button
                onClick={() => {
                  copyMnemonics(mnemonics);
                }}
                className="mt-4 cursor-pointer px-4 py-1.5 bg-yellow-400 rounded-md text-black"
              >
                copy
              </button>
            </div>

            <div>
              <p>public key: {publicKey}</p>
              <button
                className="cursor-pointer bg-red-500 px-4 py-1.5 rounded-md w-16 flex justify-center items-center"
                onClick={() => setVisible((p) => !p)}
              >
                {visible ? "hide" : "show"}
              </button>

              {visible ? <p>private key: {secretKey}</p> : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
