import { GoodsItem } from '../interfaces';

export type OptionsFilter = {
    filter_title: string;
    filter_name: string;
    filter_settings: string[];
    goods: GoodsItem[];
    filtredGoods: GoodsItem[];
};
