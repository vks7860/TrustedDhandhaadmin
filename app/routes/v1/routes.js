'use strict';
var express = require('express');
var app = express.Router();
 
var exchange   = require('../../controllers/v1/exchangesController');

app.get('/assets', exchange.validate('cmcAssets'), exchange.cmcAssets);

app.post('/category', exchange.validate('category'), exchange.category);

app.post('/subcategory', exchange.validate('subcategory'), exchange.subcategory);

app.post('/add_category', exchange.validate('category_name'),exchange.validate('category_image'), exchange.add_category);

module.exports = app;
