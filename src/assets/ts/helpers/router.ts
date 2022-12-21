import { checkElem } from './checkers';

const ROUTES = ['goods', 'cart', ''];

export const changePage = async (href: string | null) => {
    if (href === null) return;

    const url = new URL(href);

    let tplToRender = url.origin + '/';

    let request = url.pathname.split('/');

    request = request.filter((item) => item !== '');

    if (!ROUTES.includes(request[0]) || request.length > 2) {
        tplToRender += '404Page.html';
    } else {
        if (url.pathname === '/') tplToRender += 'store';
        tplToRender += request[0] + 'Page.html';
    }
    // render(tplToRender, {id: request[2] || null})

    const newPage = await fetch(tplToRender)
        .then((response) => response.text())
        .then((text) => {
            const domParcer = new DOMParser();
            const html = domParcer.parseFromString(text, 'text/html');
            return html.querySelector('#page');
        });
    const app = checkElem(document.querySelector('#app'));
    app.innerHTML = '';
    app.append(checkElem(newPage));
};
