document.addEventListener('DOMContentLoaded', (event) => {
    const body = document.body;
    
    function toggleTheme() {
        body.classList.toggle('dark-theme');
        
        let theme = "light";
        if(body.classList.contains('dark-theme')) {
            theme = "dark";
        }
        localStorage.setItem('theme', theme);
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    if(savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    const themeToggle = document.getElementById("themeToggle");
    themeToggle.addEventListener("click", toggleTheme);

    const typedText = document.getElementById("typedText");
    const cursor = document.getElementById("cursor");
    const words = ["I'm a full stack developer.", "I'm a programmer.", "I'm a sysadmin.", "I own/manage multiple communities."]; 
    let wordIndex = 0;
    let letterIndex = 0;

    function typeLetter() {
        const word = words[wordIndex];
        typedText.textContent += word[letterIndex];
        letterIndex++;
        if (letterIndex === word.length) {
            setTimeout(deleteLetter, 1500);
            return;
        }
        setTimeout(typeLetter, 150);
    }

    function deleteLetter() {
        const word = words[wordIndex];
        typedText.textContent = word.slice(0, letterIndex - 1);
        letterIndex--;
        if (letterIndex === 0) {
            setTimeout(() => {
                wordIndex++;
                if (wordIndex === words.length) {
                    wordIndex = 0;
                }
                typeLetter();
            }, 1500);
            return;
        }
        setTimeout(deleteLetter, 50);
    }

    typeLetter();

    setInterval(() => {
        cursor.style.opacity = cursor.style.opacity === "0" ? "1" : "0";
    }, 500);

    const languageColors = {
        'Python': 'blue',
        'JavaScript': 'red',
        'HTML': 'green',
        'CSS': 'yellow',
		'Java': 'red',
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
        });
});
