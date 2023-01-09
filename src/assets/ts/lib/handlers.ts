import { CardView } from '../../enums/cardView';
import { checkElem, checkEventTarget } from '../helpers/checkers';
import { changePage } from '../helpers/router';
import { store } from '../store';
import { LS } from './localstorage';
import { renderCart } from './renderCart';

import { setCardView } from './cardView';
import {
    addGoodsItemToCart,
    isGoodsItemInCart,
    removeGoodsItemsFromCart,
    setCartInfoHtml,
    updateCartInfo,
} from './cartFunctions';
import { renderShopCards } from './renderShopCards';
import { renderValueFilters } from './renderFilters';
import { renderGoodsCount } from './renderGoodsCount';
import { renderSwitchView } from './renderSwitchView';
import { PromoCode } from '../../types';

import { removeAllFiltersFromUrl, removeSearchStringFromUrl } from './filterGoods';

export const handlersCopyToClipboardButtonClick = (event: Event) => {
    const target = event.target;

    if (!(target instanceof HTMLButtonElement)) return;

    target.innerText = 'Скопировано...';
    const url = location.href;

    navigator.clipboard.writeText(url);
    setTimeout(() => {
        target.innerText = 'Копировать URL';
    }, 2000);
};

export const handlerResetFiltersButtonClick = (event: Event) => {
    const target = event.target;

    if (!(target instanceof HTMLButtonElement)) return;

    let url = removeAllFiltersFromUrl(location.href);

    url = removeSearchStringFromUrl(url);

    location.href = url;
};

import { setSortingSettings } from './sortGoods';

export const handlerSortSelectChange = (event: Event) => {
    event.preventDefault();

    const target = event.target;

    const url = new URL(location.href);

    if (!(target instanceof HTMLSelectElement)) return;

    url.searchParams.set('sortBy', target.value);

    history.pushState(null, '', decodeURIComponent(url.toString()));

    setSortingSettings();

    renderShopCards('#goods');
};

export const handlerSearchFieldKeyUp = (event: Event) => {
    event.preventDefault();
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) return;

    const url = new URL(location.href);

    url.searchParams.set('search', target.value);

    if (target.value.length === 0) url.searchParams.delete('search');

    history.pushState(null, '', decodeURIComponent(url.toString()));

    renderShopCards('#goods');
    renderValueFilters();
    renderGoodsCount();
};

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
    const target = event.target;
    let btn = target;

    if (target instanceof SVGElement) btn = target.closest('#btn_add_to_cart');

    if (!(btn instanceof HTMLButtonElement)) throw new Error('Cant find button element');

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
    updateCartInfo();
    setCartInfoHtml();
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
        renderSwitchView();
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

    // url.searchParams.delete('price');
    // url.searchParams.delete('stock');

    store.filters_settings[filter_name] = currFilterParams;

    history.pushState(null, '', decodeURIComponent(url.toString()));
    renderShopCards('#goods');
    renderValueFilters();
    renderGoodsCount();
};

export const handlerThumbsImageClick = (event: Event) => {
    const target = event.target;

    if (!(target instanceof HTMLImageElement)) return;

    const gc_image = document.querySelector('#gc_image');

    if (!(gc_image instanceof HTMLImageElement)) throw new Error('Cant find target image tag');

    const newPath = target.dataset.pathToImg;

    if (!newPath) return;

    gc_image.setAttribute('src', newPath);
};

export const handlerFastBuyClick = async (event: Event) => {
    const target = event.target;

    if (!(target instanceof HTMLButtonElement)) return;

    const goodsId = parseInt(String(target.dataset.btnGoodsId));

    addGoodsItemToCart(goodsId);

    updateCartInfo();

    setCartInfoHtml();

    LS.saveCartDataToLS(store.cart);

    await renderCart(true);

    history.pushState(null, '', '/cart');
};

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

    updateCartInfo();
    setCartInfoHtml();

    LS.saveCartDataToLS(store.cart);
    renderCart();
};

export function handlerDeleteOneItemBtn(event: Event) {
    let promoArr: PromoCode[] = JSON.parse(localStorage.getItem('PromoARR') as string);
    const targetBtn = event.target;
    if (!(targetBtn instanceof HTMLButtonElement)) return;
    const promoId = targetBtn.dataset.promoCode;
    promoArr = promoArr.filter((item) => item.promoCode !== promoId);
    localStorage.setItem('PromoARR', JSON.stringify(promoArr));
    renderCart();
}

export function handlerAddOneItemBtn(event: Event) {
    let promoArr: PromoCode[] = JSON.parse(localStorage.getItem('PromoARR') as string);
    if (!promoArr) {
        promoArr = [];
    }
    const targetBtn = event.target;
    if (!(targetBtn instanceof HTMLButtonElement)) return;
    const promoText = document.querySelector('#promo-text');
    if (!(promoText instanceof HTMLInputElement)) return;
    const promoCode = store.promoCodes.filter((item) => item.promoCode === promoText.value);
    promoArr.push(promoCode[0]);
    localStorage.setItem('PromoARR', JSON.stringify(promoArr));
    renderCart();
}

export function handlerPromoCodeInputChanges(event: Event) {
    const promoArr: PromoCode[] = JSON.parse(localStorage.getItem('PromoARR') as string);
    const inputValue = event.target as HTMLInputElement;
    const onePromoCode = store.promoCodes.filter((el) => el.promoCode === inputValue.value);
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

export function renderPromoHtml() {
    const inputBlock = document.getElementById('inputBlock') as HTMLButtonElement;
    if (localStorage.getItem('PromoARR') === null) {
        const promoArr: string[] = [];
        LS.saveToLS('PromoARR', JSON.stringify(promoArr));
    }

    const arr: Record<string, string>[] = JSON.parse(localStorage.getItem('PromoARR') as string);

    const promoBlock = document.createElement('div');
    for (let i = 0; i < arr.length; i++) {
        const messageForUser = document.createElement('span');
        messageForUser.textContent = `добавлена скидка "${arr[i]['promoCode']}" - ${arr[i]['disc']}%`;
        messageForUser.classList.add('message_for_user');

        const deleteButton = document.createElement('button');
        deleteButton.dataset.promoCode = arr[i]['promoCode'];
        deleteButton.classList.add('deletePromoBtn');
        deleteButton.addEventListener('click', handlerDeleteOneItemBtn);
        promoBlock.append(messageForUser);
        promoBlock.append(deleteButton);
    }
    inputBlock.after(promoBlock);
}

export function handlerGoodsOnPage(event: Event) {
    const url = new URL(location.href)
    const inputValue = event.target as HTMLInputElement;
    if (typeof Number(inputValue.value) === 'number' && Number(inputValue.value) > 0) {
        //localStorage.setItem('numOfElem', JSON.stringify(inputValue.value));
        url.searchParams.set('numOfElem', inputValue.value)

    } else {
        //localStorage.setItem('numOfElem', JSON.stringify(null));
        url.searchParams.set('numOfElem', `${null}`)
    }
    // localStorage.setItem('', JSON.stringify(0));
    history.pushState(null, '', decodeURIComponent(url.toString()));
    setTimeout(() => {
        renderCart();
    }, 1000);
}

export function nextPage() {
    const url = new URL(location.href);
    //let checkPage = JSON.parse(localStorage.getItem('pageNumber') as string);
    let checkPage = Number(url.searchParams.get('pageNumber'));
    if (!checkPage) {
        checkPage = 0;
    }
    // if (checkPage < JSON.parse(localStorage.getItem('maxNumberPage') as string) - 1)

    const pageNum = url.searchParams.get('MaxPage');
    if (checkPage < Number(pageNum) - 1) {
        checkPage += 1;


        //localStorage.setItem('pageNumber', JSON.stringify(checkPage));
        url.searchParams.set('pageNumber', `${checkPage}`);
        history.pushState(null, '', decodeURIComponent(url.toString()));
        renderCart();
    }
}

export function prevPage() {
    const url = new URL(location.href);
    //let checkPage = JSON.parse(localStorage.getItem('pageNumber') as string);
    let checkPage = Number(url.searchParams.get('pageNumber'));
    if (!checkPage) {
        checkPage = 0;
    }
    if (checkPage > 0) {
        checkPage -= 1;
        //localStorage.setItem('pageNumber', JSON.stringify(checkPage));
        url.searchParams.set('pageNumber', `${checkPage}`);
        history.pushState(null, '', decodeURIComponent(url.toString()));
        renderCart();
    }
}
