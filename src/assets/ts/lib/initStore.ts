import { Filter, GoodsItem } from '../../interfaces';
import { Store } from '../../interfaces/store';
import { goods } from '../goods/goodsArray';
import { filterGoods } from './filterGoods';
import { LS } from './localstorage';

const FILTERS_NAME_ARRAY = ['_brand', '_category', 'price', 'stock'];

const loadDataStore = () => goods;

const getFiltersFromUrl = () => {
    const url = new URL(location.href);

    const filters: Filter[] = FILTERS_NAME_ARRAY.reduce((acc: Filter[], item: string) => {
        const currFilter = url.searchParams.get(item);

        if (currFilter !== null) {
            const currFilterParams = currFilter.split(',');
            acc = [...acc, { name: item, value: currFilterParams }];
        }
        return acc;
    }, []);

    return filters;
};

const getSearchStringFromUrl = () => {
    const url = new URL(location.href);

    return url.searchParams.get('search');
};

export function initStore(goods: GoodsItem[]) {
    const cart = LS.loadCartDataFromLS() || [];
    const sumCartItems =
        cart.length === 0 ? 0 : cart.reduce((acc: number, item: GoodsItem) => acc + Number(item.price), 0);

    const store: Store = {
        goodsItems: goods,
        filteredGoodsItems: filterGoods(goods, getFiltersFromUrl(), getSearchStringFromUrl()),
        cart,
        sumCartItems,
    };
}
