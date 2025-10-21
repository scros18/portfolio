// ================================
// MAIN TYPESCRIPT FILE
// High-performance, lightweight interactions
// ================================

// Declare global for build-time injected environment variables
declare const DISCORD_WEBHOOK_URL: string;

interface NavigationLink {
    element: HTMLElement;
    section: string;
}

interface FormData {
    name: string;
    email: string;
    message: string;
}

class PortfolioApp {
    private navLinks: NavigationLink[] = [];
    private sections: NodeListOf<HTMLElement>;
    private menuToggle: HTMLElement | null;
    private navLinksContainer: HTMLElement | null;
    private contactForm: HTMLFormElement | null;
    private isMenuOpen: boolean = false;

    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.menuToggle = document.querySelector('.menu-toggle');
        this.navLinksContainer = document.querySelector('.nav-links');
        this.contactForm = document.querySelector('#contactForm');

        this.init();
    }

    private init(): void {
        this.setupNavigation();
        this.setupScrollSpy();
        this.setupMobileMenu();
        this.setupContactForm();
        this.setupSmoothScroll();
        this.optimizeAnimations();
        this.registerServiceWorker();
    }

    // ================================
    // SERVICE WORKER REGISTRATION
    // ================================
    private registerServiceWorker(): void {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                        // Service worker registered successfully
                        // Check for updates periodically
                        setInterval(() => {
                            registration.update();
                        }, 60000); // Check every minute
                    })
                    .catch(() => {
                        // Silent fail - service worker is optional enhancement
                    });
            });
        }
    }

    // ================================
    // NAVIGATION SETUP
    // ================================
    private setupNavigation(): void {
        const links = document.querySelectorAll('.nav-link');
        
        links.forEach((link) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                this.navLinks.push({
                    element: link as HTMLElement,
                    section: href.substring(1)
                });
            }
        });
    }

    // ================================
    // SCROLL SPY (Optimized with IntersectionObserver)
    // ================================
    private setupScrollSpy(): void {
        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    this.updateActiveLink(sectionId);
                }
            });
        }, observerOptions);

        this.sections.forEach((section) => observer.observe(section));
    }

    private updateActiveLink(sectionId: string | null): void {
        if (!sectionId) return;

        this.navLinks.forEach((link) => {
            if (link.section === sectionId) {
                link.element.classList.add('active');
            } else {
                link.element.classList.remove('active');
            }
        });
    }

    // ================================
    // MOBILE MENU
    // ================================
    private setupMobileMenu(): void {
        if (!this.menuToggle) return;

        this.menuToggle.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking on a link
        const links = document.querySelectorAll('.nav-link');
        links.forEach((link) => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.toggleMenu();
                }
            });
        });
    }

    private toggleMenu(): void {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.navLinksContainer) {
            if (this.isMenuOpen) {
                this.navLinksContainer.style.display = 'flex';
                this.navLinksContainer.style.flexDirection = 'column';
                this.navLinksContainer.style.position = 'absolute';
                this.navLinksContainer.style.top = '100%';
                this.navLinksContainer.style.left = '0';
                this.navLinksContainer.style.right = '0';
                this.navLinksContainer.style.background = 'rgba(15, 23, 42, 0.95)';
                this.navLinksContainer.style.padding = '1rem';
                this.navLinksContainer.style.backdropFilter = 'blur(20px)';
            } else {
                this.navLinksContainer.style.display = '';
            }
        }

        // Animate hamburger icon
        if (this.menuToggle) {
            const spans = this.menuToggle.querySelectorAll('span');
            if (this.isMenuOpen) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        }
    }

    // ================================
    // SMOOTH SCROLL
    // ================================
    private setupSmoothScroll(): void {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach((link) => {
            link.addEventListener('click', (e: Event) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                
                if (target && target !== '#') {
                    const element = document.querySelector(target);
                    if (element) {
                        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ================================
    // CONTACT FORM
    // ================================
    private setupContactForm(): void {
        if (!this.contactForm) return;

        this.contactForm.addEventListener('submit', async (e: Event) => {
            e.preventDefault();
            
            const formData = this.getFormData();
            
            if (this.validateForm(formData)) {
                await this.submitForm(formData);
            }
        });
    }

    private getFormData(): FormData {
        const nameInput = document.getElementById('name') as HTMLInputElement;
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const messageInput = document.getElementById('message') as HTMLTextAreaElement;

        return {
            name: nameInput?.value || '',
            email: emailInput?.value || '',
            message: messageInput?.value || ''
        };
    }

    private validateForm(data: FormData): boolean {
        if (!data.name.trim()) {
            this.showNotification('Please enter your name', 'error');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showNotification('Please enter a valid email', 'error');
            return false;
        }

        if (!data.message.trim()) {
            this.showNotification('Please enter a message', 'error');
            return false;
        }

        return true;
    }

    private async submitForm(data: FormData): Promise<void> {
        this.showNotification('Sending message...', 'info');
        
        try {
            // Send to Discord webhook with beautiful embed
            // Webhook URL is injected during build process from .env
            const webhookUrl = DISCORD_WEBHOOK_URL || '';
            
            if (!webhookUrl) {
                throw new Error('Webhook URL not configured');
            }
            
            const currentTime = new Date().toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            
            const embed = {
                username: 'Portfolio Contact',
                embeds: [{
                    author: {
                        name: '✨ New Contact Request'
                    },
                    title: '📬 Someone wants to work with you!',
                    description: `**New message received from ${data.name}**\n━━━━━━━━━━━━━━━━━━━━━`,
                    color: 0x6366f1, // Primary purple from site
                    fields: [
                        {
                            name: '👤 Contact Name',
                            value: `\`\`\`${data.name}\`\`\``,
                            inline: true
                        },
                        {
                            name: '📧 Email Address',
                            value: `\`\`\`${data.email}\`\`\``,
                            inline: true
                        },
                        {
                            name: '\u200b',
                            value: '\u200b',
                            inline: false
                        },
                        {
                            name: '💬 Message Content',
                            value: `>>> ${data.message}`,
                            inline: false
                        },
                        {
                            name: '⏰ Submitted At',
                            value: `\`${currentTime}\``,
                            inline: true
                        },
                        {
                            name: '🌐 Source',
                            value: '`samcroston.com`',
                            inline: true
                        }
                    ],
                    footer: {
                        text: '🚀 samcroston.com • Professional Portfolio'
                    },
                    timestamp: new Date().toISOString()
                }]
            };

            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(embed)
            });

            if (response.ok) {
                this.showNotification('Message sent successfully! 🚀 I\'ll get back to you soon.', 'success');
                if (this.contactForm) {
                    this.contactForm.reset();
                }
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showNotification('Failed to send message. Please try emailing me directly.', 'error');
        }
    }

    private showNotification(message: string, type: 'success' | 'error' | 'info'): void {
        // Create notification element
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.position = 'fixed';
        notification.style.top = '100px';
        notification.style.right = '20px';
        notification.style.padding = '1rem 2rem';
        notification.style.borderRadius = '12px';
        notification.style.zIndex = '9999';
        notification.style.animation = 'slideIn 0.3s ease';
        notification.style.backdropFilter = 'blur(20px)';
        notification.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        
        // Set colors based on type
        switch (type) {
            case 'success':
                notification.style.background = 'rgba(34, 197, 94, 0.2)';
                notification.style.color = '#22c55e';
                break;
            case 'error':
                notification.style.background = 'rgba(239, 68, 68, 0.2)';
                notification.style.color = '#ef4444';
                break;
            case 'info':
                notification.style.background = 'rgba(99, 102, 241, 0.2)';
                notification.style.color = '#6366f1';
                break;
        }
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // ================================
    // PERFORMANCE OPTIMIZATIONS
    // ================================
    private optimizeAnimations(): void {
        // Reduce motion for users who prefer it
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }

        // Lazy load images when they're near viewport
        this.setupLazyLoading();

        // Optimize animations with requestAnimationFrame
        this.setupPerformanceMonitoring();
    }

    private setupLazyLoading(): void {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target as HTMLImageElement;
                        const src = img.getAttribute('data-src');
                        if (src) {
                            img.src = src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            images.forEach((img) => imageObserver.observe(img));
        }
    }

    private setupPerformanceMonitoring(): void {
        // Log performance metrics
        if ('performance' in window && 'PerformanceObserver' in window) {
            try {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        console.log(`Performance: ${entry.name} - ${entry.duration}ms`);
                    }
                });
                
                observer.observe({ entryTypes: ['measure', 'navigation'] });
            } catch (e) {
                console.log('Performance monitoring not supported');
            }
        }

        // Track page load time
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page Load Time: ${pageLoadTime}ms`);
        });
    }
}

// ================================
// INITIALIZE APP
// ================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PortfolioApp();
    });
} else {
    new PortfolioApp();
}

// Add slide animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Export for potential module usage
export default PortfolioApp;
