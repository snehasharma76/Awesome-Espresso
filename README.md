# Espresso Developer Tour

A scrollable, immersive, dark-themed website inspired by roadmap.sh but tailored for Web3 infrastructure storytelling. This is a modular journey through Espresso's architecture — confirmations, decentralized sequencing, data availability — backed by real hackathon projects that bring each feature to life.

## Features

- **Dynamic Content**: The entire site is driven from a single JSON config that contains sections, summaries, CTA links, and nested project cards
- **Developer-Native Design**: Dark mode by default with sharp monospace/technical fonts (JetBrains Mono, Space Grotesk)
- **Section Theming**: Each section has its own visual identity with bold accent highlights
- **Interactive Navigation**: Smooth scrolling, sticky headers, and floating navigation
- **Responsive Layout**: Mobile-first design that adapts to all screen sizes
- **Project Filtering**: Filter projects by tags to showcase cross-feature applications
- **Animated UI**: Smooth transitions and animations powered by Framer Motion

## Tech Stack

- **React** with Vite for fast development
- **Tailwind CSS** for responsive styling
- **Framer Motion** for animations
- **Zustand** for state management

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

- `src/components/`: Reusable UI components
- `src/store/`: State management with Zustand
- `src/utils/`: Utility functions for data handling
- `data.json`: Single source of truth for all content

## Customization

All content is driven by the `data.json` file. To customize the site, simply modify this file with your own sections, projects, and content.
