<template>
<div class="app-container">
  <router-link :to="{name:'CreateTab'}">
   <el-button type="primary" plain>添加标记</el-button>
   </router-link>

  <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    v-loading="listLoading"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">

    <el-table-column
      prop="title"
      label="标记名称"
      sortable
      >
    </el-table-column>
    <el-table-column
      prop=""
      label="图标">
      	 <template slot-scope="scope">
                    <img :src="'http://jsq.com/'+scope.row.icon" alt="" height="40px">
           </template>
    </el-table-column>
    <el-table-column
      prop="created_at"
      label="创建时间">
    </el-table-column>
    <el-table-column
      prop="updated_at"
      label="更新时间">
    </el-table-column>
    <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
      <template slot-scope="{row,$index}">
        <router-link :to="'/tab/edit/'+row.id">
          <el-button type="primary" size="mini" style="margin-right: 5px;">
            编辑
          </el-button>
        </router-link>

        <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>

</div>
</template>
<script>
  import { tabList, delTab } from '@/api/tab'

  export default {
    data() {
      return {
        tableData: [],
        listLoading: true,
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        tabList().then(response => {
          this.tableData = response.data;
          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 500)
        })
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delTab(index.id).then(response => {
          this.$notify({
            message: '删除成功',
            type: 'success',
            duration: 3000
          })
          this.tableData.splice(row, 1)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      }
    },
  }
</script>
