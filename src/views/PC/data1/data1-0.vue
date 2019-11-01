<template>
  <div class="r-body">
    <h2>{{title}}</h2>
    <div class="data_selects">
      <el-tabs v-model="first_tab" @tab-click="handleClick">
        <el-tab-pane label="产线001" name="first">
          <div class="tab_item_wrap">
            this is 001
          </div>
        </el-tab-pane>
        <el-tab-pane label="产线002" name="second">
          <div class="tab_item_wrap">
            this is 002
          </div>
        </el-tab-pane>
        <el-tab-pane label="产线003" name="third">
          <div class="tab_item_wrap">
            this is 003
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import SelTime from '@/components/SelTime'
import SelInputWrap from '@/components/SelInputWrap'
import DataNavBtns from '@/components/DataNavBtns'
import TabNav from '@/components/TabNav'
export default {
  name: 'r-body',

  components: {
    // 时间选择器
    'sel-time': SelTime,
    // 文本选择器
    'sel-input-wrap': SelInputWrap,
    // 表格nav标签
    'tab-nav': TabNav,
    // 表格nav按钮
    'data-nav-btns': DataNavBtns
  },
  data() {
    return {
      first_tab: 'first'
    }
  },
  methods: {
    // 标签页
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  },
  computed: {
    title() {
      return this.$route.query.title
    }
  },

}
</script>

<style lang="scss" scope>
.r-body {
  background: #fff;
  box-sizing: border-box;
  padding-top: 20px;
  .tab_item_wrap {
    width: 100%;
    height: 500px;
    background: #fff;
    font-size: 25px;
  }
}
</style>