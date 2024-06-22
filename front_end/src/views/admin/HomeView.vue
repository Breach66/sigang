<template>
  <div class="common-layout">
    <el-container class="theme-container">
      <el-header class="header">
        <h1 class="logo">课本回收管理系统</h1>
        <el-button type="danger" @click="confirmLogout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside class="full-height-aside">
          <el-menu default-active="2" router class="el-menu-vertical-demo">
            <el-sub-menu index="1">
              <template #title>
                <i class="el-icon-location"></i>
                <span>分类管理</span>
              </template>
              <el-menu-item-group title="分类">
                <el-menu-item index="/category">
                  <i class="el-icon-menu"></i> 分类列表
                </el-menu-item>
                <el-menu-item index="/add/category">
                  <i class="el-icon-plus"></i> 添加分类
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="2">
              <template #title>
                <i class="el-icon-location"></i>
                <span>课本管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/textkbook">
                  <i class="el-icon-notebook-2"></i> 课本列表
                </el-menu-item>
                <el-menu-item index="/add/textkbook">
                  <i class="el-icon-edit"></i> 添加课本
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="3">
              <template #title>
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/order">
                  <i class="el-icon-document"></i> 订单详情
                </el-menu-item>
                <el-menu-item index="/add/order">
                  <i class="el-icon-edit-outline"></i> 添加订单
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>

            <el-sub-menu index="4">
              <template #title>
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/admin/user">
                  <i class="el-icon-user"></i> 用户列表
                </el-menu-item>
                <el-menu-item index="/add/user">
                  <i class="el-icon-plus"></i> 添加用户
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <div class="welcome-message">
            <h2>欢迎来到课本回收管理系统</h2>
            <i class="el-icon-star"></i>
          </div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/authStore";
import axios from "axios";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";

const userStore = useAuthStore();
const token = userStore.userinfo.token;

axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

const router = useRouter();

const confirmLogout = () => {
  ElMessageBox.confirm("确认退出登录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      userStore.clear();
      delete axios.defaults.headers.common["Authorization"];
      router.push("/login");
      ElMessageBox.alert("已退出登录", "提示", {
        confirmButtonText: "确定",
      });
    })
    .catch(() => {
      // 用户点击取消按钮时的处理逻辑
    });
};
</script>

<style scoped>
/* 主题样式 */
.common-layout {
  background-color: #f0f2f5; /* 整体背景颜色 */
}

.header {
  background-color: #35495e; /* 深蓝色背景 */
  color: #ffffff; /* 白色字体 */
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

.header .logo {
  font-size: 1.8rem;
  margin: 0;
}

.el-button {
  margin-left: 20px;
}

.full-height-aside {
  height: calc(100vh - 60px);
  width: 200px; /* 侧边栏宽度 */
}

.el-sub-menu {
  margin-bottom: 20px;
}

.el-icon-location {
  margin-right: 10px;
  font-size: 18px;
}

.el-main {
  padding: 20px;
}

.welcome-message {
  text-align: center;
  margin-bottom: 20px;
}

.welcome-message h2 {
  font-size: 1.5rem;
  color: #333;
}

.welcome-message i {
  font-size: 3rem;
  color: #f39c12;
  margin-top: 10px;
  display: block;
}
</style>
