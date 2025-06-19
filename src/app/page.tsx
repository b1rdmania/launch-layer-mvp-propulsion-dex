import React, { useState } from "react";
import Swap from "./components/Swap";
import AddLiquidity from "./components/AddLiquidity";
import MyPositions from "./components/MyPositions";

const TABS = ["Swap", "Add Liquidity", "My Positions"];

export default function Home() {
  const [tab, setTab] = useState(0);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12">
      <h1 className="text-3xl font-bold mb-6">Propulsion DEX</h1>
      <div className="flex gap-4 mb-8">
        {TABS.map((t, i) => (
          <button
            key={t}
            className={`px-4 py-2 rounded ${tab === i ? "bg-black text-white" : "bg-white border"}`}
            onClick={() => setTab(i)}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="w-full max-w-xl">
        {tab === 0 && <Swap />}
        {tab === 1 && <AddLiquidity />}
        {tab === 2 && <MyPositions />}
      </div>
      <div className="mt-12">
        <a
          href="/beta"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Try Beta UX
        </a>
      </div>
    </div>
  );
}
