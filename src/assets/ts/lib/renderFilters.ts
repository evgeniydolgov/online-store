import { dualRangeSlider } from '../helpers/slide_functions';
import { store } from '../store';
import { getMinMaxByFieldName, setFiltredItemsToStore } from './filterGoods';
import { getHtmlTpl } from './getHtmlTpl';
import { getRangeFilterHtml } from './getRangeFilterHtml';
import { getValueFilterHtml } from './getValueFilterHtml';
import { handlerSearchFieldKeyUp } from './handlers';
import { renderRangeFiltersStats } from './renderRangeFiltersStats';

export const renderValueFilters = async () => {
    setFiltredItemsToStore();

    const tplToRender = 'valueFilterTpl.html';

    const valueFilterHtml = await getHtmlTpl(tplToRender, 'value_filter');

    const cloneBrandFilter = valueFilterHtml.cloneNode(true);
    if (!(cloneBrandFilter instanceof HTMLElement)) throw new Error('Cant clone node');

    const brand_filter = await getValueFilterHtml(store.filters_settings.all_brand, cloneBrandFilter, {
        filter_title: 'Брэнды',
        filter_name: 'brand',
        filter_settings: store.filters_settings._brand,
        goods: store.goodsItems,
        filtredGoods: store.filteredGoodsItems,
    });

    const cloneCategoryFilter = valueFilterHtml.cloneNode(true);
    if (!(cloneCategoryFilter instanceof HTMLElement)) throw new Error('Cant clone node');

    const category_filter = await getValueFilterHtml(store.filters_settings.all_category, cloneCategoryFilter, {
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
    const tplToRender = 'rangeFilterTpl.html';

    const rangeFilterHtml = await getHtmlTpl(tplToRender, 'range_filter');

    const clonePriceFilter = rangeFilterHtml.cloneNode(true);
    if (!(clonePriceFilter instanceof HTMLElement)) throw new Error('Cant clone node');

    const price_filter = await getRangeFilterHtml(store.filters_settings.price, clonePriceFilter, {
        filter_title: 'Цена',
        filter_name: 'price',
        filter_settings: store.filters_settings.minMaxPrice,
    });

    const cloneStockFilter = rangeFilterHtml.cloneNode(true);
    if (!(cloneStockFilter instanceof HTMLElement)) throw new Error('Cant clone node');

    const stock_filter = await getRangeFilterHtml(store.filters_settings.stock, cloneStockFilter, {
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
};
