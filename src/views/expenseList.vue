<template>
    <div class="row-bg">
           <p>hi</p>
    </div>
</template>
<script>
export default {
    name:'expenseList',
    data(){
        return {
            tableData:[]
        };
    },
    created(){
        this.getProfile();
    },
    methods:{
        getProfile(){
            this.$axios.get('api/profiles/')
            .then(res=>{
                this.tableData=res.data;
            }).catch(err=>{
                console.log(err);
            })
        }
    }
}
</script>
<style scoped>



</style>
