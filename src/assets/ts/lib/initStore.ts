import { Filter, GoodsItem } from '../../interfaces';
import { CartItems } from '../../types';
import { goods } from '../goods/goodsArray';
import { filterGoods } from './filterGoods';
import { LS } from './localstorage';
import { store } from '../store';

const FILTERS_NAME_ARRAY = ['_brand', '_category', 'price', 'stock'];

const loadDataStore = () => goods;

const getFiltersFromUrl = () => {
    const url = new URL(location.href);

    const filters: Filter[] = FILTERS_NAME_ARRAY.reduce((acc: Filter[], item: string) => {
        const currFilter = url.searchParams.get(item);

        if (currFilter !== null) {
            const currFilterParams = currFilter.split(',');
            acc = [...acc, { name: item, value: currFilterParams }];
        }
        return acc;
    }, []);

    return filters;
};

const getSearchStringFromUrl = () => {
    const url = new URL(location.href);

    return url.searchParams.get('search');
};

const getCartSum = (cart: CartItems) => {
    const cartItems = Object.entries(cart);

    const goods = loadDataStore();

    return cartItems.reduce((acc, itemCart) => {
        const goodsItem = goods.find((itemGoods) => itemGoods.id === parseFloat(itemCart[0]));
        if (goodsItem) acc = acc + goodsItem.price * parseFloat(itemCart[1]);

        return acc;
    }, 0);
};

const getCountGoodsByFieldName = (goods: GoodsItem[], fieldName: string, valueField: string) =>
    goods.filter((goodsItem) => String(goodsItem[fieldName]).toLocaleLowerCase() === valueField.toLocaleLowerCase())
        .length;

const getMinMaxByFieldName = (goods: GoodsItem[], fieldName: string) => {
    const retArr = [0, 0];

    if (goods.length > 0) {
        retArr[0] = parseInt(String(goods[0][fieldName]));
        retArr[1] = parseInt(String(goods[0][fieldName]));

        for (let i = 0; i < goods.length; i++) {
            const item = parseInt(String(goods[i][fieldName]));

            if (item < retArr[0]) retArr[0] = item;

            if (item > retArr[1]) retArr[1] = item;
        }
    }

    return retArr;
};

const getGoodsBrands = (goods: GoodsItem[]) => Array.from(new Set(goods.map((goodsItem) => String(goodsItem.brand))));

const getGoodsCategorys = (goods: GoodsItem[]) =>
    Array.from(new Set(goods.map((goodsItem) => String(goodsItem.category))));

export function initStore() {
    const cart = LS.loadCartDataFromLS() || {};
    const sumCartItems = getCartSum(cart);

    const filters = getFiltersFromUrl();

    for (const filter in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, filter)) {
            const element = filters[filter];
            store.filters_settings[element.name] = element.value;
        }
    }

    store.goodsItems = loadDataStore();
    store.filteredGoodsItems = filterGoods(goods, filters, getSearchStringFromUrl());
    store.cart = cart;
    store.sumCartItems = sumCartItems;
    store.settings.isLSAvailabel = LS.isLSAvailabel();

    // console.log(filters);
    // console.log(getGoodsBrands(store.goodsItems), getGoodsCategorys(store.goodsItems));
    // console.log(getGoodsBrands(store.filteredGoodsItems), getGoodsCategorys(store.filteredGoodsItems));
    // console.log(getCountGoodsByFieldName(store.goodsItems, 'brand', 'msi'));
    // console.log(getCountGoodsByFieldName(store.filteredGoodsItems, 'brand', 'msi'));
    // console.log(getMinMaxByFieldName(store.goodsItems, 'price'));
    // console.log(getMinMaxByFieldName(store.filteredGoodsItems, 'price'));
}
