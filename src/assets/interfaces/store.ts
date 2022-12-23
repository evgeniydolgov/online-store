import { CartItems } from '../types';
import { GoodsItem } from './goodsItem';

export interface Store {
    goodsItems: GoodsItem[];
    filteredGoodsItems: GoodsItem[];
    cart: CartItems;
    sumCartItems: number;

    filters_settings: {
        [key: string]: string[];
        // _brand: string[];

        // _category: string[];

        // price: string[];

        // stock: string[];
    };

    ls_key_cart: string;
    ls_key_settings: string;
    settings: {
        isLSAvailabel: boolean;
    };
}
