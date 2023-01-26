import { store } from '../store';
import { checkElem } from '../helpers/checkers';
import { getGoodsPageCardHtml } from './getGoodsPageCardHtml';

export const isItemInStore = (itemId: number) => store.goodsItems.find((item) => item.id === itemId) !== undefined;

export async function renderGoods() {
    const url = new URL(location.href);

    const urlGoodsId = url.pathname.split('/')[2];

    if (Number.isNaN(Number(urlGoodsId)) || !isItemInStore(parseInt(urlGoodsId))) location.href = `${url.origin}/404`;

    const cardData = store.goodsItems.find((item) => item.id === parseInt(urlGoodsId));

    if (cardData === undefined) {
        location.href = `${url.origin}/404`;
        throw new Error('404');
    }

    const newPage = await getGoodsPageCardHtml(cardData);

    const app = checkElem(document.querySelector('#app'));
    app.innerHTML = '';
    app.append(newPage);
}
