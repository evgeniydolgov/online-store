import { store } from '../store';
import { checkElem } from '../helpers/checkers';
import { dualRangeSlider } from '../helpers/slide_finctions';
import { getCardHtml } from './getCardHtml';

export async function renderStore() {
    console.log(store);

    const tplToRender = 'storePage.html';
    const newPage = await fetch(tplToRender)
        .then((response) => response.text())
        .then((text) => {
            const domParcer = new DOMParser();
            const html = domParcer.parseFromString(text, 'text/html');
            return html.querySelector('#page');
        });

    const app = checkElem(document.querySelector('#app'));

    const goodsCardsHtmlArr: HTMLElement[] = [];

    for (let i = 0; i < store.filteredGoodsItems.length; i++)
        goodsCardsHtmlArr.push(await getCardHtml(store.filteredGoodsItems[i]));

    const goodsDiv = checkElem(newPage).querySelector('#goods');

    if (goodsDiv) goodsDiv.append(...goodsCardsHtmlArr);

    checkElem(
        checkElem(newPage).querySelector('#find_goods')
    ).innerText = `Найдено товаров: ${store.filteredGoodsItems.length}`;

    app.innerHTML = '';
    app.append(checkElem(newPage));

    new dualRangeSlider(document.getElementById('range-slider-price') as HTMLElement, 'min_price', 'max_price');
    new dualRangeSlider(document.getElementById('range-slider-stock') as HTMLElement, 'min_stock', 'max_stock');
}
