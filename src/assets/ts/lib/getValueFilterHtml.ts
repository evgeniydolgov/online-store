import { GoodsItem } from '../../interfaces';
import { checkElem } from '../helpers/checkers';
import { getCountGoodsByFieldName } from './filterGoods';
import { getHtmlTpl } from './getHtmlTpl';

type OptionsValueFilter = { filter_title: string; filter_name: string; goods: GoodsItem[]; filtredGoods: GoodsItem[] };

export async function getValueFilterHtml(filterData: string[], options: OptionsValueFilter) {
    const tplToRender = 'valueFilterTpl.html';

    const valueFilterHtml = await getHtmlTpl(tplToRender, 'value_filter');

    const ft = valueFilterHtml.querySelector('#filter_title');

    const { filter_title, filter_name, goods, filtredGoods } = options;

    checkElem(ft).innerText = filter_title;
    checkElem(ft).setAttribute('id', Date.now().toString());

    const ul = checkElem(valueFilterHtml.querySelector('#value_list'));

    if (valueFilterHtml) {
        const liTpl = <HTMLTemplateElement>valueFilterHtml.querySelector('#value_filter_tpl');

        if (!liTpl) return;

        const tArr: DocumentFragment[] = [];

        for (let i = 0; i < filterData.length; i++) {
            const clone = liTpl.content.cloneNode(true);

            if (clone instanceof DocumentFragment) {
                const input = clone.querySelector('#visible_value');

                const count_filter_goods = clone.querySelector('#count_filter_goods');

                const total_count_filter_goods = clone.querySelector('#total_count_filter_goods');

                // getCountGoodsByFieldName

                if (!input || !count_filter_goods || !total_count_filter_goods)
                    throw new Error('cant find field in template');
                count_filter_goods.innerHTML = String(
                    getCountGoodsByFieldName(filtredGoods, filter_name, filterData[i])
                );

                total_count_filter_goods.innerHTML = String(
                    getCountGoodsByFieldName(goods, filter_name, filterData[i])
                );

                const li = checkElem(clone.querySelector('#filter_name'));

                input.setAttribute('id', `visible_value_${filterData[i]}`);

                li.innerText = filterData[i];
                li.setAttribute('id', `filter_name_${filterData[i]}`);

                tArr.push(clone);
            }
        }
        ul.append(...tArr);
    }

    return valueFilterHtml;
}
