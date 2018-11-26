<template>
<div class="expense-container">
    <div>
        <el-button @click="dialog.show=true">Add New sheet</el-button>
        <el-button @click="addNewRow">Add New sheet</el-button>
    </div>
    <div>
        <table id="grid"></table>
    </div>
    <!-- <div style="margin-left:20px">
        <table id="jqGrid"></table>
    </div>   -->
<!-- <el-table
    :data="tableData"
    border
    style="width: 100%;">
    <el-table-column
      prop="date"
      label="Date"
      align="center"
      width="200">

    </el-table-column>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
    <el-table-column
      prop="category"
      label="Type"
      align="center"
      width="100">
    </el-table-column>
    <el-table-column
      prop="location"
      label="Location"
      align="center"
      width="160">
    </el-table-column>
    <el-table-column
      prop="item"
      label="Item"
      align="center"
      width="220">
    </el-table-column>
    <el-table-column
      prop="price"
      label="Price"
      align="center"
      width="80">
    </el-table-column>
    <el-table-column
      prop="currency"
      label="Currency"
      align="center"
      width="100">
    </el-table-column>
    <el-table-column
      prop="payer"
      label="Payer"
      align="center"
      width="80">
      <template slot-scope="scope">
          <span :class="scope.row.payer=='Rick'? 'rickPay':'cassyPay'">
              {{scope.row.payer}}
          </span>
      </template>
    </el-table-column>
    <el-table-column
      prop="payMethod"
      label="Method"
      align="center"
      width="120">
    </el-table-column>
    <el-table-column
        prop="operation"
        align="center"
        width="180"
        label="Operation">
      <template slot-scope="scope">

        <el-button
          size='mini'
          type="danger"
          @click="removeOne(scope.row,scope.$index)">x</el-button>
      </template>
    </el-table-column>
    </el-table> -->

    <Datepop :dialog="dialog"></Datepop>

</div>
</template>
<script>
import Datepop from '../components/DatePop.vue'
export default {
    name:'uitest',
    components:{Datepop},
    data(){
        return {
            tableData:[],
            tableDataToGrid:[],
            tableCol:[
                {name:"date",label:"Date"},
                {name:"category",label:"Type"},
                {name:"location",label:"Location"},
                {name:"item",label:"Item"},
                {name:"price",label:"Price"},
                {name:"currency",label:"Currency"},
                {name:"payer",label:"Payer"},
                {name:"payMethod",label:"PayMethod"},
            ],
            dialog:{
                show:false,
                year:(new Date()).getFullYear()
            },
            form:{
                category:'',
                location:'',
                item:'',
                price:'',
                currency:'',
                payer:'',
                payMethod:''
            }
        }
    },
    created(){
        this.getProfile();
    },
    methods:{
        getProfile(){
            // Deploy data
            this.$axios.get('api/profiles/')
            .then(res=>{
               this.tableData=res.data;
               // Deploy grid
                $(()=>{
                    $("#grid").jqGrid({
                    colModel:this.tableCol,
                    data:this.tableData
                })
            })
            }).catch(err=>{
                console.log(err);
            })
        },
        addNewRow(){
            this.tableData.push(Object);
        },
        removeOne(){
            this.tableData.pop(Object);
        },

    }
}
</script>
<style scoped>

.expense-container{
   margin: 10px auto;
   width:100%;
   height: 100%;
   padding: 10px;
   box-sizing: border-box;
}


</style>
