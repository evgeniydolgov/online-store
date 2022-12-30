import { SortOrder } from '../enums';
import { CardView } from '../enums/cardView';
import { dualRangeSlider } from '../ts/helpers/slide_finctions';
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

    sort_settings: {
        field_name: string;
        direction: SortOrder;
    };

    view_settings: {
        mode: CardView;
    };

    sliders?: {
        [key: string]: dualRangeSlider;
    };

    ls_key_cart: string;
    ls_key_settings: string;
    settings: {
        isLSAvailabel: boolean;
    };
}
