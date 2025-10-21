#!/usr/bin/env node

/**
 * Production Build System - A-Grade Quality
 * Handles TypeScript compilation, obfuscation, minification, and optimization
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const JavaScriptObfuscator = require('javascript-obfuscator');
const { minify: minifyHTML } = require('html-minifier-terser');
const { Terser } = require('terser');

// ============================================
// BEAUTIFUL CONSOLE LOGGING
// ============================================
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m',
  blue: '\x1b[34m',
  white: '\x1b[37m'
};

const symbols = {
  success: '✓',
  error: '✗',
  info: 'ℹ',
  warning: '⚠',
  arrow: '→',
  rocket: '🚀',
  sparkles: '✨',
  fire: '🔥',
  package: '📦',
  shield: '🛡️',
  zap: '⚡'
};

function log(message, type = 'info') {
  const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
  const styles = {
    success: { color: colors.green, symbol: symbols.success },
    error: { color: colors.red, symbol: symbols.error },
    info: { color: colors.cyan, symbol: symbols.info },
    warning: { color: colors.yellow, symbol: symbols.warning },
    header: { color: colors.magenta, symbol: symbols.rocket },
    step: { color: colors.blue, symbol: symbols.arrow }
  };
  
  const style = styles[type] || styles.info;
  console.log(
    `${colors.dim}[${timestamp}]${colors.reset} ${style.color}${style.symbol} ${message}${colors.reset}`
  );
}

function logHeader(message) {
  console.log('\n' + '='.repeat(60));
  console.log(`${colors.bright}${colors.magenta}${symbols.rocket}  ${message}${colors.reset}`);
  console.log('='.repeat(60) + '\n');
}

function logSection(title) {
  console.log(`\n${colors.bright}${colors.cyan}▶ ${title}${colors.reset}`);
}

function logSuccess(message) {
  console.log(`${colors.green}${symbols.success} ${message}${colors.reset}`);
}

function logFile(action, filename, size = null) {
  const sizeStr = size ? `${colors.dim}(${formatBytes(size)})${colors.reset}` : '';
  console.log(`  ${colors.dim}${symbols.arrow}${colors.reset} ${action} ${colors.cyan}${filename}${colors.reset} ${sizeStr}`);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// ============================================
// BUILD CONFIGURATION
// ============================================
const config = {
  srcDir: 'src',
  distDir: 'dist',
  publicDir: 'public',
  buildDir: 'build',
  
  obfuscatorOptions: {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.5, // Reduced from 0.75 for smaller bundle
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.1, // Reduced from 0.4 for smaller bundle
    debugProtection: false,
    debugProtectionInterval: 0,
    disableConsoleOutput: true, // Remove ALL console.log in production
    identifierNamesGenerator: 'hexadecimal',
    log: false,
    numbersToExpressions: false, // Disabled for smaller bundle
    renameGlobals: false,
    selfDefending: false, // Disabled for production performance
    simplify: true,
    splitStrings: true,
    splitStringsChunkLength: 10,
    stringArray: true,
    stringArrayCallsTransform: true,
    stringArrayEncoding: [], // Disabled base64 encoding for smaller bundle
    stringArrayIndexShift: true,
    stringArrayRotate: true,
    stringArrayShuffle: true,
    stringArrayWrappersCount: 1, // Reduced from 2
    stringArrayWrappersChainedCalls: false, // Disabled for smaller bundle
    stringArrayWrappersParametersMaxCount: 2, // Reduced from 4
    stringArrayWrappersType: 'function',
    stringArrayThreshold: 0.5, // Reduced from 0.75
    transformObjectKeys: false, // Disabled for smaller bundle
    unicodeEscapeSequence: false
  },
  
  htmlMinifierOptions: {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true
  },
  
  cssOptions: {
    preset: ['default', {
      discardComments: { removeAll: true },
      normalizeWhitespace: true,
      minifyFontValues: true,
      minifySelectors: true
    }]
  }
};

// ============================================
// BUILD FUNCTIONS
// ============================================

async function clean() {
  logSection('Cleaning Build Directory');
  if (fs.existsSync(config.buildDir)) {
    fs.rmSync(config.buildDir, { recursive: true, force: true });
    log('Removed old build directory', 'success');
  }
  fs.mkdirSync(config.buildDir, { recursive: true });
  fs.mkdirSync(path.join(config.buildDir, 'dist'), { recursive: true });
  log('Created fresh build directory', 'success');
}

async function compileTypeScript() {
  logSection('Compiling TypeScript');
  try {
    execSync('npx tsc', { stdio: 'inherit' });
    log('TypeScript compiled successfully', 'success');
    return true;
  } catch (error) {
    log('TypeScript compilation failed', 'error');
    return false;
  }
}

async function obfuscateJavaScript() {
  logSection('Obfuscating JavaScript (High-Grade)');
  
  const jsFile = path.join(config.distDir, 'main.js');
  if (!fs.existsSync(jsFile)) {
    log('No JavaScript file found to obfuscate', 'warning');
    return;
  }
  
  const originalCode = fs.readFileSync(jsFile, 'utf8');
  const originalSize = Buffer.byteLength(originalCode);
  logFile('Reading', 'main.js', originalSize);
  
  // Load webhook URL from webhook.txt
  log('Injecting webhook URL...', 'step');
  let processedCode = originalCode;
  
  const webhookPath = path.join(__dirname, 'webhook.txt');
  if (fs.existsSync(webhookPath)) {
    const webhookUrl = fs.readFileSync(webhookPath, 'utf8').trim();
    
    // Replace the placeholder webhook URL with actual value
    const webhookRegex = /const webhookUrl = ['"]https:\/\/discord\.com\/api\/webhooks\/[^'"]*['"]/g;
    processedCode = processedCode.replace(
      webhookRegex, 
      `const webhookUrl = '${webhookUrl}'`
    );
    
    log('Webhook URL injected from webhook.txt', 'success');
  } else {
    log('No webhook.txt file found - webhook may not work!', 'warning');
  }
  
  log('Applying military-grade obfuscation...', 'step');
  const obfuscationResult = JavaScriptObfuscator.obfuscate(processedCode, config.obfuscatorOptions);
  const obfuscatedCode = obfuscationResult.getObfuscatedCode();
  const obfuscatedSize = Buffer.byteLength(obfuscatedCode);
  
  const outputPath = path.join(config.buildDir, 'dist', 'main.js');
  fs.writeFileSync(outputPath, obfuscatedCode);
  
  logFile('Created', 'build/dist/main.js', obfuscatedSize);
  const ratio = ((obfuscatedSize / originalSize) * 100).toFixed(1);
  log(`Obfuscation complete - Code protected and optimized (${ratio}% of original)`, 'success');
}

async function minifyCSS() {
  logSection('Minifying CSS');
  
  const cssFile = 'styles.css';
  if (!fs.existsSync(cssFile)) {
    log('No CSS file found', 'warning');
    return;
  }
  
  const originalCSS = fs.readFileSync(cssFile, 'utf8');
  const originalSize = Buffer.byteLength(originalCSS);
  logFile('Reading', cssFile, originalSize);
  
  try {
    const postcss = require('postcss');
    const cssnano = require('cssnano');
    
    const result = await postcss([cssnano(config.cssOptions)])
      .process(originalCSS, { from: cssFile, to: path.join(config.buildDir, cssFile) });
    
    const minifiedSize = Buffer.byteLength(result.css);
    fs.writeFileSync(path.join(config.buildDir, cssFile), result.css);
    
    logFile('Created', 'build/styles.css', minifiedSize);
    const saved = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
    log(`CSS minified - Saved ${saved}%`, 'success');
  } catch (error) {
    log(`CSS minification failed: ${error.message}`, 'error');
  }
}

async function minifyHTMLFiles() {
  logSection('Minifying HTML');
  
  const htmlFile = 'index.html';
  if (!fs.existsSync(htmlFile)) {
    log('No HTML file found', 'warning');
    return;
  }
  
  const originalHTML = fs.readFileSync(htmlFile, 'utf8');
  const originalSize = Buffer.byteLength(originalHTML);
  logFile('Reading', htmlFile, originalSize);
  
  try {
    const minifiedHTML = await minifyHTML(originalHTML, config.htmlMinifierOptions);
    const minifiedSize = Buffer.byteLength(minifiedHTML);
    
    fs.writeFileSync(path.join(config.buildDir, htmlFile), minifiedHTML);
    
    logFile('Created', 'build/index.html', minifiedSize);
    const saved = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
    log(`HTML minified - Saved ${saved}%`, 'success');
  } catch (error) {
    log(`HTML minification failed: ${error.message}`, 'error');
  }
}

async function copyAssets() {
  logSection('Copying Assets');
  
  const assets = [
    'sw.js',
    'favicon.svg',
    'favicon-16.png',
    'favicon-32.png',
    'apple-touch-icon.png',
    'favicon-192.png',
    'favicon-512.png',
    'favicon-150.png',
    'site.webmanifest',
    'browserconfig.xml',
    'robots.txt',
    'sitemap.xml',
    '.htaccess'
  ];
  
  let copied = 0;
  for (const asset of assets) {
    if (fs.existsSync(asset)) {
      fs.copyFileSync(asset, path.join(config.buildDir, asset));
      logFile('Copied', asset);
      copied++;
    }
  }
  
  log(`Copied ${copied} asset files`, 'success');
}

async function generateBuildInfo() {
  logSection('Generating Build Info');
  
  const buildInfo = {
    version: require('./package.json').version,
    buildDate: new Date().toISOString(),
    environment: 'production',
    obfuscated: true,
    optimized: true,
    nodeVersion: process.version
  };
  
  fs.writeFileSync(
    path.join(config.buildDir, 'build-info.json'),
    JSON.stringify(buildInfo, null, 2)
  );
  
  log('Build info generated', 'success');
}

async function calculateStats() {
  logSection('Build Statistics');
  
  const getDirectorySize = (dir) => {
    let size = 0;
    if (!fs.existsSync(dir)) return 0;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        size += stats.size;
      } else if (stats.isDirectory()) {
        size += getDirectorySize(filePath);
      }
    }
    return size;
  };
  
  const buildSize = getDirectorySize(config.buildDir);
  
  console.log(`\n${colors.bright}  Build Size:${colors.reset} ${colors.green}${formatBytes(buildSize)}${colors.reset}`);
  console.log(`${colors.bright}  Location:${colors.reset} ${colors.cyan}${config.buildDir}/${colors.reset}`);
  console.log(`${colors.bright}  Status:${colors.reset} ${colors.green}Ready for deployment${colors.reset}\n`);
}

// ============================================
// MAIN BUILD PROCESS
// ============================================

async function build() {
  const startTime = Date.now();
  
  logHeader('Production Build - Sam Croston Portfolio');
  
  console.log(`${colors.cyan}${symbols.sparkles} Building production-ready, obfuscated bundle...${colors.reset}\n`);
  
  try {
    await clean();
    
    const tsSuccess = await compileTypeScript();
    if (!tsSuccess) {
      throw new Error('TypeScript compilation failed');
    }
    
    await obfuscateJavaScript();
    await minifyCSS();
    await minifyHTMLFiles();
    await copyAssets();
    await generateBuildInfo();
    await calculateStats();
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    
    console.log('='.repeat(60));
    console.log(`${colors.green}${colors.bright}${symbols.fire} BUILD SUCCESSFUL! ${symbols.fire}${colors.reset}`);
    console.log(`${colors.dim}Completed in ${duration}s${colors.reset}`);
    console.log('='.repeat(60) + '\n');
    
    console.log(`${colors.cyan}${symbols.rocket} Next steps:${colors.reset}`);
    console.log(`  ${colors.dim}1.${colors.reset} Test: cd build && npx http-server -p 8000`);
    console.log(`  ${colors.dim}2.${colors.reset} Deploy: Upload 'build' directory to your hosting`);
    console.log(`  ${colors.dim}3.${colors.reset} Enjoy: Watch your A-grade portfolio shine! ${symbols.sparkles}\n`);
    
  } catch (error) {
    console.log(`\n${colors.red}${colors.bright}${symbols.error} BUILD FAILED${colors.reset}`);
    console.log(`${colors.red}Error: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }
}

// Run build
if (require.main === module) {
  build();
}

module.exports = { build };
