import { CardView } from '../../enums/cardView';
import { GoodsItem } from '../../interfaces';
import { CardOptions } from '../../types';
import { formatSum } from '../helpers';
import { checkElem } from '../helpers/checkers';
import { isGoodsItemInCart } from './cartFunctions';
import { handlerAddToCartClick } from './handlers';

export async function getCardHtml(cardData: GoodsItem, card: HTMLElement, { view }: CardOptions) {
    const CARD_IDS = ['gc_title', 'gc_description', 'gc_price', 'gc_rating', 'gc_stock', 'gc_brand', 'gc_category'];

    if (card) {
        card.dataset.goodsId = String(cardData.id);
        if (view === CardView.Tile) card.classList.add('tile_card');
        const img = checkElem(card).querySelector('#gc_image');
        if (img instanceof HTMLImageElement) {
            img.setAttribute('src', cardData.images[0]);
            img.setAttribute('alt', cardData.title);
        }

        CARD_IDS.forEach((item) => {
            const currElem = checkElem(card.querySelector(`#${item}`));

            switch (item) {
                case 'gc_price':
                    currElem.innerText = formatSum(parseInt(cardData[item.slice(3)].toString()), 0);
                    break;
                case 'gc_title': {
                    const anchor = document.createElement('a');

                    anchor.href = `/goods/${cardData.id}`;
                    anchor.innerText = cardData[item.slice(3)].toString();
                    anchor.classList.add('card_link');

                    currElem.append(anchor);
                    break;
                }
                case 'gc_brand': {
                    const anchor = document.createElement('a');

                    anchor.href = `/?_brand=${cardData.brand}`;
                    anchor.innerText = cardData[item.slice(3)].toString();
                    anchor.classList.add('card_link');

                    currElem.append(anchor);
                    break;
                }

                case 'gc_category': {
                    const anchor = document.createElement('a');

                    anchor.href = `/?_category=${cardData.category}`;
                    anchor.innerText = cardData[item.slice(3)].toString();
                    anchor.classList.add('card_link');

                    currElem.append(anchor);
                    break;
                }

                default:
                    currElem.innerText = cardData[item.slice(3)].toString();
                    break;
            }
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
