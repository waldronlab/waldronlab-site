# Waldron Lab Modern

Modern React application built with Vite and TypeScript.

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

### One-time setup in GitHub

1. Open your repository on GitHub.
2. Go to **Settings -> Pages**.
3. Set **Source** to **GitHub Actions**.

### Notes

- TypeScript is fully supported. It is compiled during `npm run build`, and GitHub Pages serves the generated static files from `dist`.
- The workflow automatically sets the correct Vite base path:
  - `"/"` for `<owner>.github.io` repositories
  - `"/<repo>/"` for project repositories
