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
    if (fieldType === SortFieldType.Number && order === SortOrder.Asc) return sortByFieldNameNumberAsc(fieldName);

    if (fieldType === SortFieldType.Number && order === SortOrder.Desc) return sortByFieldNameNumberDesc(fieldName);

    if (order === SortOrder.Desc) return sortByFieldNameStringDesc(fieldName);

    return sortByFieldNameStringAsc(fieldName);
};

export const sortGoods = (goods: GoodsItem[], fieldName: string, fieldType: SortFieldType, order: SortOrder) => {
    goods.sort(sortByFieldName(fieldName, fieldType, order));
};

export const sortByPrice = (order: SortOrder): void =>
    sortGoods(store.filteredGoodsItems, 'price', SortFieldType.Number, order);

export const sortByTitle = (order: SortOrder): void =>
    sortGoods(store.filteredGoodsItems, 'title', SortFieldType.String, order);

export const sortByRating = (order: SortOrder): void =>
    sortGoods(store.filteredGoodsItems, 'rating', SortFieldType.Number, order);

export const getSortParamFromUrl = () => {
    const url = new URL(location.href);

    const urlSortString = url.searchParams.get('sortBy');

    let field_name = 'title';
    let direction = SortOrder.Asc;

    if (urlSortString === null) return { field_name, direction };

    const [urlField, urlDirect] = urlSortString.split(',');

    if (SORT_FIELDS.includes(urlField)) field_name = urlField;

    if (urlDirect === SortOrder.Desc) direction = SortOrder.Desc;

    return { field_name, direction };
};

export const setSortingSettings = () => {
    store.sort_settings = getSortParamFromUrl();
};
