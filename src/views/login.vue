<template>
    <div class="register-container">
        <h3>Login</h3>
        <div class="form-container">
            <el-form :model="loginUser" status-icon :rules="rules" ref="loginForm" 
            label-width="100px" class="registerForm">
            <el-form-item label="Email" prop="email">
                <el-input type="text" v-model="loginUser.email" placeholder="your email(account)"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input type="password" v-model="loginUser.password" placeholder="your password"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">Log in</el-button>
            </el-form-item>
            <div class="hint">
            <span>No account? </span>
            <a href="/register">sign up here</a>
            </div>
            </el-form>
        
        </div>
    </div>
</template>

<script>
import jwt_decode from 'jwt-decode';

export default {
    name:'login',
    component:{},
    data(){
        
        return{
            loginUser:{
                email:'',
                password:''
            },
            rules:{
                email:[{
                    type:'email',required:true,message:'Email is required',trigger:'blur'
                }],
                password:[{
                    required:true,message:'Password is required',trigger:'blur'
                }]
            }
        };
    },
    methods:{
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$axios.post('/api/users/login',this.loginUser)
                    .then(response=>{
                        // get the token
                        const{token} = response.data;
                        // store in local storage
                        localStorage.setItem('eletoken',token);
                        this.$message({
                            message:'Login successed',
                            type:'success'
                        })
                        const decode =jwt_decode(token);

                        // store token at Vuex
                        this.$store.dispatch('setAuthenticated',!this.isEmpty(decode));
                        this.$store.dispatch('setUser',decode);
                        // After registeration is successful, then page redirects to login. 
                        this.$router.push('/index');
                    })
                } else {
                    this.$message.error('failed');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        isEmpty(value){
             return(
                 value===undefined||value===null||
                 (typeof value==='object' && Object.keys(value).length===0)||
                 (typeof value==='string' && value.trim().length===0)
             )
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
.hint{
    font-size: 0.9em;
    text-align: right;
}
</style>