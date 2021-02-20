<template>
 <div class="app-container">
<el-form ref="form" :model="form" :rules="rules" label-width="80px">
  <el-form-item label="标记分类" prop="consult_type_id">
    <el-select v-model="form.parent_id" placeholder="请选择分类" style="width: 58rem;">
      <el-option v-for='item in option' :key='item.id' :value='item.id' :label='item.title'>  			</el-option>
    </el-select>
  </el-form-item>


  <el-form-item label="标记图标" prop="icon">
      <el-upload
        name="upload"
        :action="uploadUrl()"
        list-type="picture-card"
        :limit='1'
        :on-success="handleUpSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>

  </el-form-item>
  <el-form-item label="标记名称" prop="title">
    <el-input v-model="form.title" style="width: 58rem;"></el-input>
  </el-form-item>

    <br>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
<!--     <el-button>取消</el-button> -->
  </el-form-item>
</el-form>
    <!-- 编辑器 -->

  </div>
</template>

<script>

import { storeTab, tabList } from '@/api/tab'
export default {
  data() {
    const validateTitle = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入标题'))
      } else {
        callback()
      }
    }
    return {

      form:{
        title:'',
        icon:'',
      },
        rules: {
          title: [
            { required:true,validator: validateTitle, trigger: 'blur' }
          ],
        },
      option:[],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },

  created() {
    this.getList()
    this.uploadUrl()
  },

  methods: {
    getList(){
      tabList().then( response=>{
        this.option = response.data;

      })
    },
    uploadUrl() {
        var url = process.env.VUE_APP_BASE_API+"/upload/img"// 生产环境和开发环境的判断
        return url
    },

      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) { console.log(file.url)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleUpSuccess(response){

          if(response.uploaded == true){
            this.form.icon = response.url;
            console.log(this.form.icon);
          }
      },


    onSubmit(){ console.log(this.form); 
      storeTab(this.form).then(response => {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.$router.push({name:'TabList'})
        }
      );
    }
  }
}

</script>

<style>
.ckeditor{width: 80%; margin: 30px auto 0px; border:1px solid #ddd;}
</style>
