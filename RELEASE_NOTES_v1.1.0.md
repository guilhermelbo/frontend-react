# Release v1.1.0

This release includes the merge of three important pull requests that enhance the application with new UI components and fix critical issues.

## What's New

### 🎨 shadcn/ui Integration (PR #4)
- Added **shadcn/ui** component library with Button and Card components
- Configured path aliases (`@/*` → `./src/*`) for better imports
- Integrated Tailwind v4 with CSS variables for theming (light/dark mode support)
- Added configuration file `components.json` for CLI extensibility
- New dependencies:
  - `class-variance-authority`: Button variants management
  - `clsx` and `tailwind-merge`: Utility class merging
  - `lucide-react`: Icon library
  - `@radix-ui/react-slot`: Low-level component primitives

### 🐛 Bug Fixes

#### React Router Basename Fix (PR #5)
- **Fixed**: Blank page issue at `/frontend-react/` on GitHub Pages
- **Solution**: Added `basename={import.meta.env.BASE_URL}` to BrowserRouter to match Vite's base path
- All routes now function correctly in production

#### GitHub Pages Deployment Configuration (PR #3)
- Updated workflow to deploy only on `main` branch
- Added `enablement: true` to automatically enable GitHub Pages
- Updated deployment documentation

## 📦 Components Added

- **Button**: 6 variants (default, destructive, outline, secondary, ghost, link)
- **Card**: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Utils**: `cn()` helper function for class merging

## 🔧 Technical Details

- **Version**: 1.1.0
- **Build**: Successfully compiled with Vite 7.3.1
- **Bundle Size**: 331.90 kB (108.71 kB gzipped)
- **TypeScript**: Full type safety maintained
- **Deployment**: Automated via GitHub Actions to GitHub Pages

## 🌐 Live Demo

The application is deployed at: https://guilhermelbo.github.io/frontend-react/

## 📚 Documentation

- New guide added: `docs/SHADCN_UI_GUIDE.md` with usage patterns and available components
- Updated: `README.md` with deployment instructions
- Updated: `COMO-VER-NO-CELULAR.md` with mobile viewing instructions

## 🙏 Credits

This release was created by merging contributions from the Copilot coding agent and includes improvements to the project structure, UI components, and deployment configuration.
