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

     <el-table-column label="姓名" align="center">
       <template slot-scope="{row}">
         <span>{{ row.name }}</span>
       </template>
     </el-table-column>
     <el-table-column label="手机号码" align="center">
       <template slot-scope="{row}">
         <span>{{ row.phone }}</span>
       </template>
     </el-table-column>
     <el-table-column label="邮箱" align="center">
       <template slot-scope="{row}">
         <span>{{ row.email }}</span>
       </template>
     </el-table-column>
     <el-table-column label="团队" align="center">
       <template slot-scope="{row}">
         <span>{{ row.team }}</span>
       </template>
     </el-table-column>
     <el-table-column label="消息" align="center">
       <template slot-scope="{row}">
                 <el-popover trigger="hover" placement="top">
                   <p>{{ row.news }}</p>
                   <div slot="reference" class="name-wrapper">
                     <el-tag size="medium">{{ row.news }}</el-tag>
                   </div>
                 </el-popover>
       </template>
     </el-table-column>
     <el-table-column label="状态" class-name="status-col" width="100">
       <template slot-scope="{row}">
         <el-tag  >
           {{ row.status == 1 ? '未处理':'已处理' }}
         </el-tag>
       </template>
     </el-table-column>
     <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
       <template slot-scope="{row,$index}">
        <!--  <el-button v-if="row.status =='2'" size="mini" type="success" @click="handleModifyStatus(row,'已处理')">
            已处理
          </el-button> -->
          <el-button v-if="row.status ==1" size="mini" @click="handleModifyStatus(row,'已处理')">
            点击处理
          </el-button>

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
   import { contactList , delContact , updateContact} from '@/api/contact'
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
        contactList(this.listQuery).then(response => {
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
        updateContact(row.id).then(response => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          row.status = 2
        })

      },

      handleDelete(index, row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delContact(index.id).then(response => {
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
