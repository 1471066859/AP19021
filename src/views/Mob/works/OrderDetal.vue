<template>
  <div class="orderDetal">
    <!-- 头部订单详情 -->
    <div class="order_id">
      <div class="id">
        订单号:
        <span>{{orderId}}</span>
      </div>
      <div class="time">
        <span>{{order_detal.orderTime}}</span>
      </div>
    </div>
    <div class="production_order_list">
      <i class="orderitemsild orderitemsild1"></i>
      <i class="orderitemsild orderitemsild2"></i>
      <i class="orderitemsild orderitemsild3"></i>
      <div class="orderInfo">
        <div class="orderInfoItem item">
          创建人:
          <span>马麒麟</span>
        </div>
        <div class="orderInfoItem item">
          创建人:
          <span>马麒麟</span>
        </div>
        <div class="orderInfoItem item">
          创建人:
          <span>马麒麟</span>
        </div>
        <div class="orderInfoItem item">
          创建人:
          <span>马麒麟</span>
        </div>
      </div>
      <div class="item_wrap">
        <div class="item" v-for="(item, index) in order_detal.order_list" :key="index">
          <span>{{item.stuffName}}</span>
          <i class="el-icon-minus"></i>
          <span>{{item.packageName}}</span>
          <span>{{item.packageNum}}</span>
        </div>
      </div>
    </div>

    <!-- rate -->
    <div class="production_rate">
      <div class="title">订单进度</div>
      <div class="rate_tab">
        <div class="rate_wrap">
          <div class="sild">
            <div class="sild_ok" :style="{'height': rate+ '%'}"></div>
          </div>
        </div>

        <!-- 右侧描述item -->
        <div class="rate_list">
          <div class="item" v-for="(item, index) in rate_list" :key="index">
            <i :class="{'icon_act': rate == index * scaleNum}">{{index+1}}</i>
            <i v-if="rate > index * scaleNum" class="el-icon-check"></i>
            <div class="des" :class="{'detal_rate':rate == index * scaleNum }">{{item.name}}</div>
            <div class="time" v-if="order_detal.status_des[index]">
              <span>{{order_detal.status_des[index].orderMachineTime}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import { scaleNum } from '@/Tools/intScaleNum'
export default {
  name: 'OrderDetal',
  data() {
    return {
      rate_list: [
        {
          name: '下单时间'
        },
        {
          name: '备料中'
        },
        {
          name: '投料'
        },
        {
          name: '检测'
        },
        {
          name: '堆垛'
        },
        {
          name: '订单完成'
        },
        {
          name: '物流配送'
        }
      ],
      order_detal: {
        orderTime: '2018-12-20 12:30:30',
        order_list: [
          {
            stuffName: '商品1',
            packageName: 'A类',
            packageNum: 1
          },
          {
            stuffName: '商品2',
            packageName: 'A类',
            packageNum: 2
          },
          {
            stuffName: '商品3',
            packageName: 'B类',
            packageNum: 3
          }
        ],
        status_des: [
          {
            rate: 0,
            orderMachineTime: '2018-12-30 12:30:20'
          },
          {
            rate: 16,
            orderMachineTime: '2018-11-32 16:50:21'
          },
          {
            rate: 32,
            orderMachineTime: '2018-12-12 16:50:21'
          },
          {
            rate: 48,
            orderMachineTime: '2018-12-12 16:50:21'
          }
        ]
      }
    }
  },
  computed: {
    // 订单id
    orderId() {
      const { id } = this.$route.query
      console.log(id)
      return id;
    },
    // 
    rate() {
      const { status_des } = this.order_detal
      let { rate } = status_des[status_des.length - 1]
      return rate
    },
    // 进度比例
    scaleNum() {
      // const { rate_list } = this;
      // // console.log(rate_list)
      // const scaleNum = 1 / (rate_list.length - 1);
      // // console.log(scaleNum * 100)
      // const intScaleNum = Math.floor(scaleNum * 100)
      // console.log(intScaleNum, 'scaleNum');
      // return intScaleNum;
      return scaleNum(this.rate_list);
    },

  },
  methods: {
    getOrderDetal() {
      console.log(this.orderId)
      const orderUud = this.orderId;
      const data = qs.stringify({
        orderUud,
      })
      this.axios.post('api/webapi/orders/getOrdersByUserUuid', data)
        .then(res => {
          const { success, msg } = res;
          if (success) {
            this.order_detal = res.data.orderDetal
          } else {
            MessageBox('获取数据失败', '请检查你的网络状态', false);
          }
        })
        .catch(err => {
          MessageBox('获取数据失败', '请检查你的网络状态', false);
        })
    }
  },
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.detal_rate {
  color: #000;
}
.orderDetal {
  width: 100%;
  border-radius: px(5);
  font-size: px(16);
  height: 100%;
  box-sizing: border-box;
  .production_rate {
    background: #fff;
    margin-top: px(10);
    overflow: scroll;
    height: calc(100% - 6.6666666rem);
    .el-icon-check {
      color: #0095fb;
      border: 1px solid #0095fb !important;
      border-radius: 50%;
    }
    .title {
      font-size: px(12);
      padding: px(10);
      border-bottom: 1px solid #ccc;
      font-weight: 700;
    }
    .rate_tab {
      position: relative;
      width: 100%;
      // height: px(370);
      .rate_list {
        // width:
        padding-left: px(60);
        .item {
          .icon_act {
            color: #fff;
            background: #0095fb;
          }
          i {
            position: absolute;
            width: px(16);
            height: px(16);
            left: px(-48);
            z-index: 99;
            background: #fff;
            top: px(18);
            text-align: center;
            border-radius: 50%;
            border: 1px solid #ccc;
          }
          position: relative;
          display: flex;
          justify-content: space-between;
          font-size: px(14);
          color: #ccc;
          padding: px(15) 0;
          span {
            margin-right: px(10);
          }
        }
      }
    }
    .rate_wrap {
      width: px(20);
      height: px(300);
      // border: 1px solid red;
      position: absolute;
      left: px(10);
      top: px(24);
      .sild {
        position: absolute;
        width: 2px;
        background: grey;
        left: 50%;
        height: 100%;
        .sild_ok {
          position: absolute;
          width: 100%;
          height: 50%;
          background: #0095fb;
        }
      }
    }
  }
  .order_id {
    background: #fff;
    display: flex;
    justify-content: space-between;
    padding: px(10);
    border-radius: px(5);
    align-items: center;
    border-bottom: 1px solid grey;
    .id {
      display: flex;
      align-items: center;
    }
    span {
      margin-left: px(10);
      font-size: px(12);
      max-width: px(120);
      display: inline-block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .id {
      font-weight: 700;
      font-size: px(14);
    }
  }
  .production_order_list {
    position: relative;
    background: #fff;
    display: flex;
    padding: 0 px(10);
    .orderitemsild {
      height: 1px;
      background: grey;
      position: absolute;
      width: 100%;
    }
    .orderitemsild1 {
      top: px(26);
    }
    .orderitemsild2 {
      top: px(52);
    }
    .orderitemsild3 {
      top: px(80);
    }
    justify-content: space-between;
    .orderInfo {
      flex: 1;
      .orderInfoItem {
        justify-content: flex-start;
        // padding-left: px(10);
      }
    }
    .item_wrap {
      flex: 1;
    }
    .item {
      i {
        padding: 0 px(10);
        box-sizing: border-box;
      }
      padding: px(5) 0;
      // border-top: 1px solid grey;
      display: flex;
      align-items: center;
      font-size: px(12);
      justify-content: flex-end;
      span {
        margin-left: px(5);
        // color: rgb(0, 0, 0.3)
        color: grey;
      }
    }
  }
}
</style>