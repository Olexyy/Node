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
		  done(); //this done callback signals the pg driver that the connection can be closed
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
			id--; // id will be offset so decrement it
			// select by id
			client.query('SELECT * FROM vocabulary LIMIT 1 OFFSET ($1)', [id], function (err, result) {
			  done(); //this done callback signals the pg driver that the connection can be closed
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
	var bigger_dictionary = ['about', 'above', 'across', 'act', 'active', 'activity', 'add', 'afraid', 'after', 'again', 'age', 'ago', 'agree', 'air', 'all', 'alone', 'along', 'already', 'always', 'am', 'amount', 'an', 'and', 'angry', 'another', 'answer', 'any', 'anyone', 'anything', 'anytime', 'appear', 'apple', 'are', 'area', 'arm', 'army', 'around', 'arrive', 'art', 'as', 'ask', 'at', 'attack', 'aunt', 'autumn', 'away', 'baby', 'base', 'back', 'bad', 'bag', 'ball', 'bank', 'basket', 'bath', 'be', 'bean', 'bear', 'beautiful', 'beer', 'bed', 'bedroom', 'behave', 'before', 'begin', 'behind', 'bell', 'below', 'besides', 'best', 'better', 'between', 'big', 'bird', 'birth', 'birthday', 'bit', 'bite', 'black', 'bleed', 'block', 'blood', 'blow', 'blue', 'board', 'boat', 'body', 'boil', 'bone', 'book', 'border', 'born', 'borrow', 'both', 'bottle', 'bottom', 'bowl', 'box', 'boy', 'branch', 'brave', 'bread', 'break', 'breakfast', 'breathe', 'bridge', 'bright', 'bring', 'brother', 'brown', 'brush', 'build', 'burn', 'business', 'bus', 'busy', 'but', 'buy', 'by', 'cake', 'call', 'can', 'candle', 'cap', 'car', 'card', 'care', 'careful', 'careless', 'carry', 'case', 'cat', 'catch', 'central', 'century', 'certain', 'chair', 'chance', 'change', 'chase', 'cheap', 'cheese', 'chicken', 'child', 'children', 'chocolate', 'choice', 'choose', 'circle', 'city', 'class', 'clever', 'clean', 'clear', 'climb', 'clock', 'cloth', 'clothes', 'cloud', 'cloudy', 'close', 'coffee', 'coat', 'coin', 'cold', 'collect', 'colour', 'comb', 'come', 'comfortable', 'common', 'compare', 'complete', 'computer', 'condition', 'continue', 'control', 'cook', 'cool', 'copper', 'corn', 'corner', 'correct', 'cost', 'contain', 'count', 'country', 'course', 'cover', 'crash', 'cross', 'cry', 'cup', 'cupboard', 'cut', 'dance', 'dangerous', 'dark', 'daughter', 'day', 'dead', 'decide', 'decrease', 'deep', 'deer', 'depend', 'desk', 'destroy', 'develop', 'die', 'different', 'difficult', 'dinner', 'direction', 'dirty', 'discover', 'dish', 'do', 'dog', 'door', 'double', 'down', 'draw', 'dream', 'dress', 'drink', 'drive', 'drop', 'dry', 'duck', 'dust', 'duty', 'each', 'ear', 'early', 'earn', 'earth', 'east', 'easy', 'eat', 'education', 'effect', 'egg', 'eight', 'either', 'electric', 'elephant', 'else', 'empty', 'end', 'enemy', 'enjoy', 'enough', 'enter', 'equal', 'entrance', 'escape', 'even', 'evening', 'event', 'ever', 'every', 'everyone', 'exact', 'everybody', 'examination', 'example', 'except', 'excited', 'exercise', 'expect', 'expensive', 'explain', 'extremely', 'eye', 'face', 'fact', 'fail', 'fall', 'false', 'family', 'famous', 'far', 'farm', 'father', 'fast', 'fat', 'fault', 'fear', 'feed', 'feel', 'female', 'fever', 'few', 'fight', 'fill', 'film', 'find', 'fine', 'finger', 'finish', 'fire', 'first', 'fit', 'five', 'fix', 'flag', 'flat', 'float', 'floor', 'flour', 'flower', 'fly', 'fold', 'food', 'fool', 'foot', 'football', 'for', 'force', 'foreign', 'forest', 'forget', 'forgive', 'fork', 'form', 'fox', 'four', 'free', 'freedom', 'freeze', 'fresh', 'friend', 'friendly', 'from', 'front', 'fruit', 'full', 'fun', 'funny', 'furniture', 'further', 'future', 'game', 'garden', 'gate', 'general', 'gentleman', 'get', 'gift', 'give', 'glad', 'glass', 'go', 'goat', 'god', 'gold', 'good', 'goodbye', 'grandfather', 'grandmother', 'grass', 'grave', 'great', 'green', 'grey', 'ground', 'group', 'grow', 'gun', 'hair', 'half', 'hall', 'hammer', 'hand', 'happen', 'happy', 'hard', 'hat', 'hate', 'have', 'he', 'head', 'healthy', 'hear', 'heavy', 'hello', 'help', 'heart', 'heaven', 'height', 'help', 'hen', 'her', 'here', 'hers', 'hide', 'high', 'hill', 'him', 'his', 'hit', 'hobby', 'hold', 'hole', 'holiday', 'home', 'hope', 'horse', 'hospital', 'hot', 'hotel', 'house', 'how', 'hundred', 'hungry', 'hour', 'hurry', 'husband', 'hurt', 'ice', 'idea', 'if', 'important', 'in', 'increase', 'inside', 'into', 'introduce', 'invent', 'iron', 'invite', 'is', 'island', 'it', 'its', 'jelly', 'job', 'join', 'juice', 'jump', 'just', 'keep', 'key', 'kill', 'kind', 'king', 'kitchen', 'knee', 'knife', 'knock', 'know', 'ladder', 'lady', 'lamp', 'land', 'large', 'last', 'late', 'lately', 'laugh', 'lazy', 'lead', 'leaf', 'learn', 'leave', 'leg', 'left', 'lend', 'length', 'less', 'lesson', 'let', 'letter', 'library', 'lie', 'life', 'light', 'like', 'lion', 'lip', 'list', 'listen', 'little', 'live', 'lock', 'lonely', 'long', 'look', 'lose', 'lot', 'love', 'low', 'lower', 'luck', 'machine', 'main', 'make', 'male', 'man', 'many', 'map', 'mark', 'market', 'marry', 'matter', 'may', 'me', 'meal', 'mean', 'measure', 'meat', 'medicine', 'meet', 'member', 'mention', 'method', 'middle', 'milk', 'million', 'mind', 'minute', 'miss', 'mistake', 'mix', 'model', 'modern', 'moment', 'money', 'monkey', 'month', 'moon', 'more', 'morning', 'most', 'mother', 'mountain', 'mouth', 'move', 'much', 'music', 'must', 'my', 'name', 'narrow', 'nation', 'nature', 'near', 'nearly', 'neck', 'need', 'needle', 'neighbour', 'neither', 'net', 'never', 'new', 'news', 'newspaper', 'next', 'nice', 'night', 'nine', 'no', 'noble', 'noise', 'none', 'nor', 'north', 'nose', 'not', 'nothing', 'notice', 'now', 'number', 'obey', 'object', 'ocean', 'of', 'off', 'offer', 'office', 'often', 'oil', 'old', 'on', 'one', 'only', 'open', 'opposite', 'or', 'orange', 'order', 'other', 'our', 'out', 'outside', 'over', 'own', 'page', 'pain', 'paint', 'pair', 'pan', 'paper', 'parent', 'park', 'part', 'partner', 'party', 'pass', 'past', 'path', 'pay', 'peace', 'pen', 'pencil', 'people', 'pepper', 'per', 'perfect', 'period', 'person', 'petrol', 'photograph', 'piano', 'pick', 'picture', 'piece', 'pig', 'pin', 'pink', 'place', 'plane', 'plant', 'plastic', 'plate', 'play', 'please', 'pleased', 'plenty', 'pocket', 'point', 'poison', 'police', 'polite', 'pool', 'poor', 'popular', 'position', 'possible', 'potato', 'pour', 'power', 'present', 'press', 'pretty', 'prevent', 'price', 'prince', 'prison', 'private', 'prize', 'probably', 'problem', 'produce', 'promise', 'proper', 'protect', 'provide', 'public', 'pull', 'punish', 'pupil', 'push', 'put', 'queen', 'question', 'quick', 'quiet', 'quite', 'radio', 'rain', 'rainy', 'raise', 'reach', 'read', 'ready', 'real', 'really', 'receive', 'record', 'red', 'remember', 'remind', 'remove', 'rent', 'repair', 'repeat', 'reply', 'report', 'rest', 'restaurant', 'result', 'return', 'rice', 'rich', 'ride', 'right', 'ring', 'rise', 'road', 'rob', 'rock', 'room', 'round', 'rubber', 'rude', 'rule', 'ruler', 'run', 'rush', 'sad', 'safe', 'sail', 'salt', 'same', 'sand', 'save', 'say', 'school', 'science', 'scissors', 'search', 'seat', 'second', 'see', 'seem', 'sell', 'send', 'sentence', 'serve', 'seven', 'several', 'sex', 'shade', 'shadow', 'shake', 'shape', 'share', 'sharp', 'she', 'sheep', 'sheet', 'shelf', 'shine', 'ship', 'shirt', 'shoe', 'shoot', 'shop', 'short', 'should', 'shoulder', 'shout', 'show', 'sick', 'side', 'signal', 'silence', 'silly', 'silver', 'similar', 'simple', 'single', 'since', 'sing', 'sink', 'sister', 'sit', 'six', 'size', 'skill', 'skin', 'skirt', 'sky', 'sleep', 'slip', 'slow', 'smoke', 'small', 'smell', 'smile', 'smoke', 'snow', 'so', 'soap', 'sock', 'soft', 'some', 'someone', 'something', 'sometimes', 'son', 'soon', 'sorry', 'sound', 'soup', 'south', 'space', 'speak', 'special', 'speed', 'spell', 'spend', 'spoon', 'sport', 'spread', 'spring', 'square', 'stamp', 'stand', 'star', 'start', 'station', 'stay', 'steal', 'steam', 'step', 'still', 'stomach', 'stone', 'stop', 'store', 'storm', 'story', 'strange', 'street', 'strong', 'structure', 'student', 'study', 'stupid', 'subject', 'substance', 'successful', 'such', 'sudden', 'sugar', 'suitable', 'summer', 'sun', 'sunny', 'support', 'sure', 'surprise', 'sweet', 'swim', 'sword', 'table', 'take', 'talk', 'tall', 'taste', 'taxi', 'tea', 'teach', 'team', 'tear', 'telephone', 'television', 'tell', 'ten', 'tennis', 'terrible', 'test', 'than', 'that', 'the', 'their', 'then', 'there', 'therefore', 'these', 'thick', 'thin', 'thing', 'think', 'third', 'this', 'though', 'threat', 'three', 'tidy', 'tie', 'title', 'to', 'today', 'toe', 'together', 'tomorrow', 'tonight', 'too', 'tool', 'tooth', 'top', 'total', 'touch', 'town', 'train', 'tram', 'travel', 'tree', 'trouble', 'true', 'trust', 'twice', 'try', 'turn', 'type', 'uncle', 'under', 'understand', 'unit', 'until', 'up', 'use', 'useful', 'usual', 'usually', 'vegetable', 'very', 'village', 'voice', 'visit', 'wait', 'wake', 'walk', 'want', 'warm', 'wash', 'waste', 'watch', 'water', 'way', 'we', 'weak', 'wear', 'weather', 'wedding', 'week', 'weight', 'welcome', 'well', 'west', 'wet', 'what', 'wheel', 'when', 'where', 'which', 'while', 'white', 'who', 'why', 'wide', 'wife', 'wild', 'will', 'win', 'wind', 'window', 'wine', 'winter', 'wire', 'wise', 'wish', 'with', 'without', 'woman', 'wonder', 'word', 'work', 'world', 'worry', 'worst', 'write', 'wrong', 'year', 'yes', 'yesterday', 'yet', 'you', 'young', 'your', 'zero', 'zoo'];
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
	bigger_dictionary.forEach((word, idx, array) => {
		word = word.toUpperCase();
		client.query('INSERT INTO vocabulary (text) VALUES ($1);', [word], function (err, result) {
		  done(); //this done callback signals the pg driver that the connection can be closed or returned to the connection pool
		  if (err) {
			// pass the error to the express error handler
			return next(err);
		  }
		  else {
			console.log('Value #' + (idx+1) + ' inserted.');
			if(idx+1 === array.length){
				console.log('Total #' + (idx+1) + ' inserted.');
				res.render('query.jade', { result: 'Inserted ' + (idx+1) + ' rows.' });
			}  
		  }
		});
	});
  });
};
exports.watch = (req, res, next)=>{
	exports.engine = 'jade';
	const pg = require('pg');
	const connStr = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/postgres';
	pg.connect(connStr, (err, client, done) => {
		if (err) {
			// pass the error to the express error handler
			return next(err);
		}
		client.query('SELECT * FROM vocabulary ', [], (err, result) => {
			done(); //this done callback signals the pg driver that the connection can be closed
			if (err) {
				// pass the error to the express error handler
				return next(err);
			}
	  		else {
				res.render('watch.jade', { data: result.rows });
	  		}
		});
	});
};
exports.clear = (req, res, next)=>{
	exports.engine = 'jade';
	const pg = require('pg');
	const connStr = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/postgres';
	pg.connect(connStr, (err, client, done) => {
		if (err) {
			// pass the error to the express error handler
			return next(err);
		}
		client.query('DELETE FROM vocabulary ', [], (err, result) => {
			done(); //this done callback signals the pg driver that the connection can be closed
			if (err) {
				// pass the error to the express error handler
				return next(err);
			}
	  		else {
				res.render('query.jade', { result: JSON.stringify(result) });
	  		}
		});
	});
};