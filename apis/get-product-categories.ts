import type {ProductCategory} from "~/models/product-category";
import {useMockProductCategoryStore} from "~/stores/mock-product-category-store";

export const getProductCategories = async (): Promise<ProductCategory[]> => {
    const { items } = (useMockProductCategoryStore());

    return items;
}

