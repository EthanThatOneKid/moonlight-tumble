function killScreen(score, mode) {
	cnv.hide();
	let obj = (score === 1) ? 'moon' : 'moons';
	let inner = '<h3>You have made it through</h3><h1>' + score + ' ' + obj + ' </h1>';
	document.getElementById('button-container').innerHTML = inner;
	let data = {
		"name": name,
		"score": score
	};
	var leaderboard = firebase.database().ref(mode + '-stroke/' + name + '/').once('value').then(function(snapshot) {
		if (!snapshot.exists()) {
			firebase.database().ref(mode + '-stroke/' + name + '/').set(data);
			return null;
		} else {
			return snapshot.val();
		}
	});
	leaderboard.then(function(result) {
		if (result.score < score) {
			firebase.database().ref(mode + '-stroke/' + name + '/').set(data);
		}
	});
	showHighscores(mode);
}

function createName() {
	var cookie = readCookie(document.cookie);
	if (cookie.name) {
		name = cookie.name
	} else {
		name = prompt('What it your screenname?');
		if (!name) {name = "Anonymous";}
		document.cookie = "name=" + name + ";";
	}
	document.getElementById('name-container').innerHTML = name;
}

function readCookie(cookie_) {
	var cookieArr = cookie_.split(';');

	var cookie = {};

	for (var i = 0; i < cookieArr.length; i++) {

		var gimmeCookie = cookieArr[i].trim();

		gimmeCookie = gimmeCookie.split('=');

		cookie[gimmeCookie[0]] = gimmeCookie[1];

	}
	return cookie;
}

function writeCookie(obj) {
	var entries = Object.entries(obj);

	var cookie = '';

	for (var i = 0; i < entries.length - 1; i++) {

		var gimmeString =  entries[i][0] + '=' + entries[i][1] + ';';

		cookie += gimmeString;

	}

	return cookie;
}

function showHighscores(x) {
	var leaderboard = firebase.database().ref(x + '-stroke/').once('value').then(function(snapshot) {
		return snapshot.val();
	});
	leaderboard.then(function(result) {
		var topThree = Object.keys(result).sort(function(a,b){return result[b].score-result[a].score});
		topThree = [{'name':topThree[0], 'score':result[topThree[0]].score}, {'name':topThree[1], 'score':result[topThree[1]].score}, {'name':topThree[2], 'score':result[topThree[2]].score}];
		let inner = '<table><tr><td colspan=\'2\'><strong>High Scores</strong> (' + x + '-stroke)</td></tr>';
		inner += '<tr bgcolor=\'yellow\'><td>' + topThree[0].name + '</td><td>' + topThree[0].score + '</td></tr>';
		inner += '<tr bgcolor=\'grey\'><td>' + topThree[1].name + '</td><td>' + topThree[1].score + '</td></tr>';
		inner += '<tr bgcolor=\'orange\'><td>' + topThree[2].name + '</td><td>' + topThree[2].score + '</td></tr>';
		inner += '</table>'
		document.getElementById('leaderboard-container').innerHTML = inner;
	});
}

function showHighscoresList() {
	var leaderboard = firebase.database().ref('/').once('value').then(function(snapshot) {
		return snapshot.val();
	});
	leaderboard.then(function(result) {
		//console.log(result);
		let inner = '<div style=\'overflow-y: scroll; height: 170px;\' align=\'center\'>';

		var x = 10;
		var gimmeObj = result['10-stroke'];
		var topThree = Object.keys(gimmeObj).sort(function(a,b){return gimmeObj[b].score-gimmeObj[a].score});
		topThree = [{'name':topThree[0], 'score':gimmeObj[topThree[0]].score}, {'name':topThree[1], 'score':gimmeObj[topThree[1]].score}, {'name':topThree[2], 'score':gimmeObj[topThree[2]].score}];
		inner += '<table><tr><td colspan=\'2\'><strong>High Scores</strong> (' + x + '-stroke)</td></tr>';
		inner += '<tr bgcolor=\'yellow\'><td>' + topThree[0].name + '</td><td>' + topThree[0].score + '</td></tr>';
		inner += '<tr bgcolor=\'grey\'><td>' + topThree[1].name + '</td><td>' + topThree[1].score + '</td></tr>';
		inner += '<tr bgcolor=\'orange\'><td>' + topThree[2].name + '</td><td>' + topThree[2].score + '</td></tr>';
		inner += '</table><br>';

		x *= 10;
		var gimmeObj = result['100-stroke'];
		var topThree = Object.keys(gimmeObj).sort(function(a,b){return gimmeObj[b].score-gimmeObj[a].score});
		topThree = [{'name':topThree[0], 'score':gimmeObj[topThree[0]].score}, {'name':topThree[1], 'score':gimmeObj[topThree[1]].score}, {'name':topThree[2], 'score':gimmeObj[topThree[2]].score}];
		inner += '<table><tr><td colspan=\'2\'><strong>High Scores</strong> (' + x + '-stroke)</td></tr>';
		inner += '<tr bgcolor=\'yellow\'><td>' + topThree[0].name + '</td><td>' + topThree[0].score + '</td></tr>';
		inner += '<tr bgcolor=\'grey\'><td>' + topThree[1].name + '</td><td>' + topThree[1].score + '</td></tr>';
		inner += '<tr bgcolor=\'orange\'><td>' + topThree[2].name + '</td><td>' + topThree[2].score + '</td></tr>';
		inner += '</table><br>';

		x *= 10;
		var gimmeObj = result['1000-stroke'];
		var topThree = Object.keys(gimmeObj).sort(function(a,b){return gimmeObj[b].score-gimmeObj[a].score});
		topThree = [{'name':topThree[0], 'score':gimmeObj[topThree[0]].score}, {'name':topThree[1], 'score':gimmeObj[topThree[1]].score}, {'name':topThree[2], 'score':gimmeObj[topThree[2]].score}];
		inner += '<table><tr><td colspan=\'2\'><strong>High Scores</strong> (' + x + '-stroke)</td></tr>';
		inner += '<tr bgcolor=\'yellow\'><td>' + topThree[0].name + '</td><td>' + topThree[0].score + '</td></tr>';
		inner += '<tr bgcolor=\'grey\'><td>' + topThree[1].name + '</td><td>' + topThree[1].score + '</td></tr>';
		inner += '<tr bgcolor=\'orange\'><td>' + topThree[2].name + '</td><td>' + topThree[2].score + '</td></tr>';
		inner += '</table>';

		inner += '</div>';

		document.getElementById('leaderboard-container').innerHTML = inner;
	});
}
