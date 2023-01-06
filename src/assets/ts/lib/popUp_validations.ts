
// export function checker () {
//     const nameInput = document.querySelectorAll('.buy-input') as NodeListOf <HTMLInputElement>;
//     console.log(nameInput);
    
//     nameInput.forEach(el => {
//         if (el.value === '' || el.validity.valid !== true) {
//             console.log('ошибка');
//         }else{
//             console.log('работаем');
//         }
//         el.addEventListener('change', () => {
//             if (el.value !== '' && el.validity.valid === true) {
//                 console.log('!');
//             }else{
//                 el.dataset.showButton = 'visebel';
//             }
//         })
//     });
// }
export function checkerValidation (event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
        throw new Error('error');
    }
    if (event.target.validity.valid && event.target.value.length > 0) {
        console.log(event.target.validity.valid);
    }
    
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
    event.target.value = event.target.value.replace(/\D/gi, '').substring(0,3)
}