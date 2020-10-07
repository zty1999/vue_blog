<template>
  <div class="category">
      <el-col :offset="5" :span="14" >
     <el-card class="">
  <div slot="header" class="clearfix">
    <span>分类</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</el-card>
      </el-col>
 
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>