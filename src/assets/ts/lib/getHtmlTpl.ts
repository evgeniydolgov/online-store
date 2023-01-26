import { checkElem } from '../helpers/checkers';

export const getHtmlTpl = async (tplToRender: string, returnId: string) =>
    await fetch(tplToRender)
        .then((response) => response.text())
        .then((text) => {
            const domParcer = new DOMParser();
            const html = domParcer.parseFromString(text, 'text/html');
            return checkElem(html.querySelector(`#${returnId}`));
        });
