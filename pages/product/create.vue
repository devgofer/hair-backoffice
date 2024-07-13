<script setup lang="ts">
const hiddenPeriods = ref([
  {name: "官網", code: "OFFICIAL"},
  {name: "店家", code: "STORE"},
]);
const hiddenPeriod = ref(null);

const productCategories = ref([
  {name: "A", code: "A"},
  {name: "B", code: "B"},
]);
const productCategory = ref(null);
const storeCode = ref('');
const name = ref('');
const englishName = ref('');
const recommend = ref('');
const weight = ref('');
const expiredDate = ref('');
const usingOrder = ref('');
const gram = ref('');
const cost = ref('');
const suggestedPrice = ref('');
const actualPrice = ref('');
const safetyStock = ref(null);
const PurchaseLimit = ref(null);
const automaticListingTime = ref(null);
const automaticDelistingTime = ref(null);
const status = ref(false);
const isShow = ref(false);
const tags = ref([]);
const isPreOrder = ref(false);
const leadTime = ref(null);
const preOrderDescription = ref('');

const goBack = () => {
  const router = useRouter();
  router.back();
};

const toast = useToast();
const create = async (e: Event) => {
  e.preventDefault();
  if (!checkForm()) return;
  toast.add({ severity: 'success', summary: '商品新增成功', detail: `${name.value} 商品已新增`, life: 5000 });
  await navigateTo(`/product`);
};

const checkForm = () => {
  if (!hiddenPeriod.value) {
    toast.add({ severity: 'error', summary: '錯誤', detail: '請選擇隱賣檔期', life: 5000 });
    return false;
  }
  if (!productCategory.value) {
    toast.add({ severity: 'error', summary: '錯誤', detail: '請選擇商品分類', life: 5000 });
    return false;
  }
  if (!name.value) {
    toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入中文名稱', life: 5000 });
    return false;
  }
  if (!gram.value) {
    toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入重量（克）', life: 5000 });
    return false;
  }
  if (!cost.value) {
    toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入商品成本', life: 5000 });
    return false;
  }
  if (!suggestedPrice.value) {
    toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入建議售價', life: 5000 });
    return false;
  }
  if (!actualPrice.value) {
    toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入實際售價', life: 5000 });
    return false;
  }
  if (!safetyStock.value) {
    toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入安全存量', life: 5000 });
    return false;
  }
  if (!PurchaseLimit.value) {
    toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入限購數量', life: 5000 });
    return false;
  }
  return true;
}

</script>

<template>
  <div class="flex flex-col gap-4">
    <VLabel field-name="hiddenPeriod" label="隱賣檔期" required/>
    <Select v-model="hiddenPeriod" :options="hiddenPeriods" optionLabel="name" placeholder="選擇隱賣檔期"
            class="w-full md:w-56"/>

    <VLabel field-name="storeCode" label="店家貨號"/>
    <InputText v-model="storeCode" label="店家貨號" class="w-full md:w-56"/>

    <VLabel field-name="productCategory" label="商品分類"/>
    <Select v-model="productCategory" :options="productCategories" optionLabel="name" placeholder="選擇商品分類"
            class="w-full md:w-56"/>

    <VLabel field-name="name" label="中文名稱" required/>
    <InputText v-model="name" label="中文名稱" class="w-full md:w-56"/>

    <VLabel field-name="englishName" label="英文名稱"/>
    <InputText v-model="englishName" label="英文名稱" class="w-full md:w-56"/>

    <VLabel field-name="recommend" label="推薦使用"/>
    <InputText v-model="recommend" label="推薦使用" class="w-full md:w-56"/>

    <VLabel field-name="weight" label="容量/重量"/>
    <InputText v-model="weight" label="容量/重量" class="w-full md:w-56"/>

    <VLabel field-name="expiredDate" label="保存期限"/>
    <InputText v-model="expiredDate" label="保存期限" class="w-full md:w-56"/>

    <VLabel field-name="usingOrder" label="使用順序"/>
    <InputText v-model="usingOrder" label="使用順序" class="w-full md:w-56"/>

    <VLabel field-name="gram" label="重量（克）" required/>
    <InputText v-model="gram" label="重量（克）" class="w-full md:w-56"/>

    <VLabel field-name="cost" label="商品成本" required/>
    <InputText v-model="cost" label="商品成本" class="w-full md:w-56"/>

    <VLabel field-name="suggestedPrice" label="建議售價" required/>
    <InputText v-model="suggestedPrice" label="建議售價" class="w-full md:w-56"/>

    <VLabel field-name="actualPrice" label="實際售價" required/>
    <InputText v-model="actualPrice" label="實際售價" class="w-full md:w-56"/>

    <VLabel field-name="safetyStock" label="安全存量" required/>
    <InputNumber v-model="safetyStock" label="安全存量" class="w-full md:w-56"/>

    <VLabel field-name="PurchaseLimit" label="限購數量" required/>
    <InputNumber v-model="PurchaseLimit" label="限購數量" class="w-full md:w-56"/>

    <VLabel field-name="automaticListingTime" label="自動上架"/>
    <DatePicker v-model="automaticListingTime" class="w-full md:w-56"/>

    <VLabel field-name="automaticDelistingTime" label="自動下架"/>
    <DatePicker v-model="automaticDelistingTime" class="w-full md:w-56"/>

    <VLabel field-name="status" label="上下架"/>
    <ToggleSwitch v-model="status"/>

    <VLabel field-name="isShow" label="前台顯示"/>
    <ToggleSwitch v-model="isShow"/>

    <VLabel field-name="tags" label="商品標籤"/>
    <div class="card flex flex-wrap gap-4">
      <div class="flex items-center">
        <Checkbox v-model="tags" inputId="tag1" name="tag1" value="熱門點擊"/>
        <label for="tag1" class="ml-2"> Cheese </label>
      </div>
      <div class="flex items-center">
        <Checkbox v-model="tags" inputId="tag2" name="tag2" value="熱門商品"/>
        <label for="tag2" class="ml-2"> Mushroom </label>
      </div>
    </div>

    <VLabel field-name="isPreOrder" label="預購商品"/>
    <ToggleSwitch v-model="isPreOrder"/>

    <VLabel field-name="leadTime" label="備貨時間"/>
    <DatePicker v-model="leadTime" class="w-full md:w-56" />

    <VLabel field-name="preOrderDescription" label="預購說明"/>
    <InputText v-model="preOrderDescription" class="w-full md:w-56"/>

    <div class="flex gap-4">
      <Button label="返回" severity="secondary" class="w-full md:w-56" @click="goBack" />
      <Button label="新增商品" class="w-full md:w-56" @click="create"/>
    </div>

  </div>
</template>

<style scoped>

</style>