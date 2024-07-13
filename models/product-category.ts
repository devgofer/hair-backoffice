export interface ProductCategory {
    id: number;
    parent_id: number;
    name: string;
    image: string;
    order: number;
    status: number;
    subcategory: ProductCategory[];
}