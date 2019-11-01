<template>
  <div class="header">
    <i class="el-icon-back" v-if="left_btn" @click="backFn"></i>
    <p>{{hd_msg}}</p>
    <div v-if="right_btn" class="right_btn" @click="myOrderFn">
      <img src="@/assets/img/user_pic.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  name: 'app-header',
  props: {
    left_btn: {
      type: Boolean,
      default: false
    },
    right_btn: {
      type: Boolean,
      default: false
    },
    hd_msg: {
      type: String,
      default: 'WELCOME'
    }
  },
  methods: {
    myOrderFn() {
      this.$router.push('/m/home/my_order')
    },
    backFn() {
      this.$router.go(-1);
    }
  },
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
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
</style>