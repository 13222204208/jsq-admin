<template>
 <div class="app-container">
<el-form ref="form" :model="form" label-width="80px">

  <el-form-item
    label="分类名称"
    prop="title"
    :rules="[
      { required: true, message: '不能为空'},
    ]"
  >
    <el-input v-model="form.title" autocomplete="off"></el-input>
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

import { editConsultType, updateConsultType } from '@/api/consult-type'
export default {
  data() {
    return {
      form:{
        id:null,
        title:''
      }
    }
  },
  created() {

    const id = this.$route.params && this.$route.params.id
    this.fetchData(id)
  },

  methods: {
    fetchData(id) {
      editConsultType(id).then(response => { console.log(response);
        this.form.id = response.data.id;
        this.form.title = response.data.title;
      }).catch(err => {
        console.log(err)
      })
    },

    onSubmit(){
      updateConsultType(this.form.id, this.form.title ).then(response => {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          this.$router.push({name:'ConsultTypeList'})
        }
      );
    }
  }
}

</script>

<style>
.ckeditor{width: 80%; margin: 30px auto 0px; border:1px solid #ddd;}
</style>
