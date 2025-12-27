import { Token } from '@/types/token';
import { randomBetween, randomIntBetween } from './utils';

const TOKEN_NAMES = [
  'PepeCoin', 'DogeToken', 'ShibaInu', 'FlokiInu', 'BonkCoin', 
  'DogWifHat', 'MyroToken', 'PopCat', 'MogCoin', 'TurboToken',
  'WojakCoin', 'ApeToken', 'MonkeyBiz', 'CatCoin', 'FrogToken'
];

const TOKEN_SYMBOLS = [
  'PEPE', 'DOGE', 'SHIB', 'FLOKI', 'BONK', 
  'WIF', 'MYRO', 'POPCAT', 'MOG', 'TURBO',
  'WOJAK', 'APE', 'MONK', 'CAT', 'FROG'
];


const generateAddress = (): string => {
  return '0x' + Array.from({ length: 40 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};


const generatePriceHistory = (basePrice: number, length: number = 20): number[] => {
  return Array.from({ length }, (_, i) => {
    const volatility = 0.15;
    const trend = i / length * 0.1;
    return basePrice * (1 + (Math.random() - 0.5) * volatility + trend);
  });
};


export const generateMockToken = (id: string, status: Token['status']): Token => {
  const index = parseInt(id) % TOKEN_NAMES.length;
  const basePrice = randomBetween(0.001, 100);
  const priceChange = randomBetween(-50, 100);
  
  return {
    id,
    name: TOKEN_NAMES[index],
    symbol: TOKEN_SYMBOLS[index],
    address: generateAddress(),
    price: basePrice,
    priceChange24h: priceChange,
    volume24h: randomBetween(100000, 10000000),
    marketCap: randomBetween(500000, 50000000),
    liquidity: randomBetween(50000, 5000000),
    holders: randomIntBetween(100, 50000),
    age: `${randomIntBetween(1, 30)}d`,
    status,
    priceHistory: generatePriceHistory(basePrice),
    isFavorite: Math.random() > 0.8,
    riskLevel: ['low', 'medium', 'high'][randomIntBetween(0, 2)] as Token['riskLevel'],
    verified: Math.random() > 0.5
  };
};


export const generateMockTokens = (count: number, status: Token['status']): Token[] => {
  return Array.from({ length: count }, (_, i) => 
    generateMockToken(String(i), status)
  );
};


export const updateTokenPrice = (token: Token): Token => {
  const priceChange = randomBetween(-0.02, 0.02);
  const newPrice = token.price * (1 + priceChange);
  
  return {
    ...token,
    price: newPrice,
    priceChange24h: token.priceChange24h + randomBetween(-2, 2),
    priceHistory: [...token.priceHistory.slice(1), newPrice]
  };
};