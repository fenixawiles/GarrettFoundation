// Mobile-optimized JavaScript with cross-browser menu handling

// Global variables for menu state
let mobileMenuOpen = false;
let menuInteractionLocked = false;

// Mobile menu functionality (works on all browsers)
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    console.log('Toggle menu clicked, current state:', mobileMenuOpen);
    
    if (mobileMenuOpen) {
        // Close menu
        mobileMenu.classList.remove('show');
        body.style.overflow = 'auto';
        body.style.position = 'static';
        body.style.width = 'auto';
        mobileMenuOpen = false;
        console.log('Menu closed');
    } else {
        // Open menu
        mobileMenu.classList.add('show');
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.width = '100%';
        mobileMenuOpen = true;
        console.log('Menu opened');
    }
}

// Close mobile menu
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    console.log('Closing menu');
    
    mobileMenu.classList.remove('show');
    body.style.overflow = 'auto';
    body.style.position = 'static';
    body.style.width = 'auto';
    mobileMenuOpen = false;
}

// Initialize mobile menu functionality when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing menu');
    
    // Add click handler to hamburger button
    const menuBtn = document.querySelector('.mobile-menu-btn');
    if (menuBtn) {
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Menu button clicked');
            toggleMobileMenu();
        });
        console.log('Menu button handler attached');
    } else {
        console.log('Menu button not found');
    }
    
    // Add click handler to close button
    const closeBtn = document.querySelector('.mobile-menu-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked');
            closeMobileMenu();
        });
        // Safari touch fix
        closeBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            console.log('Close button touched');
            closeMobileMenu();
        });
        console.log('Close button handler attached');
    } else {
        console.log('Close button not found');
    }
    
    // Add click handlers to mobile links
    const mobileLinks = document.querySelectorAll('.mobile-link');
    console.log('Found mobile links:', mobileLinks.length);
    
    mobileLinks.forEach((link, index) => {
        link.addEventListener('click', function(e) {
            console.log('Mobile link clicked:', index, 'href:', link.href);
            // Close menu but DON'T prevent default navigation
            closeMobileMenu();
            // Let the browser handle the navigation naturally
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileMenuOpen && mobileMenu && menuBtn) {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                console.log('Clicked outside menu, closing');
                closeMobileMenu();
            }
        }
    });
    
    // Safari-specific touch handling for backdrop
    document.addEventListener('touchend', function(e) {
        const mobileMenu = document.getElementById('mobileMenu');
        const menuBtn = document.querySelector('.mobile-menu-btn');
        
        if (mobileMenuOpen && mobileMenu && menuBtn) {
            if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
                console.log('Touched outside menu, closing');
                closeMobileMenu();
            }
        }
    });
});

// Smooth scrolling for anchor links (mobile-optimized)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Throttled scroll handler for navbar (mobile-optimized)
let ticking = false;

function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.85)';
    }
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
    }
}, { passive: true }); // Passive listener for better scroll performance

// Add active state to navigation based on current page
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// Mobile-optimized viewport height fix
function initMobileOptimizations() {
    // Fix viewport height issues on mobile
    const updateViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight, { passive: true });
    window.addEventListener('orientationchange', () => {
        setTimeout(updateViewportHeight, 100);
    });
    
    // Prevent zoom on iOS when focusing inputs
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            if (window.innerWidth < 768) {
                input.style.fontSize = '16px';
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileOptimizations();
    
    // Only animate stats on homepage to reduce potential scroll lag
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        // Simple stats animation without heavy intersection observer
        setTimeout(() => {
            const stats = document.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            });
        }, 500);
    }
});
