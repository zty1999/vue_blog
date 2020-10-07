<template>
  <el-container class=" d-flex">
    <!-- 侧边栏 -->
    <el-aside class="bg-dark" :width="isCollapse ? '64px' : '200px'">
      <section class="d-flex jc-center ai-center">
        <i>
          <h2 class="teal" :style="isCollapse ? 'font-size: 14px' : ''">
            {{ isCollapse ? "Mulean" : "Mulean's Blog" }}
          </h2>
        </i>
      </section>

      <div class="toggle-button fs-xs bg-dark" @click="toggleCollapse">
        |||
      </div>
      <!-- 侧边栏菜单区域 关掉折叠动画 不然卡顿 -->
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-vertical"
        :collapse="isCollapse"
        :collapse-transition="false"
        background-color="#222"
        text-color="#fff"
        active-text-color="teal"
      >
        <el-menu-item index="/welcome">
          <i class="el-icon-s-home fs-md" ></i><span>首页</span>
        </el-menu-item>
        <el-submenu :index="item.id" v-for="item in menuList" :key="item.title">
          <template slot="title">
            <i :class="item.icon ? item.icon : 'el-icon-s-home'"></i>
            <span class="fs-md">{{ item.title }}</span>
          </template>
          <el-submenu
            :index="item2.id"
            v-for="item2 in item.children"
            :key="item2.title"
          >
            <template slot="title">{{ item2.title }}</template>
            <el-menu-item-group>
              <el-menu-item
                :index="item3.path"
                v-for="item3 in item2.children"
                :key="item3.name"
                >{{ item3.name }}</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container class="flex-1">
      <!-- 头部区域 -->
      <el-header class="bg-dark d-flex ai-center jc-end">
        <div class="settings white">设置</div>
      </el-header>
      <!-- 主体内容 -->
      <el-main class="p-3">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      //侧边栏显示模式切换
      isCollapse: false,
      // 侧边栏数据
      menuList: [
        {
          id: "1",
          title: "博客",
          icon: "el-icon-menu",
          children: [
            {
              id: "11",
              title: "文章管理",
              children: [
                { path: "/articles/list", name: "文章列表" },
                { path: "/articles/edit", name: "文章编辑" },
              ],
            },
          ],
        },
        {
          id: "2",
          title: "权限管理",
          icon: "el-icon-bangzhu",
          children: [
            {
              id: "12",
              title: "用户管理",
              children: [{ path: "/user/list", name: "用户列表" }],
            },
            {
              id: "13",
              title: "评论管理",
              children: [{ path: "/comments", name: "评论列表" }],
            },
            {
              id: "14",
              title: "标签管理",
              children: [{ path: "/tags", name: "标签管理" }],
            },
            {
              id: "15",
              title: "系统管理",
              icon: "el-icon-s-operation",
              children: [{ path: "/settings", name: "网站设置" }],
            },
          ],
        },
      ],
    };
  },

  created() {},
  methods: {
    //侧边栏显示模式切换
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>
<style lang="scss" scoped>
.el-container {
  height: 100vh;
  padding: 0;
}

// 侧边栏
.el-aside {
  .iconfont {
    margin-right: 10px;
  }
  .toggle-button {
    text-align: center;
    // padding: 5px;
    line-height: 24px;
    letter-spacing: 0.2em;
    color: #fff;
    cursor: pointer;
  }
  .el-menu {
    background-color: var(--dark);
    border: none;
  }
}
</style>
