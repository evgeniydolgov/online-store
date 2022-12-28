// import { dualRangeSlider } from '../helpers/slide_finctions';
import { store } from '../store';
import { getMinMaxByFieldName } from './filterGoods';
import { getRangeFilterHtml } from './getRangeFilterHtml';
import { getValueFilterHtml } from './getValueFilterHtml';
import { dualRangeSlider } from '../helpers/slide_finctions';

export const renderFilters = async () => {
    store.filters_settings.minMaxPrice = getMinMaxByFieldName(store.goodsItems, 'price');
    store.filters_settings.minMaxStock = getMinMaxByFieldName(store.goodsItems, 'stock');

    const brand_filter = await getValueFilterHtml(store.filters_settings.all_brand, {
        filter_title: 'Брэнды',
        filter_name: 'brand',
        filter_settings: store.filters_settings._brand,
        goods: store.goodsItems,
        filtredGoods: store.filteredGoodsItems,
    });

    const category_filter = await getValueFilterHtml(store.filters_settings.all_category, {
        filter_title: 'Категории',
        filter_name: 'category',
        filter_settings: store.filters_settings._category,
        goods: store.goodsItems,
        filtredGoods: store.filteredGoodsItems,
    });

    const price_filter = await getRangeFilterHtml(store.filters_settings.price, {
        filter_title: 'Цена',
        filter_name: 'price',
        filter_settings: store.filters_settings.minMaxPrice,
    });

    const stock_filter = await getRangeFilterHtml(store.filters_settings.stock, {
        filter_title: 'Количество',
        filter_name: 'stock',
        filter_settings: store.filters_settings.minMaxStock,
    });

    const filtersDiv = document.querySelector('#shop_filters');

    const filtersArr: HTMLElement[] = [];

    if (brand_filter) filtersArr.push(brand_filter);
    if (category_filter) filtersArr.push(category_filter);

    if (price_filter) filtersArr.push(price_filter);
    if (stock_filter) filtersArr.push(stock_filter);

    if (filtersDiv) {
        filtersDiv.innerHTML = '';
        filtersDiv.append(...filtersArr);
    }

    const priceFilterRendered = document.getElementById('range_slider_price');
    const stockFilterRendered = document.getElementById('range_slider_stock');

    if (!(priceFilterRendered instanceof HTMLDivElement) || !(stockFilterRendered instanceof HTMLDivElement))
        throw new Error('Out of div for range filter');

    new dualRangeSlider(priceFilterRendered, 'min_price', 'max_price', 'price');
    new dualRangeSlider(stockFilterRendered, 'min_stock', 'max_stock', 'stock');
};
