"use client";

import { CRYPTOS } from "@/constants/constant";
import EthereumWallet from "@/lib/derivation/ethers";
import { SolonaWallet } from "@/lib/derivation/solona";
import { generateNewMnemonic } from "@/lib/mnemonic/generateMnemonic";
import { Copy, Eye, EyeOff, RefreshCw, ShieldAlert } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [mnemonics, setMnemonics] = useState("");
  const [publicKey, setPublicKey] = useState<string | undefined>("");
  const [secretKey, setSecretKey] = useState<string | undefined>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cryptoName, setCryptoName] = useState<string>("Solana");

  async function generateWallet() {
    try {
      setLoading(true);
      const mnemonicsString = generateNewMnemonic();
      setMnemonics(mnemonicsString);
      let keyPair;
      if (cryptoName === "Solana") {
        keyPair = SolonaWallet(mnemonicsString);
      } else {
        keyPair = EthereumWallet(mnemonicsString);
      }
      setPublicKey(keyPair?.publicKey);
      setSecretKey(keyPair?.secretKey);
      setLoading(false);
    } catch (e) {
      console.log("Error occured while creating wallet", e);
    } finally {
      setLoading(false);
    }
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (e) {
      console.log("error occured during copying the content", e);
    }
  }

  return (
    <div className="w-full min-h-screen p-4 md:p-8 flex flex-col items-center">
      <div className="max-w-2xl w-full space-y-8">
        <h1 className="text-3xl font-bold tracking-tight text-center">
          Wallet Generator
        </h1>

        <div>
          <div className="flex gap-3">
            {CRYPTOS.map((crypto) => (
              <button
                onClick={() => setCryptoName(crypto.name)}
                className={`px-3 py-1.5 rounded-md cursor-pointer text-sm ${
                  cryptoName == crypto.name ? "bg-red-500 " : "bg-red-500/50 "
                }`}
                key={crypto.id}
              >
                {crypto.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-2">
          <button
            onClick={generateWallet}
            disabled={loading}
            className="group relative flex items-center gap-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-xl transition-all active:scale-95 disabled:opacity-70"
          >
            {loading ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              `Generate ${cryptoName} Wallet`
            )}
          </button>
        </div>
        <div className=" flex flex-col justify-center items-center gap-4">
          {secretKey && (
            <div className="space-y-6 ">
              <section className="border border-white/10 rounded-md p-6 ">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    copy phrase
                  </h2>
                  <button
                    onClick={() => copyToClipboard(mnemonics)}
                    className="p-2 rounded-lg transition-colors cursor-pointer hover:text-orange-500"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {mnemonics.split(" ").map((word, index) => (
                    <div
                      key={index}
                      className="border border-slate-100/10  rounded-lg p-2 flex justify-center gap-2 overflow-hidden"
                    >
                      <span className="font-medium truncate">{word}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-lg border border-amber-100/10 flex gap-3 items-center">
                  <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
                  <p className="text-xs text-amber-800">
                    Store this phrase securely. Anyone with these 12 words can
                    access your funds.
                  </p>
                </div>
              </section>

              <section className="border border-gray-100/10 text-white rounded-2xl p-6 shadow-xl space-y-6">
                <div>
                  <label className="text-xs font-uppercase tracking-widest text-slate-400 block mb-2">
                    PUBLIC KEY
                  </label>
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-700">
                    <code className="text-sm break-all flex-1 text-orange-200">
                      {publicKey}
                    </code>
                    <button
                      onClick={() => publicKey && copyToClipboard(publicKey)}
                      className="hover:text-orange-400 cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-uppercase tracking-widest">
                      PRIVATE KEY
                    </label>
                    <button
                      onClick={() => setVisible(!visible)}
                      className="flex items-center gap-1 cursor-pointer text-xs hover:text-white  transition-colors"
                    >
                      {visible ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                      {visible ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="p-3 rounded-lg border border-gray-700 min-h-12 flex items-center">
                    {visible ? (
                      <code className="text-sm break-all text-red-300">
                        {secretKey}
                      </code>
                    ) : (
                      <div>
                        ............................................................................
                      </div>
                    )}
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
