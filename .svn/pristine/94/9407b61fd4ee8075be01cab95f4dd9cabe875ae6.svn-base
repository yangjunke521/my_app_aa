<template>
  <div class="dtTable">
        <div id="gridContainerId" class="dlshouwen-grid-container"></div>
        <div id="gridToolBarContainer" class="dt-grid-toolbar-container Azzan"></div>
        <div id="AzzanLog"></div>
  </div>
</template>

<script>
  // import '@/assets/js/bootstrap/bootstrap.js'
  // import '@/assets/js/bootstrap/bootstrap.css'
  // import '@/assets/js/fontAwesome/font-awesome.css'
  // import '@/assets/js/dtgrid/jquery.dtGrid.js'
  // import '@/assets/js/dtgrid/zh-cn.js'
  // import '@/assets/js/dtgrid/jquery.dtGrid.css'
//   import '@/assets/js/datePicker/WdatePicker.js'
//   import '@/assets/js/datePicker/WdatePicker.css'
//   import '@/assets/js/datePicker/default/datepicker.css'
  export default {
    name:'',
    props:[''],
    data () {
      return {
        grid:'',
        gridColumns:[
            {id:'configure', title:'配置名称', type:'string', columnClass:'text-center'},
            {id:'createusers', title:'创建人', type:'string', columnClass:'text-center'},
            {id:'sex', title:'性别', type:'string', columnClass:'text-center'},
            {id:'address', title:'地址', type:'string', columnClass:'text-center'},
            {id:'year', title:'年份', type:'string', columnClass:'text-center'},
            {id:'date', title:'日期', type:'date', columnClass:'text-center',
                format:'yyyy-MM-dd hh:mm:ss',hideType:'md|sm|xs',fastQuery:true, fastQueryType:'range' },
            {id:'operation', title:'操作', type:'string', columnClass:'text-center', resolution:function(value, record, column, grid, dataNo, columnNo){
                    var content = '';
                    content += '<button class="btn btn-xs btn-default" οnclick="updateConfigure()"><i class="fa fa-edit"></i>  修改</button>';
                    content += '  ';
                    content += '<button class="btn btn-xs btn-danger" οnclick="removeConfigure()"><i class="fa fa-trash-o"></i>  删除</button>';
                    //content += '<button class="btn btn-xs btn-danger" οnclick="alert(\'删除用户：'+record.user_name+'\');"><i class="fa fa-trash-o"></i>  删除</button>';
                    return content;
            }}
        ],
        datas:[
            {"configure":"样式表","createusers":"江疏影","sex":"女","address":"北京","year":"1991","date":'2014-01-01 19:06:52'},
            {"configure":"字体样式","createusers":"Azzan","sex":"男","address":"深圳","year":"2016","date":'2015-05-21 00:05:21'},
            {"configure":"字体大小","createusers":"范冰冰","sex":"女","address":"上海","year":"1988","date":'2016-05-07 12:06:06'},
            {"configure":"字体颜色","createusers":"赵丽颖","sex":"女","address":"河北","year":"1989","date":'2017-01-01 01:01:01'},
            {"configure":"div高","createusers":"江莱","sex":"女","address":"上海","year":"1990","date":'2017-02-27 13:29:55'},
            {"configure":"dataGrid","createusers":"孙红雷","sex":"男","address":"广州","year":"1992","date":'2018-08-09 14:30:00'}
        ],
        gridOption : {
           lang : 'zh-cn', //用于设置表格的语言，目前提供三种语言：英文、简体中文、繁体中文，默认为英文。
           ajaxLoad : false, //是否通过ajax的方式加载数据，如果设置为true，则将通过loadURL的地址获取数据，如果设置为false，则基础数据由datas属性传入。
          // loadURL : '', //ajax加载数据的地址，本属性只有在ajaxLoad参数设置为true时起作用。
        //    datas : datas, //表格数据，数据格式为JSON数组。该参数仅在ajaxLoad参数设置为false时有效。
           exportFileName : '配置列表', //用于导出文件时的文件名，该文件名由option属性集中的exportFileName获得。
           check:true, //DT Grid提供复选功能，设置该属性为true则将会在所有列之前添加一个复选框的列，并在列标题提供全部选择、全部取消功能。该复选框可以使用getCheckedRecords方法来获取选中的内容。
        //    columns : gridColumns, //列对象定义，将上述定义列的JSON数组对象传递到此参数中。    见上：var gridColumns =
           gridContainer : 'gridContainerId', //表格承载容器对象的id，设置完成后表格将显示在此容器中。 见上：第一个<div id="gridContainer"></div>
           toolbarContainer : 'gridToolBarContainer', //工具条承载容器对象的id，设置完成后表格的工具条将显示在此容器中。 见上：第二个<div id="gridToolBarContainer"></div>
           tools:'refresh|faseQuery|advanceQuery|export[excel,csv,pdf,txt]|print', //工具条可选内容，可选参数。默认：refresh|faseQuery|advanceQuery|export[excel,csv,pdf,txt]|print
           //exportURL:'C:\\Users\\Public\\Desktop', //导出文件的响应地址
           pageSize : 2, //每页显示条数。
           pageSizeLimit : [2, 5, 8], //每页显示条数的限制
           //showHeader:true, //是否显示列标题。不写默认 为true
           //单元格点击事件
           //onCellClick : function(value, record, column, grid, dataNo, columnNo, cell, row, extraCell, e){
       		//var log = '<p>单元格事件触发。事件类型：'+e.type+'；触发单元格坐标：('+columnNo+','+dataNo+')；单元格内容：'+value+'。</p>';
       		//appendAzzanLog(log);
       	//}
       },

      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
        this.gridOption.datas = this.datas;
        this.gridOption.columns = this.gridColumns;
        this.grid=$.fn.DtGrid.init(this.gridOption);
    },

    methods: {},

    watch: {}

  }

</script>
<style lang='less' scoped>
    .dtTable{
        height:20vh;
        width:100%;
    }
</style>