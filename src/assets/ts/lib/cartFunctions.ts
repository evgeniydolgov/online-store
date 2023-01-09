import { CartItems, PromoCode } from '../../types';
import { formatSum } from '../helpers';
import { store } from '../store';

import { loadDataStore } from './loadData';

const getCartSum = (cart: CartItems) => {
    const cartItems = Object.entries(cart);

    const goods = loadDataStore();

    return cartItems.reduce((acc, itemCart) => {
        const goodsItem = goods.find((itemGoods) => itemGoods.id === parseFloat(itemCart[0]));
        if (goodsItem) acc = acc + goodsItem.price * parseFloat(itemCart[1]);

        return acc;
    }, 0);
};

const getCartGoodsCount = (cart: CartItems) => {
    const cartItems = Object.values(cart);

    return cartItems.reduce((acc, item) => acc + parseInt(item), 0);
};

export const updateCartInfo = () => {
    store.sumCartItems = getCartSum(store.cart);
    store.countCartItems = getCartGoodsCount(store.cart);
};

export const getPromoSum = (sum: number, procent: number) => {
    return `${Math.floor(sum - sum * procent)}`;
};

export function creatNewPrice() {
    const promoArr: PromoCode[] = JSON.parse(localStorage.getItem('PromoARR') as string);
    const totalPrice = document.querySelector('#totalPrice') as HTMLElement;
    if (promoArr !== null && promoArr.length !== 0) {
        totalPrice.classList.add('after-promo');
        const newPrice = document.getElementById('newPrice') as HTMLElement;
        const percent = promoArr.reduce((acc, el) => {
            return (acc = acc + el.disc);
        }, 0);

        newPrice.textContent = `${getPromoSum(getCartSum(store.cart), percent / 100)} ₽`;
    } else {
        totalPrice.classList.remove('after-promo');
    }
}

export const isGoodsItemInCart = (id: number) => Object.prototype.hasOwnProperty.call(store.cart, id);
export const addGoodsItemToCart = (id: number) => {
    if (!isGoodsItemInCart(id)) store.cart[id] = '1';
};

export const removeGoodsItemsFromCart = (id: number) => {
    if (isGoodsItemInCart(id)) delete store.cart[id];
};

export function checkerPriceInCart(price: number) {
    const emptyElement = document.querySelector('#empty_cart_container') as HTMLElement;
    const fullElement = document.querySelector('#cart_container') as HTMLElement;

    if (price !== 0) {
        emptyElement.style.display = 'none';
        fullElement.style.display = 'flex';
    } else {
        fullElement.style.display = 'none';
        emptyElement.style.display = 'flex';
    }
}

export const setCartInfoHtml = () => {
    const cartInfoSum = document.querySelector('#cart_sum_info');
    const cartInfoCount = document.querySelector('#cart_count_info');

    if (!(cartInfoSum instanceof HTMLDivElement)) throw new Error('Cant find cart info sum div');
    if (!(cartInfoCount instanceof HTMLDivElement)) throw new Error('Cant find cart info count div');

    cartInfoSum.innerText = formatSum(store.sumCartItems, 0);
    cartInfoCount.innerText = store.countCartItems.toString();
};

export function popUpOpenButton() {
    const popUpBackground = document.querySelector('#popUp_background') as HTMLElement;
    const body = document.querySelector('#body_main') as HTMLElement;
        popUpBackground.classList.add('move_pop_up');
        body.classList.add('stop-scroll');
}

export function popUpCloseButton(event:Event) {
    const popUpBackground = document.querySelector('#popUp_background') as HTMLElement;
    if (event.target === popUpBackground) {
        popUpBackground.classList.remove('move_pop_up');
    }
    const body = document.querySelector('#body_main') as HTMLElement;
    body.classList.remove('stop-scroll');
}