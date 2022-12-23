import { GoodsItem } from '../../interfaces';
import {
    filterGoods,
    // getCountGoodsByFieldName,
    getFiltersFromUrl,
    // getMinMaxByFieldName,
    getSearchStringFromUrl,
} from './filterGoods';
import { LS } from './localstorage';
import { store } from '../store';
import { loadDataStore } from './loadData';
import { getCartSum } from './cartFunctions';

const getGoodsBrands = (goods: GoodsItem[]) => Array.from(new Set(goods.map((goodsItem) => String(goodsItem.brand))));

const getGoodsCategories = (goods: GoodsItem[]) =>
    Array.from(new Set(goods.map((goodsItem) => String(goodsItem.category))));

export function initStore() {
    store.settings.isLSAvailabel = LS.isLSAvailabel();

    store.goodsItems = loadDataStore();

    const cart = LS.loadCartDataFromLS() || {};

    store.cart = cart;
    store.sumCartItems = getCartSum(cart);

    store.filters_settings.all_brand = getGoodsBrands(store.goodsItems);
    store.filters_settings.all_category = getGoodsCategories(store.goodsItems);

    const filters = getFiltersFromUrl();

    for (const filter in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, filter)) {
            const element = filters[filter];
            store.filters_settings[element.name] = element.value;
        }
    }

    store.filteredGoodsItems = filterGoods(store.goodsItems, filters, getSearchStringFromUrl());

    LS.saveCartDataToLS({ '1': '2', '5': '2' }); //fake data

    // console.log(filters);
    // console.log(getGoodsBrands(store.goodsItems), getGoodsCategories(store.goodsItems));
    // console.log(getGoodsBrands(store.filteredGoodsItems), getGoodsCategories(store.filteredGoodsItems));
    // console.log(getCountGoodsByFieldName(store.goodsItems, 'brand', 'msi'));
    // console.log(getCountGoodsByFieldName(store.filteredGoodsItems, 'brand', 'msi'));
    // console.log(getMinMaxByFieldName(store.goodsItems, 'price'));
    // console.log(getMinMaxByFieldName(store.filteredGoodsItems, 'price'));
}
