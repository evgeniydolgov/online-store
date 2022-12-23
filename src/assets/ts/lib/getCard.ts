import { GoodsItem } from '../../interfaces';
import { checkElem } from '../helpers/checkers';

export async function getCard(cardData: GoodsItem, options?: Record<string, string>) {
    const tplToRender = 'goodsCardTpl.html';

    const card = await fetch(tplToRender)
        .then((response) => response.text())
        .then((text) => {
            const domParcer = new DOMParser();
            const html = domParcer.parseFromString(text, 'text/html');
            return html.querySelector('#goods_card');
        });

    console.log(card);
    const img = checkElem(card).querySelector('#gc_image');
    const img1 = await fetch('../images/gigabyte3090.webp');
    console.log(img1);
    if (img instanceof HTMLImageElement) img.setAttribute('src', '../images/gigabyte3090.webp');
    console.log(cardData, options);
    return card;
}
