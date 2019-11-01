<template>
  <div class="r-body">
    <h2>{{title}}</h2>
    <div class="raw_system">
      <el-tabs v-model="first_tab" @tab-click="handleClick">
        <el-tab-pane label="日报表" name="0">
          <div class="tab_item_wrap">日报表</div>
        </el-tab-pane>
        <el-tab-pane label="周报表" name="1">
          <div class="tab_item_wrap">周报表</div>
        </el-tab-pane>
        <el-tab-pane label="月报表" name="2">
          <div class="tab_item_wrap">月报表</div>
        </el-tab-pane>
        <el-tab-pane label="年报表" name="3">
          <div class="tab_item_wrap">年报表</div>
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
      first_tab: "0",
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  computed: {
    title() {
      return this.$route.query.title
    }
  },
  methods: {
    handleClick(tab, event) {
      
    }
  },

}
</script>

<style lang="scss" scope>
.r-body {
  background: #fff;
  box-sizing: border-box;
  padding-top: 20px;
}
</style>