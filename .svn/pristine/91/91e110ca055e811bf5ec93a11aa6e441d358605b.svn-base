<template>
  <ul>
    <li>
        <p style = "width: 15%;">表具名称：</p>
        <p style = "width: 35%;"><Input v-model="bjmcVal" placeholder="请输入表具名称"/></p>
        <p style = "width: 15%;padding-left: 5%">表号：</p>
        <p style = "width: 35%;"><Input v-bind:disabled="insertorupdate==2" @on-blur = 'blurinput("表号",bhVal)' v-model="bhVal" placeholder="请输入表号"/></p>
    </li>
     <li>
         <p style = "width: 15%;">抄表方式：</p>
         <p style = "width: 35%;">
            <cselect :sel_val="cbfsVal" :options='cbfsVals'  @changeFun='cbfsFun'></cselect>
             <!--<Select v-model="cbfstp" :value="cbfstp">
                 <Option v-for="item in cbfsVals" :value="item.value" :key="item.value">{{item.label}}</Option>
             </Select>-->
         </p>
         <p style = "width: 15%;padding-left: 4%">设备号：</p>
         <p style = "width: 35%;"><Input @on-blur = 'blurinput("设备号",sbhVal)'  v-bind:disabled="types==false" v-model="sbhVal" placeholder="请输入设备号"/></p>
    </li>
      <li>
          <p style = "width: 15%;">终端序号：</p>
          <p style = "width: 35%;"><Input @on-blur = 'blurinput("终端序号",zdxhVal)' v-bind:disabled="types1==false" v-model="zdxhVal" placeholder="请输入终端序号"/></p>
          <p style = "width: 15%;padding-left: 1%">所属集中器：</p>
          <p style = "width: 35%;"><cselect v-bind:disabled="types1==false" :sel_val='jzqVal' :options='jzqVals' @changeFun='ssjzqFun'></cselect></p>
      </li>
    <li>
        <p style = "width: 15%;">表具类型：</p>
        <p style = "width: 35%;"><cselect :sel_val='bjlxVal' :options='bjlxVals' @changeFun='bjlxFun'></cselect></p>
        <p style = "width: 15%;padding-left: 3%">表具型号：</p>
        <p style = "width: 35%;"><Input v-model="bjxhVal" placeholder="请输入表具型号"/></p>
    </li>
    <li>
        <p style = "width: 15%;">表具状态：</p>
        <p style = "width: 35%;"><cselect :sel_val='bjztVal' :options='bjztVals' @changeFun='bjztFun'></cselect></p>
        <p style = "width: 15%;padding-left: 5%">变比：</p>
        <p style = "width: 35%;"><Input v-model="bbVal" type='number' placeholder="请输入变比"/></p>
    </li>
    <li>
        <p style = "width: 15%;">报警阀值：</p>
        <p style = "width: 35%;"><Input v-model="bjfzVal" type='number' placeholder="请输入报警阀值"/> </p>
        <p style = "width: 15%;padding-left: 3%">所属单位：</p>
        <p style = "width: 35%;">
           <!-- <cselect :sel_val='ssdwVal' :options='ssdwVals' @changeFun='ssdwFun'></cselect>-->
            <cselect :sel_val='ssdwVal' :options='ssdwVals' @changeFun='ssdwFun'></cselect>
        </p>
    </li>

    <li>
        <p style = "width: 15%;">安装位置：</p>
        <p style = "width: 35%;"><Input v-model="azwzVal" placeholder="请输入安装位置"/></p>
        <p style = "width: 15%;padding-left: 3%">生产厂商：</p>
        <p style = "width: 35%;"><Input v-model="sccsVal" placeholder="请输入生产厂商"/></p>
    </li>
    <li>
        <p style = "width: 15%;">通讯端口：</p>
        <p style = "width: 35%;"><Input v-bind:disabled="types1==false" v-model="txdkVal" placeholder="请输入通讯端口"/></p>
        <p style = "width: 15%;padding-left: 3%">通讯速率：</p>
        <p style = "width: 35%;"><cselect  v-bind:disabled="types1==false"  :sel_val='txslVal' :options='txslVals' @changeFun='txblFun'></cselect></p>
    </li>
    <li>
        <p style = "width: 15%;">通讯协议：</p>
        <p style = "width: 35%;"><cselect v-bind:disabled="types1==false" :sel_val='txxylxVal' :options='txxylxVals' @changeFun='txxylxFun'></cselect></p>
        <p style = "width: 15%;padding-left: 5%">单价：</p>
        <p style = "width: 35%;"><cselect    :sel_val='djVal' :options='djVals' @changeFun='djFun'></cselect></p>
    </li>
      <li>
          <p>通讯地址：</p>
          <p><Input @on-blur = 'blurinput("通讯地址",txdzVal)' v-bind:disabled="types1==false" v-model="txdzVal" placeholder="请输入通讯地址"/></p>
      </li>
     <li>
        <p>用户大小类号：</p>
        <p><Input v-bind:disabled="types1==false" v-model="yhdxlhVal" placeholder="请输入用户大小类号"/></p>
    </li>
  </ul>
</template>


<script>
  import cselect from '@/components/comIview/cselect'//下拉
  export default {
    name:'',
    props:['add'],//新增修改弹框
    data () {
      return {
          types : true,
          types1 : true,
          empssbh : false,
          empsbh : false,
          empszdxh : false,
          empstxdz : false,
          cbfsstem :'',
          bjmcVal:'',//表具名称
          bhVal:'',//表号
          sbhVal:'',//设备号
          zdxhVal:'',//终端序号
          bjxhVal:'',//表具型号
          bjfzVal:'',//报警阀值
          azwzVal:'',//安装位置
          sccsVal:'',//生产厂商
          txdkVal:'',//通讯端口
          txdzVal:'',//通讯地址
          yhdxlhVal:'',//用户大小类号

          cbfsVal:'',//抄表方式
          jzqVal:'',//所属集中器
          bjlxVal:'',//表具类型
          bjztVal:'',//表具状态
          bbVal:'',//变比
          ssdwVal:'',//所属单位
          txslVal:'',//通讯速率
          txxylxVal:'',//通讯协议类型
          djVal:'',//单价
          djVallabel:'',//单价

          cbfsVals:[],//抄表方式
          jzqVals:[],//所属集中器
          bjlxVals:[],//表具类型
          bjztVals:[],//表具状态
          ssdwVals:[],//所属单位
          txslVals:[],//通讯速率
          txxylxVals:[],//通讯协议类型
          djVals:[],//通讯协议类型s
          insertorupdate : 1,

      };
    },

    components: {
        cselect
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        /**
         * 下拉事件
         */
        cbfsFun(data){//抄表方式
            this.cbfsstem = data.label;
            if( data.label == '集抄'){
                this.types1 = true;
                this.types = false;

                this.empssbh =true;
            }else if( data.label == '4G' ||  data.label == 'NB-IoT'){
                this.types1 = false;
                this.types = true;

                this.empszdxh = true;
                this.empstxdz = true;

            }else{
                this.types1 = true;
                this.types = true;

                this.empssbh =false;
                this.empsbh =false;
                this.empszdxh = false;
                this.empstxdz = false;

            }
            this.cbfsVal=data.value;
        },
        ssjzqFun(data){//所属集中器
            this.jzqVal=data.value;
        },
        bjlxFun(data){//表具类型
            this.bjlxVal=data.value;
            const that = this;
            $.ajax('/api/WatchSetController/xilakuang', {
                data:{'bjlxtext': this.bjlxVal},
                dataType: 'json',
                success: function(res) {
                    debugger;
                    if(res != null && res.success == true){
                        that.$nextTick(() => {
                            that.djVals = res.data.djxx;
                        });
                    }
                }
            });
        },
        bjztFun(data){//表具状态
            this.bjztVal=data.value;
        },
        ssdwFun(data){//所属单位
            this.ssdwVal=data.value;
        },
        txblFun(data){//通讯速率
            this.txslVal=data.value;
        },
        txxylxFun(data){//通讯协议类型
            this.txxylxVal=data.value;
        },
        djFun(data){//单价信息
            this.djVal=data.value;
            this.djVallabel=data.label;
        },
        blurinput(esp,stp){
            if(this.insertorupdate == 1){
                let that = this;
                if(stp != null && stp != ""){
                    $.ajax('/api/WatchSetController/qishiyanzheng', {
                        data: {
                            'esp': esp,
                            'stp' : stp
                        },
                        dataType: 'json',
                        success: function(res) {
                            if(res != null && res.success == true){
                                if(esp == '设备号'){that.empssbh = true;}
                                if(esp == '表号'){that.empsbh = true;}
                                if(esp == '终端序号'){that.empszdxh = true;}
                                if(esp == '通讯地址'){that.empstxdz = true;}
                                return;
                            }else{
                                if(esp == '设备号'){that.empssbh = false;}
                                if(esp == '表号'){that.empsbh = false;}
                                if(esp == '终端序号'){that.empszdxh = false;}
                                if(esp == '通讯地址'){that.empstxdz = false;}
                                that.$message({type: 'error', message: res.message});
                            }
                        },
                        complete: function() {}
                    });
                }
            }
        }
    },

    watch: {}

  }

</script>
<style lang='less' scoped>
    ul{
        overflow: hidden;
        li{
             overflow: hidden;
            padding: 4px 0;
            p{
                float:left;
                &:first-child{
                    width:25%;
                }
                &:last-child{
                    width:75%;
                }
            }
        }
    }
</style>