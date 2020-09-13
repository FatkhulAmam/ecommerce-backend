const db = require('../helpers/db')
const table1 = 'cart'
const table2 = 'user'
const table3 = 'items'

module.exports = {
  createCartModel: (arr, cb) => {
    db.query(`INSERT INTO ${table1} (user_id, items_id) VALUES (${arr[0]}, ${arr[1]})`, (err, result, field) => {
      cb(err, result)
    })
  },
  getCartModel: (arr, sort, num, cb) => {
    db.query(`
    SELECT ${table1}.id, ${table2}.user_name, ${table2}.email, ${table3}.name, ${table3}.price
    FROM ${table1} 
    INNER JOIN ${table2} ON ${table1}.user_id = ${table2}.id
    INNER JOIN ${table3} ON ${table1}.items_id = ${table3}.id
    WHERE ${arr[0]} 
    LIKE '%${arr[1]}%' 
    ORDER BY ${sort[0]} ${sort[1]} 
    LIMIT ${num[0]} 
    OFFSET ${num[1]}`,
    (_err, result, field) => {
      cb(_err, result)
    })
  },
  searchCartModel: (search, sort, cb) => {
    db.query(`SELECT COUNT(*) AS count FROM ${table1} WHERE ${search[0]} LIKE '%${search[1]}%' ORDER BY ${sort[0]} ${sort[1]} `, (_err, result, field) => {
      cb(result)
    })
  },
  getCartUserModel: (id, cb) => {
    db.query(`
    SELECT * FROM ${table1}
    WHERE id=${id}`, (err, result, field) => {
      cb(err, result)
    })
  }
}
