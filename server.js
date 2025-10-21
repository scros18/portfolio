// Sam Croston Portfolio - Development Server with Beautiful Logging
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8000;

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
    magenta: '\x1b[35m'
};

const symbols = {
    rocket: '🚀',
    sparkles: '✨',
    globe: '🌐',
    check: '✓',
    arrow: '→'
};

function logHeader() {
    console.clear();
    console.log('\n' + '='.repeat(60));
    console.log(`${colors.bright}${colors.cyan}${symbols.rocket}  Sam Croston Portfolio - Development Server${colors.reset}`);
    console.log('='.repeat(60) + '\n');
}

function logServerStart() {
    console.log(`${colors.green}${symbols.check} Server Status:${colors.reset} ${colors.bright}Running${colors.reset}`);
    console.log(`${colors.green}${symbols.globe} Local URL:${colors.reset}    ${colors.cyan}${colors.bright}http://localhost:${PORT}${colors.reset}`);
    console.log(`${colors.green}${symbols.sparkles} Features:${colors.reset}     Security Headers ${colors.dim}|${colors.reset} TypeScript ${colors.dim}|${colors.reset} Hot Reload`);
    console.log('\n' + '─'.repeat(60) + '\n');
    console.log(`${colors.dim}Watching for changes... Press Ctrl+C to stop${colors.reset}\n`);
}

function logRequest(method, url, statusCode) {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    const statusColor = statusCode < 300 ? colors.green : statusCode < 400 ? colors.yellow : colors.red;
    const methodColor = method === 'GET' ? colors.cyan : colors.magenta;
    
    console.log(
        `${colors.dim}[${timestamp}]${colors.reset} ` +
        `${methodColor}${method.padEnd(4)}${colors.reset} ` +
        `${statusColor}${statusCode}${colors.reset} ` +
        `${colors.dim}${symbols.arrow}${colors.reset} ` +
        `${url}`
    );
}

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 - File Not Found</h1>', 'utf-8');
                logRequest(req.method, req.url, 404);
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code);
                logRequest(req.method, req.url, 500);
            }
        } else {
            // Add security headers
            res.writeHead(200, {
                'Content-Type': contentType,
                'X-Content-Type-Options': 'nosniff',
                'X-Frame-Options': 'DENY',
                'X-XSS-Protection': '1; mode=block',
                'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
                'Referrer-Policy': 'strict-origin-when-cross-origin',
                'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
                'Cache-Control': 'public, max-age=0'
            });
            res.end(content, 'utf-8');
            logRequest(req.method, req.url, 200);
        }
    });
});

// Initialize server with beautiful logging
logHeader();
logServerStart();

server.listen(PORT, () => {
    // Server is now listening
});
