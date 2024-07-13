import type ResponseModel from "~/models/response-model";
import type {ProductCategory} from "~/models/product-category";
import {useMockProductCategoryStore} from "~/stores/mock-product-category-store";

export const updateProductCategory = async (request: updateProductCategoryRequest): Promise<ResponseModel<ProductCategory>> => {

    const category = {
        id: request.id,
        parent_id: useMockProductCategoryStore().items.find(x => x.id === request.id)?.parent_id || 0,
        name: request.name,
        image: request.image,
        order: useMockProductCategoryStore().items.find(x => x.id === request.id)?.order || 9999,
        status: request.status,
        subcategory: []
    };
    await useMockProductCategoryStore().update(category);
    return {
        success: true,
        message: "Success",
        data: category
    };
}

export interface updateProductCategoryRequest {
    id: number;
    name: string;
    image: string;
    status: number;
}