import { checkElem, checkEventTarget } from '../helpers/checkers';
import { changePage } from '../helpers/router';
import { store } from '../store';
import { LS } from './localstorage';
import { renderCart } from './renderCart';

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

const promoCodes = [
    {'promoCode' : 'RS', 'disc' : 10},
    {'promoCode' : 'EPM', 'disc' : 5},
    {'promoCode' : 'edolgov', 'disc' : 15},
    {'promoCode' : 'dudarik', 'disc' : 15}
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
    }else if (count === 1){
        delete store.cart[id];
    }

    LS.saveCartDataToLS(store.cart);
    renderCart();
}

export type PromoArray = {
    'promoCode' : string,
    'disc' : number
}

export function handlerDeleteBtnClick(event: Event){
    let promoArr: PromoArray[] = JSON.parse(localStorage.getItem('PromoARR') as string);
    const targetBtn = event.target;
    if ( !(targetBtn instanceof HTMLButtonElement) ) return;
    const promoId = targetBtn.dataset.promoCode;
    promoArr = promoArr.filter((item) => item.promoCode !== promoId);
    localStorage.setItem('PromoARR', JSON.stringify(promoArr));
    renderCart();
}

export function handlerAddBtnClick(event: Event){
    let promoArr: PromoArray[] = JSON.parse(localStorage.getItem('PromoARR') as string);
    if (!promoArr) {
        promoArr = [];
    }
    const targetBtn = event.target;
    if ( !(targetBtn instanceof HTMLButtonElement) ) return;
    const promoText = document.querySelector('#promo-text');
    if ( !(promoText instanceof HTMLInputElement) ) return;
    const promoCode = promoCodes.filter( item => item.promoCode === promoText.value);
    promoArr.push(promoCode[0]);
    localStorage.setItem('PromoARR', JSON.stringify(promoArr));
    renderCart();
}

export function handlerPromoCodeInputChanges(event: Event) {
    const promoArr: PromoArray[] = JSON.parse(localStorage.getItem('PromoARR') as string);
    const inputValue = event.target as HTMLInputElement;
    const onePromoCode = promoCodes.filter( el => el.promoCode === inputValue.value);
    const argeeBtn = document.getElementById('promo-button') as HTMLButtonElement;

    if (promoArr === null || promoArr.length === 0 ) {
        if ( !onePromoCode.length ) {
            argeeBtn.style.display = 'none';
            return;
        }
        argeeBtn.style.display = 'block';
    } else {
        const repeatPromoCode = promoArr.filter( el => el.promoCode === inputValue.value);
        if(repeatPromoCode.length){
            return;
        } else if (onePromoCode.length){
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
            const messageForUser = document.createElement('span').textContent = `скидка по промокоду ${arr[i]['promoCode']} - ${arr[i]['disc']}`;
            const deleteButton = document.createElement('button');
            deleteButton.dataset.promoCode = arr[i]['promoCode'];
            deleteButton.textContent = 'Удалить';
            deleteButton.addEventListener('click', handlerDeleteBtnClick)
            promoBlock.append(messageForUser);
            promoBlock.append(deleteButton);
        }
    input.before(promoBlock);
}