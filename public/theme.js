document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

    toggle.checked = localStorage.getItem('theme') === 'dark';

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    });

    if (prefersDarkScheme.matches && !localStorage.getItem('theme')) {
        document.documentElement.classList.add('dark');
    } else if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.classList.add('dark');
    }
});