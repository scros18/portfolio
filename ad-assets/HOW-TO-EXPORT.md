# How to Export Instagram Ad Images 🚀

## ✅ YOU HAVE 3 READY-TO-USE ADS!

1. **instagram-ad-1080x1080.html** - Main hero ad (stats-focused)
2. **instagram-ad-variant-2.html** - Before/After split (problem/solution)
3. **instagram-ad-variant-3.html** - Question style (engagement)

---

## 📸 Method 1: Screenshot (Easiest - RECOMMENDED)

1. Open `facebook-ad-1200x628.html` in Chrome/Edge
2. Press **F11** for fullscreen
3. Zoom to 100% (Ctrl+0)
4. Take screenshot:
   - **Windows**: Win+Shift+S (snipping tool)
   - **Mac**: Cmd+Shift+4
5. Crop to exactly **1200x628 pixels**
6. Save as PNG or JPG

---

## 📸 Method 2: Browser DevTools (Perfect Size)

1. Open `facebook-ad-1200x628.html` in Chrome
2. Press **F12** (DevTools)
3. Press **Ctrl+Shift+P** (Command menu)
4. Type "screenshot"
5. Select "Capture node screenshot"
6. Click on the `.ad-container` element
7. Save the file

---

## 📸 Method 3: Online Tools

### Using Screenshot.guru
1. Go to https://screenshot.guru
2. Upload the HTML file or paste the code
3. Set dimensions: 1200x628
4. Download PNG

### Using CloudConvert
1. Go to https://cloudconvert.com/html-to-png
2. Upload `facebook-ad-1200x628.html`
3. Set width: 1200px, height: 628px
4. Convert and download

---

## 🎨 Method 4: Export as Image with JavaScript

Add this to the bottom of the HTML file before `</body>`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script>
    // Press 'D' to download
    document.addEventListener('keydown', function(e) {
        if (e.key === 'd' || e.key === 'D') {
            const element = document.querySelector('.ad-container');
            html2canvas(element, {
                width: 1200,
                height: 628,
                scale: 2
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = 'facebook-ad-1200x628.png';
                link.href = canvas.toDataURL();
                link.click();
            });
        }
    });
</script>
```

Then press **D** to download!

---

## ✅ Files You Have (ALL INSTAGRAM READY!)

1. **instagram-ad-1080x1080.html** - Main ad (hero + stats)
2. **instagram-ad-variant-2.html** - Before/After split design
3. **instagram-ad-variant-3.html** - Question/benefit format
4. **facebook-ad-1200x628.html** - Facebook landscape ad

---

## 🚀 Quick Export Steps (INSTAGRAM FOCUS)

**For Instagram Variant 1 (Main Ad):**
```
1. Open: instagram-ad-1080x1080.html
2. Press: F11 (fullscreen)
3. Screenshot: Win+Shift+S
4. Crop: 1080x1080
5. Save: instagram-ad-1.png
```

**For Instagram Variant 2 (Before/After):**
```
1. Open: instagram-ad-variant-2.html
2. Press: F11 (fullscreen)
3. Screenshot: Win+Shift+S
4. Crop: 1080x1080
5. Save: instagram-ad-2.png
```

**For Instagram Variant 3 (Question Style):**
```
1. Open: instagram-ad-variant-3.html
2. Press: F11 (fullscreen)
3. Screenshot: Win+Shift+S
4. Crop: 1080x1080
5. Save: instagram-ad-3.png
```

---

## 📤 Upload to Instagram/Facebook Ads

### Instagram Ads (RECOMMENDED):
1. Go to **facebook.com/ads/manager**
2. Create Campaign → **Traffic or Conversions**
3. **Upload all 3 images** (test which performs best!)
4. **Primary Text** options (from facebook-ad-copy.txt):
   - Variant 1: "Transform Your Business Online" + features
   - Variant 2: "Struggling with slow website? We fix that."
   - Variant 3: "Need a website that converts? Let's talk."
5. **Headline**: "Professional Web Development | Fast Delivery"
6. **Link**: `https://samcroston.com/#contact`
7. **Call-to-Action**: "Send Message" or "Learn More"
8. **Placements**: Instagram Feed, Instagram Stories, Instagram Explore
9. **Audience**: Business owners, entrepreneurs, 25-65, UK + Worldwide
10. **Budget**: £5-10/day starting
11. **Run all 3 variants** for 1 week each to see winner! 🏆

### A/B Testing Strategy:
- Week 1: Run Variant 1 (hero ad)
- Week 2: Run Variant 2 (before/after)
- Week 3: Run Variant 3 (question style)
- Week 4+: Scale the winner with £15-30/day budget! �

---

**🎯 PRO TIP**: Upload all 3 images in ONE campaign as a carousel or multiple ad sets. Instagram will show the best performer more often!

**Images are ready to export!** Just open the HTML files, press F11, and screenshot! 📸✨
