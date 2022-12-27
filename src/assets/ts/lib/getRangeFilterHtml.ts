import { OptionsFilter } from '../../types';
import { checkElem } from '../helpers/checkers';
import { getHtmlTpl } from './getHtmlTpl';

export const getRangeFilterHtml = async (filterData: string[], options: OptionsFilter) => {
    const tplToRender = 'rangeFilterTpl.html';

    const rangeFilterHtml = await getHtmlTpl(tplToRender, 'range_filter');

    const filterTitle = rangeFilterHtml.querySelector('#filter_title');

    const { filter_title, filter_name, filter_settings, goods, filtredGoods } = options;
    console.log(goods, filtredGoods);

    checkElem(filterTitle).innerText = filter_title;
    checkElem(filterTitle).setAttribute('id', Date.now().toString());

    if (!(rangeFilterHtml instanceof HTMLElement)) throw new Error('No range filter in getRangeFilterHtml.ts');

    rangeFilterHtml.setAttribute('id', `range_filter_${filter_name}`);

    const range_slider = rangeFilterHtml.querySelector('#range_slider');

    if (!(range_slider instanceof HTMLDivElement)) throw new Error('No slider in range slider template');

    range_slider.setAttribute('id', `range_slider_${filter_name}`);

    range_slider.dataset.min = filter_settings[0];
    range_slider.dataset.max = filter_settings[1];

    const min_price = rangeFilterHtml.querySelector('#min_price');
    const max_price = rangeFilterHtml.querySelector('#max_price');

    if (!(min_price instanceof HTMLDivElement) || !(max_price instanceof HTMLDivElement))
        throw new Error('No min, max divs in html template');

    min_price.innerText = filter_settings[0];
    max_price.innerText = filter_settings[1];

    return rangeFilterHtml;
};
