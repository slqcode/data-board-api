const db = require('../models')
const movies = db.movies
// 使用Sequelize的操作符
const op = db.Sequelize.Op

// 创建新的电影条目
exports.create = (req, res) => {
  // 如果请求体为空，则返回400状态码和错误消息
  // 如果请求体为空，返回400状态码和错误消息
  if (!req.body) {
    res.status(400).send({
      message: '内容不能为空！',
    })
  }

  const movie = {
    movie_id: req.body.movie_id,
    name: req.body.name,
  }

  // 在数据库中创建新的电影条目
  movies
    .create(movie)
    .then((data) => {
      res.send(data)
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || '创建电影时发生了一些错误。',
      })
    })
}

// 获取所有电影条目
exports.findAll = (req, res) => {
  const name = req.query.name
  const condition = name ? { name: { [op.like]: `%${name}%` } } : null

  // 从数据库中检索所有电影
  movies
    .findAll({ where: condition })
    .then((data) => {
      res.send(data)
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || '检索电影时发生了一些错误。',
      })
    })
}

// 根据ID获取单个电影条目
exports.findOne = (req, res) => {
  const id = req.params.id

  // 从数据库中查找单个电影，find by primary key
  movies
    .findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `找不到id=${id}的电影。`,
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: '检索id=' + id + '的电影时出错',
      })
    })
}

exports.findById = (req, res) => {
  const id = req.params.id

  movies
    .findOne({
      where: {
        movie_id: id,
      },
    })
    .then((data) => {
      if (data) {
        res.send(data)
      } else {
        res.status(404).send({
          message: `找不到id=${id}的电影。`,
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: '检索id=' + id + '的电影时出错',
      })
    })
}

// 更新电影条目
exports.update = (req, res) => {
  const id = req.params.id

  // 更新数据库中的电影
  movies
    .update(req.body, {
      where: {
        movie_id: id,
      },
    })
    .then((data) => {
      console.log('update data', data)
      if (data) {
        res.send({
          message: '电影已成功更新。',
        })
      } else {
        res.send({
          message: `无法更新id=${id}的电影。可能电影未找到或req.body为空！`,
        })
      }
    })
    .catch(() => {
      res.status(500).send({
        message: '更新id=' + id + '的电影时出错',
      })
    })
}

// 删除电影条目
exports.delete = (req, res) => {
  const id = req.params.id

  // 从数据库中删除电影
  movies
    .destroy({
      where: { movie_id: id },
    })
    .then((data) => {
      if (data) {
        res.send({
          message: '电影已成功删除！',
        })
      } else {
        res.send({
          message: `无法删除id=${id}的电影。可能电影未找到！`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: '删除id=' + id + '的电影时出错' + err,
      })
    })
}

// 删除所有电影条目
exports.deleteAll = (req, res) => {
  // 从数据库中删除所有电影
  movies
    .destroy({
      where: {},
      truncate: false,
    })
    .then((data) => {
      res.send({ message: `${data}部电影已成功删除！` })
    })
    .catch((error) => {
      res.status(500).send({
        message: error.message || '删除所有电影时发生了一些错误。',
      })
    })
}
