# Sangam Website - Component-Based Architecture

## 🏗️ Project Structure

```
d:\website/
├── index.html                 # Original monolithic file
├── index-built.html          # Built file with all components combined
├── script.js                 # Modular JavaScript with 11 clean sections
├── styles.css               # Original CSS (unchanged)
├── package.json             # Build scripts
├── build-components.js      # Component builder script
├── components/              # Individual HTML components
│   ├── hero.html           # Hero section with stats
│   ├── about.html          # About section with team
│   ├── services.html       # Services and pricing
│   ├── technology.html     # Equipment showcase
│   ├── eye-model.html      # 3D eye anatomy model
│   ├── testimonials.html   # Client testimonials
│   ├── contact.html        # Contact forms
│   └── footer.html         # Footer with scripts
└── docs/                   # Documentation
    ├── components-overview.md
    ├── javascript-modules.md
    └── component-structure.md
```

## 🚀 Quick Start

### Option 1: Use Pre-built File (Recommended)
```bash
# Open the pre-built file directly
start index-built.html
```

### Option 2: Build from Components
```bash
# Build the website from components
npm run build

# Start local server and build
npm run dev
```

## 🔧 Build System

### Building Components
The website uses a Node.js build script to combine individual components into a single HTML file:

```bash
node build-components.js
```

This creates `index-built.html` with all components properly integrated.

### Component Loading Order
1. Hero section
2. About section  
3. Services section
4. Technology section
5. 3D Eye Model section
6. Testimonials section
7. Contact section
8. Footer section

## 📁 Component Architecture

Each component is a standalone HTML file that contains:
- Clean, semantic HTML structure
- Inline comments for section identification
- No external dependencies (CSS/JS handled separately)

### Example Component Structure
```html
<!--
==========================================================================
                            HERO SECTION
==========================================================================
-->
<section id="home" class="hero">
    <!-- Component content here -->
</section>
```

## 🛠️ Development Workflow

### Editing Components
1. Edit individual component files in `components/` folder
2. Run `npm run build` to regenerate `index-built.html`
3. Test the built file

### Adding New Components
1. Create new component file in `components/`
2. Add component to `build-components.js` configuration
3. Run build script

### JavaScript Modules
The `script.js` file is organized into 11 clean modules:
- DOM Cache Management
- Theme Management
- Smooth Scrolling
- Mobile Navigation
- Statistics Animation
- Carousel Functionality
- Form Validation
- WhatsApp Integration
- 3D Model Loading
- Eye Test Modal
- Initialization

## 🌐 Deployment

### Static Hosting (GitHub Pages, Netlify, Vercel)
1. Use `index-built.html` as your main file
2. Upload entire folder structure
3. Configure server to serve `index-built.html`

### Server-Side Includes (Apache/Nginx)
For advanced setups, you can use server-side includes instead of the build script.

## ✨ Features Preserved

All original functionality maintained:
- ✅ Responsive design
- ✅ Theme switching (light/dark)
- ✅ Mobile navigation
- ✅ Smooth scrolling
- ✅ Statistics animation
- ✅ Testimonials carousel
- ✅ Form validation
- ✅ WhatsApp integration
- ✅ 3D eye model
- ✅ Eye test modal
- ✅ Glassmorphism design

## 🎨 Design System

- **Colors**: Glassmorphism with blue/cyan accents
- **Typography**: Montserrat (headings) + Roboto (body)
- **Icons**: Font Awesome 6.0.0
- **3D Models**: Sketchfab integration
- **Animations**: CSS transforms + JavaScript

## 📞 Support

For questions about the component architecture:
- Check `/docs/` folder for detailed documentation
- Review individual component files for structure
- Run `npm run build` when making changes

---

**Built with ❤️ for Sangam**
*Component-based architecture for maintainable, scalable web development*