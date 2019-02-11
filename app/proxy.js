let path = require('path');
const request = require('request');
const token = 'ff121c190332f9d716771933c1a15562be84ddfa4310a0b066f02fc9b0dcac18dc323f66d0af775951372';

module.exports = (app) => {

  function options(method, token) {
    return {
      method: 'GET',
      uri: 'https://api.vk.com/method/' + method + '&access_token=' + token + '&v=5.52',
    }
  }

  app.get('/app/getfriends', (req, res) => {
    request(options('friends.search?count=10&fields=bdate,city,country,photo_100,contacts,education,online', token),
      function (error, response, body) {
        if (response.statusCode === 200) {
          body = JSON.parse(body);
          res.json({status: 'Ok', data: body.response})
        } else {
          res.json({status: 'error', error: response.statusCode, body: body})
        }
      })
  });

  app.get('/app*', (req, res) => {
    res.sendFile(path.join(__base, '/app/ngApp/dist/index.html'));
  });
};


//gettoken : 

// https://oauth.vk.com/authorize?client_id=6850358&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token&v=5.52