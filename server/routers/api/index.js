// module.exports = app => {
// 	//接收一个app对象
//   const express = require('express');
//   const router = express.Router();
//   const User = require('../../models/User')

//   // const mongoose = require("mongoose"); 
//   // mergeParams: true
 
//   var resData;
//   router.use(function (req, res, next) {
//     resData = {
// 			code: 0,
//       message: "",
//     };
//     next()
//   });
//      // if (username === "") {
//     //   res.status = 201;
//     //   // res.statusCode = 201;
//     //   resData.code = 1;
//     //   resData.message = "用户名不能为空";
//     //   res.json(resData);
//     //   res.statusCode = 201;
// //   res.on('error', (err) => {
//     //     console.error(err);
//     //   });
  
     
//     //   return;
//     // }
//     // if (password === "") {
//     //   res.status = 201;
//     //   resData.code = 2;
//     //   resData.message = "密码不能为空";
//     //   res.json(resData);
//     //   return;
//     // }
//     // User.findOne({
//     //   username: username,
//     //   password: password
//     // }).then(function (userInfo) {
//     //   console.log("查询结果：" + userInfo); //若控制台返回空表示没有查到数据
//     //   if (!userInfo) {
//     //     res.status = 201;
//     //     resData.code = 3
//     //     resData.message = '用户名或密码错误'
//     //     res.json(resData)
//     //     return res.status(422).send({message: '用户名或密码错误'})
//     //   }



//      // 前台页面登录的接口
//  router.post("/user/login", async (req, res, next) =>  {
//     console.log(req,res);
//     const { username,password } = req.body//解构赋值  req.body表示客户端传来的所有数值
 
//     // 查找数据库有没有相同的用户名 ，没有的话 报422错误，报错message为用户不存在
//     const user = await User.findOne({username: username,password:password});
// 		//安装http-assert可代替此判断：
// 		if(!user) {
//       resData.code = 2
//         resData.message = '用户不存在'
// 				res.json(resData)
//       return res.status(422).send({message: '用户不存在' + user})//这行代码没作用 原因还没搞清楚
// 		} 
// 		// const assert = require('http-assert')
// 		// assert(user, 422, '用户不存在')//确保用户存在，如果不存在，报422错误，报错message为用户不存在
// 		//但是http-assert是抛出异常直接报的错，这样就获取不到json的错，页面不会有错误弹出，所以要进行错误处理  错误处理函数在此登录接口下方
//     // 校验密码
//     const isValid = user.password; 
//     if(!isValid || '') {
//       resData.code = 3
//         resData.message = '密码错误'
// 				res.json(resData)
//       return res.status(422).send({message: '密码错误'})//这行代码没作用 原因还没搞清楚
// 		}
// 		// assert(isValid, 422, '密码错误')

// 				    // 返回token
// 	const jwt = require('jsonwebtoken')
// 	resData.token = jwt.sign({id: user._id}, app.get('secret'),{expiresIn: 60*60*1})// 1小时过期
// 	//sign 签名  用来生成一个token  
// 	//第二个值为密钥，该值中只有一个值时表示获取配置，有两个值则表示定义路由
// 	//获取配置需先在全局设定 在index.js中设置app.set()
// 	// res.send({token})
//       // 验证通过登陆
//       resData.message = '登录成功'
// 			res.json(resData);
//       return;
//     })

//   // resData.user = {
//       //   _id: userInfo._id,
//       //   username: userInfo.username
//       // };
// 	router.post("/user/register", async (req, res, next) => {
// 		console.log(req, res);
//     const username = req.body.username;
//     const password = req.body.password;
//     const repassword = req.body.repassword;
//     // 1.查找数据库有没有相同的用户名 ，没有的话保存到数据库
// 		User.findOne({username: username }).then(function (userInfo) {
//         console.log("查询结果：" + userInfo); //若控制台返回空表示没有查到数据
//         // 2.没有相同的用户名 用户名已经被注册 返回数据
// 			  if (userInfo) {
// 			    resData.code = 4
// 			    resData.message = '用户名已经被注册'
// 			    res.json(resData)
// 			    return res.status(423).send({message: '用户名已经被注册'})//这行代码没作用 原因还没搞清楚
//         }
//         // 3.将用户插入用户数据表中 .save()插入，通过操作引入的User对象操作数据库
//       const user = new User({
//         username: username,
//         password: password
// 			})
// 			  //通过操作对象操作数据库
//       return user.save()
//     }).then(function (newUserInfo) {
//       // 所有条件都通过之后
//       console.log(newUserInfo)
//       resData.message = '注册成功'
// 			res.json(resData)
		
// 		})
// 	});
// 	//if (username === "") {
// 		//     resData.code = 1;
// 		//     resData.message = "用户名不能为空";
// 		//     res.json(resData);
// 		//     return;
// 		//   }
// 		//   if (password === "") {
// 		//     resData.code = 2;
// 		//     resData.message = "密码不能为空";
// 		//     res.json(resData);
// 		//     return;
// 		//   }
// 		//    //两次密码不能不一样
// 		// if (password != repassword) {
// 		//   resData.code = 3;
// 		//   resData.message = '两次输入的密码不一致';
// 		//   res.json(resData);
// 		//   return;
// 		// }


// 		// 错误处理函数在 中间件
// 	// (err,req,res,next) => {
// 	// 	console.log(err)
// 	// 	res.status(err.status).send({
// 	// 		message:err.message
// 	// 	})
//   // }
  
// 	app.use('/api', router)
// }

