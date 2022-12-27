import { store } from '../store';
import { getValueFilterHtml } from './getValueFilterHtml';

export const renderFilters = async () => {
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

    // console.log(brand_filter);
    const filtersDiv = document.querySelector('#shop_filters');

    const filtersArr: HTMLElement[] = [];

    if (brand_filter) filtersArr.push(brand_filter);
    if (category_filter) filtersArr.push(category_filter);

    if (filtersDiv) {
        filtersDiv.innerHTML = '';
        filtersDiv.append(...filtersArr);
    }
};
