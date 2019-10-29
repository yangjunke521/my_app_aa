<template>
  <div class="dateDiv">
      <!-- input框版本 -->
     <DatePicker
        v-if="!custom"
        :value="dateVal"
        :type="dateType"
        :format="format"
        :confirm="confirm"
        :element-id="dataID"
        :placement="placement"
        :placeholder="placeholder"
        :transfer="transfer"
        :editable="editable"
        :clearable="clearable"
        :readonly="readonly"
        :separator="separator"
        :disabled='disabled'
        :options="options"
        @on-change="changeDate"
        @on-open-change='openChange'
        @on-clear="clearChange"
        @on-ok="okChange"
     >
     </DatePicker>
     <!-- 定制版本 -->
     <DatePicker
        v-else-if="custom"
        :open="open"
        :value="customVal"
        :confirm="confirm"
        :element-id="dataID"
        :type="dateType"
        :format="format"
        :placement="placement"
        :placeholder="placeholder"
        :transfer="transfer"
        :clearable="clearable"
        :separator="separator"
        :disabled='disabled'
        @on-change="handleChange"
        @on-clear="handleClear"
        @on-ok="handleOk">
        <a href="javascript:void(0)" @click="handleClick">
            <Icon type="ios-calendar-outline"></Icon>
            <template v-if="customVal === ''">Select date</template>
            <template v-else>{{ customVal }}</template>
        </a>
    </DatePicker>
  </div>
</template>

<script>

  export default {
    name:'date',//日期选择器
      props:{
            /**
             * date===单个日期框,
             * date===daterange选择范围,
             * datetime===2019-09-20 00:00:00,配合format="yyyy-MM-dd HH:mm",可以控制输出格式
             * datetimerange===2019-09-19 00:00:00 - 2019-10-16 00:00:00,配合format="yyyy-MM-dd HH:mm",可以控制输出格式
             * date===year
             * date===month
             */
            dateType: {
                type: String,
                default: 'date'
            },
            /**
             * 日期格式
             * date | daterange yyyy-MM-dd
             * datetime | datetimerange yyyy-MM-dd HH:mm:ss
             * year：yyyy
             * month：yyyy-MM
             */
            format:{
                type: String,
                default: 'yyyy-MM-dd'
            },
            confirm: { //选择日期后，选择器不会主动关闭，需用户确认后才可关闭。
                type: Boolean,
                default: false
            },
            custom: { //是否为定制的日期版本
                type: Boolean,
                default: false
            },
            size:String, // 框大小,large,small,或者不写
            placement:String, // 日期选择器出现的位置,top,top-start,top-end,bottom,bottom-start,bottom-end,left,left-start,left-end,right,right-start,right-end
            placeholder:String,
            dataID:String,//日期框的id
            transfer: { //是否将弹层放置于 body 内
                type: Boolean,
                default: false
            },
            editable: { //文本框是否可以输入，只在没有使用 slot 时有效
                type: Boolean,
                default: false
            },
            clearable :{ //是否显示清除按钮
                type: Boolean,
                default: true
            },
            readonly :{ //完全只读，开启后不会弹出选择器，只在没有设置 open 属性下生效
                type: Boolean,
                default: false
            },
            separator:String,//两个日期间的分隔符
            dateVal: [String, Array, Date],
            /**
             * 可设置快捷方式和禁用事件
             * shortcuts:[]
             * disabledDate(Function)    设置不可选择的日期，参数为当前的日期，需要返回 Boolean 是否禁用这天
             */
            options: Object,
          disabled: Boolean,
        },
    data () {
      return {
            open: false,//定制版本的弹框状态
            customVal: '',//定制版本的监听值
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        /**
         * 定制版本的事件
         */
        handleClick () {
            this.open = !this.open;
        },
        handleChange (date) {
            this.customVal = date;
        },
        handleClear () {
            this.open = false;
        },
        handleOk () {
            this.open = false;
        },
        /**
         * input版本的事件
         */
        changeDate(val,oldVal){//日期发生变化时触发
            let str = {
                'val':val,
                'oldVal':oldVal
            }
            this.$emit('changeDate',str);
        },
        openChange(data){//弹出日历和关闭日历时触发
            this.$emit('openChange',data);
        },
        clearChange(){//在 confirm 模式或 clearable = true 时有效，在清空日期时触发
            this.$emit('clearChange');
        },
        okChange(){//在 confirm 模式下有效，点击确定按钮时触发
            this.$emit('okChange');
        }
    },

    watch: {}

  }

</script>
<style lang='less' scoped>
    .dateDiv{
        width:100%;
        height:100%;
    }
</style>