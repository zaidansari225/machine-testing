const db=require('../utils/database');
module.exports={
    addCart:(async (product) => {
        return db.query('INSERT INTO cart set ?',[product])
    }),
    findCartById:(async (user_id) => {
        return db.query('SELECT * FROM cart WHERE user_id = ?',[user_id])
    }),
    deleteCartById:(async (id) => {
        return db.query('DELETE FROM cart WHERE id = ?',[id])
    }),
    updateCartById:(async (name,price,desc,id) => {
        return db.query('UPDATE cart SET  name = ?, price = ?,description =? WHERE id =?',[name,price,desc,id])
    }),
    findCartByName:(async  (name) => {
        return db.query('SELECT * FROM cart WHERE name = ?',[name])
    }),
    findAllCart:(async () => {
        return db.query('SELECT * FROM cart');
    })
}