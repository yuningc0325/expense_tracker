<template>
<div>
    <el-dialog title="New Sheet" 
    :visible.sync="dialog.show"
    :close-on-click-modal="true"
    :close-on-press-escape="true"
    :modal-append-to-body="false">
        <el-form :model="form">
            <el-form-item label="Year" label-width="auto">
                <el-select v-model="dialog.year" placeholder="Select Year">
                    <el-option :label=dialog.year :value=dialog.year></el-option>
                    <el-option :label=dialog.year+1 :value=dialog.year+1></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Month" label-width="auto">
                <el-select v-model="form.month" 
                           placeholder="Select Month">
                    <el-option
                     v-for="month in form.months" :value="month" :key="month.id"
                     :label="month+'月'" >
                     {{month+'月'}}
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible = false">Submit</el-button>
    </div>
    </el-dialog>

</div>
</template>
<script>

export default {
    name:'datepop',
    data(){
        return{
            form: {
            year: '',
            months: [1,2,3,4,5,6,7,8,9,10,11,12],
            }
        }
    },
    props:{
        dialog:Object
    }

}
</script>
<style>
.button{
    text-align: right;
}
</style>
