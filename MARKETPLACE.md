# Marketplace Feature

## Overview

The Marketplace page is a fully responsive lawyer directory that allows users to browse and connect with legal professionals. The page was implemented based on the Figma design specifications with pixel-perfect accuracy using React, Next.js, and Material-UI.

## File Structure

```
app/
  marketplace/
    page.tsx                 # Main marketplace page component

src/
  components/
    marketplace/
      category-card.tsx      # Category selection card component
      category-card.stories.tsx
      lawyer-card.tsx        # Individual lawyer profile card
      lawyer-card.stories.tsx
      marketplace-header.tsx # Top header with search and filters
      search-bar.tsx         # Search input component
      index.ts              # Barrel export file

  shared/
    types/
      marketplace.ts        # TypeScript interfaces
    constants/
      marketplace-data.ts   # Mock data for development

public/
  images/
    marketplace/           # All marketplace images and icons
```

## Components

### 1. MarketplacePage
Main page component that orchestrates all marketplace functionality.

**Location**: `app/marketplace/page.tsx`

**Features**:
- Category navigation
- Lawyer grid display
- Bottom navigation menu
- Responsive layout

### 2. CategoryCard
Displays legal practice area categories with gradient backgrounds.

**Location**: `src/components/marketplace/category-card.tsx`

**Props**:
- `category: Category` - Category data object
- `onClick?: () => void` - Click handler

**Design Features**:
- Gradient backgrounds matching Figma design
- 72x72px fixed size
- Hover animation
- Icon support

### 3. LawyerCard
Displays individual lawyer profiles with photo, experience, and pricing.

**Location**: `src/components/marketplace/lawyer-card.tsx`

**Props**:
- `lawyer: Lawyer` - Lawyer data object
- `onContact?: () => void` - Contact button handler

**Design Features**:
- Photo display with rounded corners
- Experience badge (optional)
- Specialization text
- Price display
- Contact button with arrow icon

### 4. MarketplaceHeader
Top navigation bar with menu, search, and filter options.

**Location**: `src/components/marketplace/marketplace-header.tsx`

**Props**:
- `onMenuClick?: () => void` - Menu button handler
- `searchValue?: string` - Search input value
- `onSearchChange?: (value: string) => void` - Search change handler

**Features**:
- Hamburger menu button
- Search input field
- Three filter icons

### 5. SearchBar
Reusable search input component.

**Location**: `src/components/marketplace/search-bar.tsx`

**Props**:
- `placeholder?: string` - Placeholder text
- `value?: string` - Input value
- `onChange?: (value: string) => void` - Change handler

## Data Models

### Category Interface
```typescript
interface Category {
  id: string;
  label: string;
  gradient: string;
  icon?: string;
}
```

### Lawyer Interface
```typescript
interface Lawyer {
  id: string;
  name: string;
  photo: string;
  specialization: string;
  experience?: string;
  priceFrom: number;
}
```

## Design System

### Colors (from Figma)
- **Primary Blue**: `#8AA6F4`
- **Background**: `#F3F5F9`
- **Text Main**: `#8E939D`
- **Text Header**: `#212121`
- **White**: `#FFFFFF`

### Typography
- **H1**: Inter Semi Bold, 28px, line-height 1.1
- **H2**: Inter Semi Bold, 16px, line-height 1.2
- **Body**: Inter Regular, 10px, line-height 1.3

### Shadows
- **Card Shadow**: `0px 2px 16px 0px rgba(0, 0, 0, 0.06)`

## Environment Variables

The marketplace uses environment variables to distinguish between development and production modes:

```bash
# .env.local (development)
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# .env.production (production)
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://your-production-domain.com/api
```

## Navigation

The marketplace is accessible from the main menu via the hamburger icon (three horizontal lines) on the left side. The navigation route is `/marketplace`.

### Menu Integration
Updated `src/entities/menu/menu-data.ts` to include:
```typescript
{
  id: 'marketplace',
  label: 'Маркетплейс',
  icon: DocsIcon,
  route: '/marketplace',
}
```

## Storybook

All components have Storybook stories for development and testing:

```bash
npm run storybook
```

**Available Stories**:
- `Marketplace/CategoryCard` - All category variations
- `Marketplace/LawyerCard` - Lawyer card variations

## Development

### Running Locally

1. Start the development server:
```bash
npm run dev
```

2. Navigate to:
```
http://localhost:3000/marketplace
```

### Building for Production

```bash
npm run build
npm start
```

## Material-UI Integration

The marketplace extensively uses MUI components:
- `Box` - Layout and containers
- `Typography` - Text rendering
- `Chip` - Experience badges
- `IconButton` - Interactive buttons
- `InputBase` - Search input

This minimizes custom CSS and ensures consistent styling across the application.

## Assets

All images are stored in `public/images/marketplace/`:
- Category icons (СВО, Развод, Суд, etc.)
- Lawyer photos
- UI icons (search, filters, navigation)

Images are optimized and configured in `next.config.ts` for the Figma CDN.

## Future Enhancements

- [ ] API integration for real lawyer data
- [ ] Search functionality implementation
- [ ] Filter options implementation
- [ ] Lawyer detail page
- [ ] Booking/contact flow
- [ ] User authentication integration
- [ ] Favorites/saved lawyers
- [ ] Review and rating system
- [ ] Advanced filtering (by price, experience, location)
- [ ] Pagination or infinite scroll

## Testing

Components can be tested using Storybook:
```bash
npm run storybook
```

All components are designed to be unit-testable with proper props separation and event handlers.

## Responsive Design

The marketplace is optimized for:
- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px+

All components use flexible layouts and scale appropriately.

## Accessibility

- Semantic HTML structure
- Alt text for all images
- Keyboard navigation support
- ARIA labels where appropriate
- High contrast colors for readability

## License

Internal project - All rights reserved.
