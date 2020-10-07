<template>
  <div class="login-container">
    <el-card
      :header="showLogin === true ? '请先登录' : '请先注册'"
      class="login-card"
    >
      <div class="blog-text teal ">blog</div>
      <el-form v-show="showLogin" ref="loginFormRef" :rules="rules" :model="loginModel">
        <!-- native 表示监听el-form里的原生表单事件 prevent表示阻止表单的默认提交，不要跳转页面 @submit.native.prevent="login"-->
        <el-form-item label="用户名">
          <el-input v-model="loginModel.username" ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginModel.password" ></el-input>
        </el-form-item>
        <el-form-item class="submit-wrapper">
          <el-button @click="login">登录</el-button>
          <span @click="ToRegister">没有账号？马上注册</span>
          <!--  @click="login"  native-type="submit"-->
        </el-form-item>
      </el-form>
      <el-form v-show="showRegister" ref="regFormRef"  :rules="rules" :model="regModel">
        <!-- native 表示监听el-form里的原生表单事件 prevent表示阻止表单的默认提交，不要跳转页面 @submit.native.prevent="login"-->
        <el-form-item label="用户名">
          <el-input v-model="regModel.newUsername" ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="regModel.newPassword" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="regModel.reNewPassword"></el-input>
        </el-form-item>
        <el-form-item class="submit-wrapper">
          <el-button @click="register">注册</el-button>
          <span @click="ToLogin">已有账号？马上登录</span>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  //重载页面的依赖
  inject: ['reload'], 
  data() {
    return {
      showRegister: false,
      showLogin: true,
      loginModel: {
        username: "",
        password: "",
      },
      regModel: {
        newUsername: "",
        newPassword: "",
        reNewPassword: "",
      },
      // 表单验证规则对象
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        newUsername: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        reNewPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    ToRegister() {
      this.showRegister = true;
      this.showLogin = false;
      this.$refs.regFormRef.resetFields()
      this.$refs.loginFormRef.resetFields()
    },
    ToLogin() {
      this.showRegister = false;
      this.showLogin = true;
      this.$refs.loginFormRef.resetFields()
      this.$refs.regFormRef.resetFields()
    },
    async login() {
      
      if (this.loginModel.username === "") {
        this.$message({
          type: "error",
          message: "请输入用户名",
        });
        return;
      }
      if (this.loginModel.password === "") {
        this.$message({
          type: "error",
          message: "请输入密码",
        });
        return;
      }
      this.loginModel.username = this.loginModel.username.trim()
      const res = await this.$request.post("/user/login", this.loginModel);
      console.log(res);
      if(!res.data.token) {
         this.$message({
        type: 'error',
        message: res.data.message
        })
        return
       }else {
         //不写过期时间，默认为1天过期  设置为1小时
        sessionStorage.setItem("token",res.data.token,60 * 60 * 1)
        this.$message({
        type: 'success',
        message: res.data.message
        })
        this.$router.push("/");
       }
        
    },
    //注册
    async register() {
      if (this.regModel.newUsername === "") {
        this.$message({
          type: "error",
          message: "用户名不能为空",
        });
        return;
      }
      if (this.regModel.newPassword === "") {
        this.$message({
          type: "error",
          message: "密码不能为空",
        });
        return;
      }
      if (this.regModel.reNewPassword === "") {
        this.$message({
          type: "error",
          message: "请确认密码",
        });
        return;
      }
      if (this.regModel.reNewPassword !== this.regModel.newPassword) {
        this.$message({
          type: "error",
          message: "两次密码不一致，请重新输入",
        });
        return;
      }
      const regModel = {};
      regModel.username = this.regModel.newUsername;
      regModel.password = this.regModel.newPassword;
      regModel.repassword = this.regModel.reNewPassword;

      const res = await this.$request.post("/user/register", regModel);
      console.log(res);
     if(res.data.code !== 0) {
          this.$message({
          type: 'error',
          message: res.data.message
          })
          return
       }
        this.$message({
        type: 'success',
        message: res.data.message + '    请重新登录'
        })
        //重载页面
      this.reload();
    },
  },
};
</script>

<style lang="scss">
.blog-text {
  position: absolute;
  top: 0;
  left: 50%;
  font-size: 36px;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25rem;
  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
    .el-button {
      margin: 4px;
      color: #fff;
      background-color: var(--teal);
    }
  }
}
/* 将返回的token写入浏览器的存储，浏览器关闭后再打开仍然保存
      sessionStorage.token = res.data.token//sessionStorage浏览器关闭后不再存储 */
</style>
