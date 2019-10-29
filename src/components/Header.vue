<template>
  <Header class="header">
    <!-- Logo标题区域 -->
    <div class="logo">
      <img src="@/assets/image/head_left_icon.jpg"/>
    </div>
    <div class="headtext">
      西安咸阳国际机场能源预付费系统
    </div>
    <div class="check">
      <p> 欢迎您：管理员</p>
      <a href="javascript:;"><img src="@/assets/image/head_right_icon1.jpg"></a>
      <a href="javascript:;"><img src="@/assets/image/head_right_icon2.jpg"></a>
    </div>
  </Header>
</template>

<script>
export default {
  data () {
    return {
      userName:'管理员',
    }
  },
  mounted () {
  },
  methods: {
  },

}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  position: fixed;
  background-color: #373c40;
  z-index: 1000;
  padding: 0 20px;
  color:#fff;
  height: 50px;
  line-height: 50px;
  .logo,.headtext{
    float:left;
  }
  .logo{
    margin-right:10px;
    padding-top: 7px;
  }
  .headtext{
    font-size:20px;
  }
  .check{
    float:right;
    font-size:16px;
    p{
      float:left;
    }
    a{
      margin-left:14px;
    }
  }
}

</style>