<template>
  <div class="order-management">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加订单</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 订单表单 -->
    <el-card class="order-card">
      <el-form
        :model="orderForm"
        :rules="orderFormRules"
        label-width="100px"
        class="order-form"
        ref="orderFormRef"
      >
        <el-row justify="center">
          <el-col :span="24">
            <el-form-item label="用户ID" prop="uid">
              <el-input
                v-model="orderForm.uid"
                placeholder="请输入用户ID"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="课本ID" prop="tid">
              <el-input
                v-model="orderForm.tid"
                placeholder="请输入课本ID"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="数量" prop="quantity">
              <el-input
                v-model="orderForm.quantity"
                placeholder="请输入数量"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="总金额" prop="total_price">
              <el-input
                v-model="orderForm.total_price"
                placeholder="请输入总金额"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="orderForm.status"
                placeholder="请选择订单状态"
              >
                <el-option label="未完成" :value="false"></el-option>
                <el-option label="已完成" :value="true"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="handleSubmit"
                >提交订单</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { AddOrder } from "../../api/admin/BookCategory.js";

const orderForm = ref({
  uid: "", // 用户ID
  tid: "",
  quantity: "",
  total_price: "",
  status: false,
});

const orderFormRules = {
  uid: [{ required: true, message: "请输入用户ID", trigger: "blur" }],
  tid: [{ required: true, message: "请输入课本ID", trigger: "blur" }],
  quantity: [{ required: true, message: "请输入数量", trigger: "blur" }],
  total_price: [{ required: true, message: "请输入总金额", trigger: "blur" }],
  status: [{ required: true, message: "请选择订单状态", trigger: "change" }],
};

const orderFormRef = ref(null);

const handleSubmit = () => {
  orderFormRef.value.validate(async (valid) => {
    if (valid) {
      try {
        const response = await AddOrder(orderForm.value.uid, orderForm.value);
        ElMessage.success("订单提交成功");
        resetForm();
      } catch (error) {
        console.error("订单提交失败:", error);
        ElMessage.error("订单提交失败");
      }
    } else {
      console.log("表单验证失败");
      ElMessage.error("表单验证失败，请检查输入");
    }
  });
};

const resetForm = () => {
  orderForm.value = {
    uid: "",
    tid: "",
    quantity: "",
    total_price: "",
    status: false,
  };
};
</script>

<style scoped>
.order-management {
  background-color: #f0f2f5; /* 设置与主页相符的背景颜色 */
  padding: 20px;
  color: #333; /* 设置与主页相符的文字颜色 */
}

.order-card {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-form {
  max-width: 500px;
  margin: 0 auto;
}

.order-form .el-input,
.order-form .el-select,
.order-form .el-button {
  width: 100%;
}

.order-form .el-button {
  margin-top: 20px;
  background-color: #409eff; /* 设置与主页相符的按钮背景颜色 */
  border-color: #409eff; /* 设置与主页相符的按钮边框颜色 */
}

.order-form .el-button:hover {
  background-color: #66b1ff; /* 设置与主页相符的按钮悬停背景颜色 */
  border-color: #66b1ff; /* 设置与主页相符的按钮悬停边框颜色 */
}
</style>
