export const formatSum = (sum: number, minimumFractionDigits: number) => {
    const formater = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits });
    return formater.format(sum);
};