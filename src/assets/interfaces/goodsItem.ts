export interface GoodsItemProto {
    [key: string]: number | string | string[];
}

export interface GoodsItem extends GoodsItemProto {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    images: string[];
}
