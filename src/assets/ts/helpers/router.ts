import { renderPage } from '../lib/render';

const ROUTES = ['goods', 'cart', ''];

export const changePage = async (href: string | null) => {
    if (href === null) return;

    const url = new URL(href);

    // let tplToRender = url.origin + '/';

    const request = url.pathname.split('/');

    let renderPageName = request[1];

    // console.log(request);

    // request = request.filter((item) => item !== '');

    // console.log(request);
    // console.log(url);
    if (!ROUTES.includes(request[1]) || request.length > 2) {
        renderPageName = '404';
    } else {
        if (url.pathname === '/') renderPageName = 'store';
    }
    // render(tplToRender, {id: request[2] || null})
    // console.log(renderPageName);
    await renderPage(renderPageName);

    // const newPage =
};
