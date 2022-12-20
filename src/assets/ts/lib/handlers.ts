import { checkElem, checkEventTarget } from '../helpers/checkers';
import { changePage } from '../helpers/router';

export const handlerDocumentClick = async (event: Event) => {
    const target = checkEventTarget(event.target);
    const closestAnchor = target.closest('a');

    if (!closestAnchor) return;

    const anchor = checkElem(closestAnchor).dataset.anchor;
    let href = '';
    if (anchor) {
        const thref = checkElem(closestAnchor).getAttribute('href');

        if (thref) href = thref;

        event.preventDefault();
        await changePage(href);
        history.pushState(null, '', href);
    }
};
