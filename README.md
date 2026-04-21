# Waldron Lab Modern Site

Modern React WaldronLab site  built with Vite and TypeScript.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Tailwind CSS

## Local Development

Requirements:

- Node.js 18+ (Node.js 20 recommended)
- npm

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## GitHub Pages Deployment

This repository includes GitHub Actions deployment at:

- `.github/workflows/deploy-pages.yml`

On every push to `main`, GitHub Actions builds and deploys the site to GitHub Pages.

  - `"/<repo>/"` for project repositories
