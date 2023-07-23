const db = require('../models')
const movies = db.movies;
const op = db.Sequelize.Op;

// const e = require('express');
// const movies = require('../models/movie.model.js');

// 创建新的电影条目
exports.create = (req, res) => {
  // 如果请求体为空，则返回400状态码和错误消息
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
  }

  // 创建新的电影对象
  const movie = new movies({
    movie_id: req.body.movie_id,
    name: req.body.name
  })

  // 在数据库中创建新的电影条目
  movies.create(movie, (error, data) => {
    // 如果出现错误，则返回500状态码和错误消息
    if (error) {
      res.status(500).send({
        message: error.message || 'Some error occurred while creating the movie.'
      })
    } else {
      // 否则，返回创建的电影数据
      res.send(data)
    }
  })
}

// 获取所有电影条目
exports.findAll = (req, res) => {
  movies.findAll((error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || 'Some error occurred while retrieving movies.'
      })
    } else {
      res.send(data)
    }
  })
}

// 根据ID获取单个电影条目
exports.findOne = (req, res) => {
  movies.findById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === 'not_found') {
        res.status(404).send({
          message: `Not found movie with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: `Error retrieving movie with id ${req.params.id}.`
        })
      }
    } else {
      res.send(data)
    }
  })
}

// 更新电影条目
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    })
  }

  movies.updateById(req.params.id, new movies(req.body), (error, data) => {
    if (error) {
      if (error.kind === 'not_found') {
        res.status(404).send({
          message: `Not found movie with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: `Error updating movie with id ${req.params.id}.`
        })
      }
    } else {
      res.send(data)
    }
  })
}

// 删除电影条目
exports.delete = (req, res) => {
  movies.remove(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === 'not_found') {
        res.status(404).send({
          message: `Not found movie with id ${req.params.id}.`
        })
      } else {
        res.status(500).send({
          message: `Could not delete movie with id ${req.params.id}.`
        })
      }
    } else {
      res.send({ message: `Movie was deleted successfully!` })
    }
  })
}

// 删除所有电影条目
exports.deleteAll = (req, res) => {
  movies.removeAll((error, data) => {
    if (error) {
      res.status(500).send({
        message: error.message || 'Some error occurred while removing all movies.'
      })
    } else {
      res.send({ message: `All movies were deleted successfully!` })
    }
  })
}
