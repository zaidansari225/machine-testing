const db=require('../utils/database')
module.exports={
    addUser:(async (user) => {
  return db.query('INSERT INTO user set ?',[user])
    }),
    findUserByEmail:(async (email) => {
        return db.query('SELECT * FROM user WHERE email = ?',[email])
    })
}