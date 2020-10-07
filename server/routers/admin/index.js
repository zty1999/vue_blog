module.exports = (app) => {
  //接收一个app对象 导出一个函数
  const express = require("express");
  const router = express.Router();
  const AdminUser = require("../../models/AdminUser");
  const Article = require("../../models/Article");

  var resData;
  router.use(function (req, res, next) {
    resData = {
      code: 0,
      message: "",
    };
    next();
  });
  //请求显示用户的接口
  router.get("/user", async (req, res) => {
    const user = await AdminUser.find();
    res.status(201).json({user});
  });
  //用户创建的接口
  router.post("/user", async (req, res) => {
    const { username, password, email, mobile } = req.body;
    // 1.查找数据库有没有相同的用户名
    const userInfo = await AdminUser.findOne({ username: username });
    console.log("查询结果：" + userInfo); //若控制台返回空表示没有查到数据
    // 2.有相同的用户名 用户名已经被使用 返回数据
    if (userInfo) {
      resData.code = 4;
      resData.message = "用户名已经被使用";
      res.status(202).json({ resData});
    }
    // 3.将用户插入用户数据表中 .save()插入，通过操作引入的User对象操作数据库
    const user = new AdminUser({
      username: username,
      password: password,
      email: email,
      mobile: mobile,
    });
    user.save();
    // 所有条件都通过之后
    resData.message = "用户创建成功";
    res.status(201).json({resData,success: true});
  });
  //用户删除的接口
  router.delete("/user/:id", async (req, res) => {
    await AdminUser.findByIdAndDelete(req.params.id, req.body);
    resData.message="用户删除成功"
    res.status(201).json({resData,success: true});
  });

  //请求显示文章的接口
  router.get("/articles", async (req, res) => {
    const articles = await Article.find();
    res.status(201).json({articles});
  });
  //文章创建的接口
  router.post("/articles", async (req, res) => {
    const model = await Article.create(req.body);
    resData.message="文章创建成功"
    res.status(201).json({model,resData,success: true});
  });
  //文章删除的接口
  router.delete("/articles/:id", async (req, res) => {
    await Article.findByIdAndDelete(req.params.id, req.body);
    resData.message="文章删除成功"
    res.status(201).json({resData,success: true});
  });

  //登录校验中间件  登录接口错误status统一为422
  // const authMiddleware = 	require('../../middlewares/authMiddleware')
  //用户登录
  router.post("/user/login", async (req, res, next) => {
    console.log(req, res);
    const { username, password,isAdmin } = req.body; //解构赋值  req.body表示客户端传来的所有数值
    if (username === '' || password === '') {
      resData.code = 1;
      resData.message = '用户名或密码不能为空'
      res.status(422).json(resData);
      return
    }
    // 查找数据库有没有相同的用户名 ，没有的话 报422错误，报错message为用户不存在
    const name = await AdminUser.findOne({
      username: username,
    });
    if (!name || name === "") {
      resData.code = 2;
      resData.message = "用户不存在";
      res.status(422).json(resData);
      return;
    }
    // 校验密码
    // 查找密码是否相同 ，不同的话 报422错误，报错message为密码错误
    let isValid = await AdminUser.findOne({
      username: username,
      password: password,
    });
    if (!isValid || isValid === "") {
      resData.code = 3;
      resData.message = "密码错误";
      res.status(422).json(resData);
      return;
    }
    // 返回token
    const jwt = require("jsonwebtoken"); 
    resData.token = jwt.sign({ id: isValid._id,isAdmin: isAdmin }, app.get("secret"));
    //sign 签名  用来生成一个token
    //第二个值为密钥，该值中只有一个值时表示获取配置，有两个值则表示定义路由
    //获取配置需先在全局设定 在index.js中设置app.set()
    // res.send({token})
    // 验证通过登陆
    resData.message = "登录成功";
    res.json(resData);
    return;
  });

  //创建用户
  router.post("/user/register", async (req, res) => {
    console.log(req, res);
    const username = req.body.username;
    const password = req.body.password;
    const repassword = req.body.repassword;
    // 1.查找数据库有没有相同的用户名 ，没有的话保存到数据库
    const userInfo = await AdminUser.findOne({ username: username });
    console.log("查询结果：" + userInfo); //若控制台返回空表示没有查到数据
    // 2.没有相同的用户名 用户名已经被注册 返回数据
    if (userInfo) {
      resData.code = 4;
      resData.message = "用户名已经被注册";
      res.json(resData);
      return res.status(423).send({ message: "用户名已经被注册" }); //这行代码没作用 原因还没搞清楚
    }
    // 3.将用户插入用户数据表中 .save()插入，通过操作引入的User对象操作数据库
    const user = new AdminUser({
      username: username,
      password: password,
    });
    user.save();
    // 所有条件都通过之后
    resData.message = "注册成功";
    res.json(resData);
  });

  app.use("/admin/api", router);
};
