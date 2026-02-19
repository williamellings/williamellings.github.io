document.addEventListener('DOMContentLoaded', () => {
    
    // --- TERMINAL TOGGLE ---
    const toggleBtn = document.getElementById('terminal-toggle');
    const body = document.body;

    toggleBtn.addEventListener('click', () => {
        body.classList.toggle('terminal-mode');
        
        if (body.classList.contains('terminal-mode')) {
            toggleBtn.innerText = 'Type: ModernUI';
            console.log("> System scan complete. Root access granted.");
        } else {
            toggleBtn.innerText = 'Type: Terminal';
        }
    });

    // --- SCROLL REVEAL ANIMATION ---
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    // Lägg till en enkel animation på korten
    document.querySelectorAll('.skill-card, .project-card').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });
});

// Callback för observer för att faktiskt visa elementen
const style = document.createElement('style');
style.innerHTML = `
    .reveal-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

