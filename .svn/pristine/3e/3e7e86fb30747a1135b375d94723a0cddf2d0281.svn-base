<template>
  <Layout class="layout">
    <Header></Header>
    <Layout class="layout-main">
      <LeftMenu></LeftMenu>
      <Layout>
        <Content class="content">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </Layout>
</template>

<script>
import Header from '@/components/Header'
import LeftMenu from '@/components/LeftMenu'

export default {
  components: { Header, LeftMenu }
}
</script>

<style lang="less" scoped>
.ivu-layout {
  flex-direction: row;
}
.layout-main {
  position: relative;
  top: 64px;
  .content {
    width: calc(100vw - 200px);
    height: calc(100vh - 64px);
    overflow: auto;
  }
}

</style> 