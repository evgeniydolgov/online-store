import { SortOrder } from '../enums';
import { CardView } from '../enums/cardView';
import { Store } from '../interfaces/store';

export const store: Store = {
    goodsItems: [],
    filteredGoodsItems: [],
    cart: {},
    sumCartItems: 0.0,
    countCartItems: 0,

    filters_settings: {
        all_brand: [],
        all_category: [],

        minMaxPrice: [],
        minMaxStock: [],

        _brand: [],
        _category: [],
        price: [],
        stock: [],
    },
    sort_settings: {
        field_name: 'title',
        direction: SortOrder.asc,
    },

    promoCodes: [],

    view_settings: {
        mode: CardView.simple,
    },

    ls_key_cart: 'dudarik_online_shop_cart',
    ls_key_settings: 'dudarik_online_shop_settings',
    settings: {
        isLSAvailabel: false,
    },
};
