// components/table/TokenRow.tsx

'use client';

import React, { memo, useState, useEffect } from 'react';
import { Token } from '@/types/token';
import { Tooltip } from '@/components/ui/Tooltip';
import { Popover } from '@/components/ui/Popover';
import { formatPrice, formatVolume, formatAddress, formatNumber } from '@/lib/utils';
import { TrendingUp, TrendingDown, Star, Clock, CheckCircle2, ExternalLink, Info } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface TokenRowProps {
  token: Token;
  index: number;
  onFavorite: (id: string) => void;
  onViewDetails: (token: Token) => void;
}

const RiskBadge: React.FC<{ level: Token['riskLevel'] }> = memo(({ level }) => {
  const config = {
    low: { color: 'bg-green-500/20 text-green-400 border-green-500/30', label: 'Low Risk' },
    medium: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', label: 'Medium' },
    high: { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'High Risk' }
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config[level].color}`}>
      {config[level].label}
    </span>
  );
});

RiskBadge.displayName = 'RiskBadge';

const MiniChart: React.FC<{ data: number[]; isPositive: boolean }> = memo(({ data, isPositive }) => (
  <ResponsiveContainer width={80} height={32}>
    <LineChart data={data.map(value => ({ value }))}>
      <Line 
        type="monotone" 
        dataKey="value" 
        stroke={isPositive ? '#10b981' : '#ef4444'} 
        strokeWidth={1.5}
        dot={false}
      />
    </LineChart>
  </ResponsiveContainer>
));

MiniChart.displayName = 'MiniChart';

const PriceChangeCell: React.FC<{ value: number; previousValue?: number }> = memo(({ value, previousValue }) => {
  const isPositive = value >= 0;
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (previousValue !== undefined && previousValue !== value) {
      setIsAnimating(true);
      const timeout = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [value, previousValue]);

  return (
    <div className={`flex items-center gap-1 transition-all duration-500 ${
      isAnimating ? (isPositive ? 'text-green-400 scale-105' : 'text-red-400 scale-105') : ''
    }`}>
      {isPositive ? (
        <TrendingUp className="w-4 h-4 text-green-500" />
      ) : (
        <TrendingDown className="w-4 h-4 text-red-500" />
      )}
      <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
        {isPositive ? '+' : ''}{value.toFixed(2)}%
      </span>
    </div>
  );
});

PriceChangeCell.displayName = 'PriceChangeCell';

export const TokenRow: React.FC<TokenRowProps> = memo(({ 
  token, 
  index, 
  onFavorite, 
  onViewDetails 
}) => {
  const [prevPrice] = useState(token.price);

  return (
    <tr className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors group">
      <td className="px-6 py-4">
        <span className="text-gray-500 font-medium">{index + 1}</span>
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {token.symbol.slice(0, 2)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white truncate">{token.name}</span>
              {token.verified && (
                <Tooltip content="Verified Contract">
                  <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                </Tooltip>
              )}
            </div>
            <Tooltip content={token.address}>
              <span className="text-xs text-gray-500 cursor-help">{formatAddress(token.address)}</span>
            </Tooltip>
          </div>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <span className="font-semibold text-white">{formatPrice(token.price)}</span>
      </td>
      
      <td className="px-6 py-4">
        <PriceChangeCell value={token.priceChange24h} previousValue={prevPrice} />
      </td>
      
      <td className="px-6 py-4">
        <span className="text-gray-300">{formatVolume(token.volume24h)}</span>
      </td>
      
      <td className="px-6 py-4">
        <span className="text-gray-300">{formatVolume(token.marketCap)}</span>
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-300">{formatVolume(token.liquidity)}</span>
          <RiskBadge level={token.riskLevel} />
        </div>
      </td>
      
      <td className="px-6 py-4">
        <MiniChart data={token.priceHistory} isPositive={token.priceChange24h >= 0} />
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Tooltip content={`Age: ${token.age}`}>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {token.age}
            </div>
          </Tooltip>
          <Tooltip content={`${formatNumber(token.holders)} holders`}>
            <span className="text-xs text-gray-400">{(token.holders / 1000).toFixed(1)}K</span>
          </Tooltip>
        </div>
      </td>
      
      <td className="px-6 py-4">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Tooltip content={token.isFavorite ? "Remove from favorites" : "Add to favorites"}>
            <button
              onClick={() => onFavorite(token.id)}
              className={`p-1 rounded hover:bg-gray-700 transition-colors ${
                token.isFavorite ? 'text-yellow-500' : 'text-gray-500'
              }`}
            >
              <Star className="w-4 h-4" fill={token.isFavorite ? 'currentColor' : 'none'} />
            </button>
          </Tooltip>
          
          <Popover
            trigger={
              <button className="p-1 rounded hover:bg-gray-700 transition-colors text-gray-400">
                <Info className="w-4 h-4" />
              </button>
            }
          >
            <div className="space-y-2">
              <div className="text-sm font-semibold text-white mb-3">Quick Info</div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-white capitalize">{token.status}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-400">Risk Level:</span>
                  <span className="text-white capitalize">{token.riskLevel}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-400">Verified:</span>
                  <span className="text-white">{token.verified ? 'Yes' : 'No'}</span>
                </div>
              </div>
              <button
                onClick={() => onViewDetails(token)}
                className="w-full mt-3 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-medium transition-colors"
              >
                View Full Details
              </button>
            </div>
          </Popover>
          
          <Tooltip content="View on Explorer">
            <a
              href={`https://etherscan.io/address/${token.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 rounded hover:bg-gray-700 transition-colors text-gray-400"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </Tooltip>
        </div>
      </td>
    </tr>
  );
});

TokenRow.displayName = 'TokenRow';