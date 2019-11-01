<template>
  <div class="r-body">
    <h2>{{title}}</h2>
    <div class="data_selects">
      <!-- 文本选择器 -->
      <sel-input-wrap sel_des="订,单,编,号" />
      <sel-time sel_des="时,间" />
      <!-- btns -->
      <data-nav-btns />
    </div>
    <!-- 表格区域 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="index" label="序号" width="180"></el-table-column>
      <el-table-column prop="id" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="time" label="时间" width="180"></el-table-column>
      <el-table-column prop="zldes" label="质量问题描述" width="180"></el-table-column>
      <el-table-column prop="name" label="操作人员" width="180"></el-table-column>
      <el-table-column prop="bz" label="备注" width="180"></el-table-column>
      <el-table-column prop="des" label="查看详情">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
          <!-- <i class="icon" :style="{'background':iconBg(scope.row)}"></i> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页起 -->
    <div class="block" style="padding:30px 40px ">
      <el-pagination
        @size-change="handleSizeChange"
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import SelTime from '@/components/SelTime'
import SelInputWrap from '@/components/SelInputWrap'
import DataNavBtns from '@/components/DataNavBtns'
import TabNav from '@/components/TabNav'
import Table from '@/components/Table'
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
    'data-nav-btns': DataNavBtns,
    // 表格
    Table
  },
  data() {
    return {
      currentPage: 1,
      tableData: [
        {
          id: '001',
          time: '2019-10-20 08:20:30',
          zldes: "XXXXXXXXXXX",
          name: "XXXX",
          bz: "XXXXXXXXX"
        },
        {
          id: '001',
          time: '2019-10-20 08:20:30',
          zldes: "XXXXXXXXXXX",
          name: "XXXX",
          bz: "XXXXXXXXX"
        },
        {
          id: '001',
          time: '2019-10-20 08:20:30',
          zldes: "XXXXXXXXXXX",
          name: "XXXX",
          bz: "XXXXXXXXX"
        },
        {
          id: '001',
          time: '2019-10-20 08:20:30',
          zldes: "XXXXXXXXXXX",
          name: "XXXX",
          bz: "XXXXXXXXX"
        },
        {
          id: '001',
          time: '2019-10-20 08:20:30',
          zldes: "XXXXXXXXXXX",
          name: "XXXX",
          bz: "XXXXXXXXX"
        },
        {
          id: '001',
          time: '2019-10-20 08:20:30',
          zldes: "XXXXXXXXXXX",
          name: "XXXX",
          bz: "XXXXXXXXX"
        },
        {
          id: '001',
          time: '2019-10-20 08:20:30',
          zldes: "XXXXXXXXXXX",
          name: "XXXX",
          bz: "XXXXXXXXX"
        },
        {
          id: '001',
          time: '2019-10-20 08:20:30',
          zldes: "XXXXXXXXXXX",
          name: "XXXX",
          bz: "XXXXXXXXX"
        },
        {
          id: '001',
          time: '2019-10-20 08:20:30',
          zldes: "XXXXXXXXXXX",
          name: "XXXX",
          bz: "XXXXXXXXX"
        },
        {
          id: '001',
          time: '2019-10-20 08:20:30',
          zldes: "XXXXXXXXXXX",
          name: "XXXX",
          bz: "XXXXXXXXX"
        }
      ]
    }
  },
  computed: {
    title() {
      return this.$route.query.title
    }
  },
  created() {
    this.addTabIndex();
  },
  methods: {
    iconBg(key) {
      // return 'red'
      switch (key.status) {
        case 0:
          return 'gray'
          break;
        case 1:
          return 'red'
          break;
        case 2:
          return 'blue'
          break;
        case 3:
          return 'green'
          break;

        default:
          break;
      }
    },
    // 分页器相关
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClick(row) {
      console.log(row)
    },
    // 添加序号索引
    addTabIndex() {
      this.tableData.forEach((item, index) => {
        item.index = ++index;
      });
    }
  }
}
</script>