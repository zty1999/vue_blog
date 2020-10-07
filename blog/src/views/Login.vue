<template>
  <div class="login-container">
    <el-card :header="showLogin === true ? '请先登录':'请先注册'" class="login-card">
      <el-form v-show="showLogin">
        <!-- native 表示监听el-form里的原生表单事件 prevent表示阻止表单的默认提交，不要跳转页面 @submit.native.prevent="login"-->
        <el-form-item label="用户名">
          <el-input v-model="loginModel.username" ref="loginFormRef"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="loginModel.password" ref="loginFormRef2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login" >登录</el-button>
          <span  @click="ToRegister" >没有账号？马上注册</span>
          <!--  @click="login"  native-type="submit"-->
        </el-form-item>
      </el-form>
      <el-form v-show="showRegister">
        <!-- native 表示监听el-form里的原生表单事件 prevent表示阻止表单的默认提交，不要跳转页面 @submit.native.prevent="login"-->
        <el-form-item label="用户名">
          <el-input v-model="regModel.newUsername" ref="regFormRef"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="regModel.newPassword" ref="regFormRef2"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" >
          <el-input type="password" v-model="regModel.reNewPassword" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register" >注册</el-button>
         <span @click="ToLogin">已有账号？马上登录</span> 
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  data() {
    return {
      showRegister: false,
      showLogin: true,
      loginModel: {
        username: '',
        password: ''
      },
      regModel: {
        newUsername: '',
        newPassword: '',
        reNewPassword: ''
      },
    }
  },
  methods: {
    ToRegister(){
      this.showRegister = true;
      this.showLogin =false;
      this.$refs.loginFormRef.resetFields()
      this.$refs.loginFormRef2.resetFields()
    },
    ToLogin(){
      this.showRegister = false;
      this.showLogin =true;
      this.$refs.regFormRef.resetFields()
      this.$refs.regFormRef2.resetFields()
    },
    async login() {
      //后端做了校验 直接用axios的响应拦截处理错误函数
      if(this.loginModel.username === "") {
        this.$message({
        type: 'error',
        message: '请输入用户名'
        })
        return
      }
      if(this.loginModel.password === "" ) {
        this.$message({
        type: 'error',
        message: '请输入密码'
        })
        return
      }
      
       const res = await this.$request.post('/api/user/login',this.loginModel);
       console.log(res)
       if(!res.data.token) {
         this.$message({
        type: 'error',
        message: res.data.message
        })
        return
       }
        this.$message({
        type: 'success',
        message: res.data.message
        })
        this.$router.push('/')
    },
    async register() {
     
      if(this.regModel.newUsername === "") {
        this.$message({
        type: 'error',
        message: '用户名不能为空'
        })
        return
      }
      if(this.regModel.newPassword === "" ) {
        this.$message({
        type: 'error',
        message: '密码不能为空'
        })
        return
      }
      if(this.regModel.reNewPassword === ""){
        this.$message({
        type: 'error',
        message: '请确认密码'
        })
        return
      }
      if(this.regModel.reNewPassword !== this.regModel.newPassword){
        this.$message({
        type: 'error',
        message: '两次密码不一致，请重新输入'
        })
        return
      }
      const regModel = {};
        regModel.username = this.regModel.newUsername
        regModel.password = this.regModel.newPassword
        regModel.repassword = this.regModel.reNewPassword
     
      const res = await this.$request.post('/api/user/register',regModel);
        console.log(res)
        this.$message({
        type: 'success',
        message: res.data.message
        })
      //  this.$router.push('/')
     
      // localStorage.token = res.data.token
      // this.$router.push('/')
      // this.$message({
      //   type: 'sucess',
      //   message: '注册成功'
      // })
      // this.$bus.$emit('login',this.model);
    }
  }
}
</script>

<style  >
.login-card {
  width: 25rem;
  margin: 6rem auto;
}
/* 将返回的token写入浏览器的存储，浏览器关闭后再打开仍然保存
      sessionStorage.token = res.data.token//sessionStorage浏览器关闭后不再存储 */
</style>
