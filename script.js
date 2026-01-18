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

    // Form Submission Logic
    const form = document.getElementById('contact-form');
    // ↓↓↓ここにGASのWebアプリURLを貼り付けてください↓↓↓
    const GOOGLE_FORM_URL = 'https://script.google.com/macros/s/AKfycbxE3HeMqZYWSRy40zwRMDwEDqWAxwViBtfT9c3dxPkWNCPxSV_WlPL8VMTWMCGeFH4/exec';

    if (form) {
        // Set form action and method for standard submission
        form.action = GOOGLE_FORM_URL;
        form.method = 'POST';

        form.addEventListener('submit', (e) => {
            // Do NOT preventDefault() - let the form submit naturally

            const submitBtn = form.querySelector('.btn-submit');
            submitBtn.disabled = true;
            submitBtn.textContent = '送信中...';

            // Alert user before redirection
            alert('送信を開始します。画面が切り替わるまでお待ちください。');
        });
    }
});
