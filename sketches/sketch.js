// https://github.com/liabru/matter-js/wiki/Getting-started

var Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies;

var slingshot;
var engine, world;
var cnv;
var initialStrokes;
var bounds = [];
var obstacles = [];
var user;
var strokes = 'TBD';
var imgs = {};
var name;

window.onload = function() {
	var inner = "";
	inner += "<button id='10-strokes' onclick='loadGame(10)'>10-stroke Game</button><br>";
	inner += "<button id='100-strokes' onclick='loadGame(100)'>100-stroke Game</button><br>";
	inner += "<button id='1000-strokes' onclick='loadGame(1000)'>1000-stroke Game</button><br>";
	document.getElementById('button-container').innerHTML = inner;
	showHighscoresList();
}

function loadGame(n) {
	strokes = n;
	initialStrokes = n;
	document.getElementById('button-container').innerHTML = '';
	showHighscores(initialStrokes);
	cnv.show();
}

function preload() {
	imgs["bg"] = {
		"moon": loadImage('assets/moon.png'),
		"sun": loadImage('assets/sun.png'),
		"inbetween": loadImage('assets/inbetween.png'),
		"inbetweenM": loadImage('assets/inbetween-mirrored.png')
	};
	imgs["wind"] = loadImage('assets/wind.png');
	imgs["tumbleweed"] = loadImage('assets/tumbleweed.png');
	imgs["clenching"] = loadImage('assets/tumbleweed-clenching.png');
	imgs["current"] = imgs.tumbleweed;
}

function setup() {
	cnv = createCanvas(600, 500);
	cnv.parent('canvas-container');
	cnv.hide();
	createName();
	engine = Engine.create();
	world = engine.world;
	var box2 = new staticRect(0, height * 0.5, width * 0.1, height * 5);
	box2.add();
	bounds.push(box2);
	let gimmeBox = new staticRect(width * 0.5, height, width * 2, height * 0.1);
	gimmeBox.add();
	bounds.push(gimmeBox);
	user = new User(100, height * 0.75, 30, 30);
	user.add();
	slingshot = new Slingshot(user);
}

function mousePressed() {
	slingshot.grabbingUser();
	imgs.current = imgs.clenching;
}
function mouseReleased() {
	if (slingshot.grabbing) {
		let flick = slingshot.findAngle();
		let vel = {x: flick.vel.x * flick.multiplier, y: flick.vel.y * flick.multiplier};
		user.gimmeForce(vel);
		slingshot.grabbing = false;
		strokes--;
	}
	imgs.current = imgs.tumbleweed;
}

var recentObstacle = 0;
function createObstacle(per) {
	if (user.fitness > recentObstacle) {
		let gimmeBox = new Obstacle(user.fitness + width);
		gimmeBox.add();
		obstacles.push(gimmeBox);
		recentObstacle = user.fitness + per;
	}
}
var recentFloor = 0;
function createFloor(per) {
	if (user.fitness > recentFloor) {
		let gimmeBox = new staticRect(user.fitness + (per * 1.5), height, width, height * 0.1);
		gimmeBox.add();
		bounds.push(gimmeBox);
		recentFloor = user.fitness + per;
	}
}

function drawBg(p, w, h) {
	var fullImg = w * 4, y = h * 0.5, beg = w * 0.5;
	if(p<0){p=0;}else if(p>100){p=100;}
	var pos = fullImg * p * 0.01;
	imageMode(CENTER);
	image(imgs.bg.moon, beg - pos, y, w, h);
	image(imgs.bg.inbetween, beg + w - pos, y, w, h);
	image(imgs.bg.sun, beg + (2*w) - pos, y, w, h);
	image(imgs.bg.inbetweenM, beg + (3*w) - pos, y, -1 * w, h);
	image(imgs.bg.moon, beg + (4*w) - pos, y, w, h);
}



function draw() {
  rainbowBackground();
	drawBg( map(user.body.position.x % 3000, 0, 3000, 0, 100), width, height );
	var rectsInScope = bounds.filter(x => x.data.x > user.scope(0).start && x.data.x < user.scope(0).end);
	push();
	translate(-user.scope().start, 0);
	for (o of obstacles) {
		o.render();
	}
	for (r of bounds) {
		r.render();
	}
	user.render();
	pop();
	Engine.update(engine);
	slingshot.update(user);
	slingshot.render();
	user.updateFitness();
	createObstacle(200);
	createFloor(width);
	strokes = (strokes > 0) ? strokes : 0;
	document.getElementById('strokes').innerHTML = strokes + ' strokes remaining';
}

function rainbowBackground() {
  let x = frameCount * 0.005;
  let r = map(Math.sin(x), -1, 1, 130, 255);
  let g = map(Math.sin(x), -1, 1, 5, 40);
  let b = map(Math.sin(x * 2), -1, 1, 85, 255);
  document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}
