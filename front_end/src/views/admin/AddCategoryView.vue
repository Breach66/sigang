<script setup>
import { ref } from "vue";
import { postCategory } from "@/api/admin/BookCategory.js";
import { ElMessage } from "element-plus";

const input = ref("");

// 添加分类
const add = async () => {
  if (!input.value.trim()) {
    ElMessage.error("输入框不能为空");
    return;
  }
  try {
    const result = await postCategory({ name: input.value });
    if (result.name) {
      ElMessage.success("添加成功");
      input.value = ""; // 清空输入框
    } else {
      ElMessage.error("添加失败");
    }
  } catch (error) {
    ElMessage.error("请求失败，请稍后再试");
  }
};
</script>
<template>
  添加分类
  <el-card>
    <el-input
      v-model="input"
      style="width: 240px"
      placeholder="添加分类"
      clearable
    />
    <el-button type="primary" plain @click="add">添加</el-button>
  </el-card>
</template>

<style scoped>
.el-card {
  margin-top: 15px;
  width:500px ;
}
</style>
