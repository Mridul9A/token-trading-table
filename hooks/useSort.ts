// hooks/useSort.ts

import { useState, useMemo, useCallback } from 'react';
import { Token, SortField, SortOrder } from '@/types/token';

/**
 * Custom hook for sorting tokens
 */
export const useSort = (tokens: Token[]) => {
  const [sortField, setSortField] = useState<SortField>('volume24h');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Memoized sorted tokens to prevent unnecessary recalculations
  const sortedTokens = useMemo(() => {
    return [...tokens].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      
      if (sortOrder === 'asc') {
        return aVal - bVal;
      }
      return bVal - aVal;
    });
  }, [tokens, sortField, sortOrder]);

  // Toggle sort order or change sort field
  const handleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      // Toggle order if clicking same field
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, default to descending
      setSortField(field);
      setSortOrder('desc');
    }
  }, [sortField]);

  return {
    sortedTokens,
    sortField,
    sortOrder,
    handleSort
  };
};