let noCount = 0;

let yesBtn = document.getElementById("yesBtn");
let noBtn = document.getElementById("noBtn");
let body = document.body;
let question = document.getElementById("question");
let video = document.getElementById("memoryVideo");
let mainContent = document.getElementById("mainContent");
let music = document.getElementById("bgMusic");
let countdown = document.getElementById("countdown");

/* -------------------------
   START MUSIC IMMEDIATELY
-------------------------- */

// Try autoplay
window.addEventListener("load", function () {
    music.volume = 0.6;
    music.play().catch(() => {
        // If autoplay blocked, play on first click
        document.body.addEventListener("click", () => {
            music.play();
        }, { once: true });
    });
});


/* -------------------------
   HEARTS
-------------------------- */
function createHeart() {
    let heart = document.createElement("span");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.fontSize = (Math.random() * 20 + 20) + "px";
    document.querySelector(".hearts").appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 500);


/* -------------------------
   MOVE NO BUTTON
-------------------------- */
function moveNoButton() {
    let x = Math.random() * (window.innerWidth - 100);
    let y = Math.random() * (window.innerHeight - 50);
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
}

noBtn.addEventListener("mouseover", moveNoButton);


/* -------------------------
   SHAKE SCREEN
-------------------------- */
function shakeScreen() {
    body.classList.add("shake");
    setTimeout(() => body.classList.remove("shake"), 400);
}


/* -------------------------
   WHEN SHE PRESSES NO
-------------------------- */
noBtn.addEventListener("click", function () {

    shakeScreen();
    noCount++;

    let currentSize = parseInt(window.getComputedStyle(yesBtn).fontSize);
    yesBtn.style.fontSize = (currentSize + 8) + "px";
    yesBtn.style.padding = (currentSize + 20) + "px";

    if (noCount === 1) {
        body.className = "sad";
        question.innerHTML = "Puntu 🥺 after 8 years... you're saying no?";
    }
    else if (noCount === 2) {
        body.className = "crying";
        question.innerHTML = "Suchana 💔 we survived everything... don't do this 😭";
    }
    else if (noCount === 3) {
        body.className = "dramatic";
        question.innerHTML = "8 YEARS of love... was it nothing? 😩";
    }
    else if (noCount === 4) {
        body.className = "hopeless";
        question.innerHTML = "My heart can't take this anymore Puntu... 💔";
    }
    else {
        question.innerHTML = "Just press YES and let me love you forever ❤️😭";
    }
});


/* -------------------------
   CONFETTI
-------------------------- */
function createConfetti() {
    for (let i = 0; i < 150; i++) {
        let confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * window.innerWidth + "px";
        confetti.style.backgroundColor =
            "hsl(" + Math.random() * 360 + ", 100%, 50%)";
        document.body.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}


/* -------------------------
   WHEN SHE PRESSES YES
-------------------------- */
yesBtn.addEventListener("click", function () {

    createConfetti();

    mainContent.style.display = "none";
    countdown.style.display = "block";
    countdown.style.color = "white";

    let count = 3;
    countdown.innerHTML = count;

    let interval = setInterval(() => {
        count--;

        if (count > 0) {
            countdown.innerHTML = count;
        }
        else if (count === 0) {
            countdown.innerHTML = "❤️";
        }
        else {
            clearInterval(interval);
            countdown.style.display = "none";

            video.style.display = "block";
            video.muted = false;
            video.volume = 1;
            video.play();
        }

    }, 1000);
});


/* -------------------------
   AFTER VIDEO ENDS
-------------------------- */
video.addEventListener("ended", function () {

    // Stop music when video ends
    music.pause();
    music.currentTime = 0;

    video.style.display = "none";
    finalMessage.style.display = "block";
});
