const express = require('express') // 引入express模块
const cors = require('cors') // 引入跨域模块

const db = require('./app/models') // 引入数据库模块

db.sequelize.sync({ force: true }) // 同步数据库
    .then(() => {
        console.log('Drop and re-sync db')
    }).catch((error) => {
        console.log(error)
    })

const app = express() // 创建express应用
const corsOptions = {
    origin: 'http://127.0.0.1:8001' // 允许来自8000端口的请求
}

app.use(cors(corsOptions)) // 使用跨域中间件
app.use(express.json()) // 使用JSON中间件
app.use(express.urlencoded({ extended: true })) // 使用URL编码中间件

require('./app/routes/movie.routes.js')(app) // 引入并使用电影路由

const PORT = process.env.PORT || 8001
// 在端口8001上启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on port 8001`) // 输出服务器运行信息
})
