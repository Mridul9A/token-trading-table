// components/TokenTradingTable.tsx

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setTokens, setLoading, setError, setActiveTab, toggleFavorite } from '@/store/tokenSlice';
import { generateMockTokens } from '@/lib/mockData';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useSort } from '@/hooks/useSort';
import { Token, TabType } from '@/types/token';
import { TableHeader } from './table/TableHeader';
import { TokenRow } from './table/TokenRow';
import { TokenDetailsModal } from './table/TokenDetailsModal';
import { TableSkeleton } from './ui/Skeleton';
import { AlertCircle } from 'lucide-react';

export default function TokenTradingTable() {
  const dispatch = useAppDispatch();
  const { tokens, loading, error, activeTab } = useAppSelector(state => state.tokens);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  // Initialize WebSocket connection for real-time updates
  useWebSocket();

  // Initialize tokens when tab changes
  useEffect(() => {
    dispatch(setLoading(true));
    
    const timer = setTimeout(() => {
      try {
        const mockTokens = generateMockTokens(15, activeTab);
        dispatch(setTokens(mockTokens));
      } catch  (err) {
        dispatch(setError('Failed to load tokens'));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeTab, dispatch]);

  // Sort tokens
  const { sortedTokens, sortField, sortOrder, handleSort } = useSort(tokens);

  // Handle favorite toggle
  const handleFavorite = useCallback((id: string) => {
    dispatch(toggleFavorite(id));
  }, [dispatch]);

  // Handle view details
  const handleViewDetails = useCallback((token: Token) => {
    setSelectedToken(token);
  }, []);

  // Handle tab change
  const handleTabChange = useCallback((tab: TabType) => {
    dispatch(setActiveTab(tab));
  }, [dispatch]);

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Failed to Load Data</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => dispatch(setActiveTab(activeTab))}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            Token Discovery
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            Track and analyze trending tokens in real-time
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-800 overflow-x-auto">
          {(['new', 'active', 'migrated'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 md:px-6 py-3 font-semibold transition-all capitalize whitespace-nowrap ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab === 'new' ? 'New Pairs' : tab === 'active' ? 'Final Stretch' : 'Migrated'}
            </button>
          ))}
        </div>

        {/* Table Container */}
        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden backdrop-blur-sm">
          {loading ? (
            <TableSkeleton rows={10} />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <TableHeader 
                  sortField={sortField} 
                  sortOrder={sortOrder} 
                  onSort={handleSort}
                />
                <tbody>
                  {sortedTokens.map((token, index) => (
                    <TokenRow
                      key={token.id}
                      token={token}
                      index={index}
                      onFavorite={handleFavorite}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Token Details Modal */}
        <TokenDetailsModal 
          token={selectedToken} 
          onClose={() => setSelectedToken(null)} 
        />
      </div>
    </div>
  );
}