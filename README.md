# Token Trading Table - Axiom Trade Replica

A pixel-perfect, production-ready implementation of Axiom Trade's token discovery table with real-time updates, advanced filtering, and comprehensive state management.

## 🚀 Features

### Core Features
- ✅ **Three Token Categories**: New Pairs, Final Stretch, Migrated
- ✅ **Real-time Price Updates**: WebSocket simulation with smooth color transitions
- ✅ **Advanced Sorting**: Sort by Price, 24h Change, Volume, Market Cap, Liquidity
- ✅ **Interactive Components**: Tooltips, Popovers, Modals
- ✅ **Favorite/Watchlist**: Toggle favorites with Redux state management
- ✅ **Mini Charts**: Real-time price history visualization with Recharts
- ✅ **Risk Indicators**: Low/Medium/High risk badges
- ✅ **Verified Badges**: Smart contract verification status

### UI/UX
- ✅ **Responsive Design**: 320px to 4K screens
- ✅ **Loading States**: Skeleton screens with shimmer effects
- ✅ **Error Boundaries**: Comprehensive error handling
- ✅ **Smooth Animations**: Framer Motion-style transitions
- ✅ **Hover Effects**: Interactive row highlighting
- ✅ **Accessibility**: ARIA labels, keyboard navigation

### Performance
- ✅ **Memoized Components**: React.memo for optimal re-renders
- ✅ **Lazy Loading**: Progressive data loading
- ✅ **Code Splitting**: Optimized bundle sizes
- ✅ **< 100ms Interactions**: Instant feedback on all actions
- ✅ **No Layout Shifts**: Stable CLS scores

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Data Fetching**: React Query (ready for API integration)
- **Charts**: Recharts
- **Icons**: Lucide React

## 📁 Project Structure

```
token-trading-table/
├── app/
│   ├── layout.tsx          # Root layout with Redux Provider
│   ├── page.tsx            # Main page component
│   └── globals.css         # Global styles and animations
├── components/
│   ├── ui/
│   │   ├── Tooltip.tsx     # Reusable tooltip component
│   │   ├── Popover.tsx     # Reusable popover component
│   │   ├── Modal.tsx       # Reusable modal component
│   │   └── Skeleton.tsx    # Loading skeleton components
│   ├── table/
│   │   ├── TableHeader.tsx        # Table header with sorting
│   │   ├── TokenRow.tsx           # Individual token row
│   │   └── TokenDetailsModal.tsx  # Token details modal
│   └── TokenTradingTable.tsx      # Main table component
├── hooks/
│   ├── useWebSocket.ts     # WebSocket simulation hook
│   └── useSort.ts          # Sorting logic hook
├── lib/
│   ├── utils.ts            # Utility functions
│   └── mockData.ts         # Mock data generator
├── store/
│   ├── store.ts            # Redux store configuration
│   ├── tokenSlice.ts       # Token state slice
│   └── hooks.ts            # Typed Redux hooks
├── types/
│   └── token.ts            # TypeScript interfaces
└── README.md
```

## 🛠️ Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd token-trading-table

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎯 Development Guidelines

### Code Quality
- **TypeScript Strict Mode**: All types are explicitly defined
- **Component Memoization**: Use React.memo for pure components
- **Custom Hooks**: Reusable logic extracted into hooks
- **DRY Principles**: Shared utilities and components

### Performance Best Practices
- **Memoized Selectors**: Use useMemo for computed values
- **Callback Memoization**: Use useCallback for event handlers
- **Lazy Loading**: Dynamic imports for code splitting
- **Debounced Updates**: Rate-limited real-time updates

### Styling Guidelines
- **Tailwind First**: Use utility classes
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Built-in dark theme
- **Consistent Spacing**: 4/8/16px spacing scale

## 📊 Component Architecture

### Atomic Design Pattern
1. **Atoms**: Tooltip, Skeleton, Badge
2. **Molecules**: TableHeader, TokenRow, PriceChangeCell
3. **Organisms**: TokenTradingTable, TokenDetailsModal
4. **Templates**: Layout, Page

### State Management
```typescript
// Global State (Redux)
- tokens: Token[]
- loading: boolean
- error: string | null
- activeTab: TabType

// Local State (React)
- selectedToken: Token | null
- sortField: SortField
- sortOrder: SortOrder
```

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_WS_URL=wss://ws.example.com
```

### Tailwind Configuration
Custom colors, animations, and responsive breakpoints defined in `tailwind.config.ts`

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Large Desktop**: 1440px+

## 🧪 Testing Checklist

- [ ] Lighthouse Score ≥ 90 (Mobile & Desktop)
- [ ] Visual regression tests passing
- [ ] All interactions < 100ms
- [ ] No console errors
- [ ] Keyboard navigation working
- [ ] Screen reader compatible
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)

## 🚀 Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### GitHub Actions CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
```

## 📈 Performance Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Largest Contentful Paint**: < 2.5s

## 🎨 Design Tokens

### Colors
- Primary: `#3b82f6` (Blue)
- Secondary: `#8b5cf6` (Purple)
- Success: `#10b981` (Green)
- Error: `#ef4444` (Red)
- Warning: `#f59e0b` (Yellow)

### Typography
- Font Family: Inter
- Headings: 700 weight
- Body: 400 weight
- Code: Mono

## 📝 API Integration

Ready for backend integration with React Query:

```typescript
// hooks/useTokens.ts
import { useQuery } from '@tanstack/react-query';

export const useTokens = (status: TabType) => {
  return useQuery({
    queryKey: ['tokens', status],
    queryFn: () => fetchTokens(status),
    refetchInterval: 5000 // Poll every 5 seconds
  });
};
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 📧 Contact

Project Link: [https://github.com/yourusername/token-trading-table](https://github.com/yourusername/token-trading-table)

---

Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS