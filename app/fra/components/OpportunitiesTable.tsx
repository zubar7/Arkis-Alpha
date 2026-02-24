'use client';

import React, { useState } from 'react';

interface OpportunitiesTableProps {
  selectedCoin: string;
  estimationWindow: string;
}

const opportunities = [
  {
    id: 1,
    long: { exchange: 'BITGET', pair: 'BTCUSDT' },
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
    longFundingType: 'PAY',
    shortCollateral: 2.0,
    shortNotional: 4.0,
    shortLeverage: 2,
    shortFunding: 8.44,
    shortFundingType: 'COLLECT',
    netFundingSpread: 8.05,
    borrowCostYearly: 150,
  },
  {
    id: 2,
    long: { exchange: 'BINANCE', pair: 'BTCUSDT' },
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
    longFundingType: 'PAY',
    shortCollateral: 2.0,
    shortNotional: 4.0,
    shortLeverage: 2,
    shortFunding: 6.95,
    shortFundingType: 'COLLECT',
    netFundingSpread: 6.67,
    borrowCostYearly: 150,
  },
];

export default function OpportunitiesTable({
  selectedCoin,
  estimationWindow,
}: OpportunitiesTableProps) {
  const [expandedRows, setExpandedRows] = useState<number[]>([1]);
  const [sortColumn, setSortColumn] = useState<'leveredAPY' | null>('leveredAPY');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="rounded-lg border border-[#2a2d37] bg-[#13161d]">
      {/* Header Info */}
      <div className="flex items-center gap-3 py-2 px-4 text-xs text-[#6a7282] border-b border-[#2a2d37]">
        <span className="inline-block w-2 h-2 rounded-full bg-[#619ee1]" />
        <span className="text-white font-semibold">{opportunities.length}</span>
        <span>opportunities</span>
        <span className="text-[#2a2d37]">·</span>
        <span className="text-[#619ee1] font-medium">{selectedCoin}</span>
        <span className="text-[#2a2d37]">·</span>
        <span>{estimationWindow} window</span>
        <span className="text-[#2a2d37]">·</span>
        <span>fetched 0s ago</span>
      </div>

      {/* Table */}
      <div className="p-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#2a2d37]/50 text-left">
                <th className="py-[16px] px-[12px] w-8" />
                <th className="py-[16px] px-[12px] w-6" />
                <th className="py-[16px] px-[12px] text-[12px] font-medium text-[#6a7282]">
                  Long
                </th>
                <th className="py-[16px] px-[12px] text-[12px] font-medium text-[#6a7282]">
                  Short
                </th>
                <th className="py-[16px] px-[12px] text-[12px] font-medium text-[#6a7282] cursor-pointer hover:text-white select-none">
                  <span className="flex items-center gap-1">
                    Unlevered APY
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="opacity-30"
                    >
                      <path d="m21 16-4 4-4-4" />
                      <path d="M17 20V4" />
                      <path d="m3 8 4-4 4 4" />
                      <path d="M7 4v16" />
                    </svg>
                  </span>
                </th>
                <th className="py-[16px] px-[12px] text-[12px] font-medium text-[#6a7282] cursor-pointer hover:text-white select-none">
                  <span className="flex items-center gap-1">
                    Levered APY
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-[#619ee1]"
                    >
                      <path d="M12 5v14" />
                      <path d="m19 12-7 7-7-7" />
                    </svg>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opp) => {
                const isExpanded = expandedRows.includes(opp.id);
                return [
                  <tr
                    key={`row-${opp.id}`}
                    className="border-b border-[#2a2d37]/30 hover:bg-[#222430]/30 transition-colors cursor-pointer h-[64px]"
                    onClick={() => toggleRow(opp.id)}
                  >
                    <td className="py-[20px] px-[12px]">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-[#6a7282] hover:text-white transition-colors cursor-pointer"
                      >
                        <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
                      </svg>
                    </td>
                    <td className="py-[20px] px-[12px]">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`text-[#6a7282] transition-transform duration-200 ${
                          isExpanded ? 'rotate-0' : '-rotate-90'
                        }`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </td>
                    <td className="py-[20px] px-[12px]">
                      <span className="inline-flex items-center gap-2">
                        <span className="px-[8px] py-[4px] rounded-[4px] text-[11px] font-semibold bg-[#222430] text-[#6a7282]">
                          {opp.long.exchange}
                        </span>
                        <span className="text-[13px] text-white font-medium">
                          {opp.long.pair}
                        </span>
                      </span>
                    </td>
                    <td className="py-[20px] px-[12px]">
                      <span className="inline-flex items-center gap-2">
                        <span className="px-[8px] py-[4px] rounded-[4px] text-[11px] font-semibold bg-[#222430] text-[#6a7282]">
                          {opp.short.exchange}
                        </span>
                        <span className="text-[13px] text-white font-medium">
                          {opp.short.pair}
                        </span>
                      </span>
                    </td>
                    <td className="py-[20px] px-[12px] tabular-nums text-[13px] text-[#6a7282]">
                      {opp.unleveredAPY.toFixed(2)}%
                    </td>
                    <td className="py-[20px] px-[12px] w-48">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-[6px] bg-[#222430] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${Math.min((opp.leveredAPY / 20) * 100, 100)}%`,
                              background: '#619ee1',
                            }}
                          />
                        </div>
                        <span
                          className="tabular-nums text-[13px] font-semibold w-14 text-right text-[#619ee1]"
                        >
                          {opp.leveredAPY.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>,

                  isExpanded && (
                    <tr key={`expanded-${opp.id}`}>
                      <td colSpan={6} className="p-0">
                        <div className="bg-[#181923] border-t border-[#2a2d37]/50 p-[20px] space-y-[20px]">
                          {/* Capital Flow */}
                          <div className="flex items-center justify-center gap-1 flex-wrap">
                            <div className="flex flex-col items-center gap-1.5 rounded-[8px] border border-[#2a2d37] bg-[#222430] px-5 py-3 min-w-[140px]">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
                                <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
                              </svg>
                              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6b7280]">
                                Wallet
                              </span>
                              <span className="font-mono text-sm font-bold tabular-nums text-gray-100">
                                ${opp.wallet.toFixed(2)}M
                              </span>
                              <span className="text-[10px] text-[#6b7280] leading-tight text-center">
                                USDC collateral
                              </span>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-0.5 px-1">
                              <span className="text-[9px] font-semibold uppercase tracking-wider text-[#6b7280]">
                                Deposit
                              </span>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </div>

                            <div className="flex flex-col items-center gap-1.5 rounded-[8px] border border-[#619ee1]/20 bg-[#222430] px-5 py-3 min-w-[140px]">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M10 12h4" />
                                <path d="M10 8h4" />
                                <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
                                <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
                                <path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
                              </svg>
                              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6b7280]">
                                Arkis Borrow
                              </span>
                              <span className="font-mono text-sm font-bold tabular-nums text-gray-100">
                                +${opp.arkisBorrow.toFixed(2)}M
                              </span>
                              <span className="text-[10px] text-[#6b7280] leading-tight text-center">
                                {opp.arkisBorrow.toFixed(0)}x @ {opp.borrowRate.toFixed(2)}% APR
                              </span>
                            </div>

                            <div className="flex flex-col items-center justify-center gap-0.5 px-1">
                              <span className="text-[9px] font-semibold uppercase tracking-wider text-[#6b7280]">
                                Total
                              </span>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </div>

                            <div className="flex flex-col items-center gap-1.5 rounded-[8px] border border-[#2a2d37] bg-[#222430] px-5 py-3 min-w-[140px]">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
                                <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
                                <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
                              </svg>
                              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#6b7280]">
                                Capital Pool
                              </span>
                              <span className="font-mono text-sm font-bold tabular-nums text-gray-100">
                                ${(opp.wallet + opp.arkisBorrow).toFixed(2)}M
                              </span>
                              <span className="text-[10px] text-[#6b7280] leading-tight text-center">
                                Split 50 / 50
                              </span>
                            </div>
                          </div>

                          {/* Arrow Down */}
                          <div className="flex justify-center">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#2a2d37]">
                              <path d="M12 5v14" />
                              <path d="m19 12-7 7-7-7" />
                            </svg>
                          </div>

                          {/* Long and Short Positions */}
                          <div className="flex gap-4 flex-wrap">
                            {/* Long */}
                            <div className="flex-1 rounded-[8px] border border-[#619ee1]/40 bg-[#619ee1]/5 p-4 min-w-[200px]">
                              <div className="flex items-center gap-2 mb-3">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#619ee1]">
                                  <path d="M16 7h6v6" />
                                  <path d="m22 7-8.5 8.5-5-5L2 17" />
                                </svg>
                                <span className="text-xs font-bold uppercase tracking-widest text-[#619ee1]">
                                  LONG
                                </span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-1.5">
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#222430] text-[#6b7280]">
                                    {opp.long.exchange}
                                  </span>
                                  <span className="text-xs text-gray-300 font-mono">
                                    {opp.long.pair}
                                  </span>
                                </div>
                                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                                  <span className="text-[#6b7280]">Collateral</span>
                                  <span className="font-mono tabular-nums text-gray-200 text-right">
                                    ${opp.longCollateral.toFixed(2)}M
                                  </span>
                                  <span className="text-[#6b7280]">Notional</span>
                                  <span className="font-mono tabular-nums text-gray-200 text-right">
                                    ${opp.longNotional.toFixed(2)}M
                                  </span>
                                  <span className="text-[#6b7280]">Leverage</span>
                                  <span className="font-mono tabular-nums text-gray-200 text-right">
                                    {opp.longLeverage}x
                                  </span>
                                  <span className="text-[#6b7280]">Funding</span>
                                  <span className="font-mono tabular-nums text-right text-[#619ee1]">
                                    {opp.longFunding.toFixed(2)}%{' '}
                                    <span className="text-[10px] opacity-70">
                                      {opp.longFundingType}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Short */}
                            <div className="flex-1 rounded-[8px] border border-red-500/40 bg-red-500/5 p-4 min-w-[200px]">
                              <div className="flex items-center gap-2 mb-3">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-400">
                                  <path d="M16 17h6v-6" />
                                  <path d="m22 17-8.5-8.5-5 5L2 7" />
                                </svg>
                                <span className="text-xs font-bold uppercase tracking-widest text-red-400">
                                  SHORT
                                </span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-1.5">
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#222430] text-[#6b7280]">
                                    {opp.short.exchange}
                                  </span>
                                  <span className="text-xs text-gray-300 font-mono">
                                    {opp.short.pair}
                                  </span>
                                </div>
                                <div className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                                  <span className="text-[#6b7280]">Collateral</span>
                                  <span className="font-mono tabular-nums text-gray-200 text-right">
                                    ${opp.shortCollateral.toFixed(2)}M
                                  </span>
                                  <span className="text-[#6b7280]">Notional</span>
                                  <span className="font-mono tabular-nums text-gray-200 text-right">
                                    ${opp.shortNotional.toFixed(2)}M
                                  </span>
                                  <span className="text-[#6b7280]">Leverage</span>
                                  <span className="font-mono tabular-nums text-gray-200 text-right">
                                    {opp.shortLeverage}x
                                  </span>
                                  <span className="text-[#6b7280]">Funding</span>
                                  <span className="font-mono tabular-nums text-right text-red-400">
                                    {opp.shortFunding.toFixed(2)}%{' '}
                                    <span className="text-[10px] opacity-70">
                                      {opp.shortFundingType}
                                    </span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Summary */}
                          <div className="flex items-center justify-between rounded-[8px] border border-[#2a2d37] bg-[#222430] px-4 py-2.5 text-xs">
                            <div className="flex items-center gap-4">
                              <span className="text-[#6b7280]">
                                Net Funding Spread{' '}
                                <span className="font-mono tabular-nums text-gray-200 ml-1">
                                  {opp.netFundingSpread.toFixed(2)}%
                                </span>
                              </span>
                              <span className="text-[#6b7280]">
                                Borrow Cost{' '}
                                <span className="font-mono tabular-nums text-red-400 ml-1">
                                  -${opp.borrowCostYearly}K/yr
                                </span>
                              </span>
                            </div>
                            <span className="text-[#6b7280]">
                              Levered APY{' '}
                              <span className="font-mono tabular-nums font-bold text-[#619ee1] ml-1">
                                {opp.leveredAPY.toFixed(2)}%
                              </span>
                            </span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )
                ].filter(Boolean);
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
