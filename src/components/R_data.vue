<template>
  <div class="r-body">
    <h2>{{data.title}}</h2>
    <inputWrap/>
    <!-- 表格区域 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import inputWrap from '../components/Input_wrap'
export default {
  name: 'r-body',
  props: {
    data: {
      type: Object
    }
  },
  components: {
    inputWrap
  },
  data() {
    return {
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

}
</script>

<style lang="scss" scope>
.r-body {
  background: #fff;
  box-sizing: border-box;
  padding-top: 20px;
}
</style>