# Simmonds Platform

A modern Next.js 14 + Convex-powered platform featuring real-time dashboard, analytics, and seamless data synchronization.

## Features

- **Next.js 14** with App Router and TypeScript
- **Tailwind CSS** for modern, responsive styling
- **Convex** backend for real-time data synchronization
- **Dashboard** with live statistics and metrics
- **Analytics** page with real-time event tracking
- Dark mode support
- Fully responsive design

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up Convex:
```bash
npx convex dev
```

This will:
- Create a Convex deployment
- Generate the Convex URL
- Automatically update `.env.local` with your deployment URL

3. In a separate terminal, run the Next.js development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
simmonds-platform/
├── app/                      # Next.js app directory
│   ├── globals.css          # Global styles with Tailwind
│   ├── layout.tsx           # Root layout with Convex provider
│   ├── page.tsx             # Home page
│   ├── dashboard/           # Dashboard page
│   ├── analytics/           # Analytics page
│   └── ConvexClientProvider.tsx
├── convex/                   # Convex backend
│   ├── schema.ts            # Database schema
│   ├── messages.ts          # Message queries/mutations
│   ├── analytics.ts         # Analytics tracking
│   └── _generated/          # Auto-generated types
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npx convex dev` - Start Convex development environment

## Features Overview

### Dashboard
- Real-time statistics and metrics
- Live message feed with Convex real-time updates
- Quick action cards
- System status monitoring

### Analytics
- Page view tracking
- Unique visitor counts
- Session duration metrics
- Real-time event logging

### Styling
- Tailwind CSS with custom color scheme
- Dark mode support (system preference)
- Responsive design for all screen sizes
- Modern gradient backgrounds and shadows

## Convex Backend

The platform uses Convex for:
- Real-time data synchronization
- Serverless backend functions
- Type-safe database queries
- Automatic API generation

See `convex/README.md` for more details on the backend structure.

## Environment Variables

Create a `.env.local` file (automatically created by `npx convex dev`):

```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository to Vercel
3. Set up Convex production deployment:
```bash
npx convex deploy
```
4. Add the production Convex URL to Vercel environment variables

---

Built with Next.js 14, React 18, TypeScript, Tailwind CSS, and Convex.