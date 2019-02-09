global.__base = __dirname + '/';

let express        = require('express');
let bodyParser     = require('body-parser');
let path = require('path');
let app  = express();
let port = 8181;
var cors = require('cors')

app.use(cors());
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__base, '/app/ngApp/dist')));

require(path.join(__base, 'app/proxy'))(app, {});

app.listen(port, () => {
    console.log('We are live on ' + port);
});