<template>
  <div class="Production">
    <mt-swipe :auto="0" @change="handleChange" :show-indicators="false">
      <mt-swipe-item>
        <ProductionAdminPage1 />
      </mt-swipe-item>

      <mt-swipe-item>
        <ProductionAdminPage2 />
      </mt-swipe-item>

      <mt-swipe-item>
        <ProductionAdminPage3 />
      </mt-swipe-item>

      <mt-swipe-item>
        <ProductionAdminPage4 />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import ProductionAdminPage1 from '@/views/Mob/components/ProductionAdminPages/ProductionAdminPage1'
import ProductionAdminPage2 from '@/views/Mob/components/ProductionAdminPages/ProductionAdminPage2'
import ProductionAdminPage3 from '@/views/Mob/components/ProductionAdminPages/ProductionAdminPage3'
import ProductionAdminPage4 from '@/views/Mob/components/ProductionAdminPages/ProductionAdminPage4'
import '@/hotcss/hotcss'
export default {
  name: 'Production',
  components: {
    ProductionAdminPage1,
    ProductionAdminPage2,
    ProductionAdminPage3,
    ProductionAdminPage4,
  },
  data() {
    return {

    }
  },
  created() {
    this.$store.dispatch("setTabState", 0);
  },
  methods: {
    handleChange(index) {
      // console.log(index+1);
      const i = index + 1
      // console.log(this.$route)
      switch (i) {
        case 1:
          this.$store.dispatch("setMobHdMsg", '产线1');
          break;
        case 2:
          this.$store.dispatch("setMobHdMsg", '产线2');
          break;
        case 3:
          this.$store.dispatch("setMobHdMsg", '产线3');
          break;
        case 4:
          this.$store.dispatch("setMobHdMsg", '产线4');
          break;


        default:
          break;
      }
      // this.$store.dispatch("setUser", decode);

    }
  },
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.Production {
  width: 100%;
  border-radius: px(5);
  font-size: px(16);
  height: 100%;
  box-sizing: border-box;
}
</style>