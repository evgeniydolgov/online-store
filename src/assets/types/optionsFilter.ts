import { GoodsItem } from '../interfaces';

export type FilterValueOptions = {
    filter_title: string;
    filter_name: string;
    filter_settings: string[];
    goods: GoodsItem[];
    filtredGoods: GoodsItem[];
};

export type FilterRangeOptions = {
    filter_title: string;
    filter_name: string;
    filter_settings: string[];
};
