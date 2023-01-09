import { store } from '../store';
import { checkElem } from '../helpers/checkers';
import {
    handlerAddOneItemBtn,
    handlerGoodsOnPage,
    handlerPromoCodeInputChanges,
    nextPage,
    prevPage,
    renderPromoHtml,
} from './handlers';
import { checkerPriceInCart, creatNewPrice, popUpCloseButton, popUpOpenButton } from './cartFunctions';
import { displayShowListPagination } from './paginationGoodsCart';
import {
    checkAllInputValidation,
    checkCVV,
    checkDateCard,
    checkDebetCardNumber,
    checkerValidation,
} from './popUp_validations';
import { formatSum } from '../helpers';

export async function renderCart(fastBuy = false) {
    const tplToRender = 'cartPage.html';
    const url = new URL(location.href);
    const newPage = await fetch(url.origin + '/' + tplToRender)
        .then((response) => response.text())
        .then((text) => {
            const domParcer = new DOMParser();
            const html = domParcer.parseFromString(text, 'text/html');
            return html.querySelector('#page');
        });

    const app = checkElem(document.querySelector('#app'));
    app.innerHTML = '';
    app.append(checkElem(newPage));
    checkerPriceInCart(store.sumCartItems);

    let stockNum = 0;
    const buysGoodsIdArr = [];
    for (const key in store.cart) {
        buysGoodsIdArr.push(key);
        const allCartStock = document.querySelector('#allCartStock') as HTMLElement;
        stockNum += Number(store.cart[key]);
        allCartStock.textContent = `Всего товара: ${stockNum} шт`;
    }


    const numElemPagination = document.getElementById('num_elems_pagination') as HTMLInputElement;
    numElemPagination.addEventListener('input', handlerGoodsOnPage);

    const sumOfPageGoods = JSON.parse(localStorage.getItem('numOfElem') as string);
    const numberPage = JSON.parse(localStorage.getItem('pageNumber') as string);

    displayShowListPagination(buysGoodsIdArr, sumOfPageGoods, numberPage);

    const plusPageBtn = document.getElementById('plus-one-page') as HTMLElement;
    plusPageBtn.addEventListener('click', nextPage);

    const minusPageBtn = document.getElementById('minus-one-page') as HTMLElement;
    minusPageBtn.addEventListener('click', prevPage);

    const totalPrice = document.querySelector('#totalPrice') as HTMLElement;
    totalPrice.textContent = formatSum(store.sumCartItems, 0);

    const promoText = document.querySelector('#promo-text') as HTMLInputElement;
    promoText.addEventListener('input', handlerPromoCodeInputChanges);

    const promoButton = document.querySelector('#promo-button') as HTMLElement;

    if (localStorage.getItem('PromoARR') !== null) {
        renderPromoHtml();
    }

    promoButton.addEventListener('click', handlerAddOneItemBtn);
    creatNewPrice();

    const goBuyPage = document.querySelector('#go_buy_page') as HTMLButtonElement;
    goBuyPage.addEventListener('click', popUpOpenButton);

    const popUpBackground = document.querySelector('#popUp_background') as HTMLElement;
    if (fastBuy) popUpBackground.classList.add('move_pop_up');
    popUpBackground.addEventListener('click', popUpCloseButton);

    const nameInput = document.querySelectorAll('.buy-input') as NodeListOf<HTMLInputElement>;
    nameInput.forEach((el) => {
        el.addEventListener('change', checkerValidation);
    });

    const cardNumber = document.querySelector('#debit_card-number') as HTMLInputElement;
    cardNumber.addEventListener('input', checkDebetCardNumber);

    const cardDate = document.querySelector('#debit_card-date') as HTMLInputElement;
    cardDate.addEventListener('input', checkDateCard);

    const cardCVV = document.querySelector('#debit_card-ccv') as HTMLInputElement;
    cardCVV.addEventListener('input', checkCVV);

    const submitButton = document.querySelector('#order_button') as HTMLButtonElement;
    submitButton.addEventListener('click', () => {
        checkAllInputValidation(nameInput);
    });
}
