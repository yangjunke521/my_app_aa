<template>
  <div  class="cultureDiv">
<!--      <div id="printTest" class="cultureDiv">-->
    <Breadcrumb style="border-bottom:1px solid #ccc;font-size:18px;font-weight:100;padding:8px 0;">
      <BreadcrumbItem>统计分析</BreadcrumbItem>
    </Breadcrumb>
    <Content>
      <section>
        <div class="sec_div">
           <div class="template_div">
             <h4>
               <span>咸阳机场</span>
             </h4>
             <div class="temp_con">
               <ul class='nav_con'>

                   <li :class="{'navLiActive':index == nav_conIndex}" v-if="ylphbData.length>0" v-for="(item,index) in ylphbData"  @click="navLiChange(index)">
                     <p v-if="index != nav_conIndex">{{item.shmc}}
                         <span><img src="@/assets/image/nav_li.jpg"/></span>
                     </p>
                     <div class="navDiv" style = "height:6.68vh" v-else-if="index == nav_conIndex">
                         <div class="navDivL">
                             <div class="img"><img width="50vh" height="50vh"  :src="item.src"/></div>
                         </div>
                         <div class="navDivR">
                             <h2>{{item.shmc}}</h2>
                         </div>
                         <span class="navDivImg"><img src="@/assets/image/nav_li_active.jpg"/></span>
                     </div>
                 </li>

               </ul>
             </div>
           </div>
        </div>
        <div class="sec_div">
           <div class="template_div">
              <h4>
                <span>时间周期</span>
                <div class="souso sousoT">
                  <CSelect :options='sjzqOptions' :sel_val ='sjzqOption' @changeFun='timeChange'></CSelect>
                  <CDate
                    :dateType="dateType"  
                    :format="dateFormat"
                    @changeDate='startData' 
                    :placeholder='startPlaceholder' 
                    :options='bbyfOptions' 
                    :dateVal="startVal"></CDate>
                  <a href="javascript:;" style="padding: 0 .4vw;">-</a>
                  <CDate
                    :disabled="types==false"
                    :dateType="dateType"
                    :format="dateFormat"
                    @changeDate='endData' 
                    :placeholder='endPlaceholder' 
                    :options='bbyfOptions' 
                    :dateVal="endVal"></CDate>
                  <Button   size="small" @click="search" style="margin-left:10px;"><Icon type="ios-search" /></Button>
                   <!--<Button  v-print="'#printTest'" size="small"  style="margin-left:10px;"><Icon type="ios-search" /></Button>-->
                </div>
              </h4>
              <div  class="temp_con">
                 <navTable class="table" :datas='sjzqData'></navTable>
              </div>
           </div>

        </div>
      </section>
    </Content>
  </div>
</template>


<script>
import navTable from "@/components/common/navTable";//table
import CDate from '@/components/comIview/cdate'
import CSelect from "@/components/comIview/cselect";//下拉
export default {
  name: 'StatisticalAnalysis',//统计分析
  props: [''],
  data () {
    return {
      /**
       * 用量排行榜
       */
      ylphTitList:['单位','表具'],//用量排行榜
      ylphTit:0,//用量排行榜
      ylphbList:['电表','水表','燃气表'],//用量排行榜
      ylphb_act:0,//用量排行榜
      ylphbData:[//用量排行榜-排名数据
        {shmc:'田园古香'},
         {shmc:'大宋官窑'},
      ],
      /**
      * 统计分析
      */
      dwmcVal:'',//单位表具管理-输入框
      nav_conIndex:-1,//默认选中的值
      /**
      * 时间周期
      */
     sjzqOption : '4',
     types: false,
     sjzqOptions:[
          {
              label:'日',
              value:'4'
          },
          {
              label:'月',
              value:'5'
          },
          {
              label:'年',
              value:'6'
          },
          {
              label:'日周期',
              value:'1'
          },
          {
              label:'月周期',
              value:'2'
          },
          {
              label:'年周期',
              value:'3'
          }

     ],


     /**
      * 时间周期数据
      */
     sjzqData:{
       itemsto :{
           col_h_0:'类型',
           col_h_1:'电(°)',
           col_h_2:'水(t)',
           col_h_3:'天然气(m)',
           col_s_0:'时间',
       },
       col:[
           {col:'2019-10-23'},
           {col:'2019-10-23'},
           {col:'2019-10-23'},
       ],
       data:[
           {sbtj:'1129', dbtj:'12312', qbtj:'13123',},
           {sbtj:'1129', dbtj:'12312', qbtj:'13123',},
           {sbtj:'1129', dbtj:'12312', qbtj:'13123',},
       ]
     },
      startPlaceholder:'请选择开始时间',
      endPlaceholder:'请选择结束时间',
      startVal:'',//开始时间value
      endVal:'',//结束时间value
      startTime:'',
      endTime:'',
      dateType:'date',//时间类型
      dateFormat:'',//时间类型
      /**
       * 报表月份
       */
      bbyfOptions:{
         disabledDate (date) {
              return (date && date.valueOf() > Date.now() || date && date.valueOf() < Date.now()-10*365*24*60*60*1000);
          }
      },

    }
  },

  components: {
    navTable,
    CDate,
    CSelect
  },

  computed: {},

  beforeMount () { },

  mounted () {
        this.selectsjxx();
        this.chushijiazaitab();
  },

  methods: {
    /**
     * 用户排名切换
     */
    yhphChange(index){//单位表具
      this.ylphTit = index;
    },
    search(){//单位表具管理-搜索确定
        //判断是否为点击商家后点击查询
        const that=this;
        let shbh = this.ylphbData[this.nav_conIndex] != null ? this.ylphbData[this.nav_conIndex].shbh : null;
            //判断选择的时间为年，月，日需要一个时间查询
            if(this.sjzqOption == '4' || this.sjzqOption == '5' || this.sjzqOption == '6'){
                //判断时间所需时间是否为空
                if(this.startTime != null && this.startTime != ""){

                    //条件查询数据，带入条件：开始时间字段-选择类型（年，月，日）-商家编号
                    $.ajax({
                        url: '/api/StatisticalAnalysisController/nyrselecthuizong',     // 请求地址, 就是你的控制器, 如 test.com/home/index/index
                        data:{ 'pmap': JSON.stringify(this.sjzqData),shbh:shbh,startVal:this.startTime,sjzqOption:this.sjzqOption},
                        type: 'POST',   // 请求方式
                        dataType: 'json', // 返回数据的格式, 通常为JSON
                        success: function (result) {
                            if(result.success){
                                that.sjzqData = result.data;
                            }
                        },
                    });

                }else{this.$message({type: 'info', message: '请选择时间！'});}
            }else{
                //选择的时间为年周期，月周期，日周期，需要两个时间按查询
                //判断时间所需时间是否为空,两个时间
                if(this.startTime != null && this.startTime != ""){
                    if(this.endTime != null && this.endTime != ""){
                        if(new Date(this.startTime+" 00:00:00".replace(/-/g, "/"))  < new Date(this.endTime+" 00:00:00".replace(/-/g, "/"))){

                            debugger;
                            if(this.sjzqOption == '1'){
                                if( Math.abs(parseInt((new Date(this.endTime+" 00:00:00".replace(/-/g, "/")) - new Date(this.startTime+" 00:00:00".replace(/-/g, "/")))/1000/3600/24))> 30){
                                    this.$message({type: 'info', message: '选择开始日期与结束日期差值不得大于30天！'});
                                    return;
                                }
                            }else if(this.sjzqOption == '2'){
                                if( Math.abs(parseInt((new Date(this.endTime+" 00:00:00".replace(/-/g, "/")) - new Date(this.startTime+" 00:00:00".replace(/-/g, "/")))/1000/3600/24)) > 365){
                                    this.$message({type: 'info', message: '选择开始日期与结束日期差值不得大于12月！'});
                                    return;
                                }
                            }
                            //条件查询数据，带入条件：开始时间字段-选择类型（年，月，日）-商家编号
                            $.ajax({
                                url: '/api/StatisticalAnalysisController/nyrselecthuizong_zhouqi',     // 请求地址, 就是你的控制器, 如 test.com/home/index/index
                                data:{ 'pmap': JSON.stringify(this.sjzqData),shbh:shbh,endVal:this.endTime,startVal:this.startTime,sjzqOption:this.sjzqOption},
                                type: 'POST',   // 请求方式
                                dataType: 'json', // 返回数据的格式, 通常为JSON
                                success: function (result) {
                                    if(result.success){
                                        that.sjzqData = result.data;
                                    }
                                },
                            });

                        }else{this.$message({type: 'info', message: '开始时间大于或等于结束时间！'});}
                    }else{this.$message({type: 'info', message: '请选择结束时间！'});}
                }else{this.$message({type: 'info', message: '请选择开始时间！'});}
            }
    },
    selectsjxx(){
        const that=this;
        $.ajax({
                url: '/api/StatisticalAnalysisController/selectsjxx',     // 请求地址, 就是你的控制器, 如 test.com/home/index/index
                type: 'POST',   // 请求方式
                dataType: 'json', // 返回数据的格式, 通常为JSON
                success: function (result) {
                    if(result.success){
                        that.ylphbData = result.data;
                    }
                },
            });
    },
    /**
    * 时间周期
    */
    startData(data){
      this.startTime = data.val;
    },
    endData(data){
      this.endTime = data.val;
    },
    timeChange(data){//时间周期下拉
      let label = data.label;
      this.sjzqOption = data.value;
      if(this.sjzqOption == '4' || this.sjzqOption == '5' || this.sjzqOption == '6'){this.types = false;}else{this.types = true;}
      let nowdate = new Date();
      let nowYear = nowdate.getFullYear();//年
      let nowMonth =  nowdate.getMonth()+1;//月
      let nowDate =  nowdate.getDate();//日
      if(label == '日周期'){
        this.dateType='date';//时间类型
        this.dateFormat='';//时间类型
        if( Number(nowMonth) == 1){
           let nowM = '12';
            this.startVal = nowYear+'-'+nowM+'-'+nowDate;
            this.startTime=nowYear+'-'+nowM+'-'+nowDate;
        }else{
          let nowM = Number(nowMonth)-1;
          this.startVal = nowYear+'-'+nowM+'-'+nowDate;
            this.startTime=nowYear+'-'+nowM+'-'+nowDate;
        }
        this.endVal=nowYear+'-'+nowMonth+'-'+nowDate;

          this.endTime=nowYear+'-'+nowMonth+'-'+nowDate;
      }else if(label == '月周期'){
        this.dateType='month';//时间类型
        this.dateFormat='yyyy-MM';//时间类型
        this.startVal=Number(nowYear)-1+'-'+nowMonth;
        this.endVal=nowYear+'-'+nowMonth;

          this.startTime=Number(nowYear)-1+'-'+nowMonth;
          this.endTime=nowYear+'-'+nowMonth;

      }else if(label == '年周期'){
        this.dateType='year';//时间类型
        this.dateFormat='yyyy';//时间类型
        this.startVal=Number(nowYear)-1+'';
        this.endVal=nowYear+'';
          this.startTime=Number(nowYear)-1+'';
          this.endTime=nowYear+'';
      }else{
          this.startVal='';
          this.endVal='';
          if(label == '年'){
              this.dateType='year';//时间类型
              this.dateFormat='yyyy';//时间类型
              let nowdate = new Date();
              nowdate.setDate(nowdate.getDate()-1);
              this.startVal = nowdate;

              this.startTime=nowYear+'';

          }else if(label == '月'){
            this.dateType='month';//时间类型
            this.dateFormat='yyyy-MM';//时间类型
              let nowdate = new Date();
              nowdate.setDate(nowdate.getDate()-1);
              this.startVal = nowdate;

              this.startTime=nowYear+'-'+nowMonth;
          }else{
            this.dateType='date';//时间类型
            this.dateFormat='';//时间类型
            let nowdate = new Date();
            nowdate.setDate(nowdate.getDate()-1);
            this.startVal = nowdate;

              this.startTime=nowYear+'-'+nowMonth+'-'+nowDate;
          }
      }
    },
    /**
    * 单位表具管理
    */
    navLiChange(index){
      this.nav_conIndex = index;
      let shbh = this.ylphbData[this.nav_conIndex].shbh;

        //加载初始表格数据
        const that=this;
        $.ajax({
            url: '/api/StatisticalAnalysisController/chushijiazaitab_djsj',     // 请求地址, 就是你的控制器, 如 test.com/home/index/index
            data:{ 'pmap' : JSON.stringify(this.sjzqData),shbh:shbh},
            dataType: 'json', // 返回数据的格式, 通常为JSON
            success: function (result) {
                if(result.success){
                    debugger;
                    that.$nextTick(() => {
                        that.sjzqData = result.data;
                    });
                }
            },
        });
        this.types = false;
        this.sjzqOption = '4';
        //加载右侧时间框初始信息
        let nowdate = new Date();
        nowdate.setDate(nowdate.getDate()-1);
        this.dateType='date';//时间类型
        this.dateFormat='';//时间类型
        let nowYear = nowdate.getFullYear();//年
        let nowMonth =  nowdate.getMonth()+1;//月
        let nowDate =  nowdate.getDate();//日
        this.startTime=nowYear+'-'+nowMonth+'-'+nowDate;
        this.startVal = nowdate;
    },
    chushijiazaitab(){
        //加载初始表格数据
        const that=this;
        $.ajax({
            url: '/api/StatisticalAnalysisController/chushijiazaitab',     // 请求地址, 就是你的控制器, 如 test.com/home/index/index
            data:{ 'pmap' : JSON.stringify(this.sjzqData)},
            dataType: 'json', // 返回数据的格式, 通常为JSON
            success: function (result) {
                if(result.success){
                    that.sjzqData = result.data;
                }
            },
        });
        //加载右侧时间框初始信息
        let nowdate = new Date();

        this.dateType='date';//时间类型
        this.dateFormat='';//时间类型
        nowdate.setDate(nowdate.getDate()-1);

        let nowYear = nowdate.getFullYear();//年
        let nowMonth =  nowdate.getMonth()+1;//月
        let nowDate =  nowdate.getDate();//日
        this.startTime=nowYear+'-'+nowMonth+'-'+nowDate;
        this.startVal = nowdate;
      },
  }
}

</script>
<style lang='less' scoped>
.cultureDiv {
  padding: 0 20px 20px;
  max-width: calc(100vw - 300px);
  min-height: calc(100vh - 57px);
  section {
    width: 100%;
    height: 87vh;
    padding-top: 18px;
    .sec_div{
      float:left;
      height:100%;
      &:first-child{
        width:23.15%;
        .template_div{
          height:100%;
        }
      }
      &:last-child{
        width:calc(76.85% - 18px);
        margin-left:18px;
        .template_div{
          &:first-child{
            height: 48%;
            margin-bottom:18px;
            .temp_con{
               height: 88%;
               margin: 0 10px;
              border-top: 1px solid #ccc;
            }
          }
          &:last-child{
            height: 100%;
            .temp_con{
              height: 44%;
               margin: 0 10px;
              border-top: 1px solid #ccc;
              
            }
          }
        }
      }
      .template_div {
        border:1px solid #cacaca;
        box-shadow: 0 0 3px #cacaca;
        overflow-y: auto;
        h4{
          height: 4.3vh;
          padding-top: 1vh;
          span{
            border-left:4px solid #1dc9ff;
            padding-left: 10px;
            font-size: 18px;
            font-weight: 500;
            float:left;
          }
        }
        .temp_con{
          height:95%;
          .nav{
            border:1px solid #ccc;
            border-left:0;
            border-right:0;
            overflow: hidden;
            li{
              float:left;
              width:33.33%;
              text-align: center;
              border-bottom:4px solid rgba(0,0,0,0);
              color:#333;
              padding: 1.23vh 0;
              font-size: 14px;
              &:hover{
                cursor: pointer;
              }
            }
          }
          .nav_con{
            border-top: 1px solid #cccc;
            margin: 0 10px;
            li{
              padding:0 18px;
              overflow: hidden;
              &:hover{
                cursor: pointer;
              }
              p{
                float:left;
                width:100%;
                padding: 3.8% 0;
                border-bottom: 1px solid #ddd;
                font-size: 16px;
                span{
                  float:right;
                }
              }
            }
            .navLiActive{
              padding:18px;
              padding-bottom:0;
              .navDiv{
                height: 13vh;
                border-bottom: 1px solid #ddd;
                position: relative;
                .navDivL{
                  width:4.5vw;
                  float:left;
                  background: url(../../assets/image/bg_right.jpg) no-repeat center right;
                  h2{
                    font-size: 16px;
                  }
                }
                .navDivR{
                  width:8vw;
                  float:left;
                  padding-left: 1.5vw;
                  p{
                    border:0;
                     padding: 1.8% 0;
                    color:#5094ff;
                  }
                }
                .navDivImg{
                  position:absolute;
                  right:0;
                  top:0;
                }
              } 
            }
          }
        }
        .souso{
            float:left;
            width: 50vw;
            margin-left:10px;
          }
      }
    }
    
  }
}
</style>