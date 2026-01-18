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
    const GOOGLE_FORM_URL = 'https://script.google.com/macros/s/AKfycbwxnqvCut98VKjptAnHq_hl38M5P9bqpsoCN0wL1_tMs-sfQrh_b744sUHldtgZoe8/exec';

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.btn-submit');
            const originalBtnText = submitBtn.textContent;

            // Prevent double submission
            submitBtn.disabled = true;
            submitBtn.textContent = '送信中...';

            const formData = new FormData(form);
            // Convert FormData to URLSearchParams for fetch
            const params = new URLSearchParams();
            for (const pair of formData.entries()) {
                params.append(pair[0], pair[1]);
            }

            try {
                // To avoid CORS issues with simple redirects, we use no-cors or rely on the GAS return JSON.
                // However, GAS with 'no-cors' mode is tricky for error handling. 
                // Standard approach: POST with redirect following is standard for fetch, but CORS often blocks reading response.
                // We'll try posting. IF CORS blocks, it might still succeed on backend.
                // Often standard text/plain or application/x-www-form-urlencoded is easiest for GAS doPost.

                await fetch(GOOGLE_FORM_URL, {
                    method: 'POST',
                    body: params,
                    mode: 'no-cors', // Important for GAS to avoid CORS errors in console, though we can't read response
                });

                // Since we use no-cors, we assume success if no network error thrown.
                alert('お申し込みありがとうございます！\n自動返信メールを送信しました。');
                form.reset();

            } catch (error) {
                console.error('Error:', error);
                alert('送信に失敗しました。時間をおいて再度お試しください。');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
});
