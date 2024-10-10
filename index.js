
const sections = document.querySelectorAll('.animated');
const textElements = document.querySelectorAll('.animated-title, .animated-subtitle, .animated-date');

const observerOptions = {
    root: null,
    threshold: 0.1
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

textElements.forEach(text => {
    observer.observe(text);
});


function updateCountdown() {
    const targetDate = new Date("2024-11-07T00:00:00").getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById("countdown");
    countdownElement.innerHTML = `${days} ${hours} ${minutes} ${seconds}`;

    if (distance < 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = "The countdown is over!";
    }
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call to display countdown immediately