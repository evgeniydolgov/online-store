import { Filter } from '../interfaces/filter';
import { GoodsItem } from '../interfaces/goodsItem';

export function goodsFilter(goods: GoodsItem[], args: string[], sum: number[]) {
    const arg: number = [...args].length;
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
        newArr = Object.assign([], goods);
    }
    if (sum.length === 0) {
        return newArr;
    }
    newArr = newArr.filter((el) => el.price >= sum[0] && el.price <= sum[1]);
    return newArr;
}

export abstract class Filters {
    private static SEARCH_FIELDS = ['title', 'description', 'price', 'rating', 'stock', 'brand', 'category'];
    static filterByFieldMinMax<T extends keyof GoodsItem>(
        goodsItems: GoodsItem[],
        fieldName: T,
        min: number,
        max: number
    ) {
        return goodsItems.filter((goods) => goods[fieldName] >= min && max >= goods[fieldName]);
    }

    static filterByFieldValue<T extends keyof GoodsItem>(goodsItems: GoodsItem[], fieldName: T, values: string[]) {
        return values.reduce((acc: GoodsItem[], item) => {
            acc = [
                ...acc,
                ...goodsItems.filter((goods) => String(goods[fieldName]).toLowerCase() === item.toLowerCase()),
            ];
            return acc;
        }, []);
    }

    static filterFindByStr(goodsItems: GoodsItem[], value: string) {
        return Array.from(
            new Set(
                this.SEARCH_FIELDS.reduce((acc: GoodsItem[], item) => {
                    acc = [
                        ...acc,
                        ...goodsItems.filter((goods) =>
                            String(goods[item]).toLowerCase().includes(value.toLowerCase())
                        ),
                    ];
                    return acc;
                }, [])
            )
        );
    }
}

export function filterGoods(goodsItems: GoodsItem[], filters: Filter[], searchString?: string | null) {
    let retArr = [...goodsItems];

    if (filters.length > 0) {
        for (let i = 0; i < filters.length; i++) {
            if (filters[i].name[0] === '_') {
                retArr = Filters.filterByFieldValue(retArr, filters[i].name.slice(1), filters[i].value);
            } else {
                retArr = Filters.filterByFieldMinMax(
                    retArr,
                    filters[i].name,
                    parseFloat(filters[i].value[0]),
                    parseFloat(filters[i].value[1])
                );
            }
        }
    }

    if (searchString) retArr = Filters.filterFindByStr(retArr, searchString);

    return retArr;
}
