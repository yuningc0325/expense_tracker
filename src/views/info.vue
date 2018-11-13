<template>
    <div class="info">
      

    </div>    
</template>
<script>
export default {
    name:'info',
    data(){
    return{   
    isok:true,    
    fruits:[
    {
        "fruit": "蘋果",
        "color": "red",
        "show": false
    },
    {
        "fruit": "香蕉",
        "color": "yellow",
        "show": false
    },
    {
        "fruit": "哈密瓜",
        "color": "green",
        "show": true
    },
    {
        "fruit": "葡萄",
        "color": "purple",
        "show": true
    },
    {
        "fruit": "橘子",
        "color": "orange",
        "show": true
    },
    {
        "fruit": "火龍果",
        "color": "red",
        "show": true
    },
    {
        "fruit": "芭樂",
        "color": "green",
        "show": true
    },
    {
        "fruit": "柳丁",
        "color": "orange",
        "show": true
    },
    {
        "fruit": "奇異果",
        "color": "green",
        "show": true
    }
    ]
} 
    }
}
</script>
<style scoped>
.info{
    width: 100%;
    height: 700px;
    border: 1px solid black;
}
</style>
