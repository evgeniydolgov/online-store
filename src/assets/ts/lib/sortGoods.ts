import { SortFieldType, SortOrder } from '../../enums';
import { GoodsItem } from '../../interfaces';

const sortByFieldNameAsc = (fieldName: string) => (a: GoodsItem, b: GoodsItem) => a[fieldName] > b[fieldName] ? 1 : -1;
const sortByFieldNameDesc = (fieldName: string) => (a: GoodsItem, b: GoodsItem) => a[fieldName] < b[fieldName] ? 1 : -1;

const sortByFieldName = (fieldName: string, fieldType: SortFieldType, order: SortOrder) => {
    // if (fieldType === SortFieldType.number){
    // }
};

export const sortGoods = (goods: GoodsItem[], fieldName: string, order: SortOrder) => {
    const sortFn = order === SortOrder.asc ? sortByFieldNameAsc : sortByFieldNameDesc;

    return goods.sort(sortFn(fieldName));
};
