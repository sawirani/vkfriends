let path = require('path');

module.exports = (app) => {

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200/app');
    res.redirect("https://yandex.ru");
    next();
  });

  app.get('/app/test', (req, res) => {
    let data = {name: 'Настя', 'lastname': 'Сопина'};
    res.json({status: "OK", data: data});
  });

  app.get('/app*', (req, res) => {
    res.sendFile(path.join(__base, '/app/ngApp/dist/index.html'));
  });


  /**** Example ***
   app.post('/api/storeTestData', async (req, res) => {
        try {
            let data = await testing.storeTestData(req.body);
            res.send({status: "OK", data: data});
        } catch (error) {
            res.send(error);
        }
    });

   app.get('/api/service-poc', async (req, res) => {
        try {
            let data = await utils.getPoc(req.query);
            res.send({status: "OK", data: data});
        } catch (error) {
            res.send(error);
        }
    });
   */
};