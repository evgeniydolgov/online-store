import { store } from '../store';
import { setFiltredItemsToStore } from './filterGoods';
import { getCardHtml } from './getCardHtml';
import { renderRangeFiltersStats } from './renderRangeFiltersStats';
import { sortByPrice, sortByRating, sortByTitle } from './sortGoods';

export const renderShopCards = async (goodsRenderId: string) => {
    const goodsDiv = document.querySelector(goodsRenderId);

    const view = store.view_settings.mode;

    const goodsCardsHtmlArr: HTMLElement[] = [];

    setFiltredItemsToStore();

    switch (store.sort_settings.field_name) {
        case 'title':
            sortByTitle(store.sort_settings.direction);
            break;

        case 'price':
            sortByPrice(store.sort_settings.direction);
            break;

        case 'rating':
            sortByRating(store.sort_settings.direction);
            break;

        default:
            sortByTitle(store.sort_settings.direction);
            break;
    }

    for (let i = 0; i < store.filteredGoodsItems.length; i++)
        goodsCardsHtmlArr.push(await getCardHtml(store.filteredGoodsItems[i], { view }));

    if (goodsDiv) {
        goodsDiv.innerHTML = '';
        goodsDiv.append(...goodsCardsHtmlArr);
    }

    renderRangeFiltersStats('price');
    renderRangeFiltersStats('stock');
};
