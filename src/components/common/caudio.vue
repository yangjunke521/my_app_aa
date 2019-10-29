<template>
  <div>
    <Switch class="switchDiv" v-model="switchTit" @on-change="change"  size="large"/>
    <audio controls="controls">
      <source src="@/assets/audio/zxyx.mp3" type="audio/mp3" />
       您的浏览器不支持
    </audio>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
        switchTit: false,
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
    },

    methods: {
      
       change (status) {
                this.$Message.info('开关状态：' + status);
            }
    },

    watch: {}

  }

</script>
<style lang='less' scoped>
  .switchDiv{
    width:3vw;
    height:3vh;
  }
</style>