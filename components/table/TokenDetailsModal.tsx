'use client';

import React, { memo } from 'react';
import { Token } from '@/types/token';
import { Modal } from '@/components/ui/Modal';
import { formatPrice, formatVolume, formatAddress, formatNumber } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TokenDetailsModalProps {
  token: Token | null;
  onClose: () => void;
}

const RiskBadge: React.FC<{ level: Token['riskLevel'] }> = ({ level }) => {
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
};

export const TokenDetailsModal: React.FC<TokenDetailsModalProps> = memo(({ token, onClose }) => {
  if (!token) return null;
  
  const isPositive = token.priceChange24h >= 0;

  return (
    <Modal isOpen={!!token} onClose={onClose}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
            {token.symbol.slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold text-white truncate">{token.name}</h2>
            <p className="text-gray-400 text-sm">{token.symbol}</p>
            <p className="text-gray-500 text-xs font-mono mt-1">{formatAddress(token.address)}</p>
          </div>
        </div>
        
        {/* Price Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Current Price</div>
            <div className="text-2xl font-bold text-white mb-2">{formatPrice(token.price)}</div>
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={isPositive ? 'text-green-500 text-sm' : 'text-red-500 text-sm'}>
                {isPositive ? '+' : ''}{token.priceChange24h.toFixed(2)}%
              </span>
            </div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Market Cap</div>
            <div className="text-2xl font-bold text-white">{formatVolume(token.marketCap)}</div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">24h Volume</div>
            <div className="text-xl font-bold text-white">{formatVolume(token.volume24h)}</div>
          </div>
          
          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="text-gray-400 text-sm mb-1">Liquidity</div>
            <div className="text-xl font-bold text-white">{formatVolume(token.liquidity)}</div>
          </div>
        </div>
        
        {/* Details List */}
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-800">
            <span className="text-gray-400">Contract Address</span>
            <span className="text-white font-mono text-sm">{formatAddress(token.address)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-800">
            <span className="text-gray-400">Holders</span>
            <span className="text-white">{formatNumber(token.holders)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-800">
            <span className="text-gray-400">Token Age</span>
            <span className="text-white">{token.age}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-800">
            <span className="text-gray-400">Risk Level</span>
            <RiskBadge level={token.riskLevel} />
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-400">Status</span>
            <span className="text-white capitalize">{token.status}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            Trade Now
          </button>
          <button className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors">
            Add to Watchlist
          </button>
        </div>
      </div>
    </Modal>
  );
});

TokenDetailsModal.displayName = 'TokenDetailsModal';