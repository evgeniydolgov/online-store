import { Filter, GoodsItem } from '../../interfaces';
import { store } from '../store';
import { sortByPrice, sortByRating, sortByTitle } from './sortGoods';

const FILTERS_NAME_ARRAY = ['_brand', '_category', 'price', 'stock'];

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

export const getFiltersFromUrl = () => {
    const url = new URL(location.href);

    return FILTERS_NAME_ARRAY.reduce((acc: Filter[], filterName: string) => {
        const currFilter = url.searchParams.get(filterName);

        if (currFilter !== null) {
            let currFilterParams = currFilter.split(',');
            if (filterName[0] === '_') {
                currFilterParams = currFilterParams.filter((param) => {
                    return store.filters_settings[`all${filterName}`].includes(param);
                });
            } else {
                currFilterParams =
                    parseInt(currFilterParams[0]) <= parseInt(currFilterParams[1]) ? currFilterParams : [];
            }
            if (currFilterParams.length > 0) acc = [...acc, { name: filterName, value: currFilterParams }];
        }
        return acc;
    }, []);
};

export const getSearchStringFromUrl = () => new URL(location.href).searchParams.get('search');

export const getCountGoodsByFieldName = (goods: GoodsItem[], fieldName: string, valueField: string) =>
    goods.filter((goodsItem) => String(goodsItem[fieldName]).toLocaleLowerCase() === valueField.toLocaleLowerCase())
        .length;

export const getMinMaxByFieldName = (goods: GoodsItem[], fieldName: string) => {
    const retArr = [0, 0];
    if (goods.length > 0) {
        retArr[0] = parseInt(String(goods[0][fieldName]));
        retArr[1] = parseInt(String(goods[0][fieldName]));

        for (let i = 0; i < goods.length; i++) {
            const item = parseInt(String(goods[i][fieldName]));

            if (item < retArr[0]) retArr[0] = item;

            if (item > retArr[1]) retArr[1] = item;
        }
    }

    return retArr.map((item) => String(item));
};

export const setFiltredItemsToStore = () => {
    const filters = getFiltersFromUrl();

    for (const filter in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, filter)) {
            const element = filters[filter];
            store.filters_settings[element.name] = element.value;
        }
    }

    store.filteredGoodsItems = filterGoods(store.goodsItems, filters, getSearchStringFromUrl());

    switch (store.sort_settings.field_name) {
        case 'title':
            sortByTitle(store.sort_settings.direction);
            break;

        case 'price':
            sortByPrice(store.sort_settings.direction);
            break;

        case 'rating':
            sortByRating(store.sort_settings.direction);
            break;

        default:
            sortByTitle(store.sort_settings.direction);
            break;
    }
};

export const removeAllFiltersFromUrl = (urlToReset: string) => {
    const url = new URL(urlToReset);
    const urlFilters = getFiltersFromUrl();

    urlFilters.forEach((filter) => {
        url.searchParams.delete(filter.name);
    });

    return decodeURIComponent(url.toString());
};

export const removeSearchStringFromUrl = (urlToReset: string) => {
    const url = new URL(urlToReset);

    url.searchParams.delete('search');

    return url.toString();
};
