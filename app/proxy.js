let path = require('path');
const request = require('request');

module.exports = (app) => {

  function options(method, token) {
    return {
      method: 'GET',
      uri: 'https://api.vk.com/method/' + method + '&access_token=' + token + '&v=5.52',
    }
  }

  app.get('/app/getfriends:token', (req, res) => {
    request(options('friends.search?count=10&fields=bdate,city,country,photo_100,contacts,education,online', req.params.token),
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