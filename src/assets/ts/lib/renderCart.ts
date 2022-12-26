import { store } from '../store';
import { checkElem } from '../helpers/checkers';
import { goods } from '../goods/goodsArray';
import { handlerAddBtnClick, handlerButtonClick, handlerPromoCodeInputChanges, renderPromoHtml } from './handlers';
import { creatNewPrice, getCartSum } from './cartFunctions';

localStorage.setItem(store.ls_key_cart, JSON.stringify({
    '1' : '1',
    '2' : '1',
    '3' : '1',
    '8' : '5'

}))


export async function renderCart() {

    console.log(store);

    const tplToRender = 'cartPage.html';
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
    let stockNum = 0;

    for (const key in store.cart){
        const cartList = (document.querySelector('#cart-goods')) as HTMLElement;
        const goodsElem = goods.find(elem => elem.id === Number(key));
        if (goodsElem !== undefined) {

        const cartElem = document.createElement('div') as HTMLElement;
        cartElem.className = 'cart__container';

        const cartImg = document.createElement('div') as HTMLElement;
        cartImg.className = 'cart__img';
        cartImg.style.background = `url(${goodsElem.images[0]})0 0/100% no-repeat`;

        const cartTitle = document.createElement('div') as HTMLElement;
        cartTitle.className = 'cart__title';
        cartTitle.textContent = goodsElem.title;

        const cartStock = document.createElement('div') as HTMLElement;
        cartStock.className = 'cart__stock';
        cartStock.textContent = `Остаток товара: ${goodsElem.stock}`;

        const cartButtons = document.createElement('div') as HTMLElement;
        cartButtons.className = 'cart-button__container';

        const buttonMinus = document.createElement('button') as HTMLElement;
        buttonMinus.textContent = '-';
        buttonMinus.dataset.goodsId = key;
        buttonMinus.dataset.maxCount = goodsElem.stock.toString();
        buttonMinus.addEventListener('click', handlerButtonClick);

        const buttonCounter = document.createElement('div') as HTMLElement;
        buttonCounter.textContent = `${store.cart[key]}`;

        const buttonPlus = document.createElement('button') as HTMLElement;
        buttonPlus.textContent = '+';
        buttonPlus.dataset.typeButton = '+'
        buttonPlus.dataset.goodsId = key;
        buttonPlus.dataset.maxCount = goodsElem.stock.toString();
        buttonPlus.addEventListener('click', handlerButtonClick);

        cartButtons.append(buttonMinus);
        cartButtons.append(buttonCounter);
        cartButtons.append(buttonPlus);

        const cartDelete = document.createElement('div') as HTMLElement;
        cartDelete.textContent = 'удалить из корзины';
        cartDelete.className = 'cart__deleted';

        cartElem.append(cartImg);
        cartElem.append(cartTitle);
        cartElem.append(cartStock);
        cartElem.append(cartButtons);
        cartElem.append(cartDelete);
        cartList.append(cartElem);

        const allCartStock = document.querySelector('#allCartStock') as HTMLElement;
        stockNum += Number(store.cart[key]);

        allCartStock.textContent = `Всего товара ${stockNum}`;
        }
    }

    // const promoCode = document.getElementById('promo-text') as HTMLInputElement;

    const totalPrice = document.querySelector('#totalPrice') as HTMLElement;
    totalPrice.textContent = `${getCartSum(store.cart)}`;

    const promoText = document.querySelector('#promo-text') as HTMLInputElement;
    promoText.addEventListener('keyup', handlerPromoCodeInputChanges);

    const promoButton = document.querySelector('#promo-button') as HTMLElement;

    if (localStorage.getItem('PromoARR') !== null) {
        renderPromoHtml(promoText)
    }

    promoButton.addEventListener('click', handlerAddBtnClick)
    creatNewPrice ();
    console.log(store.sumCartItems)
}