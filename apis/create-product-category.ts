import type ResponseModel from "~/models/response-model";
import type {ProductCategory} from "~/models/product-category";
import {useMockProductCategoryStore} from "~/stores/mock-product-category-store";

export const createProductCategory = async (request: createProductCategoryRequest): Promise<ResponseModel<ProductCategory>> => {
    const category = {
        id: 9999,
        parent_id: request.parent_id,
        name: request.name,
        image: request.image,
        order: 9999,
        status: request.status,
        subcategory: []
    };
    await useMockProductCategoryStore().create(category);
    return {
        success: true,
        message: "Success",
        data: category
    };
}

export interface createProductCategoryRequest {
    name: string;
    parent_id: number;
    image: string;
    status: number;
}