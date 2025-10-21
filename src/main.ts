// ================================
// MAIN TYPESCRIPT FILE
// High-performance, lightweight interactions
// ================================

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
        // Critical: Initialize navigation and mobile menu immediately
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupContactForm();
        this.setupSmoothScroll();
        
        // Non-critical: Defer to idle time to avoid blocking main thread
        this.deferNonCritical();
    }
    
    private deferNonCritical(): void {
        // Use requestIdleCallback if available, otherwise setTimeout
        const idleCallback = (window as any).requestIdleCallback || ((cb: Function) => setTimeout(cb, 1));
        
        idleCallback(() => {
            this.setupScrollSpy();
            this.optimizeAnimations();
        });
        
        // Defer service worker registration to after page load
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => this.registerServiceWorker(), { once: true });
        }
    }

    // ================================
    // SERVICE WORKER REGISTRATION
    // ================================
    private registerServiceWorker(): void {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                // Check for updates periodically (every 5 minutes)
                setInterval(() => registration.update(), 300000);
            })
            .catch(() => {
                // Silent fail - service worker is optional enhancement
            });
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
            const webhookUrl = 'https://discord.com/api/webhooks/1430211373971013692/FnKzvF7sdKbeWgSZd0IfpOp6Jsvx28EJ0U48_TTa1n0F5FlhrPUrQv4_KFEokdZVpgie';
            
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
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            const style = document.createElement('style');
            style.textContent = '*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}';
            document.head.appendChild(style);
        }
    }
}

// ================================
// INITIALIZE APP - Optimized for performance
// ================================
const initApp = () => new PortfolioApp();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp, { once: true, passive: true });
} else {
    initApp();
}

// Export for potential module usage
export default PortfolioApp;
