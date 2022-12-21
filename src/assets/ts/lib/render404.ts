import { store } from '../store';
import { checkElem } from '../helpers/checkers';

export async function render404() {
    console.log(store);

    const tplToRender = '404Page.html';
    const newPage = await fetch(tplToRender)
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
