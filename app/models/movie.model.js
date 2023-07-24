module.exports = (sequelize, Sequelize) => {
  const Movie = sequelize.define(
    'movie',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      movie_id: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: false,
    }
  )

  return Movie
}
//
// const sql = require('./index.js');
//
// // 创建电影对象
// const Movies = function({movie_id, name}) {
//   this.movie_id = movie_id; // 电影ID
//   this.name = name; // 电影名称
// }
//
// // 获取所有电影
// Movies.getAll = result => {
//   sql.query(`SELECT * FROM movies`, (error, results) => {
//     if (error) throw error;
//     result(null, results);
//   })
// }
//
// // 根据ID更新电影
// Movies.updateById = (id, movie, result) => {
//   sql.query(`UPDATE movies SET name = ? WHERE movie_id = ?`, [movie.name, id], (error, results) => {
//     if (error) throw error;
//     result(null, results);
//   })
// }
//
// // 创建新电影
// Movies.create = (movie, result) => {
//   sql.query(`INSERT INTO movies (movie_id, name) VALUES (?, ?)`, [movie.movie_id, movie.name], (error, results) => {
//     if (error) throw error;
//     result(null, results);
//   })
// }
//
// // 根据ID查找电影
// Movies.findById = (id, result) => {
//   sql.query(`SELECT * FROM movies WHERE movie_id = ?`, [id], (error, results) => {
//     if (error) throw error;
//     result(null, results);
//   })
// }
//
// // 根据ID删除电影
// Movies.remove = (id, result) => {
//   sql.query(`DELETE FROM movies WHERE movie_id = ?`, [id], (error, results) => {
//     if (error) throw error;
//     result(null, results);
//   })
// }
//
// // 删除所有电影
// Movies.removeAll = result => {
//   sql.query(`DELETE FROM movies`, (error, results) => {
//     if (error) throw error;
//     result(null, results);
//   })
// }
//
// module.exports = Movies;
