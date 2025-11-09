# Vercel Deployment for Sangam

## 🚀 Deployment Configuration

This project is configured for seamless deployment on Vercel with the following setup:

### 📁 Build Process
```powershell
npm install
npm run build
```

- `npm run build` runs `build-components.js` which copies the site static assets into `public/` (index.html, `styles.css`, `script.js`, `site.webmanifest`, `assets/`, `components/`, `data/`, etc.).

### ⚙️ Vercel Settings
- **Framework**: Static Site
- **Build Command**: `npm run build`
- **Output Directory**: `public`
- **Install Command**: `npm install`

### 🌐 File Structure After Build
```
public/
├── index.html      # Combined components file
├── styles.css      # Stylesheet
└── script.js       # JavaScript modules
```

### 🔧 Configuration Files
- `vercel.json` - Vercel deployment configuration
- `package.json` - Build scripts and dependencies
- `build-components.js` - Component compilation script

### 📋 Deployment Steps (Git integration)
1. Push your repo to GitHub (or GitLab/Bitbucket)
2. In Vercel dashboard connect the repository
3. Set Project Settings -> Build & Output settings (these are usually auto-detected):
	- Build Command: `npm run build`
	- Output Directory: `public`
4. Deploy — Vercel will run `npm install` then `npm run build` and publish the `public/` folder.

### Quick deploy via Vercel CLI
Install Vercel CLI globally if you don't have it:

```powershell
npm i -g vercel
```

From the project root:

```powershell
vercel # interactive deploy (first time)
vercel --prod # deploy the current commit to production
```

### 🛠️ Local Development
After building, serve the `public/` folder to test the production output.

```powershell
# Build into public/
npm run build

# Serve the production build locally (uses http-server via npx)
npx http-server public -p 8000

# Open http://localhost:8000 in your browser to test the built output

# Clean build artifacts
npm run clean
```

Notes:
- The repo contains a basic service worker `sw.js` and `site.webmanifest`. Verify your production domain is HTTPS and the manifest `start_url` matches the domain.
- If you need environment variables (used by serverless functions), set them in the Vercel dashboard under Project Settings → Environment Variables. Static sites don't expose Node env variables to client code — you'll need to bake any public config into your files or use Vercel Functions to inject secrets at runtime.

### 🎯 Features
- Component-based architecture
- Automatic build process
- Static file optimization
- Security headers configured
- Cache control for assets

---

**Live Site**: Your Vercel deployment URL will appear here after deployment
**Repository**: https://github.com/prthamesh-pr/Optical-Shop