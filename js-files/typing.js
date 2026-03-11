// Typing effect
const titleEl = document.getElementById('typing-title');
const titleText = "Hi, I'm PanicAtTheCisco";
let i = 0;

function typeTitle() {
    if (i < titleText.length) {
        titleEl.textContent += titleText[i];
        i++;
        setTimeout(typeTitle, 75);
    }
}

typeTitle();