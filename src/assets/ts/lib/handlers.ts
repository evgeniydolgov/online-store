import { checkElem, checkEventTarget } from '../helpers/checkers';
import { changePage } from '../helpers/router';

export const handlerDocumentClick = async (event: Event) => {
    const target = checkEventTarget(event.target);
    const closestAnchor = target.closest('a');

    if (!closestAnchor) return;

    const anchor = checkElem(closestAnchor).dataset.anchor;
    let href = '';
    if (anchor) {
        const thref = checkElem(closestAnchor).getAttribute('href');

        if (thref) href = thref;

        event.preventDefault();
        await changePage(href);
        history.pushState(null, '', href);
    }
};

export const handlerAddToCartClick = (event: Event) => {
    const btn = checkEventTarget(event.target);

    if (btn) btn.classList.toggle('in-cart');

    if (btn.classList.contains('in-cart')) btn.dataset.btnTitle = 'Удалить из корзины';
    else btn.dataset.btnTitle = 'Добавить в корзину';
};
