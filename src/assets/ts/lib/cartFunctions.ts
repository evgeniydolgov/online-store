import { CartItems } from '../../types';
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

export const isGoodsItemInCart = (id: number) => Object.prototype.hasOwnProperty.call(store.cart, id);

export const addGoodsItemToCart = (id: number) => {
    if (!isGoodsItemInCart(id)) store.cart[id] = '1';
};

export const removeGoodsItemsFromCart = (id: number) => {
    if (isGoodsItemInCart(id)) delete store.cart[id];
};
