<template>
<div class="index">
    <navbar></navbar>
    <leftmenu></leftmenu>
    <div class="layout">
    <router-view></router-view>
    </div>
</div>

</template>

<script>
import navbar from '../components/navbar'
import leftmenu from '../components/leftBar.vue'
export default {
    name:'Index',
    components:{navbar,leftmenu}
}
</script>


<style scoped>
.index{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.layout{
  position: absolute;  
  top: 71px;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
}
</style>