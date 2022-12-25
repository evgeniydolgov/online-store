import { store } from '../store';
import { checkElem } from '../helpers/checkers';

export async function renderGoods() {
    console.log(store);

    const tplToRender = 'goodsPage.html';
    const url = new URL(location.href);
    const newPage = await fetch(url.origin + '/' + tplToRender)
        .then((response) => response.text())
        .then((text) => {
            const domParcer = new DOMParser();
            const html = domParcer.parseFromString(text, 'text/html');
            return html.querySelector('#page');
        });

    const app = checkElem(document.querySelector('#app'));
    app.innerHTML = '';
    app.append(checkElem(newPage));
}
