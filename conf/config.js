var config = module.exports = {};
config.db 				= {};
config.db.host 			= process.env.db_host;
config.db.dbname 		= process.env.db_dbname;
config.db.user 			= process.env.db_user;
config.db.pass 			= process.env.db_pass;
