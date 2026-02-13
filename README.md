# ShelfWise Frontend

A modern, production-ready e-commerce frontend built with Next.js 16, TypeScript, Tailwind CSS 4, and Clerk authentication.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with smooth animations
- **Authentication**: Secure user authentication with Clerk
- **Product Management**: Browse, search, and filter products
- **Shopping Cart**: Add, update, and remove items
- **Wishlist**: Save favorite products
- **Order Management**: Track order status and history
- **User Profile**: Manage personal information
- **Admin Dashboard**: Comprehensive admin panel for store management
- **Responsive Design**: Mobile-first approach with seamless desktop experience

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui (New York style)
- **Authentication**: Clerk
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Backend Integration**: Ready for ShelfWise NestJS API

## 📁 Project Structure

```
MoneyStack-Demo/
├── app/
│   ├── (routes)/
│   │   ├── products/          # Product listing & details
│   │   ├── cart/              # Shopping cart
│   │   ├── wishlist/          # Wishlist
│   │   ├── orders/            # Order history
│   │   ├── profile/           # User profile
│   │   ├── categories/        # Category browsing
│   │   ├── checkout/          # Checkout flow
│   │   └── admin/             # Admin dashboard
│   ├── layout.tsx             # Root layout with navbar & footer
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── Navbar.tsx             # Navigation bar
│   ├── Footer.tsx             # Footer component
│   └── ConvexClientProvider.tsx
├── lib/
│   ├── utils.ts               # Utility functions
│   ├── api.ts                 # API client functions
│   └── types.ts               # TypeScript types
└── public/                    # Static assets
```

## 🎨 Pages Overview

### Public Pages
- **Home** (`/`): Hero section, featured categories, and stats
- **Products** (`/products`): Product listing with search and filters
- **Product Detail** (`/products/[id]`): Detailed product view with reviews
- **Categories** (`/categories`): Browse by category

### User Pages (Authenticated)
- **Cart** (`/cart`): Shopping cart management
- **Wishlist** (`/wishlist`): Saved products
- **Orders** (`/orders`): Order history and tracking
- **Profile** (`/profile`): User profile management
- **Checkout** (`/checkout`): Multi-step checkout process

### Admin Pages
- **Dashboard** (`/admin`): Analytics and overview
- **Product Management**: Add, edit, delete products
- **Order Management**: Process and track orders
- **Customer Management**: View customer data

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Clerk account for authentication
- ShelfWise backend API running

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd MoneyStack-Demo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   - Clerk keys from your Clerk dashboard
   - API URL pointing to your ShelfWise backend
   - Convex configuration (if using)

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔗 Backend Integration

This frontend is designed to work with the ShelfWise NestJS backend. The API client is located in `lib/api.ts` and includes functions for:

- Products (CRUD operations)
- Cart management
- Orders
- Wishlist
- Reviews
- Categories
- User profile

### API Configuration

Update the `NEXT_PUBLIC_API_URL` in your `.env.local` to point to your backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Authentication Flow

1. User signs in via Clerk
2. Clerk JWT token is automatically included in API requests
3. Backend validates token and processes requests
4. User data synced between Clerk and backend database

## 🎯 Next Steps for Production

### 1. Connect to Backend API
- Replace mock data with actual API calls
- Implement error handling and loading states
- Add request caching and optimization

### 2. Add Real Images
- Replace placeholder gradients with actual product images
- Implement image upload for admin panel
- Add image optimization with Next.js Image component

### 3. Implement State Management
- Consider adding Zustand or Redux for complex state
- Implement cart persistence
- Add optimistic updates

### 4. Enhance Features
- Add product search with autocomplete
- Implement advanced filtering
- Add product recommendations
- Implement real-time inventory updates

### 5. Testing
- Add unit tests with Jest
- Add E2E tests with Playwright
- Implement visual regression testing

### 6. Performance Optimization
- Implement code splitting
- Add service worker for offline support
- Optimize bundle size
- Add performance monitoring

### 7. SEO & Analytics
- Add meta tags and Open Graph
- Implement structured data
- Add Google Analytics or similar
- Implement sitemap generation

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Theme Colors
Edit `app/globals.css` to customize the color scheme:
- Primary, secondary, accent colors
- Dark mode variants
- Border radius and spacing

### Components
All components use Tailwind CSS and can be easily customized:
- Modify `components.json` for shadcn/ui configuration
- Update component styles in respective files
- Add new components in the `components/` directory

## 🤝 Contributing

This is a production-ready template. Feel free to:
- Add new features
- Improve existing components
- Fix bugs
- Enhance documentation

## 📄 License

This project is part of the ShelfWise e-commerce platform.

## 🙏 Acknowledgments

- Built with Next.js and React
- UI components from shadcn/ui
- Icons from Lucide
- Authentication by Clerk
- Styled with Tailwind CSS
