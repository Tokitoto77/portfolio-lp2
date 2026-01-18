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
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.btn-submit');
            const originalBtnText = submitBtn.textContent;

            // Prevent double submission
            submitBtn.disabled = true;
            submitBtn.textContent = '送信中...';

            const formData = new FormData(form);

            // Use XHR (XMLHttpRequest) instead of fetch for better GAS compatibility
            const xhr = new XMLHttpRequest();
            xhr.open('POST', GOOGLE_FORM_URL, true);

            // Handle response
            xhr.onload = function () {
                // Determine success based on status or assumption (since CORS might hide status)
                // However, GAS redirects often cause status 0 or 200 via redirect.
                alert('お申し込みありがとうございます！\n自動返信メールを送信しました。\n担当者より折り返しご連絡いたします。');
                form.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            };

            xhr.onerror = function () {
                // Network error
                console.error('XHR Error');
                alert('送信に問題が発生した可能性がありますが、完了している場合があります。\n自動返信メールをご確認ください。');
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            };

            // Send data
            xhr.send(formData);
        });
    }
});
