exports.view = function(req, res){
	exports.engine = 'ejs';
	res.render('template.ejs', null);
};