import { CardView } from '../../enums/cardView';
import { checkElem, checkEventTarget } from '../helpers/checkers';
import { changePage } from '../helpers/router';
import { store } from '../store';
import { setCardView } from './cardView';
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

export const handlerViewSwitch = (event: Event) => {
    event.preventDefault();

    const target = checkEventTarget(event.target);
    const option = target.parentNode?.querySelector('input');

    if (option instanceof HTMLInputElement) {
        if (store.view_settings.mode === option.value) return;
        if (option.value === CardView.tile) setCardView(CardView.tile);
        if (option.value === CardView.simple) setCardView(CardView.simple);
    }
    changePage(location.href);
};
