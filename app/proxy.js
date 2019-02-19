let path = require('path');
const request = require('request');
let cors = require('cors');
let userCount = 10;

module.exports = (app) => {

  function options(method, token) {
    return {
      method: 'GET',
      uri: 'https://api.vk.com/method/' + method + '&access_token=' + token + '&v=5.52',
    }
  }

  app.put('/app/friendsCount', (req, res) => {
    if (res.req.body) {
      if (res.req.body.count) {
        userCount = res.req.body.count;
        res.json({status: 'ok', message: 'сохранили'});
      } else {
        res.json({status: 'error', error: 'нет count сообщения'});
      }
    } else {
      res.json({status: 'error', error: 'нет body сообщения'});
    }
  });

  app.get('/app/getfriends:token&:num', (req, res) => {
    let offset = (req.params.num - 1) * (userCount);
    request(options('friends.search?count=' + userCount + '&fields=bdate,city,country,photo_100,contacts,education,online&offset=' + offset, req.params.token),
      function (error, response, body) {
        if (response.statusCode === 200) {
          body = JSON.parse(body);
          //console.log(body);
          res.json({status: 'Ok', data: body.response})
        } else {
          res.json({status: 'error', error: response.statusCode, body: body})
        }
      })
  });

  var conf = {
    clientID: '6850358',
    clientSecret: 'bVU6fZW3TfR4pH7j0ceB',
    callbackURL: 'localhost:8181/users'
  }

  app.get('/auth/vk', (req, res) => {
    //'https://oauth.vk.com
    //res.setHeader('Access-Control-Allow-Origin', 'https://localhost:8181');
    console.log(req.headers.referer)
    res.redirect('https://oauth.vk.com/authorize?client_id=6850358&display=page&redirect_uri=localhost:8181/auth/vk/callback&scope=friends&response_type=code&v=5.92')
  })

  app.get('/auth/vk/callback', (req, res) => {
    console.log(res);
  })

  app.get('/app*', (req, res) => {
    res.sendFile(path.join(__base, '/app/ngApp/dist/index.html'));
  });

};