<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">课本列表</el-breadcrumb-item>
      <el-breadcrumb-item>
        <a href="/">主页</a>
      </el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="tid" label="ID" width="50" />
        <el-table-column prop="name" label="Name" width="100" />
        <el-table-column prop="author" label="Author" width="120" />
        <el-table-column prop="price" label="Price" width="130" />
        <el-table-column prop="quality" label="Quality" width="130" />
        <el-table-column prop="img" label="Img">
          <template v-slot="{ row }">
            <el-image
              style="width: 100px; height: 100px"
              :src="getImageUrl(row.img)"
              :fit="fit"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160">
          <template v-slot="{ row }">
            <div class="button-group">
              <el-button type="primary" size="mini" @click="handleEdit(row)">
                修改
              </el-button>
              <el-popconfirm
                @confirm="handleDelete(row.tid)"
                title="你确定要删除吗?"
              >
                <template #reference>
                  <el-button type="danger"> 删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <div
        class="demo-pagination-block"
        style="margin-top: 20px; text-align: center"
      >
        <el-pagination
          v-model:current-page="pages.currentPage"
          v-model:page-size="pages.pageSize"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pages.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- Edit Modal -->
    <el-dialog v-model="editDialogVisible" title="修改课本" width="500px">
      <el-form :model="editForm">
        <el-form-item label="Name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="Author">
          <el-input v-model="editForm.author"></el-input>
        </el-form-item>
        <el-form-item label="Price">
          <el-input v-model="editForm.price"></el-input>
        </el-form-item>
        <el-form-item label="Quality">
          <el-input v-model="editForm.quality"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveEdit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import {
  fetchTextbook,
  DelTextBook,
  putTextBook,
} from "@/api/admin/BookCategory.js";

const tableData = ref([]);
const pages = reactive({ total: 0, pageSize: 10, currentPage: 1 });
const editDialogVisible = ref(false);
const editForm = reactive({
  tid: "",
  name: "",
  author: "",
  price: "",
  quality: "",
});

// 获取分类列表 封装为函数
async function get_Category() {
  const response = await fetchTextbook({
    pageSize: pages.pageSize,
    page: pages.currentPage,
  });
  tableData.value = response.rows;
  pages.total = response.count;
}

// 调用函数
get_Category();

// 修改分类
const handleEdit = (row) => {
  editForm.tid = row.tid;
  editForm.name = row.name;
  editForm.author = row.author;
  editForm.price = row.price;
  editForm.quality = row.quality;
  editDialogVisible.value = true;
};

// 修改
const saveEdit = async () => {
  const response = await putTextBook(editForm.tid, {
    name: editForm.name,
    author: editForm.author,
    price: editForm.price,
    quality: editForm.quality,
  });
  if (response.code === 1) {
    ElMessage.success(response.msg);
    editDialogVisible.value = false;
    get_Category();
  } else {
    ElMessage.error(response.msg);
  }
};

// 删除分类
const handleDelete = async (tid) => {
  const response = await DelTextBook(tid);
  if (response.code === 1) {
    ElMessage.success(response.msg);
    get_Category();
  } else {
    ElMessage.error(response.msg);
  }
};

// 获取图片URL
const getImageUrl = (imgPath) => {
  return `http://localhost:3000/${imgPath}`;
};

const handleSizeChange = (newSize) => {
  pages.pageSize = newSize;
  get_Category();
};

const handleCurrentChange = (newPage) => {
  pages.currentPage = newPage;
  get_Category();
};

onMounted(get_Category);
</script>

<style scoped>
.el-card {
  margin-top: 15px;
  width: 100%;
}

.button-group {
  display: flex;
  justify-content: flex-end;
}

.button-group .el-button {
  margin-right: 5px;
}
</style>
