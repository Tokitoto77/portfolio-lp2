document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Weekday display logic
    const dateInputs = document.querySelectorAll('.date-input');
    const weekdays = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)'];

    dateInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const dateValue = new Date(e.target.value);
            const displaySpan = e.target.nextElementSibling;

            if (!isNaN(dateValue.getTime())) {
                const dayOfWeek = weekdays[dateValue.getDay()];
                displaySpan.textContent = dayOfWeek;
            } else {
                displaySpan.textContent = '';
            }
        });
    });
});
