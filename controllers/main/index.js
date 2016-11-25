exports.index = (req, res, next) => {
	exports.engine = 'ejs';
	res.render('template.ejs', null);
};

exports.about = (req, res, next) => {
	exports.engine = 'ejs';
	res.render('about.ejs', null);
};
