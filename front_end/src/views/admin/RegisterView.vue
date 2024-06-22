<template>
  <div class="register-container">
    <el-card class="register-card">
      <h2 class="register-title">注册</h2>
      <el-form :model="form" label-width="80px" class="register-form">
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户名"
            clearable />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            clearable />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="form.role" placeholder="请选择角色">
            <el-option label="普通用户" value="user"></el-option>
            <el-option label="管理员" value="admin"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="register-button">
            注册
          </el-button>
          <el-button @click="goToLogin" class="login-button"
            >返回登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { ElMessageBox } from "element-plus";

const router = useRouter();
const form = reactive({ username: "", password: "", role: "user" });
const error = ref("");

const onSubmit = async () => {
  try {
    if (!form.username.trim() || !form.password.trim()) {
      ElMessageBox.alert("用户名和密码不能为空", "提示", {
        confirmButtonText: "确定",
        type: "warning",
      });
      return;
    }

    const response = await axios.post(
      "http://localhost:3000/admin/auth/register",
      form
    );

    if (response.data) {
      ElMessageBox.alert("注册成功", "成功", {
        confirmButtonText: "确定",
        type: "success",
      });
      router.push("/login"); // 注册成功后跳转到登录页
    }
  } catch (err) {
    console.error("Register failed:", err);
    if (err.response?.status === 409) {
      error.value = "用户名已存在，请尝试其他用户名。";
    } else {
      error.value =
        err.response?.data?.message || "注册失败，请检查网络连接或稍后再试";
    }
    ElMessageBox.alert(error.value, "错误", {
      confirmButtonText: "确定",
      type: "error",
    });
  }
};

const goToLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
}

.register-card {
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.register-title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #409eff;
}

.register-form {
  padding: 20px;
}

.register-button,
.login-button {
  width: 100%;
  margin-bottom: 10px;
}

.register-button {
  background-color: #409eff;
  color: #fff;
  border: none;
}

.login-button {
  background-color: #67c23a;
  color: #fff;
  border: none;
}

.register-button:hover {
  background-color: #66b1ff;
}

.login-button:hover {
  background-color: #85ce61;
}
</style>
