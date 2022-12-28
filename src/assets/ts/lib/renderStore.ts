import { store } from '../store';
import { checkElem } from '../helpers/checkers';

import { handlerViewSwitch } from './handlers';
import { renderShopCards } from './renderShopCards';
import { renderFilters } from './renderFilters';
import { renderGoodsCount } from './renderGoodsCount';

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

    const view = store.view_settings.mode;

    const viewSwithcer = checkElem(newPage.querySelector(`#radio-${view}`));

    if (viewSwithcer instanceof HTMLInputElement) viewSwithcer.checked = true;

    newPage.querySelector('#select-shop-view')?.addEventListener('click', handlerViewSwitch);

    // for (let i = 0; i < store.filteredGoodsItems.length; i++)
    //     goodsCardsHtmlArr.push(await getCardHtml(store.filteredGoodsItems[i], { view }));

    app.innerHTML = '';
    app.append(checkElem(newPage));

    await renderShopCards('#goods');
    await renderFilters();
    await renderGoodsCount();
}
