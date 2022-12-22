import { GoodsItem } from './goodsItem';

export interface Store {
    goodsItems: GoodsItem[];
    filteredGoodsItems: GoodsItem[];
    cart: GoodsItem[];
    sumCartItems: number;

    filters_settings: {
        brands: string[];

        min_price: number;
        max_price: number;

        min_count_goods: number;
        max_count_goods: number;
    };

    ls_key_cart: string;
    ls_key_settings: string;
    settings: {
        isLSAvailabel: boolean;
    };
}
