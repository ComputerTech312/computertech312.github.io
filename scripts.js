document.addEventListener('DOMContentLoaded', (event) => {
    const body = document.body;
    const DARK_THEME = 'dark';
    const LIGHT_THEME = 'light';
    const TYPING_SPEED = 150;
    const DELETING_SPEED = 50;
    const WAIT_BEFORE_DELETE = 1500;
    const WAIT_BEFORE_TYPE = 1500;
    const CURSOR_BLINK_SPEED = 500;
    
    function setTheme(theme) {
        body.classList.toggle(DARK_THEME, theme === DARK_THEME);
        localStorage.setItem('theme', theme);
    }

    function prefersDarkScheme() {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    setTheme(prefersDarkScheme() ? DARK_THEME : LIGHT_THEME);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        setTheme(e.matches ? DARK_THEME : LIGHT_THEME);
    });

    const typedText = document.getElementById("typedText");
    const cursor = document.getElementById("cursor");
    const words = ["I'm a full stack developer.", "I'm a programmer.", "I'm a sysadmin.", "I founded/manage multiple communities."]; 
    let wordIndex = 0;
    let letterIndex = 0;

    function typeLetter() {
        const word = words[wordIndex];
        typedText.textContent += word[letterIndex];
        letterIndex++;
        if (letterIndex === word.length) {
            setTimeout(deleteLetter, WAIT_BEFORE_DELETE);
            return;
        }
        setTimeout(typeLetter, TYPING_SPEED);
    }

    function deleteLetter() {
        const word = words[wordIndex];
        typedText.textContent = word.slice(0, letterIndex - 1);
        letterIndex--;
        if (letterIndex === 0) {
            setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                typeLetter();
            }, WAIT_BEFORE_TYPE);
            return;
        }
        setTimeout(deleteLetter, DELETING_SPEED);
    }

    typeLetter();

    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
    }, CURSOR_BLINK_SPEED);

    const languageColors = {
        'Python': 'blue',
        'JavaScript': '',
        'HTML': 'green',
        'CSS': 'yellow',
        'Java': 'yellow',
    };

    const defaultColors = ['grey', 'silver', 'brown', 'pink', 'magenta'];

    const username = 'computertech312';
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const languageData = {};

            data.forEach((repo) => {
                const { language } = repo;
                if (language) {
                    languageData[language] = (languageData[language] || 0) + 1;
                }
            });

            const ctx = document.getElementById('languageChart').getContext('2d');
            const backgroundColors = [];
            let defaultColorIndex = 0;

            Object.keys(languageData).forEach(language => {
                if (languageColors[language]) {
                    backgroundColors.push(languageColors[language]);
                } else {
                    backgroundColors.push(defaultColors[defaultColorIndex]);
                    defaultColorIndex = (defaultColorIndex + 1) % defaultColors.length;
                }
            });

            const chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: Object.keys(languageData),
                    datasets: [
                        {
                            label: 'Top Used Languages',
                            data: Object.values(languageData),
                            backgroundColor: backgroundColors,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                },
            });
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            // Add user-friendly error handling here
        });
});