import { SortFieldType, SortOrder } from '../../enums';
import { GoodsItem } from '../../interfaces';
import { store } from '../store';

const SORT_FIELDS = ['title', 'price', 'rating'];

const sortByFieldNameStringAsc = (fieldName: string) => (a: GoodsItem, b: GoodsItem) =>
    a[fieldName] > b[fieldName] ? 1 : -1;

const sortByFieldNameStringDesc = (fieldName: string) => (a: GoodsItem, b: GoodsItem) =>
    a[fieldName] < b[fieldName] ? 1 : -1;

const sortByFieldNameNumberAsc = (fieldName: string) => (a: GoodsItem, b: GoodsItem) =>
    parseFloat(a[fieldName].toString()) > parseFloat(b[fieldName].toString()) ? 1 : -1;

const sortByFieldNameNumberDesc = (fieldName: string) => (a: GoodsItem, b: GoodsItem) =>
    parseFloat(a[fieldName].toString()) < parseFloat(b[fieldName].toString()) ? 1 : -1;

const sortByFieldName = (fieldName: string, fieldType: SortFieldType, order: SortOrder) => {
    if (fieldType === SortFieldType.number && order === SortOrder.asc) return sortByFieldNameNumberAsc(fieldName);

    if (fieldType === SortFieldType.number && order === SortOrder.desc) return sortByFieldNameNumberDesc(fieldName);

    if (order === SortOrder.desc) return sortByFieldNameStringDesc(fieldName);

    return sortByFieldNameStringAsc(fieldName);
};

export const sortGoods = (goods: GoodsItem[], fieldName: string, fieldType: SortFieldType, order: SortOrder) => {
    goods.sort(sortByFieldName(fieldName, fieldType, order));
};

export const sortByPrice = (order: SortOrder): void =>
    sortGoods(store.filteredGoodsItems, 'price', SortFieldType.number, order);

export const sortByTitle = (order: SortOrder): void =>
    sortGoods(store.filteredGoodsItems, 'title', SortFieldType.string, order);

export const sortByRating = (order: SortOrder): void =>
    sortGoods(store.filteredGoodsItems, 'rating', SortFieldType.number, order);

export const getSortParamFromUrl = () => {
    const url = new URL(location.href);

    const urlSortString = url.searchParams.get('sortBy');

    let field_name = 'title';
    let direction = SortOrder.asc;

    if (urlSortString === null) return { field_name, direction };

    const [urlField, urlDirect] = urlSortString.split(',');

    if (SORT_FIELDS.includes(urlField)) field_name = urlField;

    if (urlDirect === SortOrder.desc) direction = SortOrder.desc;

    return { field_name, direction };
};

export const setSortingSettings = () => {
    store.sort_settings = getSortParamFromUrl();
};
