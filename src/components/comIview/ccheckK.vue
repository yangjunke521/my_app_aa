<template>
    <div class="checkbox">
        <Checkbox
                v-if="checkAllTit"
                :indeterminate="indeterminate"
                :value="checkAll"
                @click.prevent.native="handleCheckAll"
                style="width:6%;"
                >{{this.checkAllPlaceholder}}</Checkbox>
        <CheckboxGroup class="checksDiv" v-model="checkAllGroup" @on-change="checkAllGroupChange">
            <Checkbox :label="item.label" v-for="(item,index) in this.options" :key="index"></Checkbox>
        </CheckboxGroup>
    </div>
       
</template>
<script>
    export default {
        name:'checkbox',//复选框
        props:{
            checkAllTit: { //是否需要全选
                type: Boolean,
                default: true
            } ,
            checkAllPlaceholder: { //全选的placeholder
                type: String,
                default: '全部'
            } ,
            options: { //复选框数据
                type: Array,
                default: []
            } 
        },
        data () {
            return {
                indeterminate: false,//设置 indeterminate 状态，只负责样式控制
                checkAll: true,
                checkAllGroup: [],//复选框v-model绑定的参数
                checkAllData:[],//最终输出的数据
            }
        },
        methods: {
            handleCheckAll () {
                let checkAllArr = [];//存储全选label值的数组
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    // this.options.forEach((item)=>{
                    //     checkAllArr.push(item.label);
                    // });
                    // this.checkAllGroup = checkAllArr;
                    // //点击全选有值将数据发送出去
                    // this.checkAllData = this.options;
                    let str = {
                        "label":checkAllArr,
                        "allData":this.checkAllData
                    }
                    this.$emit('nowChecks',str);
                } else {
                    //this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                 this.checkAllData = [];//每次数据发生改变时将最终输出的元素先清空在填充
                this.options.forEach((item,index)=>{
                    data.forEach((m,n)=>{
                        if(item.label == m){
                            this.checkAllData.push(item);
                        }
                    });
                   
                })
                 let str = {
                        "label":data,
                        "allData":this.checkAllData
                    }
                this.$emit('nowChecks',str);//数据发生改变将值发出去===点击复选框
                // if (data.length === this.options.length) {
                //     this.indeterminate = false;
                //     this.checkAll = true;
                // } else if (data.length > 0) {
                //     this.indeterminate = true;
                //     this.checkAll = false;
                // } else {
                //     this.indeterminate = false;
                //     this.checkAll = false;
                // }
            }
        }
    }
</script>
<style lang='less' scoped>
    .checkbox{
        .ivu-checkbox-group{
            display: inline-block;
        }
        .ivu-checkbox-wrapper {
            width: 6%;
            float: left;
        }
        .checksDiv{
            float: left;
            width:calc(94% - 8px);
             .ivu-checkbox-wrapper {
                 width:auto;
             }
        }
    }
</style>
