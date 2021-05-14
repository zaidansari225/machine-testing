const db=require('../utils/database');
module.exports={
    addProduct:(async (product) => {
        return db.query('INSERT INTO product set ?',[product])
    }),
    findProductById:(async (id) => {
        return db.query('SELECT * FROM product WHERE id = ?',[id])
    }),
    deleteProductById:(async (id) => {
        return db.query('DELETE FROM product WHERE id = ?',[id])
    }),
    updateProductById:(async (name,price,desc,id) => {
        return db.query('UPDATE product SET  name = ?, price = ?,description =? WHERE id =?',[name,price,desc,id])
    }),
    findProductByName:(async  (name) => {
        return db.query('SELECT * FROM product WHERE name = ?',[name])
    }),
    findAllProduct:(async () => {
        return db.query('SELECT * FROM product')
    })
}