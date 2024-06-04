const sections = document.querySelectorAll('.caixa');
var links = document.querySelectorAll('.balao-link');

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