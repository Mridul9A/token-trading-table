export interface Token {
  id: string;
  name: string;
  symbol: string;
  address: string;
  price: number;
  priceChange24h: number;
  volume24h: number;
  marketCap: number;
  liquidity: number;
  holders: number;
  age: string;
  status: 'new' | 'active' | 'migrated';
  priceHistory: number[];
  isFavorite?: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  verified: boolean;
}

export type SortField = 'price' | 'priceChange24h' | 'volume24h' | 'marketCap' | 'liquidity';
export type SortOrder = 'asc' | 'desc';
export type TabType = 'new' | 'active' | 'migrated';

export interface TokenState {
  tokens: Token[];
  loading: boolean;
  error: string | null;
  activeTab: TabType;
}