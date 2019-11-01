<template>
  <div class="left_menu">
    <el-menu
      :unique-opened="true"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="select"
    >
      <!-- item1 -->
      <el-submenu v-for="(list, index) in l_menu" :key="index" :index="index+''">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{list.title}}</span>
        </template>
        <el-menu-item-group>
          <!-- <el-menu-item index="1-1">选项1</el-menu-item> -->
          <el-menu-item v-for="(item, i) in list.child" :key="i" :index="index + '-' + i">{{item}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'l_menu',
  props: {
    l_menu: {
      type: Array
    }
  },
  methods: {
    select(i) {
      this.$emit('listSelect', i);
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },

  }
}
</script>

<style scoped >
.el-menu {
  text-align: left;
  background: red;
  /* height: 100vh; */
  height: calc(100vh - 60px);
  box-sizing: border-box;
}
</style>