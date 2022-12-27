import { store } from '../store';
import { checkElem } from '../helpers/checkers';
// import { dualRangeSlider } from '../helpers/slide_finctions';

import { handlerViewSwitch } from './handlers';
import { getValueFilterHtml } from './getValueFilterHtml';
import { renderShopCards } from './renderShopCards';

export async function renderStore() {
    console.log(store);

    const tplToRender = 'storePage.html';
    let newPage = await fetch(tplToRender)
        .then((response) => response.text())
        .then((text) => {
            const domParcer = new DOMParser();
            const html = domParcer.parseFromString(text, 'text/html');
            return html.querySelector('#page');
        });

    newPage = checkElem(newPage);

    const app = checkElem(document.querySelector('#app'));

    const view = store.view_settings.mode;

    const viewSwithcer = checkElem(newPage.querySelector(`#radio-${view}`));

    if (viewSwithcer instanceof HTMLInputElement) viewSwithcer.checked = true;

    newPage.querySelector('#select-shop-view')?.addEventListener('click', handlerViewSwitch);

    // for (let i = 0; i < store.filteredGoodsItems.length; i++)
    //     goodsCardsHtmlArr.push(await getCardHtml(store.filteredGoodsItems[i], { view }));

    // render filters ===============================================================================

    const brand_filter = await getValueFilterHtml(store.filters_settings.all_brand, {
        filter_title: 'Брэнды',
        filter_name: 'brand',
        filter_settings: store.filters_settings._brand,
        goods: store.goodsItems,
        filtredGoods: store.filteredGoodsItems,
    });

    const category_filter = await getValueFilterHtml(store.filters_settings.all_category, {
        filter_title: 'Категории',
        filter_name: 'category',
        filter_settings: store.filters_settings._category,
        goods: store.goodsItems,
        filtredGoods: store.filteredGoodsItems,
    });

    // console.log(brand_filter);
    const filtersDiv = checkElem(newPage).querySelector('#shop_filters');

    const filtersArr: HTMLElement[] = [];

    if (brand_filter) filtersArr.push(brand_filter);
    if (category_filter) filtersArr.push(category_filter);

    if (filtersDiv) filtersDiv.append(...filtersArr);

    // render filters ===============================================================================

    // console.log(brand_filter);

    checkElem(
        checkElem(newPage).querySelector('#find_goods')
    ).innerText = `Найдено товаров: ${store.filteredGoodsItems.length}`;

    app.innerHTML = '';
    app.append(checkElem(newPage));
    await renderShopCards('#goods');

    // new dualRangeSlider(document.getElementById('range-slider-price') as HTMLElement, 'min_price', 'max_price');
    // new dualRangeSlider(document.getElementById('range-slider-stock') as HTMLElement, 'min_stock', 'max_stock');
}
