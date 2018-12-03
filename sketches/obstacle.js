function Obstacle(x_) {
	this.rnd = function(a, b) {var r=Math.random()*(b-a); return r+a;};
	this.w = this.rnd(width*0.1,width*0.2);
	this.h = this.rnd(height*0.1,height*0.2);
	this.body = Bodies.rectangle(x_, this.rnd(0, height), this.w, this.h, {isStatic: true});
	this.loaded = false;
	this.color = color(Math.random()*100, Math.random()*100, Math.random()*100);
	this.updateData = function() {
		return {
			"x": this.body.position.x,
			"y": this.body.position.y,
			"a": this.body.angle,
			"w": this.w,
			"h": this.h
		};	 
	};
	this.data = this.updateData();
	this.add = function() {
		//if (this.data) {this.body = Bodies.rectangle(this.data.x, this.data.y, this.data.w, this.data.h, {isStatic: true, angle: this.data.a});}
		this.loaded = true;
		World.add(world, this.body);
	};
	this.remove = function() {
		this.loaded = false;
		this.data = this.updateData();
		Matter.Composite.remove(world, this.body);
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
		fill(this.color);
		stroke(51); strokeWeight(5);
		rectMode(CENTER);
		rect(0, 0, this.w, this.h);
		pop();
	};
}