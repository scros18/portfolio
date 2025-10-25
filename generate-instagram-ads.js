const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');
require('dotenv').config();

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

// Ad files to capture
const ADS = [
    {
        file: 'instagram-premium-final-v2.html',
        name: 'Instagram Ad - Social Proof Focus',
        description: '🎯 Features: 5-star ratings, 100+ projects, limited spots, payment-to-start messaging'
    },
    {
        file: 'instagram-premium-variant-2.html',
        name: 'Instagram Ad - Competition Focus',
        description: '⚡ Features: Stand out from competition, 3X more leads, explosive animations, results-driven'
    }
];

async function captureInstagramAd(adPath, outputPath) {
    console.log(`📸 Capturing: ${adPath}...`);
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set exact Instagram post dimensions
    await page.setViewport({
        width: 1080,
        height: 1080,
        deviceScaleFactor: 2 // High DPI for crisp screenshots
    });
    
    // Load the ad
    const fileUrl = `file:///${adPath.replace(/\\/g, '/')}`;
    await page.goto(fileUrl, {
        waitUntil: 'networkidle0',
        timeout: 30000
    });
    
    // Wait for animations to settle
    await page.waitForTimeout(2000);
    
    // Take screenshot
    await page.screenshot({
        path: outputPath,
        type: 'png',
        clip: {
            x: 0,
            y: 0,
            width: 1080,
            height: 1080
        }
    });
    
    await browser.close();
    console.log(`✅ Saved: ${outputPath}`);
    
    return outputPath;
}

async function sendToDiscord(imagePath, adInfo) {
    console.log(`📤 Sending to Discord: ${adInfo.name}...`);
    
    const form = new FormData();
    
    // Add file
    form.append('file', fs.createReadStream(imagePath), {
        filename: path.basename(imagePath),
        contentType: 'image/png'
    });
    
    // Add embed message
    const embed = {
        title: `🎨 ${adInfo.name}`,
        description: adInfo.description,
        color: 0x6366f1, // Indigo
        fields: [
            {
                name: '📐 Dimensions',
                value: '1080x1080px (Instagram Feed)',
                inline: true
            },
            {
                name: '✨ Quality',
                value: 'High DPI (2x)',
                inline: true
            },
            {
                name: '📅 Generated',
                value: new Date().toLocaleString(),
                inline: false
            }
        ],
        footer: {
            text: 'Sam Croston • Premium Web Development'
        }
    };
    
    form.append('payload_json', JSON.stringify({
        username: 'Instagram Ad Generator',
        avatar_url: 'https://i.pravatar.cc/300?img=12',
        embeds: [embed]
    }));
    
    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            body: form
        });
        
        if (response.ok) {
            console.log(`✅ Sent to Discord successfully!`);
        } else {
            const error = await response.text();
            console.error(`❌ Discord error: ${error}`);
        }
    } catch (error) {
        console.error(`❌ Failed to send to Discord:`, error.message);
    }
}

async function main() {
    console.log('🚀 Instagram Ad Screenshot Generator\n');
    
    // Check if Discord webhook is configured
    if (!DISCORD_WEBHOOK_URL) {
        console.error('❌ DISCORD_WEBHOOK_URL not found in .env file');
        process.exit(1);
    }
    
    // Create output directory
    const outputDir = path.join(__dirname, 'ad-assets', 'exports');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
        console.log(`📁 Created output directory: ${outputDir}\n`);
    }
    
    // Process each ad
    for (const ad of ADS) {
        const adPath = path.join(__dirname, 'ad-assets', ad.file);
        
        // Check if file exists
        if (!fs.existsSync(adPath)) {
            console.error(`❌ File not found: ${adPath}`);
            continue;
        }
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
        const outputFilename = `${ad.file.replace('.html', '')}-${timestamp}.png`;
        const outputPath = path.join(outputDir, outputFilename);
        
        try {
            // Capture screenshot
            await captureInstagramAd(adPath, outputPath);
            
            // Send to Discord
            await sendToDiscord(outputPath, ad);
            
            console.log('');
        } catch (error) {
            console.error(`❌ Error processing ${ad.file}:`, error.message);
        }
    }
    
    console.log('✨ All done! Check your Discord for the images.');
}

// Run if executed directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { captureInstagramAd, sendToDiscord };
