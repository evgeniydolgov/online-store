import { store } from '../store';
import { checkElem } from '../helpers/checkers';

import { renderShopCards } from './renderShopCards';
import { renderFilters } from './renderFilters';
import { renderGoodsCount } from './renderGoodsCount';
import { renderSwitchView } from './renderSwitchView';
import { sortGoods } from './sortGoods';
import { SortFieldType, SortOrder } from '../../enums';

export async function renderStore() {
    console.log(store);

    const tplToRender = 'storePage.html';
    let newPage = await fetch(tplToRender)
        .then((response) => response.text())
        .then((text) => {
            const domParcer = new DOMParser();
            const html = domParcer.parseFromString(text, 'text/html');
            return html.querySelector('#page');
        });

    newPage = checkElem(newPage);

    const app = checkElem(document.querySelector('#app'));

    app.innerHTML = '';
    app.append(checkElem(newPage));

    await renderFilters();
    await renderShopCards('#goods');
    await renderGoodsCount();
    await renderSwitchView();

    console.log(sortGoods(store.goodsItems, 'brand', SortFieldType.string, SortOrder.asc));

    // store.sliders = sliders;
}
