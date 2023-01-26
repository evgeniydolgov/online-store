import { SortOrder } from '../enums';
import { CardView } from '../enums/cardView';
import { dualRangeSlider } from '../ts/helpers/slide_functions';
import { CartItems, PromoCode } from '../types';
import { GoodsItem } from './goodsItem';

export interface Store {
    goodsItems: GoodsItem[];
    filteredGoodsItems: GoodsItem[];
    cart: CartItems;
    sumCartItems: number;
    countCartItems: number;

    filters_settings: {
        [key: string]: string[];
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

    promoCodes: PromoCode[];

    ls_key_cart: string;
    ls_key_settings: string;
    settings: {
        isLSAvailabel: boolean;
    };
}
