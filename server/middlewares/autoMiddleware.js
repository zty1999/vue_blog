module.exports = options => {
  const jwt = require('jsonwebtoken')
const AdminUser =require('../models/Adminuser')
  // const assert = require('http-assert')
  
  return async(req,res,next) => {
      //校验用户是否登录
      //1.	获取用户信息  用户信息一般在请求头里传 
  
      //获取token   获取到请求头 .split用空格分割，分割后是数组，.pop提取数组的最后一个元素
      const token = String(req.headers.authorization || '').split(' ').pop()
      if(!token) {
        return res.status(401).send({message: '请先登录'})
      }
      // assert(token,401,'请先登录')
  
      //将token解密获得用户id
      const {id} = jwt.verify(token,req.app.get('secret'))//从路由中转移到这里，访问不到路由中的app所以要使用req.app
      if(!id) {
        return res.status(401).send({message: '请先登录'})
      }
      // assert(id,401,'请先登录')
  
      //通过数据库中搜索id找到用户，然后挂载到req中
      req.user = await AdminUser.findById(id)
      if(!req.user) {
        return res.status(401).send({message: '请先登录'})
      }
      // assert(req.user,401,'请先登录')
      
      console.log(req.user)
      await next()
  }
}