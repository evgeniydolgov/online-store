import { CartItems } from '../../types';
import { store } from '../store';
import { PromoArray } from './handlers';
import { store } from '../store';
import { loadDataStore } from './loadData';

export const getCartSum = (cart: CartItems) => {
    const cartItems = Object.entries(cart);

    const goods = loadDataStore();

    return cartItems.reduce((acc, itemCart) => {
        const goodsItem = goods.find((itemGoods) => itemGoods.id === parseFloat(itemCart[0]));
        if (goodsItem) acc = acc + goodsItem.price * parseFloat(itemCart[1]);

        return acc;
    }, 0);
};

export const getPromoSum = (sum: number, procent: number) => {
    return `${Math.floor(sum - sum * procent)}`;
};

export function creatNewPrice() {
    const promoArr: PromoArray[] = JSON.parse(localStorage.getItem('PromoARR') as string);
    const totalPrice = document.querySelector('#totalPrice') as HTMLElement;
    if (promoArr !== null && promoArr.length !== 0) {
        totalPrice.classList.add('after-promo');
        const newPrice = document.getElementById('newPrice') as HTMLElement;
        const percent = promoArr.reduce((acc, el) => {
            return (acc = acc + el.disc);
        }, 0);
        console.log(percent);

        newPrice.textContent = `${getPromoSum(getCartSum(store.cart), percent / 100)}`;
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
