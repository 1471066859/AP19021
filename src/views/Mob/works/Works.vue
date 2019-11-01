<template>
  <div class="works">
    <app-hd :left_btn="left_btn" :right_btn="right_btn" :hd_msg="hdMsg" />
    <div class="content">
      <router-view></router-view>
    </div>
    <Tabbar />
  </div>
</template>
<script>
import '@/hotcss/hotcss'
import Header from '@/views/Mob/components/Header'
import Tabbar from '@/views/Mob/components/Tabbar'
export default {
  components: {
    'app-hd': Header,
    Tabbar
  },
  data() {
    return {
    }
  },
  created() {
  },
  computed: {
    hdMsg() {
      console.log(this.$store.getters.getMobHdMsg)
      return this.$store.getters.getMobHdMsg;
      // return this.$store.mobHdMsg
    },
    right_btn() {
      return false
    },
    left_btn() {
      let { path } = this.$route;
      let leftBtn = false
      path == '/works/OrderDetal'
        ? leftBtn = true
        : leftBtn = false
      return leftBtn
    }
  },
  methods: {

  },
  // beforeRouteEnter(to, from, next) {
  //   let userInfo = sessionStorage.getItem("userInfo");
  //   if (userInfo) {
  //     next();
  //   } else {
  //     next(vm => {
  //       vm.$router.push('/m/login')
  //     })
  //   }
  // }
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.works {
  width: 100vw;
  height: 100%;
  box-sizing: border-box;
  .header {
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(35, 50, 115, 1);
    height: px(40);
    i {
      color: #fff;
      font-size: px(22);
      position: absolute;
      left: 0;
      padding: px(10);
      box-sizing: border-box;

      z-index: 99;
    }
    .right_btn {
      z-index: 99;
      margin-right: px(10);
      position: absolute;
      right: 0;
      top: px(5);
      width: px(30);
      height: px(30);
      box-sizing: border-box;
      background: #fff;
      border-radius: 50%;
      // background: url(../../../assets/img/hd_pic.png) center no-repeat;
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      position: absolute;
      width: 100%;
      height: 100%;
      font-size: px(20);
      line-height: px(40);
      color: #fff;
      text-align: center;
    }
  }
  .content {
    padding-top: px(50);
    padding-bottom: px(61);
    padding-left: px(10);
    padding-right: px(10);
    box-sizing: border-box;
    width: 100%;
    // background: #ccc;
    background: #f2f2f2;
    height: 100%;
    // overflow: hidden;
    // overflow: scroll;
  }
  .mint-tab-item {
    padding: px(7) 0 !important;
  }
  .mint-tab-item-icon {
    width: px(24);
    height: px(24);
    margin: 0 auto px(5);
  }
}
</style>