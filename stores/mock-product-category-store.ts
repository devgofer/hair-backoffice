import type {ProductCategory} from "~/models/product-category";
import {defineStore} from "pinia";

export const useMockProductCategoryStore = defineStore('MockProductCategoryStore', () => {
    const items = ref<ProductCategory[]>([]);
    const total = ref(0);
    const per_page = ref(0);
    const mockProductCategory = {
        "total": 15,
        "per_page": 15,
        "items": [
            {
                "id": 1,
                "parent_id": 0,
                "name": "天天居家系列",
                "image": "a.jpg",
                "order": 1,
                "status": 0,
                "subcategory": [
                    {
                        "id": 6,
                        "parent_id": 1,
                        "name": "限定禮盒",
                        "image": "e.jpg",
                        "order": 1,
                        "status": 0,
                        "subcategory": [
                            {
                                "id": 8,
                                "parent_id": 1,
                                "name": "我是第三階層",
                                "image": "g.jpg",
                                "order": 1,
                                "status": 0,
                                "subcategory": []
                            }
                        ]
                    },
                    {
                        "id": 7,
                        "parent_id": 1,
                        "name": "天天頭皮保養",
                        "image": "f.jpg",
                        "order": 2,
                        "status": 0,
                        "subcategory": []
                    },
                    {
                        "id": 9,
                        "parent_id": 1,
                        "name": "天天洗髮",
                        "image": "h.jpg",
                        "order": 3,
                        "status": 0,
                        "subcategory": []
                    }
                ]
            },
            {
                "id": 2,
                "parent_id": 0,
                "name": "經典沙龍系列",
                "image": "b.jpg",
                "order": 2,
                "status": 0,
                "subcategory": []
            },
            {
                "id": 3,
                "parent_id": 0,
                "name": "頂級鉑金系列",
                "image": "c.jpg",
                "order": 3,
                "status": 1,
                "subcategory": []
            },
            {
                "id": 4,
                "parent_id": 0,
                "name": "居家護理套組",
                "image": "d.jpg",
                "order": 4,
                "status": 1,
                "subcategory": []
            },
            {
                "id": 5,
                "parent_id": 0,
                "name": "團購商品",
                "image": "e.jpg",
                "order": 5,
                "status": 0,
                "subcategory": []
            }
        ]
    }
    const init = () => {
        items.value = mockProductCategory.items;
        total.value = mockProductCategory.total;
        per_page.value = mockProductCategory.per_page
    }
    const findAndAddToCategory = (categories: ProductCategory[], request: ProductCategory): boolean => {
        for (const category of categories) {
            if (category.id === request.parent_id) {
                category.subcategory.push(request);
                return true; // Successfully added to this category
            }
            // If not added, try to add to subcategories recursively
            if (findAndAddToCategory(category.subcategory, request)) {
                return true; // Successfully added in a subcategory
            }
        }
        return false; // Not added anywhere
    };

    const create = async (request: ProductCategory) => {
        if (request.parent_id === 0) {
            items.value.push(request);
        } else {
            const added = findAndAddToCategory(items.value, request);
            if (!added) {
                console.error('Parent category not found');
            }
        }
        triggerRef(items);
        total.value++;
        per_page.value++;
    };

    const update = async (request: ProductCategory) => {
        const category = items.value.find(x => x.id === request.id);
        if (category) {
            category.parent_id = request.parent_id;
            category.order = request.order;
            category.name = request.name;
            category.image = request.image;
            category.status = request.status;
        }
        triggerRef(items);
    }
    const deleteCategoryById = (categories: ProductCategory[], id: number): boolean => {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id === id) {
                categories.splice(i, 1); // Remove the category from the array
                return true; // Deletion successful
            }
            // Try to delete in subcategories
            if (deleteCategoryById(categories[i].subcategory, id)) {
                return true; // Deletion successful in subcategories
            }
        }
        return false; // Category not found
    };

    const deleteCategory = async (id: number) => {
        const deleted = deleteCategoryById(items.value, id);
        if (!deleted) {
            console.error('Category not found');
        } else {
            // Optionally, update total and per_page if necessary
            total.value--;
            per_page.value--;
        }
        triggerRef(items); // Notify Vue about the change
    };

    return {
        items,
        total,
        per_page,
        init,
        create,
        update,
        deleteCategory
    };
});