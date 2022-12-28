import { CardView } from '../../enums/cardView';
import { checkElem, checkEventTarget } from '../helpers/checkers';
import { changePage } from '../helpers/router';
import { store } from '../store';
import { LS } from './localstorage';
import { renderCart } from './renderCart';

import { setCardView } from './cardView';
import { addGoodsItemToCart, isGoodsItemInCart, removeGoodsItemsFromCart } from './cartFunctions';
import { renderShopCards } from './renderShopCards';
import { renderFilters } from './renderFilters';
import { renderGoodsCount } from './renderGoodsCount';

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

export const handlerViewSwitch = async (event: Event) => {
    event.preventDefault();

    const target = checkEventTarget(event.target);
    const option = target.parentNode?.querySelector('input');

    if (option instanceof HTMLInputElement) {
        if (store.view_settings.mode === option.value) return;
        if (option.value === CardView.tile) setCardView(CardView.tile);
        if (option.value === CardView.simple) setCardView(CardView.simple);
    }
};

export const handlerFilterValueSwitch = (event: Event) => {
    event.preventDefault();

    const target = event.target;

    if (!(target instanceof HTMLInputElement)) return;

    const url = new URL(location.href);
    const filter_name = target.dataset.filterName;
    const filter_value = target.getAttribute('value');

    if (!filter_name || !filter_value) return;

    const currFilterUrlParams = url.searchParams.get(filter_name);

    let currFilterParams: string[] = [];

    if (currFilterUrlParams !== null) currFilterParams = currFilterUrlParams.split(',');

    if (!target.checked) {
        currFilterParams = currFilterParams.filter((param) => param !== filter_value);
    } else {
        currFilterParams.push(filter_value);
    }
    if (currFilterParams.length > 0) url.searchParams.set(filter_name, currFilterParams.join(','));
    else url.searchParams.delete(filter_name);

    store.filters_settings[filter_name] = currFilterParams;

    history.pushState(null, '', decodeURIComponent(url.toString()));
    renderShopCards('#goods');
    renderFilters();
    renderGoodsCount();
};

const promoCodes = [
    { promoCode: 'RS', disc: 10 },
    { promoCode: 'EPM', disc: 5 },
    { promoCode: 'edolgov', disc: 15 },
    { promoCode: 'dudarik', disc: 15 },
];

export const handlerButtonClick = (event: Event) => {
    const buttonElem = event.target as HTMLElement;
    const id = buttonElem.dataset.goodsId as string;
    const maxCount = Number(buttonElem.dataset.maxCount);
    const count = Number(store.cart[id]);
    const type = buttonElem.dataset.typeButton as string;
    if (type === '+') {
        if (count < maxCount) {
            store.cart[id] = (Number(store.cart[id]) + 1).toString();
        }
    } else if (count > 1) {
        store.cart[id] = (Number(store.cart[id]) - 1).toString();
    } else if (count === 1) {
        delete store.cart[id];
    }

    LS.saveCartDataToLS(store.cart);
    renderCart();
};

export type PromoArray = {
    promoCode: string;
    disc: number;
};

export function handlerDeleteOneItemBtn(event: Event) {
    let promoArr: PromoArray[] = JSON.parse(localStorage.getItem('PromoARR') as string);
    const targetBtn = event.target;
    if (!(targetBtn instanceof HTMLButtonElement)) return;
    const promoId = targetBtn.dataset.promoCode;
    promoArr = promoArr.filter((item) => item.promoCode !== promoId);
    localStorage.setItem('PromoARR', JSON.stringify(promoArr));
    renderCart();
}

export function handlerAddOneItemBtn(event: Event) {
    let promoArr: PromoArray[] = JSON.parse(localStorage.getItem('PromoARR') as string);
    if (!promoArr) {
        promoArr = [];
    }
    const targetBtn = event.target;
    if (!(targetBtn instanceof HTMLButtonElement)) return;
    const promoText = document.querySelector('#promo-text');
    if (!(promoText instanceof HTMLInputElement)) return;
    const promoCode = promoCodes.filter((item) => item.promoCode === promoText.value);
    promoArr.push(promoCode[0]);
    localStorage.setItem('PromoARR', JSON.stringify(promoArr));
    renderCart();
}

export function handlerPromoCodeInputChanges(event: Event) {
    const promoArr: PromoArray[] = JSON.parse(localStorage.getItem('PromoARR') as string);
    const inputValue = event.target as HTMLInputElement;
    const onePromoCode = promoCodes.filter((el) => el.promoCode === inputValue.value);
    const argeeBtn = document.getElementById('promo-button') as HTMLButtonElement;

    if (promoArr === null || promoArr.length === 0) {
        if (!onePromoCode.length) {
            argeeBtn.style.display = 'none';
            return;
        }
        argeeBtn.style.display = 'block';
    } else {
        const repeatPromoCode = promoArr.filter((el) => el.promoCode === inputValue.value);
        if (repeatPromoCode.length) {
            return;
        } else if (onePromoCode.length) {
            argeeBtn.style.display = 'block';
        }
    }
}

export function renderPromoHtml(input: HTMLInputElement) {
    if (localStorage.getItem('PromoARR') === null) {
        const promoArr: string[] = [];
        LS.saveToLS('PromoARR', JSON.stringify(promoArr));
    }

    const arr: Record<string, string>[] = JSON.parse(localStorage.getItem('PromoARR') as string);

    const promoBlock = document.createElement('div');
    for (let i = 0; i < arr.length; i++) {
        const messageForUser = (document.createElement(
            'span'
        ).textContent = `скидка по промокоду ${arr[i]['promoCode']} - ${arr[i]['disc']}`);
        const deleteButton = document.createElement('button');
        deleteButton.dataset.promoCode = arr[i]['promoCode'];
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', handlerDeleteOneItemBtn);
        promoBlock.append(messageForUser);
        promoBlock.append(deleteButton);
    }
    input.before(promoBlock);
}

export function handlerGoodsOnPage(event: Event) {
    const inputValue = event.target as HTMLInputElement;
    if (typeof Number(inputValue.value) === 'number' && Number(inputValue.value) > 0) {
       localStorage.setItem('numOfElem', JSON.stringify(inputValue.value))
    } else {
        localStorage.setItem('numOfElem', JSON.stringify(null))
    }
    localStorage.setItem('pageNumber', JSON.stringify(0))
    setTimeout(() => {
        renderCart();
    }, 1000);
}
 
export function nextPage(){
    let checkPage = JSON.parse(localStorage.getItem('pageNumber') as string);
    if (!checkPage) {
        checkPage = 0;
    }
    if(checkPage < JSON.parse(localStorage.getItem('maxNumberPage') as string) - 1) {
        checkPage +=1;
        localStorage.setItem('pageNumber', JSON.stringify(checkPage));
        renderCart();
    }
}

export function prevPage(){
    let checkPage = JSON.parse(localStorage.getItem('pageNumber') as string);
    if (!checkPage) {
        checkPage = 0;
    }
    if(checkPage > 0) {
        checkPage -=1;
        localStorage.setItem('pageNumber', JSON.stringify(checkPage));
        renderCart();
    }
}
