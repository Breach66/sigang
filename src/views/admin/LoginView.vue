<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { useAuthStore } from "@/stores/authStore";
import { ElMessage } from "element-plus";

const form = reactive({ username: "", password: "" });
const router = useRouter();
const authStore = useAuthStore();
const error = ref(null);

const validateForm = () => {
  if (!form.username || !form.password) {
    ElMessage.error("用户名和密码不能为空。");
    return false;
  }
  return true;
};

const onSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  const response = await axios.post(
    "http://localhost:3000/admin/auth/login",
    form
  );
  if (response.data.code == 1) {
    const token = response.data.token;
    authStore.save(token);
    ElMessage.success(response.data.msg);
    router.push("/"); // 登录成功后跳转到根目录
  } else {
    ElMessage.error(response.data.msg);
  }
  // console.log(response.data);
};
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="login-title">登录</h2>
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="login-button">
            登录
          </el-button>
          <router-link to="/register">
            <el-button>注册</el-button>
          </router-link>
        </el-form-item>
      </el-form>
      <div v-if="error" class="error-message">{{ error }}</div>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
}
.login-card {
  width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.login-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #409eff;
}

.login-button,
el-button {
  width: 100%;
  margin-bottom: 10px;
}

.login-button {
  background-color: #409eff;
  color: #fff;
  border: none;
}

el-button {
  background-color: #67c23a;
  color: #fff;
  border: none;
}

.login-button:hover {
  background-color: #66b1ff;
}

el-button:hover {
  background-color: #85ce61;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
