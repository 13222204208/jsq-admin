<template>
  <div class="app-container">
     <router-link :to="{name:'CreateConsultType'}">
      <el-button type="primary" plain>添加分类</el-button>
      </router-link>
  <el-table
    :data="tableData"
     v-loading="listLoading"
    style="width: 100%">
    <el-table-column
      label="ID"
      width="180">
      <template slot-scope="scope">
        <i ></i>
        <span style="margin-left: 10px">{{ scope.row.id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="协议类型"
      width="280">
      <template slot-scope="scope">
        <i ></i>
        <span style="margin-left: 10px">{{ scope.row.title }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
<!--        <el-button type="primary"
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑查看</el-button> -->
          <router-link :to="'/consult/edit-type/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
          </router-link>
      </template>
    </el-table-column>
  </el-table>
 </div>
</template>

<script>
  import { ConsultTypeList} from '@/api/consult-type'
  export default {
    data() {
      return {
        tableData:null,
        listLoading: true,
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList(){
        this.listLoading = true
        ConsultTypeList().then( response=>{
          this.tableData = response.data;

          this.listLoading = false

        })
      },
    }
  }
</script>
