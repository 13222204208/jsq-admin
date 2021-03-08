<template>
 <div class="app-container">
<el-form ref="form" :model="form" :rules="rules" label-width="80px">


  <el-form-item label="背景图" prop="background">
      <el-upload
        name="upload"
        :action="uploadUrl()"
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
  <el-form-item label="隐私标题" prop="title">
    <el-input v-model="form.title" style="width: 58rem;"></el-input>
  </el-form-item>
    <el-form-item label="隐私内容" prop="content">
      <el-input type="textarea" v-model="form.content"></el-input>
    </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
<!--     <el-button>取消</el-button> -->
  </el-form-item>
</el-form>
    <!-- 编辑器 -->

  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-build-decoupled-document'
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn'

import { editPrivacy, updatePrivacy} from '@/api/team'
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
        background:'',
        content:'',
        id:''
      },
        rules: {
          title: [
            { required:true,validator: validateTitle, trigger: 'blur' }
          ],
          content: [
            { required:true,message:'隐私内容必填', trigger: 'blur' }
          ],
        },
      imgFilesList:[],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  mounted() {
    this.initCKEditor()
  },
  created() {
    //this.getList()
    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
  },

  methods: {
   fetchData(id) {
      editPrivacy(id).then( response=>{ console.log(response)

        var str=process.env.VUE_APP_BASE_API;
         var  leg= str.indexOf('api');
           var url= str.substr(0,leg);

           this.imgFilesList.push({
             "url": url+response.data.background,
           });
        this.form.content= response.data.content;
        this.form.title= response.data.title;
      this.form.background= response.data.background
      this.form.id= response.data.id
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
            this.form.background = response.url;

          }
      },

    initCKEditor(){
      CKEditor.create(document.querySelector("#editor"),{
        language: 'zh-cn',
        ckfinder:{
          // 后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
          uploadUrl:process.env.VUE_APP_BASE_API+"/upload/img",
        }
      }).then(editor => {console.log(editor);
        const toolbarContainer = document.querySelector('#toolbar-container');
        toolbarContainer.appendChild(editor.ui.view.toolbar.element);
        // 将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
        this.editor = editor;
      }).catch(error => {
        console.log(error)
      });
    },
    /*获取编辑器内容*/
    getHtml(){
      console.log(this.editor.getData());
    },

    onSubmit(){

      console.log(this.form);
      updatePrivacy(this.form.id,this.form).then(response => {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        this.$router.push({name:'PrivacyList'})
        }
      );
    }
  }
}

</script>

<style>
.ckeditor{width: 80%; margin: 30px auto 0px; border:1px solid #ddd;}
</style>
