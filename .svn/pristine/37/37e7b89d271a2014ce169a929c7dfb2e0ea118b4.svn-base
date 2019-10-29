<template>
    <div class="iview_swiper_div">
        <Carousel class="iview_carousel dqSwiper" v-model="value"
            :autoplay="setting.autoplay"
            :autoplay-speed="setting.autoplaySpeed"
            :dots="setting.dots"
            :radius-dot="setting.radiusDot"
            :trigger="setting.trigger"
            :arrow="setting.arrow"
        >
            <CarouselItem v-for="(item,index) in list" :key="index">
                <div class="demo-carousel">
                    <div class="imgDiv">
                        <img :src="item.src"/>
                    </div>
                    <p class="name">{{item.name}}</p>
                    <p class="auth">{{item.auth}}</p>
                    <div class="evaluate">
                        <p class="iconStyle"><icon-svg icon-class="success" /></p><span>{{item.success}}</span>
                        <p class="iconStyle"><icon-svg icon-class="fail" /></p><span>{{item.erro}}</span>
                    </div>
                </div>
            </CarouselItem>
        </Carousel>
        <p class="swiper_num"><span>{{this.value+1}}</span> / <span>{{list.length}}</span></p>
    </div>
    
</template>

<script>
  
  import '@/icons/PartyGroup/success.svg'
  import '@/icons/PartyGroup/fail.svg'
  export default {
    name:'dq_swiper',//党群-轮播图
    props:['list'],
    data () {
      return {
        value: 0,
        setting: {
            autoplay: false,
            autoplaySpeed: 2000,
            dots: 'none',//inside内部，outside外部，none不显示，指示器位置
            radiusDot: false,
            trigger: 'click',
            arrow: 'always',//hover,always,never,切换箭头
        }
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
    .iview_swiper_div{
        width:100%;
        height:100%;
        position: relative;
        .iview_carousel{
            width:100%;
            height:100%;
        }
        .swiper_num{
            position: absolute;
            bottom: .8%;
            right: 4%;
        }
    }
    
</style>