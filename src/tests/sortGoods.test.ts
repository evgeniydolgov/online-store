import { SortFieldType, SortOrder } from '../assets/enums';
import { loadDataStore } from '../assets/ts/lib/loadData';
import { sortGoods } from '../assets/ts/lib/sortGoods';

const goods = loadDataStore();
const cloneGoods = [...goods];

describe('Sorting goods test', () => {
    test('sortGoods() - must sorting by name ASC', () => {
        cloneGoods.sort((a, b) => (a.title >= b.title ? 1 : -1));

        sortGoods(goods, 'title', SortFieldType.string, SortOrder.asc);

        expect(goods).toStrictEqual(cloneGoods);
    });

    test('sortGoods() - must sorting by name DESC', () => {
        cloneGoods.sort((a, b) => (a.title >= b.title ? -1 : 1));

        sortGoods(goods, 'title', SortFieldType.string, SortOrder.desc);

        expect(goods).toStrictEqual(cloneGoods);
    });

    test('sortGoods() - must sorting by price ASC', () => {
        cloneGoods.sort((a, b) => (a.price >= b.price ? 1 : -1));

        sortGoods(goods, 'price', SortFieldType.string, SortOrder.asc);

        expect(goods).toStrictEqual(cloneGoods);
    });

    test('sortGoods() - must sorting by price DESC', () => {
        cloneGoods.sort((a, b) => (a.price >= b.price ? -1 : 1));

        sortGoods(goods, 'price', SortFieldType.string, SortOrder.desc);

        expect(goods).toStrictEqual(cloneGoods);
    });
});
