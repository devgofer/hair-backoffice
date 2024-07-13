<script setup lang="ts">
import {createProductCategory} from "~/apis/create-product-category";
import {uploadImage} from "~/apis/upload-image";
import { useToast } from "primevue/usetoast";

const name = ref('');
const status = ref(false);

const props = defineProps({
  parentCategoryId: {
    type: Number,
    required: true,
  },
});

const emits = defineEmits(['success']);

const toast = useToast();
const create = async (e: Event) => {
  e.preventDefault();
  if (!checkForm()) return;
  await createProductCategory({name: name.value, status: +status.value, image: imageUrl, parent_id: props.parentCategoryId});
  toast.add({ severity: 'success', summary: '商品分類新增成功', detail: `${name.value} 商品分類已新增`, life: 5000 });
  emits('success');
};

const fileupload = ref();

let imageUrl = '';
const upload = async () => {
  if(!fileupload.value.files[0]) {
    toast.add({ severity: 'error', summary: '錯誤', detail: '請上傳圖片', life: 5000 });
    return;
  }
  imageUrl = (await uploadImage(fileupload.value.files[0])).url;
  toast.add({ severity: 'success', summary: '圖片上傳成功', life: 5000 });
};

const checkForm = () => {
  if (!name.value) {
    toast.add({ severity: 'error', summary: '錯誤', detail: '請輸入分類名稱', life: 5000  });
    return false;
  }
  if(!imageUrl) {
    toast.add({ severity: 'error', summary: '錯誤', detail: '請上傳圖片', life: 5000  });
    return false;
  }
  return true;
};
</script>

<template>
  <form class="flex flex-col gap-4">
    <VLabel field-name="name" label="分類名稱" required/>
    <InputText type="text" v-model="name" placeholder="分類名稱"/>
    <VLabel field-name="status" label="狀態" required/>
    <ToggleSwitch v-model="status"/>
    <VLabel field-name="image" label="圖片" required/>
    <div class="card flex gap-4 items-center justify-between">
      <FileUpload ref="fileupload" mode="basic" name="categoryImage[]"  accept="image/*" :maxFileSize="1000000" />
      <Button label="上傳" @click="upload" severity="secondary"/>
    </div>
    <Button type="submit" label="新增" @click="create"/>
  </form>
</template>
