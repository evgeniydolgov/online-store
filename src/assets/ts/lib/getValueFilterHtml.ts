import { checkElem } from '../helpers/checkers';
import { getHtmlTpl } from './getHtmlTpl';

export async function getValueFilterHtml(filterData: string[], filter_titie: string) {
    const tplToRender = 'valueFilterTpl.html';

    const valueFilterHtml = await getHtmlTpl(tplToRender, 'value_filter');

    const ft = valueFilterHtml.querySelector('#filter_title');

    checkElem(ft).innerText = filter_titie;
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

                if (!input) return;

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
