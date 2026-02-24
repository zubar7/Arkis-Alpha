'use client';

import React, { useState } from 'react';

interface OpportunitiesTableProps {
  activeTab: 'perp-perp' | 'carry-trade';
  selectedCoin: string;
  estimationWindow: string;
}

const opportunities = [
  {
    id: 1,
    long: { exchange: 'BITGET', pair: 'BTC-USDT' },
    short: { exchange: 'HUOBI', pair: 'BTC-USDT' },
    unleveredAPY: 4.02,
    leveredAPY: 17.2,
    wallet: 1.0,
    arkisBorrow: 3.0,
    borrowRate: 5.0,
    longCollateral: 2.0,
    longNotional: 4.0,
    longLeverage: 2,
    longFunding: 0.39,
    longFundingType: 'Pay',
    shortCollateral: 2.0,
    shortNotional: 4.0,
    shortLeverage: 2,
    shortFunding: 8.44,
    shortFundingType: 'Collect',
    netFundingSpread: 8.05,
    borrowCostYearly: 150,
  },
  {
    id: 2,
    long: { exchange: 'BINANCE', pair: 'BTC-USDT' },
    short: { exchange: 'HUOBI', pair: 'BTC-USDT' },
    unleveredAPY: 3.33,
    leveredAPY: 11.6,
    wallet: 1.0,
    arkisBorrow: 3.0,
    borrowRate: 5.0,
    longCollateral: 2.0,
    longNotional: 4.0,
    longLeverage: 2,
    longFunding: 0.28,
    longFundingType: 'Pay',
    shortCollateral: 2.0,
    shortNotional: 4.0,
    shortLeverage: 2,
    shortFunding: 6.95,
    shortFundingType: 'Collect',
    netFundingSpread: 6.67,
    borrowCostYearly: 150,
  },
];

// Carry Trade opportunities data
const carryTradeOpportunities = [
  {
    id: 1,
    long: { asset: 'LBTC', platform: 'Lombard' },
    short: { exchange: 'HUOBI', pair: 'BTC-USDT' },
    unleveredAPY: 6.64,
    leveredAPY: 11.5,
    wallet: 1.0,
    arkisBorrow: 3.0,
    borrowRate: 5.0,
    capitalPool: 4.0,
    spotPercent: 75,
    marginPercent: 25,
    allocation: 3.0,
    stakingAPY: 0.41,
    margin: 1.0,
    notional: 3.0,
    leverage: 3,
    funding: 8.44,
    fundingType: 'Collect',
    stakingYield: 0.41,
    fundingCollected: 8.44,
    borrowCostYearly: 150,
    leveredAPYFooter: 11.55,
  },
  {
    id: 2,
    long: { asset: 'Naked Spot', platform: 'Binance' },
    short: { exchange: 'HUOBI', pair: 'BTC-USDT' },
    unleveredAPY: 6.33,
    leveredAPY: 10.3,
    wallet: 1.0,
    arkisBorrow: 3.0,
    borrowRate: 5.0,
    capitalPool: 4.0,
    spotPercent: 75,
    marginPercent: 25,
    allocation: 3.0,
    stakingAPY: 0.41,
    margin: 1.0,
    notional: 3.0,
    leverage: 3,
    funding: 8.44,
    fundingType: 'Collect',
    stakingYield: 0.41,
    fundingCollected: 8.44,
    borrowCostYearly: 150,
    leveredAPYFooter: 10.3,
  },
];

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

export default function OpportunitiesTable({
  activeTab,
  selectedCoin,
  estimationWindow,
}: OpportunitiesTableProps) {
  const [expandedRows, setExpandedRows] = useState<number[]>([1]);
  const [watchlist, setWatchlist] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleWatchlist = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((oppId) => oppId !== id) : [...prev, id]
    );
  };

  // Select opportunities based on activeTab
  const allOpportunities = activeTab === 'carry-trade' ? carryTradeOpportunities : opportunities;
  const watchlistOpportunities = allOpportunities.filter(opp => watchlist.includes(opp.id));
  const regularOpportunities = allOpportunities.filter(opp => !watchlist.includes(opp.id));

  return (
    <div className="flex flex-col gap-[2px]">
      {/* Header Info Row */}
      <div className="bg-[rgba(34,36,48,0.3)] flex items-center gap-[12px] px-[24px] py-[14px] rounded-[12px] text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">
        <div className="flex items-center gap-[8px]">
          <div className="size-[8px] rounded-full bg-[#619ee1]" />
          <span className="text-white">{allOpportunities.length}</span>
          <span>opportunities</span>
        </div>
        <span>·</span>
        <span className="text-[#619ee1]">{selectedCoin}</span>
        <span>·</span>
        <span>{estimationWindow} window</span>
        <span>·</span>
        <span>fetched 0s ago</span>
      </div>

      {/* Table */}
      <div className="flex flex-col gap-[2px]">
        {/* Table Header */}
        <div className="bg-[rgba(34,36,48,0.3)] flex items-center px-[24px] py-[14px] rounded-[12px]">
          <div className="w-[48px]" />
          <div className="flex-1 flex items-center">
            <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">
              Long
            </p>
          </div>
          <div className="flex-1 flex items-center">
            <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">
              Short
            </p>
          </div>
          <div className="flex-1 flex items-center gap-[4px]">
            <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">
              Unlevered APY
            </p>
            <div className="size-[12px] flex items-center justify-center opacity-50">
              <svg viewBox="0 0 16 16" fill="none" className="text-[#6a7282]">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-[4px]">
            <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">
              Levered APY
            </p>
            <div className="size-[12px] flex items-center justify-center opacity-50">
              <svg viewBox="0 0 16 16" fill="none" className="text-[#6a7282]">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Watchlist Section */}
        {watchlistOpportunities.length > 0 && (
          <>
            <div className="bg-[rgba(34,36,48,0.3)] flex items-center gap-[12px] px-[24px] py-[14px] rounded-[12px] text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">
              <div className="flex items-center gap-[8px]">
                <svg viewBox="0 0 16 16" fill="none" className="size-[14px] text-[#619ee1]">
                  <path d="M7.43 1.46a.6.6 0 0 1 1.14 0l1.77 3.59c.13.27.39.46.69.5l3.96.58c.52.08.73.72.35 1.09l-2.87 2.79c-.22.21-.32.51-.26.81l.68 3.94c.09.52-.45.92-.92.67l-3.54-1.86a.85.85 0 0 0-.78 0l-3.54 1.86c-.47.25-1.01-.15-.92-.67l.68-3.94c.06-.3-.04-.6-.26-.81L.73 7.22c-.38-.37-.17-1.01.35-1.09l3.96-.58c.3-.04.56-.23.69-.5l1.77-3.59z" fill="currentColor"/>
                </svg>
                <span className="text-white font-semibold">Watchlist</span>
                <span>·</span>
                <span className="text-white">{watchlistOpportunities.length}</span>
                <span>{watchlistOpportunities.length === 1 ? 'opportunity' : 'opportunities'}</span>
              </div>
            </div>

            {watchlistOpportunities.map((opp) => {
              const isExpanded = expandedRows.includes(opp.id);
              const isInWatchlist = watchlist.includes(opp.id);
              return (
                <div
                  key={opp.id}
                  className={`flex flex-col rounded-[12px] ${
                    isExpanded
                      ? 'bg-[#323444]'
                      : 'bg-[#222430]'
                  }`}
                >
                  {/* Main Row */}
                  <div
                    onClick={() => toggleRow(opp.id)}
                    className={`flex items-center h-[64px] px-[24px] py-[20px] cursor-pointer rounded-[12px] ${
                      isExpanded ? 'bg-[#323444]' : 'bg-[#222430]'
                    }`}
                  >
                    {/* Star Icon */}
                    <div className="w-[48px] flex items-center">
                      <button
                        onClick={(e) => toggleWatchlist(opp.id, e)}
                        className="p-[4px] hover:scale-110 transition-transform"
                      >
                        <svg viewBox="0 0 16 16" fill="none" className={`size-[16px] ${isInWatchlist ? 'text-[#619ee1]' : 'text-[#6a7282] hover:text-white'}`}>
                          <path d="M7.43 1.46a.6.6 0 0 1 1.14 0l1.77 3.59c.13.27.39.46.69.5l3.96.58c.52.08.73.72.35 1.09l-2.87 2.79c-.22.21-.32.51-.26.81l.68 3.94c.09.52-.45.92-.92.67l-3.54-1.86a.85.85 0 0 0-.78 0l-3.54 1.86c-.47.25-1.01-.15-.92-.67l.68-3.94c.06-.3-.04-.6-.26-.81L.73 7.22c-.38-.37-.17-1.01.35-1.09l3.96-.58c.3-.04.56-.23.69-.5l1.77-3.59z" fill="currentColor"/>
                        </svg>
                      </button>
                    </div>

                    {/* Rest of the row content - reused from below */}
                    {/* Long Exchange */}
                    <div className="flex-1 flex items-center gap-[8px]">
                      <div className="size-[24px] rounded-full overflow-hidden">
                        <img
                          src={exchangeIcons[opp.long.exchange]}
                          alt={opp.long.exchange}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">
                        {opp.long.pair}
                      </p>
                      <p className="text-[14px] font-medium text-[rgba(255,255,255,0.2)] tracking-[-0.42px] leading-[20px]">
                        {opp.long.exchange.charAt(0) + opp.long.exchange.slice(1).toLowerCase()}
                      </p>
                    </div>

                    {/* Short Exchange */}
                    <div className="flex-1 flex items-center gap-[8px]">
                      <div className="size-[24px] rounded-full overflow-hidden">
                        <img
                          src={exchangeIcons[(opp as any).short.exchange]}
                          alt={(opp as any).short.exchange}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">
                        {(opp as any).short.pair}
                      </p>
                      <p className="text-[14px] font-medium text-[rgba(255,255,255,0.2)] tracking-[-0.42px] leading-[20px]">
                        {(opp as any).short.exchange.charAt(0) + (opp as any).short.exchange.slice(1).toLowerCase()}
                      </p>
                    </div>

                    {/* Unlevered APY */}
                    <div className="flex-1 flex items-center">
                      <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">
                        {opp.unleveredAPY.toFixed(2)}%
                      </p>
                    </div>

                    {/* Levered APY */}
                    <div className="flex-1 flex items-center">
                      <div className="flex items-center gap-[12px] max-w-[164px] w-full">
                        <div className="flex-1 h-[4px] bg-[rgba(106,114,130,0.5)] rounded-[8px] overflow-hidden">
                          <div
                            className="h-full bg-[#619ee1] rounded-[8px]"
                            style={{ width: `${Math.min((opp.leveredAPY / 20) * 100, 100)}%` }}
                          />
                        </div>
                        <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">
                          {opp.leveredAPY.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                    style={{
                      maxHeight: isExpanded ? '800px' : '0px',
                      opacity: isExpanded ? 1 : 0,
                    }}
                  >
                    <div
                      className="transition-opacity duration-300 delay-75"
                      style={{ opacity: isExpanded ? 1 : 0 }}
                    >
                      {/* Divider */}
                      <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.05)] to-transparent mx-[24px]" />

                      {/* Expanded Details */}
                      <div className="flex flex-col gap-[16px] pt-[16px] px-[24px]">
                        {/* Capital Flow Diagram */}
                        <div className="flex items-center">
                          {/* Wallet */}
                          <div className="flex-1 bg-[rgba(34,36,48,0.5)] px-[16px] py-[12px] rounded-[8px] flex flex-col gap-[8px]">
                            <div className="flex items-start justify-between">
                              <p className="text-[12px] font-medium text-[rgba(255,255,255,0.7)] tracking-[-0.42px] leading-[16px]">
                                Wallet
                              </p>
                              <p className="text-[12px] font-medium text-[rgba(255,255,255,0.7)] tracking-[-0.42px] leading-[16px]">
                                USDC collateral
                              </p>
                            </div>
                            <p className="text-[20px] font-semibold text-white leading-[28px]">
                              ${opp.wallet.toFixed(2)}M
                            </p>
                          </div>

                          {/* Connector */}
                          <div className="w-[8px] h-[45px]">
                            <img
                              src="http://localhost:3845/assets/ccb14a1b80d2472e420223b9c8f79484c6da03cc.svg"
                              alt=""
                              className="w-full h-full"
                            />
                          </div>

                          {/* Arkis Borrow */}
                          <div className="flex-1 bg-[rgba(34,36,48,0.5)] px-[16px] py-[12px] rounded-[8px] flex flex-col gap-[8px]">
                            <div className="flex items-start justify-between">
                              <p className="text-[12px] font-medium text-[rgba(255,255,255,0.7)] tracking-[-0.42px] leading-[16px]">
                                Arkis Borrow
                              </p>
                              <p className="text-[12px] font-medium text-[rgba(255,255,255,0.7)] tracking-[-0.42px] leading-[16px]">
                                {opp.arkisBorrow.toFixed(0)}x @ {opp.borrowRate.toFixed(2)}% APR
                              </p>
                            </div>
                            <p className="text-[20px] font-semibold text-white leading-[28px]">
                              +${opp.arkisBorrow.toFixed(2)}M
                            </p>
                          </div>

                          {/* Connector */}
                          <div className="w-[8px] h-[45px]">
                            <img
                              src="http://localhost:3845/assets/ccb14a1b80d2472e420223b9c8f79484c6da03cc.svg"
                              alt=""
                              className="w-full h-full"
                            />
                          </div>

                          {/* Capital Pool */}
                          <div className="flex-1 bg-[rgba(34,36,48,0.5)] px-[16px] py-[12px] rounded-[8px] flex flex-col gap-[8px]">
                            <div className="flex items-start justify-between">
                              <p className="text-[12px] font-medium text-[rgba(255,255,255,0.7)] tracking-[-0.42px] leading-[16px]">
                                Capital Pool
                              </p>
                              <p className="text-[12px] font-medium text-[rgba(255,255,255,0.7)] tracking-[-0.42px] leading-[16px]">
                                {activeTab === 'carry-trade'
                                  ? `${(opp as any).spotPercent}.00% spot / ${(opp as any).marginPercent}.00% margin`
                                  : 'Split 50 / 50'}
                              </p>
                            </div>
                            <p className="text-[20px] font-semibold text-white leading-[28px]">
                              ${activeTab === 'carry-trade'
                                ? (opp as any).capitalPool.toFixed(2)
                                : (opp.wallet + opp.arkisBorrow).toFixed(2)}M
                            </p>
                          </div>
                        </div>

                        {/* Position Cards */}
                        <div className="flex gap-[16px]">
                          {activeTab === 'carry-trade' ? (
                            <>
                              {/* Left Card - Asset (Carry Trade) */}
                              <div className="flex-1 bg-[rgba(34,36,48,0.5)] p-[24px] rounded-[8px] flex flex-col gap-[16px]">
                                <div className="flex items-start justify-between h-[24px]">
                                  <div className="flex items-center gap-[8px]">
                                    <div className="size-[24px] rounded-full overflow-hidden">
                                      <img src={`/icons/tokens/${(opp as any).long.asset.toLowerCase().replace(/ /g, '')}.png`} alt={(opp as any).long.asset} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex items-baseline gap-[8px]">
                                      <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">{(opp as any).long.asset}</p>
                                      <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">{(opp as any).long.platform}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-[4px]">
                                    <div className="size-[12px]">
                                      <svg viewBox="0 0 12 12" fill="none" className="text-[#3ee0ad]">
                                        <path d="M9 5L6 2L3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M6 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </div>
                                    <p className="text-[12px] font-medium text-[#3ee0ad] tracking-[-0.42px] leading-[16px]">Long</p>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-[8px]">
                                  <div className="flex items-center justify-between h-[16px]">
                                    <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Allocation</p>
                                    <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">${(opp as any).allocation.toFixed(2)}M</p>
                                  </div>
                                  <div className="flex items-center justify-between h-[16px]">
                                    <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Staking APY</p>
                                    <p className="text-[12px] font-semibold text-[#3ee0ad] tracking-[-0.42px] leading-[16px] text-right">{(opp as any).stakingAPY.toFixed(2)}%</p>
                                  </div>
                                </div>
                              </div>

                              {/* Right Card - Short Position (Carry Trade) */}
                              <div className="flex-1 bg-[rgba(34,36,48,0.5)] p-[24px] rounded-[8px] flex flex-col gap-[16px]">
                                <div className="flex items-start justify-between h-[24px]">
                                  <div className="flex items-center gap-[8px]">
                                    <div className="size-[24px] rounded-full overflow-hidden">
                                      <img src={exchangeIcons[(opp as any).short.exchange]} alt={(opp as any).short.exchange} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex items-baseline gap-[8px]">
                                      <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">{(opp as any).short.pair}</p>
                                      <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">
                                        {(opp as any).short.exchange.charAt(0) + (opp as any).short.exchange.slice(1).toLowerCase()}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-[4px]">
                                    <div className="size-[12px]">
                                      <svg viewBox="0 0 12 12" fill="none" className="text-[#d57070]">
                                        <path d="M3 7L6 10L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M6 10V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </div>
                                    <p className="text-[12px] font-medium text-[#d57070] tracking-[-0.42px] leading-[16px]">Short</p>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-[8px]">
                                  <div className="flex items-center justify-between h-[16px]">
                                    <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Margin</p>
                                    <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">${(opp as any).margin.toFixed(2)}M</p>
                                  </div>
                                  <div className="flex items-center justify-between h-[16px]">
                                    <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Notional</p>
                                    <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">${(opp as any).notional.toFixed(2)}M</p>
                                  </div>
                                  <div className="flex items-center justify-between h-[16px]">
                                    <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Leverage</p>
                                    <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">{(opp as any).leverage}x</p>
                                  </div>
                                  <div className="flex items-center justify-between h-[16px]">
                                    <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Funding</p>
                                    <div className="flex items-center gap-[4px] text-[#d57070]">
                                      <p className="text-[12px] font-semibold tracking-[-0.42px] leading-[16px]">{(opp as any).funding.toFixed(2)}%</p>
                                      <p className="text-[12px] font-medium tracking-[-0.42px] leading-[16px]">{(opp as any).fundingType}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              {/* Long Position Card (Perp-Perp) */}
                              <div className="flex-1 bg-[rgba(34,36,48,0.5)] p-[24px] rounded-[8px] flex flex-col gap-[16px]">
                                <div className="flex items-start justify-between h-[24px]">
                                  <div className="flex items-center gap-[8px]">
                                    <div className="size-[24px] rounded-full overflow-hidden">
                                      <img src={exchangeIcons[(opp as any).long.exchange]} alt={(opp as any).long.exchange} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex items-baseline gap-[8px]">
                                      <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">{(opp as any).long.pair}</p>
                                      <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">
                                        {(opp as any).long.exchange.charAt(0) + (opp as any).long.exchange.slice(1).toLowerCase()}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-[4px]">
                                    <div className="size-[12px]">
                                      <svg viewBox="0 0 12 12" fill="none" className="text-[#3ee0ad]">
                                        <path d="M9 5L6 2L3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M6 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </div>
                                    <p className="text-[12px] font-medium text-[#3ee0ad] tracking-[-0.42px] leading-[16px]">Long</p>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-[8px]">
                                  <div className="flex items-center justify-between h-[16px]">
                                    <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Collateral</p>
                                    <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">${(opp as any).longCollateral.toFixed(2)}M</p>
                                  </div>
                                  <div className="flex items-center justify-between h-[16px]">
                                    <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Notional</p>
                                    <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">${(opp as any).longNotional.toFixed(2)}M</p>
                                  </div>
                                  <div className="flex items-center justify-between h-[16px]">
                                    <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Leverage</p>
                                    <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">{(opp as any).longLeverage}x</p>
                                  </div>
                                  <div className="flex items-center justify-between h-[16px]">
                                    <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Funding</p>
                                    <div className="flex items-center gap-[4px] text-[#3ee0ad]">
                                      <p className="text-[12px] font-semibold tracking-[-0.42px] leading-[16px]">{(opp as any).longFunding.toFixed(2)}%</p>
                                      <p className="text-[12px] font-medium tracking-[-0.42px] leading-[16px]">{(opp as any).longFundingType}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Short Position Card (Perp-Perp) */}
                              <div className="flex-1 bg-[rgba(34,36,48,0.5)] p-[24px] rounded-[8px] flex flex-col gap-[16px]">
                                <div className="flex items-start justify-between h-[24px]">
                                  <div className="flex items-center gap-[8px]">
                                    <div className="size-[24px] rounded-full overflow-hidden">
                                      <img src={exchangeIcons[(opp as any).short.exchange]} alt={(opp as any).short.exchange} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex items-baseline gap-[8px]">
                                      <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">{(opp as any).short.pair}</p>
                                      <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">
                                        {(opp as any).short.exchange.charAt(0) + (opp as any).short.exchange.slice(1).toLowerCase()}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-[4px]">
                                    <div className="size-[12px]">
                                      <svg viewBox="0 0 12 12" fill="none" className="text-[#d57070]">
                                        <path d="M3 7L6 10L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        <path d="M6 10V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                    </div>
                                    <p className="text-[12px] font-medium text-[#d57070] tracking-[-0.42px] leading-[16px]">Short</p>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-[8px]">
                                  <div className="flex items-center justify-between h-[16px]">
                                    <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Collateral</p>
                                    <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">${(opp as any).shortCollateral.toFixed(2)}M</p>
                                  </div>
                                  <div className="flex items-center justify-between h-[16px]">
                                    <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Notional</p>
                                    <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">${(opp as any).shortNotional.toFixed(2)}M</p>
                                  </div>
                                  <div className="flex items-center justify-between h-[16px]">
                                    <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Leverage</p>
                                    <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">{(opp as any).shortLeverage}x</p>
                                  </div>
                                  <div className="flex items-center justify-between h-[16px]">
                                    <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Funding</p>
                                    <div className="flex items-center gap-[4px] text-[#d57070]">
                                      <p className="text-[12px] font-semibold tracking-[-0.42px] leading-[16px]">{(opp as any).shortFunding.toFixed(2)}%</p>
                                      <p className="text-[12px] font-medium tracking-[-0.42px] leading-[16px]">{(opp as any).shortFundingType}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Footer Row */}
                      <div className="flex items-center justify-between px-[24px] py-[20px] rounded-[12px]">
                        {activeTab === 'carry-trade' ? (
                          <>
                            <div className="flex items-center gap-[16px]">
                              <div className="flex items-center gap-[8px]">
                                <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">Staking Yield</p>
                                <p className="text-[14px] font-medium text-[#3ee0ad] tracking-[-0.42px] leading-[20px]">{(opp as any).stakingYield.toFixed(2)}%</p>
                              </div>
                              <div className="flex items-center gap-[8px]">
                                <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">Funding Collected</p>
                                <p className="text-[14px] font-medium text-[#3ee0ad] tracking-[-0.42px] leading-[20px]">{(opp as any).fundingCollected.toFixed(2)}%</p>
                              </div>
                              <div className="flex items-center gap-[8px]">
                                <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">Borrow Cost</p>
                                <p className="text-[14px] font-medium text-[#ff6060] tracking-[-0.42px] leading-[20px]">-${(opp as any).borrowCostYearly}K/yr</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-[8px]">
                              <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">Levered APY</p>
                              <p className="text-[14px] font-medium text-[#3ee0ad] tracking-[-0.42px] leading-[20px]">{(opp as any).leveredAPYFooter.toFixed(2)}%</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center gap-[16px]">
                              <div className="flex items-center gap-[8px]">
                                <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">Net Funding Spread</p>
                                <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">{(opp as any).netFundingSpread.toFixed(2)}%</p>
                              </div>
                              <div className="flex items-center gap-[8px]">
                                <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">Borrow Cost</p>
                                <p className="text-[14px] font-medium text-[#ff6060] tracking-[-0.42px] leading-[20px]">-${opp.borrowCostYearly}K/yr</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-[8px]">
                              <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">Levered APY</p>
                              <p className="text-[14px] font-medium text-[#3ee0ad] tracking-[-0.42px] leading-[20px]">{opp.leveredAPY.toFixed(2)}%</p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* Regular Opportunities Section */}
        {regularOpportunities.length > 0 && (
          <>
            {watchlistOpportunities.length > 0 && (
              <div className="bg-[rgba(34,36,48,0.3)] flex items-center gap-[12px] px-[24px] py-[14px] rounded-[12px] text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">
                <div className="flex items-center gap-[8px]">
                  <span className="text-white font-semibold">All Opportunities</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* Table Rows */}
        {regularOpportunities.map((opp) => {
          const isExpanded = expandedRows.includes(opp.id);
          const isInWatchlist = watchlist.includes(opp.id);
          return (
            <div
              key={opp.id}
              className={`flex flex-col rounded-[12px] ${
                isExpanded
                  ? 'bg-[#323444]'
                  : 'bg-[#222430]'
              }`}
            >
              {/* Main Row */}
              <div
                onClick={() => toggleRow(opp.id)}
                className={`flex items-center h-[64px] px-[24px] py-[20px] cursor-pointer rounded-[12px] ${
                  isExpanded ? 'bg-[#323444]' : 'bg-[#222430]'
                }`}
              >
                {/* Star Icon */}
                <div className="w-[48px] flex items-center">
                  <button
                    onClick={(e) => toggleWatchlist(opp.id, e)}
                    className="p-[4px] hover:scale-110 transition-transform"
                  >
                    <svg viewBox="0 0 16 16" fill="none" className={`size-[16px] ${isInWatchlist ? 'text-[#619ee1]' : 'text-[#6a7282] hover:text-white'}`}>
                      <path d="M7.43 1.46a.6.6 0 0 1 1.14 0l1.77 3.59c.13.27.39.46.69.5l3.96.58c.52.08.73.72.35 1.09l-2.87 2.79c-.22.21-.32.51-.26.81l.68 3.94c.09.52-.45.92-.92.67l-3.54-1.86a.85.85 0 0 0-.78 0l-3.54 1.86c-.47.25-1.01-.15-.92-.67l.68-3.94c.06-.3-.04-.6-.26-.81L.73 7.22c-.38-.37-.17-1.01.35-1.09l3.96-.58c.3-.04.56-.23.69-.5l1.77-3.59z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>

                {/* Long Exchange / Asset */}
                <div className="flex-1 flex items-center gap-[8px]">
                  <div className="size-[24px] rounded-full overflow-hidden">
                    <img
                      src={activeTab === 'carry-trade' ? `/icons/tokens/${(opp as any).long.asset.toLowerCase().replace(/ /g, '')}.png` : exchangeIcons[(opp as any).long.exchange]}
                      alt={activeTab === 'carry-trade' ? (opp as any).long.asset : (opp as any).long.exchange}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">
                    {activeTab === 'carry-trade' ? (opp as any).long.asset : (opp as any).long.pair}
                  </p>
                  <p className="text-[14px] font-medium text-[rgba(255,255,255,0.2)] tracking-[-0.42px] leading-[20px]">
                    {activeTab === 'carry-trade' ? (opp as any).long.platform : ((opp as any).long.exchange.charAt(0) + (opp as any).long.exchange.slice(1).toLowerCase())}
                  </p>
                </div>

                {/* Short Exchange */}
                <div className="flex-1 flex items-center gap-[8px]">
                  <div className="size-[24px] rounded-full overflow-hidden">
                    <img
                      src={exchangeIcons[(opp as any).short.exchange]}
                      alt={(opp as any).short.exchange}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">
                    {(opp as any).short.pair}
                  </p>
                  <p className="text-[14px] font-medium text-[rgba(255,255,255,0.2)] tracking-[-0.42px] leading-[20px]">
                    {(opp as any).short.exchange.charAt(0) + (opp as any).short.exchange.slice(1).toLowerCase()}
                  </p>
                </div>

                {/* Unlevered APY */}
                <div className="flex-1 flex items-center">
                  <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">
                    {opp.unleveredAPY.toFixed(2)}%
                  </p>
                </div>

                {/* Levered APY */}
                <div className="flex-1 flex items-center">
                  <div className="flex items-center gap-[12px] max-w-[164px] w-full">
                    <div className="flex-1 h-[4px] bg-[rgba(106,114,130,0.5)] rounded-[8px] overflow-hidden">
                      <div
                        className="h-full bg-[#619ee1] rounded-[8px]"
                        style={{ width: `${Math.min((opp.leveredAPY / 20) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">
                      {opp.leveredAPY.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              <div
                className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  maxHeight: isExpanded ? '800px' : '0px',
                  opacity: isExpanded ? 1 : 0,
                }}
              >
                <div
                  className="transition-opacity duration-300 delay-75"
                  style={{ opacity: isExpanded ? 1 : 0 }}
                >
                  {/* Divider */}
                  <div className="h-[1px] bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.05)] to-transparent mx-[24px]" />

                  {/* Expanded Details */}
                  <div className="flex flex-col gap-[16px] pt-[16px] px-[24px]">
                    {/* Capital Flow Diagram */}
                    <div className="flex items-center">
                      {/* Wallet */}
                      <div className="flex-1 bg-[rgba(34,36,48,0.5)] px-[16px] py-[12px] rounded-[8px] flex flex-col gap-[8px]">
                        <div className="flex items-start justify-between">
                          <p className="text-[12px] font-medium text-[rgba(255,255,255,0.7)] tracking-[-0.42px] leading-[16px]">
                            Wallet
                          </p>
                          <p className="text-[12px] font-medium text-[rgba(255,255,255,0.7)] tracking-[-0.42px] leading-[16px]">
                            USDC collateral
                          </p>
                        </div>
                        <p className="text-[20px] font-semibold text-white leading-[28px]">
                          ${opp.wallet.toFixed(2)}M
                        </p>
                      </div>

                      {/* Connector */}
                      <div className="w-[8px] h-[45px]">
                        <img
                          src="http://localhost:3845/assets/ccb14a1b80d2472e420223b9c8f79484c6da03cc.svg"
                          alt=""
                          className="w-full h-full"
                        />
                      </div>

                      {/* Arkis Borrow */}
                      <div className="flex-1 bg-[rgba(34,36,48,0.5)] px-[16px] py-[12px] rounded-[8px] flex flex-col gap-[8px]">
                        <div className="flex items-start justify-between">
                          <p className="text-[12px] font-medium text-[rgba(255,255,255,0.7)] tracking-[-0.42px] leading-[16px]">
                            Arkis Borrow
                          </p>
                          <p className="text-[12px] font-medium text-[rgba(255,255,255,0.7)] tracking-[-0.42px] leading-[16px]">
                            {opp.arkisBorrow.toFixed(0)}x @ {opp.borrowRate.toFixed(2)}% APR
                          </p>
                        </div>
                        <p className="text-[20px] font-semibold text-white leading-[28px]">
                          +${opp.arkisBorrow.toFixed(2)}M
                        </p>
                      </div>

                      {/* Connector */}
                      <div className="w-[8px] h-[45px]">
                        <img
                          src="http://localhost:3845/assets/ccb14a1b80d2472e420223b9c8f79484c6da03cc.svg"
                          alt=""
                          className="w-full h-full"
                        />
                      </div>

                      {/* Capital Pool */}
                      <div className="flex-1 bg-[rgba(34,36,48,0.5)] px-[16px] py-[12px] rounded-[8px] flex flex-col gap-[8px]">
                        <div className="flex items-start justify-between">
                          <p className="text-[12px] font-medium text-[rgba(255,255,255,0.7)] tracking-[-0.42px] leading-[16px]">
                            Capital Pool
                          </p>
                          <p className="text-[12px] font-medium text-[rgba(255,255,255,0.7)] tracking-[-0.42px] leading-[16px]">
                            {activeTab === 'carry-trade'
                              ? `${(opp as any).spotPercent}.00% spot / ${(opp as any).marginPercent}.00% margin`
                              : 'Split 50 / 50'}
                          </p>
                        </div>
                        <p className="text-[20px] font-semibold text-white leading-[28px]">
                          ${activeTab === 'carry-trade'
                            ? (opp as any).capitalPool.toFixed(2)
                            : (opp.wallet + opp.arkisBorrow).toFixed(2)}M
                        </p>
                      </div>
                    </div>

                    {/* Position Cards */}
                    <div className="flex gap-[16px]">
                      {activeTab === 'carry-trade' ? (
                        <>
                          {/* Left Card - Asset (Carry Trade) */}
                          <div className="flex-1 bg-[rgba(34,36,48,0.5)] p-[24px] rounded-[8px] flex flex-col gap-[16px]">
                            <div className="flex items-start justify-between h-[24px]">
                              <div className="flex items-center gap-[8px]">
                                <div className="size-[24px] rounded-full overflow-hidden">
                                  <img src={`/icons/tokens/${(opp as any).long.asset.toLowerCase().replace(/ /g, '')}.png`} alt={(opp as any).long.asset} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex items-baseline gap-[8px]">
                                  <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">{(opp as any).long.asset}</p>
                                  <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">{(opp as any).long.platform}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-[4px]">
                                <div className="size-[12px]">
                                  <svg viewBox="0 0 12 12" fill="none" className="text-[#3ee0ad]">
                                    <path d="M9 5L6 2L3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <p className="text-[12px] font-medium text-[#3ee0ad] tracking-[-0.42px] leading-[16px]">Long</p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                              <div className="flex items-center justify-between h-[16px]">
                                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Allocation</p>
                                <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">${(opp as any).allocation.toFixed(2)}M</p>
                              </div>
                              <div className="flex items-center justify-between h-[16px]">
                                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Staking APY</p>
                                <p className="text-[12px] font-semibold text-[#3ee0ad] tracking-[-0.42px] leading-[16px] text-right">{(opp as any).stakingAPY.toFixed(2)}%</p>
                              </div>
                            </div>
                          </div>

                          {/* Right Card - Short Position (Carry Trade) */}
                          <div className="flex-1 bg-[rgba(34,36,48,0.5)] p-[24px] rounded-[8px] flex flex-col gap-[16px]">
                            <div className="flex items-start justify-between h-[24px]">
                              <div className="flex items-center gap-[8px]">
                                <div className="size-[24px] rounded-full overflow-hidden">
                                  <img src={exchangeIcons[(opp as any).short.exchange]} alt={(opp as any).short.exchange} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex items-baseline gap-[8px]">
                                  <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">{(opp as any).short.pair}</p>
                                  <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">
                                    {(opp as any).short.exchange.charAt(0) + (opp as any).short.exchange.slice(1).toLowerCase()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-[4px]">
                                <div className="size-[12px]">
                                  <svg viewBox="0 0 12 12" fill="none" className="text-[#d57070]">
                                    <path d="M3 7L6 10L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 10V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <p className="text-[12px] font-medium text-[#d57070] tracking-[-0.42px] leading-[16px]">Short</p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                              <div className="flex items-center justify-between h-[16px]">
                                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Margin</p>
                                <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">${(opp as any).margin.toFixed(2)}M</p>
                              </div>
                              <div className="flex items-center justify-between h-[16px]">
                                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Notional</p>
                                <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">${(opp as any).notional.toFixed(2)}M</p>
                              </div>
                              <div className="flex items-center justify-between h-[16px]">
                                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Leverage</p>
                                <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">{(opp as any).leverage}x</p>
                              </div>
                              <div className="flex items-center justify-between h-[16px]">
                                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Funding</p>
                                <div className="flex items-center gap-[4px] text-[#d57070]">
                                  <p className="text-[12px] font-semibold tracking-[-0.42px] leading-[16px]">{(opp as any).funding.toFixed(2)}%</p>
                                  <p className="text-[12px] font-medium tracking-[-0.42px] leading-[16px]">{(opp as any).fundingType}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Long Position Card (Perp-Perp) */}
                          <div className="flex-1 bg-[rgba(34,36,48,0.5)] p-[24px] rounded-[8px] flex flex-col gap-[16px]">
                            <div className="flex items-start justify-between h-[24px]">
                              <div className="flex items-center gap-[8px]">
                                <div className="size-[24px] rounded-full overflow-hidden">
                                  <img src={exchangeIcons[(opp as any).long.exchange]} alt={(opp as any).long.exchange} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex items-baseline gap-[8px]">
                                  <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">{(opp as any).long.pair}</p>
                                  <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">
                                    {(opp as any).long.exchange.charAt(0) + (opp as any).long.exchange.slice(1).toLowerCase()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-[4px]">
                                <div className="size-[12px]">
                                  <svg viewBox="0 0 12 12" fill="none" className="text-[#3ee0ad]">
                                    <path d="M9 5L6 2L3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <p className="text-[12px] font-medium text-[#3ee0ad] tracking-[-0.42px] leading-[16px]">Long</p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                              <div className="flex items-center justify-between h-[16px]">
                                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Collateral</p>
                                <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">${(opp as any).longCollateral.toFixed(2)}M</p>
                              </div>
                              <div className="flex items-center justify-between h-[16px]">
                                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Notional</p>
                                <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">${(opp as any).longNotional.toFixed(2)}M</p>
                              </div>
                              <div className="flex items-center justify-between h-[16px]">
                                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Leverage</p>
                                <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">{(opp as any).longLeverage}x</p>
                              </div>
                              <div className="flex items-center justify-between h-[16px]">
                                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Funding</p>
                                <div className="flex items-center gap-[4px] text-[#3ee0ad]">
                                  <p className="text-[12px] font-semibold tracking-[-0.42px] leading-[16px]">{(opp as any).longFunding.toFixed(2)}%</p>
                                  <p className="text-[12px] font-medium tracking-[-0.42px] leading-[16px]">{(opp as any).longFundingType}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Short Position Card (Perp-Perp) */}
                          <div className="flex-1 bg-[rgba(34,36,48,0.5)] p-[24px] rounded-[8px] flex flex-col gap-[16px]">
                            <div className="flex items-start justify-between h-[24px]">
                              <div className="flex items-center gap-[8px]">
                                <div className="size-[24px] rounded-full overflow-hidden">
                                  <img src={exchangeIcons[(opp as any).short.exchange]} alt={(opp as any).short.exchange} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex items-baseline gap-[8px]">
                                  <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">{(opp as any).short.pair}</p>
                                  <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">
                                    {(opp as any).short.exchange.charAt(0) + (opp as any).short.exchange.slice(1).toLowerCase()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-[4px]">
                                <div className="size-[12px]">
                                  <svg viewBox="0 0 12 12" fill="none" className="text-[#d57070]">
                                    <path d="M3 7L6 10L9 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6 10V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                                <p className="text-[12px] font-medium text-[#d57070] tracking-[-0.42px] leading-[16px]">Short</p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-[8px]">
                              <div className="flex items-center justify-between h-[16px]">
                                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Collateral</p>
                                <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">${(opp as any).shortCollateral.toFixed(2)}M</p>
                              </div>
                              <div className="flex items-center justify-between h-[16px]">
                                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Notional</p>
                                <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">${(opp as any).shortNotional.toFixed(2)}M</p>
                              </div>
                              <div className="flex items-center justify-between h-[16px]">
                                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Leverage</p>
                                <p className="text-[12px] font-semibold text-white tracking-[-0.42px] leading-[16px] text-right">{(opp as any).shortLeverage}x</p>
                              </div>
                              <div className="flex items-center justify-between h-[16px]">
                                <p className="text-[12px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[16px]">Funding</p>
                                <div className="flex items-center gap-[4px] text-[#d57070]">
                                  <p className="text-[12px] font-semibold tracking-[-0.42px] leading-[16px]">{(opp as any).shortFunding.toFixed(2)}%</p>
                                  <p className="text-[12px] font-medium tracking-[-0.42px] leading-[16px]">{(opp as any).shortFundingType}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Footer Row */}
                  <div className="flex items-center justify-between px-[24px] py-[20px] rounded-[12px]">
                    {activeTab === 'carry-trade' ? (
                      <>
                        <div className="flex items-center gap-[16px]">
                          <div className="flex items-center gap-[8px]">
                            <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">Staking Yield</p>
                            <p className="text-[14px] font-medium text-[#3ee0ad] tracking-[-0.42px] leading-[20px]">{(opp as any).stakingYield.toFixed(2)}%</p>
                          </div>
                          <div className="flex items-center gap-[8px]">
                            <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">Funding Collected</p>
                            <p className="text-[14px] font-medium text-[#3ee0ad] tracking-[-0.42px] leading-[20px]">{(opp as any).fundingCollected.toFixed(2)}%</p>
                          </div>
                          <div className="flex items-center gap-[8px]">
                            <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">Borrow Cost</p>
                            <p className="text-[14px] font-medium text-[#ff6060] tracking-[-0.42px] leading-[20px]">-${(opp as any).borrowCostYearly}K/yr</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-[8px]">
                          <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">Levered APY</p>
                          <p className="text-[14px] font-medium text-[#3ee0ad] tracking-[-0.42px] leading-[20px]">{(opp as any).leveredAPYFooter.toFixed(2)}%</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-[16px]">
                          <div className="flex items-center gap-[8px]">
                            <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">
                              Net Funding Spread
                            </p>
                            <p className="text-[14px] font-medium text-white tracking-[-0.42px] leading-[20px]">
                              {(opp as any).netFundingSpread.toFixed(2)}%
                            </p>
                          </div>
                          <div className="flex items-center gap-[8px]">
                            <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">
                              Borrow Cost
                            </p>
                            <p className="text-[14px] font-medium text-[#ff6060] tracking-[-0.42px] leading-[20px]">
                              -${opp.borrowCostYearly}K/yr
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-[8px]">
                          <p className="text-[14px] font-medium text-[#6a7282] tracking-[-0.42px] leading-[20px]">
                            Levered APY
                          </p>
                          <p className="text-[14px] font-medium text-[#3ee0ad] tracking-[-0.42px] leading-[20px]">
                            {opp.leveredAPY.toFixed(2)}%
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
