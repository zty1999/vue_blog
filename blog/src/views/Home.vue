<template>
  <div class="home">
    <el-row>
      <el-col :span="12" :offset="4">
        <el-card class="my-5">
          <div slot="header" class="clearfix">
            <span>博客</span>
            <el-button style="padding: 3px 0;" class="right" type="text">
              共&emsp;
              <span class="fs-xl">64</span> &emsp;篇
            </el-button>
          </div>

          <div v-for="o in 4" :key="o" class="text item" style="border-bottom: 1px solid #d4d9de;">
            <h3>第{{o}}篇博客文章</h3>
            <el-row type="flex">
              <el-col :span="16">
                <article
                  tag="div"
                  class="py-3 m-text"
                >正确做好任何一件事情的前提是清晰、正确的理解目标。而事 实是，我们很多人很多时候根本没有对目标正确的定义，甚至 根本从来就没有想过，只是大家都那么做而已...</article>
              </el-col>
              <el-col :span="8">
                <div class="p-3">
                  <img
                    width="100%"
                    style="border-radius: 10px;"
                    src="@/assets/image/replace.jpg"
                    alt
                  />
                </div>
              </el-col>
            </el-row>

            <div class="bottom clearfix d-flex ai-center pb-2">
              <div class="block px-3">
                <el-avatar>
                  <img src="@/assets/image/replace.jpg" alt />
                </el-avatar>
              </div>

              <time class="time">{{ currentDate }}</time>
              <div class="px-3 text-grey">
                <i class="el-icon-view"></i>
                {{count}}
              </div>
              <div class="flex-1 text-right px-3">
                <el-tag size="small">原创</el-tag>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6" :offset="1">
        <el-card class="my-5">
          <div slot="header" class="clearfix">
            <span>分类</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              more
              <i class="el-icon-d-arrow-right"></i>
            </el-button>
          </div>
          <div v-for="o in 5" :key="o" class="text item">{{'第 ' + o + '条博客'}}</div>
        </el-card>
        <el-card style="margin: 2em 0;">
          <div slot="header" class="clearfix">
            <span>标签</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              more
              <i class="el-icon-d-arrow-right"></i>
            </el-button>
          </div>
          <!-- <div > -->
          <el-tag v-for="o in 5" :key="o" class="text item mx-2" size="small">{{'第 ' + o + '个标签'}}</el-tag>

          <!-- </div> -->
        </el-card>
        <el-card style="margin: 2em 0;">
          <div slot="header" class="clearfix">
            <span>归档</span>
            <el-button style="float: right; padding: 3px 0" type="text">
              more
              <i class="el-icon-d-arrow-right"></i>
            </el-button>
          </div>
          <div v-for="o in 5" :key="o" class="text item">{{'第 ' + o + '条博客'}}</div>
        </el-card>
        <div class="py-5">
          <el-divider class="code">扫码关注公众号</el-divider>
          <div class="text-center mt-4">
            <img style="width: 150px; height: 150px" src="@/assets/image/wechatgzh.jpg" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      currentDate: new Date(),
      count: "23"
    };
  },
  methods: {
    
  }
};
</script>
<style lang="scss">
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.code {
  background-color: #dcdfe6 !important;
}

.el-button--text {
  color: var(--teal) !important;
}
.el-tag {
  color: var(--teal) !important;
  background-color: var(--color-background) !important;
}
</style>