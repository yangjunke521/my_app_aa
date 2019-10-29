<template>
  <div class="timeDiv">
     <TimePicker 
        :type="dateType"
        :format="format"
        :placement="placement"
        :placeholder="placeholder"
        :steps="steps"
        :confirm="confirm"
        :clearable="clearable"
        :element-id="dataID"
        @on-change="changeDate"
        @on-open-change='openChange'
        @on-clear="clearChange"
        @on-ok="okChange"
     >
     </TimePicker>
  </div>
</template>

<script>

  export default {
    name:'TimePicker-time',//时间选择器
     props:{
          /**
             * time===单个时间框,
             * timerange===daterange选择范围,
             * datetime===2019-09-20 00:00:00,配合format="yyyy-MM-dd HH:mm",可以控制输出格式
             * datetimerange===2019-09-19 00:00:00 - 2019-10-16 00:00:00,配合format="yyyy-MM-dd HH:mm",可以控制输出格式
             * date===year
             * date===month
             */
            dateType: { 
                type: String,
                default: 'time'
            },
            /**
             * 时间格式
             *  HH:mm:ss
             */
            format:{
                type: String,
                default: 'HH:mm'
            },
            confirm: { //是否显示底部控制栏
                type: Boolean,
                default: false
            },
            clearable :{ //是否显示清除按钮
                type: Boolean,
                default: true
            },
            placement:String, // 时间选择器出现的位置,top,top-start,top-end,bottom,bottom-start,bottom-end,left,left-start,left-end,right,right-start,right-end
            placeholder:String,
            steps:Array,//下拉列表的时间间隔，数组的三项分别对应小时、分钟、秒。例如设置为 [1, 15] 时，分钟会显示：00、15、30、45。
            editable:Boolean,//文本框是否可以输入，只在没有使用 slot 时有效
            dataID:String,//时间选择器的id
     },
    data () {
      return {

      };
    },
    computed: {},
    mounted() {},
    methods: {
        changeDate(val){//日期发生变化时触发
            this.$emit('changeDate',val);
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
<style lang='' scoped>

</style>