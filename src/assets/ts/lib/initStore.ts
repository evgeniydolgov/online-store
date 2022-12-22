import { Filter, GoodsItem } from '../../interfaces';
import { Store } from '../../interfaces/store';
import { goods } from '../goods/goodsArray';
import { filterGoods, Filters } from './filterGoods';

const FILTERS_NAME_ARRAY = ['_brand', '_category', 'price', 'stock'];

const loadDataStore = () => goods;

const getFilters = () => {
    const url = new URL(location.href);

    const filters: Filter[] = FILTERS_NAME_ARRAY.reduce((acc: Filter[], item: string) => {}, []);
};

export function initStore(goods: GoodsItem[], filters: Filters[]) {
    const store: Store = {
        goodsItems: loadDataStore(),
        filteredGoodsItems: filterGoods(loadDataStore()),
    };
}
