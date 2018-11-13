<template>
<div>
    <navbar></navbar>
    <leftmenu></leftmenu>
    <router-view></router-view>
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

</style>