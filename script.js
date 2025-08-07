// Mobile menu functionality with enhanced mobile support
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const isVisible = mobileMenu.style.display === 'flex';
    const body = document.body;
    
    if (isVisible) {
        mobileMenu.style.display = 'none';
        body.style.overflow = 'auto';
        body.style.position = 'static';
        body.style.width = 'auto';
    } else {
        mobileMenu.style.display = 'flex';
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.width = '100%';
    }
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        const mobileMenu = document.getElementById('mobileMenu');
        const body = document.body;
        
        mobileMenu.style.display = 'none';
        body.style.overflow = 'auto';
        body.style.position = 'static';
        body.style.width = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenu && !mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        const body = document.body;
        
        mobileMenu.style.display = 'none';
        body.style.overflow = 'auto';
        body.style.position = 'static';
        body.style.width = 'auto';
    }
});

// Smooth scrolling for anchor links
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

// Add scroll effect to navbar (throttled for performance)
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
});

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

// Animate stats on scroll
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/\d/g, '');
                
                let currentValue = 0;
                const increment = numericValue / 50;
                
                const counter = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(counter);
                    }
                    target.textContent = Math.floor(currentValue) + suffix;
                }, 40);
                
                observer.unobserve(target);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

// Safari-specific optimizations
function initSafariOptimizations() {
    // Fix Safari viewport height issues
    const updateViewportHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    updateViewportHeight();
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', () => {
        setTimeout(updateViewportHeight, 100);
    });
    
    // Note: Removed bounce scrolling prevention as it was blocking normal scrolling
    
    // Fix iOS Safari input focus issues
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            // Scroll to input after keyboard appears
            setTimeout(() => {
                input.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
    });
}


// Simplified touch handling for mobile devices
function initTouchHandling() {
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleGesture();
    }, { passive: true });
    
    function handleGesture() {
        const swipeThreshold = 100;
        const diff = touchStartY - touchEndY;
        
        // Close mobile menu on swipe up (only when menu is open)
        if (Math.abs(diff) > swipeThreshold && diff > 0) {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && mobileMenu.style.display === 'flex') {
                toggleMobileMenu();
            }
        }
    }
}

// Enhanced viewport optimization (without blocking scrolling)
function optimizeViewport() {
    // Optimize scroll performance only
    let ticking = false;
    const updateScrollEffects = () => {
        updateNavbar();
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }, { passive: true });
}

// Initialize animations when DOM is loaded (simplified for performance)
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Safari-specific optimizations
    initSafariOptimizations();
    
    // Initialize touch handling for mobile
    initTouchHandling();
    
    // Optimize viewport
    optimizeViewport();
    
    // Only animate stats on homepage to reduce scroll lag
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
        animateStats();
    }
});
