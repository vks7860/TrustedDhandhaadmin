'user strict';
var sql = require('../../../conf/db.js');
//Exchange object constructor
var Exchange = function(use){

};

Exchange.cmcAssets =  async function(result){
    return new Promise((resolve) => {
		sql.query("select * from users", function (err, res) {
            if(!err){
                resolve(res);
            }else{
                resolve([]);
            }
        });
    });
}




Exchange.category =  async function(result){
    return new Promise((resolve) => {
		sql.query("select * from category", function (err, res) {
            if(!err){
                resolve(res);
            }else{
                resolve([]);
            }
        });
    });
}


Exchange.subcategory =  async function(result){
    return new Promise((resolve) => {
		sql.query("select * from sub_category", function (err, res) {
            if(!err){
                resolve(res);
            }else{
                resolve([]);
            }
        });
    });
}


Exchange.add_category =  async function(result){
    return new Promise((resolve) => {
		sql.query("insert into category(category_name,category_image) values('automobile','https://www.vikas.png')", function (err, res) {
            if(!err){
                resolve(res);
            }else{
                resolve([]);
            }
        });
    });
}

module.exports= Exchange;
