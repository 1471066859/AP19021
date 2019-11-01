<template>
  <div class="sel-time">
    <!-- 时间线 -->
    <div class="block">
      <span class="demonstration" v-for="(item, index) in des_item" :key="index">{{item}}</span>:
      <el-date-picker
        v-model="value"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    sel_des: {
      type: String
    }
  },
  created() {
  },
  computed: {
    des_item() {
      return this.sel_des.split(',');
      
    }
  },
  data() {
    return {
      value: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },

    }
  }
}
</script>

<style lang="scss" scope>
.sel-time {
  // width: 250px;
  .el-input__inner {
     width: 250px;
   }
  .demonstration {
    margin-left: 8px;
  display: inline-block;
}
}
</style>