<template>
    <header class="head-nav">
        <el-row>
            <el-col :span="12">
                <span class="title">Expense Tracker</span>
            </el-col>
            <el-col :span="12" class="profile">
                <div class="userInfo">
                    <img src="uesr.avatar" class="avatar" alt="">
                    <div class="welcome">
                        <p class="name avatarname">{{user.name}}</p>
                    </div>
                <span class="username">
                    <!-- drop down menu -->
                    <el-dropdown trigger="click" @command="setDialogInfo">
                            <span class="el-dropdown-link">
                                <i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command='info'>Info</el-dropdown-item>
                                <el-dropdown-item  command='logout'>log out</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                </span>
                
                </div>
            </el-col>
        </el-row>
    </header>
</template>

<script>
export default {
    name:'navbar',
    computed:{
        user(){
            return this.$store.getters.user;
        }
    },
    methods:{
        setDialogInfo(cmd){
            switch(cmd){
                case "info": this.showInfoList();
                break;
                case "logout": this.logout();
                break;
            }
        },
        showInfoList(){
            this.$router.push('index/info')
        },
        logout(){
             // clean token
             localStorage.removeItem('eletoken');
             // set vuex
             this.$store.dispatch('clearUserStatus');
             this.$router.push('/login');
        }

    },
    components:{}
}

</script>

<style scoped>
.head-nav{
    position: fixed;
    left: 0px;
    top: 0px;
    width:100%;
    height: 60px;
    min-width: 600px;
    padding: 5px;
    background:#324057;
    color:white;
    border-bottom: 1px solid #1f2d3d;
    font-family: sans-serif;
    z-index: 99;
}

.title {
  vertical-align: middle;
  font-size: 18px;
  line-height: 60px;
  padding-left:20px;
}
.profile {
  line-height: 60px;
  text-align: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
}

.avatarname {
  line-height: 20px;
  text-align: center;
  font-size: 14px;
  color: #409eff;
  font-weight: bolder;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}


</style>

