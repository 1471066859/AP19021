<template>
  <div class="table">
    <!-- 表格区域 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="id" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="date" label="时间" width="180"></el-table-column>
      <el-table-column prop="name" label="下单人员" width="180"></el-table-column>
      <el-table-column prop="num" label="生产线编号"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="des" label="查看详情"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type:Array
    }
  },
  computed: {

  },
  data() {
    return {

      
    }
  },
}
</script>