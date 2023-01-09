import { checkElem } from '../helpers/checkers';
import { getHtmlTpl } from './getHtmlTpl';

export async function render404() {
    const url = new URL(location.href);

    const tplToRender = `404Page.html`;

    const newPage = await getHtmlTpl(url.origin + '/' + tplToRender, 'page');

    const app = checkElem(document.querySelector('#app'));
    app.innerHTML = '';
    app.append(newPage);
}
