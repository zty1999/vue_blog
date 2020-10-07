const express = require('express');//引用express并创建一个express实例
const app = express();//app是整个网站定义的一个对象，执行函数express会返回一个新的应用的实例app

//token密钥设置
app.set('secret','sdfohdaasdf');//值'sdfoh'应该被放入环境变量，而不是直接在代码中保存

//执行后返回一个express可以用的中间键，允许跨域请求
app.use(require('cors')());
 
//使用body-parser 中间件解析post数据
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
  extended: true,
}))
//cookie-parser 中间件解析cookie数据
const cookieParser = require('cookie-parser');
app.use(cookieParser());
//表示允许express处理提交过来的数据
app.use(express.json());

//静态文件托管  统一处理请求 表示public下面的文件都是静态文件，让public里的文件可以通过/public来访问
app.use('/public',express.static(__dirname + '/public'));

//路由配置  匹配到对应的路由时加载对应的路由文件
// 处理后台服务
// app.use('/admin', require('./routers/admin'))
require('./routers/admin')(app)
// 处理登陆服务
// app.use('/api', require('./routers/api'))
//  require('./routers/api')(app)
// 处理前台服务
// app.use('/blog', require('./routers/blog'))

 //错误处理函数  中间件
//  app.use(async (err,req,res,next) => {
// 	console.log(err)
// 	res.status(err.status).send({
// 		message:err.message
// 	})
// })

// 引入 Mongoose 模块，初始化数据库连接：
const mongoose = require('mongoose');
 
// 连接本地localhost上监听于27017端口的MongoDB数据库下的blog数据库
mongoose.connect('mongodb://localhost:27017/blog',  {useNewUrlParser: true},function (err) {
    if (err) {
        console.log('数据库连接失败')
    } else {
        console.log('数据库连接成功')
        app.listen(3001,() => {//监听3001端口
	      console.log('http://localhoast:3001')
        });
    } 
})
   // app.listen(3000) 
 
