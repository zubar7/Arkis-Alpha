'use client';

import { useState } from 'react';
import Header from './components/Header';
import FilterSection from './components/FilterSection';
import OpportunitiesTable from './components/OpportunitiesTable';

export default function FRADashboard() {
  const [activeTab, setActiveTab] = useState<'perp-perp' | 'carry-trade'>('perp-perp');
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [selectedExchanges, setSelectedExchanges] = useState([
    'HYPERLIQUID', 'BYBIT', 'BINANCE', 'BITGET', 'OKX', 'HUOBI', 'LIGHTER'
  ]);
  const [estimationWindow, setEstimationWindow] = useState('1W');
  const [futuresLeverage, setFuturesLeverage] = useState(2);
  const [arkisBorrowCapital, setArkisBorrowCapital] = useState(3);
  const [borrowCost, setBorrowCost] = useState(0.05);
  const [minTradeAPY, setMinTradeAPY] = useState(0.1);

  return (
    <div className="min-h-screen bg-[#0d0f14] text-gray-100 pt-[16px] px-[16px]">
      <Header />

      <main className="max-w-5xl mx-auto pt-[80px] pb-[80px] space-y-6">
        {/* Heading and Tab Navigation */}
        <div className="flex flex-col gap-[24px]">
          <h1 className="text-[40px] font-bold leading-[40px] tracking-[-1.2px] text-white whitespace-pre-wrap">
            Arkis Alpha
          </h1>

          {/* Tab Navigation */}
          <div className="flex items-center p-[2px] rounded-[8px] bg-[#181923] w-fit relative shadow-[inset_0px_6px_12px_0px_rgba(0,0,0,0.02),inset_0px_0.75px_0.75px_0px_rgba(0,0,0,0.02),inset_0px_0.25px_0.25px_0px_rgba(0,0,0,0.04)]">
          <button
            onClick={() => setActiveTab('perp-perp')}
            className={`min-w-[48px] max-w-[108px] px-[12px] py-[8px] rounded-[6px] text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px] text-center whitespace-pre-wrap transition-colors ${
              activeTab === 'perp-perp'
                ? 'bg-[#222430]'
                : 'hover:bg-[#222430]/50'
            }`}
          >
            Perp–Perp
          </button>
          <button
            onClick={() => setActiveTab('carry-trade')}
            className={`min-w-[48px] max-w-[108px] px-[12px] py-[8px] rounded-[6px] text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px] text-center whitespace-pre-wrap transition-colors ${
              activeTab === 'carry-trade'
                ? 'bg-[#222430]'
                : 'hover:bg-[#222430]/50'
            }`}
          >
            Carry Trade
          </button>
          </div>
        </div>

        {/* Filters */}
        <FilterSection
          selectedCoin={selectedCoin}
          setSelectedCoin={setSelectedCoin}
          selectedExchanges={selectedExchanges}
          setSelectedExchanges={setSelectedExchanges}
          estimationWindow={estimationWindow}
          setEstimationWindow={setEstimationWindow}
          futuresLeverage={futuresLeverage}
          setFuturesLeverage={setFuturesLeverage}
          arkisBorrowCapital={arkisBorrowCapital}
          setArkisBorrowCapital={setArkisBorrowCapital}
          borrowCost={borrowCost}
          setBorrowCost={setBorrowCost}
          minTradeAPY={minTradeAPY}
          setMinTradeAPY={setMinTradeAPY}
        />

        {/* Opportunities Table */}
        <OpportunitiesTable
          selectedCoin={selectedCoin}
          estimationWindow={estimationWindow}
        />
      </main>
    </div>
  );
}
