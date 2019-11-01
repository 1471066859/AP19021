<template>
  <div class="page">
    <!-- 左侧导航 -->
    <l-menu @listSelect="listSelect" :l_menu="l_menu"></l-menu>
    <div class="right_body">
      <!-- 头部 -->
      <div class="header">
        <div class="user_menu" @click="logoutFuc" style="font-size:16px">退出登录</div>
        <div class="user_pic"></div>
      </div>
      <div class="tab_wrap">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in breadcrumb_list" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 右侧展示内容 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>

import l_menu from '@/components/L_menu'

export default {
  components: {
    'l-menu': l_menu,
  },
  beforeRouteEnter(to, from, next) {
    let userInfo = sessionStorage.getItem("userInfo");
    console.log(from)
    if (userInfo) {
      next();
    } else {
      next(vm => {
        vm.$router.push('/login')
      })
    }
  },
  created() {
  },
  data() {
    return {
      data: {
        title: '全部订单列表',
      },
      l_menu: [
        {
          title: '订单管理系统',
          child: [
            '全部订单',
            '正在生产订单类别',
            '已经完成订单列表',
            "异常处理订单列表"
          ]
        },
        {
          title: '生产管理系统',
          child: [
            '产线管理',
          ]
        },
        {
          title: '仓储管理系统',
          child: [
            '原材料出入库管理',
            "成品出入库管理"
          ]
        },
        {
          title: '设备管理系统',
          child: [
            '设备列表',
            '设备故障列表',
            '设备维修列表'
          ]
        },
        {
          title: '质量管理系统',
          child: [
            '原材料质量管理',
            '异常处理订单列表'
          ]
        },
        {
          title: '人员管理系统',
          child: [
            '工厂人员列表',
            '排班表'
          ]
        },
        {
          title: '报表系统',
          child: [
            '生产报表',
            '原料报表'
          ]
        },
        {
          title: '后台管理',
          child: [
            '账户信息'
          ]
        }
      ],
      breadcrumb_list: [
        "订单管理系统",
        "全部订单列表"
      ],
    }
  },
  computed: {

  },
  methods: {
    logoutFuc() {
      console.log(1)
      // this.$store.dispatch("setIsLogin", false);
      sessionStorage.removeItem("userInfo")
      // console.log(this.$store.getters.getIsLogin)
      this.$router.push('/login')
      this.$message.success('退出成功');

    },

    listSelect(i) {
      if (this.$route.path == '/page/data' + i) return;
      // console.log(this.nav_title)
      let arr = i.split('-');
      let newArr = []
      arr.forEach(item => {
        newArr.push(parseInt(item));
      });
      // console.log(this.breadcrumb_list)
      this.breadcrumb_list[0] = this.l_menu[newArr[0]].title;
      this.breadcrumb_list[1] = this.l_menu[newArr[0]].child[newArr[1]]
      this.title = this.breadcrumb_list[1];
      // console.log(this.title)
      this.$router.push({
        path: '/page/data' + i,
        query: {
          title: this.title
        }
      });
    }
  }
}
</script>

<style lang="scss" scope>
.page {
  display: flex;
  justify-content: space-between;
  .header {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding-right: 30px;
    .user_pic {
      width: 30px;
      height: 30px;
      margin-right: 20px;
      border-radius: 50%;
      background-color: chocolate;
      opacity: 0.7;
    }
    .user_menu {
      cursor: pointer;
    }
  }
  .left_menu {
    padding-top: 60px;
    background: #fff;
  }

  .left_menu {
    // flex: 1;
    // width: 400px;
    width: 200px;
  }
  .right_body {
    // padding: 0 10px;
    background-color: #f2f2f2;
    flex: 1;
    // border-radius: 2px solid red;
    box-sizing: border-box;
    // height: calc(100vh - 60px);
    height: 100vh;
    h2 {
      text-align: left;
      padding-left: 20px;
      // margin-top: 30px;
    }
    .tab_wrap {
      padding: 0 10px;
      //  nav sel框样式
      .el-input__inner {
        height: 30px;
        line-height: 30px;
        // padding: 5px 10px !important;
      }
      .el-input__icon {
        line-height: 30px !important;
      }
      .el-button {
        line-height: 0.2;
      }
    }
    .header {
      height: 60px;
      background-color: #fff;
      line-height: 40px;
      font-size: 18px;
    }
    .el-breadcrumb {
      box-sizing: border-box;
      padding: 5px 20px;
      border-radius: 3px;
      margin-top: 10px;
      background: #fff;
      margin-bottom: 10px;
    }
  }
}
</style>