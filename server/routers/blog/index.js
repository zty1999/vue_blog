const express = require('express')
const router = express.Router()
 
router.get('/blog', function (req, res, next) {
  // res.send('index')
  // render方法会去模板目录，即views下按照views/main/index去寻找对应的模板文件
  res.render('blog/index')
})
 
module.exports = router
//   //接收一个app对象
//   const express = require("express");
//   const router = express.Router({});
//   // const mongoose = require("mongoose");  mergeParams: true

  

// module.exports = router
