document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFractureReveal();
    initTerminalEffect();
});

function initNavigation() {
    const navPieces = document.querySelectorAll('.nav-piece');
    const fractures = document.querySelectorAll('.fracture');
    
    navPieces.forEach(piece => {
        piece.addEventListener('click', () => {
            const dest = piece.dataset.dest;
            const target = document.getElementById(dest);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        piece.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                piece.click();
            }
        });
        
        piece.setAttribute('tabindex', '0');
        piece.setAttribute('role', 'button');
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const activeNav = document.querySelector(`.nav-piece[data-dest="${entry.target.id}"]`);
            if (activeNav) {
                if (entry.isIntersecting) {
                    navPieces.forEach(p => p.classList.remove('active'));
                    activeNav.classList.add('active');
                }
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    fractures.forEach(fracture => observer.observe(fracture));
}

function initFractureReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const revealElements = document.querySelectorAll('.content-shard, .method-chunk, .instruction-piece, .cmd-node, .pattern-shard, .faq-piece, .dep-block');
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = el.classList.contains('content-shard') 
            ? `translateX(-20px) rotate(${getComputedStyle(el).getPropertyValue('--shard-angle')})`
            : 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    const revealedStyle = document.createElement('style');
    revealedStyle.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateX(0) translateY(0) rotate(0deg) !important;
        }
    `;
    document.head.appendChild(revealedStyle);
}

function initTerminalEffect() {
    const terminal = document.querySelector('.terminal-ui');
    if (!terminal) return;
    
    const lines = terminal.querySelectorAll('.output-line');
    const results = terminal.querySelector('.output-results');
    
    if (results) {
        results.style.opacity = '0';
        results.style.maxHeight = '0';
        results.style.overflow = 'hidden';
        results.style.transition = 'opacity 0.6s ease, max-height 0.6s ease';
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (results) {
                    setTimeout(() => {
                        results.style.opacity = '1';
                        results.style.maxHeight = '500px';
                    }, 800);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(terminal);
    
    const resultFragments = terminal.querySelectorAll('.result-fragment');
    resultFragments.forEach((fragment, index) => {
        fragment.style.opacity = '0';
        fragment.style.transform = 'translateX(-10px)';
        fragment.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            fragment.style.opacity = '1';
            fragment.style.transform = 'translateX(0)';
        }, 1200 + (index * 200));
    });
}

function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('.code-corroded, .cmd-example');
    
    codeBlocks.forEach(block => {
        const codeText = block.textContent.trim();
        if (!codeText) return;
        
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        block.parentNode.insertBefore(wrapper, block);
        wrapper.appendChild(block);
        
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'COPY';
        copyBtn.className = 'copy-btn';
        copyBtn.style.cssText = `
            position: absolute;
            top: 8px;
            right: 8px;
            font-size: 10px;
            letter-spacing: 1px;
            padding: 4px 8px;
            background: rgba(199, 91, 57, 0.2);
            border: 1px solid rgba(199, 91, 57, 0.3);
            color: var(--rust-orange);
            cursor: pointer;
            font-family: var(--font-mono);
            transition: all 0.2s ease;
        `;
        
        copyBtn.addEventListener('mouseenter', () => {
            copyBtn.style.background = 'rgba(199, 91, 57, 0.3)';
        });
        
        copyBtn.addEventListener('mouseleave', () => {
            copyBtn.style.background = 'rgba(199, 91, 57, 0.2)';
        });
        
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(codeText);
                copyBtn.textContent = 'COPIED';
                setTimeout(() => {
                    copyBtn.textContent = 'COPY';
                }, 2000);
            } catch (err) {
                copyBtn.textContent = 'FAILED';
                setTimeout(() => {
                    copyBtn.textContent = 'COPY';
                }, 2000);
            }
        });
        
        wrapper.appendChild(copyBtn);
    });
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!prefersReducedMotion.matches) {
    const glitchOverlay = document.querySelector('.glitch-overlay');
    
    if (glitchOverlay) {
        let glitchInterval;
        
        function triggerGlitch() {
            glitchOverlay.style.opacity = '0.04';
            glitchOverlay.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
            
            setTimeout(() => {
                glitchOverlay.style.opacity = '0.015';
                glitchOverlay.style.transform = 'translateX(0)';
            }, 50);
        }
        
        glitchInterval = setInterval(triggerGlitch, 5000 + Math.random() * 10000);
        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                clearInterval(glitchInterval);
            } else {
                glitchInterval = setInterval(triggerGlitch, 5000 + Math.random() * 10000);
            }
        });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
            });
        }
    });
});

const navStyles = document.createElement('style');
navStyles.textContent = `
    .nav-piece.active {
        color: var(--rust-orange);
    }
    .nav-piece.active::after {
        height: 80%;
    }
`;
document.head.appendChild(navStyles);