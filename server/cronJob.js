const request = require('request');

var get_data = (callback) => {

    request('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20cricket.commentary%20where%20match_id%3D194615&format=json&diagnostics=true&env=store%3A%2F%2F0TxIGQMQbObzvU4Apia0V0&callback=', function(err,res,body){
    console.log(body);
    console.log('getting data')
    callback(body);
  });
};

module.exports = {get_data};
