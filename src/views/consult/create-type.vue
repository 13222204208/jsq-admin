<template>
 <div class="app-container">
<el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
  <el-form-item
    label="分类名称"
    prop="title"
    :rules="[
      { required: true, message: '不能为空'},
    ]"
  >
    <el-input v-model.number="numberValidateForm.title" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
    <el-button @click="resetForm('numberValidateForm')">重置</el-button>
  </el-form-item>
</el-form>
</div>
</template>
<script>
  import { storeConsultType} from '@/api/consult-type'
  export default {
    data() {
      return {
        numberValidateForm: {
          title: ''
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.numberValidateForm.title);
            storeConsultType(this.numberValidateForm).then(response => {
              this.$message({
                message: '创建成功',
                type: 'success'
              })
              this.$router.push({name:'ConsultTypeList'})
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
