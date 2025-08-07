// Mobile-optimized JavaScript with scroll-friendly menu handling

// Mobile menu functionality with body scroll management (Safari-compatible)
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    const isVisible = mobileMenu.classList.contains('show');
    
    if (isVisible) {
        mobileMenu.classList.remove('show');
        body.style.overflow = 'auto'; // Restore scrolling
        body.style.position = 'static'; // Safari fix
    } else {
        mobileMenu.classList.add('show');
        body.style.overflow = 'hidden'; // Prevent background scrolling
        body.style.position = 'fixed'; // Safari fix
        body.style.width = '100%'; // Safari fix
    }
}

// Close mobile menu when clicking on a link (Safari-compatible)
function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;
    
    mobileMenu.classList.remove('show');
    body.style.overflow = 'auto';
    body.style.position = 'static';
    body.style.width = 'auto';
}

document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to mobile links
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
        // Safari-specific touch handling
        link.addEventListener('touchstart', function() {});
    });
});

// Close mobile menu when clicking outside (Safari-compatible)
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && mobileMenu.classList.contains('show') && 
        !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Safari-specific touch event for backdrop
document.addEventListener('touchstart', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && mobileMenu.classList.contains('show') && 
        !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
    }
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
