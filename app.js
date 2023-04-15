var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
var passport=require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter=require('./routes/dishesRouter');
var uploadRouter=require('./routes/UploadRouter');
var commentRouter=require('./routes/commentRouter');
var orderRouter=require('./routes/orderRouter');
var orderdishRouter=require('./routes/orderdishRouter');
var reveiwRouter=require('./routes/reveiwRouter');
var mongoose= require('mongoose');

const connect=mongoose.connect('mongodb+srv://root:root@cluster0.g9gqqdk.mongodb.net/?retryWrites=true&w=majority',{
  useCreateIndex:true,
  useNewUrlParser:true,
  useUnifiedTopology:true
});
connect.then((db)=>{
  console.log('connection On');
},(err)=>console.log(err));

var app = express();

app.use(passport.initialize());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dishes',dishRouter);
app.use('/comments',commentRouter);
app.use('/orders',orderRouter);
app.use('/orderdish',orderdishRouter);
app.use('/upload',uploadRouter);
app.use('/reveiw',reveiwRouter);
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
