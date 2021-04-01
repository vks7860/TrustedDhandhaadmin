exports.validHeaderNeeded = (req, res, next) => {
	next()
    /* const redis     =   require('redis')
    const moment    =   require('moment')
    const config    =   require("../../conf/config");
    const redisClient = redis.createClient({
        host : config.redis_host,  
        no_ready_check: true,
        auth_pass: config.redis_password                                                 
    });
    let ip = req.ip.split(':');
    let userip = ip[3];
    redisClient.exists(userip,(err,reply) => {
        if(err) {
          system.exit(0)
        }
        if(reply === 1){
          // user exists
          // check time interval
          redisClient.get(userip,(err,reply) => {
            let data = JSON.parse(reply)
            let currentTime = moment().unix()
            let difference = (currentTime - data.startTime)
            if(difference >= 1){
              let body = {
                'count': 1,
                'startTime': moment().unix()
              }
              redisClient.set(userip,JSON.stringify(body))
              // allow the request
              next()
            }
            if(difference < 1) {
              if(data.count > 4){   // 5 requests per second
                return res.json({"error": 1, "message": "throttled limit exceeded..."})
              }
              // update the count and allow the request
              data.count++
              redisClient.set(userip,JSON.stringify(data))
              // allow request
              next()
            }
          })
        }else{
          // add new user
          let body = {
            'count': 1,
            'startTime': moment().unix()
          }
          redisClient.set(userip,JSON.stringify(body))
          // allow request
          next()
        }
    }) */
};