<template>
 <div class="app-container">
<el-form ref="form" :model="form" :rules="rules" label-width="80px">


  <el-form-item label="标记图标" prop="icon">
      <el-upload
        name="upload"
        :action="uploadUrl"
        list-type="picture-card"
        :limit='1'
        :file-list="imgFilesList"
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

  <el-form-item>
    <el-button type="primary" @click="onSubmit">更新保存</el-button>
<!--     <el-button>取消</el-button> -->
  </el-form-item>
</el-form>
    <!-- 编辑器 -->

  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn'
import { editTab, updateTab } from '@/api/tab'

export default {
  data() {
    const validateTitle = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入标名称'))
      } else {
        callback()
      }
    }
    return {
      editor:null,//编辑器实例
      form:{
        id:'',
        title:'',
        icon:'',
      },
        rules: {
          title: [
            { required:true,validator: validateTitle, trigger: 'blur' }
          ],
        },
      option:[],
      imgFilesList:[],
      dialogImageUrl: '',
      dialogVisible: false,
      uploadUrl:process.env.VUE_APP_BASE_API+"/upload/img"
    }
  },

  created() {
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
  },


  methods: {

    fetchData(id) {
      editTab(id).then(response => {
        this.form.title= response.data.title;

        var str=process.env.VUE_APP_BASE_API;
         var  leg= str.indexOf('api');
           var url= str.substr(0,leg);
           this.imgFilesList.push({
             "url": url+response.data.icon,
           });
        this.form.id = response.data.id;
        this.form.icon = response.data.icon;
      }).catch(err => {
        console.log(err)
      })
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


    onSubmit(){

      updateTab(this.form.id,this.form).then(response => {
          this.$message({
            message: '更新成功',
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
