import { store } from '../store';
import { checkElem } from '../helpers/checkers';
import { dualRangeSlider } from '../helpers/slide_finctions';
import { getCard } from './getCard';

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

    const cardData = store.filteredGoodsItems[0];

    const card = await getCard(cardData);

    checkElem(newPage).append(checkElem(card));

    const app = checkElem(document.querySelector('#app'));
    app.innerHTML = '';
    app.append(checkElem(newPage));

    new dualRangeSlider(document.getElementById('range-slider-price') as HTMLElement, 'min_price', 'max_price');
    new dualRangeSlider(document.getElementById('range-slider-stock') as HTMLElement, 'min_stock', 'max_stock');
}
