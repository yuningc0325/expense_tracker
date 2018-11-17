<template>
    <div class="row-bg">
            <el-form :label-position="labelPosition" 
            label-width="100px" :model="formLabelAlign" ref="formLabelAlign">
                <el-form-item label="Identity">
                    <el-input v-model=formLabelAlign.identity :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="Account (Email)">
                    <el-input v-model=formLabelAlign.email :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="Name">
                    <el-input v-model=formLabelAlign.name></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click="submitForm('formLabelAlign')">Submit</el-button>
                </el-form-item>
            </el-form>
    </div>
</template>
<script>
import jwt_decode from 'jwt-decode';
export default {
    name:'info',
    data(){
    return {
        labelPosition: 'top',
        formLabelAlign: {
          id:this.$store.getters.user.id,
          name:this.$store.getters.user.name,
          email:this.$store.getters.user.email,
          identity:this.$store.getters.user.identity
        }
      }; 
    },
    methods:{
       submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.put('/api/users/'+this.formLabelAlign.id,this.formLabelAlign)
            .then(
                response=>{
                    const currentToken =jwt_decode(localStorage.getItem('eletoken'));
                    currentToken.name=this.formLabelAlign.name;
                    this.$store.dispatch('setUser',currentToken);
                    // After registeration is successful, then page redirects to login. 
                    // this.$router.push('/index');
                    console.log(response);
                }
            ).catch(err => console.log(err));

            alert('submit!');

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
}
</script>
<style scoped>

.row-bg{
    height: 100%;
    padding: 70px 100px;
}

</style>
