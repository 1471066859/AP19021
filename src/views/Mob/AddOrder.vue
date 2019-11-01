<template>
  <div class="add_order">
    <!-- <div class="blak" @click="isShow  = false" v-show="isShow"></div> -->
    <div class="blak" @click="closeSelOrder" v-show="show_box"></div>
    <!-- 下单 -->
    <div class="post_order">
      <div class="title">创建订单</div>
      <div class="shop_wrap">
        <div
          class="item"
          @click="showSelBoxFn(item)"
          v-for="(item, index) in shop_list"
          :key="index"
        >
          <div class="item_img"></div>
          <div class="item_des">{{item.stuffName}}</div>
        </div>
        <!-- 弹窗 -->
        <transition name="el-zoom-in-bottom">
          <div class="add_order_box" v-show="show_box">
            <div class="order_img">
              <div class="pic"></div>
              <p>{{shop_name}}</p>
            </div>
            <div class="right">
              <i @click="closeSelOrder" class="el-icon-close"></i>
              <mt-radio v-model="value" :options="options"></mt-radio>
              <div class="count">
                <span class="sub" @click="subCountFn">-</span>
                <span class="span_count">{{count_num}}</span>
                <span class="add" @click="addCountFn">+</span>
              </div>
              <div
                :class="{'btn_disable': count_num == 0}"
                class="sel_order_btn"
                @click="showBoxSelFn"
              >确认</div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <!-- 购物车 -->
    <div class="shop_cart">
      <div class="title">购物车</div>
      <div class="cart_list">
        <p v-if="cart_list.length == 0">购物车空空如也~</p>
        <div class="item" v-for="(item, index) in cart_list" :key="index">
          <i class="el-icon-delete" @click="removeOrderFn(index)"></i>
          <div class="item_des">
            <div class="shop_des">
              {{item.stuffName}}-{{item.pack.packName}}
              <span>x {{item.packNum}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="btn_wrap">
        <button
          class="btn_disable"
          :class="{'cart_btn':cart_list.length > 0}"
          @click="orderPostFn"
        >下单</button>
      </div>
    </div>
    <!-- <mt-picker
      :showToolbar="true"
      :itemHeight="108"
      v-show="isShow"
      :slots="slots"
      @change="onValuesChange"
    >
      <div name="slot" class="picker_btns">
        <div class="btn_left" @click="closeSelOrder">取消</div>
        <div class="btn_right" @click="showBoxSelFn">确定</div>
      </div>
    </mt-picker>-->
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import qs from 'qs';
export default {
  name: 'add_order',
  watch: {
    value(val) {
      if (val == this.options[0]) {
        this.packUuid = this.dataPackList[0].packUuid;
      }
      if (val == this.options[1]) {
        this.packUuid = this.dataPackList[1].packUuid;
      }
      this.count_num = 0;
    },
    // options(val) {
    //   this.value = this.options[0];
    // }
  },
  data() {
    return {
      // 商品规格
      dataPackList: [],
      // 商品包装类型
      options: [

      ],
      // isShow: false,
      // 选择数量
      count_num: 0,
      // 商品名
      shop_name: '',
      // 包装大小盒
      value: '',
      // 商品大小盒唯一标识
      packUuid: '',
      // 商品名唯一标识
      stuffUuid: '',
      show_box: false,
      // 符合条件的购物车列表
      cart_list: [
      ]
      ,
      // 商品信息
      shop_list: [

      ],
      // slots: [
      //   {
      //     flex: 1,
      //     values: ['A类', 'B类'],
      //     className: 'slot1',
      //     textAlign: 'right'
      //   }, {
      //     divider: true,
      //     content: '-',
      //     className: 'slot2'
      //   }, {
      //     flex: 2,
      //     values: [1, 2],
      //     className: 'slot3',
      //     textAlign: 'left'
      //   }
      // ],
    }
  },
  created() {
    // 请求商品信息
    this.getShopNameFn();
    // 请求商品规格信息
    this.getShopPackFn()
  },
  methods: {
    // 底部下单弹窗监听数据
    // onValuesChange(picker, values) {
    //   this.value = values[0];
    //   this.count_num = values[1];
    //   // console.log(this.value, this.count_num)
    //   if (values[0] == 'A类') {
    //     picker.setSlotValues(1, [1, 2])
    //   }
    //   if (values[0] == 'B类') {
    //     picker.setSlotValues(1, [1, 2, 3, 4])

    //   }
    // },
    // 请求商品信息
    getShopNameFn() {
      this.axios.get('api/webapi/orders/getAllStuff')
        .then(res => {
          // console.log(res);
          const { status, data } = res;
          if (status == 200) {
            this.shop_list = data;
          }
        })
        .catch(err => {
          console.log(err)
        })
      // const data = [
      //   {
      //     name: '瓜子',
      //     stuffUuid: 'cffd8c04aac443bcb40c224321cc12df'
      //   },
      //   {
      //     name: '花生',
      //     stuffUuid: 'fc28fc5da3a448eca4a4d534d62b0d93'
      //   },
      //   {
      //     name: '大豆',
      //     stuffUuid: '73e37510a3b24de499e81608fd72b19a'
      //   },
      //   {
      //     name: '商品4',
      //     stuffUuid: '未知商品ID'
      //   }
      // ];

    },
    // 请求规格信息
    getShopPackFn(key) {
      if (this.dataPackList.length == 0) {
        this.axios.get('api/webapi/orders/getAllPack')
          .then(res => {
            const { status, data } = res;
            let dataItem = data.splice(0, 1);
            data.push(dataItem[0]);
            if (status == 200) {
              this.dataPackList = data;
              this.getShopPackFnReady = true;
              if (this.options.length == 0 && this.dataPackList.length > 0) {
                this.dataPackList.forEach(item => {
                  this.options.push(item.packName);
                  this.value = this.options[0];
                });
              }
              // if (key >= 0 && this.dataPackList.length > 0) {
              //   return this.dataPackList[key].packUuid;
              // };
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
      // const data = [
      //   {
      //     name: '大盒',
      //     id: 'AAAAAAAA'
      //   },
      //   {
      //     name: '小盒',
      //     id: 'BBBBB'
      //   },
      // ];

    },
    // 删除订单
    removeOrderFn(i) {
      MessageBox.confirm('确定要删除此订单吗?').then(action => {
        this.cart_list.splice(i, 1);
      }).catch(err => {
        return;
      });
    },
    // 确定下单POST数据
    orderPostFn() {
      let ISOK = null;
      let { cart_list } = this;
      cart_list.length > 0 ? ISOK = true : ISOK = false;
      if (ISOK) {
        console.log(cart_list)
        this.PostDataFn(cart_list)
      }
    },
    PostDataFn(cart_list) {
      // let data = {
      //   stuffs: cart_list
      // }
      // let newData = JSON.stringify(data);
      // let newData = qs.stringify(data);
      // let newData = qs.stringify(cart_list);
      let data = JSON.stringify(this.cart_list)
      console.log(data, 'data!!!');
      this.axios.post('api/webapi/orders/addOrder', { 'stuffs': data }, {
        // headers: {
        //   'content-type': 'application/x-www-form-urlencoded'
        // }
      })
        // console.log(cart_list,'cart_list')
        // this.axios.post('api/webapi/orders/addOrder', { 'stuffs': newData })
        .then(res => {
          const { success, msg } = res.data;
          if (success) {
            MessageBox('下单成功', '您可以在我的订单中查询订单状态', false);
            this.cart_list = [];
          } else {
            MessageBox('下单未成功', '请检查你的网络状态', false);
          }
        })
        .catch(err => {
          console.log(err);
          MessageBox('下单未成功', '请检查你的网络状态', false);
        })

      // this.axios({
      //   url: 'api/webapi/orders/addOrder',
      //   methods: 'post',
      //   data: newdata
      // })
      //   .then((response) => {
      //     // 因为层级比较深，匿名函数会导致this指向发生改变
      //     // 这个时候使用箭头函数解决
      //     console.log(response)
      //     // alert(this);
      //     // this.dataList = response.data.data.forecast;
      //   })
      //   .catch(function () {
      //     alert('网络超时, 请重新加载!')
      //   });

    },
    // 增加商品数量
    addCountFn() {
      if (this.value == '') {
        MessageBox('错误', '请先选择商品规格', false)
        return
      }
      if (this.value == this.options[0] && this.count_num < 1) {
        this.count_num++;
        return
      } else if (this.value == this.options[0] && this.count_num == 1) {
        MessageBox('错误', '超出单个商品规格', false)
        return;
      }

      if (this.value == this.options[1] && this.count_num < 2) {
        this.count_num++;
        return
      } else if (this.value == this.options[1] && this.count_num == 2) {
        MessageBox('错误', '超出单个商品规格', false);
        return
      }
    },
    // 减少商品数量
    subCountFn() {
      const { value, count_num } = this;
      if (value == '') {
        MessageBox('错误', '请先选择商品规格', false)
        return;
      }
      if (count_num == 0) {
        return;
      }
      this.count_num--;

    },
    // 关闭弹窗初始化数据
    closeSelOrder() {
      this.value = '';
      this.count_num = 0;
      this.shop_name = '';
      this.show_box = false;
      this.value = this.options[0];
      // console.log(this.options[0])
      // this.isShow = false
    },
    // 显示弹窗
    showSelBoxFn(item) {
      this.shop_name = item.stuffName;
      this.stuffUuid = item.stuffUuid
      // console.log(this.stuffUuid)
      // console.log(this.shop_name, this.stuffUuid, 'adadsa');
      // 新版本弹窗 底部touch滑动
      // this.isShow = true;
      // 老版本弹窗
      this.show_box = true;
    },
    // 下单规则验证
    verification(obj) {
      let num = 0;
      let arr = [];
      arr.push(obj);
      this.cart_list.forEach(item => {
        arr.push(item);
      });
      arr.forEach(item => {
        if (item.pack.packName == this.options[0]) {
          num += item.packNum * 2;
        }
        if (item.pack.packName == this.options[1]) {
          num += item.packNum;
        }
      });
      // console.log(num)
      if (num > 2) {
        return false
      } else {
        return true;
      }
    },
    // 弹窗确定按钮
    showBoxSelFn() {
      const { packUuid, stuffUuid, value, count_num, shop_name } = this;
      if (count_num == 0) {
        return;
      }
      let obj = {
        pack: {
          packName: value,
          packUuid,
        },
        packNum: count_num,
        stuffName: shop_name
      }
      const isVerif = this.verification(obj);
      if (isVerif) {
        this.cart_list.push({
          stuffUuid,
          stuffName: shop_name,
          pack: {
            packUuid,
            packName: value,
          },
          packNum: count_num
        });
        this.closeSelOrder();
        // console.log('添加成功');
      } else {
        MessageBox('错误', '下单总数不符合下单规则', false);
        // this.closeSelOrder();
        this.value = this.options[0];
        this.count_num = 0;
      }
    }
  },
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
// 底部选择框 样式覆盖 兼容hotcss
.picker-items {
  font-size: px(24) !important;
}
.picker-slot {
  font-size: px(18) !important;
}
.picker-center-highlight {
  height: px(36) !important;
  margin-top: px(-18) !important;
}
.picker-slot-wrapper {
  height: px(180) !important;
  // transform: translateY(px(36)) !important;
  // transform: translate(0, px(72)) translateZ(0) !important ;
}
.picker-item {
  height: px(36) !important;
  line-height: px(36) !important;
  padding: 0 px(10) !important;
}

.blak {
  background: #000;
  opacity: 0.5;
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
.slot3 {
  flex: 1 1 0% !important;
}
.picker {
  position: fixed !important;
  left: 0 !important;
  bottom: 0 !important;
  width: 100%;
  background: #fff;
}
.add_order {
  .picker-toolbar {
    height: auto !important;
  }
  .picker_btns {
    display: flex;
    justify-content: space-between;
    padding: 0 px(25);
    padding-top: px(20);
    font-size: px(20);
  }
  .mint-radio-label {
    font-size: px(16);
    margin-left: 0 !important;
  }
  .mint-radio-core {
    width: px(18) !important;
    height: px(18) !important;
    display: inline-block;
  }
  .mint-radio-core::after {
    width: px(8);
    height: px(8);
    top: px(5);
    border-radius: 50%;
    left: px(4);
  }
  .mint-radiolist-label {
    padding: px(10) !important;
  }
  .add_order .mint-radio-core::after {
    width: px(8);
    height: px(8);
    top: px(15);
    left: px(15);
  }
  font-size: px(30);
  background: rgba(242, 242, 242, 1);
  width: 100%;
  padding: px(10);
  box-sizing: border-box;
  .shop_cart {
    background: #fff;
    padding: px(10);
    .btn_wrap {
      display: flex;
      justify-content: center;
      .btn_disable {
        border: 1px solid rgb(217, 217, 217);
        background-color: rgb(245, 245, 245);
        color: rgb(217, 217, 217);
        font-size: px(14);
        width: px(100);
        margin-top: px(200);
        padding: px(10) 0;
        border-radius: px(5);
        // margin-top: px(20);
        box-sizing: border-box;
        text-align: center;
        outline: none;
      }
      .cart_btn {
        outline: none;
        color: #fff;
        font-size: px(14);
        background-color: rgba(24, 144, 255, 1);
        width: px(100);
        box-sizing: border-box;
        text-align: center;
        padding: px(10) 0;
        border-radius: px(5);
        margin-top: px(20);
      }
    }
    .title {
      font-size: px(14);
      padding: px(7) 0;
      font-weight: 700;
      padding-left: 20px;
      border-bottom: 1px dotted gray;
    }
    .cart_list {
      padding-top: px(10);
      p {
        font-size: px(16);
        text-align: center;
      }
      .item {
        display: flex;
        padding: px(10);
        justify-content: space-between;
        align-items: center;
        border: 1px dotted gray;
        margin-bottom: px(7);
        border-radius: px(4);
        .item_des {
          font-size: px(14);
          .shop_des {
            span {
              margin-left: px(15);
            }
          }
        }
        i {
          display: block;
          // width: px(5);
          // height: px(5);
          // border: 1px solid red;
          color: red;
          font-size: px(16);
        }
      }
    }
  }
  .post_order {
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    .title {
      font-size: px(14);
      font-weight: 700;
      padding: px(7) 0;
      padding-left: 20px;
      border-bottom: 1px dotted gray;
    }
    .shop_wrap {
      // position: relative;
      display: flex;
      flex-wrap: wrap;
      padding: 0 px(6);
      :nth-child(1) {
        .item_img {
          // background: yellow;
          opacity: 0.6;
        }
      }
      :nth-child(2) {
        .item_img {
          opacity: 0.6;
          // background: aqua;
        }
      }
      :nth-child(3) {
        .item_img {
          opacity: 0.6;
          // background: indianred;
        }
      }
      :nth-child(4) {
        .item_img {
          opacity: 0.6;
          // background: seagreen;
        }
      }
      .add_order_box {
        z-index: 999;
        position: absolute;
        position: fixed;
        width: 100%;
        // height: 100%;
        left: 0;
        bottom: 0;
        padding: px(20) px(10);
        z-index: 99;
        background: #fff;
        // padding: px(20) 0;
        box-sizing: border-box;
        display: flex;
        .order_img {
          flex: 1;
          .pic {
            // width: px(150);
            width: 100%;
            height: px(160);
            background: darkcyan;
          }
          p {
            padding-top: px(5);
            font-size: px(12);
            text-align: center;
          }
        }
        .right {
          flex: 1;
          height: px(160);
          position: relative;
          i {
            font-weight: 700;
            position: absolute;
            right: px(10);
            box-sizing: border-box;
            padding: px(0);
            top: px(-16);
            font-size: px(18);
          }

          .btn_disable {
            background-color: rgb(245, 245, 245) !important;
            color: rgb(217, 217, 217) !important;
          }
          .sel_order_btn {
            height: px(30);
            width: px(114);
            margin: 0 auto;
            color: #fff;
            background: #0095fb;
            font-size: px(16);
            line-height: px(30);
            box-sizing: border-box;
            text-align: center;
            border-radius: px(5);
            margin-top: px(20);
          }
          .mint-radiolist {
            padding: 0 px(40);
            margin-bottom: px(10);
          }
          .count {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: px(20);
            .span_count {
              padding: 0 px(20);
            }
            span {
              border: 1px solid black;
              padding: 0 px(10);
            }
          }
        }
      }
      .item:nth-child(1),
      .item:nth-child(3) {
        padding-right: px(3);
        box-sizing: border-box;
      }
      .item:nth-child(2),
      .item:nth-child(4) {
        padding-left: px(3);
        box-sizing: border-box;
      }
      .item {
        width: 50%;
        box-sizing: border-box;
        margin-top: px(10);
        .item_img {
          width: 100%;
          height: px(80);
          background: black;
          opacity: 0.5;
        }
        .item_des {
          font-size: px(12);
          margin-top: px(5);
          text-align: center;
        }
      }
    }
  }
}
</style>