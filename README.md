<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Agents Wizard

A visual tool to assemble your `AGENTS.md` file for agentic coding. Select from curated sections covering core principles, code style, communication guidelines, and more to create comprehensive instructions for AI coding agents.

**Live Demo:** [https://thomasrohde.github.io/agents-wizard](https://thomasrohde.github.io/agents-wizard)

## Features

- 🎯 Curated collection of best-practice coding instructions for AI agents
- 📝 Live preview of generated AGENTS.md content
- 📋 One-click copy to clipboard
- 💾 Download as file
- 🎨 Beautiful dark theme UI

## Run Locally

**Prerequisites:** Node.js 20+

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the app:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000/agents-wizard/](http://localhost:3000/agents-wizard/)

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build locally |
| `npm run typecheck` | Run TypeScript type checking |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## Deployment

The app is automatically deployed to GitHub Pages when pushing to the `main` branch via GitHub Actions.

### Manual Deployment

1. Build the app:
   ```bash
   npm run build
   ```

2. The `dist/` folder contains the production-ready files.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Lucide React (icons)

## License

MIT © Thomas Klok Rohde
