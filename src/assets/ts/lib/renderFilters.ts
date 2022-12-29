// import { dualRangeSlider } from '../helpers/slide_finctions';
import { dualRangeSlider } from '../helpers/slide_finctions';
import { store } from '../store';
import { getMinMaxByFieldName, setFiltredItemsToStore } from './filterGoods';
import { getRangeFilterHtml } from './getRangeFilterHtml';
import { getValueFilterHtml } from './getValueFilterHtml';
import { renderRangeFiltersStats } from './renderRangeFiltersStats';

// import { dualRangeSlider } from '../helpers/slide_finctions';

export const renderValueFilters = async () => {
    setFiltredItemsToStore();
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

    const filtersArr: HTMLElement[] = [];

    const filtersDiv = document.querySelector('#shop_filters_value');

    if (brand_filter) filtersArr.push(brand_filter);
    if (category_filter) filtersArr.push(category_filter);

    if (filtersDiv) {
        filtersDiv.innerHTML = '';
        filtersDiv.append(...filtersArr);
    }
};

export const renderRangeFilters = async () => {
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

    const filtersDiv = document.querySelector('#shop_filters_range');

    const filtersArr: HTMLElement[] = [];

    if (price_filter) filtersArr.push(price_filter);
    if (stock_filter) filtersArr.push(stock_filter);

    if (filtersDiv) {
        filtersDiv.innerHTML = '';
        filtersDiv.append(...filtersArr);
    }
};

export const renderFilters = async () => {
    const url = new URL(location.href);

    const search = url.searchParams.get('search');
    const search_field = document.querySelector('#search_field');
    console.log(search_field);

    if (!(search_field instanceof HTMLInputElement)) throw new Error('Cant find search field div #search_field');

    if (search) search_field.value = search;

    search_field.addEventListener('keyup', handlerSearchFieldKeyUp);

    store.filters_settings.minMaxPrice = getMinMaxByFieldName(store.goodsItems, 'price');
    store.filters_settings.minMaxStock = getMinMaxByFieldName(store.goodsItems, 'stock');

    await renderValueFilters();

    await renderRangeFilters();

    await renderRangeFiltersStats('price');
    await renderRangeFiltersStats('stock');

    const priceFilterRendered = document.getElementById('range_slider_price');
    const stockFilterRendered = document.getElementById('range_slider_stock');

    if (!(priceFilterRendered instanceof HTMLDivElement) || !(stockFilterRendered instanceof HTMLDivElement))
        throw new Error('Out of div for range filter');

    new dualRangeSlider(priceFilterRendered, 'min_price', 'max_price', 'price');
    new dualRangeSlider(stockFilterRendered, 'min_stock', 'max_stock', 'stock');

    // return {
    //     priceSlider,
    //     stockSlider,
    // };
};
