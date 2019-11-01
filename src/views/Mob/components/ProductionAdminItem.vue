<template>
  <div class="productionItem">
    <div class="itemLeft">
      <i>{{proItem.index}}</i>
      <span>{{proItem.productionName}}</span>
    </div>

    <div class="itemRight">
      订单编号:
      <span>{{proItem.orderId}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductionAdminItem',
  props: {
    proItem: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.productionItem {
  display: flex;
  padding-top: px(20);
  border-bottom: px(1) solid #ccc;
  justify-content: space-between;
  align-items: center;
  font-size: px(12);
  .itemLeft {
    span {
      margin-left: px(10);
      font-weight: 700;
      color: #000;
    }
  }
}
</style>