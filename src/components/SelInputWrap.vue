<template>
  <!-- 可搜索非时间类型输入框 -->
  <div class="sel_wrap">
    <span v-for="(item, index) in des_item" :key="index">{{item}}</span>:
    <el-select v-model="value" filterable placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    sel_des: {
      type: String
    }
  },
  computed: {
    des_item() {
      return this.sel_des.split(',')
    }
  },
  created() {
  },
  data() {
    return {
      // 生产编号 => 可搜索
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
    }
  }
}
</script>

<style lang="scss" scope>
.sel_wrap {
  // width: 250px;
  .el-input__inner {
    width: 250px;
  }
  span {
    display: inline-block;
    margin-left: 8px;
  }
}
</style>