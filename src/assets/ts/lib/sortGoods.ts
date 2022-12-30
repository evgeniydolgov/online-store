import { SortFieldType, SortOrder } from '../../enums';
import { GoodsItem } from '../../interfaces';
import { store } from '../store';

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

const sortGoods = (goods: GoodsItem[], fieldName: string, fieldType: SortFieldType, order: SortOrder) => {
    return goods.sort(sortByFieldName(fieldName, fieldType, order));
};

export const sortByPrice = (order: SortOrder) => {
    sortGoods(store.filteredGoodsItems, 'price', SortFieldType.number, order);
};
export const sortByTitle = (order: SortOrder) => {
    sortGoods(store.filteredGoodsItems, 'title', SortFieldType.string, order);
};
export const sortByRating = (order: SortOrder) => {
    sortGoods(store.filteredGoodsItems, 'rating', SortFieldType.number, order);
};
