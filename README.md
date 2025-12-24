# Happyland Gardens - Event Venue Website

This is a [Next.js](https://nextjs.org) project for Happyland Gardens, a premier event venue in Nairobi, Kenya.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Updating Site Content

All static content is centralized in the `/data` directory for easy updates without touching component code.

### Contact Information

Edit `/data/contact.ts` to update:

- Business name, phone, email
- Physical address
- Google Maps coordinates
- Social media links
- Business hours

### Event Types

Edit `/data/events.ts` to:

- Add new event types
- Update event descriptions
- Modify capacity and features
- Change event images

### About Information

Edit `/data/about.ts` to update:

- Company mission statement
- Company story/history
- Key highlights
- Year established

### Site Metadata (SEO)

Edit `/data/metadata.ts` to update:

- Site name and description
- SEO keywords
- Open Graph image
- Site URL

### Environment Variables

Copy `.env.example` to `.env.local` and update with your values:

- Google Analytics ID
- Contact information
- Site URL

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript type checking
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

## Project Structure

```
├── src/app/          # Next.js pages and layouts
├── components/       # React components
│   └── ui/          # Reusable UI components
├── data/            # Static site content (UPDATE HERE)
├── lib/             # Utility functions
├── types/           # TypeScript type definitions
├── public/          # Static assets (images, etc.)
└── .github/         # GitHub workflows and configs
```

## Documentation

- **Design System**: See `DESIGN-SYSTEM.md` for colors, typography, and component usage
- **Development Guide**: See `CLAUDE.md` for detailed development instructions
- **Component Showcase**: Visit `/test-components` to see all UI components

## Tech Stack

- **Framework**: Next.js 16.1+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom design system
- **Animations**: Framer Motion
- **Icons**: React Icons

## Learn More

To learn more about Next.js, check out:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
