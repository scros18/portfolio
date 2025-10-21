# Favicon Generation Instructions

The portfolio uses a custom SVG favicon (`favicon.svg`) with the "SC" monogram and lightning bolt.

## Current Setup
- ✅ `favicon.svg` - Main SVG favicon (works in modern browsers)
- ✅ `site.webmanifest` - PWA manifest
- ✅ `browserconfig.xml` - Windows tile configuration

## Optional: Generate PNG Favicons

For maximum browser compatibility, you can generate PNG versions from the SVG:

### Option 1: Online Tool (Easiest)
1. Visit https://realfavicongenerator.net/
2. Upload `favicon.svg`
3. Customize settings if needed
4. Download and extract all files to the root directory

### Option 2: Using ImageMagick (Command Line)
```bash
# Install ImageMagick first
# Windows: choco install imagemagick
# Mac: brew install imagemagick

# Generate different sizes
magick favicon.svg -resize 16x16 favicon-16.png
magick favicon.svg -resize 32x32 favicon-32.png
magick favicon.svg -resize 180x180 apple-touch-icon.png
magick favicon.svg -resize 192x192 favicon-192.png
magick favicon.svg -resize 512x512 favicon-512.png
magick favicon.svg -resize 150x150 favicon-150.png
```

### Option 3: Skip PNG Generation
Modern browsers support SVG favicons, so the PNG files are optional. The site will work perfectly with just the SVG favicon!

## SEO Benefits
- **Memorable Design**: "SC" monogram with lightning bolt symbolizes speed
- **Brand Recognition**: Consistent purple gradient matches site theme
- **Professional**: Clean, modern design attracts clients
- **Performance Icon**: Lightning bolt represents fast, optimized code
- **Unique**: Stands out in browser tabs and bookmarks

## Design Rationale
- **Purple Gradient**: Matches the site's primary brand colors (#6366f1 → #a855f7)
- **Lightning Bolt**: Symbolizes performance, speed, and energy
- **Bold Typography**: "SC" initials are clear even at 16x16px
- **Gold Accent**: Lightning bolt uses gold gradient for contrast and attention
