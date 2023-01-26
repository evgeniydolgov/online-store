import { FilterRangeOptions } from '../../types';
import { checkElem } from '../helpers/checkers';

export const getRangeFilterHtml = async (
    filterData: string[],
    rangeFilterHtml: HTMLElement,
    options: FilterRangeOptions
) => {
    const filterTitle = rangeFilterHtml.querySelector('#filter_title');

    const { filter_title, filter_name, filter_settings } = options;

    checkElem(filterTitle).innerText = filter_title;
    checkElem(filterTitle).setAttribute('id', Date.now().toString());

    if (!(rangeFilterHtml instanceof HTMLElement)) throw new Error('No range filter in getRangeFilterHtml.ts');

    rangeFilterHtml.setAttribute('id', `range_filter_${filter_name}`);

    const range_slider = rangeFilterHtml.querySelector('#range_slider');

    if (!(range_slider instanceof HTMLDivElement)) throw new Error('No slider in range slider template');

    range_slider.setAttribute('id', `range_slider_${filter_name}`);

    range_slider.dataset.min = filter_settings[0];
    range_slider.dataset.max = filter_settings[1];

    const min_value = rangeFilterHtml.querySelector('#min_');
    const max_value = rangeFilterHtml.querySelector('#max_');

    const current_min = rangeFilterHtml.querySelector('.handle.left');
    const current_max = rangeFilterHtml.querySelector('.handle.right');

    const filter_info = rangeFilterHtml.querySelector('#range_filter_info_');

    if (
        !(min_value instanceof HTMLDivElement) ||
        !(max_value instanceof HTMLDivElement) ||
        !(filter_info instanceof HTMLDivElement)
    )
        throw new Error('Cant find min, max value divs in html template');

    if (!(current_min instanceof HTMLSpanElement) || !(current_max instanceof HTMLSpanElement))
        throw new Error('Cant find current min, max in template');

    current_min.dataset.value = filterData[0];
    current_max.dataset.value = filterData[1];

    min_value.innerText = filter_settings[0];
    max_value.innerText = filter_settings[1];

    min_value.setAttribute('id', `min_${filter_name}`);
    max_value.setAttribute('id', `max_${filter_name}`);
    filter_info.setAttribute('id', `range_filter_info_${filter_name}`);

    return rangeFilterHtml;
};
