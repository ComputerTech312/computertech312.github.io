const username = 'computertech312';
const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.github.com/users/${username}/repos`;

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
        const chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(languageData),
                datasets: [
                    {
                        label: 'Top Used Languages',
                        data: Object.values(languageData),
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                        ],
                    },
                ],
            },
        });
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
