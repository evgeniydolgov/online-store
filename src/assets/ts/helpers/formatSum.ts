export const formatSum = (sum: number) => {
    const formater = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 2 });
    return formater.format(sum);
};
