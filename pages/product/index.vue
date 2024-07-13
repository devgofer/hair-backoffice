<script setup lang="ts">
import {getProducts} from "~/apis/get-products";
import type {Product} from "~/models/product";
import type {TreeTableFilterMeta} from "primevue/treetable";

const filters = ref<TreeTableFilterMeta>({});
const productFilter = computed({
  get: () => typeof filters.value['global'] === 'string' ? filters.value['global'] : '',
  set: (value: string) => { filters.value['global'] = value; }
});

const products = ref<Product[]>();
const selectedProduct = ref();
onBeforeMount(async () => {
  products.value = await getProducts();
})

const createProduct = async () => {
  await navigateTo('/product/create');
  return;
}
</script>

<template>
  <div class="card">
    <DataTable v-model:selection="selectedProduct" :value="products" dataKey="id" tableStyle="min-width: 50rem">
      <template #header>
        <div class="flex w-full gap-4">
          <IconField>
            <InputIcon class="pi pi-search"/>
            <InputText v-model="productFilter" placeholder="搜尋"/>
          </IconField>
          <IconField>
            <InputIcon class="pi pi-plus"/>
            <Button icon="pi pi-plus" @click="createProduct" label="新增商品"></Button>
          </IconField>
        </div>
      </template>
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column field="hidden_period" header="隱藏檔期"></Column>
      <Column field="store_code" header="店家貨號"></Column>
      <Column field="name" header="中文名稱"></Column>
      <Column field="price" header="實際售價"></Column>
      <Column field="cost" header="成本"></Column>
      <Column field="inventory" header="庫存"></Column>
      <Column field="profit" header="毛利"></Column>
      <Column field="profit_margin" header="毛利率"></Column>
      <Column field="on_shelf" header="上下架">
        <template #body="slotProps">
          <ToggleSwitch v-model="slotProps.data.on_shelf" :disabled="true"/>
        </template>
      </Column>
      <Column field="frontend_display" header="前台顯示">
        <template #body="slotProps">
          <ToggleSwitch v-model="slotProps.data.frontend_display" :disabled="true"/>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<style scoped>

</style>