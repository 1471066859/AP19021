<template>
  <mt-loadmore :top-method="loadTop" ref="loadmore">
    <div class="my_order_wrap">
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

      <!-- my_order -->
      <div class="my_order">
        <div class="title">我的订单</div>
        <!-- 遍历我的订单列表 -->
        <p class="no_order" v-if="my_order_list.length == 0">暂无订单信息</p>
        <div class="order_wrap" v-for="(item, index) in my_order_list" :key="index">
          <div class="order_id">
            <div>
              <span>订单编号:</span>
              {{item.orderId}}
            </div>
            <i class="el-icon-more" @click="orderDetal(item.orderUuid)"></i>
          </div>
          <div class="order_time">
            创建时间:
            <span>{{item.orderTime}}</span>
          </div>
          <!-- 进度图 -->
          <div class="rate_wrap">
            <div class="rate_sild">
              <div class="rate_sild_ok" :style="{'width': item.productionState + '%'}"></div>
              <div
                v-for="(state, i) in stateList"
                :key="i"
                :style="{'left': i * scaleNum + '%'}"
                class="radio"
                :class="{'radio_act': item.productionState >= scaleNum * i}"
              ></div>
              <!-- <div class="radio radio" :class="{'radio_act': item.productionState + '%' >= '0%'}"></div>
              <div class="radio1 radio" :class="{'radio_act': item.productionState + '%' >= '33%'}"></div>
              <div class="radio2 radio" :class="{'radio_act': item.productionState + '%'>= '66%'}"></div>
              <div class="radio3 radio" :class="{'radio_act': item.productionState + '%'>= '99%'}"></div>-->
            </div>
            <div class="rate_des">
              <span
                v-for="(state,i) in stateList"
                :key="i"
                :class="{'rate_font': item.productionState >= i * scaleNum }"
              >{{state}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </mt-loadmore>
</template>

<script>
import qs from 'qs'
import { scaleNum } from '@/Tools/intScaleNum'
import { MessageBox } from 'mint-ui';
export default {
  name: "me",
  created() {
    // 获取订单列表
    this.getUserOrder()
  },
  computed: {
    userId() {
      let { userId } = sessionStorage.getItem('userInfo');
      return userId
    },
    // 进度调比例
    scaleNum() {
      return scaleNum(this.stateList);
    }
    // scaleNum() {
    //   const { stateList } = this;
    //   const scaleNum = 1 / (stateList.length - 1);
    //   const intScaleNum = Math.floor(scaleNum * 100)
    //   return intScaleNum;
    // },
  },
  data() {
    return {
      // 状态列表
      stateList: [
        "下单成功",
        "生产中",
        "完成",
        "物流配送",
      ],
      // 订单列表
      my_order_list: [
        // {
        //   orderId: 'D03120',
        //   orderTime: '2018-10-22 12:20:30',
        //   productionState: 0
        // },
        // {
        //   orderId: 'D033120',
        //   orderTime: '2018-10-22 12:20:30',
        //   productionState: 33
        // },
        // {
        //   orderId: 'D03510',
        //   orderTime: '2018-10-22 12:20:30',
        //   productionState: 66
        // },
        // {
        //   orderId: 'D50510',
        //   orderTime: '2018-10-22 12:20:30',
        //   productionState: 99
        // },
      ]
    }
  },
  mounted() {
  },
  methods: {
    // 获取用户订单列表
    getUserOrder() {
      const data = qs.stringify({
        userUuid: sessionStorage.getItem('userUuid')
      })
      this.axios.post('api/webapi/orders/getOrdersByUserUuid', data)
        .then(res => {
          console.log(res);
          const { success, msg, data } = res.data;
          if (success) {
            // this.my_order_list = res.data.data;
            // console.log(data)
            data.forEach(item => {
              item.productionState = 1 * this.scaleNum;
            });
            this.my_order_list = data;
            this.$refs.loadmore.onTopLoaded();
          } else {
            console.log(res)
            this.$refs.loadmore.onTopLoaded();
            MessageBox('获取数据失败', '请检查你的网络状态', false);
          }
        })
        .catch(err => {
          console.log(err);
          this.$refs.loadmore.onTopLoaded();
          MessageBox('获取数据失败', '请检查你的网络状态', false);
        })
    },
    orderDetal(id) {
      console.log(id)
      this.$router.push({
        path: '/m/home/order_detal',
        query: {
          id
        }
      })
    },
    loadTop() {
      //  进度条比例33
      this.getUserOrder()
    }
  },

}
</script>
<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.mint-loadmore-spinner {
  width: px(20) !important;
  height: px(20) !important;
}
.mint-loadmore-top {
  padding-top: px(15) !important;
  // padding: px(30);
  margin-top: px(-30) !important;
  box-sizing: border-box;
}
.mint-loadmore-text {
  font-size: px(14) !important;
}
.mint-loadmore {
  height: 100%;
  overflow: scroll !important;
}
.mint-loadmore-content {
  height: 100%;
}
.my_order_wrap {
  margin-top: px(20);
  height: 100%;
  .rate_font {
    color: #000;
  }
  padding: px(15);
  padding-top: (0);
  background: rgba(242, 242, 242, 1);
  box-sizing: border-box;
  .my_order {
    background: #fff;
    margin-top: px(10);
    border-radius: px(5);
    padding: px(10);
    .rate_wrap {
      padding: px(20) px(30);
      margin-top: px(10);
      .rate_sild {
        position: relative;
        width: 83%;
        height: px(2);
        background: grey;
        margin: 0 auto;
        margin-bottom: px(10);
        .rate_sild_ok {
          position: absolute;
          // width: 33%;
          transition: all 1s;
          height: px(2);
          background: #0095fb;
        }
        .radio {
          transition: all 3s;
          position: absolute;
          width: px(8);
          height: px(8);
          border-radius: 50%;
          background: grey;
          top: px(-3);
          left: 0;
        }
        .radio_act {
          background: #0095fb !important;
          // font-size: #000;
        }
        .radio1 {
          left: 33%;
        }
        .radio2 {
          left: 66%;
        }
        .radio3 {
          left: 99%;
        }
      }
      .rate_des {
        display: flex;
        font-size: px(12);
        justify-content: space-between;
        color: grey;
      }
    }
    .title {
      font-size: px(14);
      padding-left: px(10);
      padding-bottom: px(10);
      border-bottom: 1px dotted grey;
      font-weight: 700;
    }
    .no_order {
      width: 100%;
      text-align: center;
      padding: px(10);
      font-size: px(18);
      height: px(300);
    }
    .order_wrap {
      border: 1px dotted grey;
      margin-top: px(20);
      .order_time {
        padding: px(10);
        font-size: px(12);
        span {
          margin-left: px(10);
        }
      }
      .order_id {
        font-size: px(12);
        border-bottom: 1px dotted grey;
        padding: px(10);
        display: flex;
        justify-content: space-between;
        span {
          margin-right: px(6);
        }
        i {
          font-size: px(12);
          box-sizing: border-box;
          // padding: 0 px(20);
          padding-left: px(20);
        }
      }
    }
  }
  .banner {
    width: 100%;
    height: px(190);
    // background: deepskyblue;
    background: url(../../assets/img/u219.png) center no-repeat;
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
        font-size: px(13);
        color: #fff;
        padding-bottom: px(6);
        padding-left: px(10);
      }
    }
  }
}
</style>


