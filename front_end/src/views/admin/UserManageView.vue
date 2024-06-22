<template>
  <div class="user-management">
    <h2>用户列表</h2>
    <el-card class="user-list-card">
      <el-table :data="paginatedUsers" stripe style="width: 100%">
        <el-table-column prop="uid" label="ID" width="80"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="role" label="role"></el-table-column>
        <el-table-column prop="createdAt" label="注册时间"></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'active' ? 'success' : 'danger'">
              {{ row.status === "active" ? "激活" : "禁用" }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="users.length"
          :page-size="10"
          v-model:currentPage="currentPage"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";

const users = ref([]);
const currentPage = ref(1);

// Fetch users from backend
const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/admin/users");
    users.value = response.data.map((user) => ({
      ...user,
      status: user.role === "admin" ? "active" : user.status, // Ensure admins are always active
      createdAt: new Date(user.createdAt).toLocaleString(), // Format registration time
    }));
  } catch (error) {
    ElMessage.error("无法获取用户数据");
  }
};

// Call fetchUsers when component is mounted
onMounted(fetchUsers);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * 10;
  const end = start + 10;
  return users.value.slice(start, end);
});
//功能还未完善以后会持续更改
</script>

<style scoped>
.user-management {
  padding: 20px;
}

.user-management h2 {
  margin-bottom: 20px;
  font-size: 1.8rem;
  color: #333;
}

.user-list-card {
  padding: 20px;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}

/* Custom styles for table */
.el-table__row {
  transition: background-color 0.3s ease;
}

.el-table__row:hover {
  background-color: #f5f5f5;
}

.el-tag--success {
  background-color: #67c23a;
}

.el-tag--danger {
  background-color: #f56c6c;
}
</style>