import { formatSum } from "../assets/ts/helpers"

const testCostOne = '5 ₽'
const testCostTwo = '5,00 ₽'
const testCostThree = '50,00000 ₽'

describe('Discrabe formating sum in RUB', () => {
    test('formatSum() - shoud return one number', () => {
        const cost = formatSum(5,0);

        expect(cost).toBe(testCostOne);
    });
    test('formatSum() - shoud return two 0 after number', () => {
        const cost = formatSum(5,2);

        expect(cost).toBe(testCostTwo);
    });
    test('formatSum() - shoud return two 0 after number', () => {
        const cost = formatSum(5,2);

        expect(cost).toBe(testCostTwo);
    });
    test('formatSum() - shoud return two 0 after number', () => {
        const cost = formatSum(50,5);

        expect(cost).toBe(testCostThree);
    });
})