'use strict';
var exchangeService = require('../../services/v1/exchangeService.js');
var userDefinedFunction = require('../../../lib/user_defined_function.js');
const { check,body,validationResult } = require('express-validator')
exports.validate = (method) => {
  	switch (method) {
		case 'cmcAssets': {
			return [
				//body('name', 'Name is required.').not().isEmpty(),		
				check('name', 'Name is required.').not().isEmpty(),		
			]    
		}
		case 'category': {
			return [
				//body('name', 'Name is required.').not().isEmpty(),		
				check('category', 'category is required.').not().isEmpty(),		
			]    
		}
		
		case 'subcategory': {
			return [
				//body('name', 'Name is required.').not().isEmpty(),		
				check('subcategory', 'category is required.').not().isEmpty(),		
			]    
		}
		
		case 'add_category': {
			return [
				//body('name', 'Name is required.').not().isEmpty(),		
				check('category_name', 'category_name is required.').not().isEmpty(),		
				check('category_image', 'category_image is required.').not().isEmpty(),		
			]    
		}
		
	}
}


exports.cmcAssets = async function(req, res){
	try {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			var errorsList		=	errors.array();
			var errorSring	=	"";
			for(const error of errorsList){
				errorSring	+=	error["msg"]+",";
			}
			res.status(200).json({"error":errorSring.substring(0, errorSring.length - 1)});
			return;
		}
		await exchangeService.cmcAssets(function(err, result) {
			if (err)
			res.send(err);
			res.json(result);
		});
	}catch(err){
		res.send(err);
	}
};


exports.category = async function(req, res){
	try {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			var errorsList		=	errors.array();
			var errorSring	=	"";
			for(const error of errorsList){
				errorSring	+=	error["msg"]+",";
			}
			res.status(200).json({"error":errorSring.substring(0, errorSring.length - 1)});
			return;
		}
		await exchangeService.category(function(err, result) {
			if (err)
			res.send(err);
			res.json(result);
		});
	}catch(err){
		res.send(err);
	}
	
};
exports.subcategory = async function(req, res){
	try {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			var errorsList		=	errors.array();
			var errorSring	=	"";
			for(const error of errorsList){
				errorSring	+=	error["msg"]+",";
			}
			res.status(200).json({"error":errorSring.substring(0, errorSring.length - 1)});
			return;
		}
		await exchangeService.subcategory(function(err, result) {
			if (err)
			res.send(err);
			res.json(result);
		});
	}catch(err){
		res.send(err);
	}
};


exports.add_category = async function(req, res){
	try {
		const errors = validationResult(req);
		if(!errors.isEmpty()) {
			var errorsList		=	errors.array();
			var errorSring	=	"";
			for(const error of errorsList){
				errorSring	+=	error["msg"]+",";
			}
			res.status(200).json({"error":errorSring.substring(0, errorSring.length - 1)});
			return;
		}
		await exchangeService.add_category(function(err, result) {
			if (err)
			res.send(err);
			res.json(result);
		});
	}catch(err){
		res.send(err);
	}
};