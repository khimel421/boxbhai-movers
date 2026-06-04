# BoxBhai Movers — Next.js Frontend

A pixel-faithful recreation of the BoxBhai Movers landing page built with **Next.js 14 (App Router)** and **Tailwind CSS**.

## Project Structure

```
boxbhai-movers/
├── app/
│   ├── layout.tsx        # Root layout with Bengali font (Hind Siliguri)
│   ├── page.tsx          # Main page — assembles all sections
│   └── globals.css       # Tailwind + Google Fonts import
├── components/
│   ├── Navbar.tsx        # Sticky nav with logo, links, language switcher, login
│   ├── HeroSection.tsx   # Hero banner + stats bar
│   ├── ServicesSection.tsx  # "আমাদের সার্ভিস সমূহ" cards
│   └── Footer.tsx        # Footer with links and contact info
├── tailwind.config.ts    # Brand colors extended
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Font**: Hind Siliguri (Google Fonts) — supports Bengali script

## Customization

- Replace SVG truck illustrations in `HeroSection.tsx` and `ServicesSection.tsx` with actual images using `next/image`
- Update colors in `tailwind.config.ts` under `theme.extend.colors.brand`
- Add real routes by creating folders inside `app/`
