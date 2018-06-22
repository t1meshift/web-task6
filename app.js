let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');
let config = require('./config');
let routers = config.routers;

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/popperjs', express.static(__dirname + '/node_modules/popper.js/dist/'));

app.use('/api', routers.api);
app.use('/user', routers.user);
app.use('/users', routers.users);
app.use('/', routers.users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.task = config.siteName;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
