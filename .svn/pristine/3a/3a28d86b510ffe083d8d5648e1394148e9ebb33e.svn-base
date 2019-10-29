<template>
  <table>
    <tr>
        <th v-for="item in datas.col">{{item}}</th>
    </tr>
    <tr v-for="item in datas.data">
        <th>{{item.data_1}}</th>
        <td>{{item.data_2}}</td>
        <td>{{item.data_3}}</td>
        <td>{{item.data_4}}</td>
    </tr>
  </table>
</template>

<script>

  export default {
    name:'',
    props:['datas'],
    data () {
      return {
          
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {
        datas(val){
            debugger
        }
    }

  }

</script>
<style lang='less' scoped>
    table{
        width:100%;
        height: 100%;
        tr,td,th{
            border:1px solid #ccc;
            border-collapse:collapse;
            font-size: 14px;
            text-align: center;
        }
        td,th{
            width:20%;
            position: relative;
            height:40px;
            line-height:40px;
            font-size: 16px;
        }
    }
</style>