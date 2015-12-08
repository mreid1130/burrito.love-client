// // modules =================================================
// var express = require('express');
// var app = express();
// var port = process.env.PORT || 8081;
// var environment = process.env.NODE_ENV || 'development';
// var mongoose = require('mongoose');
// var flash = require('connect-flash');
// var morgan = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');
// var session = require('express-session');
// var methodOverride = require('method-override');
// // var cors = require('cors');
// var fs = require('fs');

// // configuration ===========================================

// // Allow cross-origin resource sharing
// // app.use(cors());

// app.use(morgan('dev'));
// app.use(cookieParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

// app.set('view engine', 'ejs');

// // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
// app.use(methodOverride('X-HTTP-Method-Override'));

// app.use(express.static(__dirname + '/public'));

// app.use(session({
//   secret: 'burritoLove',
//   name: 'burrito-love',
//   resave: false,
//   saveUninitialized: false
// }));

// // routes ==================================================
// require('./controllers/routes/routes')(app);

// // start app ===============================================
// app.listen(port);
// console.log('listening on port', port);

////////////////////
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

require('./controllers/routes/routes')(app);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

exports = module.exports = app;
