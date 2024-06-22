<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card>
      <!-- 订单表格 -->
      <el-table :data="orders" stripe style="width: 100%">
        <el-table-column prop="id" label="订单ID" width="100" align="center" />
        <el-table-column prop="uid" label="用户ID" align="center" width="80" />
        <el-table-column prop="tid" label="课本ID" align="center" width="80" />
        <el-table-column
          prop="quantity"
          label="数量"
          align="center"
          width="70"
        />
        <el-table-column prop="total_price" label="总金额" align="center">
          <template #default="{ row }"> {{ row.total_price }} ￥ </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template #default="{ row }">
            <el-select
              v-model="row.status"
              @change="handleStatusChange(row)"
              placeholder="请选择"
            >
              <el-option
                v-for="status in editableStatusList"
                :key="status"
                :label="status"
                :value="status"
              />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="{ row }">
            <!-- 删除按钮 -->
            <el-button type="danger" size="mini" @click="handleDelete(row.id)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="demo-pagination-block">
        <el-pagination
          v-model:currentPage="pagination.currentPage"
          v-model:pageSize="pagination.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 修改状态对话框 -->
    <el-dialog
      title="修改订单状态"
      width="30%"
      :before-close="handleDialogClose"
      ref="dialog"
    >
      <el-form :model="editForm" ref="editForm">
        <el-form-item
          label="订单状态"
          :label-width="formLabelWidth"
          prop="status"
        >
          <el-select v-model="editForm.status" placeholder="请选择">
            <el-option
              v-for="status in editableStatusList"
              :key="status"
              :label="status"
              :value="status"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="handleDialogClose">取消</el-button>
        <el-button type="primary" @click="handleSaveEdit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import axios from "axios";

// 响应式数据
const orders = ref([]);
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 0,
});
const dialogVisible = ref(false);
const editForm = reactive({
  id: null,
  status: "", // 修改为 status 属性
});
const formLabelWidth = "80px";

// 获取订单数据
const fetchOrders = async () => {
  try {
    const response = await axios.get("http://localhost:3000/admin/order");
    orders.value = response.data;
    pagination.total = response.data.length;
  } catch (error) {
    console.error("获取订单数据失败:", error);
    ElMessage.error("获取订单数据失败");
  }
};

// 模拟组件挂载时获取数据
onMounted(fetchOrders);

// 处理分页大小变更
const handleSizeChange = (newSize) => {
  pagination.pageSize = newSize;
  fetchOrders(); // 分页变更后重新获取数据
};

// 处理当前页变更
const handleCurrentChange = (newPage) => {
  pagination.currentPage = newPage;
  fetchOrders(); // 页码变更后重新获取数据
};

// 处理编辑按钮点击事件，仅限修改订单状态
const edit = (row) => {
  // 打开对话框并初始化表单
  editForm.id = row.id;
  editForm.status = row.status;
  dialogVisible.value = true;
};

// 处理保存按钮点击事件
const handleSaveEdit = async () => {
  // 模拟更新订单状态，实际项目中需调用后端接口
  const updatedOrder = orders.value.find((order) => order.id === editForm.id);
  if (updatedOrder) {
    updatedOrder.status = editForm.status;
  }

  // 仅关闭对话框并显示成功提示
  dialogVisible.value = false;
  ElMessage.success("订单状态更新成功");
};

// 处理订单状态修改
const handleStatusChange = (row) => {
  // 可以在这里进行一些联动操作，如实时校验、提示等
};

// 处理删除按钮点击事件
const handleDelete = (orderId) => {
  ElMessageBox.confirm("确定删除订单吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        await deleteOrder(orderId);
        ElMessage.success("订单删除成功");
        fetchOrders(); // 删除成功后重新获取数据
      } catch (error) {
        console.error("删除订单失败:", error);
        ElMessage.error("删除订单失败");
      }
    })
    .catch(() => {
      ElMessage.info("已取消删除");
    });
};

// 删除订单的方法
const deleteOrder = async (orderId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/admin/order/${orderId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("删除订单失败");
  }
};

// 根据订单状态返回对应的标签样式
const statusTagType = (status) => {
  switch (status) {
    case "pending":
      return "warning";
    case "confirmed":
      return "primary";
    case "completed":
      return "success";
    default:
      return "danger";
  }
};

// 返回可以编辑的状态列表
const editableStatusList = ["pending", "confirmed", "completed"];

// 判断是否允许编辑当前状态
const editableStatus = (status) => {
  return editableStatusList.includes(status);
};

// 处理对话框关闭事件
const handleDialogClose = () => {
  dialogVisible.value = false;
};
</script>

<style scoped>
.el-card {
  margin-top: 20px;
}

.demo-pagination-block {
  margin-top: 20px;
  text-align: center;
}

.edit-button {
  margin-right: 10px;
}
</style>
