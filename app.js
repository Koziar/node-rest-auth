var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    passportConfig = require('./config/passport'); //(passport);
passportConfig(passport);
var path = require('path'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    jwt = require('jwt-simple');
var restApi = require('./routes/api.js'),
    routes = require('./routes/index'), // default
    users = require('./routes/users'); // default


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// log to console
app.use(logger('dev'));
// get our request parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Use the passport package in our application
app.use(passport.initialize());


app.use('/api', function (req, res, next) {
    passport.authenticate('jwt', {session: false}, function (err, user, info) {
        if (user) {
            return next();
        }
        if (err) {
            res.status(403).json({mesage: "1. Token could not be authenticated", fullError: err})
        }
        return res.status(403).json({mesage: "2. Token could not be authenticated", fullError: info});
    })(req, res, next);
});

app.use('/api', restApi);
app.use('/', routes); // default
app.use('/users', users); // default

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers:

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
