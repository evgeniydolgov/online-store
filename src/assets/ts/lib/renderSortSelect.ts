import { store } from '../store';
import { getSortSelectHtml } from './getSortSelectHtml';

export const renderSortSelect = async () => {
    const sort_value = `${store.sort_settings.field_name},${store.sort_settings.direction}`;
    console.log('sort value', sort_value);

    const sortSelectHtml = await getSortSelectHtml(sort_value);

    const sortSelectDiv = document.querySelector('#sort_options');

    if (!(sortSelectDiv instanceof HTMLDivElement)) throw new Error('Cant find target div, for sortSelect render');

    sortSelectDiv.innerHTML = '';

    sortSelectDiv.append(sortSelectHtml);
};
