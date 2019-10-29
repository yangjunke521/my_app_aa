<template>
  <table>
      <tr>
          <th>
              <div class="xxStyle" style="position:inherit"></div>
              <span class="time">{{datas.itemsto.col_s_0}}</span>
              <span class="type">{{datas.itemsto.col_h_0}}</span>
          </th>
          <th>{{datas.itemsto.col_h_1}}</th>
          <th>{{datas.itemsto.col_h_2}}</th>
          <th>{{datas.itemsto.col_h_3}}</th>
      </tr>

      <tr v-for="(itemt,indext) in datas.data">
          <th>{{datas.col[indext].col}}</th>
          <td>{{itemt.dbtj}}</td>
          <td>{{itemt.sbtj}}</td>
          <td>{{itemt.qbtj}}</td>
      </tr>
       <!--<tr>
          <th>{{datas.col.col_s_2}}</th>
          <td>{{datas.data.data_4}}</td>
          <td>{{datas.data.data_5}}</td>
          <td>{{datas.data.data_6}}</td>
      </tr>
       <tr>
          <th>{{datas.col.col_s_3}}</th>
          <td>{{datas.data.data_7}}</td>
          <td>{{datas.data.data_8}}</td>
          <td>{{datas.data.data_9}}</td>
      </tr>
       <tr>
          <th>{{datas.col.col_s_4}}</th>
          <td>{{datas.data.data_10}}</td>
          <td>{{datas.data.data_11}}</td>
          <td>{{datas.data.data_12}}</td>
      </tr>
       <tr>
          <th>{{datas.col.col_s_5}}</th>
          <td>{{datas.data.data_13}}</td>
          <td>{{datas.data.data_14}}</td>
          <td>{{datas.data.data_15}}</td>
      </tr>-->
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

    watch: {}

  }

</script>
<style lang='less' scoped>
    table{
        width:calc(100% - 20px);
        height: calc(100% - 20px);
        margin:10px;
        tr,td,th{
            border:1px solid #ccc;
            border-collapse:collapse;
            font-size: 16px;
            text-align: center;
        }
        td,th{
            width:25%;
            position: relative;
        }
    }
    .xxStyle{
        position: absolute;
        left:0;
        top:0;
        width:100%;
        height:100%;
        background:linear-gradient(10deg, transparent 49.5%, rgb(199, 191, 191), rgb(199, 191, 191), transparent 51.5%);
    }
    .time{
        position: absolute;
        left:1vw;
        bottom:.2vw;
    }
    .type{
        position: absolute;
        right: 1vw;
        top: .2vw;
    }
</style>