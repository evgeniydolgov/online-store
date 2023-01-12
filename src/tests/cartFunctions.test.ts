import { getCartGoodsCount, getCartSum, getPromoSum } from '../assets/ts/lib/cartFunctions';

const mockCart = { '12': '1', '14': '1' };
const cartSum = 105998;
const emptyMockCart = {};
const procent = 0.1;
const newSum = 95398;

describe('Cart functions tests', () => {
    test('getCartSum() - must return cart sum', () => {
        const sum = getCartSum(mockCart);

        expect(sum).toBe(cartSum);
    });

    test('getCartSum() - must return zero if cart empty', () => {
        const sum = getCartSum(emptyMockCart);

        expect(sum).toBe(0);
    });
    test('getCartGoodsCount() - must return cart goods count', () => {
        const sum = getCartGoodsCount(mockCart);

        expect(sum).toBe(2);
    });

    test('getCartGoodsCount() - must return zero if cart empty', () => {
        const sum = getCartSum(emptyMockCart);

        expect(sum).toBe(0);
    });

    test('getPromoSum() - must return new cart sum', () =>{
        const sum = Number(getPromoSum(cartSum,procent));

        expect(sum).toBe(newSum)
    });
});
