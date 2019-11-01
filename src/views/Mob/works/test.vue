<template>
  <div class="OrderAdmin">
    <!-- 数据容器 可滚动-->
    <OrderAdminTable
      v-for="OrderItem in OrderAdminTableList"
      :key="OrderItem.orderId"
      :OrderAdminTable="OrderItem"
    />
  </div>
</template>

<script>
import Vue from 'vue';
import { List } from 'vant';

Vue.use(List);
import '@/hotcss/hotcss'
import OrderAdminTable from '@/views/Mob/components/OrderAdminTable'
export default {
  name: 'OrderAdmin',
  components: {
    OrderAdminTable,
  },
  data() {
    return {
      OrderAdminTableList: [
        {
          orderId: 'D2043',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
        {
          orderId: 'D20243',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
        {
          orderId: 'D12043',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
        {
          orderId: 'D204443',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
        {
          orderId: 'D3312043',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
        {
          orderId: 'D204133',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
        {
          orderId: 'D2231043',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
        {
          orderId: 'D2044523',
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        },
      ],

    }
  },
  methods: {

    loadMore() {
      this.loading = true;
      let num = 0;
      setTimeout(() => {
        this.OrderAdminTableList.push({
          orderId: num++,
          orderUser: '马麒麟',
          orderStatus: '未生产',
          orderTime: "2018-12-30 20:18:30",
          proId: "001"
        })
        this.loading = false;
      }, 2500);
    }




  }
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.OrderAdmin {
  width: 100%;
  border-radius: px(5);
  font-size: px(16);
  height: 100%;
  box-sizing: border-box;
  background: #fff;
  padding: px(10);
  .div {
    // height: 100%;
    height: px(300);
  }
}
</style>