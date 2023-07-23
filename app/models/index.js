const dbConfig = require('../config/db.config.js'); // 导入数据库配置
const Sequelize = require('sequelize'); // 导入Sequelize模块

// 使用Sequelize和数据库配置创建连接
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST, // 主机地址
  dialect: dbConfig.dialect, // 数据库方言
  operatorsAliases: false, // 禁用别名
  pool: {
    max: dbConfig.pool.max, // 连接池中最大连接数量
    min: dbConfig.pool.min, // 连接池中最小连接数量
    acquire: dbConfig.pool.acquire, // 连接池在抛出错误之前尝试获取连接的最长时间（以毫秒为单位）
    idle: dbConfig.pool.idle // 连接在被释放之前可以空闲的最长时间（以毫秒为单位）
  }
})

const db = {}; // 创建一个空对象来保存模型

db.Sequelize = Sequelize; // 将Sequelize添加到db对象
db.sequelize = sequelize; // 将sequelize连接实例添加到db对象

db.movies = require('./movie.model.js')(sequelize, Sequelize); // 导入电影模型

module.exports = db; // 导出db对象，其中包含模型和数据库连接

// const connection = mysql.createConnection({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB
// })
//
// connection.connect(error => {
//   if (error) throw error;
//   console.log('Successfully connected to the database.')
// })
//
// module.exports = connection;