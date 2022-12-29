import { store } from '../store';
import { getMinMaxByFieldName } from './filterGoods';

export const renderRangeFiltersStats = async (filterName: string) => {
    const rangeFilterInfoDiv = document.querySelector(`#range_filter_info_${filterName}`);

    if (!(rangeFilterInfoDiv instanceof HTMLDivElement))
        throw new Error(`Cant find range filter div #range_filter_info_${filterName}`);

    const filterInfo = getMinMaxByFieldName(store.filteredGoodsItems, filterName);

    let infoString = 'Ничего не найдено...';

    if (parseInt(filterInfo[0]) === parseInt(filterInfo[1]) && parseInt(filterInfo[1]) !== 0)
        infoString = `${filterInfo[0]}`;
    else if (!(parseInt(filterInfo[0]) === 0 || parseInt(filterInfo[1]) === 0))
        infoString = `${filterInfo[0]} - ${filterInfo[1]}`;

    rangeFilterInfoDiv.innerHTML = '';

    rangeFilterInfoDiv.append(infoString);
};
