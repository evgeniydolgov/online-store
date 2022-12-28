import { goods } from "../goods/goodsArray";
import { store } from "../store";
import { handlerButtonClick } from "./handlers";

export function displayShowListPagination(arrGoods: string[], goodsOnPage:number, page: number){
    const cartList = (document.querySelector('#cart-goods')) as HTMLElement;
    const numElemPagination = document.getElementById('num_elems_pagination') as HTMLInputElement;
    const numPageElem = document.getElementById('current-page') as HTMLElement;

    let showNumber;
    if (goodsOnPage === null) {
        goodsOnPage = goods.length;
        showNumber = '';
    }else{
        showNumber = goodsOnPage;
    }

    if (!page) {
        page = 0;
    }

    localStorage.setItem('pageNumber', JSON.stringify(page))

    numElemPagination.value = showNumber.toString();
    cartList.innerHTML = '';
   
    const start = Number(goodsOnPage) * page;
    const end = start + Number(goodsOnPage);
    
    numPageElem.textContent = `${page + 1}`;
    const arrVisibleOnPage = arrGoods.slice(start, end);
    const maxNumberPage = Math.ceil(arrGoods.length / goodsOnPage);
    localStorage.setItem('maxNumberPage', JSON.stringify(maxNumberPage));

    arrVisibleOnPage.forEach(el => {
        getCreatedGoodsElement(el)
    })
}

function getCreatedGoodsElement (el:string) {
    const cartList = (document.querySelector('#cart-goods')) as HTMLElement;
        const goodsElem = goods.find(elem => elem.id === Number(el));
        if (goodsElem !== undefined) {

        const cartElem = document.createElement('div') as HTMLElement;
        cartElem.className = 'cart__container';

        const cartImg = document.createElement('div') as HTMLElement;
        cartImg.className = 'cart__img';
        cartImg.style.background = `url(${goodsElem.images[0]})0 0/100% no-repeat`;

        const cartTitle = document.createElement('div') as HTMLElement;
        cartTitle.className = 'cart__title';
        cartTitle.textContent = goodsElem.title;

        const cartStock = document.createElement('div') as HTMLElement;
        cartStock.className = 'cart__stock';
        cartStock.textContent = `Остаток товара: ${goodsElem.stock}`;

        const cartButtons = document.createElement('div') as HTMLElement;
        cartButtons.className = 'cart-button__container';

        const buttonMinus = document.createElement('button') as HTMLElement;
        buttonMinus.textContent = '-';
        buttonMinus.dataset.goodsId = el;
        buttonMinus.dataset.maxCount = goodsElem.stock.toString();
        buttonMinus.addEventListener('click', handlerButtonClick);

        const buttonCounter = document.createElement('div') as HTMLElement;
        buttonCounter.textContent = `${store.cart[el]}`;

        const buttonPlus = document.createElement('button') as HTMLElement;
        buttonPlus.textContent = '+';
        buttonPlus.dataset.typeButton = '+'
        buttonPlus.dataset.goodsId = el;
        buttonPlus.dataset.maxCount = goodsElem.stock.toString();
        buttonPlus.addEventListener('click', handlerButtonClick);

        cartButtons.append(buttonMinus);
        cartButtons.append(buttonCounter);
        cartButtons.append(buttonPlus);

        const cartDelete = document.createElement('div') as HTMLElement;
        cartDelete.textContent = 'удалить из корзины';
        cartDelete.className = 'cart__deleted';

        cartElem.append(cartImg);
        cartElem.append(cartTitle);
        cartElem.append(cartStock);
        cartElem.append(cartButtons);
        cartElem.append(cartDelete);
        cartList.append(cartElem);
        }
    }