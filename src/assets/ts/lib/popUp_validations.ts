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
    console.log(arrValid);
}

export function checkDebetCardNumber (event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
        throw new Error('error');
    }
    const inpValueArr = event.target.value.replace(/\D/gi, '').substring(0,16).match(/.{1,4}/g);
    if (inpValueArr === null){
       event.target.value = '';
       return;
    }
    event.target.value = inpValueArr.join(' ');
}

export function checkDateCard (event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
        throw new Error('error');
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
        throw new Error('error');
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
            location.href = '/'
        }, 3000);
    }
}