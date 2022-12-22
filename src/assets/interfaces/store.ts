import { GoodsItem } from './goodsItem';

export interface Store {
    goodsItems: GoodsItem[];
    filteredGoodsItems: GoodsItem[];
    cart: GoodsItem[];
    sumCartItems: number;

    filters_settings: {
        _brand: string[];

        _category: string[];

        price: string[];

        stock: string[];
    };

    ls_key_cart: string;
    ls_key_settings: string;
    settings: {
        isLSAvailabel: boolean;
    };
}
