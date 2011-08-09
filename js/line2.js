
var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

//var DENSITY = .75;
var DENSITY = .5;
//var FRICTION = 1.14;
var FRICTION = 1.24;
var MOUSE_PULL = 0.1; // The strength at which the mouse pulls particles within the AOE
//var AOE = 200; // Area of effect for mouse pull
var AOE = 30;
var DETAIL = Math.round( WIDTH / 30 ); // The number of particles used to build up the surface

//var WATER_DENSITY = 1.07;
//var AIR_DENSITY = 1.02;
var WATER_DENSITY = AIR_DENSITY = 1;

var mouseIsDown = false;
var ms = {x:0, y:0}; // Mouse speed
var mp = {x:0, y:0}; // Mouse position
var particles;
var canvas = document.getElementById('world');
var context;

if (canvas && canvas.getContext) {
	context = canvas.getContext('2d');
	
	particles = [];
	tweets = [];
	
	for( var i = 0; i < DETAIL+1; i++ ) {
		particles.push( { 
			x: WIDTH / (DETAIL-4) * (i-2), // Pad by two particles on each side
			y: HEIGHT*.5,
			original: {x: 0, y: HEIGHT * .5},
			velocity: {x: 0, y: Math.random()*3}, // Random for some initial movement in the wave
			tension: {x: 0, y: 0},
			force: {x: 0, y: 0},
			mass: 10,
		} );
	}
	
	Initialize();
}

function Initialize() {
	$(canvas).mousemove(MouseMove);
	//$(window).resize(ResizeCanvas);
	//setInterval( TimeUpdate, 40 );
	setInterval( TimeUpdate, 20 );
	
	ResizeCanvas();
}

function TimeUpdate(e) {
	
	var gradientFill = context.createLinearGradient(WIDTH*.5,HEIGHT*.2,WIDTH*.5,HEIGHT);
	gradientFill.addColorStop(0,'#00AABB');
	gradientFill.addColorStop(1,'rgba(0,200,250,0)');
	
	context.clearRect(0, 0, WIDTH, HEIGHT);
	context.fillStyle = gradientFill;
	context.beginPath();
	
	var len = particles.length;
	var i;
	
	var current, previous, next;
	
	for( i = 0; i < len; i++ ) {
		current = particles[i];
		previous = particles[i-1];
		next = particles[i+1];
		
		if (previous && next) {
			
			var forceY = 0;
			var extensionY = 0;
			
			if( i > 0 )
			{
				extensionY = previous.y - current.y - previous.tension.y;
				forceY += -DENSITY * extensionY;
			}
			
			if( i < len - 1 )
			{
				extensionY = current.y - next.y -current.tension.y;
				forceY += DENSITY * extensionY;
			}
			
			extensionY = current.y - current.original.y;
			forceY += DENSITY/15 * extensionY;
			
			current.tension.y = next.y - current.y;
			current.velocity.y += - ( forceY / current.mass ) + current.force.y;
			current.velocity.y /= FRICTION;
			current.force.y /= FRICTION;
			current.y += current.velocity.y;
			
			var distance = DistanceBetween( mp, current );
			
			if( distance < AOE ) {
				var distance = DistanceBetween( mp, {x:current.original.x,y:current.original.y} );
				
				ms.x = ms.x * .98;
				ms.y = ms.y * .98;
				
				current.force.y += (MOUSE_PULL * ( 1 - (distance / AOE) )) * ms.y;
				
			}
			
			var control = {x:0,y:0};
			control.x = previous.x;
			control.y = previous.y;
			
			var anchor = {x:0,y:0};
			anchor.x = previous.x + (current.x - previous.x) / 2;
			anchor.y = previous.y + (current.y - previous.y) / 2;
			
			context.quadraticCurveTo(control.x, control.y, anchor.x, anchor.y);
		}
		
	}
	
	context.lineTo(particles[particles.length-1].x, particles[particles.length-1].y);
//	context.lineTo(WIDTH, HEIGHT);
//	context.lineTo(0, HEIGHT);
//	context.lineTo(particles[0].x, particles[0].y);
	
//	context.fill();
	context.strokeStyle = "#ccc";
	context.stroke();
	
//	context.fillStyle = "#rgba(0,200,255,0)";
	context.beginPath();
	
//	context.fill();

}

function GetClosestParticle(point){
	var closestIndex = 0;
	var closestDistance = 1000;
	
	var len = particles.length;
	
	for( var i = 0; i < len; i++ ) {
		var thisDistance = DistanceBetween( particles[i], point );
		
		if( thisDistance < closestDistance ) {
			closestDistance = thisDistance;
			closestIndex = i;
		}
		
	}
	
	return particles[closestIndex];
}

function Update( pos ) {
	
	console.log( mp.x, mp.y, pos.left, pos.top )
	
	var offsetY = $('#world').position().top;
	
	ms.x = Math.max( Math.min( pos.left - mp.x, 40 ), -40 );
	ms.y = Math.max( Math.min( pos.top - offsetY - mp.y, 40 ), -40 );
	
	mp.x = pos.left;
	mp.y = pos.top;
}

function MouseMove(e) {
	
	var offsetY = $('#world').position().top;
	
	ms.x = Math.max( Math.min( e.layerX - mp.x, 40 ), -40 );
	ms.y = Math.max( Math.min( e.layerY - offsetY - mp.y, 40 ), -40 );
	
	mp.x = e.layerX;
	mp.y = e.layerY - offsetY;
	
	/*
	ms.x = Math.max( Math.min( e.layerX - mp.x, 40 ), -40 );
	ms.y = Math.max( Math.min( e.layerY - offsetY - mp.y, 40 ), -40 );
	
	mp.x = e.layerX;
	mp.y = e.layerY - offsetY;
	*/
}

function ResizeCanvas(e) {
	WIDTH = 800;//window.innerWidth;
	HEIGHT = 150;//window.innerHeight;
	
	canvas.width = WIDTH;
	canvas.height = HEIGHT;
	
	for( var i = 0; i < DETAIL+1; i++ ) {
		particles[i].x = WIDTH / (DETAIL-4) * (i-2);
		particles[i].y = HEIGHT*.5;
		
		particles[i].original.x = particles[i].x;
		particles[i].original.y = particles[i].y;
	}
}

function DistanceBetween(p1,p2) {
	var dx = p2.x-p1.x;
	var dy = p2.y-p1.y;
	return Math.sqrt(dx*dx + dy*dy);
}