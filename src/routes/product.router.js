const { getAll, create, getOne, remove, update, setProductImages } = require('../controllers/product.controllers');
const express = require('express');

const productRouter = express.Router();

productRouter.route('/')
    .get(getAll)
    .post(create);

    productRouter.route('/:id/images')
    .post(setProductImages)

productRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = productRouter;