<template>
  <div class="tab-nav">
    <!-- 数据展示头部标签 -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="first_nav_des" name="first">{{first_nav_des}}</el-tab-pane>
      <el-tab-pane :label="second_nav_des" name="second">{{second_nav_des}}</el-tab-pane>
      <el-tab-pane :label="third_nav_des" name="third">{{third_nav_des}}</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    first_nav_des: {
      type: String
    },
    second_nav_des: {
      type: String
    },
    third_nav_des: {
      type: String
    },
  },
  data() {
    return {
      // 标签页
      activeName: 'second',


    }
  },
  methods: {
    // 标签页
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }

}
</script>