import { checkElem, checkEventTarget } from '../helpers/checkers';
import { changePage } from '../helpers/router';
import { store } from '../store';
import { addGoodsItemToCart, isGoodsItemInCart, removeGoodsItemsFromCart } from './cartFunctions';
import { LS } from './localstorage';

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

    let goodsId = -1;

    if (btn.dataset.btnGoodsId) goodsId = parseInt(btn.dataset.btnGoodsId);

    if (btn) btn.classList.toggle('in-cart');

    if (isGoodsItemInCart(goodsId)) {
        removeGoodsItemsFromCart(goodsId);
        btn.dataset.btnTitle = 'Добавить в корзину';
    } else {
        addGoodsItemToCart(goodsId);
        btn.dataset.btnTitle = 'Удалить из корзины';
    }
    LS.saveCartDataToLS(store.cart);
};
