<template>
  <div id="app">
    <!-- <p>Hello world</p> -->
    <router-view/>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode';
export default {
    name:'app',
    components:{},
    
    created(){
      if(localStorage.eletoken){
        const decode =jwt_decode(localStorage.eletoken);
        // store token at Vuex
        this.$store.dispatch('setAuthenticated',!this.isEmpty(decode));
        this.$store.dispatch('setUser',decode);
      }
    },
    methods:{
      isEmpty(value){
            return(
                value===undefined||value===null||
                (typeof value==='object' && Object.keys(value).length===0)||
                (typeof value==='string' && value.trim().length===0)
            )
      }
  }
  }
</script>

<style>
html,
body,
#app {
  /* width: 100%;
  height: 100%; */
  background: -webkit-linear-gradient(90deg, #2BC0E4 10%, #EAECC6 90%); /* Chrome 10+, Saf5.1+ */
  background:    -moz-linear-gradient(90deg, #2BC0E4 10%, rgb(229, 233, 148) 90%); /* FF3.6+ */
  background:     -ms-linear-gradient(90deg, #2BC0E4 10%, #EAECC6 90%); /* IE10 */
  background:      -o-linear-gradient(90deg, #2BC0E4 10%, #EAECC6 90%); /* Opera 11.10+ */
  background:         linear-gradient(90deg, #2BC0E4 10%, #EAECC6 90%); 
  }
</style>
