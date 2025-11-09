# Play Store / PWA Packaging Guide

This file documents steps to package the Sangam Opticals website as an Android app for Google Play. Two recommended options are provided:

1. Trusted Web Activity (TWA) via Bubblewrap — recommended for PWAs hosted over HTTPS.
2. Capacitor — an alternative that wraps the site in a WebView.

---

## Preconditions

- Your production site must be served over HTTPS and match the `start_url` in `site.webmanifest`.
- The project includes `site.webmanifest` and a basic `sw.js` service worker (for offline caching).
- Icons: confirm `assets/icon-192x192.png` and `assets/icon-512x512.png` exist.

## Quick local test (PowerShell)

```powershell
# Start a local static server (script present in package.json)
npm run start
# Open http://localhost:8000 in a browser and check DevTools → Application
```

## Option A — Trusted Web Activity (Bubblewrap)

1. Install Bubblewrap globally:

```powershell
npm i -g @bubblewrap/cli
```

2. Initialize a Bubblewrap project (replace URL/package id):

```powershell
bubblewrap init --manifest https://your-production-site/site.webmanifest --packageId com.yourcompany.sangam
```

3. Configure assets and digital asset links as prompted. Bubblewrap will generate an Android Studio project.
4. Open the generated project in Android Studio, set up a signing key, and build an AAB.
5. Upload the signed AAB to Google Play Console.

Notes:
- TWA requires Digital Asset Links setup on your domain.
- Bubblewrap docs: https://developers.google.com/web/android/trusted-web-activity

## Option B — Capacitor (alternative)

1. Install and initialize Capacitor in this project:

```powershell
npm i @capacitor/cli @capacitor/core --save-dev
npx cap init sangam-app com.yourcompany.sangam
```

2. Copy or build your web assets into `www/` and then add Android:

```powershell
npx cap add android
npx cap copy
npx cap open android
```

3. In Android Studio configure signing and build the AAB.

## Post-publish checklist

- Ensure `start_url` and scope are correct and your site is reachable over HTTPS.
- Provide a privacy policy URL for the Play Store listing.
- Prepare store listing graphics and screenshots (portrait + landscape as needed).
- Monitor crash reports and user feedback after publish.

---

If you want, I can:
- Improve the service worker to use Workbox and produce a precache manifest.
- Generate the exact bubblewrap commands for your production URL and prepare the Android Studio project.
- Scaffold a Capacitor project and copy the web assets into `www/` for you.

Tell me which option you want me to implement next.
