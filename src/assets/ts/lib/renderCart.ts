import { store } from '../store';
import { checkElem } from '../helpers/checkers';
import { goods } from '../goods/goodsArray';

export async function renderCart() {
    store.cart = {
        '1' : '1',
        '2' : '1',
        '3' : '1',
        '5' : '8'
    };

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

    const cartList = (document.querySelector('#cart-goods')) as HTMLElement;
    for (const key in store.cart){
        const goodsElem = goods.find(elem => elem.id === Number(key));
        if (goodsElem !== undefined) {
        console.log(goodsElem);

        const cartElem = document.createElement('div') as HTMLElement;
        cartElem.className = 'cart__container';

        const cartImg = document.createElement('div') as HTMLElement;
        cartImg.className = 'cart__img';
        cartImg.textContent = 'я картинка';
        cartImg.style.background = `url(${goodsElem.images[0]})`

        const cartTitle = document.createElement('div') as HTMLElement;
        cartTitle.className = 'cart__title';
        cartTitle.textContent = goodsElem.title;

        const cartStock = document.createElement('div') as HTMLElement;
        cartStock.className = 'cart__stock';
        cartStock.textContent = `Остаток товара: ${goodsElem.stock}`;

        const cartButtons = document.createElement('div') as HTMLElement;
        cartButtons.className = 'cart-button__container';

        const buttonPlus = document.createElement('button') as HTMLElement;
        buttonPlus.textContent = '-';
        const buttonCounter = document.createElement('div') as HTMLElement;
        buttonCounter.textContent = '$';
        const buttonMinus = document.createElement('button') as HTMLElement;
        buttonMinus.textContent = '+';

        cartButtons.append(buttonPlus);
        cartButtons.append(buttonCounter);
        cartButtons.append(buttonMinus);

        const cartDelete = document.createElement('div') as HTMLElement;
        cartDelete.textContent = 'удалить из корзины'
        cartDelete.className = 'cart__deleted';

        cartElem.append(cartImg);
        cartElem.append(cartTitle);
        cartElem.append(cartStock)
        cartElem.append(cartButtons);
        cartElem.append(cartDelete);
        cartList.append(cartElem);
        }
    }

    const buyContainer = document.createElement('div');
    buyContainer.className = 'cart__buy';
    cartList.append(buyContainer);
}
