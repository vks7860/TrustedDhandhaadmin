'user strict';

var exchangeModel = require('../../models/v1/exchangeModel.js');
var config = require('../../../conf/config.js');
var userDefinedFunction = require('../../../lib/user_defined_function.js');
//Exchange object constructor
var Exchange = function(use){

};

Exchange.cmcAssets =  async function(result){
    const res   =   await exchangeModel.cmcAssets();
	result(null, res);
}



Exchange.category =  async function(result){
    const res   =   await exchangeModel.category();
	result(null, res);
}


Exchange.subcategory =  async function(result){
    const res   =   await exchangeModel.subcategory();
	result(null, res);
}
Exchange.add_category =  async function(result){
    const res   =   await exchangeModel.add_category();
	result(null, res);
}

module.exports= Exchange;