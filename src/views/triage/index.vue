<template>
 <div class="app-container">
<!--      <div class="filter-container">
         <el-input v-model="listQuery.username" placeholder="帐号" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
         <el-button v-waves class="filter-item" type="primary" style="margin-left: 10px;" icon="el-icon-search" @click="handleFilter">
           搜索
         </el-button>

      </div> -->
      <br>
   <el-table
     :key="tableKey"
    :data="tableData"
    v-loading="listLoading"
     border
     fit
     highlight-current-row
     style="width: 100%;"
   >
     <el-table-column label="ID" prop="id" sortable="custom" align="center" width="80" >
       <template slot-scope="{row}">
         <span>{{ row.id }}</span>
       </template>
     </el-table-column>
     <el-table-column label="轻伤人数" align="center">
       <template slot-scope="{row}">
         <span>{{ row.minor_wound+" 人" }}</span>
       </template>
     </el-table-column>

     <el-table-column label="中度伤人数" align="center">
       <template slot-scope="{row}">
         <span>{{ row.moderate_wound+" 人" }}</span>
       </template>
     </el-table-column>

     <el-table-column label="重伤人数" align="center">
       <template slot-scope="{row}">
         <span>{{ row.serious_injuries+" 人" }}</span>
       </template>
     </el-table-column>
     <el-table-column label="死亡人数" align="center">
       <template slot-scope="{row}">
         <span>{{ row.death+" 人" }}</span>
       </template>
     </el-table-column>

     <el-table-column label="提交用户" align="center">
       <template slot-scope="{row}">
         <span>{{ row.user_info.username }}</span>
       </template>
     </el-table-column>

     <el-table-column label="提交时间" align="center">
       <template slot-scope="{row}">
         <span>{{ row.created_at }}</span>
       </template>
     </el-table-column>


     <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
       <template slot-scope="{row,$index}">
        <!--  <el-button v-if="row.status =='2'" size="mini" type="success" @click="handleModifyStatus(row,'已处理')">
            已处理
          </el-button> -->

         <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="handleDelete(row,$index)">
           删除
         </el-button>

       </template>
     </el-table-column>
   </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

</div>
</template>

<script>
   import { triageList ,  delTriage} from '@/api/triage'
   import waves from '@/directive/waves' // waves directive
   import Pagination from '@/components/Pagination' // secondary package based on el-pagination
  export default {
    components: { Pagination },
     directives: { waves },
    data() {
      return {
        tableKey: 0,
        tableData:null,
        listLoading: true,
        total: 0,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          username: undefined,
          sort: '+id'
        },
        temp: {
          id: undefined,
          name: '',
          status: '1'
        },
        dialogPvVisible: false,
        dialogFormVisible: false,
        dialogStatus: '',
        pvData: [],
        textMap: {
          update: '编辑',
          create: 'Create'
        },
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        triageList(this.listQuery).then(response => {
          this.tableData = response.data.item;
          this.total = response.data.total;
          // Just to simulate the time of the request
          setTimeout(() => {
            this.listLoading = false
          }, 500)
        })
      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      },


      handleDelete(index, row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delTriage(index.id).then(response => {
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

    }
  }
</script>
