var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var options = { server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } };

// mongoose.connect('mongodb://localhost:27017/kohactive');

var mongodbUri = 'mongodb://heroku_app37547530:fph4r437djtt61jrdeldcgjo7t@ds043952.mongolab.com:43952/heroku_app37547530';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);

var db = mongoose.connection;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
    var Post = require('./models/post')

    var first = new Post({
        title: 'First Post',
        author: 'Tom',
        body: 'I\'m just going to put some seed data here in app.js.'
    });

    var second = new Post({
        title: 'Next Post',
        author: 'Nullet',
        body: 'This is much simpler than inputting data through the console.'
    });

    var third = new Post({
        title: 'last post',
        author: 'tom',
        body: 'There still has to be a better way to seed data than this.'
    });

    first.save();
    second.save();
    third.save();

});

var routes = require('./routes/index');
var users = require('./routes/users');
var kohactive = require('./routes/kohactive');
var posts = require('./routes/posts')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/kohactive', kohactive);
app.use('/posts', posts)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
