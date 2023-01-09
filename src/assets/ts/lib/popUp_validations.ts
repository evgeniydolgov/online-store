const arrValid = new Array(7).fill(false);

export function checkerValidation (event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
        throw new Error('error');
    }
    const index = Number(event.target.dataset.index);

    if (event.target.validity.valid && event.target.value.length > 0) {
        arrValid[index] = true;
    } else {
        arrValid[index] = false;
    }
}

function checkImageCardNumber (elem: string) {
    const cardImage = document.querySelector('#card_image');
    if (!(cardImage instanceof HTMLElement)) throw new Error('card image error');
    if (elem[0] == undefined) cardImage.className = 'card_image';
    if (elem[0] === '3') cardImage.className = 'card_image_american-express';
    else if (elem[0] === '4') cardImage.className = 'card_image_visa';
    else if (elem[0] === '5') cardImage.className = 'card_image_master-card';
    else if (elem[0] === '6') cardImage.className = 'card_image_union-pay';
    else cardImage.className = 'card_image';
}

export function checkDebetCardNumber (event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
        throw new Error('card number error');
    }
    const inpValueArr = event.target.value.replace(/\D/gi, '').substring(0,16).match(/.{1,4}/g);
    if (inpValueArr === null){
       event.target.value = '';
       return;
    }
    checkImageCardNumber(event.target.value)
    event.target.value = inpValueArr.join(' ');
}

export function checkDateCard (event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
        throw new Error('date card error');
    }
    const inpValueArr = event.target.value.replace(/\D/gi, '').substring(0,4).match(/.{1,2}/g);
    if (inpValueArr === null){
        event.target.value = '';
        return;
     }
     if (+inpValueArr[0] > 12) {
        inpValueArr[0] = '12';
     }
     event.target.value = inpValueArr.join('/');
}

export function checkCVV (event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
        throw new Error('cvv card error');
    }
    event.target.value = event.target.value.replace(/\D/gi, '').substring(0,3);
}

export function checkAllInputValidation (elem: NodeListOf <HTMLInputElement>){
    elem.forEach(el => {
        if (arrValid[Number(el.dataset.index)] === false) {
            (<HTMLElement>el.parentElement).classList.add('input_error');
        } else {
            (<HTMLElement>el.parentElement).classList.remove('input_error');
        }
    })
    if (!arrValid.includes(false)) {
        const popUpBackground = document.querySelector('#popUp_background') as HTMLElement;
        popUpBackground.innerHTML = '';
        popUpBackground.style.fontSize = '30px'
        popUpBackground.textContent = 'Спасибо за покупку!'
        setTimeout(() => {
            location.href = '/';
            localStorage.clear();
        }, 3000);
    }
}