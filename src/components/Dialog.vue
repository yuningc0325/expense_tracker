<template>

    <div class="dialog">
        <el-dialog title="Create new information"
         :visible.sync="dialog.show"
         :close-on-click-modal="true"
         :close-on-press-escape="true"
         :modal-append-to-body="false">
            <div class="form">
                <el-form ref="form"
                :model="form"
                :rules="form_rules"
                label-width="120px"
                style="margin:10px;width:auto">
                <el-form-item label="Type" prop="category">
                    <el-select v-model="form.category" placeholder="Type">
                        <el-option v-for="(type,index) in type_list" :key="index" 
                        :label="type" :value="type">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="location" label="Location">
                    <el-input placeholder="Location" v-model="form.location"></el-input>
                </el-form-item>
                <el-form-item prop="item" label="Item">
                    <el-input placeholder="Item" v-model="form.item"></el-input>
                </el-form-item>
                <el-form-item prop="price" label="Price">
                    <el-input  type="number" placeholder="Price" v-model="form.price"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="currency" label="Currency">
                    <el-input placeholder="Currency" v-model="formData.currency"></el-input>
                </el-form-item> -->
                <el-form-item prop="payer" label="Payer">
                    <el-select v-model="form.payer" placeholder="Payer">
                        <el-option v-for="(payer,index) in payer_list" :key="index" 
                        :label="payer" :value="payer">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="payMethod" label="Method">
                    <el-select v-model="form.payMethod" placeholder="Method">
                    <el-option v-for="(method,index) in method_list" :key="index" 
                        :label="method" :value="method">
                    </el-option>
                     </el-select>
                </el-form-item>
                <div class="button">
                    <el-button type="primary" @click="submitForm('form')">confirm</el-button>
                    <el-button @click="closeDialog()">cancel</el-button>
                </div>
                </el-form>
                
            </div>
        </el-dialog>
    </div>    
</template>
<script>

export default {
    name:"dialog",
    data(){
        return{
            type_list:[
                "外吃","交通","食物","家用","娛樂","健身","教育","行政","固定開銷","置裝","投資","轉帳","旅遊"
            ],
            payer_list:[
                "Rick","Cassy"
            ],
            method_list:[
                "Cash","Credit Card","Debit Card","Check"
            ],
            // currency_list:[],
            form_rules:{
                category:[{required:true,message:"Select one type",trigger:"change"}],
                location:[{required:true,message:"location is required",trigger:"change"}],
                item:[{required:true,message:"item is required",trigger:"change"}],
                price:[{required:true,message:"price is required"}],
                payer:[{required:true,message:"payer is required",trigger:"change"}],
                payMethod:[{required:true,message:"method is required",trigger:"change"}],
            }
        }
    },
    props:{
        dialog:Object,
        form:Object
    },
    methods:{
        submitForm(form){
            this.$refs[form].validate((valid)=>{
                if(valid){
                     const url = this.dialog.option== 'add'? 'add' : this.form.id;
                     if(url=='add'){
                     this.$axios.post('api/profiles/'+url,this.form)
                                .then(response=>{
                                    this.$emit("update");
                                    this.$message({
                                        message:"Data saved",
                                        type:"success"
                                    });
                                    this.dialog.show=false;
                                }).catch(err => console.log(err));
                    }else{
                      this.$axios.put('api/profiles/'+url,this.form)
                                .then(response=>{
                                    this.$emit("update");
                                    this.$message({
                                        message:"Data saved",
                                        type:"success"
                                    });
                                    this.dialog.show=false;
                                }).catch(err => console.log(err));  
                    }
                }else{
                    return false;
                }
            })
        },
        // close the dialog
        closeDialog(){
            this.dialog.show=false;
        }
    }

}
</script>
<style>
.button{
    text-align: right;
}
</style>
