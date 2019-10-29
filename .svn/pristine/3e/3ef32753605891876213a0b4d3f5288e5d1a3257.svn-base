<template>
    <div>
        <ul v-if="type==0" class="conNav">
            <li :class="{'liActive':active == index}" v-for="(item,index) in list" :key="index" @click='changeTab(item,index)'>{{item}}</li>
        </ul>
         <ul v-if="type==1" class="nav">
            <li :class="{'nav_active':active == index}" v-for="(item,index) in list" @click='changeTab(item,index)' :key="index">{{item.name}}</li>
        </ul>

        
    </div>
</template>

<script>

  export default {
    name:'',
    props:['list'],
    props:{
            type: { //类型，目前有的0代表的是div内部的,1代表大的nav
                type: Number,
                default: 0
            } ,
            list: { //tab数据
                type: Array,
                default: []
            } 
        },
    data () {
      return {
          active:0,
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        changeTab(item,index){
            this.active = index;
            let str={
                'item':item,
                'index':index,
            }
            this.$emit('changeTab',str);
        }
    },

    watch: {}

  }

</script>
<style lang='less' scoped>
    .conNav{
        width:100%;
        height: calc(4vh + 1.5px);
        border-bottom: 1px solid #e5e9ee;
        li{
            border: 0;
            line-height: 4vh;
            width: auto;
            padding: 0 1.5%;
            color:#ccc;
            float:left;
            &:hover{
                cursor: pointer;
            }
        }
        .liActive{
            border-bottom: 2px solid #4285f4;
            color:#333;
        }
    }
    .nav{
        height: 3.4vh;
        border-bottom: 1px solid #eee;
        overflow: hidden;
        li{
            float: left;
            width: 8%;
            height: 100%;
            text-align: center;
            padding-top: .5%;
            border: 1px solid #ddd;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            border-bottom: 0;
            background:#f8f8f8;
            margin-left: .3%;
            &:hover{
                cursor: pointer;
            }
            &:first-child{
                margin-left: 0;
            }
        }
        .nav_active{
            background:#fff;
            color:#3b93d3;
            height:calc(100% + 1px);
        }
    }
</style>