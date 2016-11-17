exports.index = function(req, res){
	exports.engine = 'ejs';
	res.render('template.ejs', null);
};