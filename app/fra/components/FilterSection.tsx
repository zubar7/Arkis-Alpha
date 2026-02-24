'use client';

import { useState, useEffect, useRef } from 'react';

interface FilterSectionProps {
  selectedCoin: string;
  setSelectedCoin: (coin: string) => void;
  selectedExchanges: string[];
  setSelectedExchanges: (exchanges: string[]) => void;
  estimationWindow: string;
  setEstimationWindow: (window: string) => void;
  futuresLeverage: number;
  setFuturesLeverage: (leverage: number) => void;
  arkisBorrowCapital: number;
  setArkisBorrowCapital: (capital: number) => void;
  borrowCost: number;
  setBorrowCost: (cost: number) => void;
  minTradeAPY: number;
  setMinTradeAPY: (apy: number) => void;
}

const coins = ['AVAX', 'BTC', 'ETH', 'HYPE', 'LIT', 'SOL'];
const exchanges = ['HYPERLIQUID', 'BYBIT', 'BINANCE', 'BITGET', 'OKX', 'HUOBI', 'LIGHTER'];
const windows = ['1D', '3D', '1W', '2W', '1M', '3M'];
const leveragePresets = [2, 3, 5];
const capitalPresets = [2, 3, 5];

// Coin icon URLs
const coinIcons: Record<string, string> = {
  'AVAX': '/icons/tokens/avax.png',
  'BTC': '/icons/tokens/btc.png',
  'ETH': '/icons/tokens/eth.png',
  'HYPE': '/icons/tokens/hype.png',
  'LIT': '/icons/tokens/lit.png',
  'SOL': '/icons/tokens/sol.png',
};

// Exchange icon URLs
const exchangeIcons: Record<string, string> = {
  'HYPERLIQUID': '/icons/exchanges/hyperliquid.png',
  'BYBIT': '/icons/exchanges/bybit.png',
  'BINANCE': '/icons/exchanges/binance.png',
  'BITGET': '/icons/exchanges/bitget.png',
  'OKX': '/icons/exchanges/okx.png',
  'HUOBI': '/icons/exchanges/huobi.png',
  'LIGHTER': '/icons/exchanges/lighter.png',
};

// Exchange display names (title case)
const exchangeNames: Record<string, string> = {
  'HYPERLIQUID': 'Hyperliquid',
  'BYBIT': 'Bybit',
  'BINANCE': 'Binance',
  'BITGET': 'Bitget',
  'OKX': 'OKX',
  'HUOBI': 'Huobi',
  'LIGHTER': 'Lighter',
};

export default function FilterSection({
  selectedCoin,
  setSelectedCoin,
  selectedExchanges,
  setSelectedExchanges,
  estimationWindow,
  setEstimationWindow,
  futuresLeverage,
  setFuturesLeverage,
  arkisBorrowCapital,
  setArkisBorrowCapital,
  borrowCost,
  setBorrowCost,
  minTradeAPY,
  setMinTradeAPY,
}: FilterSectionProps) {
  const [inWallet, setInWallet] = useState(false);
  const [coinDropdownOpen, setCoinDropdownOpen] = useState(false);
  const [coinSearch, setCoinSearch] = useState('');
  const [exchangeDropdownOpen, setExchangeDropdownOpen] = useState(false);
  const coinDropdownRef = useRef<HTMLDivElement>(null);
  const exchangeDropdownRef = useRef<HTMLDivElement>(null);

  const toggleExchange = (exchange: string) => {
    if (selectedExchanges.includes(exchange)) {
      setSelectedExchanges(selectedExchanges.filter((e) => e !== exchange));
    } else {
      setSelectedExchanges([...selectedExchanges, exchange]);
    }
  };

  const selectAllExchanges = () => {
    setSelectedExchanges(exchanges);
  };

  const clearAllExchanges = () => {
    setSelectedExchanges([]);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (coinDropdownRef.current && !coinDropdownRef.current.contains(event.target as Node)) {
        setCoinDropdownOpen(false);
        setCoinSearch('');
      }
      if (exchangeDropdownRef.current && !exchangeDropdownRef.current.contains(event.target as Node)) {
        setExchangeDropdownOpen(false);
      }
    };

    if (coinDropdownOpen || exchangeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [coinDropdownOpen, exchangeDropdownOpen]);

  return (
    <div className="rounded-[10px] border border-[rgba(255,255,255,0.03)] bg-[#181923] p-[25px]">
      <div className="space-y-[24px]">
        {/* Header */}
        <div className="pb-[16px]">
          <h2 className="text-[20px] font-semibold text-white tracking-[-0.42px] leading-[28px]">
            Position Settings
          </h2>
        </div>

        {/* Row 1: Coin + Exchanges + Estimation Window */}
        <div className="flex items-start justify-between gap-[24px]">
          {/* Left: Coin + Exchange */}
          <div className="flex gap-[12px] items-start">
            {/* Coin Selector */}
            <div className="relative" ref={coinDropdownRef}>
              <button
                onClick={() => setCoinDropdownOpen(!coinDropdownOpen)}
                className="bg-[#222430] flex gap-[8px] items-center pl-[12px] pr-[8px] h-[38px] rounded-[8px] hover:bg-[#2a2d37] transition-colors"
              >
                <p className="text-[12px] font-medium text-white tracking-[-0.42px]">
                  Coin:
                </p>
                <div className="flex gap-[4px] items-center">
                  <div className="size-[16px] rounded-full overflow-hidden">
                    <img
                      src={coinIcons[selectedCoin]}
                      alt={selectedCoin}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[12px] font-medium text-white tracking-[-0.42px]">
                    {selectedCoin}
                  </p>
                </div>
                <div className="size-[16px] opacity-50">
                  <svg viewBox="0 0 16 16" fill="currentColor" className="text-[#6a7282]">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>

              {/* Dropdown */}
              {coinDropdownOpen && (
                <div className="absolute top-full mt-[8px] bg-[#222430] border border-[rgba(255,255,255,0.03)] rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] min-w-[200px] w-[255px] max-h-[472px] overflow-hidden z-50">
                  {/* Search Input - integrated as top part */}
                  <div className="flex gap-[8px] items-center px-[12px] h-[40px] border-b border-[rgba(255,255,255,0.03)]">
                    <div className="size-[16px] opacity-50">
                      <svg viewBox="0 0 16 16" fill="none" className="text-[#6a7282]">
                        <path d="M7 12a5 5 0 100-10 5 5 0 000 10zM12 12l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search asset"
                      value={coinSearch}
                      onChange={(e) => setCoinSearch(e.target.value)}
                      className="flex-1 bg-transparent text-[12px] font-medium text-[#6a7282] tracking-[-0.36px] leading-[16px] outline-none placeholder:text-[#6a7282]"
                    />
                  </div>

                  {/* Coin List */}
                  <div className="p-[4px]">
                    {coins
                      .filter(coin => coin.toLowerCase().includes(coinSearch.toLowerCase()))
                      .map((coin) => (
                        <button
                          key={coin}
                          onClick={() => {
                            setSelectedCoin(coin);
                            setCoinDropdownOpen(false);
                            setCoinSearch('');
                          }}
                          className={`w-full flex gap-[8px] items-center px-[8px] py-[8px] rounded-[4px] transition-colors ${
                            selectedCoin === coin
                              ? 'bg-[rgba(106,114,130,0.24)]'
                              : 'hover:bg-[rgba(106,114,130,0.12)]'
                          }`}
                        >
                          <div className="size-[16px] rounded-full overflow-hidden">
                            <img
                              src={coinIcons[coin]}
                              alt={coin}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="flex-1 text-left text-[12px] font-medium text-white tracking-[-0.36px] leading-[16px] overflow-hidden text-ellipsis whitespace-nowrap">
                            {coin}
                          </p>
                          {selectedCoin === coin && (
                            <div className="size-[16px]">
                              <svg viewBox="0 0 16 16" fill="none" className="text-white">
                                <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>

            {/* Exchange Selector - Chips with Dropdown */}
            <div className="relative" ref={exchangeDropdownRef}>
              <button
                onClick={() => setExchangeDropdownOpen(!exchangeDropdownOpen)}
                className="bg-[#222430] flex gap-[8px] items-center px-[12px] h-[38px] rounded-[8px] hover:bg-[#2a2d37] transition-colors"
              >
                <p className="text-[12px] font-medium text-white tracking-[-0.42px] leading-[0]">
                  Exchange:
                </p>

                {/* Selected Exchange Chips or Empty State */}
                {selectedExchanges.length > 0 ? (
                  <div className="flex gap-[4px] items-center">
                    {selectedExchanges.slice(0, 2).map((exchange) => (
                      <div
                        key={exchange}
                        className="bg-[#181923] px-[6px] py-[4px] rounded-[6px] flex gap-[4px] items-center"
                      >
                        <div className="size-[16px] rounded-full overflow-hidden shrink-0">
                          <img
                            src={exchangeIcons[exchange]}
                            alt={exchangeNames[exchange]}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-[12px] font-medium text-white tracking-[-0.42px] leading-[normal]">
                          {exchangeNames[exchange]}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExchange(exchange);
                          }}
                          className="size-[16px] flex items-center justify-center transition-colors"
                        >
                          <svg viewBox="0 0 16 16" fill="none" className="text-[rgba(106,114,130,0.5)] w-[12px] h-[12px]">
                            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                    {selectedExchanges.length > 2 && (
                      <div className="bg-[#181923] px-[6px] py-[4px] rounded-[6px] flex items-center">
                        <p className="text-[12px] font-medium text-white tracking-[-0.42px] leading-[normal]">
                          +{selectedExchanges.length - 2}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[normal]">
                    None selected
                  </p>
                )}

                {/* Dropdown Icon */}
                <div className="pl-[4px]">
                  <svg viewBox="0 0 16 16" fill="none" className="text-[rgba(106,114,130,0.5)] w-[16px] h-[16px]">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </button>

              {/* Dropdown */}
              {exchangeDropdownOpen && (
                <div className="absolute top-full mt-[8px] left-0 bg-[#222430] border border-[rgba(255,255,255,0.03)] rounded-[8px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.08)] min-w-[200px] w-[255px] max-h-[380px] overflow-hidden z-50">
                  <div className="p-[4px] max-h-[380px] overflow-y-auto">
                    {/* All option - toggles between select all and clear all */}
                    <button
                      onClick={() => {
                        if (selectedExchanges.length === exchanges.length) {
                          clearAllExchanges();
                        } else {
                          selectAllExchanges();
                        }
                      }}
                      className="w-full flex gap-[8px] items-center px-[8px] py-[8px] rounded-[4px] transition-colors hover:bg-[rgba(106,114,130,0.24)]"
                    >
                      <div className={`size-[16px] rounded-[4px] border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${
                        selectedExchanges.length === exchanges.length
                          ? 'bg-[#619ee1] border-[#619ee1]'
                          : 'border-[#6a7282]'
                      }`}>
                        {selectedExchanges.length === exchanges.length && (
                          <svg viewBox="0 0 16 16" fill="none" className="text-white w-[10px] h-[10px]">
                            <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className="size-[16px] rounded-full overflow-hidden shrink-0 bg-[#6a7282] flex items-center justify-center">
                        <svg viewBox="0 0 16 16" fill="none" className="text-white w-[10px] h-[10px]">
                          <path d="M3 8h10M8 3v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <p className="flex-1 text-left text-[12px] font-medium text-white tracking-[-0.36px] leading-[16px]">
                        All
                      </p>
                    </button>

                    {/* Individual exchanges */}
                    {exchanges.map((exchange) => (
                      <button
                        key={exchange}
                        onClick={() => toggleExchange(exchange)}
                        className="w-full flex gap-[8px] items-center px-[8px] py-[8px] rounded-[4px] transition-colors hover:bg-[rgba(106,114,130,0.24)]"
                      >
                        <div className={`size-[16px] rounded-[4px] border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${
                          selectedExchanges.includes(exchange)
                            ? 'bg-[#619ee1] border-[#619ee1]'
                            : 'border-[#6a7282]'
                        }`}>
                          {selectedExchanges.includes(exchange) && (
                            <svg viewBox="0 0 16 16" fill="none" className="text-white w-[10px] h-[10px]">
                              <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                        <div className="size-[16px] rounded-full overflow-hidden shrink-0">
                          <img
                            src={exchangeIcons[exchange]}
                            alt={exchange}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="flex-1 text-left text-[12px] font-medium text-white tracking-[-0.36px] leading-[16px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {exchangeNames[exchange]}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Estimation Window */}
          <div className="bg-[#222430] flex items-center p-[2px] rounded-[8px] h-[38px]">
            {windows.map((window) => (
              <button
                key={window}
                onClick={() => setEstimationWindow(window)}
                className={`min-w-[48px] max-w-[108px] px-[12px] h-[34px] rounded-[6px] text-[12px] font-medium text-white tracking-[-0.36px] transition-colors flex items-center justify-center ${
                  estimationWindow === window
                    ? 'bg-[#181923]'
                    : 'hover:bg-[#181923]/50'
                }`}
              >
                {window}
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="flex gap-[24px]">
          {/* Position Sizing Section */}
          <div className="flex-1 flex flex-col gap-[24px]">
            <h3 className="text-[16px] font-semibold text-white tracking-[-0.42px] leading-[24px]">Position Sizing</h3>
            <div className="flex flex-col gap-[24px]">
              {/* Futures Leverage */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center justify-between">
                  <div className="relative group inline-block w-fit">
                    <span className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] underline decoration-dotted cursor-help leading-[20px]">
                      Futures Leverage
                    </span>
                    <div className="absolute left-0 top-full mt-2 px-3 py-2 bg-[#222430] border border-[#2a2d37] rounded-[8px] text-[11px] text-white whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-lg">
                      Multiplier applied to your futures positions
                    </div>
                  </div>
              <div className="flex items-center gap-[4px]">
                <button
                  onClick={() => setFuturesLeverage(2)}
                  className="bg-[#222c3e] border border-[#3b5a7f] text-[#619ee1] px-[6px] py-[4px] rounded-[6px] text-[12px] font-medium tracking-[-0.36px] leading-[16px] hover:bg-[#2a3548] transition-colors"
                >
                  x2
                </button>
                <button
                  onClick={() => setFuturesLeverage(3)}
                  className="bg-[#222c3e] border border-[#3b5a7f] text-[#619ee1] px-[6px] py-[4px] rounded-[6px] text-[12px] font-medium tracking-[-0.36px] leading-[16px] hover:bg-[#2a3548] transition-colors"
                >
                  x3
                </button>
                <button
                  onClick={() => setFuturesLeverage(5)}
                  className="bg-[#222c3e] border border-[#3b5a7f] text-[#619ee1] px-[6px] py-[4px] rounded-[6px] text-[12px] font-medium tracking-[-0.36px] leading-[16px] hover:bg-[#2a3548] transition-colors"
                >
                  Max x5
                </button>
              </div>
                </div>
            <div className="flex items-center gap-[10px]">
              <div className="flex-1 h-[12px] relative">
                {/* Segmented background */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[10px] flex gap-[4px]">
                  <div className="flex-1 bg-[#2a2d37] rounded-full" />
                  <div className="flex-1 bg-[#2a2d37] rounded-full" />
                  <div className="flex-1 bg-[#2a2d37] rounded-full" />
                  <div className="flex-1 bg-[#2a2d37] rounded-full" />
                </div>
                {/* Blue fill overlay */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[10px] rounded-[30px] overflow-hidden pointer-events-none">
                  <div
                    className="absolute top-0 bottom-0 bg-[#619ee1] rounded-[30px] transition-all duration-200"
                    style={{
                      left: '0',
                      width: `${((futuresLeverage - 1) / (5 - 1)) * 100}%`,
                    }}
                  />
                </div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[12px] h-[12px] bg-white rounded-full cursor-pointer shadow-sm"
                  style={{
                    left: `${((futuresLeverage - 1) / (5 - 1)) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.1"
                  value={futuresLeverage}
                  onChange={(e) => setFuturesLeverage(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="relative min-w-[56px] bg-[#222430] rounded-[8px] p-[10px] flex gap-[2px] items-center justify-end h-[32px]">
                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px] flex-1">x</p>
                <input
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={futuresLeverage.toFixed(1)}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (!isNaN(val)) {
                      setFuturesLeverage(val);
                    }
                  }}
                  onBlur={(e) => {
                    const val = Number(e.target.value);
                    if (isNaN(val) || val < 1) setFuturesLeverage(1);
                    else if (val > 5) setFuturesLeverage(5);
                  }}
                  className="bg-transparent text-white text-[12px] font-medium text-right tracking-[-0.42px] leading-[16px] outline-none w-[24px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>

              {/* Arkis Borrow Capital */}
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center justify-between">
                  <div className="relative group inline-block w-fit">
                    <span className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] underline decoration-dotted cursor-help leading-[20px]">
                      Arkis Borrow Capital
                    </span>
                    <div className="absolute left-0 top-full mt-2 px-3 py-2 bg-[#222430] border border-[#2a2d37] rounded-[8px] text-[11px] text-white whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-lg">
                      Amount of capital you can borrow from Arkis
                    </div>
                  </div>
              <div className="flex items-center gap-[4px]">
                <button
                  onClick={() => setArkisBorrowCapital(2)}
                  className="bg-[#222c3e] border border-[#3b5a7f] text-[#619ee1] px-[6px] py-[4px] rounded-[6px] text-[12px] font-medium tracking-[-0.36px] leading-[16px] hover:bg-[#2a3548] transition-colors"
                >
                  x2
                </button>
                <button
                  onClick={() => setArkisBorrowCapital(3)}
                  className="bg-[#222c3e] border border-[#3b5a7f] text-[#619ee1] px-[6px] py-[4px] rounded-[6px] text-[12px] font-medium tracking-[-0.36px] leading-[16px] hover:bg-[#2a3548] transition-colors"
                >
                  x3
                </button>
                <button
                  onClick={() => setArkisBorrowCapital(5)}
                  className="bg-[#222c3e] border border-[#3b5a7f] text-[#619ee1] px-[6px] py-[4px] rounded-[6px] text-[12px] font-medium tracking-[-0.36px] leading-[16px] hover:bg-[#2a3548] transition-colors"
                >
                  Max x5
                </button>
              </div>
                </div>
            <div className="flex items-center gap-[10px]">
              <div className="flex-1 h-[12px] relative">
                {/* Segmented background */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[10px] flex gap-[4px]">
                  <div className="flex-1 bg-[#2a2d37] rounded-full" />
                  <div className="flex-1 bg-[#2a2d37] rounded-full" />
                  <div className="flex-1 bg-[#2a2d37] rounded-full" />
                  <div className="flex-1 bg-[#2a2d37] rounded-full" />
                  <div className="flex-1 bg-[#2a2d37] rounded-full" />
                </div>
                {/* Blue fill overlay */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[10px] rounded-[30px] overflow-hidden pointer-events-none">
                  <div
                    className="absolute top-0 bottom-0 bg-[#619ee1] rounded-[30px] transition-all duration-200"
                    style={{
                      left: '0',
                      width: `${(arkisBorrowCapital / 5) * 100}%`,
                    }}
                  />
                </div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[12px] h-[12px] bg-white rounded-full cursor-pointer shadow-sm"
                  style={{
                    left: `${(arkisBorrowCapital / 5) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={arkisBorrowCapital}
                  onChange={(e) => setArkisBorrowCapital(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="relative min-w-[56px] bg-[#222430] rounded-[8px] p-[10px] flex gap-[2px] items-center justify-end h-[32px]">
                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px] flex-1">x</p>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={arkisBorrowCapital.toFixed(1)}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (!isNaN(val)) {
                      setArkisBorrowCapital(val);
                    }
                  }}
                  onBlur={(e) => {
                    const val = Number(e.target.value);
                    if (isNaN(val) || val < 0) setArkisBorrowCapital(0);
                    else if (val > 5) setArkisBorrowCapital(5);
                  }}
                  className="bg-transparent text-white text-[12px] font-medium text-right tracking-[-0.42px] leading-[16px] outline-none w-[24px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>
            </div>
          </div>

          {/* Trade Parameters Section */}
          <div className="flex-1 flex flex-col gap-[24px]">
            <h3 className="text-[16px] font-semibold text-white tracking-[-0.42px] leading-[24px]">Trade Parameters</h3>
            <div className="flex flex-col gap-[24px]">
              {/* Borrow Cost (APY) */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center justify-between min-h-[24px]">
                  <div className="relative group inline-block w-fit">
                    <span className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] underline decoration-dotted cursor-help leading-[20px]">
                      Borrow Cost (APY)
                    </span>
                    <div className="absolute left-0 top-full mt-2 px-3 py-2 bg-[#222430] border border-[#2a2d37] rounded-[8px] text-[11px] text-white whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-lg">
                      Annual percentage rate for borrowed capital
                    </div>
                  </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <div className="flex-1 h-[12px] relative">
                {/* Track background */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[10px] bg-[#2a2d37] rounded-[30px]" />
                {/* Blue fill overlay */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[10px] rounded-[30px] overflow-hidden pointer-events-none">
                  <div
                    className="absolute top-0 bottom-0 bg-[#619ee1] rounded-[30px] transition-all duration-200"
                    style={{
                      left: '0',
                      width: `${((borrowCost - 0.05) / (0.15 - 0.05)) * 100}%`,
                    }}
                  />
                </div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[12px] h-[12px] bg-white rounded-full cursor-pointer shadow-sm"
                  style={{
                    left: `${((borrowCost - 0.05) / (0.15 - 0.05)) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min="0.05"
                  max="0.15"
                  step="0.01"
                  value={borrowCost}
                  onChange={(e) => setBorrowCost(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="relative min-w-[56px] bg-[#222430] rounded-[8px] p-[10px] flex gap-[2px] items-center justify-end h-[32px]">
                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px] flex-1">%</p>
                <input
                  type="number"
                  min="5"
                  max="15"
                  step="0.1"
                  value={(borrowCost * 100).toFixed(1)}
                  onChange={(e) => {
                    const val = Number(e.target.value) / 100;
                    if (!isNaN(val)) {
                      setBorrowCost(val);
                    }
                  }}
                  onBlur={(e) => {
                    const val = Number(e.target.value) / 100;
                    if (isNaN(val) || val < 0.05) setBorrowCost(0.05);
                    else if (val > 0.15) setBorrowCost(0.15);
                  }}
                  className="bg-transparent text-white text-[12px] font-medium text-right tracking-[-0.42px] leading-[16px] outline-none w-[24px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>

              {/* Min Trade APY */}
              <div className="flex flex-col gap-[12px]">
                <div className="flex items-center justify-between min-h-[24px]">
                  <div className="relative group inline-block w-fit">
                    <span className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] underline decoration-dotted cursor-help leading-[20px]">
                      Min Trade APY
                    </span>
                    <div className="absolute left-0 top-full mt-2 px-3 py-2 bg-[#222430] border border-[#2a2d37] rounded-[8px] text-[11px] text-white whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 shadow-lg">
                      Minimum acceptable annual return for trades
                    </div>
                  </div>
            </div>
            <div className="flex items-center gap-[10px]">
              <div className="flex-1 h-[12px] relative">
                {/* Track background */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[10px] bg-[#2a2d37] rounded-[30px]" />
                {/* Blue fill overlay */}
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[10px] rounded-[30px] overflow-hidden pointer-events-none">
                  <div
                    className="absolute top-0 bottom-0 bg-[#619ee1] rounded-[30px] transition-all duration-200"
                    style={{
                      left: '0',
                      width: `${((minTradeAPY - 0.07) / (0.3 - 0.07)) * 100}%`,
                    }}
                  />
                </div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[12px] h-[12px] bg-white rounded-full cursor-pointer shadow-sm"
                  style={{
                    left: `${((minTradeAPY - 0.07) / (0.3 - 0.07)) * 100}%`,
                  }}
                />
                <input
                  type="range"
                  min="0.07"
                  max="0.3"
                  step="0.01"
                  value={minTradeAPY}
                  onChange={(e) => setMinTradeAPY(Number(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>
              <div className="relative min-w-[56px] bg-[#222430] rounded-[8px] p-[10px] flex gap-[2px] items-center justify-end h-[32px]">
                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px] flex-1">%</p>
                <input
                  type="number"
                  min="7"
                  max="30"
                  step="1"
                  value={(minTradeAPY * 100).toFixed(0)}
                  onChange={(e) => {
                    const val = Number(e.target.value) / 100;
                    if (!isNaN(val)) {
                      setMinTradeAPY(val);
                    }
                  }}
                  onBlur={(e) => {
                    const val = Number(e.target.value) / 100;
                    if (isNaN(val) || val < 0.07) setMinTradeAPY(0.07);
                    else if (val > 0.3) setMinTradeAPY(0.3);
                  }}
                  className="bg-transparent text-white text-[12px] font-medium text-right tracking-[-0.42px] leading-[16px] outline-none w-[24px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
