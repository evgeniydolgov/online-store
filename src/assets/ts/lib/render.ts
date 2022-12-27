import { store } from '../store';
import { getCardViewFromUrl } from './cardView';
import { filterGoods, getFiltersFromUrl, getSearchStringFromUrl } from './filterGoods';
import { render404 } from './render404';
import { renderCart } from './renderCart';
import { renderGoods } from './renderGoods';
import { renderStore } from './renderStore';

export async function renderPage(tplToRender: string) {
    store.view_settings.mode = getCardViewFromUrl();
    const filters = getFiltersFromUrl();

    for (const filter in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, filter)) {
            const element = filters[filter];
            store.filters_settings[element.name] = element.value;
        }
    }

    store.filteredGoodsItems = filterGoods(store.goodsItems, filters, getSearchStringFromUrl());
    switch (tplToRender) {
        case 'store':
            await renderStore();
            break;
        case 'cart':
            await renderCart();
            break;

        case 'goods':
            await renderGoods();
            break;

        default:
            await render404();
    }
}
