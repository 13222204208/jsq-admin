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

     <el-table-column label="团队名称" align="center">
       <template slot-scope="{row}">
         <span>{{ row.title }}</span>
       </template>
     </el-table-column>
     <el-table-column label="付费类型" align="center">
       <template slot-scope="{row}">
         <span>{{ row.duration==1?"包年":"终身" }}</span>
       </template>
     </el-table-column>
    <el-table-column label="创始人" align="center">
       <template slot-scope="{row}">
         <span>{{ row.user_info.username }}</span>
       </template>
     </el-table-column>
     <el-table-column label="到期时间" align="center">
       <template slot-scope="{row}">
         <span>{{ row.stop_time }}</span>
       </template>
     </el-table-column>
     <el-table-column label="创建时间" align="center">
       <template slot-scope="{row}">
         <span>{{ row.created_at }}</span>
       </template>
     </el-table-column>

     <el-table-column label="状态" class-name="status-col" width="100">
       <template slot-scope="{row}">
         <el-tag  >
           {{ row.status == 1 ? '正常':'禁用' }}
         </el-tag>
       </template>
     </el-table-column>
     <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
       <template slot-scope="{row}">
        <!--  <el-button v-if="row.status =='2'" size="mini" type="success" @click="handleModifyStatus(row,'已处理')">
            已处理
          </el-button> -->
          <el-button v-if="row.status ==1" size="mini" @click="handleModifyStatus(row,'已处理')">
            点击禁用
          </el-button>
          <el-button v-if="row.status ==2" size="mini" @click="handleModifyStatus(row,'取消禁用')">
            取消禁用
          </el-button>

       
       </template>
     </el-table-column>
   </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

</div>
</template>

<script>
   import { teamList , updateTeam} from '@/api/team'
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
        teamList(this.listQuery).then(response => {
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

      handleModifyStatus(row, status) {
        console.log(row);
        updateTeam(row.id,row.status).then(response => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          row.status = row.status==1?2:1
        })
      },
    }
  }
</script>
