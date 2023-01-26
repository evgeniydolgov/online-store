import { store } from '../store';
import { setFiltredItemsToStore } from './filterGoods';
import { getCardHtml } from './getCardHtml';
import { getHtmlTpl } from './getHtmlTpl';
import { renderRangeFiltersStats } from './renderRangeFiltersStats';

export const renderShopCards = async (goodsRenderId: string) => {
    const goodsDiv = document.querySelector(goodsRenderId);

    const view = store.view_settings.mode;

    const goodsCardsHtmlArr: HTMLElement[] = [];

    const tplToRender = 'goodsCardTpl.html';

    const cardHtml = await getHtmlTpl(tplToRender, 'goods_card');

    setFiltredItemsToStore();

    for (let i = 0; i < store.filteredGoodsItems.length; i++) {
        const clone = cardHtml.cloneNode(true);
        if (!(clone instanceof HTMLElement)) throw new Error('Cant clone node');
        goodsCardsHtmlArr.push(await getCardHtml(store.filteredGoodsItems[i], clone, { view }));
    }

    if (goodsDiv) {
        goodsDiv.innerHTML = '';
        if (goodsCardsHtmlArr.length === 0) {
            const nothingFindDiv = document.createElement('div');

            nothingFindDiv.innerText =
                'Совсем ничего не нашлось... Возможно, все видяшки раскупили майнеры... Эх, а помните времена были... Майнеров не было... Видяшки дешовые были... Попробуйте изменить настроки фильтра! Или поиска...';
            nothingFindDiv.classList.add('nothing_find_class');

            goodsDiv.append(nothingFindDiv);
        }
        goodsDiv.append(...goodsCardsHtmlArr);
    }

    renderRangeFiltersStats('price');
    renderRangeFiltersStats('stock');
};
