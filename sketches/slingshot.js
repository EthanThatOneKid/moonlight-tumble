function Slingshot(user_) {
	this.user = user_;
	this.grabbing = false;
	this.grabbingUser = function() {
		var x1 = mouseX + this.user.scope().start, y1 = mouseY;
		var d = dist(x1, y1, this.user.body.position.x, this.user.body.position.y);
		//console.log(this.user.body.circleRadius > d);
		var canGrab = !this.user.moving;
		if (canGrab && this.user.body.circleRadius > d) {this.grabbing = true;}
	};
	this.update = function(user_) {
		this.user = user_;
	};
	this.constrain = function(n, min, max) {
		if (n >= min && n <= max) {
			return n;
		} else if (n > max) {
			return max;
		} else if (n < min) {
			return min;
		}
	};

	this.render = function() {
		if (this.grabbing) {
			var x2 = this.user.body.position.x + (this.user.r * 0.5);
    
			var y2 = this.user.body.position.y + (this.user.r * 0.5);
    
			var x1 = mouseX + this.user.scope().start;
    
			var y1 = mouseY;
 
			var h = dist(x1, y1, x2, y2);
    
			var a = Math.acos( ( ((x2-x1)*(x2-x1))+(h*h)-((y2-y1)*(y2-y1)) ) / ((x2-x1)*h*2) );
    
			var sign = (mouseY > y2) ? -1 : 1;

			a *= sign;
			var x = Math.cos(a) * (h * 0.5);
			var y = Math.sin(a) * (h * 0.5);
			push();
			translate(mouseX + x, mouseY + y);
			rotate(a);
			imageMode(CENTER);
			image(imgs.wind, this.user.r * -1, 0, h, height * 0.1);
			pop();
		}
	};

	this.findAngle = function() {
		var x2 = this.user.body.position.x + (this.user.r * 0.5);
    
		var y2 = this.user.body.position.y + (this.user.r * 0.5);
    
		var x1 = mouseX + this.user.scope().start;
 
		//console.log(x1);   
		var y1 = mouseY;
 
		var h = dist(x1, y1, x2, y2);
    
		var a = Math.acos( ( ((x2-x1)*(x2-x1))+(h*h)-((y2-y1)*(y2-y1)) ) / ((x2-x1)*h*2) );
    
		var sign = (mouseY > y2) ? -1 : 1;

		var max = width * 0.5;
		var mag = this.constrain(h, 0, max);
		var data = {
			"angle": a * sign,
			"magnitude": mag,
			"multiplier": map(mag, 0 , max, 0, 0.35),
			"vel": {
				"x": Math.cos(a * sign),
				"y": Math.sin(a * sign)
			}
		};
		if (this.grabbing) {
			return data;
		} else {
			return undefined;
		}
	};
}