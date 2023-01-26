import { renderPage } from '../lib/render';

const ROUTES = ['goods', 'cart', ''];

export const changePage = async (href: string | null) => {
    if (href === null) return;

    const url = new URL(href);

    const request = url.pathname.split('/');

    let renderPageName = request[1];

    if (!ROUTES.includes(request[1]) || request.length > 3) {
        renderPageName = '404';
    } else {
        if (url.pathname === '/') renderPageName = 'store';
    }

    await renderPage(renderPageName);
};
