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
        default:
            break;
    }
    if (currentPage >= 0 && currentPage <= 7 ) {
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
            const rofileWildan = document.getElementById('profile-wildan');
            rofileWildan.classList.remove('opened');
            break;
        default:
            break;
    }
    if (currentPage >= 1 && currentPage <= 8 ) {
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

