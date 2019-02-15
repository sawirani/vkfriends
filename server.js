global.__base = __dirname + '/';

let express        = require('express');
let bodyParser     = require('body-parser');
let passport = require('passport');
let path = require('path');
let app  = express();
let port = 8181;
var cors = require('cors')

const VKontakteStrategy = require('passport-vkontakte').Strategy;

// User session support middlewares. Your exact suite might vary depending on your app's needs.
app.use(require('cookie-parser')());
app.use(require('express-session')({secret:'keyboard cat', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__base, '/app/ngApp/dist')));

var conf={
    clientID:'6850358',
    clientSecret:'bVU6fZW3TfR4pH7j0ceB',
    callbackURL: 'localhost:8181/users'
}
var calback =   function(accessToken, refreshToken, params, profile, done) {
    console.log(accessToken, refreshToken, params, profile, done);
  }

passport.use(new VKontakteStrategy(conf,calback));

app.get('/auth/vk',
passport.authenticate('vkontakte'),
  function(req, res){
});

//   app.get('/auth/vk/callback',
//   function(req, res) {
//       res.send('adsad')
//      console.log(res.access_token);
//      res.redirect('/app/');
//   });

require(path.join(__base, 'app/proxy'))(app, {});

app.listen(port, () => {
    console.log('We are live on ' + port);
});