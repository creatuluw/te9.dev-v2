const siteContent = {
    gettingStarted: {
        title: "Getting Started",
        depth: "0-50m",
        items: [
            { text: "Install LLMNGN: npx degit hoipippeloi/llmngn.xyz/.opencode .opencode", section: "getting-started" },
            { text: "Verify installation: llmngn stats", section: "getting-started" },
            { text: "Store first decision: llmngn add \"text\" --type decision", section: "getting-started" },
            { text: "Use interactive command: /llmngn store that we decided to use Redis", section: "getting-started" }
        ]
    },
    howTo: {
        title: "How-To Guides",
        depth: "50-250m",
        items: [
            { text: "Store decisions with type and metadata", section: "how-to" },
            { text: "Search context semantically with llmngn query", section: "how-to" },
            { text: "Export data for backup: llmngn export --output file.json", section: "how-to" },
            { text: "Delete records: llmngn delete <id> --force", section: "how-to" },
            { text: "CLI commands: init, add, list, get, query, delete, clean, stats, export, import, purge", section: "how-to" }
        ]
    },
    faq: {
        title: "FAQ",
        depth: "250-400m",
        items: [
            { text: "Data stored locally in .lancedb folder", section: "faq" },
            { text: "Auto-redacts API keys, passwords, tokens", section: "faq" },
            { text: "Context retention: architecture 365d, decisions 180d, file changes 90d", section: "faq" },
            { text: "Works offline after installation", section: "faq" },
            { text: "Share with team via export/import", section: "faq" },
            { text: "Free and open source MIT license", section: "faq" }
        ]
    },
    tutorials: {
        title: "Tutorials",
        depth: "400m+",
        items: [
            { text: "First Workflow: Install, store, search, backup in 10 minutes", section: "tutorials" },
            { text: "Team Collaboration: Export, share, import team context", section: "tutorials" }
        ]
    }
};

let currentDepth = 0;
const maxDepth = 500;

function init() {
    initDepthIndicator();
    initExcavation();
    initCoreDrills();
    initSonarSearch();
    initScrollCompression();
    initCollisionZones();
}

function initDepthIndicator() {
    const depthFill = document.querySelector('.depth-fill');
    const depthValue = document.querySelector('.depth-value');
    
    if (!depthFill || !depthValue) return;
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = window.scrollY / scrollHeight;
        currentDepth = Math.floor(scrollPercent * maxDepth);
        
        depthFill.style.height = `${scrollPercent * 100}%`;
        depthValue.textContent = `${currentDepth}m`;
    });
}

function initExcavation() {
    const buriedElements = document.querySelectorAll('.buried');
    
    buriedElements.forEach(el => {
        el.addEventListener('click', () => {
            el.classList.toggle('excavated');
            
            if (el.classList.contains('excavated')) {
                triggerExcavationEffect(el);
            }
        });
        
        el.addEventListener('mouseenter', () => {
            if (!el.classList.contains('excavated')) {
                el.style.opacity = '1';
            }
        });
        
        el.addEventListener('mouseleave', () => {
            if (!el.classList.contains('excavated')) {
                const depth = el.dataset.depth;
                el.style.opacity = depth ? 1 - (depth * 0.03) : '0.7';
            }
        });
    });
}

function triggerExcavationEffect(element) {
    const rect = element.getBoundingClientRect();
    const particles = 8;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'excavation-particle';
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            width: 4px;
            height: 4px;
            background: #D4C4A8;
            pointer-events: none;
            z-index: 9999;
            opacity: 1;
            transition: all 0.5s ease-out;
        `;
        
        document.body.appendChild(particle);
        
        requestAnimationFrame(() => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
            particle.style.opacity = '0';
        });
        
        setTimeout(() => particle.remove(), 500);
    }
}

function initCoreDrills() {
    const drills = document.querySelectorAll('.core-drill');
    
    drills.forEach(drill => {
        drill.addEventListener('click', () => {
            const target = drill.dataset.target;
            const targetElement = document.getElementById(target);
            
            if (targetElement) {
                const drillAnimation = document.createElement('div');
                drillAnimation.className = 'drill-animation';
                drillAnimation.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(26, 26, 46, 0.9);
                    z-index: 10000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                drillAnimation.innerHTML = `
                    <div style="text-align: center;">
                        <div style="font-family: 'Courier New', monospace; font-size: 14px; color: #FF4500; letter-spacing: 0.3em;">DRILLING TO ${target.toUpperCase().replace('-', ' ')}</div>
                        <div style="width: 200px; height: 4px; background: #2D1B0E; margin: 20px auto; overflow: hidden;">
                            <div style="width: 0%; height: 100%; background: #FF4500; animation: drillProgress 0.8s ease forwards;"></div>
                        </div>
                        <style>
                            @keyframes drillProgress {
                                to { width: 100%; }
                            }
                        </style>
                    </div>
                `;
                
                document.body.appendChild(drillAnimation);
                
                requestAnimationFrame(() => {
                    drillAnimation.style.opacity = '1';
                });
                
                setTimeout(() => {
                    drillAnimation.style.opacity = '0';
                    setTimeout(() => {
                        drillAnimation.remove();
                        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300);
                }, 800);
            }
        });
    });
}

function initSonarSearch() {
    const searchInput = document.querySelector('.sonar-input');
    const searchResults = document.querySelector('.sonar-results');
    
    if (!searchInput || !searchResults) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }
        
        searchTimeout = setTimeout(() => {
            const results = performSonarSearch(query);
            displaySonarResults(results, searchResults);
        }, 200);
    });
    
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length >= 2) {
            searchResults.classList.add('active');
        }
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.sonar-search')) {
            searchResults.classList.remove('active');
        }
    });
}

function performSonarSearch(query) {
    const results = [];
    
    Object.entries(siteContent).forEach(([section, data]) => {
        data.items.forEach(item => {
            if (item.text.toLowerCase().includes(query)) {
                results.push({
                    text: item.text,
                    section: item.section,
                    depth: data.depth,
                    title: data.title
                });
            }
        });
    });
    
    document.querySelectorAll('h2, h3, h4, p, code, span.cmd').forEach(el => {
        const text = el.textContent.toLowerCase();
        if (text.includes(query) && text.length < 200) {
            const section = el.closest('section');
            const sectionId = section ? section.id : '';
            
            if (!results.find(r => r.text === el.textContent)) {
                results.push({
                    text: el.textContent.substring(0, 100),
                    section: sectionId,
                    depth: 'dynamic',
                    title: sectionId ? sectionId.replace('-', ' ') : 'content'
                });
            }
        }
    });
    
    return results.slice(0, 10);
}

function displaySonarResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<div class="sonar-result">NO ECHOES DETECTED</div>';
        container.classList.add('active');
        return;
    }
    
    container.innerHTML = results.map(result => `
        <div class="sonar-result" data-section="${result.section}">
            <div>${result.text}</div>
            <div class="sonar-result-depth">DEPTH: ${result.depth} | ${result.title.toUpperCase()}</div>
        </div>
    `).join('');
    
    container.classList.add('active');
    
    container.querySelectorAll('.sonar-result').forEach(resultEl => {
        resultEl.addEventListener('click', () => {
            const section = resultEl.dataset.section;
            const targetEl = document.getElementById(section);
            
            if (targetEl) {
                container.classList.remove('active');
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

function initScrollCompression() {
    const strata = document.querySelectorAll('.stratum');
    
    window.addEventListener('scroll', () => {
        strata.forEach(stratum => {
            const rect = stratum.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            if (rect.top < viewportHeight && rect.bottom > 0) {
                const scrollProgress = 1 - (rect.top / viewportHeight);
                const compression = Math.min(0.85, 0.7 + scrollProgress * 0.3);
                
                stratum.querySelectorAll('.fold-content, .bed-content, .crystal-interior').forEach(content => {
                    content.style.transform = `scaleX(${compression})`;
                    content.style.transformOrigin = 'left center';
                });
            }
        });
    });
}

function initCollisionZones() {
    const faultLines = document.querySelectorAll('.fault-line');
    
    faultLines.forEach(fault => {
        let vibrationInterval;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    vibrationInterval = setInterval(() => {
                        const offsetX = (Math.random() - 0.5) * 2;
                        const offsetY = (Math.random() - 0.5) * 2;
                        fault.style.transform = `skewY(5deg) translate(${offsetX}px, ${offsetY}px)`;
                    }, 50);
                } else {
                    clearInterval(vibrationInterval);
                    fault.style.transform = 'skewY(5deg)';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(fault);
    });
}

document.addEventListener('copy', (e) => {
    const selection = window.getSelection();
    if (selection.toString()) {
        const extractionNotice = document.createElement('div');
        extractionNotice.className = 'extraction-notice';
        extractionNotice.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(26, 26, 46, 0.95);
            border: 2px solid #FF4500;
            padding: 20px 40px;
            font-family: 'Courier New', monospace;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 0.3em;
            color: #D4C4A8;
            z-index: 10001;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        extractionNotice.textContent = 'SAMPLE EXTRACTED';
        
        document.body.appendChild(extractionNotice);
        
        requestAnimationFrame(() => {
            extractionNotice.style.opacity = '1';
        });
        
        setTimeout(() => {
            extractionNotice.style.opacity = '0';
            setTimeout(() => extractionNotice.remove(), 300);
        }, 1000);
    }
});

const style = document.createElement('style');
style.textContent = `
    .excavation-particle {
        position: fixed;
        pointer-events: none;
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', init);

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    init();
}
