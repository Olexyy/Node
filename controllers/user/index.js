/**
 * Module dependencies.
 */

//var db = require('../../db');

var pg = require('pg');
var connStr = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/postgres';
var conUri ="postgres://cixieeokomqzmo:LQsnjqm9C0D8z10cTuovItu0HT@ec2-54-83-44-117.compute-1.amazonaws.com:5432/d7rgmijffbh24m";
console.log("!!!!!!!"+process.env.DATABASE_URL);
console.log("!!!!!!!"+pg);
console.log("!!!!!!!"+connStr);
exports.before = function(req, res, next){
  var id = req.params.user_id;
  if (!id) return next();
  // pretend to query a database...
  process.nextTick(function(){
    req.user = db.users[id];
    // cant find that user
    if (!req.user) return next('route');
    // found it, move on to the routes
    next();
  });
};

exports.list = function(req, res, next){
	pg.connect(connStr, function(err, client, done) {
		client.query('SELECT * FROM employees', function(err, result) {
			done();
			if (err) {
				console.error(err); 
				res.send("Error " + err);
			}
			else{
				res.render('list', { users: result.rows } );
			}
		});
	});
};

exports.edit = function(req, res, next){
  res.render('edit', { user: req.user });
};

exports.show = function(req, res, next){
  res.render('show', { user: req.user });
};

exports.update = function(req, res, next){
  var body = req.body;
  req.user.name = body.user.name;
  res.message('Information updated!');
  res.redirect('/user/' + req.user.id);
};