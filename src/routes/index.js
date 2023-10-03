const express = require('express');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
const imageRouter = require('./image.router');
const cartRouter = require('./cart.router');
const purchaseRouter = require('./puchase.router');
const router = express.Router();

// colocar las rutas aquí
router.use('/user', userRouter);
router.use('/category', categoryRouter)
router.use('/product', productRouter)
router.use('/product_images', imageRouter)
router.use('/cart', cartRouter)
router.use('/purchases', purchaseRouter)

module.exports = router;