const video = document.getElementById("video");
const openBtn = document.getElementById('open-button');

var currentPage = 0;

openBtn.addEventListener("click", function () {
    currentPage = 1;
    const cover = document.getElementById('cover');
    cover.classList.add('opened');

    video.play();
});

function next() {
    switch (currentPage) {
        case 0:
            const cover = document.getElementById('cover');
            cover.classList.add('opened');
            video.play();
            break;
        case 1:
            const opening = document.getElementById('opening');
            opening.classList.add('opened');
            video.pause();
            break;
        case 2:
            const profileGina = document.getElementById('profile-gina');
            profileGina.classList.add('opened');
            break;
        case 3:
            const profileWildan = document.getElementById('profile-wildan');
            profileWildan.classList.add('opened');
            break;
        case 4:
            const schedule = document.getElementById('schedule');
            schedule.classList.add('opened');
            break;
        case 5:
            const reservation = document.getElementById('reservation');
            reservation.classList.add('opened');
            break;
        case 6:
            const gift = document.getElementById('gift');
            gift.classList.add('opened');
            document.body.classList.add('dark');
            break;
        default:
            break;
    }
    if (currentPage >= 0 && currentPage <= 6) {
        currentPage++;
    }
}

function prev() {
    switch (currentPage) {
        case 1:
            const cover = document.getElementById('cover');
            cover.classList.remove('opened');
            video.pause();
            break;
        case 2:
            const opening = document.getElementById('opening');
            opening.classList.remove('opened');
            video.play();
            break;
        case 3:
            const profileGina = document.getElementById('profile-gina');
            profileGina.classList.remove('opened');
            break;
        case 4:
            const profileWildan = document.getElementById('profile-wildan');
            profileWildan.classList.remove('opened');
            break;
        case 5:
            const schedule = document.getElementById('schedule');
            schedule.classList.remove('opened');
            break;
        case 6:
            const reservation = document.getElementById('reservation');
            reservation.classList.remove('opened');
            break;
        case 7:
            const gift = document.getElementById('gift');
            gift.classList.remove('opened');
            document.body.classList.remove('dark');
            break;
        default:
            break;
    }
    if (currentPage >= 1 && currentPage <= 7) {
        currentPage--;
    }
}

// MARK: init name

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const recipient = urlParams.get('to');
const nameText = document.getElementById('open-name');
nameText.innerHTML = recipient;

if (!recipient) {
    const dear = document.getElementById('open-dear');
    dear.innerHTML = '';
}

// MARK: swipe logic

let initialY = null;

function startTouch(e) {
    initialY = e.touches[0].clientY;
}

function moveTouch(e) {
    if (initialY === null) {
        return;
    }

    const currentY = e.touches[0].clientY;
    const diffY = initialY - currentY;

    if (Math.abs(diffY) > 10) {
        if (diffY > 0) {
            next();
        } else {
            prev();
        }

        initialY = null;
    }
}

document.addEventListener('touchstart', startTouch, false);
document.addEventListener('touchmove', moveTouch, false);

// MARK: scroll logic

let isScrolling = false;

window.addEventListener('wheel', (event) => {
    if (isScrolling) return;

    isScrolling = true;

    if (event.deltaY > 0) {
        next();
    } else {
        prev();
    }

    setTimeout(() => {
        isScrolling = false;
    }, 1000);
}, { passive: true });

// MARK: key up and down logic

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
    }

    switch (event.key) {
        case "ArrowUp":
            prev();
            break;
        case "ArrowDown":
            next();
            break;
        default:
            return;
    }
});

// MARK: countdown logic

const dayElm = document.getElementById('days')
const hourElm = document.getElementById('hours')
const minuteElm = document.getElementById('minutes')
const secondElm = document.getElementById('seconds')

const date1 = new Date("2026-04-18T11:30:00+08:00").getTime();
const date2 = new Date("2026-05-16T10:00:00+07:00").getTime();
const currentDate = new Date().getTime()

var targetDate = date1

if (currentDate > date1) {
    targetDate = date2
}

const timer = setInterval(function () {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    dayElm.innerHTML = days < 10 ? `0${days}` : days;
    hourElm.innerHTML = hours < 10 ? `0${hours}` : hours;
    minuteElm.innerHTML = minutes < 10 ? `0${minutes}` : minutes;
    secondElm.innerHTML = seconds < 10 ? `0${seconds}` : seconds;

    if (distance < 0) {
        clearInterval(timer);
    }
}, 1000);

// MARK: hide form logic

const personCountElm = document.getElementById('person-count')
const comeElm = document.getElementById('come')

comeElm.addEventListener("change", function (event) {
    if (!event.target.value || event.target.value == 'no') {
        personCountElm.classList.add('hide')
    } else {
        personCountElm.classList.remove('hide')
    }
});

// MARK: populate gallery slider

const track = document.getElementById('slider');

for (let i = 1; i <= 14; i++) {
    const img = document.createElement('img');
    img.draggable = false
    img.src = `./assets/gallery/${i}.jpg`;
    track.appendChild(img);
}

// MARK: slide carousel logic

const slides = Array.from(track.children);
const SPEED = 50;

const originalSlides = Array.from(track.children);

// Clone just once — CSS animation handles the infinite loop
originalSlides.forEach(slide => {
    track.appendChild(slide.cloneNode(true));
});

requestAnimationFrame(function () {
    return requestAnimationFrame(function () {
        const trackLeft = track.getBoundingClientRect().left;
        const firstClone = track.children[originalSlides.length];
        const totalOriginalWidth = firstClone.getBoundingClientRect().left - trackLeft;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes carousel-scroll {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-${totalOriginalWidth}px); }
            }
        `;
        document.head.appendChild(style);

        const duration = totalOriginalWidth / SPEED;
        track.style.animation = `carousel-scroll ${duration}s linear infinite`;
    });
});

// MARK: copy logic

const briBtn = document.getElementById('bri');
const bniBtn = document.getElementById('bni');

briBtn.addEventListener("click", function () {
    navigator.clipboard.writeText('084001040221537');
});

bniBtn.addEventListener("click", function () {
    navigator.clipboard.writeText('607428427');
});

// MARK: modal logic

const modal = document.getElementById('modal');
const modalCard = document.querySelectorAll('#modal .modal-card .card');
const showModalBtn = document.getElementById('show-modal');

showModalBtn.addEventListener("click", function () {
    modal.classList.add('opacity');
    modal.classList.add('visibility');
});

modalCard.forEach(function (el) {
    el.addEventListener("click", function (e) {
        e.stopPropagation();
    });
})

modal.addEventListener("click", function () {
    modal.classList.remove('opacity');
    setTimeout(function () {
        modal.classList.remove('visibility');
    }, 500);
});
