// components/table/TableHeader.tsx

'use client';

import React, { memo } from 'react';
import { SortField, SortOrder } from '@/types/token';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface TableHeaderProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

interface SortButtonProps {
  field: SortField;
  label: string;
  currentSortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

const SortButton: React.FC<SortButtonProps> = ({ 
  field, 
  label, 
  currentSortField, 
  sortOrder, 
  onSort 
}) => {
  const isActive = currentSortField === field;

  return (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 hover:text-blue-400 transition-colors group"
    >
      <span>{label}</span>
      <span className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}>
        {isActive && sortOrder === 'asc' ? (
          <ChevronUp className="w-4 h-4 text-blue-400" />
        ) : (
          <ChevronDown className={`w-4 h-4 ${isActive ? 'text-blue-400' : ''}`} />
        )}
      </span>
    </button>
  );
};

export const TableHeader: React.FC<TableHeaderProps> = memo(({ 
  sortField, 
  sortOrder, 
  onSort 
}) => {
  return (
    <thead className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
        <th className="px-6 py-4 w-8">#</th>
        <th className="px-6 py-4 min-w-[200px]">Token</th>
        <th className="px-6 py-4 min-w-[120px]">
          <SortButton 
            field="price" 
            label="Price" 
            currentSortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
          />
        </th>
        <th className="px-6 py-4 min-w-[120px]">
          <SortButton 
            field="priceChange24h" 
            label="24h %" 
            currentSortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
          />
        </th>
        <th className="px-6 py-4 min-w-[120px]">
          <SortButton 
            field="volume24h" 
            label="Volume" 
            currentSortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
          />
        </th>
        <th className="px-6 py-4 min-w-[140px]">
          <SortButton 
            field="marketCap" 
            label="Market Cap" 
            currentSortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
          />
        </th>
        <th className="px-6 py-4 min-w-[180px]">
          <SortButton 
            field="liquidity" 
            label="Liquidity" 
            currentSortField={sortField}
            sortOrder={sortOrder}
            onSort={onSort}
          />
        </th>
        <th className="px-6 py-4 min-w-[100px]">Chart</th>
        <th className="px-6 py-4 min-w-[120px]">Info</th>
        <th className="px-6 py-4 w-8"></th>
      </tr>
    </thead>
  );
});

TableHeader.displayName = 'TableHeader';