# Deployment Guide

This site is built as a Single Page Application (SPA) optimized for static hosting platforms like GitHub Pages, Netlify, Vercel, or any static file host.

## Building for Production

```bash
npm run build:pages
```

This command:
1. Builds the production bundle with Vite
2. Generates a `404.html` for client-side routing (needed for GitHub Pages)
3. Outputs everything to the `dist/` folder

## GitHub Pages Deployment

### Option 1: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    permissions:
      contents: read
      pages: write
      id-token: write

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build:pages

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Then in your repository settings:
1. Go to Settings → Pages
2. Set Source to "GitHub Actions"

### Option 2: Manual Deployment

```bash
npm run build:pages
cd dist
git init
git add -A
git commit -m 'Deploy'
git push -f git@github.com:USERNAME/REPO.git main:gh-pages
```

### Base Path Configuration

If deploying to `username.github.io/repo-name/`:

1. Update `vite.config.js`:
   ```js
   base: '/repo-name/'
   ```

2. Rebuild:
   ```bash
   npm run build:pages
   ```

If deploying to a custom domain or root (`username.github.io`), keep `base: '/'` (default).

## Other Static Hosts

### Netlify

1. Connect your repository
2. Build command: `npm run build:pages`
3. Publish directory: `dist`

### Vercel

1. Import your repository
2. Build command: `npm run build:pages`
3. Output directory: `dist`

### Cloudflare Pages

1. Connect repository
2. Build command: `npm run build:pages`
3. Build output directory: `dist`

## Local Preview

To preview the production build locally:

```bash
npm run build:pages
npm run preview
```

## Adding New Dialogues

1. Create a new JSON file in `public/data/{id}.json`
2. Add metadata to `public/data/index.json`
3. Rebuild and redeploy

Example:
```json
{
  "id": "new-dialogue",
  "title": "Title Here",
  "date": "2024-12-29",
  "description": "Description here",
  "participants": [
    { "id": "person1", "name": "Person 1" },
    { "id": "person2", "name": "Person 2" }
  ],
  "exchanges": [
    {
      "speakerId": "person1",
      "content": "Content here",
      "commentary": "Optional commentary"
    }
  ]
}
```

## Troubleshooting

### Blank page after deployment
- Check browser console for errors
- Verify `base` path in `vite.config.js` matches your deployment URL
- Ensure 404.html was generated (check `dist/404.html`)

### Routes not working
- Verify `404.html` exists in `dist/`
- For GitHub Pages, make sure the repository is public or you have GitHub Pages enabled
- Check that you're using `npm run build:pages` (not just `npm run build`)

### Assets not loading
- Check the `base` path configuration
- Verify files exist in `dist/assets/`, `dist/data/`, and `dist/fonts/`
