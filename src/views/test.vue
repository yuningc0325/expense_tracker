<template>

<div class="test-container">
 <p>hi</p>
 <el-button type="primary" @click='askAPI'>As API through back-end</el-button>
 <h1>The currency data</h1>
 <h3>{{currencyData}}</h3>

</div>

</template>
<script>
export default{
    name:'test',
    components:{},
    data(){
        return{
            currencyData:''
        }
    },
    methods:{
      
       askAPI(){
           this.$axios.get('api/external/currency')
                        .then(res=>{
                            this.currencyData=res.data.USDGMD.Exrate;
                        })
       } 
    }
}

</script>
<style scoped>
.test-container{
    border: 1px solid #000;
}
</style>
