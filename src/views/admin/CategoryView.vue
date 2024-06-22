<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import { delCategory, putCategory } from "../../api/admin/BookCategory.js";
import { ElMessage } from "element-plus";
const tableData = ref([]);
const pages = reactive({ total: 0, pagesize: 10, currentPage: 1 });
//获取分类列表 封装为函数
async function get_Category() {
  const response = await axios
    .get("http://localhost:3000/admin/category")
    .then((res) => {
      tableData.value = res.data;
      pages.value = res.data.length;
      console.log(pages.value);
      //可以拿到数组的长度
    });
}

//调用函数
get_Category();
//修改分类
const editCategoryDialogVisible = ref(false);
const CategoryInput = ref("");
const nowCategoryId = ref(null);

const edit = (cid) => {
  editCategoryDialogVisible.value = true;
  nowCategoryId.value = cid;
};
//修改
const _putCategory = async () => {
  const reslut = await putCategory(nowCategoryId.value, {
    name: CategoryInput.value,
  });
  ElMessage({
    message: "更新成功",
    type: "success",
  });
  editCategoryDialogVisible.value = false;
  CategoryInput.value = "";
  get_Category();
};
get_Category();
//删除分类
const del = async (cid) => {
  const reslut = await delCategory(cid);
  console.log(reslut);
  ElMessage.success(reslut.msg);
  //删除完之后刷新页面
  get_Category();
};
get_Category();
</script>
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">分类主页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <a href="/">分类页</a>
    </el-breadcrumb-item>
    <el-breadcrumb-item> 分类列表</el-breadcrumb-item>
  </el-breadcrumb>
  <el-card>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="cid" label="分类ID" width="180" />
      <el-table-column prop="name" label="分类名" width="180" />
      <el-table-column prop="" label="操作">
        <template #default="{ row }">
          <el-button type="info" plain @click="edit(row.cid)">修改</el-button>
          <el-popconfirm @confirm="del(row.cid)" title="你确定要删除吗?">
            <template #reference>
              <el-button type="danger"> 删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <template #footer
      ><div class="demo-pagination-block">
        <el-pagination
          v-model:current-page="pages.currentPage"
          v-model:page-size="pages.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.value"
        /></div
    ></template>
  </el-card>
  <el-dialog v-model="editCategoryDialogVisible" title="修改分类" width="500">
    <el-input
      v-model="CategoryInput"
      style="width: 240px"
      placeholder="修改分类"
      clearable
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editCategoryDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="_putCategory"> 修改 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<style scoped>
.el-card {
  margin-top: 15px;
  widows: 100%;
}
</style>
