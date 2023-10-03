const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart=require('../models/Cart');
const Product = require('../models/Product');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const results = await Purchase.findAll(
       
      { where:{userId: req.user.id},
      include:[{model:Product,
        include:[Image]}]
    } 
    );
    return res.json(results);
});


const create = catchError(async(req, res) => {
    const userId = req.user.id;
     const carts = await Cart.findAll({ 
         where: { userId },
         attributes: [ 'userId', 'productId', 'quantity' ],
         raw: true,
     });
     console.log(carts);
     const purchases = await Purchase.bulkCreate(carts);
     await Cart.destroy({ where: { userId }});
     return res.status(201).json(purchases);
 });



module.exports = {
    getAll,
    create
    
}