<template>
  <el-collapse-transition>
    <div class="searchLoad" v-show="showSearchLoad">
      <div class="row1">
        <p>创建人</p>
        <el-cascader v-model="peopleVal" :options="peopleOptions" @change="handleChange"></el-cascader>
      </div>

      <div class="searchList">
        <div class="searchItem searchRow">
          <p>选择开始时间:</p>
          <el-date-picker
            v-model="timeOption"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          ></el-date-picker>
        </div>
        <div class="searchItem">
          <p>产线编号:</p>
          <el-select v-model="productionVal" placeholder="选择产线">
            <el-option
              v-for="item in productionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="searchItem">
          <p>订单状态:</p>
          <el-select v-model="orderStat" placeholder="选择订单状态">
            <el-option
              v-for="item in orderStatOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>

      <!-- 查询确定 -->
      <div class="searchBtnFn" @click="searchBtnFn">查询</div>
    </div>
  </el-collapse-transition>
</template>

<script>
import '@/hotcss/hotcss'
export default {
  name: 'OrderAdminBox',
  props: {
    showSearchLoad: {
      type: Boolean,
    }
  },
  data() {
    return {
      // 创建人信息
      peopleVal: [],
      peopleOptions: [
        {
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],

      // 时间model
      timeOption: '',
      // 产线状态model
      orderStat: '',
      // 产线状态
      orderStatOptions: [
        {
          value: '选项1',
          label: '未生产'
        }, {
          value: '选项2',
          label: '开始生产'
        }, {
          value: '选项3',
          label: '下单'
        }, {
          value: '选项4',
          label: '巴拉'
        }],
      // 产线编号model
      productionVal: '',
      // 产线编号
      productionOptions: [
        {
          value: '选项1',
          label: '产线1'
        }, {
          value: '选项2',
          label: '产线2'
        }, {
          value: '选项3',
          label: '产线3'
        }, {
          value: '选项4',
          label: '产线4'
        }],
    }
  },
  methods: {
    clearSearchData() {
      this.startTime = ''
      this.peopleVal = ''
      this.orderStat = ''
      this.productionVal = ''
    },
    searchBtnFn() {
      const { startTime, peopleVal, orderStat, productionVal } = this;
      const searchObj = {
        startTime,
        peopleVal,
        orderStat,
        productionVal
      };
      this.$emit('closeSearchLoad', searchObj);
    },
    handleChange() {

    },
  },
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;

// 覆盖element样式
.el-picker-panel__footer {
  display: flex;
  justify-content: space-between;
  padding: 0 px(20);
  box-sizing: border-box;
  align-items: center;
}
.el-button--mini {
  font-size: px(14);
}
.el-input--small .el-input__inner {
  font-size: px(8);
}
.el-select {
  width: 6rem;
}
.el-select-dropdown__item {
  font-size: px(14);
  padding: 0 px(20);
  height: px(30);
  line-height: px(30);
}
.el-input__inner {
  font-size: px(12);
  padding: 0;
  text-align: center;
}
.el-date-editor .el-range-separator {
  line-height: px(20);
}
.el-date-editor .el-range-input,
.el-date-editor .el-range-separator {
  font-size: px(10);
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: px(120);
}
.el-input--prefix .el-input__inner {
  padding-left: px(30);
}
.el-input__inner {
  height: px(25);
  line-height: px(25);
  padding: 0 px(15);
}
.el-input {
  font-size: px(12);
}
.el-input__prefix {
  left: px(5);
}
.el-picker-panel__icon-btn {
  font-size: px(12);
  margin-top: 0;
}
.el-picker-panel {
  line-height: px(10);
  // width: px(120);
  // width: px(175);
  width: 12.5rem;
}
.el-input__icon {
  width: px(20);
  line-height: px(10);
}
.el-cascader {
  width: 100%;
}
.el-cascader__dropdown {
  margin: px(5) 0;
  font-size: px(14);
  border-radius: px(4);

  .el-cascader-panel {
    font-size: px(14);
    border-radius: px(4);
  }
  .el-cascader-menu {
    min-width: px(130);
  }
  .el-cascader-menu__wrap {
    height: px(150);
  }
  .el-cascader-node {
    padding: 0 px(30) 0 px(20);
    height: px(34);
    line-height: px(34);
  }
}

.searchLoad {
  height: px(380);
  background-color: rgba(0, 0, 0, 0.847058);
  .searchBtnFn {
    background: #3f91f7;
    color: #fff;
    font-size: px(12);
    text-align: center;
    width: px(80);
    height: px(30);
    line-height: px(30);
    margin: 0 auto;
    // margin-top: px(50);
    // margin-bottom: px(50);
    margin-top: px(100);
    border-radius: px(4);
  }
  .row1 {
    padding: px(0) px(20);
    p {
      padding: px(15) 0;
      font-size: px(12);
      font-weight: 700;
      color: #fff;
    }
  }

  .el-cascader {
    font-size: px(12);
    line-height: px(40);
    .el-input {
      font-size: px(14);
    }
    .el-input__inner {
      border: px(1) solid #fff;
      height: px(28);
      line-height: px(28);
      padding: 0 px(15);
    }
  }
  .searchList {
    display: flex;
    flex-wrap: wrap;
    padding: 0 px(20);
    .searchRow {
      .el-picker-panel {
        width: 12.5rem;
      }
      width: 100% !important;
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 100%;
      }
    }
    .searchItem {
      font-size: px(12);
      color: #fff;
      font-weight: 700;
      // width: 50%;
      width: 50%;
      p {
        padding: px(15) 0;
      }
    }
  }
}
</style>