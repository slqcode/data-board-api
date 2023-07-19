const express = require('express') // 引入express模块
const db = require('./app/models/db.js') // 引入数据库模块

const app = express() // 创建express应用

app.use(express.json()) // 使用JSON中间件
app.use(express.urlencoded({ extended: true })) // 使用URL编码中间件

require('./app/routes/movie.routes.js')(app) // 引入并使用电影路由

// 在端口8001上启动服务器
app.listen(8001, () => {
  console.log(`Server is running on port 8001`) // 输出服务器运行信息
})
