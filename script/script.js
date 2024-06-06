const sections = document.querySelectorAll('.caixa');
var links = document.querySelectorAll('.balao-link');
const rolagem = document.querySelector('#rolagem');


/* ==============================   HEADER    ============================== */

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const visibleWidth = Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0);
    return visibleWidth >= rect.width * 0.55;
}

function updateActiveLinks() {
    sections.forEach(section => {
        const id = section.id;
        const link = document.querySelector(`.balao-link[href="#${id}"]`);

        if (link) {
            if (isInViewport(section)) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
}

window.addEventListener('load', updateActiveLinks);
window.addEventListener('scroll', updateActiveLinks);

/* ==============================   ROLAGEM    ============================== */
let intervaloRolagem;
let isPaused = false;
let isRolagemAtiva = false;
let indiceSecaoAtual = 0;

function rolagemAutomatica() {
    const play = document.querySelector('#play');
    const stop = document.querySelector('#stop');
    const rolagem = document.querySelector('#rolagem');
    const sections = document.querySelectorAll('section');

    if (isRolagemAtiva) return;

    alert('Rolagem automática ativada!');

    rolagem.style.display = 'none';

    play.style.display = 'block';
    stop.style.display = 'block';

    isRolagemAtiva = true;

    intervaloRolagem = setInterval(() => {
        if (!isPaused) {
            indiceSecaoAtual = (indiceSecaoAtual + 1) % sections.length;
            sections[indiceSecaoAtual].scrollIntoView({ behavior: 'smooth' });
        }
    }, 1000);
}

document.querySelector('#rolagem').addEventListener('click', rolagemAutomatica);

document.querySelector('#stop').addEventListener('click', () => {
    clearInterval(intervaloRolagem);
    alert('Rolagem automática parada!');
    document.querySelector('#rolagem').style.display = 'block';
    document.querySelector('#play').style.display = 'none';
    document.querySelector('#stop').style.display = 'none';
    isRolagemAtiva = false;
});

document.querySelector('#play').addEventListener('click', () => {
    const sections = document.querySelectorAll('section');
    isPaused = !isPaused;
    if (isPaused) {
        alert('Rolagem automática pausada!');
        document.querySelector('#play').textContent = 'Play';
    } else {
        alert('Rolagem automática retomada!');
        document.querySelector('#play').textContent = 'Pause';
        sections[indiceSecaoAtual].scrollIntoView({ behavior: 'smooth' });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const play = document.querySelector('#play');
    const stop = document.querySelector('#stop');
    const rolagem = document.querySelector('#rolagem');

    play.style.display = 'none';
    stop.style.display = 'none';
    play.textContent = 'Pause';
});


/* ==============================   SCROLL    ============================== */
document.addEventListener('wheel', (event) => {
    const deltaY = event.deltaY;
    if (deltaY > 0) {
        scrollAtras();
    } else {
        scrollFrente();
    }
});

function scrollFrente() {
    if (isRolagemAtiva || isPaused) return;
    const sections = document.querySelectorAll('section');
    indiceSecaoAtual = (indiceSecaoAtual + 1 + sections.length) % sections.length;
    sections[indiceSecaoAtual].scrollIntoView({ behavior: 'smooth' });
}

function scrollAtras() {
    if (isRolagemAtiva || isPaused) return;
    const sections = document.querySelectorAll('section');
    indiceSecaoAtual = (indiceSecaoAtual - 1 + sections.length) % sections.length;
    sections[indiceSecaoAtual].scrollIntoView({ behavior: 'smooth' });
}
