<template>
    <Page 
        v-if="showPage"
        :class-name='className'
        :total="total"
        :show-elevator='showElevator'
        :show-total='showTotal'
        :size='size'
        :simple='simple'
        :current='current'
        :prev-text='prev'
        :next-text='next'
        :page-size='pageSize'
        :placement='placement'
        @on-change='changePage'
        @on-page-size-change='clickChangePage'
    >
    </Page>
</template>

<script>

  export default {
    name:'page',//页码封装-页码承受显示按钮最多为7个+一个前+一个后+左右的图标
    props:{
        className:String,//绑定class名
        total: {//页码总数
            type: Number,
            // default: 24
        }, 
        showElevator: {//是否显示电梯快速通道
            type: Boolean,
            default: true
        }, 
        showTotal : {//显示总共多少条数据，接受 slot 来自定义内容，默认显示共{{ total }}条
            type: Boolean,
            default: true
        }, 
        simple: {//简洁版
            type: Boolean,
            default: false
        }, 
        pageSize:Number,//每页显示几条数据
        size:String,//small==迷你/不填（默认）
        prev:String,//上一页text值,替代图标显示为文字。
        next:String,//下一页text值,替代图标显示为文字。
        placement:String,//条数切换弹窗的展开方向，可选值为 bottom 和 top
        current: {//默认选中
            type: Number,
            default: 1
        }, 
    },
    data () {
      return {
          showPage:false,
      };
    },

    mounted() {
        this.showPage = true;
    },

    methods: {
        /**
         * 自身携带方法
         */
        changePage(val){//页码改变的回调，返回改变后的页码---******常用
            this.$emit('changePage',val);
        },
        clickChangePage(val){//切换每页条数时的回调，返回切换后的每页条数---基本不用
             this.$emit('clickChangePage',val);
        },
        /**
         * 组件添加方法
         */
        refreshPage(){//点击后刷新组件,强制恢复第一页状态
            this.showPage = false;
            this.$nextTick(() => {
                this.showPage = true;
            })
        },

    },

  }

</script>
<style lang='less' scoped>

</style>