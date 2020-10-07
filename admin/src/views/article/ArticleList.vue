
<template>
  <div>
    <header class="page-header">
      <h2 class="black">文章列表</h2>
      <div class="search-wrapper">
        <input type="text" v-model="searchVal" placeholder="search...">
      </div>
    </header>
    <el-main  class="px-3 fs-lg">
      <el-table :data="newitems">
      <!-- <el-table-column prop="_id" label="ID" width="240"></el-table-column> -->
      <el-table-column  prop="title" label="标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/articles/edit/${scope.row._id}`)" >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      searchVal: ''
    };
  },
  created() {
    this.fetch();
  },
  computed: {
    newitems() {
      return this.items
      // .filter((item) => {
      //   return item.title.includes(this.searchVal)
      // })
    }
  },
  methods: {
    //获取文章列表数据
    async fetch() {
      const{data:res}  = await this.$request.get("/articles");
      this.items = res.articles;
      console.log(res)
    },
    //删除文章
    remove(row) {
      this.$confirm(`是否确定要删除文章 "${row.title}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$request.delete(`/articles/${row._id}`);console.log(res)
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  
};
</script>
<style lang="scss" >

  h2 {
    flex: 1;
  }
  .search-wrapper {
    display: flex;
    justify-content: center;
    flex: 1;
    input {
      padding: 5px 10px;
      border: none;
      border-bottom: 1px solid #eee;
    }
  }

</style>