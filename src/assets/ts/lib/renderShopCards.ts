import { store } from '../store';
import { filterGoods, getFiltersFromUrl, getSearchStringFromUrl } from './filterGoods';
import { getCardHtml } from './getCardHtml';

export const renderShopCards = async (goodsRenderId: string) => {
    const goodsDiv = document.querySelector(goodsRenderId);

    const view = store.view_settings.mode;

    const goodsCardsHtmlArr: HTMLElement[] = [];

    const filters = getFiltersFromUrl();

    for (const filter in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, filter)) {
            const element = filters[filter];
            store.filters_settings[element.name] = element.value;
        }
    }

    store.filteredGoodsItems = filterGoods(store.goodsItems, filters, getSearchStringFromUrl());

    // console.log('render cards');

    for (let i = 0; i < store.filteredGoodsItems.length; i++)
        goodsCardsHtmlArr.push(await getCardHtml(store.filteredGoodsItems[i], { view }));

    if (goodsDiv) {
        goodsDiv.innerHTML = '';
        goodsDiv.append(...goodsCardsHtmlArr);
    }
};
