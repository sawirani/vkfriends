let path = require('path');
const request = require('request-promise');

let userCount = 10;

module.exports = (app) => {

    function options(method, token) {
        return {
            method: 'GET',
            uri: 'https://api.vk.com/method/' + method + '&access_token=' + token + '&v=5.52',
        }
    }

    app.get('/test', (req, res) => {
        res.json({status: 'Ok'})
    });

    app.get('/app/getUser:token&:id', (req, res) => {
        if (req.params) {
            if (req.params.token) {
                if (req.params.id) {
                    request(options('users.get?&user_ids=' + req.params.id + '&fields=bdate,city,country,photo_400_orig,contacts,education,sex,counters,movies,music,about,activities,books,interests', req.params.token))
                        .then(function (response) {
                            const body = JSON.parse(response);
                            res.json({status: 'Ok', data: body.response})
                        })
                        .catch((error) => {
                            res.json({status: 'error', error: error})
                        })
                } else {
                    res.json({status: 'error', error: 'нет id'});
                }
            } else {
                res.json({status: 'error', error: 'нет токена'});
            }
        } else {
            res.json({status: 'error', error: 'нет пареметров'});
        }
    });

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

    app.get('/app/getfriends:token&:num', async function (req, res) {
        let offset = (req.params.num) * (userCount);
        let result;
        result = await request(options('friends.search?count=' + userCount + '&fields=city,photo_100&offset=' + offset, req.params.token));
        const body = JSON.parse(result);
        res.json({status: 'Ok', data: body.response});
    });

    app.get('/app/searchUsers:token&:str&:num', (req, res) => {
        let offset = (req.params.num) * (userCount);
        request(options('friends.search?&q=' + encodeURIComponent(req.params.str) + '&fields=city,photo_100&count=' + userCount + '&offset=' + offset, req.params.token))
            .then((response) => {
                const body = JSON.parse(response);
                res.json({status: 'Ok', data: body.response})
            })
            .catch((error) => {
                res.json({status: 'error', error: error})
            })
    });

    app.get('/app/filter:token&:param&:num', function (req, res) {
        let offset = (req.params.num) * (userCount);
        request(options('friends.get?order=name&fields=city,photo_100', req.params.token))
            .then((data) => {
                const body = JSON.parse(data);
                body.response.items.sort((first, second) => {
                    return first[req.params.param].localeCompare(second[req.params.param]);
                });
                console.log(body);
                let result = [];
                for (let i = offset; i < userCount + offset; i++) {
                    result.push(body[i]);
                }

                res.json({status: 'Ok', data: {items: result}});
            });
    });

    const conf = {
        clientID: '6850358',
        clientSecret: 'bVU6fZW3TfR4pH7j0ceB',
        callbackURL: 'localhost:8181/users'
    };

    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', 'https://oauth.vk.com');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.get('/auth/vk', (req, res) => {
        res.redirect('https://oauth.vk.com/authorize?client_id=6850358&display=page&redirect_uri=localhost:8181/auth/vk/callback&scope=friends&response_type=code&v=5.92')
    });

    app.get('/auth/vk/callback', (req, res) => {
        res.send({ok: 'ok'})
    });

    app.get('/app*', (req, res) => {
        res.sendFile(path.join(__base, '/app/ngApp/dist/index.html'));
    });

};