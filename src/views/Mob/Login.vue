<template>
  <div class="mob_login">
    <div class="login_pic">
      <img src="@/assets/img/user_pic.png" alt />
    </div>
    <!-- 表单 -->
    <div class="from_wrap">
      <div class="user_name input_wrap">
        <i class="el-icon-user"></i>
        <input type="test" placeholder="学号" v-model="user_number" />
      </div>
      <div class="user_pwd input_wrap">
        <i class="el-icon-lock"></i>
        <input type="password" placeholder="密码" v-model="user_pwd" />
      </div>
      <div class="from_btns">
        <span @touchend="registerFn">注册</span>|
        <span @click="forgetPwdFn">忘记密码</span>
      </div>
      <!-- 登录按钮 -->
      <div class="login_btn" @click="loginFn">登录</div>

      <!-- 修改IMA -->
      <mt-popup v-model="setPwdBox" position="right">
        <div class="from_wrap" name="slot">
          <div class="title">修改密码</div>
          <div class="user_name input_wrap">
            <i></i>
            <input type="password" placeholder="请输入新密码" v-model="user_pwd" />
          </div>
          <div class="user_name input_wrap">
            <i></i>
            <input type="password" placeholder="请确认密码" v-model="user_new_pwd" />
          </div>
          <div class="set_pwd_btn" @click="setPwdFn(1)">确认</div>
        </div>
      </mt-popup>

      <mt-popup v-model="popupVisible" position="right">
        <div class="from_wrap" name="slot">
          <div class="title">账号验证</div>
          <div class="user_name input_wrap">
            <i class="el-icon-user"></i>
            <input type="text" placeholder="请输入学号" v-model="user_number" />
          </div>
          <div class="user_name input_wrap">
            <i class="el-icon-user"></i>
            <input type="text" placeholder="请输入姓名" v-model="user_name" />
          </div>

          <div class="set_pwd_btn" @click="setPwdFn(0)">验证</div>
        </div>
      </mt-popup>
      <!-- footer -->
      <footer>
        <p class="msg">WELCOME</p>
        <p>智能仿真产线系统</p>
      </footer>
    </div>
  </div>
</template>

<script>
import '@/hotcss/hotcss'
import { MessageBox } from 'mint-ui';
import qs from 'qs'
export default {
  name: 'login',
  data() {
    return {
      // 登录数据
      user_number: '',
      user_pwd: '',
      // 修改密码
      user_new_pwd: '',
      popupVisible: false,
      setPwdBox: false,
      user_name: '',
    }
  },
  computed: {

  },
  beforeRouteEnter(to, from, next) {
    sessionStorage.removeItem('userInfo');
    sessionStorage.removeItem('userUuid');
    next();
  },
  // mounted() {
  //   const data = qs.stringify({
  //     userUuid: 'ee6e00ccd4844699a5a33737a0bf503a',
  //     sutffs: [
  //       {
  //         stuffName: '商品1',
  //         packName: '大',
  //         packNum: '1'
  //       }
  //     ]
  //   });
  //   console.log(data);
  //   this.axios.post('api/webapi/orders/addOrder', data)
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // },
  methods: {
    // 登录
    loginFn() {
      const { user_number, user_pwd } = this;
      if (user_number == '') {
        MessageBox('登录失败', '请填写登录学号', false);
        return;
      };
      if (user_pwd == '') {
        MessageBox('登录失败', '请填写登录密码', false);
        return;
      }
      const data = qs.stringify({
        userId: user_number,
        userPwd: user_pwd
      })
      this.axios.post('api/webapi/login', data)
        .then(res => {
      console.log(res)
          const { success, msg } = res.data;
          if (success) {
            // console.log(res)
            sessionStorage.setItem('userInfo', res.data.data)
            const { userUuid } = res.data.data
            sessionStorage.setItem('userUuid', userUuid)
            this.initFromFn();
            this.$router.push('/m/home');
          } else {
            // 登录失败
            if (msg == '账号密码错误') MessageBox('登录失败', '学号或密码错误', false);
            if (msg == '学号格式校验错误') MessageBox('登录失败', '请填写正确的登录信息', false);
          }
        })
        .catch(err => {
          console.log(err, '登录页错误信息');
        })
    },
    // 初始化表单
    initFromFn() {
      this.user_number = '';
      this.user_new_pwd = '';
      this.user_pwd = '';
      this.user_name = '';
    },
    // 忘记密码
    forgetPwdFn() {
      this.initFromFn();
      this.popupVisible = true;
    },
    // 注册
    registerFn() {
      this.initFromFn();
      this.$router.push('/m/register')
    },
    // 修改密码提交
    setPwdFn(i) {
      if (i == 0) {
        // 验证信息
        const { user_number, user_name } = this;
        if (user_number == '') {
          MessageBox('验证失败', '请填写验证学号', false);
          return;
        };
        if (user_name == '') {
          MessageBox('验证失败', '请填写验证姓名', false);
          return;
        };
        const data = qs.stringify({
          userName: user_name,
          userId: user_number
        });
        this.axios.post('/api/webapi/ackUser', data)
          .then(res => {
            const { success, msg } = res.data;
            if (msg == '用户名格式校验错误') {
              MessageBox('验证失败', '用户名格式不正确', false);
              return;
            };
            if (msg == '学号格式校验错误') {
              MessageBox('验证失败', '学号格式不正确', false);
              return;
            };
            if (msg == '学号姓名错误') {
              MessageBox('验证失败', '学号或姓名错误', false);
              return;
            };
            if (success) {
              const userUuid = res.data;
              sessionStorage.setItem('userUuid', userUuid)
              MessageBox('验证成功', '请设置新密码', false);
              this.initFromFn();
              this.popupVisible = false;
              this.setPwdBox = true;
            } else {
              MessageBox('验证失败', '请检查网路状况', false);
            }
          })
          .catch(err => {
            console.log(err);
            MessageBox('验证失败', '请检查网路状况', false);
          });
      } else if (i == 1) {
        // 修改密码
        const { user_pwd, user_new_pwd } = this;
        if (user_pwd == '') {
          MessageBox('验证失败', '请输入密码', false);
          return;
        };
        if (user_new_pwd == '') {
          MessageBox('验证失败', '请输入确认密码', false);
          return;
        };
        if (user_pwd !== user_new_pwd) {
          MessageBox({
            title: '修改失败',
            message: '两次密码不一致',
            showCancelButton: false
          });
          this.initFromFn();
          return;
        } else {
          const data = qs.stringify({
            userPwd: user_pwd,
            userUuid: sessionStorage.getItem('userUuid')
          })
          this.axios.post('api/webapi/updatePwd', data)
            .then(res => {
              const { success, msg } = res.data;
              if (success) {
                MessageBox('修改成功', '请您牢记新密码', false);
                this.initFromFn();
                this.popupVisible = false;
                this.setPwdBox = false
              } else {
                MessageBox('修改失败', '请填写正确信息', false)
                this.initFromFn();
              }
            })
            .catch(err => {
              console.log(err);
            })
        }
      }
    }
  }
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.mob_login {
  // height: 100vh;
  height: 100%;
  background: #fff;
}
.mint-msgbox-content {
  padding: px(10) px(20) px(15);
  min-height: px(36);
}
.mint-msgbox-message {
  line-height: px(50) !important;
}
.mint-msgbox-btns {
  height: px(50);
  padding: px(15);
}
.mint-msgbox-btn,
.mint-msgbox-message,
.mint-msgbox-title {
  font-size: px(16) !important;
}
.mint-popup-right {
  width: 100vw;
  height: 100vh;
}
.top_show {
  background: #7f7f7f !important;
  // opacity: 0.5;
  font-size: px(16);
  color: #fff;
  text-align: center;
  // line-height: 1;
  box-sizing: border-box;
  padding-top: px(10);
  height: px(50) !important;
  // background: none;
  display: inline-block;
  width: 100vw;
}
.v-modal {
  // height: px(50) !important;
}
.login_pic {
  padding-top: px(80);
  padding-bottom: px(60);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    display: block;
    border-radius: 50%;
    width: px(80);
    height: px(80);
    background: #ccc;
  }
}
.from_wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: px(20);
  .set_pwd_btn {
    width: px(250) !important;
    color: #fff;
    background: #1890ff;
    text-align: center;
    font-size: px(18);
    border-radius: 10px;
    padding: px(5) 0;
    box-sizing: border-box;
  }
  .title {
    margin-top: px(150) !important;
    padding-bottom: px(50) !important;
    font-size: px(22);
    color: rgb(0, 0, 0.65);
  }
  .input_wrap {
    width: px(250);
    box-sizing: border-box;
    padding: px(5);
    border-radius: px(4);
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding-bottom: px(50);
    margin-bottom: px(30);
    i {
      display: block;
      font-size: px(16);
      border-radius: 50%;
      // background: red;
    }
    input {
      border: none;
      flex: 1;
      height: 100%;
      font-size: px(13) !important;
      padding-left: px(10);
      outline: none;
    }
  }
  .from_btns {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1890ff;
    span {
      font-size: px(16);
      display: inline-block;
      padding: 0 px(10);
    }
  }
  .login_btn {
    // margin-top: px(50);
    margin: 0 auto;
    margin-top: px(50);
    background: #1890ff;
    width: px(250);
    border-radius: px(4);
    text-align: center;
    padding: px(8) 0;
    color: #fff;
  }
  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // position: fixed;
    // bottom: 0;
    margin-top: px(10);
    padding-bottom: px(10);
    p {
      color: #ccc;
      font-size: px(14);
      // padding: px(10) 0;
      margin-top: px(10);
    }
    .msg {
      color: #233273;
      font-size: px(20);
    }
  }
}
</style>