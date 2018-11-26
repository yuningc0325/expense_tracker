<template>

<div class="expense-container">
    <div>
        <el-form :inline="true" ref="addData">
                <el-date-picker
                    class="timeFilter"
                    v-model="timeSelect"
                    type="daterange"
                    start-placeholder="Start"
                    end-placeholder="End"
                    :default-time="['00:00:00', '23:59:59']">
                </el-date-picker>
            <el-button class="filterBtn" type="primary" size="small" @click="timeFilter()">
                    Filter
            </el-button>
            <el-form-item class="addBtn">
                <el-button type="primary" size="small" @click="addNewCol()">
                    Create
                </el-button>
            </el-form-item>
            <el-form-item class="deletBtn">
                <el-button type="danger" size="small" @click="removeAll()">
                    Remove all
                </el-button>
            </el-form-item>
        </el-form>
    </div>
    <el-table
    :data="tableData"
    border
    style="width: 100%;">
    <el-table-column
      prop="date"
      label="Date"
      align="center"
      width="200">
    </el-table-column>
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
          size="mini"
          @click="handleEdit(scope.row)">edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="removeOne(scope.row,scope.$index)">x</el-button>
      </template>
    </el-table-column>
  </el-table>
    <div class="block">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="paginations.page_index"
        :page-sizes="paginations.page_sizes"
        :page-size="paginations.page_size"
        :layout="paginations.layout"
        :total="paginations.total">
        </el-pagination>
    </div>
  <popup :dialog="dialog" :form='form' @update="getProfile"></popup>

</div>
</template>
<script>
import popup from '../components/Dialog.vue'
export default {
    name:'expenseList',
    components:{
        popup
    },
    data(){
        return {
            tableData:[],
            allTableData:[],
            timeFilterTableData:[],
            dialog:{
                show:false,
                option:"edit",
                title:""
            },
            form:{
                category:'',
                location:'',
                item:'',
                price:'',
                currency:'',
                payer:'',
                payMethod:''
            },
            timeSelect:{},
            paginations:{
                page_index:1, // current page
                total:0, // total page
                page_size:5, // numbers of rows showing in a page
                page_sizes:[5,10,15,20], // options of rows showing in a page
                layout:"total,sizes,prev,pager,next,jumper", // property  
            }
        };
    },
    created(){
        this.getProfile();
    },
    methods:{
        getProfile(){
            this.$axios.get('api/profiles/')
            .then(res=>{
                this.allTableData=res.data;
                this.timeFilterTableData=res.data;
                // the new is the top
                this.allTableData.reverse();
                this.timeFilterTableData.reverse();
                // set paginations
                this.setPaginations();
            }).catch(err=>{
                console.log(err);
            })
        },
        setPaginations(){
            // set property of paginations
            this.paginations.total= this.allTableData.length;
            this.paginations.page_index=1;
            this.paginations.page_size=5;
            this.tableData= this.allTableData.filter((item,index)=>{
                return index<this.paginations.page_size;
            })
        },
        handleEdit(row){
            this.form={
                category:row.category,
                location:row.location,
                item:row.item,
                price:row.price,
                payer:row.payer,
                payMethod:row.payMethod,
                id:row._id
            }
            this.dialog={
                show:true,
                title:"Edit",
                option:"edit"
            }
        },
        addNewCol(){
            this.form={
               category:'',
                location:'',
                item:'',
                price:'',
                payer:'',
                payMethod:''
            }
            this.dialog={
                show:true,
                title:"Add",
                option:"add"
            }
        },
        handleDelete(index,row){
            alert('work')
        },
        
        removeAll(){
            if(confirm("Are you sure to delete all data?")){
                this.$axios.delete('api/profiles/delete')
                            .then(res=>{
                                this.$message({
                                    message:"Delete done",
                                    type:"success"
                                })
                            }).catch(err=>{
                                 return false;
                            })
            }
        },
        removeOne(row,index){
                this.$axios.delete('api/profiles/'+row._id)
                            .then(res=>{
                                this.$message({
                                    message:"Delete done",
                                    type:"success"
                                });
                                this.getProfile();
                            }).catch(err=>{
                                 return false;
                            })
        },
        
        handleSizeChange(page_size){
            // switch size
            this.paginations.page_index=1;
            this.paginations.page_size=page_size;
            this.tableData= this.allTableData.filter((item,index)=>{
                    return index<page_size;
                })
        },
        handleCurrentChange(page){
            // get the current row in a given page
            let index= this.paginations.page_size * (page-1);
            // get the total 
            let numner =this.paginations.page_size*page;
            let tables=[];
            for(let i=index;i<numner;i++){
                if(this.allTableData[i]){
                    tables.push(this.allTableData[i]);
                }
                this.tableData=tables;
            }
        },
        timeFilter(){
            // In empty value condition
            if(!this.timeSelect[0] || !this.timeSelect[1]) {
                this.$message({
                    message:"please define date period",
                    type:'warning',
                    duration:1500
                })
                this.getProfile();
                return;
            }
            // filter the tabledata
            const startTime = this.timeSelect[0].getTime();
            const endTime =this.timeSelect[1].getTime();
            this.allTableData = this.timeFilterTableData.filter(item=>{
                const filterDate = new Date(item.date).getTime();
                return  endTime>= filterDate && filterDate>=startTime
            })
            this.setPaginations();
        }
    }
}
</script>
<style scoped>
.block{
    text-align: right;
    margin-top: 20px;
}
.expense-container{
   margin: 10px auto;
   width:100%;
   height: 100%;
   padding: 10px;
   box-sizing: border-box;
}
.addBtn,.deletBtn{
    float: right;
}
.timeFilter{
    margin-left: 20px;
}
.filterBtn{
    margin-left: 20px;
}
.rickPay{
    color:rgb(59, 138, 206);
}
.cassyPay{
    color:rgb(244, 96, 96);
}

</style>
