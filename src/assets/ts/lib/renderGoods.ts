import { store } from '../store';
import { checkElem } from '../helpers/checkers';
import { getHtmlTpl } from './getHtmlTpl';

export const isItemInStore = (itemId: number) => store.goodsItems.find((item) => item.id === itemId) !== undefined;

export async function renderGoods() {
    const url = new URL(location.href);

    const urlGoodsId = url.pathname.split('/')[2];

    // console.log(Number.isNaN(urlGoodsId));
    if (Number.isNaN(Number(urlGoodsId)) || !isItemInStore(parseInt(urlGoodsId))) location.href = `${url.origin}/404`;

    console.log(store);

    const tplToRender = 'goodsPage.html';

    const newPage = await getHtmlTpl(url.origin + '/' + tplToRender, 'page');

    const app = checkElem(document.querySelector('#app'));
    app.innerHTML = '';
    app.append(newPage);
}
