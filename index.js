/**
 * Node.js MVC server
 * Controllers are in /lib/boot
 */
var express = require('express');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
// app variable
var app = module.exports = express();
// port
app.set('port', (process.env.PORT || 5000));
// set our default template engine to "jade"
// which prevents the need for extensions
app.set('view engine', 'jade');
// set views for error and 404 pages
app.set('views', __dirname + '/views');
// define a custom response.message() method
// which stores messages in the session
app.response.message = function(msg){
  // reference `req.session` via the `this.req` reference
  var sess = this.req.session;
  // simply add the msg to an array for later
  sess.messages = sess.messages || [];
  sess.messages.push(msg);
  return this;
};
// log
if (!module.parent) app.use(logger('dev'));
// serve static files
app.use(express.static(__dirname + '/public'));
// session support
app.use(session({
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'some secret here'
}));
// parse request bodies (req.body)
app.use(bodyParser.urlencoded({ extended: true }));
// allow overriding methods in query (?_method=put)
app.use(methodOverride('_method'));
// expose the "messages" local variable when views are rendered
app.use(function(req, res, next){
  var msgs = req.session.messages || [];
  // expose "messages" local variable
  res.locals.messages = msgs;
  // expose "hasMessages"
  res.locals.hasMessages = !! msgs.length;
  /* This is equivalent:
   res.locals({
     messages: msgs,
     hasMessages: !! msgs.length
   });
  */
  next();
  // empty or "flush" the messages so they
  // don't build up
  req.session.messages = [];
});
// load controllers
require('./lib/boot')(app, { verbose: !module.parent });
app.use(function(err, req, res, next){
  // if there is no module /controller/
  if (!module.parent) console.error(err.stack);
  // error page
  res.status(500).render('5xx');
});
// assume 404 since no middleware responded
app.use(function(req, res, next){
  res.status(404).render('404', { url: req.originalUrl });
});
/* istanbul ignore next */
if (!module.parent) {
  app.listen(app.get('port'), function() {
		console.log('Node app is running on port', app.get('port'));
	});
}


