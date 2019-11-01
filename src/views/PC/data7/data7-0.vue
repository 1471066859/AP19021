<template>
  <div class="admin">
    <!-- this is admin page -->
    <h2>{{title}}</h2>
    <div class="admin_wrap">
      <div class="admin_nav">
        <ul>
          <li>基本设置</li>
          <li>安全设置</li>
        </ul>
      </div>
      <div class="admin_body">
        <div class="admin_set">
          <div class="title">
            <p>基本设置</p>
          </div>
          <!-- 账户信息 -->
          <div class="userinfo">
            <div class="des">
              <p>账户头像</p>
              <i class="user_pic"></i>
            </div>
            <div class="set"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin",
  computed: {
    title() {
      return this.$route.query.title;
    }
  }
}
</script>

<style lang="scss" scope>
.admin {
  background: #fff;
}
</style>