document.addEventListener('DOMContentLoaded', () => {
    
    // --- TERMINAL TOGGLE ---
    const toggleBtn = document.getElementById('terminal-toggle');
    const terminalOverlay = document.getElementById('interactive-terminal');
    const cmdInput = document.getElementById('cmd-input');
    const terminalOutput = document.getElementById('terminal-output');

    // Open terminal when button is clicked
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            terminalOverlay.classList.remove('hidden');
            cmdInput.focus();
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        });
    }

    // Keep focus on the input if user clicks anywhere in the terminal
    if (terminalOverlay) {
        terminalOverlay.addEventListener('click', () => {
            cmdInput.focus();
        });
    }
    // Define the backend commands
    const commands = {
        'help': 'Available commands: about, skills, projects, contact, clear, exit',
        'about': 'William Ellingsworth.\nBackend-First Fullstack Engineer.\nFocused on Clean Architecture, .NET, and efficient data flows.',
        'skills': 'Backend: .NET (C#), EF Core, REST APIs\nCloud: AWS, Docker, Kubernetes\nDatabase: SQL Server, PostgreSQL, MongoDB',
        'projects': '1. TournamentsApi (C# / ASP.NET Core)\n2. AI Data Orchestrator (AWS Lambda)',
        'contact': 'Email: wille.ellings@hotmail.com\nLinkedIn: linkedin.com/in/william-ellingsworth-1abb59380\nGitHub: github.com/williamellings',

        // --- EASTER EGGS ---
        'whoami': 'You are a curious tech lead, recruiter, or fellow developer inspecting my code. Welcome!',
        'ping': 'Pong! Latency: 1ms. Backend optimization successful.',
        'make coffee': 'Error 418: I am a teapot. (But I do run on 100% caffeine)',
        'sudo rm -rf /': 'Permission denied. Nice try, but this system is secured by Clean Architecture.'
    };

    // Listen for the "Enter" key
    if (cmdInput) {
        cmdInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                const inputVal = this.value.trim().toLowerCase();
                this.value = ''; // clear input field

                // 1. Echo the command to the screen
                printToTerminal(`C:\\William\\Portfolio> ${inputVal}`);

                // 2. Process the command
                if (inputVal === 'clear') {
                    terminalOutput.innerHTML = '';
                } else if (inputVal === 'exit') {
                    terminalOverlay.classList.add('hidden');
                    document.body.style.overflow = 'auto'; // Restore background scrolling
                } else if (commands[inputVal]) {
                    printToTerminal(commands[inputVal]);
                } else if (inputVal !== '') {
                    printToTerminal(`'${inputVal}' is not recognized as an internal or external command.`);
                }

                // 3. Auto-scroll to the bottom
                terminalOverlay.scrollTop = terminalOverlay.scrollHeight;
            }
        });
    }

    function printToTerminal(text) {
        const lines = text.split('\n'); // Split by line breaks so it formats correctly
        lines.forEach(line => {
            const p = document.createElement('p');
            // Add a non-breaking space if the line is empty to keep spacing
            p.textContent = line === '' ? '\u00A0' : line;
            terminalOutput.appendChild(p);
        });
        // Add an extra blank line after output for readability
        terminalOutput.appendChild(document.createElement('br'));
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