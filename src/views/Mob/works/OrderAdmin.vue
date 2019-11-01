<template>
  <div class="OrderAdmin">
    <!-- 标题 -->
    <div class="orderTitle">
      订单管理
      <i class="el-icon-s-operation" @click="showSearchLoadFn"></i>
    </div>

    <!-- 搜索框 -->
    <OrderAdminSerBox
      :showSearchLoad="showSearchLoad"
      ref="OrderAdminSerBoxRef"
      @closeSearchLoad="closeSearchLoad"
    />
    <!-- <div class="searchWrap">
      订单号
      <span>/</span>创建人
      <span>/</span>创建时间
      <span>/</span>产线编号
      <span>/</span>订单状态
    </div>-->
    <!-- 数据容器 可滚动-->
    <div class="orderListWrap" @click="closeSearchLoad">
      <OrderAdminTable
        v-for="OrderItem in OrderAdminTableList"
        :key="OrderItem.orderId"
        :OrderAdminTable="OrderItem"
      />
    </div>
  </div>
</template>

<script>
import '@/hotcss/hotcss'
import OrderAdminTable from '@/views/Mob/components/OrderAdminTable'
import OrderAdminSerBox from '@/views/Mob/components/OrderAdminSerBox'
export default {
  name: 'OrderAdmin',
  components: {
    OrderAdminTable,
    OrderAdminSerBox,
  },
  data() {
    return {
      // 筛选弹窗
      showSearchLoad: false,
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
  created() {
    this.$store.dispatch("setTabState", 1);
  },
  methods: {
    showSearchLoadFn() {
      this.showSearchLoad = !this.showSearchLoad;
      if (this.showSearchLoad == false) {

        this.closeSearchLoad();
      }
    },
    closeSearchLoad(data) {
      this.showSearchLoad = false;
      this.$refs.OrderAdminSerBoxRef.clearSearchData();
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.divv {
  height: 70%;
  overflow: scroll;
}
.OrderAdmin {
  width: 100%;
  border-radius: px(5);
  font-size: px(16);
  height: 100%;
  box-sizing: border-box;
  background: #fff;
  padding: px(10);
  padding-top: 0;
  overflow: hidden;
  // overflow: scroll;
  display: flex;
  flex-direction: column;
  .orderListWrap {
    flex: 1;
    overflow: scroll;
  }
  .orderTitle {
    text-align: center;
    font-size: px(13);
    font-weight: 700;
    padding: px(7) 0;
    position: relative;
    i {
      position: absolute;
      display: inline-block;
      box-sizing: border-box;
      font-size: px(18);
      padding: px(5);
      top: px(0);

      right: 0;
    }
  }

  .searchWrap {
    border-radius: px(4);
    text-align: left;
    margin-bottom: px(7);
    font-size: px(12);
    border: 1px solid rgba(204, 204, 204, 1);
    padding: px(5);
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, 0.247);
    span {
      display: block;
      padding: 0 px(3);
    }
  }
}
</style>