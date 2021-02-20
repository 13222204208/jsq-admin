<template>
 <div class="app-container">
<el-form ref="form" :model="form" :rules="rules" label-width="80px">


  <el-form-item label="文章标题" prop="title">
    <el-input v-model="form.title" style="width: 58rem;"></el-input>
  </el-form-item>
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
        content:'',
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
        this.form.id = response.data.id;
      }).catch(err => {
        console.log(err)
      })
    },


      handlePictureCardPreview(file) { console.log(file.url)
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
