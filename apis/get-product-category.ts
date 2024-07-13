import type {ProductCategory} from "~/models/product-category";
import {useMockProductCategoryStore} from "~/stores/mock-product-category-store";

const findCategoryRecursive = (categories: ProductCategory[], id: number): ProductCategory | null => {
    for (const category of categories) {
        if (category.id === id) {
            return category;
        }
        const foundSubcategory = findCategoryRecursive(category.subcategory, id);
        if (foundSubcategory) {
            return foundSubcategory;
        }
    }
    return null;
};

export const getProductCategory = async (id: number): Promise<ProductCategory | null> => {
    const { items } = useMockProductCategoryStore();
    return findCategoryRecursive(items, id);
};


