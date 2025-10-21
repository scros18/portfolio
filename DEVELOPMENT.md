# Sam Croston Portfolio - Development Guide

## 🚀 Quick Start (5 Minutes)

### First Time Setup
```powershell
# 1. Navigate to project
cd "c:\Users\scros\New folder\html-sites\sam-portfolio"

# 2. Install dependencies
npm install

# 3. Start development server (with auto-reload)
npm run dev
```

Your site will open at: **http://localhost:8000**

## 🛠️ Development Commands

### Start Development Server
```powershell
npm run dev
```
This will:
- Compile TypeScript automatically when you save
- Start local server on port 8000
- Watch for file changes

### Build for Production
```powershell
npm run build
```

### Just Compile TypeScript
```powershell
npm run watch
```

### Just Run Server
```powershell
npm run serve
```

## 📱 Testing on Mobile Devices

### Find Your Local IP
```powershell
ipconfig
```
Look for "IPv4 Address" (something like `192.168.1.100`)

### Access from Phone/Tablet
1. Make sure device is on same WiFi
2. Go to: `http://YOUR-IP:8000`
   Example: `http://192.168.1.100:8000`

## ✏️ Making Changes

### 1. Update Personal Information

**File**: `index.html`

```html
<!-- Line 52: Your name -->
<span class="greeting">Hi, I'm Sam Croston</span>

<!-- Line 187: Your email -->
<a href="mailto:hello@samcroston.com">

<!-- Line 195: Your GitHub -->
<a href="https://github.com/samcroston">

<!-- Line 205: Your LinkedIn -->
<a href="https://linkedin.com/in/samcroston">
```

### 2. Add Your Real Projects

**File**: `index.html` (Lines 120-185)

Find this section and duplicate for each project:
```html
<article class="glass-card project-card">
    <div class="project-image">
        <div class="project-placeholder">
            <!-- Your custom icon SVG here -->
        </div>
    </div>
    <div class="project-content">
        <div class="project-tags">
            <span class="tag">Technology 1</span>
            <span class="tag">Technology 2</span>
        </div>
        <h3>Project Name</h3>
        <p>Project description...</p>
        <div class="project-stats">
            <div class="stat">
                <span class="stat-value">99</span>
                <span class="stat-label">Metric</span>
            </div>
        </div>
    </div>
</article>
```

### 3. Customize Colors

**File**: `styles.css` (Lines 13-23)

```css
:root {
    --primary: #6366f1;      /* Main brand color */
    --secondary: #8b5cf6;    /* Secondary color */
    --accent: #ec4899;       /* Accent/highlight */
}
```

Use a color picker or:
- [Coolors.co](https://coolors.co) - Color palette generator
- [Adobe Color](https://color.adobe.com) - Color wheel

### 4. Add Custom JavaScript

**File**: `src/main.ts`

Add your custom code to the `PortfolioApp` class:

```typescript
private yourCustomMethod(): void {
    // Your code here
    console.log('Custom functionality');
}
```

Then call it from `init()` method.

## 📂 Project Structure

```
sam-portfolio/
├── index.html          ← Main HTML (edit content here)
├── styles.css          ← All styling (edit design here)
├── src/
│   └── main.ts         ← TypeScript source (edit functionality)
├── dist/
│   └── main.js         ← Compiled JS (auto-generated, don't edit!)
├── server.js           ← Development server
├── package.json        ← Project config
├── tsconfig.json       ← TypeScript config
├── sitemap.xml         ← SEO sitemap
├── robots.txt          ← Search engine instructions
└── .htaccess          ← Security headers (for Apache servers)
```

## 🎨 Common Customizations

### Change Navigation Links
**File**: `index.html` (Lines 39-44)
```html
<ul class="nav-links">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#contact">Contact</a></li>
</ul>
```

### Adjust Glass Effect Opacity
**File**: `styles.css`
```css
--glass-bg: rgba(255, 255, 255, 0.05); /* More transparent: 0.03, More opaque: 0.10 */
```

### Change Animation Speed
**File**: `styles.css`
```css
transition: all 0.3s ease; /* Faster: 0.2s, Slower: 0.5s */
```

### Add New Section
**File**: `index.html` (Add before footer)
```html
<section id="new-section" class="your-section">
    <div class="container">
        <h2 class="section-title">Section Title</h2>
        <p>Your content here...</p>
    </div>
</section>
```

## 🔧 Troubleshooting

### TypeScript Errors
```powershell
# Clean and rebuild
Remove-Item -Recurse -Force dist
npm run build
```

### Port Already in Use
```powershell
# Use different port (edit server.js)
# Change: const PORT = 8000;
# To:     const PORT = 8080;
```

### Changes Not Showing
1. Hard refresh browser: `Ctrl + Shift + R`
2. Clear browser cache
3. Check browser console (F12) for errors

### npm install fails
```powershell
# Clear npm cache
npm cache clean --force
npm install
```

## 📊 Testing Checklist

Before deploying, test:

- [ ] Desktop view (1920x1080)
- [ ] Laptop view (1366x768)
- [ ] Tablet view (768x1024)
- [ ] Mobile view (375x667)
- [ ] All navigation links work
- [ ] All forms validate
- [ ] All external links open in new tab
- [ ] No console errors (F12)
- [ ] Fast page load (< 3 seconds)
- [ ] Smooth animations
- [ ] Contact form works

## 🌐 Deploying to samcroston.com

### Option 1: Netlify (Recommended - Free)
1. Create account at [netlify.com](https://netlify.com)
2. Drag your folder to Netlify Drop
3. Configure custom domain: samcroston.com
4. Done! Auto HTTPS + CDN included

### Option 2: Vercel (Great for Next.js)
```powershell
npm i -g vercel
vercel login
vercel --prod
```

### Option 3: GitHub Pages
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/portfolio
git push -u origin main
```
Then enable GitHub Pages in repository settings.

### Option 4: Traditional Hosting (cPanel)
1. Build project: `npm run build`
2. Upload all files via FTP
3. Point domain to your hosting
4. Ensure .htaccess is uploaded for security headers

## 🔒 Pre-Deployment Checklist

- [ ] Update all personal information
- [ ] Add real project content
- [ ] Replace placeholder email/phone
- [ ] Test contact form
- [ ] Run Lighthouse audit (aim for 100/100)
- [ ] Test on multiple devices
- [ ] Check all links work
- [ ] Verify SEO meta tags
- [ ] Add Google Analytics (optional)
- [ ] Set up Google Search Console
- [ ] Test HTTPS works
- [ ] Verify mobile responsiveness

## 💡 Pro Tips

1. **Keep it Updated**: Add new projects regularly
2. **Monitor Performance**: Run Lighthouse monthly
3. **Backup Regularly**: Commit to Git frequently
4. **Optimize Images**: Use WebP format, compress before upload
5. **Test Everywhere**: Check on actual devices, not just DevTools
6. **Get Feedback**: Ask friends/colleagues to review
7. **Monitor Analytics**: Track which projects get most attention

## 📚 Resources

- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [Can I Use](https://caniuse.com/) - Browser compatibility

## 🆘 Need Help?

Check these files:
- `README.md` - Full documentation
- `QUICKSTART.md` - Quick setup guide
- `SEO-STRATEGY.md` - SEO and marketing strategy
- `OPTIMIZATION.md` - Performance optimization details
- `SECURITY.md` - Security best practices

---

**Quick Reference**:
- Start dev: `npm run dev`
- Build: `npm run build`
- Local URL: `http://localhost:8000`
- Edit content: `index.html`
- Edit styles: `styles.css`
- Edit functionality: `src/main.ts`

Happy coding! 🚀
