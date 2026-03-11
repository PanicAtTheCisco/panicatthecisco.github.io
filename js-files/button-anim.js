const chars = "#.^{-!$_№:0@}?%=,|'[]>;4{}";

document.querySelectorAll('.project-button').forEach(btn => {
    const span = btn.querySelector('span');
    const original = span.textContent;
    let frame;

    btn.addEventListener('mouseenter', () => {
    let iterations = 0;
    const totalFrames = 12;

    clearInterval(frame);
    frame = setInterval(() => {
        span.textContent = original
        .split('')
        .map((char) => {
            if (char === '-' || char === ' ') return char;
            if (iterations >= totalFrames) return char;
            return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');

        iterations++;
        if (iterations > totalFrames) {
        clearInterval(frame);
        span.textContent = original;
        }
    }, 50);
    });

    btn.addEventListener('mouseleave', () => {
    clearInterval(frame);
    span.textContent = original;
    });
});