import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Token, TokenState, TabType } from '@/types/token';

const initialState: TokenState = {
  tokens: [],
  loading: false,
  error: null,
  activeTab: 'new'
};

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
      state.loading = false;
      state.error = null;
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    setActiveTab: (state, action: PayloadAction<TabType>) => {
      state.activeTab = action.payload;
    },
    
    updateToken: (state, action: PayloadAction<Token>) => {
      const index = state.tokens.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tokens[index] = action.payload;
      }
    },
    
    updateAllTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
    },
    
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const token = state.tokens.find(t => t.id === action.payload);
      if (token) {
        token.isFavorite = !token.isFavorite;
      }
    },
    
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  setTokens,
  setLoading,
  setError,
  setActiveTab,
  updateToken,
  updateAllTokens,
  toggleFavorite,
  clearError
} = tokenSlice.actions;

export default tokenSlice.reducer;