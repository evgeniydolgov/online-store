import { store } from '../store';
import { getMinMaxByFieldName } from './filterGoods';

export const renderGoodsCount = async () => {
    const renderDiv = document.querySelector('#find_goods');

    const priceMinMax = getMinMaxByFieldName(store.filteredGoodsItems, 'price');

    if (renderDiv) {
        const renderStr =
            store.filteredGoodsItems.length > 0
                ? `Найдено товаров: ${store.filteredGoodsItems.length} Цена: от ${priceMinMax[0]} до ${priceMinMax[1]}`
                : 'Товаров не найдено...';
        renderDiv.innerHTML = renderStr;
    }
};
