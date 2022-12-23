import { CartItems } from '../../types';
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
