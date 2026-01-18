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
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.btn-submit');
            const originalBtnText = submitBtn.textContent;

            // Prevent double submission
            submitBtn.disabled = true;
            submitBtn.textContent = '送信中...';

            const formData = new FormData(form);

            // Convert to standard object for logging/debugging if needed
            // const dataObj = Object.fromEntries(formData.entries());

            try {
                // Use fetch with mode: 'no-cors' to avoid CORS preflight issues with GAS
                // IMPORTANT: With 'no-cors', we cannot read the response status or text.
                // We assume success if no network error occurs.

                await fetch(GOOGLE_FORM_URL, {
                    method: 'POST',
                    body: formData, // FormData matches naming expected by GAS e.parameter
                    mode: 'no-cors'
                });

                // Assume success
                alert('お申し込みありがとうございます！\n自動返信メールを送信しました。\n担当者より折り返しご連絡いたします。');
                form.reset();

            } catch (error) {
                console.error('Error:', error);
                // Even if fetch fails (e.g. network), we alert user. 
                // Note: 'no-cors' won't throw on 4xx/5xx, only on network failure.
                alert('送信に問題が発生した可能性がありますが、処理を完了しました。\n確認のため、自動返信メールが届いているかご確認ください。');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
});
