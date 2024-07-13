<script setup lang="ts">
import {getProductCategories} from "~/apis/get-product-categories";
import type {TreeNode} from "primevue/treenode";
import expandAll, {expandedKeys} from "~/composables/expand-tree";
import type {TreeTableFilterMeta} from "primevue/treetable";
import type {ProductCategory} from "~/models/product-category";
import {useMockProductCategoryStore} from "~/stores/mock-product-category-store";

const nodes = ref<TreeNode[]>([]);
const filters = ref<TreeTableFilterMeta>({});
const categoryFilter = computed({
  get: () => typeof filters.value['global'] === 'string' ? filters.value['global'] : '',
  set: (value: string) => { filters.value['global'] = value; }
});

onBeforeMount(async () => {
  // 假資料 init
  useMockProductCategoryStore().init();

  await getCategoriesAndRefresh();
});

const getCategoriesAndRefresh = async () => {
  clear();
  const categories = await getProductCategories();
  nodes.value = categories.map(convertProductCategoryToTreeNode);
  expandAll(nodes.value);
  triggerRef(nodes);
};

function convertProductCategoryToTreeNode(category: ProductCategory): TreeNode {
  return {
    key: category.id.toString(),
    label: category.name,
    data: category,
    children: category.subcategory.map(convertProductCategoryToTreeNode),
    leaf: category.subcategory.length === 0,
  };
}

const haveSubcategory = (node: TreeNode) => !!node.children && node.children.length > 0;

const createProductCategoryParentId = ref<number | null>(null);
const createProductCategory = (parentId: number) => {
  updateProductCategoryParentId.value = null;
  createProductCategoryParentId.value = parentId;
};

const updateProductCategoryParentId = ref<number | null>(null);
function updateProductCategory(category: ProductCategory) {
  createProductCategoryParentId.value = null;
  updateProductCategoryParentId.value = category.id;
}

const toast = useToast();
function deleteProductCategory(category: ProductCategory) {
  useMockProductCategoryStore().deleteCategory(category.id);
  toast.add({severity: 'success', summary: '刪除成功', detail: `${category.name} 商品分類刪除成功`, life: 5000});
  getCategoriesAndRefresh();
}

async function goProductCategory(category: ProductCategory) {
  await navigateTo({name: 'products'});
  return;
}

const isTopLevel = (node: TreeNode) => !node.parent;

const clear = () => {
  createProductCategoryParentId.value = null;
  updateProductCategoryParentId.value = null;
};
const selectedKey = ref();

// drag
let draggedItem: TreeNode | null = null;

const onDragStart = (event: DragEvent, node: TreeNode) => {
  draggedItem = node;
  event.dataTransfer?.setDragImage(event.target as HTMLElement, 0, 0);
  event.dataTransfer?.setData('text/plain', ''); // Necessary for Firefox
  event.dataTransfer!.effectAllowed = 'move';
};

const onDragOver = (event: DragEvent) => {
  event.preventDefault(); // Necessary to allow dropping
};

const onDrop = (event: DragEvent, targetNode: TreeNode) => {
  event.preventDefault();
  if (!draggedItem) return;

  const draggedIndex = nodes.value.findIndex(item => item.key === draggedItem!.key);
  const targetIndex = nodes.value.findIndex(item => item.key === targetNode.key);

  if (draggedIndex < 0 || targetIndex < 0 || draggedIndex === targetIndex) return;

  // Move the dragged item in the array
  const [removed] = nodes.value.splice(draggedIndex, 1);
  nodes.value.splice(targetIndex, 0, removed);

  draggedItem = null; // Reset draggedItem after drop
};


</script>

<template>
  <div class="flex justify-between">
    <TreeTable :value="nodes" :filters="filters" filter-mode="lenient" :expanded-keys="expandedKeys"
               selectionMode="single" v-model:selectionKeys="selectedKey"
               class="w-full" :class="{'md:w-9/12': createProductCategoryParentId != null}">
      <template #header>
        <div class="flex w-full gap-4">
          <IconField>
            <InputIcon class="pi pi-search"/>
            <InputText v-model="categoryFilter" placeholder="搜尋"/>
          </IconField>
          <IconField>
            <InputIcon class="pi pi-plus"/>
            <Button icon="pi pi-plus" @click="createProductCategory(0)" label="新增大分類"></Button>
          </IconField>
        </div>
      </template>
      <Column field="name" header="" expander>
      </Column>
      <Column body-class="flex justify-end gap-4">
        <template #body="slotProps">
            <Button v-if="isTopLevel(slotProps.node)" icon="pi pi-plus" @click="createProductCategory(slotProps.node.data.id)"></Button>
            <Button icon="pi pi-eye" @click="goProductCategory(slotProps.node.data)"></Button>
            <Button icon="pi pi-pencil" @click="updateProductCategory(slotProps.node.data)"></Button>
            <Button v-if="!haveSubcategory(slotProps.node)" icon="pi pi-trash"
                    @click="deleteProductCategory(slotProps.node.data)"></Button>
        </template>
      </Column>
    </TreeTable>
    <div v-if="createProductCategoryParentId != null" class="w-full md:w-3/12 p-8">
      <CreateProductCategory :parent-category-id="createProductCategoryParentId" @success="getCategoriesAndRefresh" />
    </div>
    <div v-if="updateProductCategoryParentId != null" class="w-full md:w-3/12 p-8">
      <UpdateProductCategory :category-id="updateProductCategoryParentId" @success="getCategoriesAndRefresh" @fail="clear" />
    </div>
  </div>
</template>
