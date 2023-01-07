import { getHtmlTpl } from './getHtmlTpl';
import { handlerSortSelectChange } from './handlers';

export const getSortSelectHtml = async (value: string) => {
    const tplToRender = 'sortSelectTpl.html';

    const sortSelectHtml = await getHtmlTpl(tplToRender, 'sort');

    const select = sortSelectHtml.querySelector('#sort_select');

    if (!(select instanceof HTMLSelectElement)) throw new Error('Cant find select element for sortSelect');

    select.value = value;

    select.addEventListener('change', handlerSortSelectChange);

    return sortSelectHtml;
};
