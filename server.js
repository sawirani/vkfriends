global.__base = __dirname + '/';

let express = require('express');
let bodyParser = require('body-parser');
let passport = require('passport');
let path = require('path');
let app = express();
let port = 8181;
let cors = require('cors')

// User session support middlewares. Your exact suite might vary depending on your app's needs.
app.use(require('cookie-parser')());
app.use(require('express-session')({secret: 'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__base, '/app/ngApp/dist')));

require(path.join(__base, 'app/proxy'))(app, {});

app.listen(port, () => {
    console.log('We are live on ' + port);
});