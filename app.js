// Application data
const appData = {
    memories: [
        {
            title: "First Meeting",
            date: "july 14, 2024",
            description: "The day our eyes first met and time stood still. I knew from that moment you were someone special.",
            icon: "💕"
        },
        {
            title: "First Date",
            date: "July 25, 2024", 
            description: "Coffee turned into hours of conversation. Your laugh became my favorite sound in the world.",
            icon: "☕"
        },
        {
            title: "First Kiss", 
            date: "July 25, 2024",
            description: "Under the stars, with your hand in mine, everything felt perfect. That moment is etched in my heart forever.",
            icon: "💋"
        },
        {
            title: "Our Adventure",
            date: "Future",
            description: "Exploring the mountains together, sharing dreams, and realizing I want to explore life with you.",
            icon: "⛰️"
        },
        {
            title: "Moving In",
            date: "Future", 
            description: "Making our first home together. Every morning waking up next to you feels like a blessing.",
            icon: "🏠"
        },
        {
            title: "This Moment",
            date: "Today",
            description: "Right here, right now, asking you to be my forever. Will you marry me?",
            icon: "💍"
        }
    ],
    quotes: [
        {
            text: "In you, I've found the love of my life and my closest, truest friend.",
            author: "My Heart"
        },
        {
            text: "Every love story is beautiful, but ours is my favorite.",
            author: "Our Journey"
        },
        {
            text: "You are my today and all of my tomorrows.",
            author: "Forever Yours"
        },
        {
            text: "I love you not only for what you are, but for what I am when I am with you.",
            author: "Elizabeth Barrett Browning"
        },
        {
            text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
            author: "Lao Tzu"
        }
    ],
    photos: [
        { alt: "Our first photo together", category: "memories" },
        { alt: "Dancing together", category: "fun" },
        { alt: "Sunset walk on the beach", category: "romantic" },
        { alt: "Cooking together", category: "everyday" },
        { alt: "Travel adventure", category: "adventures" },
        { alt: "Cozy movie night", category: "everyday" }
    ]
};

// Global variables
let particleSystem;
let confettiSystem;
let currentQuoteIndex = 0;
let quoteInterval;

// DOM Elements
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebrationOverlay = document.getElementById('celebrationOverlay');
const clickSound = document.getElementById('clickSound');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initCustomCursor();
    initParticleSystem();
    initButtonEvents();
    populateTimeline();
    populateQuotes();
    populateGallery();
    initScrollAnimations();
    initQuotesCarousel();
    initGalleryFilters();
    playClickSound();
});

// Custom Cursor
function initCustomCursor() {
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('button, a, .gallery-item, .timeline-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.8)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
}

// Particle System
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.hearts = ['💕', '💖', '💝', '💗', '💘', '⭐', '✨', '🌟'];
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        for (let i = 0; i < 50; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 20 + 10,
            symbol: this.hearts[Math.floor(Math.random() * this.hearts.length)],
            opacity: Math.random() * 0.5 + 0.3,
            rotation: Math.random() * 360
        };
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.rotation += 1;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.font = `${particle.size}px Arial`;
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation * Math.PI / 180);
            this.ctx.fillText(particle.symbol, 0, 0);
            this.ctx.restore();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

function initParticleSystem() {
    const canvas = document.getElementById('particleCanvas');
    particleSystem = new ParticleSystem(canvas);
}

// Confetti System
class ConfettiSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.confetti = [];
        this.colors = ['#ff6b9d', '#c44569', '#ffecd2', '#fcb69f', '#ff9a9e'];
        
        this.resize();
        this.init();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        for (let i = 0; i < 150; i++) {
            this.confetti.push(this.createConfetti());
        }
    }
    
    createConfetti() {
        return {
            x: Math.random() * this.canvas.width,
            y: -10,
            vx: (Math.random() - 0.5) * 6,
            vy: Math.random() * 3 + 2,
            size: Math.random() * 8 + 4,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 10
        };
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.confetti = this.confetti.filter(piece => {
            // Update position
            piece.x += piece.vx;
            piece.y += piece.vy;
            piece.rotation += piece.rotationSpeed;
            piece.vy += 0.1; // gravity
            
            // Draw confetti
            this.ctx.save();
            this.ctx.translate(piece.x, piece.y);
            this.ctx.rotate(piece.rotation * Math.PI / 180);
            this.ctx.fillStyle = piece.color;
            this.ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            this.ctx.restore();
            
            return piece.y < this.canvas.height + 10;
        });
        
        if (this.confetti.length > 0) {
            requestAnimationFrame(() => this.animate());
        }
    }
    
    start() {
        this.init();
        this.animate();
    }
}

// Button Events
function initButtonEvents() {
    yesBtn.addEventListener('click', () => {
        playClickSound();
        triggerCelebration();
    });
    
    noBtn.addEventListener('click', () => {
        playClickSound();
        // Just for fun - make it run away more
        noBtn.style.transform = 'translateX(-100px) scale(0.8)';
        setTimeout(() => {
            noBtn.style.transform = '';
        }, 1000);
    });
}

function triggerCelebration() {
    celebrationOverlay.classList.add('active');
    
    // Initialize confetti
    const confettiCanvas = document.getElementById('confettiCanvas');
    confettiSystem = new ConfettiSystem(confettiCanvas);
    confettiSystem.start();
    
    // Type celebration text
    const title = document.getElementById('celebrationTitle');
    const text = "She said YES! 🎉";
    title.textContent = '';
    
    let i = 0;
    const typeInterval = setInterval(() => {
        title.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(typeInterval);
        }
    }, 100);
    
    // Hide celebration after 5 seconds
    setTimeout(() => {
        celebrationOverlay.classList.remove('active');
        // Smooth scroll to timeline
        document.getElementById('timeline').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }, 5000);
}

// Timeline
function populateTimeline() {
    const container = document.getElementById('timelineItems');
    
    appData.memories.forEach((memory, index) => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-icon">${memory.icon}</div>
            <div class="timeline-date">${memory.date}</div>
            <h3 class="timeline-title">${memory.title}</h3>
            <p class="timeline-description">${memory.description}</p>
        `;
        container.appendChild(item);
    });
}

// Quotes Carousel
function populateQuotes() {
    const container = document.getElementById('quoteContainer');
    
    appData.quotes.forEach((quote, index) => {
        const item = document.createElement('div');
        item.className = `quote-item ${index === 0 ? 'active' : ''}`;
        item.innerHTML = `
            <blockquote class="quote-text">"${quote.text}"</blockquote>
            <cite class="quote-author">— ${quote.author}</cite>
        `;
        container.appendChild(item);
    });
}

function initQuotesCarousel() {
    const quotes = document.querySelectorAll('.quote-item');
    const dots = document.querySelectorAll('.nav-dot');
    
    function showQuote(index) {
        quotes.forEach(quote => quote.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        quotes[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentQuoteIndex = index;
    }
    
    // Auto-play
    quoteInterval = setInterval(() => {
        const nextIndex = (currentQuoteIndex + 1) % quotes.length;
        showQuote(nextIndex);
    }, 4000);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(quoteInterval);
            showQuote(index);
            // Restart auto-play
            quoteInterval = setInterval(() => {
                const nextIndex = (currentQuoteIndex + 1) % quotes.length;
                showQuote(nextIndex);
            }, 4000);
        });
    });
}

// Photo Gallery
function populateGallery() {
    const container = document.getElementById('galleryGrid');
    
    appData.photos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.category = photo.category;
        item.innerHTML = `
            <div class="gallery-content">
                <span class="gallery-emoji">📷</span>
                <p class="gallery-alt">${photo.alt}</p>
            </div>
        `;
        
        item.addEventListener('click', () => {
            playClickSound();
            // Create lightbox effect
            showLightbox(photo.alt);
        });
        
        container.appendChild(item);
    });
}

function showLightbox(alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <div class="lightbox-image">
                <span style="font-size: 10rem;">📷</span>
                <p style="margin-top: 2rem; color: white; font-size: 1.5rem;">${alt}</p>
            </div>
        </div>
    `;
    
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        z-index: 2000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    `;
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -50px;
        right: 0;
        color: white;
        font-size: 3rem;
        cursor: pointer;
        background: none;
        border: none;
    `;
    
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });
    
    document.body.appendChild(lightbox);
}

function initGalleryFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            playClickSound();
            
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Filter items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'flex';
                    item.style.animation = 'slideInUp 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Timeline progress
    const progressBar = document.getElementById('progressBar');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Intersection Observer for timeline items
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Update progress bar
                const items = Array.from(timelineItems);
                const visibleItems = items.filter(item => item.classList.contains('visible'));
                const progress = (visibleItems.length / items.length) * 100;
                progressBar.style.width = `${progress}%`;
            }
        });
    }, { threshold: 0.3 });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // General scroll animations
    const animatedElements = document.querySelectorAll('.section-title, .glass-panel');
    const generalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        generalObserver.observe(el);
    });
}

// Sound Effects
function playClickSound() {
    try {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {
            // Ignore if sound can't play
        });
    } catch (e) {
        // Ignore sound errors
    }
}

// Share functionality
document.getElementById('shareBtn').addEventListener('click', () => {
    playClickSound();
    
    if (navigator.share) {
        navigator.share({
            title: 'Our Love Story 💕',
            text: 'She said YES! 💍',
            url: window.location.href
        });
    } else {
        // Fallback - copy to clipboard
        navigator.clipboard.writeText(window.location.href).then(() => {
            showNotification('Link copied to clipboard! 💕');
        });
    }
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #ff6b9d, #c44569);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(255, 107, 157, 0.4);
        z-index: 1000;
        animation: slideInRight 0.5s ease, fadeOut 0.5s ease 2.5s forwards;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentNode) {
            document.body.removeChild(notification);
        }
    }, 3000);
}

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .gallery-content {
        text-align: center;
    }
    
    .gallery-emoji {
        font-size: 4rem;
        display: block;
        margin-bottom: 1rem;
    }
    
    .gallery-alt {
        color: rgba(255, 255, 255, 0.9);
        font-size: 0.9rem;
        margin: 0;
    }
`;
document.head.appendChild(style);

// Smooth scrolling for navigation
function smoothScrollTo(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        if (document.activeElement === yesBtn) {
            triggerCelebration();
        }
    }
    
    if (e.key === 'Escape') {
        const lightbox = document.querySelector('.lightbox');
        if (lightbox) {
            document.body.removeChild(lightbox);
        }
    }
});

// Reduce motion for accessibility
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable complex animations
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

// Initialize everything when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

function initApp() {
    // All initialization is already handled by the individual init functions
    console.log('💕 Romantic Proposal Website Loaded! 💕');
}