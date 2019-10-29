<template>
    <Select 
    v-model="value"
    :clearable="clearable"
    :label-in-value="labelAndVal"
    :element-id='Id'
    :multiple='multiple'
    :filterable='filterable'
    :size='size'
    :placeholder='placeholder'
    :labelAndVal='labelAndVal'
    :placement='placement'
    :disabled='disabled'

    @on-change='changeFun'
    @on-query-change='changeSearch'
    @on-clear='clearFun'
    @on-open-change='openChangeFun'
    >
        <Option v-for="item in options" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>

<script>

  export default {
    name:'',
    props:{
        clearable: {//是否可以清空选项，只在单选时有效
            type: Boolean,
            default: true
        },  
        multiple: { //是否支持多选
            type: Boolean,
            default: false
        }, 
        filterable: { //是否支持搜索,多选搜索时，可以使用键盘Delete快捷删除最后一个已选项
            type: Boolean,
            default: false
        }, 
        size: String, //选择框大小，可选值为large、small、default或者不填
        placeholder: String, //选择框默认文字
        labelAndVal: { //选择框默认文字,ture是只返回value,false是label和value 一并返回
            type: Boolean,
            default: true
        }, 
        placement: String, //选择框默认文字-弹窗的展开方向，可选值为 top、bottom、top-start、bottom-start、top-end、bottom-end
        Id:String,//给表单元素设置 id
        sel_val: [String,Number,Array],//单选时只接受 String 或 Number，多选时只接受 Array
        options: { //下拉框数据
            type: Array,
            default: []
        },
        disabled: Boolean,
    },
    data () {
      return {
          value:''
      };
    },
    mounted(){
        this.value = this.sel_val;
    },
    methods: {
        changeFun(data){//下拉框值发生改变时调用
            this.$emit('changeFun',data);//data有value和label
        },
        changeSearch(query){//搜索词改变时触发,***注意这个事件想触发，不要传sel_val，我们搜索的同时，他会给赋值，造成冲突报错
            let str = {
                'text':query
            }
            this.$emit('changeSearch',str);
        },
        clearFun(){//点击清空按钮时触发
            this.$emit('clearFun');
        },
        openChangeFun(data){//true / false
            this.$emit('openChangeFun',data);
        },
    },

    watch: {
        sel_val() {
            this.value = this.sel_val;
        }
    }

  }
</script>
<style lang='less' scoped>

</style>