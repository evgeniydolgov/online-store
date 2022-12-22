import { Store } from '../interfaces/store';

export const store: Store = {
    goodsItems: [],
    filteredGoodsItems: [],
    cart: {},
    sumCartItems: 0.0,

    filters_settings: {
        _brand: [],

        _category: [],

        price: [],

        stock: [],
    },

    ls_key_cart: 'dudarik_online_shop_cart',
    ls_key_settings: 'dudarik_online_shop_settings',
    settings: {
        isLSAvailabel: false,
    },
};
