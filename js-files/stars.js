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
    star.dataset.speed = Math.random() * 0.15 + 0.05;
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
animateStars();