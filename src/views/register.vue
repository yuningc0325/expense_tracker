<template>
    <div class="register-container">
        <h3>Expense Tracking</h3>
        <div class="form-container">
            <el-form :model="registerUser" status-icon :rules="rules" ref="registerForm" 
            label-width="100px" class="registerForm">
            <el-form-item label="Name" prop="name">
                <el-input type="text" v-model="registerUser.name" placeholder="your name"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input type="text" v-model="registerUser.email" placeholder="your email(account)"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="registerUser.password" placeholder="your password"></el-input>
            </el-form-item>
            <el-form-item label="" prop="checkPass">
                <el-input type="password" v-model="registerUser.checkPass" placeholder="password confirm"></el-input>
            </el-form-item>
            <el-form-item label="Identity">
                <el-select class="drop-menu" v-model="registerUser.identity" placeholder="your identity">
                    <el-option label="Admin" value="admin"></el-option>
                    <el-option label="Member" value="member"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="submit_btn" @click="submitForm('registerForm')">SignUp</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name:'register',
    component:{},
    data(){
        var validatePass2 = (rule, value, callback) => {
         if (value !== this.registerUser.password) {
          callback(new Error('Your password should be consistency'));
        } else {
          callback();
        }
      };
        return{
            registerUser:{
                name:'',
                email:'',
                password:'',
                checkPass:'',
                identity:''
            },
            rules:{
                name:[{
                    required:true,message:'Name is required',trigger:'blur'
                },{
                    min:3,
                    max:20,
                    message:'Length should be in range of 3 to 20',
                    trigger:'blur'
                }],
                email:[{
                    type:'email',required:true,message:'Email is required',trigger:'blur'
                }],
                password:[{
                    required:true,message:'Password is required',trigger:'blur'
                },{
                    min:6,
                    max:30,
                    message:'Length should be in range of 6 to 30',
                    trigger:'blur'
                }],
                checkPass:[{
                    required:true,message:'Password is required',trigger:'blur'
                },{
                    min:6,
                    max:30,
                    message:'Length should be in range of 6 to 30',
                    trigger:'blur'
                },{
                  validator: validatePass2,
                  trigger:'blur'  
                }]
            }
        };
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/users/register',this.registerUser)
                    .then(response=>{
                        this.$message({
                            message:'success',
                            type:'error'
                        }
                        )
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
                this.$router.push('/login');
            });
        }
    }
};
</script>


<style scoped>
.register-container{
    background: white;
    width:370px;
    height:auto;
    margin: 100px auto;
    padding: 15px;
    text-align: center;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    transition: .2s;
}
.form-container{
    height:100%;
    padding-right: 20px;
    margin:15px auto;
}
h3{
    font-size: 24px;
    color:#636363;
}
.submit_btn,.drop-menu{
    width:100%;
}


</style>