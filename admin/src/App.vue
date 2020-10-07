<template>
  <div id="app">
    <router-view  ></router-view>
    <!-- v-if="isRouterAlive" :key="key" -->
  </div>
</template>
<script>
export default {
  // provide / inject 通过声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载
  // 然后在需要当前页面刷新的页面中注入App.vue组件提供（provide）的 reload 依赖，然后直接用this.reload来调用就行
  // 子组件：注入依赖 inject: ['roload'], 调用 this.reload()
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
   computed: {
    key() {
      return this.$route.path
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  },
};
</script>
<style lang="scss">
@import "@/assets/style/base.scss";
.page-header {
  display: flex;
  align-items: center;
  padding: 0 20px;
}
h2 {
  padding: 20px 0; 
}
</style>
