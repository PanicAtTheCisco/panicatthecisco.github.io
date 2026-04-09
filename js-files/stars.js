const starCount = 80;
const stars = [];
const starsDiv = document.getElementById('stars');
for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.left = `${Math.random() * 100}vw`;
    // Make stars slower by reducing speed range
    star.dataset.speed = Math.random() * 0.03 + 0.01;
    starsDiv.appendChild(star);
    stars.push(star);
}
function animateStars() {
    stars.forEach(star => {
        let top = parseFloat(star.style.top);
        let speed = parseFloat(star.dataset.speed);
        top += speed;
        if (top > 100) top = 0;
        star.style.top = `${top}vh`;
    });
    requestAnimationFrame(animateStars);
}

function createShootingStar() {
    const shooter = document.createElement('div');
    shooter.className = 'shooting-star';

    // Random starting position
    shooter.style.top = `${Math.random() * 70}vh`;
    shooter.style.left = `${Math.random() * 70}vw`;

    // Random angle between -45 and 45 degrees off diagonal
    const angle = (Math.random() * 90) - 45;
    shooter.style.setProperty('--angle', `${angle}deg`);

    // Trail
    const duration = Math.random() * 800 + 400;
    shooter.style.setProperty('--duration', `${duration}ms`);

    starsDiv.appendChild(shooter);

    // Remove after animation completes
    setTimeout(() => shooter.remove(), duration);
}

// Fire one every 2–5 seconds
function scheduleShootingStar() {
    createShootingStar();
    setTimeout(scheduleShootingStar, Math.random() * 6000 + 6000);
}

scheduleShootingStar();
animateStars();