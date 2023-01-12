import { getPromoCodes } from "../assets/ts/lib/getPromoCodes";

const maxDiscountNumber = 20;
const minDiscountNumber = 2;

describe('Discrabe of promocodes test', () => {
    test('getPromoCodes() - max discount must be smaller than 20%', () => {
        const discount = getPromoCodes();
        const arr:number[] = [];
        for(const key in discount){
            arr.push(discount[key].disc);
        }
        expect(Math.max(...arr)).toBeLessThan(maxDiscountNumber);
    })

    test('getPromoCodes() - min discount must be bigger than 2%', () => {
        const discount = getPromoCodes();
        const arr:number[] = [];
        for(const key in discount){
            arr.push(discount[key].disc);
        }
        expect(Math.min(...arr)).toBeGreaterThan(minDiscountNumber);
    })
})