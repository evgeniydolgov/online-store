import { store } from '../store';
import { checkElem } from '../helpers/checkers';

import { renderShopCards } from './renderShopCards';
import { renderFilters } from './renderFilters';
import { renderGoodsCount } from './renderGoodsCount';
import { renderSwitchView } from './renderSwitchView';
import { handlerResetFiltersButtonClick } from './handlers';

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

    const resetFilterBtn = newPage.querySelector('#reset_filters');

    if (!(resetFilterBtn instanceof HTMLButtonElement)) throw new Error('Cant find resetFilters button');

    resetFilterBtn.addEventListener('click', handlerResetFiltersButtonClick);

    const app = checkElem(document.querySelector('#app'));

    app.innerHTML = '';
    app.append(checkElem(newPage));

    await renderFilters();
    await renderShopCards('#goods');
    await renderGoodsCount();
    await renderSwitchView();

    // store.sliders = sliders;
}
