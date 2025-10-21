#!/usr/bin/env node

/**
 * Production Build Verification Script
 * Checks that all required files are present and properly optimized
 */

const fs = require('fs');
const path = require('path');

// Colors for console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  bright: '\x1b[1m'
};

const symbols = {
  success: '✓',
  error: '✗',
  warning: '⚠',
  info: 'ℹ'
};

let passed = 0;
let failed = 0;
let warnings = 0;

function check(condition, message, level = 'error') {
  if (condition) {
    console.log(`${colors.green}${symbols.success} ${message}${colors.reset}`);
    passed++;
    return true;
  } else {
    if (level === 'warning') {
      console.log(`${colors.yellow}${symbols.warning} ${message}${colors.reset}`);
      warnings++;
    } else {
      console.log(`${colors.red}${symbols.error} ${message}${colors.reset}`);
      failed++;
    }
    return false;
  }
}

function info(message) {
  console.log(`${colors.cyan}${symbols.info} ${message}${colors.reset}`);
}

function header(message) {
  console.log(`\n${colors.bright}${colors.cyan}▶ ${message}${colors.reset}`);
}

console.log('\n' + '='.repeat(60));
console.log(`${colors.bright}${colors.cyan}🔍  Production Build Verification${colors.reset}`);
console.log('='.repeat(60) + '\n');

// Check if build directory exists
header('Build Directory');
check(fs.existsSync('build'), 'Build directory exists');

if (!fs.existsSync('build')) {
  console.log(`\n${colors.red}Build directory not found. Run: npm run build${colors.reset}\n`);
  process.exit(1);
}

// Check required files
header('Required Files');
const requiredFiles = [
  'build/index.html',
  'build/styles.css',
  'build/dist/main.js',
  'build/favicon.svg',
  'build/site.webmanifest',
  'build/.htaccess',
  'build/robots.txt',
  'build/sitemap.xml'
];

requiredFiles.forEach(file => {
  check(fs.existsSync(file), `${file.replace('build/', '')} exists`);
});

// Check favicon files
header('Favicon Files');
const faviconFiles = [
  'build/favicon-16.png',
  'build/favicon-32.png',
  'build/apple-touch-icon.png',
  'build/favicon-192.png',
  'build/favicon-512.png'
];

faviconFiles.forEach(file => {
  check(fs.existsSync(file), `${file.replace('build/', '')} exists`, 'warning');
});

// Check file sizes
header('File Size Verification');

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

function formatBytes(bytes) {
  return (bytes / 1024).toFixed(2) + ' KB';
}

const htmlSize = getFileSize('build/index.html');
const cssSize = getFileSize('build/styles.css');
const jsSize = getFileSize('build/dist/main.js');

info(`HTML: ${formatBytes(htmlSize)}`);
info(`CSS: ${formatBytes(cssSize)}`);
info(`JavaScript: ${formatBytes(jsSize)}`);

check(htmlSize < 50000, 'HTML is optimized (< 50 KB)');
check(cssSize < 50000, 'CSS is optimized (< 50 KB)');
check(jsSize > 0, 'JavaScript is present');

// Check if JavaScript is obfuscated
header('Code Obfuscation');
try {
  const jsContent = fs.readFileSync('build/dist/main.js', 'utf8');
  const hasObfuscationMarkers = jsContent.includes('_0x') || 
                                 jsContent.includes('\\x') ||
                                 jsContent.length > 50000; // Obfuscated code is typically larger
  
  check(hasObfuscationMarkers, 'JavaScript is obfuscated');
  
  if (hasObfuscationMarkers) {
    info('Code is protected and unreadable ✨');
  }
} catch (error) {
  check(false, 'Could not verify obfuscation');
}

// Check HTML minification
header('Minification');
try {
  const htmlContent = fs.readFileSync('build/index.html', 'utf8');
  const originalSize = fs.statSync('index.html').size;
  const minifiedSize = fs.statSync('build/index.html').size;
  const isMinified = minifiedSize < originalSize;
  check(isMinified, 'HTML is minified (smaller than original)');
} catch (error) {
  check(false, 'Could not verify HTML minification');
}

try {
  const cssContent = fs.readFileSync('build/styles.css', 'utf8');
  const isMinified = !cssContent.includes('\n  ') && cssContent.split('\n').length < 100;
  check(isMinified, 'CSS is minified');
} catch (error) {
  check(false, 'Could not verify CSS minification');
}

// Check security headers in .htaccess
header('Security Configuration');
try {
  const htaccess = fs.readFileSync('build/.htaccess', 'utf8');
  check(htaccess.includes('X-Frame-Options'), '.htaccess has X-Frame-Options');
  check(htaccess.includes('Content-Security-Policy'), '.htaccess has CSP');
  check(htaccess.includes('Strict-Transport-Security'), '.htaccess has HSTS');
  check(htaccess.includes('X-Content-Type-Options'), '.htaccess has X-Content-Type-Options');
} catch (error) {
  check(false, 'Could not verify .htaccess');
}

// Check manifest
header('PWA Configuration');
try {
  const manifest = JSON.parse(fs.readFileSync('build/site.webmanifest', 'utf8'));
  check(manifest.name, 'Manifest has name');
  check(manifest.icons && manifest.icons.length > 0, 'Manifest has icons');
  check(manifest.theme_color, 'Manifest has theme color');
} catch (error) {
  check(false, 'Could not verify manifest');
}

// Summary
console.log('\n' + '='.repeat(60));
console.log(`${colors.bright}📊 Verification Summary${colors.reset}`);
console.log('='.repeat(60) + '\n');

console.log(`${colors.green}${symbols.success} Passed: ${passed}${colors.reset}`);
if (warnings > 0) {
  console.log(`${colors.yellow}${symbols.warning} Warnings: ${warnings}${colors.reset}`);
}
if (failed > 0) {
  console.log(`${colors.red}${symbols.error} Failed: ${failed}${colors.reset}`);
}

console.log('\n' + '='.repeat(60));

if (failed === 0) {
  console.log(`${colors.green}${colors.bright}🎉 BUILD VERIFIED! Ready for deployment.${colors.reset}`);
  console.log(`${colors.cyan}\nNext: See DEPLOYMENT.md for deployment instructions${colors.reset}\n`);
  process.exit(0);
} else {
  console.log(`${colors.red}${colors.bright}⚠️  BUILD VERIFICATION FAILED${colors.reset}`);
  console.log(`${colors.red}Fix the issues above and run: npm run build${colors.reset}\n`);
  process.exit(1);
}
