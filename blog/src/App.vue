<template>
  <div id="app">
      <div id="nav" class="bg-dark" style="height: 60px;">
        <el-row type="flex" justify="space-around" class="ai-center">
          <el-col :offset="3" :span="6">
            <i>
              <h2 class="teal">Mulean's Blog</h2>
            </i>
          </el-col>
          <el-col class="flex-1">
            <el-menu
              router
              :default-active="$route.path"
              class="el-menu-demo text-fat" 
              mode="horizontal"
              @select="handleSelect"
              background-color="#222"
              text-color="#fff"
              active-text-color="#00B5AD"
            >
              <el-menu-item index="/">首页</el-menu-item>
              <el-menu-item index="/category">分类</el-menu-item>
              <el-menu-item index="/tag">标签</el-menu-item>
              <el-menu-item index="/file">归档</el-menu-item>
              <el-menu-item index="/edit">发表</el-menu-item>
              <el-menu-item index="/profile">关于我</el-menu-item>
            </el-menu>
          </el-col>

          <el-col :pull="3" :span="4">
            <el-input
              placeholder="Search..."
              size="small"
              suffix-icon="el-icon-search"
              v-model="input1"
            ></el-input>
          </el-col>
        </el-row>
      </div>
    <el-container> 
      <el-main>
        <router-view />
      </el-main>
    </el-container>

    <div class="footer bg-dark">
      <div class="d-flex jc-space-around ai-center w-100 text-center m-text m-container py-5">
        <div class="flex-1">
          <img src="@/assets/image/wechatgzh.jpg" width="100px" height="100px" alt />
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="flex-1">
          <h4>最新博客</h4>
          <p>用户故事</p>
          <p>用户故事</p>
          <p>用户故事</p>
          <p>用户故事</p>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="flex-1">
          <h4>联系我</h4>
          <p>Email: 1685470954@qq.com</p>
          <p>QQ: 1685470954</p>
        </div>
        <el-divider direction="vertical"></el-divider>
        <div class="flex-1">
          <p>这是我的个人博客，这里将见证着我前进的步伐</p>
        </div>
      </div>
      <el-divider class="m-0"></el-divider>
      <div class="text-center pt-3 pb-5">Copyright@2019- 2020 Mulean Designed by Mulean</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input1: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="scss">
@import "./assets/style/base.scss";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  // .el-select
  .el-input {
    // width: 130px;
    .el-input__inner {
      background-color: var(--tint-background) !important;
      border: none;
    }
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .el-divider {
    margin: 0;
    background-color: #333 ;
  }
  .el-divider--vertical {
    height: 100px;
  }
}
</style>
