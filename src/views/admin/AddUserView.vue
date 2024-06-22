<template>
  <div class="add-user">
    <el-card>
      <h2>添加用户</h2>
      <form @submit.prevent="handleSubmit">
        <div class="form-item">
          <label for="username">用户名</label>
          <el-input
            id="username"
            v-model.trim="userForm.username"
            placeholder="请输入用户名"
          ></el-input>
          <span class="error-msg" v-if="usernameError">{{
            usernameError
          }}</span>
        </div>
        <div class="form-item">
          <label for="password">密码</label>
          <el-input
            id="password"
            v-model.trim="userForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
          <span class="error-msg">{{ passwordError }}</span>
        </div>
        <div class="form-item">
          <el-button
            type="primary"
            :disabled="!isFormValid"
            native-type="submit"
            >添加用户</el-button
          >
        </div>
      </form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import { ElMessage, ElInput, ElButton } from "element-plus";

const userForm = ref({
  username: "",
  password: "",
});

let usernameError = "";
let passwordError = "";

const handleSubmit = async () => {
  // 简单的前端验证
  if (!userForm.value.username.trim()) {
    usernameError = "用户名不能为空";
    return;
  } else {
    usernameError = "";
  }
  if (!userForm.value.password.trim()) {
    passwordError = "密码不能为空";
    return;
  } else {
    passwordError = "";
  }

  try {
    // 向后端发送 POST 请求
    const response = await axios.post("http://localhost:3000/admin/users", {
      username: userForm.value.username,
      password: userForm.value.password,
      role: "user", // 确保角色是 "user"
    });

    // 请求成功处理
    console.log("用户添加成功", response.data);
    ElMessage.success("用户添加成功");

    // 清空表单
    userForm.value.username = "";
    userForm.value.password = "";
  } catch (error) {
    // 请求失败处理
    console.error("用户添加失败", error);
    ElMessage.error("用户添加失败：" + error.message);
  }
};

const isFormValid = computed(() => {
  return !!userForm.value.username.trim() && !!userForm.value.password.trim();
});
</script>

<style scoped>
.add-user {
  padding: 20px;
}

.add-user h2 {
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #333;
}

.el-card {
  width: 500px;
  margin: 0 auto;
}

.form-item {
  margin-bottom: 20px;
}

.error-msg {
  color: red;
  font-size: 0.8rem;
}
</style>
