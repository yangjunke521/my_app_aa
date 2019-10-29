<template>
  <Table 
    :width='width'
    :height='height'
    :max-height='maxheight'
    :stripe='stripe' 
    :border='border' 
    :disabled-hover='disabledHover'
    :highlight-row='highlightRow'
    :columns="columns" 
    :data="list" 
    @on-selection-change="seclectChange"
    @on-row-click='rowClick'
    @on-row-dblclick='rowdblclick'
    @on-current-change='currentChange'
    @on-select-all='selectAll'
    @on-select-all-cancel='selectAllCancel'
    @on-sort-change='sortChange'
    @on-filter-change='filterChange'
    >
    <!-- 定义slot部分 -->
    <!-- 编辑 -->
    <template slot-scope="{ row, index }" slot="operation">
      <Icon type="ios-create-outline" class="slotIcon" @click="clickBJ(row)"/>
    </template>
    <!-- 删除 -->
     <template slot-scope="{ row, index }" slot="deleted">
       <Icon type="ios-trash-outline" class="slotIcon" @click="clickSC(row)"/>
    </template>
    <!-- 阅读 -->
     <template slot-scope="{ row, index }" slot="read">
       <Icon type="ios-book-outline" class="slotIconBack" @click="clickYD(row)"/>
      <p>{{row.read}}</p>
    </template>
    <!-- 下载 -->
     <template slot-scope="{ row, index }" slot="download">
       <Icon type="ios-download-outline" class="slotIconBack" @click="clickXZ(row)"/>
        <p>{{row.download}}</p>
    </template>
    <!-- 收藏 -->
     <template slot-scope="{ row, index }" slot="collection">
       <Icon type="ios-star-outline" class="slotIconBack" @click="clickBC(row)"/>
       <p>{{row.collection}}</p>
    </template>
    <template slot-scope="{ row, index }" slot="operationT">
      <Button size="small" type="primary" @click="clickZX(row)" style="margin-right:5px;">执行</Button>
      <Button size="small" type="primary" @click="clickTJ(row)">统计</Button>
    </template>
  </Table>
</template>

<script>
  export default {
    name:'iview-table',
    props:{
        columns: Array, // 表头数据
        list: Array, // 表格数据
        width: [Number, String],//表格宽度
        height: [Number, String],//表格高度，单位 px，设置后，如果表格内容大于此值，会固定表头-***注意传进来是number的有滚动条，px的没有
        maxheight: [Number, String],//表格最大高度，单位 px，设置后，如果表格内容大于此值，会固定表头-***注意传进来是number的有滚动条，px的没有
        stripe: { // 是否显示间隔斑马纹
            type: Boolean,
            default: false
        },
        border: { // 是否显示纵向边框
            type: Boolean,
            default: false
        },
        disabledHover: { // 禁用鼠标悬停时的高亮
            type: Boolean,
            default: false
        },
        highlightRow: { // 是否支持高亮选中的行，即单选
            type: Boolean,
            default: false
        }
    },
     data () {
      return {

      };
    },
    methods:{
      /**
       * 自带事件
       */
      rowClick(data,index){//单击某一行时触发,data==当前行数据，index==当前行的下标
        let str={
          'data':data,
          'index':index
        }
        this.$emit("rowClick",str)
      },
      rowdblclick(data,index){//双击击某一行时触发,data==当前行数据，index==当前行的下标
        let str={
          'data':data,
          'index':index
        }
        this.$emit("rowdblclick",str)
      },
      currentChange(currentRow,oldCurrentRow){//开启 highlight-row 后有效，当表格的当前行发生变化的时候会触发,currentRow==当前高亮行数据，oldCurrentRow==上次高亮行数据
        let str={
          'data':currentRow,
          'oldData':oldCurrentRow
        }
        this.$emit("currentChange",str)
      },
      seclectChange(selection){//在多选模式下有效，只要选中项发生变化时就会触发,selection==已选项数据
        let str={
          'data':selection
        }
        this.$emit("seclectChange",str)
      },
      selectAll(selection){//在多选模式下有效，点击全选时触发,selection：已选项数据
        let str={
          'data':selection
        }
        this.$emit("selectAll",str)
      },
      selectAllCancel(selection){//在多选模式下有效，取消点击全选时触发,selection：已选项数据
        let str={
          'data':selection
        }
        this.$emit("selectAllCancel",str)
      },
      sortChange(column,key,order){//排序时有效，当点击排序时触发,column==当前列数据,key==排序依据的指标,order==asc/desc
        let str={
          'column':column,
          'order':order,
          'key':key
        }
        this.$emit("sortChange",str)
      },
      filterChange(column){//筛选时有效，筛选条件发生变化时触发,column==当前列数据
        let str={
          'column':column
        }
        this.$emit("filterChange",str)
      },
      /**
       * slot事件
       */
      clickBJ(data){//编辑点击事件
         this.$emit("clickBJ",data)
      },
      clickSC(data){//删除点击事件
         this.$emit("clickSC",data)
      },
      clickYD(data){//阅读点击事件
         this.$emit("clickYD",data)
      },
      clickXZ(data){//下载点击事件
         this.$emit("clickXZ",data)
      },
      clickBC(data){//收藏点击事件
         this.$emit("clickBC",data)
      },
      clickZX(data){//编辑执行事件
        this.$emit("clickZX",data)
      },
      clickTJ(data){//编辑统计事件
        this.$emit("clickTJ",data)
      }
    }
  }
</script>
<style lang='less' scoped>
  .slotIcon,.slotIconBack{
    font-size:20px;
    vertical-align: text-bottom;
    font-weight: 900;
    color:#2f75ec;
    &:hover{
      cursor: pointer;
    }
  }
  .slotIconT{
     color:#d30d00;
  }
  .slotIconBack{
    color:#000;
  }
</style>
