import { GoodsItem } from '../../interfaces';
import { formatSum } from '../helpers';
import { checkElem } from '../helpers/checkers';
import { isGoodsItemInCart } from './cartFunctions';
import { getHtmlTpl } from './getHtmlTpl';
import { handlerAddToCartClick, handlerFastBuyClick, handlerThumbsImageClick } from './handlers';

export async function getGoodsPageCardHtml(cardData: GoodsItem) {
    const url = new URL(location.href);

    const tplToRender = `${url.origin}/goodsPage.html`;

    const CARD_IDS = ['gc_title', 'gc_description', 'gc_price', 'gc_rating', 'gc_stock', 'gc_brand', 'gc_category'];

    const card = await getHtmlTpl(tplToRender, 'page');

    if (card) {
        card.dataset.goodsId = String(cardData.id);
        const img = checkElem(card).querySelector('#gc_image');
        if (img instanceof HTMLImageElement) {
            img.setAttribute('src', cardData.images[0]);
            img.setAttribute('alt', cardData.title);
        }

        const breadcrumbs = [
            { title: 'Store', link: '/' },
            { title: cardData.category, link: `/?_category=${cardData.category}` },
            { title: cardData.brand, link: `/?_brand=${cardData.brand}` },
            { title: cardData.title, link: null },
        ];

        const breadcrumbsHtml = breadcrumbs.map((crumbData) => {
            const newCrumb = document.createElement('li');

            if (crumbData.link !== null) {
                const newAnchor = document.createElement('a');

                newAnchor.href = crumbData.link;

                newAnchor.innerText = crumbData.title;

                newAnchor.classList.add('card_link');

                newCrumb.append(newAnchor);
            } else {
                newCrumb.append(crumbData.title);
            }

            newCrumb.classList.add('crumb');

            return newCrumb;
        });

        const breadcrumbsUl = card.querySelector('#breadcrumbs');

        if (!(breadcrumbsUl instanceof HTMLUListElement)) throw new Error('Cant find UL for breadcrumbs');

        breadcrumbsUl.append(...breadcrumbsHtml);

        const thumbs_imgs_html = cardData.images.map((imgPath) => {
            const newImg = document.createElement('img');
            newImg.dataset.pathToImg = imgPath;
            newImg.setAttribute('src', imgPath);
            newImg.setAttribute('alt', cardData.title);
            newImg.classList.add('card_thumbs_img');

            newImg.addEventListener('click', handlerThumbsImageClick);
            return newImg;
        });

        const thumbs_images = card.querySelector('#thumbs_images');

        if (!(thumbs_images instanceof HTMLDivElement)) throw new Error('Cant find div for thumbs images');

        thumbs_images.append(...thumbs_imgs_html);

        CARD_IDS.forEach((item) => {
            const currElem = checkElem(card.querySelector(`#${item}`));
            if (item !== 'gc_price') currElem.innerText = cardData[item.slice(3)].toString();
            else currElem.innerText = formatSum(parseInt(cardData[item.slice(3)].toString()), 0);
        });
    }

    const btnAddToCart = checkElem(card.querySelector('#btn_add_to_cart'));
    const btnFastBuy = checkElem(card.querySelector('#btn_add_to_cart_and_buy'));

    const goodsItemInCart = isGoodsItemInCart(cardData.id);

    btnAddToCart.dataset.btnTitle = goodsItemInCart ? 'Удалить из корзины' : 'Добавить в корзину';
    btnAddToCart.dataset.btnGoodsId = String(cardData.id);

    btnFastBuy.dataset.btnGoodsId = String(cardData.id);

    if (goodsItemInCart) btnAddToCart.classList.add('in-cart');

    btnAddToCart.addEventListener('click', handlerAddToCartClick);
    btnFastBuy.addEventListener('click', handlerFastBuyClick);

    return card;
}
