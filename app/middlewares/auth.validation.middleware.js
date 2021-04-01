const jwt       =   require("jsonwebtoken");
const config    =   require("../../conf/config");
const crypto = require('crypto');
exports.validJWTNeeded = async (req, res, next) => {
    if(req.headers['authorization']){
        try{
            let authorization = req.headers['authorization'].split(' ');
            if(authorization[0] !== 'Bearer'){
                return res.status(401).send();
            }else{
                req.jwt = jwt.verify(authorization[1], config.jwt_secret);
                return next();
            }
        }catch(err){
           return res.status(403).send();
        }
    }else if(req.headers['sh-api-key']){
        let api_key         = req.headers['sh-api-key'];
        let signature       = req.headers['sh-api-sign'];
        let timestamp       = req.headers['sh-api-timestamp'];
        let method          = req.method;
        var request_path = req.protocol + '://' + req.get('host') + req.originalUrl;
        let body            = req.body;
        if(method == 'GET' || method == 'DELETE'){
            var what = timestamp + method + request_path+'';
        }else{
            var what = timestamp + method + request_path+JSON.stringify(body);
        }
        
        var userInfo = require('../controllers/v1/userInfoController')
        var userDetail = await userInfo.getUserInfo(encrypt(api_key))
        if(typeof userDetail !== 'undefined' && userDetail.length > 0){
            let secret = decrypt(userDetail[0]['secret']);
            let hash = crypto.createHmac('sha256',secret).update(what).digest("base64");
            if(hash == signature){
                let token = jwt.sign({userid: userDetail[0]['user_id'],email: userDetail[0]['email']},
                                config.jwt_secret,
                                { expiresIn: '24h'}
                            );
                req.jwt  = jwt.verify(token, config.jwt_secret);
                //API KEY Details
                var authority       = userDetail[0]['authority'];
                var ip_limit_type   = userDetail[0]['ip_limit_type'];
                var trusted_ip      = userDetail[0]['trusted_ip'];
                var status          = userDetail[0]['status'];
                //Check api key is activated
               
                if(status == 0){
                    return res.status(401).send();
                }
                //Check Read information permission is enabled
                if(checkExist(authority,'read_information')){
                    if(ip_limit_type == 'trusted_ip'){
                        //Check ip is restricted
                        if(trusted_ip !== '' && trusted_ip != null){
                            let ip = req.ip.split(':');
                            let userip = ip[3];
                            if(checkExist(trusted_ip,userip)){
                                return next();
                            }else{
                                return res.status(401).send();
                            }
                        }else{
                            return res.status(401).send();
                        }
                    }else{
                        return next();
                    }
                }else{
                    return res.status(401).send();
                }
               // return next();
            }else{
                return res.status(401).send();
            }
        }else{
            return res.status(401).send();
        }
    }else{
        return res.status(401).send();
    }
};

function checkExist(string,value){
    var str = string;
    var split_str = str.split(",");
    if (split_str.indexOf(value) !== -1) {
        return true;
    }
    return false;
}

function encrypt(plaintext){
    var password    = config.cbc_encrypt_key;
    var iv          = config.cbc_encrypt_iv;
    var key = passwordDeriveBytes(password, '', 100, 32);
    var cipher = crypto.createCipheriv('aes-256-cbc', key, Buffer.from(iv));
    var part1 = cipher.update(plaintext, 'utf8');
    var part2 = cipher.final();
    var encrypted = Buffer.concat([part1, part2]).toString('base64');
    return encrypted;
}

function decrypt(plaintext){
    var password    = config.cbc_encrypt_key;
    var iv          = config.cbc_encrypt_iv;
    var key         = passwordDeriveBytes(password, '', 100, 32);
    var decipher    = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv));
    var decrypted   = decipher.update(plaintext, 'base64', 'utf8');
    decrypted += decipher.final();
    return decrypted;
}

function sha1(input) {
    return crypto.createHash('sha256').update(input).digest();
}

function passwordDeriveBytes(password, salt, iterations, len){
    var key = Buffer.from(password + salt);
    for(var i = 0; i < iterations; i++) {
        key = sha1(key);
    }
    if (key.length < len){
        var hx = passwordDeriveBytes(password, salt, iterations - 1, 20);
        for (var counter = 1; key.length < len; ++counter) {
            key = Buffer.concat([key, sha1(Buffer.concat([Buffer.from(counter.toString()), hx]))]);
        }
    }
    return Buffer.alloc(len, key);
}

