function User(x_, y_, r_) {
	this.body = Bodies.circle(x_, y_, r_, {friction:0, restitution:1});
	this.moons = 0;
	this.r = r_;
	this.fitness = 0;
	this.moons = 0;
	this.dead = false;
	this.moving = false;
	this.add = function() {
		World.add(world, this.body);
	};
	this.gimmeForce = function(vel) {
		var gimmePos = {x: this.body.position.x, y: this.body.position.y};
		Body.applyForce(this.body, gimmePos, vel);
	};
	this.render = function() {
		var pos = {
			"x": this.body.position.x,
			"y": this.body.position.y,
			"a": this.body.angle
		};
		push();
		translate(pos.x, pos.y);
		rotate(pos.a);
		fill(0);
		stroke(51); strokeWeight(5);
		//rectMode(CENTER);
		//ellipse(0, 0, this.r * 2);
		imageMode(CENTER);
		image(imgs.current, 0, 0, this.r * 2, this.r * 2);
		pop();
	};
	this.scope = function(p_) {
		var p = (p_) ? p_ : 20;
		var behind = p * 0.01 * width;
		var beyond = width - behind;
		var scope = {
			"start": this.body.position.x - behind,
			"end": this.body.position.x + beyond
		}
		//translate(scope.start, 0);
		return(scope);
	};
	this.checkIfMoving = function(sensitivity_) {
		var sensitivity = (sensitivity_) ? sensitivity_ : 1;
		var currVel = this.body.velocity.y;
		console.log(currVel);
		if (Math.floor(currVel) > sensitivity) {
			this.moving = true;
			return true;
		} else {
			this.moving = false;
			return false;
		}
	};
	this.updateFitness = function() {
		if (this.body.position.x > this.fitness) {
			this.fitness = Math.floor(this.body.position.x);
			this.moons = Math.floor(this.fitness / 3000);
			let inner = (this.moons === 1) ? 'moon' : 'moons';
			document.getElementById('moons-display').innerHTML = this.moons + ' ' + inner;
			if (!this.moving && strokes <= 0) {
				this.dead = true;
			}
			if (this.dead) {
				killScreen(this.moons, initialStrokes);
			}
		}
	};
		
}