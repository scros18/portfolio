# Quick Start Guide - Sam's Portfolio

## 🎯 Goal
Build and run a high-performance portfolio with 100/100 Lighthouse scores in under 5 minutes.

## ⚡ 5-Minute Setup

### Step 1: Install (30 seconds)
```powershell
cd "c:\Users\scros\New folder\html-sites\sam-portfolio"
npm install
```

### Step 2: Build (15 seconds)
```powershell
npm run build
```

### Step 3: Run (10 seconds)
```powershell
npm run serve
```

### Step 4: Open (5 seconds)
Open your browser to: **http://localhost:8000**

## 🎨 First Customizations (5 minutes)

### 1. Update Your Name
Open `index.html`, find line 52:
```html
<span class="greeting">Hi, I'm Sam</span>
```
Change "Sam" to your name.

### 2. Update Your Email
Find line 187:
```html
<a href="mailto:sam@example.com"
```
Change to your email.

### 3. Update Colors (Optional)
Open `styles.css`, lines 13-17:
```css
--primary: #6366f1;      /* Your brand color */
--secondary: #8b5cf6;    /* Complementary color */
--accent: #ec4899;       /* Accent color */
```

## 📝 Add Your First Project

In `index.html`, find a project card (around line 120):

```html
<article class="glass-card project-card">
    <div class="project-content">
        <h3>Your Project Name</h3>
        <p>Your project description here...</p>
        <div class="project-stats">
            <div class="stat">
                <span class="stat-value">99</span>
                <span class="stat-label">Your Metric</span>
            </div>
        </div>
    </div>
</article>
```

Replace the content with your actual project details!

## 🔧 Development Workflow

### Watch Mode (Auto-recompile)
```powershell
# Terminal 1: Watch TypeScript changes
npm run dev

# Terminal 2: Run server
npm run serve
```

Now edit `src/main.ts` and it auto-compiles!

## ✅ Verify Perfect Scores

1. Open site in **Chrome**
2. Press **F12** (DevTools)
3. Go to **Lighthouse** tab
4. Click **"Generate report"**
5. Verify **100/100** on all 4 metrics! 🎉

## 🚀 Deploy to Production

### Option 1: Netlify (Easiest)
1. Drag your folder to [netlify.com/drop](https://app.netlify.com/drop)
2. Done! You get free HTTPS + CDN

### Option 2: GitHub Pages
```powershell
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main

# Enable GitHub Pages in repo settings
```

### Option 3: Vercel
```powershell
npm i -g vercel
vercel
```

## 🎯 Next Steps

1. ✅ Customize personal information
2. ✅ Add your real projects (3-6 projects recommended)
3. ✅ Add project screenshots/images
4. ✅ Update social media links
5. ✅ Test on mobile devices
6. ✅ Run Lighthouse audit
7. ✅ Deploy to production
8. ✅ Share with the world! 🌍

## 🆘 Troubleshooting

### "npm not found"
Install Node.js from [nodejs.org](https://nodejs.org)

### Port 8000 already in use
```powershell
# Use different port
python -m http.server 8080
```

### TypeScript not compiling
```powershell
# Clean install
rm -rf node_modules dist
npm install
npm run build
```

### Fonts not loading
Check internet connection - fonts load from Google Fonts CDN

## 📚 Files Overview

```
sam-portfolio/
├── index.html          ← Your content (edit this!)
├── styles.css          ← Your styling (customize colors)
├── src/main.ts         ← Your interactions (TypeScript)
├── dist/main.js        ← Compiled JavaScript (auto-generated)
├── package.json        ← Project config
├── tsconfig.json       ← TypeScript config
└── .htaccess          ← Security headers (for Apache)
```

## 💡 Pro Tips

1. **Keep JavaScript minimal** - Already optimized, don't add heavy libraries
2. **Optimize images** - Use WebP format, compress before upload
3. **Test on mobile** - 50%+ users are mobile
4. **Update regularly** - Keep content fresh
5. **Monitor performance** - Run Lighthouse monthly

## 🎉 Success Checklist

- [ ] Site loads in < 2 seconds
- [ ] All 4 Lighthouse scores = 100
- [ ] Mobile responsive ✅
- [ ] Contact form works ✅
- [ ] All links working ✅
- [ ] Personal info updated ✅
- [ ] Projects added ✅
- [ ] Deployed online ✅

---

**Time to impress**: ~10 minutes ⚡
**Your new portfolio**: Ready to showcase your work! 🚀

Need help? Check [README.md](README.md) for detailed docs.
