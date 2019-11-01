<template>
  <div class="mob_register">
    <div class="login_pic">
      <img src="@/assets/img/user_pic.png" alt />
    </div>
    <!-- 表单 -->
    <div class="from_wrap">
      <div class="user_name input_wrap">
        <i class="el-icon-user"></i>
        <input type="text" placeholder="学号" v-model="user_number" />
      </div>
      <div class="user_pwd input_wrap">
        <i class="el-icon-user"></i>
        <input type="text" placeholder="姓名" v-model="user_name" />
      </div>
      <div class="user_pwd input_wrap">
        <i class="el-icon-lock"></i>
        <input class="el-icon-lock" type="password" placeholder="密码" v-model="user_pwd" />
      </div>
      <div class="user_pwd input_wrap">
        <i class="el-icon-lock"></i>
        <input class="el-icon-lock" type="password" placeholder="确认密码" v-model="new_user_pwd" />
      </div>
      <div class="user_pwd input_wrap">
        <i class="el-icon-tickets"></i>
        <input type="text" placeholder="班级号码" v-model="class_id" />
      </div>
      <div class="user_pwd input_wrap">
        <i class="el-icon-user"></i>
        <input type="text" placeholder="代课教师姓名" v-model="teacher_name" />
      </div>
      <!-- 登录按钮 -->
      <div class="login_btn" @click="registerFn">注册</div>
      <!-- footer -->
      <footer>
        <p class="msg">WELCOME</p>
        <p>智能仿真产线系统</p>
      </footer>
    </div>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import '@/hotcss/hotcss'
import qs from 'qs'
export default {
  name: 'login',
  data() {
    return {
      user_number: '',
      user_pwd: '',
      new_user_pwd: '',
      teacher_name: '',
      class_id: '',
      user_name: '',
      popupVisible: '',
    }
  },
  created() {

  },
  methods: {
    // 验证信息完整
    eachUserInfoFn(userInfo) {
      let errArr = [];
      for (let key in userInfo) {
        if (userInfo[key] == '') errArr.push(key);
      };
      return errArr;
    },
    initFormFn() {
      this.user_number = '';
      this.user_pwd = '';
      this.new_user_pwd = '';
      this.teacher_name = '';
      this.class_id = '';
      this.user_name = '';
    },
    // 注册
    registerFn() {
      const { user_number, user_pwd, new_user_pwd, teacher_name, class_id, user_name } = this
      const userInfo = {
        user_number,
        user_name,
        user_pwd,
        new_user_pwd,
        class_id,
        teacher_name,
      };
      const errArr = this.eachUserInfoFn(userInfo);
      if (errArr.length) {
        let arrItem = errArr.find(item => {
          return item == 'user_number' || item == 'user_name' || item == 'user_pwd'
            || item == 'new_user_pwd' || item == 'class_id' || item == 'teacher_name'
        });
        if (arrItem) {
          if (arrItem == 'user_number') {
            MessageBox('注册失败', `请填写学号`, false);
            return;
          };
          if (arrItem == 'user_name') {
            MessageBox('注册失败', `请填写姓名`, false);
            return;
          };
          if (arrItem == 'user_pwd') {
            MessageBox('注册失败', `请填写密码`, false);
            return;
          };
          if (arrItem == 'new_user_pwd') {
            MessageBox('注册失败', `请填写确认密码`, false);
            return;
          }
          if (arrItem == 'class_id') {
            MessageBox('注册失败', `请填写班级号码`, false);
            return;
          }
          if (arrItem == 'teacher_name') {
            MessageBox('注册失败', `请填写代课教师姓名`, false);
            return;
          }
        }
      }
      // console.log(arrItem);
      // errArr.forEach(item => {
      //   if (item == 'user_number') {
      //     MessageBox('注册失败', `请填写学号`, false);
      //     throw new Error(`表单参数${item}为空抛出异常`)
      //   };
      //   if (item == 'user_name') {
      //     MessageBox('注册失败', `请填写姓名`, false);
      //     throw new Error(`表单参数${item}为空抛出异常`)
      //   };
      //   if (item == 'user_pwd') {
      //     MessageBox('注册失败', `请填写密码`, false);
      //     throw new Error(`表单参数${item}为空抛出异常`)
      //   };
      //   if (item == 'new_user_pwd') {
      //     MessageBox('注册失败', `请填写确认密码`, false);
      //     throw new Error(`表单参数${item}为空抛出异常`)
      //   }
      //   if (item == 'class_id') {
      //     MessageBox('注册失败', `请填写班级号码`, false);
      //     throw new Error(`表单参数${item}为空抛出异常`)
      //   }
      //   if (item == 'teacher_name') {
      //     MessageBox('注册失败', `请填写代课教师姓名`, false);
      //     throw new Error(`表单参数${item}为空抛出异常`)
      //   }
      // });
      // };
      if (user_pwd != new_user_pwd) {
        MessageBox('注册失败', `两次密码不一致`, false);
        return;
      };
      const data = qs.stringify({
        userId: user_number,
        userName: user_name,
        userPwd: user_pwd
      })
      this.axios.post('api/webapi/register', data)
        .then(res => {
          const { success, msg } = res.data;
          if (success) {
            // 注册成功
            MessageBox('注册成功', `注册成功`, false);
            this.initFormFn();
            this.$router.push('/m/login');
          } else {
            if (msg == '学号已存在') MessageBox('注册失败', '学号已存在', false);
            if (msg == '参数已存在') MessageBox('注册失败', '请填写正确信息', false);
            if (msg == '参数为空或已存在') MessageBox('注册失败', '请填写完整信息', false);
          }
        })
        .catch(err => {
          console.log(err)
        });
    },
  }
}
</script>

<style lang="scss" scope>
@import "@/hotcss/px2rem";
$designWidth: 375;
.mob_register {
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.mint-popup-right {
  width: 100vw;
  // height: 100vh;
  height: 100%;
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
  padding-top: px(50);
  padding-bottom: px(40);
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
    width: px(100);
    color: #fff;
    background: #1890ff;
    text-align: center;
    font-size: px(18);
    border-radius: 10px;
    padding: px(5) 0;
    box-sizing: border-box;
  }
  .title {
    margin-top: px(50);
    padding-bottom: px(20);
    font-size: px(22);
    color: rgb(0, 0, 0.65);
  }
  .input_wrap {
    width: px(250);
    box-sizing: border-box;
    padding: px(5);
    border-radius: px(10);
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding-bottom: px(50);
    margin-bottom: px(30);
    i {
      display: block;
      // width: px(16);
      font-size: px(16);
      // height: px(16);
      border-radius: 50%;
      // background: red;
    }
    input {
      border: none;
      flex: 1;
      height: 100%;
      font-size: px(13);
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
    margin-top: px(20);
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