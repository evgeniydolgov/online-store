import { GoodsItem } from '../assets/interfaces';
import { Filters, getCountGoodsByFieldName } from '../assets/ts/lib/filterGoods';
import { getGoodsBrands } from '../assets/ts/lib/initStore';
import { loadDataStore } from '../assets/ts/lib/loadData';

const goods = loadDataStore();
const cloneGoods = [...goods];

describe('Filters functions test', () => {
    test('Filters.filterByFieldMinMax() - must filtred by price [MIN MAX]', () => {
        const MIN_PRICE = 40000;
        const MAX_PRICE = 100000;

        const filtredGoods = Filters.filterByFieldMinMax(goods, 'price', MIN_PRICE, MAX_PRICE);
        const filtredCloneGoods = cloneGoods.filter((item) => item.price >= MIN_PRICE && item.price <= MAX_PRICE);

        expect(filtredGoods).toStrictEqual(filtredCloneGoods);
    });

    test('Filters.filterByFieldValue() - must filtred by brand', () => {
        const brands = getGoodsBrands(goods).filter((_, id) => id > 2);

        const filtredGoods = Filters.filterByFieldValue(goods, 'brand', brands);

        const filtredCloneGoods = cloneGoods.filter((item) => brands.includes(item.brand));

        expect(filtredGoods).toStrictEqual(filtredCloneGoods);
    });

    test('Filters.filterFindByStr() - Must filtred by searchString', () => {
        const SEARCH_FIELDS = ['title', 'description', 'price', 'rating', 'stock', 'brand', 'category'];
        const SEARCH_STRINGS = [
            'palit',
            'asus',
            'AsUs',
            'ASUS',
            'Giga',
            '108999',
            '112999',
            '106999',
            '10',
            'RTX',
            'RT',
            '30',
            'видеокарт',
        ];

        for (const searchString of SEARCH_STRINGS) {
            const filtredGoods = Filters.filterFindByStr(goods, searchString);
            const filtredCloneGoods = Array.from(
                new Set(
                    SEARCH_FIELDS.reduce((acc: GoodsItem[], item) => {
                        acc = [
                            ...acc,
                            ...cloneGoods.filter((goods) =>
                                String(goods[item]).toLowerCase().includes(searchString.toLowerCase())
                            ),
                        ];
                        return acc;
                    }, [])
                )
            );
            expect(filtredGoods).toStrictEqual(filtredCloneGoods);
        }
    });

    test('getCountGoodsByFieldName() - must return count of goods', () => {
        const FIELDS: Record<string, string>[] = [
            { fieldName: 'brand', fieldValue: 'ASUS' },
            { fieldName: 'brand', fieldValue: 'GIGABYTE' },
            { fieldName: 'category', fieldValue: 'RTX 3090' },
            { fieldName: 'category', fieldValue: 'RTX 3070' },
        ];

        for (const field of FIELDS) {
            const countGoods = getCountGoodsByFieldName(goods, field.fieldName, field.fieldValue);

            const cloneCount = goods.filter((item) => item[field.fieldName] === field.fieldValue).length;

            expect(countGoods).toBe(cloneCount);
        }
    });
});
