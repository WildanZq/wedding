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
        default:
            break;
    }
    if (currentPage >= 0 && currentPage <= 7) {
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
        default:
            break;
    }
    if (currentPage >= 1 && currentPage <= 8) {
        currentPage--;
    }
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

// MARK: key up and down logic

document.addEventListener("keydown", (event) => {
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

const timer = setInterval(() => {
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

comeElm.addEventListener("change", (event) => {
  if (event.target.value == 'no') {
    personCountElm.classList.add('hide')
  } else {
    personCountElm.classList.remove('hide')
  }
});
