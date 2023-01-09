import { GoodsItem } from '../../interfaces';
import { LS } from './localstorage';
import { store } from '../store';
import { loadDataStore } from './loadData';
import { updateCartInfo } from './cartFunctions';
import { getMinMaxByFieldName, setFiltredItemsToStore } from './filterGoods';
import { getPromoCodes } from './getPromoCodes';

const getGoodsBrands = (goods: GoodsItem[]) => Array.from(new Set(goods.map((goodsItem) => String(goodsItem.brand))));

const getGoodsCategories = (goods: GoodsItem[]) =>
    Array.from(new Set(goods.map((goodsItem) => String(goodsItem.category))));

export function initStore() {
    store.settings.isLSAvailabel = LS.isLSAvailabel();

    store.promoCodes = getPromoCodes();

    store.goodsItems = loadDataStore();

    const cart = LS.loadCartDataFromLS() || {};

    store.cart = cart;
    updateCartInfo();

    setFiltredItemsToStore();

    store.filters_settings.all_brand = getGoodsBrands(store.goodsItems);
    store.filters_settings.all_category = getGoodsCategories(store.goodsItems);

    store.filters_settings.minMaxPrice = getMinMaxByFieldName(store.filteredGoodsItems, 'price');
    store.filters_settings.minMaxStock = getMinMaxByFieldName(store.filteredGoodsItems, 'stock');

    store.filters_settings.price = [...store.filters_settings.minMaxPrice];
    store.filters_settings.stock = [...store.filters_settings.minMaxStock];
}
