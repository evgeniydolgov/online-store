import { getHtmlTpl } from './getHtmlTpl';
import { handlerViewSwitch } from './handlers';

export const getSwitchViewHtml = async (view: string) => {
    const tplToRender = 'switchViewTpl.html';

    const switchViewHtml = await getHtmlTpl(tplToRender, 'select-shop-view');

    const viewSwithcer = switchViewHtml.querySelector(`#radio-${view}`);

    if (viewSwithcer instanceof HTMLInputElement) viewSwithcer.checked = true;

    switchViewHtml.addEventListener('click', handlerViewSwitch);

    return switchViewHtml;
};
