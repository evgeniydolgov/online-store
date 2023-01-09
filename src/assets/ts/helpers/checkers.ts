function checkElem<T extends HTMLTemplateElement | null>(elem: T): HTMLTemplateElement;
function checkElem<T extends HTMLElement | null>(elem: T): HTMLElement;
function checkElem<T extends Element | null>(elem: T): HTMLElement;
function checkElem<T extends EventTarget | null>(elem: T): HTMLElement {
    if (!(elem instanceof EventTarget)) throw new Error(`${elem} : element null or undefined`);
    if (elem instanceof HTMLTemplateElement) return elem;
    if (elem instanceof HTMLElement) return elem;
    if (elem instanceof Element) return <HTMLElement>elem;
    return <HTMLElement>elem;
}

function checkEventTarget(eventTarget: EventTarget | null): HTMLElement {
    if (!(eventTarget instanceof EventTarget)) throw new Error(`${eventTarget} : element null or undefined`);
    if (eventTarget instanceof HTMLElement) return <HTMLElement>eventTarget;
    return <HTMLElement>eventTarget;
}

export { checkElem, checkEventTarget };
