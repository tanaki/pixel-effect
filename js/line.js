var 
	ctx,
	canvas,
	animateTimer,
	delay = 1000/30,
	fr = 0.8,
	mouseX = 400,
	mouseY = 150,
	pos = -150,
	neg = 300,
	times = 0;

$(document).ready(function(){
	
	canvas = document.getElementById('canvas-line');
	ctx = document.getElementById('canvas-line').getContext('2d');
	
	
	ctx.beginPath();
	ctx.moveTo(0,150);
	ctx.quadraticCurveTo(100, 50, 200, 150);
	ctx.moveTo(200,150);
	ctx.quadraticCurveTo(300, 250, 400, 150);
	ctx.moveTo(400,150);
	ctx.quadraticCurveTo(500, 50, 600, 150);
	ctx.moveTo(600,150);
	ctx.quadraticCurveTo(700, 250, 800, 150);
	ctx.stroke();
	
//	animateTimer = setInterval(processLine, delay);
	
	$("#canvas-line").click(hitTest);
	
});

function processLine() {
	
	//if ( times > 100 ) clearInterval(animateTimer);
	//times++;
	//canvas.width = canvas.width;
	ctx.clearRect(0, 0, 800, 300);
	
	console.log( mouseY );
	mouseY *= -fr;
	mouseY += neg;
	
	/*
	if ( mouseY > 150 ) {
		mouseY = 300 - mouseY;
	} else {
		mouseY = 150 + mouseY;
	}
	*/
	//mouseY *= fr;
	
	ctx.beginPath();
	ctx.moveTo(0,150);
	ctx.quadraticCurveTo(mouseX, mouseY, 800, 150);
	ctx.stroke();
	
}

function hitTest(e) {
	mouseX = e.pageX;
	mouseY = e.pageY;
}



/*****************
 * CANVAS LOGO
 *****************

var draw;
var outputcanvas;

var cw=360;
var ch=270;

var TILE_WIDTH = 12;
var TILE_HEIGHT = 12;

var TILE_CENTER_WIDTH = TILE_WIDTH/2;
var TILE_CENTER_HEIGHT = TILE_HEIGHT/2;
var SOURCERECT = {x:0, y:0, width:0, height:0};
var PAINTRECT  = {x:0, y:0, width:cw, height:ch};


var RAD = Math.PI/180;

var tiles = [];
var debug = false;
var delay = 1000/60;

var img;
var interval;


function _loadLogo()
{
    //Si support du canvas
    if(outputcanvas) {
        
        img = new Image();   // Create new Image object  
        img.onload = function()
        { 
            interval = setInterval("processFrame()", delay); 
            $("body").mousemove(_onMoveTile);
            
            //ipad event
            if (isAppleDevice)
            {
                outputcanvas.addEventListener('touchmove',_onMoveTile, false);
            }
            else
                $("body").mousemove(_onMoveTile);
    
        };

        // Set source path  
        img.src = 'img/big-youth.png'; 
       
    }
}

var mouseX;
var mouseY;

var distTest = 50;
var distRepulsion = 80;

//facteur d'elasticité
var spr1 = 0.01;
var spr2 = 0.03;

//frottement
var fr = 0.95;

function processFrame(){
    
    // init 
    if(SOURCERECT.width == 0){
         SOURCERECT = {x:0,y:0,width:PAINTRECT.width /1.5,height:PAINTRECT.height / 1.5};
         createTiles();
    }
    

    draw.clearRect(PAINTRECT.x, PAINTRECT.y,PAINTRECT.width,PAINTRECT.height);
    
    for(var i=0; i<tiles.length; i++){
        
        var tile = tiles[i];
        
        //var fpx = _tooltip.x;
        //var fpy = _tooltip.y;
        
        //distance entre la souris et l'objet
        var dx = mouseX - tile.originX;
        var dy = mouseY - tile.originY;
        
        //Pythagore : a2 + b2 = d2  (car RACINE(a2 + b2) = d )
        //donc, on controle si le point est à une certaine distance
        var dist = Math.sqrt( dx * dx + dy * dy );
        if(dist == 0)
            dist = 1;
        if( dist < distTest )
        {
            //var a = Math.atan(dy/dx); //avoir l'angle entre la souris et la tuile, en fonction de la tangante (car on a l'opposé et l'adjacent);
            
            //tile.vx += (mouseX + distRepulsion * Math.cos(a) - tile.x) * spr1;
            //tile.vy += (mouseY + distRepulsion * Math.sin(a) - tile.y) * spr1;
            
            //Thales
            tile.vx += (mouseX - ((distRepulsion * dx) / dist) - tile.x) * spr1;
            tile.vy += (mouseY - ((distRepulsion * dy) / dist) - tile.y) * spr1;
        }
        
        tile.vx += (tile.originX - tile.x) * spr2;
        tile.vy += (tile.originY - tile.y) * spr2;
        
        tile.vx *= fr;
        tile.vy *= fr;
        tile.x += tile.vx;
        tile.y += tile.vy;
        
        draw.save();
        
        //déplacement coordonnée
        draw.translate(tile.x, tile.y);
        
        if (img==null ||  !img)
            console.log("img vaut 0");
        
        if (tile.videoX < 0)
            console.log("tile.videoX vaut 0");
        
        if (tile.videoY < 0)
            console.log("tile.videoY vaut 0");
        
        try
        {
            draw.drawImage(img, tile.videoX, tile.videoY, TILE_WIDTH, TILE_HEIGHT, 0, 0, TILE_WIDTH, TILE_HEIGHT);
        }
        catch(e)
        {
            console.log(e);
            console.log(img, tile.videoX, tile.videoY, TILE_WIDTH, TILE_HEIGHT, 0, 0, TILE_WIDTH, TILE_HEIGHT);
            clearInterval(interval);
            break;
        }
        
       
        draw.restore();
    }

}
*/