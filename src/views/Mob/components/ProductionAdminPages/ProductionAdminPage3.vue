<template>
  <div class="productionAdminPage1">
    <div class="contentImg">
          <img src="@/assets/img/production_img.png" alt="产线可视化" />
        </div>
        <div class="contentWrap">
          <h1>产线管理3</h1>
          <div class="productionList">
            <ProductionAdminItem
              v-for="proItem in productionList"
              :key="proItem.orderId"
              :proItem="proItem"
            />
          </div>
        </div>
  </div>
</template>

<script>
import ProductionAdminItem from '@/views/Mob/components/ProductionAdminItem'
export default {
  name: 'ProductionAdminPage1',
   components: {
    ProductionAdminItem
  },
  data() {
    return {
        // 产线管理列表
      productionList: [
        {
          index: 1,
          productionName: '备料区',
          orderId: '0034'
        },
        {
          index: 2,
          productionName: '上料盒',
          orderId: '0635'
        },
        {
          index: 3,
          productionName: '投料',
          orderId: '0514'
        },
        {
          index: 4,
          productionName: '视觉检测',
          orderId: '6954'
        },
        {
          index: 5,
          productionName: '异常处理',
          orderId: '0369'
        },
        {
          index: 6,
          productionName: '分类码垛',
          orderId: '5741'
        },
      ]
    }
  }
}
</script>

// <style lang="scss" scope>
//   @import "@/hotcss/px2rem";
// $designWidth: 375;

// .productionAdminPage1 {
//   .contentImg {
//     background: #fff;
//     text-align: center;
//     border-radius: px(4);
//     padding-top: px(70);
//     padding-bottom: px(10);
//     overflow: hidden;
//     img {
//       width: px(337);
//       height: px(236);
//     }
//   }
//   .contentWrap {
//     width: 100%;
//     margin-top: px(10);
//     background: #fff;
//     height: px(225);
//     overflow: scroll;
//     h1 {
//       font-size: px(12);
//       font-weight: 700;
//       color: gray;
//       padding: px(10);
//       border-bottom: px(1) solid #ccc;
//     }
//     .productionList {
//       padding: 0 px(20);
//     }
//   }
// }
// </style>