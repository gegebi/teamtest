document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const lottoNumbersContainer = document.getElementById('lotto-numbers');
    const themeSwitch = document.getElementById('checkbox');

    // Theme switcher logic
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeSwitch.checked = true;
            // Set the body class for dark mode
            document.body.classList.add('dark-mode');
        }
    } else {
        // Default to light theme
        document.documentElement.setAttribute('data-theme', 'light');
    }

    themeSwitch.addEventListener('change', function(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            document.body.classList.add('dark-mode');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            document.body.classList.remove('dark-mode');
        }
    });

    // Lotto number generation
    generateBtn.addEventListener('click', generateLottoNumbers);

    function generateLottoNumbers() {
        lottoNumbersContainer.innerHTML = ''; // Clear previous numbers
        for (let i = 0; i < 6; i++) {
            const placeholder = document.createElement('div');
            placeholder.classList.add('number-placeholder');
            lottoNumbersContainer.appendChild(placeholder);
        }

        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }

        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

        const numberElements = lottoNumbersContainer.querySelectorAll('.number-placeholder');

        sortedNumbers.forEach((number, index) => {
            setTimeout(() => {
                const numberElement = numberElements[index];
                numberElement.textContent = number;
                numberElement.classList.remove('number-placeholder');
                numberElement.classList.add('number');
                numberElement.style.backgroundColor = getNumberColor(number);
            }, index * 200);
        });
    }

    function getNumberColor(number) {
        if (number <= 10) return '#f4c22b'; // Yellow
        if (number <= 20) return '#3498db'; // Blue
        if (number <= 30) return '#e74c3c'; // Red
        if (number <= 40) return '#2ecc71'; // Green
        return '#9b59b6'; // Purple
    }

    // Set initial theme
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (!localStorage.getItem('theme') && userPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
        document.body.classList.add('dark-mode');
    }
});