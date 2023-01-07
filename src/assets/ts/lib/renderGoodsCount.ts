import { store } from '../store';

export const renderGoodsCount = async () => {
    const renderDiv = document.querySelector('#find_goods');

    if (renderDiv) {
        const renderStr =
            store.filteredGoodsItems.length > 0
                ? `Найдено товаров: ${store.filteredGoodsItems.length}`
                : 'Товаров не найдено...';
        renderDiv.innerHTML = renderStr;
    }
};
