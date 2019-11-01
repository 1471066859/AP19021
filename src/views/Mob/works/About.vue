<template>
  <div class="About">
    <!-- banner -->
    <div class="banner">
      <div class="userinfo">
        <div class="user_pic">
          <img src="@/assets/img/user_pic.png" alt />
        </div>
        <div class="user_des">
          <span>用户:</span>
          {{userId}}
        </div>
      </div>
    </div>
    <!-- 我的信息卡 -->
    <div class="aboutContent">
      <p>我的信息</p>
      <div class="aboutRow">
        <i>生日</i>
        <span>1985-11-30</span>
      </div>
      <div class="aboutRow">
        <i>身份证</i>
        <span>65415365987456980</span>
      </div>
      <div class="aboutRow">
        <i>手机</i>
        <span>15636589547</span>
      </div>
      <div class="aboutRow">
        <i>地址</i>
        <span>四川成都武侯区优博中心D栋5004</span>
      </div>
    </div>
  </div>
</template>

<script>
import '@/hotcss/hotcss'
export default {
  name: 'About',
  data() {
    return {

    }
  },
  created() {
    this.$store.dispatch("setTabState", 3);
  },
  computed: {
    userId() {
      // let { userId } = sessionStorage.getItem('userInfo');
      return 'asdad'
    },
  }
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.About {
  width: 100%;
  border-radius: px(5);
  font-size: px(16);
  height: 100%;
  box-sizing: border-box;
  .banner {
    width: 100%;
    height: px(190);
    // background: deepskyblue;
    background: url(../../../assets/img/u219.png) center no-repeat;
    background-size: 100% 100%;
    border-radius: px(5);
    display: flex;
    flex-direction: column-reverse;
    .userinfo {
      padding: px(10);
      display: flex;
      align-items: flex-end;
      .user_pic {
        width: px(56);
        height: px(56);
        box-sizing: border-box;
        border: px(4) solid #fff;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .user_des {
        font-size: px(12);
        color: #fff;
        padding-bottom: px(6);
        padding-left: px(10);
      }
    }
  }
  .aboutContent {
    background: #fff;
    border-radius: px(4);
    margin-top: px(5);
    p {
      padding: px(8) px(15);
      font-size: px(12);
      color: #000;
      // font-weight: 700;
      border-bottom: 1px solid #ccc;
    }
    .aboutRow {
      font-size: px(12);
      color: rgba(0, 0, 0, 0.6470588);
      padding: px(8) px(15);
      i {
        width: px(80);
        display: inline-block;
      }
      span {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        // width: 100%;
        width: px(240);
        display: inline-block;
      }
    }
  }
}
</style>