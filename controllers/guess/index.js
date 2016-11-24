exports.view = (req, res, next) => {
	exports.engine = 'ejs';
	const pg = require('pg');
	const connStr = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/postgres';
	pg.connect(connStr, function (err, client, done) {
		if (err) {
		  // pass the error to the express error handler
		  return next(err);
		}
		var id = 0;
		// select count all
		client.query('SELECT COUNT(*) as count FROM vocabulary ', [], function (err, result) {
		  done(); //this done callback signals the pg driver that the connection can be closed or returned to the connection pool
		  if (err) {
			// pass the error to the express error handler
			return next(err);
		  }
		  else{
			var count = result.rows[0].count;
			console.log('Number: ' + count);
			// Random id;
			id = Math.floor(Math.random() * (+count) + 1);
			console.log('Random number: ' + id);
			// select by id
			client.query('SELECT * FROM vocabulary WHERE id=($1)', [id], function (err, result) {
			  done(); //this done callback signals the pg driver that the connection can be closed or returned to the connection pool
			  if (err) {
				// pass the error to the express error handler
				return next(err);
			  }
			  else{
				//push text of first courtage: string
				console.log('Random word: ' + result.rows[0].text);
				res.render('template.ejs', { data: result.rows[0].text });
			  }
			});
		  }
		});
	});
};

exports.fill = (req, res, next) => {
	var dictionary = ['big', 'little', 'hot', 'cold', 'loud', 'quiet', 'lucky', 'scary', 'funny', 'silly', 'dirty', 'clean', 'gentle', 'wet', 'soft', 'fast', 'slow', 'color', 'red', 'blue', 'yellow', 'green', 'pink', 'orange', 'purple', 'black', 'white', 'brown', 'all', 'none', 'more', 'some', 'rest', 'plus', 'early', 'number', 'words', 'me', 'mine', 'my', 'you', 'it', 'then', 'age', 'she', 'him', 'her', 'list', 'common', 'ball', 'book', 'train', 'bike', 'rain', 'bubbles', 'car', 'truck', 'boat', 'plane', 'baby', 'bowl', 'spoon', 'sock', 'shoe', 'shirt', 'pants', 'hat', 'star', 'flower', 'house', 'tree', 'brush', 'towel', 'bath', 'chair', 'table', 'bed', 'blanket', 'light', 'cookie', 'cracker', 'chip', 'cheese', 'apple', 'banana', 'candy', 'milk', 'juice', 'water', 'dog', 'cat', 'fish', 'bird', 'duck', 'cow', 'horse', 'bunny', 'bear', 'pig', 'lion', 'elephant', 'giraffe', 'zebra', 'monkey', 'chicken', 'butterfly', 'bee', 'frog', 'alligator', 'snake'];
	exports.engine = 'jade';
	const pg = require('pg');
	const connStr = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/postgres';
	pg.connect(connStr, function (err, client, done) {
    if (err) {
      // pass the error to the express error handler
      return next(err);
    }
	// conditional create table
    client.query('CREATE TABLE vocabulary (id SERIAL PRIMARY KEY, text VARCHAR(40) not null);',[], function (err, result) {
      done(); //this done callback signals the pg driver that the connection can be closed or returned to the connection pool
      if (err) {
	    if(err.code =="42P07") {
		  console.log('Table exists!.');
	    }
		else {
        // pass the error to the express error handler
			return next(err);
		}
      }
	  else {
		  console.log('Table created.');
	  }
    });
	// fill table with data
	/*dictionary.forEach((word, idx) => {
		word = word.toUpperCase();
		client.query('INSERT INTO vocabulary (text) VALUES ($1);', [word], function (err, result) {
		  done(); //this done callback signals the pg driver that the connection can be closed or returned to the connection pool
		  if (err) {
			// pass the error to the express error handler
			return next(err);
		  }
		  else {
			console.log('Value '+(idx+1)+' inserted.');
		  }
		});
	});*/
	// select all from 
	client.query('SELECT * FROM vocabulary ', [], function (err, result) {
      done(); //this done callback signals the pg driver that the connection can be closed or returned to the connection pool
      if (err) {
        // pass the error to the express error handler
        return next(err);
      }
	  else{
		res.render('test.jade', { data: result.rows });
	  }
    });
  });
};