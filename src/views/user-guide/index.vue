<template>
 <div class="app-container">
<el-form ref="form" :model="form" :rules="rules" label-width="80px">


  <el-form-item label="文章标题" prop="title">
    <el-input v-model="form.title" style="width: 58rem;"></el-input>
  </el-form-item>
  <el-form-item label="手册链接" prop="url">
    <el-upload
      class="upload-demo"
       name="upload"
      ref="upload"
      :action="uploadUrl()"
      :limit='1'
      :on-success="handleUpSuccess"
     >
      <el-button size="small" type="primary">选择文件</el-button>
    </el-upload>
  </el-form-item>


<!--  <el-form-item label="用户手册" prop="url">
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

  </el-form-item> -->

    <div class="ckeditor" style="margin-left:10px; width:1000px">
      <!-- 工具栏容器 -->
      <div id="toolbar-container"></div>
      <!-- 编辑器容器 -->
      <div id="editor">

      </div>
    </div>
    <br>
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
import { userGuide, updateUserGuide } from '@/api/user-guide'

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
      editor:null,//编辑器实例
      form:{
        id:'',
        title:'',
        url:'',
        content:'',
      },
        rules: {
          title: [
            { required:true,validator: validateTitle, trigger: 'blur' }
          ],
          url: [
            { required:true,message:'请填写用户手机链接地址', trigger: 'blur' }
          ],
        },
      option:[],
      imgFilesList:[],
      dialogImageUrl: '',
      dialogVisible: false,
     // uploadUrl:process.env.VUE_APP_BASE_API+"/upload/file"
    }
  },
  mounted() {
    this.initCKEditor()
  },
  created() {
    this.fetchData()
  },


  methods: {


    fetchData() {
      userGuide().then(response => {console.log(response);
        this.editor.setData(response.data.content);
        this.form.title= response.data.title;
        this.form.url= response.data.url;
        this.form.id = response.data.id;
      }).catch(err => {
        console.log(err)
      })
    },
    uploadUrl() {
            var url = process.env.VUE_APP_BASE_API+"/upload/file"// 生产环境和开发环境的判断
            return url
        },
        handleUpSuccess(response){
        console.log(response)
            if(response.uploaded == true){
              this.form.url = response.url;
              this.$message({
                message: '上传成功',
                type: 'success'
              })
            }else{
              this.$message({
                message: '上传失败',
                type: 'error'
              })
            }
        },
/*    uploadUrl() {
        var url = process.env.VUE_APP_BASE_API+"/upload/file"// 生产环境和开发环境的判断
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
            this.form.url = response.url;
            console.log(this.form.url);
          }
      }, */


    initCKEditor(){
      CKEditor.create(document.querySelector("#editor"),{
        language: 'zh-cn',
        ckfinder:{
          // 后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
          uploadUrl:process.env.VUE_APP_BASE_API+"/upload/content/img",
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
      this.form.content = this.editor.getData();//富文本内容
     
      updateUserGuide(this.form.id,this.form).then(response => {
          this.$message({
            message: '更新成功',
            type: 'success'
          })

        }
      );
    }
  }
}

</script>

<style>
.ckeditor{width: 80%; margin: 30px auto 0px; border:1px solid #ddd;}
</style>
