import { GoodsItem } from '../../interfaces/goodsItem'

export function goodsFilter(goods: GoodsItem[], args: string[], sum: number[]) {
    const arg = [...args].length;
    let newArr: GoodsItem[] = [];
    if (arg) {
        for (let i = 0; i < goods.length; i++) {
            for (let j = 0; j < arg; j++) {
                if (goods[i].brand === args[j]) {
                    newArr.push(goods[i]);
                }
            }
        }
    } else {
        newArr = Object.assign([], goods)
    }
    if (sum.length === 0) {
        return newArr
    }
    newArr = newArr.filter(el => el.price >= sum[0] && el.price <= sum[1])
    return newArr
}