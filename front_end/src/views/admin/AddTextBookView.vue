<template>
  <div>
    <el-form
      :model="form"
      label-width="120px"
      style="max-width: 600px; margin: 20px auto"
    >
      <el-form-item>
        <h1 class="page-title">添加图书主页</h1>
      </el-form-item>
      <el-form-item label="书名">
        <el-input v-model="form.name" placeholder="请输入书名" />
      </el-form-item>
      <el-form-item label="分类">
        <el-input v-model="form.cid" placeholder="请输入分类" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="form.author" placeholder="请输入作者" />
      </el-form-item>
      <el-form-item label="price">
        <el-input v-model="form.price" placeholder="请输入价格" />
      </el-form-item>
      <el-form-item label="数量">
        <el-input v-model="form.quality" placeholder="请输入数量" />
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
          :auto-upload="false"
          :on-change="handleChange"
          accept=""
          list-type="picture-card"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <i class="el-icon-plus"></i>
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button @click="onResetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { post } from "../../utils/request.js";
import {
  ElMessage,
  ElUpload,
  ElButton,
  ElInput,
  ElFormItem,
  ElForm,
} from "element-plus";

const form = ref({
  cid: "",
  name: "",
  author: "",
  price: "",
  quality: "",
  file: null,
});
const initialFormState = { ...form.value };
const imageUrl = ref("");

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("封面图片必须为 JPG 格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("封面图片大小不能超过 2MB!");
    return false;
  }
  return true;
};

const handleChange = (file) => {
  console.log(file);
  imageUrl.value = file.url;
  form.value.file = file.raw || file;
};

const onSubmit = async () => {
  // Check if any required field is empty
  if (
    !form.value.name ||
    !form.value.cid ||
    !form.value.author ||
    !form.value.price ||
    !form.value.quality ||
    !form.value.file
  ) {
    ElMessage.error("请填写所有必填项！");
    return;
  }

  console.log("Submitting form...");
  const formData = new FormData();
  formData.append("cid", form.value.cid);
  formData.append("name", form.value.name);
  formData.append("author", form.value.author);
  formData.append("file", form.value.file);
  formData.append("price", form.value.price);
  formData.append("quality", form.value.quality);

  try {
    const result = await post("/admin/textbook", formData, true);
    console.log(result);
    ElMessage.success("图书创建成功!");
  } catch (error) {
    console.error("创建图书失败:", error);
    ElMessage.error("创建图书失败，请重试.");
  }
};

const onResetForm = () => {
  // Reset form fields to initial state
  Object.assign(form.value, initialFormState);
  imageUrl.value = "";
};
</script>

<style scoped>
.page-title {
  text-align: center;
  margin-bottom: 20px;
}

.el-form-item {
  margin-bottom: 20px;
}

.avatar-uploader {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}

.el-button {
  margin-right: 10px;
}
</style>
