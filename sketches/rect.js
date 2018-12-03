function staticRect(x_, y_, w_, h_) {
	this.body = Bodies.rectangle(x_, y_, w_, h_, {isStatic: true});
	this.w = w_;
	this.h = h_;
	this.loaded = false;
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
		fill(0);
		stroke(51); strokeWeight(5);
		rectMode(CENTER);
		rect(0, 0, this.w, this.h);
		pop();
	};
}