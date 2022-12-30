import { GoodsItem } from '../../interfaces';
// import // filterGoods,
// // getCountGoodsByFieldName,
// // getFiltersFromUrl,
// // getMinMaxByFieldName,
// // getSearchStringFromUrl,
// './filterGoods';
import { LS } from './localstorage';
import { store } from '../store';
import { loadDataStore } from './loadData';
import { getCartSum } from './cartFunctions';
import { getMinMaxByFieldName, setFiltredItemsToStore } from './filterGoods';
import { getPromoCodes } from './getPromoCodes';
// import { getCardViewFromUrl } from './cardView';

const getGoodsBrands = (goods: GoodsItem[]) => Array.from(new Set(goods.map((goodsItem) => String(goodsItem.brand))));

const getGoodsCategories = (goods: GoodsItem[]) =>
    Array.from(new Set(goods.map((goodsItem) => String(goodsItem.category))));

export function initStore() {
    store.settings.isLSAvailabel = LS.isLSAvailabel();
    // store.view_settings.mode = getCardViewFromUrl();

    store.promoCodes = getPromoCodes();

    store.goodsItems = loadDataStore();

    const cart = LS.loadCartDataFromLS() || {};

    store.cart = cart;
    store.sumCartItems = getCartSum(cart);

    setFiltredItemsToStore();

    store.filters_settings.all_brand = getGoodsBrands(store.goodsItems);
    store.filters_settings.all_category = getGoodsCategories(store.goodsItems);

    store.filters_settings.minMaxPrice = getMinMaxByFieldName(store.filteredGoodsItems, 'price');
    store.filters_settings.minMaxStock = getMinMaxByFieldName(store.filteredGoodsItems, 'stock');

    store.filters_settings.price = [...store.filters_settings.minMaxPrice];
    store.filters_settings.stock = [...store.filters_settings.minMaxStock];

    // LS.saveCartDataToLS({ '1': '2', '5': '2' }); //fake data

    // console.log(filters);
    // console.log(getGoodsBrands(store.goodsItems), getGoodsCategories(store.goodsItems));
    // console.log(getGoodsBrands(store.filteredGoodsItems), getGoodsCategories(store.filteredGoodsItems));
    // console.log(getCountGoodsByFieldName(store.goodsItems, 'brand', 'msi'));
    // console.log(getCountGoodsByFieldName(store.filteredGoodsItems, 'brand', 'msi'));
    // console.log(getMinMaxByFieldName(store.goodsItems, 'price'));
    // console.log(getMinMaxByFieldName(store.filteredGoodsItems, 'price'));
}
