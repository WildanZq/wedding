import { getData, getRecipientData, submitData } from './rsvp.js';

function escapeHTML(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const recipient = urlParams.get('to');

const recipientData = await getRecipientData();

if (recipientData) {
    const come = document.getElementById('come');
    const personCount = document.getElementById('person-count');
    const message = document.getElementById('message');

    message.value = recipientData.message;

    if (recipientData.come_mks) {
        come.value = 'mks';
        personCount.value = recipientData.come_mks;
        personCount.classList.remove('hide');
    } else if (recipientData.come_prg) {
        come.value = 'prg';
        personCount.value = recipientData.come_prg;
        personCount.classList.remove('hide');
    } else {
        come.value = 'no';
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const responses = document.getElementById('responses');

function createResponseElement(name, come_mks, come_prg, message) {
    const div = document.createElement('div');
    div.classList.add('response');
    div.classList.add('shadow');

    const title = document.createElement('h1');
    title.innerHTML = escapeHTML(name);
    div.appendChild(title);

    const span = document.createElement('span');
    if (come_mks) {
        span.innerHTML = 'Hadir, di Makassar';
    } else if (come_prg) {
        span.innerHTML = 'Hadir, di Ponorogo';
    } else {
        span.innerHTML = 'Tidak hadir';
    }
    div.appendChild(span);

    const msg = document.createElement('p');
    msg.innerHTML = escapeHTML(message ? message : '-');
    div.appendChild(msg);

    return div;
}

async function showResponses() {
    const data = await getData()

    const responseData = Object.keys(data);
    shuffleArray(responseData);

    responseData.forEach(key => {
        if (key == recipient) {
            return;
        }

        const resp = data[key];
        const div = createResponseElement(key, resp.come_mks, resp.come_prg, resp.message);

        responses.appendChild(div);
    });

    const formWrapper = document.getElementById('form-wrapper');
    formWrapper.classList.add('hide');

    setTimeout(() => {
        const responseWrapper = document.getElementById('response-wrapper');
        responseWrapper.classList.add('show');
    }, 500);
}

const form = document.getElementById('form');
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formBtn = document.getElementById('send');

    if (!recipient) {
        formBtn.disabled = true;
        showResponses();
        return;
    }

    formBtn.disabled = true;
    await submitData();
    await showResponses();

    const come = document.getElementById('come').value; // mks | prg | no
    const person = document.getElementById('person_count').value;
    const message = document.getElementById('message').value;

    let mks = 0;
    let prg = 0;
    if (come == 'mks') {
        mks = parseInt(person, 10)
    }
    if (come == 'prg') {
        prg = parseInt(person, 10)
    }

    const div = createResponseElement(recipient, mks, prg, message);
    responses.prepend(div);
});

