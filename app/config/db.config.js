module.exports = {
  HOST: '127.0.0.1', // 主机地址
  // HOST: 'localhost',
  USER: 'root', // 用户名
  PASSWORD: '123456', // 密码
  DB: 'board', // 数据库名称
  dialect: 'mysql', // 使用的数据库方言
  pool: {
    max: 5, // 连接池中最大连接数量
    min: 0, // 连接池中最小连接数量
    acquire: 30000, // 连接池在抛出错误之前尝试获取连接的最长时间（以毫秒为单位）
    idle: 10000 // 连接在被释放之前可以空闲的最长时间（以毫秒为单位）
  }
}
