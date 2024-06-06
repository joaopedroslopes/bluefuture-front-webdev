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

function rolagemAutomatica() {
    const play = document.querySelector('#play');
    const stop = document.querySelector('#stop');

    let indiceSecaoAtual = 0;

    alert('Rolagem automática ativada!');

    rolagem.style.display = 'none';

    play.style.display = 'block';
    stop.style.display = 'block';

    setInterval(() => {
        indiceSecaoAtual = (indiceSecaoAtual + 1) % sections.length;
        sections[indiceSecaoAtual].scrollIntoView({ behavior: 'smooth' });
    }, 1000);

    document.addEventListener('DOMContentLoaded', rolagemAutomatica);

}

rolagem.addEventListener('click', rolagemAutomatica);