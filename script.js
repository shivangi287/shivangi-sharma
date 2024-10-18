document.addEventListener('DOMContentLoaded', function() {
    const phrases = ["Web Developer", "Designer"];
    let currentPhraseIndex = 0;
    const typewriterElement = document.getElementById('typewriter');

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function typePhrase(phrase) {
        for (let i = 0; i < phrase.length; i++) {
            typewriterElement.textContent += phrase[i];
            await sleep(100);
        }
        await sleep(1000);
    }

    async function erasePhrase() {
        while (typewriterElement.textContent.length > 0) {
            typewriterElement.textContent = typewriterElement.textContent.slice(0, -1);
            await sleep(50);
        }
        await sleep(500);
    }

    async function typewriterAnimation() {
        while (true) {
            await typePhrase(phrases[currentPhraseIndex]);
            await erasePhrase();
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        }
    }

    if (typewriterElement) {
        typewriterAnimation();
    } else {
        console.error("Typewriter element not found");
    }

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeToggleIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = htmlElement.getAttribute('data-theme');
        let newTheme = theme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeToggleIcon(newTheme);
    });

    function updateThemeToggleIcon(theme) {
        themeToggle.innerHTML = theme === 'light' 
            ? '<i class="fas fa-moon"></i>' 
            : '<i class="fas fa-sun"></i>';
    }
});