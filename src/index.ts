import './assets/scss/styles.scss';
import { changePage } from './assets/ts/helpers/router';
import { handlerDocumentClick } from './assets/ts/lib/handlers';
import { initStore } from './assets/ts/lib/initStore';

window.addEventListener('popstate', () => {
    // console.log('popstate', location.href);
    changePage(location.href);
    // console.log(location.pathname);
});

window.addEventListener('load', () => {
    // if (document.referrer) {
    //   let url = document.referrer.split('');
    //   url = url.splice(0, url.lastIndexOf('/') + 1).join('');
    //   if (url === location.href) {
    //     changePage(document.referrer);
    //     history.pushState(null, null, document.referrer);
    //     return;
    //   }
    // }
    changePage(location.href);
    // history.pushState(null, '', new URL(location.href));
});

window.addEventListener('DOMContentLoaded', () => {
    initStore();
    document.addEventListener('click', handlerDocumentClick);
});
// addHandlersToMenu(getMenuItems());
