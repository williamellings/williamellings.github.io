document.addEventListener('DOMContentLoaded', () => {
    
    // --- TERMINAL TOGGLE ---
    const toggleBtn = document.getElementById('terminal-toggle');
    const body = document.body;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('terminal-mode');
            
            if (body.classList.contains('terminal-mode')) {
                toggleBtn.innerText = '_Exit_Terminal';
                console.log("> System scan complete. Root access granted.");
            } else {
                toggleBtn.innerText = '_Run_Terminal';
            }
        });
    }

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

    document.querySelectorAll('.skill-card, .project-card, .roadmap-item').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });

    // --- COPY EMAIL LOGIC ---
    const copyBtn = document.querySelector('.copy-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copyEmail);
    }
});

// --- DYNAMIC STYLES FOR REVEAL ---
const style = document.createElement('style');
style.innerHTML = `
    .reveal-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// --- HELPER FUNCTIONS ---
function copyEmail() {
    const emailTextElement = document.getElementById('email-text');
    if (!emailTextElement) return;

    const email = emailTextElement.innerText;
    
    // Modern approach (requires HTTPS)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => showToast());
    } else {
        // Fallback for older browsers or local development
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed"; 
        textArea.style.opacity = "0"; // Ensures it's invisible
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showToast();
        } catch (err) {
            console.error('System Error: Could not copy text.', err);
        }
        document.body.removeChild(textArea);
    }
}

function showToast() {
    const toast = document.getElementById('copy-toast');
    if (toast) {
        toast.style.display = 'block';
        setTimeout(() => { toast.style.display = 'none'; }, 2000);
    }
}