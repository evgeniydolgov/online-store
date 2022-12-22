import { GoodsItem } from '../../interfaces/goodsItem.js';
import { store } from '../store.js';

export abstract class LS {
    static isLSAvailabel = () => {
        try {
            const t = 'Dudarik_test_iwouercmv857aer';
            localStorage.setItem(t, JSON.stringify(t));
            localStorage.removeItem(t);
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    };

    static saveToLS = (key: string, data: string) => {
        if (!store.settings.isLSAvailabel) return false;

        localStorage.setItem(key, JSON.stringify(data));
        return true;
    };

    static loadFromLS = (key: string) => {
        if (!store.settings.isLSAvailabel) return false;

        const lsStrJson = localStorage.getItem(key);
        let returnValue = '';
        if (lsStrJson) returnValue = JSON.parse(lsStrJson);
        return returnValue;
    };

    static saveCartDataFromLS = (data: GoodsItem[]) => {
        if (!store.settings.isLSAvailabel) return false;

        localStorage.setItem(store.ls_key_cart, JSON.stringify(data));

        return true;
    };

    static loadCartDataFromLS = () => {
        if (!store.settings.isLSAvailabel) return false;

        const strData = localStorage.getItem(store.ls_key_cart);

        let cartData: GoodsItem[] = [];

        if (strData) cartData = JSON.parse(strData);

        return cartData;
    };
}
