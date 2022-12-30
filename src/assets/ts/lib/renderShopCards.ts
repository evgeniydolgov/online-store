import { store } from '../store';
import { setFiltredItemsToStore } from './filterGoods';
import { getCardHtml } from './getCardHtml';
import { renderRangeFiltersStats } from './renderRangeFiltersStats';

export const renderShopCards = async (goodsRenderId: string) => {
    const goodsDiv = document.querySelector(goodsRenderId);

    const view = store.view_settings.mode;

    const goodsCardsHtmlArr: HTMLElement[] = [];

    setFiltredItemsToStore();

    for (let i = 0; i < store.filteredGoodsItems.length; i++)
        goodsCardsHtmlArr.push(await getCardHtml(store.filteredGoodsItems[i], { view }));

    if (goodsDiv) {
        goodsDiv.innerHTML = '';
        goodsDiv.append(...goodsCardsHtmlArr);
    }

    renderRangeFiltersStats('price');
    renderRangeFiltersStats('stock');
};
