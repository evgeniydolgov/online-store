import { CardView } from '../../enums/cardView';
import { GoodsItem } from '../../interfaces';
import { CardOptions } from '../../types';
import { checkElem } from '../helpers/checkers';
import { isGoodsItemInCart } from './cartFunctions';
import { handlerAddToCartClick } from './handlers';

export async function getCardHtml(cardData: GoodsItem, { view }: CardOptions) {
    const tplToRender = 'goodsCardTpl.html';

    const CARD_IDS = ['gc_title', 'gc_description', 'gc_price', 'gc_rating', 'gc_stock', 'gc_brand', 'gc_category'];

    const card = await fetch(tplToRender)
        .then((response) => response.text())
        .then((text) => {
            const domParcer = new DOMParser();
            const html = domParcer.parseFromString(text, 'text/html');
            return checkElem(html.querySelector('#goods_card'));
        });
    // console.log(options);

    if (card) {
        card.dataset.goodsId = String(cardData.id);
        if (view === CardView.tile) card.classList.add('tile_card');
        const img = checkElem(card).querySelector('#gc_image');
        if (img instanceof HTMLImageElement) {
            img.setAttribute('src', cardData.images[0]);
            img.setAttribute('alt', cardData.title);
        }

        CARD_IDS.forEach((item) => {
            checkElem(card.querySelector(`#${item}`)).innerText = String(cardData[item.slice(3)]);
        });
    }

    const btnAddToCart = checkElem(card.querySelector('#btn_add_to_cart'));
    const btnMoreInfo = card.querySelector('#btn_more_info');

    if (btnMoreInfo instanceof HTMLAnchorElement) btnMoreInfo.href = `/goods/${cardData.id}`;

    const goodsItemInCart = isGoodsItemInCart(cardData.id);

    btnAddToCart.dataset.btnTitle = goodsItemInCart ? 'Удалить из корзины' : 'Добавить в корзину';
    btnAddToCart.dataset.btnGoodsId = String(cardData.id);

    if (goodsItemInCart) btnAddToCart.classList.add('in-cart');

    btnAddToCart.addEventListener('click', handlerAddToCartClick);

    return card;
}
