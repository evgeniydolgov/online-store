import './assets/scss/styles.scss';
import { changePage } from './assets/ts/helpers/router';
import { handlerDocumentClick } from './assets/ts/lib/handlers';
import { initStore } from './assets/ts/lib/initStore';


window.addEventListener('popstate', () => {
    changePage(location.href);
});

window.addEventListener('load', () => {
    changePage(location.href);
});

window.addEventListener('DOMContentLoaded', () => {
    initStore();
    document.addEventListener('click', handlerDocumentClick);
});
