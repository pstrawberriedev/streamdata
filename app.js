var fs = require('fs');
var moment = require('moment');
var CronJob = require('cron').CronJob;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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


//Output Date
function outputDate() {
  var currentDate = moment().format('MM/DD/YY'); //Monday, Dec 21st 2015
  fs.writeFile("./data/date.txt", currentDate, function(err) {
      if(err) {return console.log(err);}
      console.log(currentDate);
  });
}
//Output Time
function outputTime() {
  var currentTime = moment().format('h:mm a');
  fs.writeFile("./data/time.txt", currentTime, function(err) {
      if(err) {return console.log(err);}
      console.log(currentTime);
  });
}

//Initial Population
console.log('++++++++++++++++++++++++++++++');
console.log('Cron Started');
console.log('++++++++++++++++++++++++++++++');
outputDate();
outputTime();

//Cron Tasks
var job = new CronJob('*/30 * * * * *', function() {
  //Run Every 30 Seconds
  outputDate();
  outputTime();
  }, function () {
    console.log('*******************');
    console.log('Cron Stopped!');
    console.log('*******************');
  },
  true, /* Start the job right now */
  'America/Denver' /* Time zone of this job. */
);