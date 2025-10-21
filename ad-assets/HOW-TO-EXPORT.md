# How to Export Facebook Ad Images

## 📸 Method 1: Screenshot (Easiest)

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

## ✅ Files You Have

1. **facebook-ad-1200x628.html** - Facebook Feed Ad
2. **instagram-ad-1080x1080.html** - Instagram Square

---

## 🚀 Quick Export Steps

**For Facebook (1200x628):**
```
1. Open: facebook-ad-1200x628.html
2. Press: F11 (fullscreen)
3. Screenshot: Win+Shift+S
4. Crop: 1200x628
5. Save: facebook-ad.png
```

**For Instagram (1080x1080):**
```
1. Open: instagram-ad-1080x1080.html
2. Press: F11 (fullscreen)
3. Screenshot: Win+Shift+S
4. Crop: 1080x1080
5. Save: instagram-ad.png
```

---

## 📤 Upload to Facebook Ads

1. Go to **facebook.com/ads/manager**
2. Create Campaign → Traffic or Conversions
3. Upload your image
4. Add headline: "Transform Your Business Online"
5. Add description from `facebook-ad-copy.txt`
6. Link to: `https://samcroston.com/#contact`
7. Set budget: £5-10/day
8. Launch! 🚀

---

**Images are ready to export!** Just open the HTML files and screenshot them! 📸
