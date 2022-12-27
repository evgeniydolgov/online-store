import { store } from '../store';

export const renderGoodsCount = async () => {
    const renderDiv = document.querySelector('#find_goods');

    if (renderDiv) {
        renderDiv.innerHTML = `Найдено товаров: ${store.filteredGoodsItems.length}`;
    }
};
