import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateAllTokens } from '@/store/tokenSlice';
import { updateTokenPrice } from '@/lib/mockData';

export const useWebSocket = () => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector(state => state.tokens);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Start price update simulation
    intervalRef.current = setInterval(() => {
      if (tokens.length > 0) {
        const updatedTokens = tokens.map((token: typeof tokens[number]) => updateTokenPrice(token));
        dispatch(updateAllTokens(updatedTokens));
      }
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tokens, dispatch]);

  return {
    isConnected: true,
    disconnect: () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };
};