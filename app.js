var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv')
const session = require('express-session');
const {verifyAdmin} = require('./middlewares/auth');

dotenv.config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const miembros = require('./routes/miembros');
const aplicar = require('./routes/aplicar');
const login = require('./routes/login');
const builds = require('./routes/builds');
const videos = require('./routes/videos');
const adminMiembros = require('./routes/admin/adminMiembros');
const adminBuilds = require('./routes/admin/adminBuilds');
const adminInicio = require('./routes/admin/adminInicio');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret : 'PARADLSE',
  cookie : {maxAge: null},
  resave: true,
  saveUninitialized : false
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/miembros', miembros);
app.use('/aplicar', aplicar);
app.use('/builds', builds);
app.use('/login', login);
app.use('/videos', videos);
app.use('/admin',verifyAdmin , adminInicio);
app.use('/admin/adminMiembros', adminMiembros);
app.use('/admin/adminBuilds', adminBuilds);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
