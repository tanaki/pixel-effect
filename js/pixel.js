var 
	imgCtx,
	imgCanvas,
	animateTimer;

$(document).ready(function(){
	
	ToolBox.init();
	
	imgCanvas = document.getElementById('image');
	imgCtx = document.getElementById('image').getContext('2d');
	drawImage();
	
});

function drawImage() {
	var img = new Image();
	img.src = 'img/img'+$.random(1, 3)+'.jpg';
	img.onload = function(){
		imgCtx.drawImage(img, 0, 0);
		
		$(".pixel").click(function(e){
			e.preventDefault();
			initPixels( parseInt($("#slider-pixel").slider("value")) );
		});
		
		$(".cancel").click(function(e){
			e.preventDefault();
			imgCtx.drawImage(img, 0, 0);
		});
	}
}

function initPixels (blockSize) {

	rect = {
		top : 0, 
		left : 0,
		width : 1024,
		height : 685
	};
	w = rect.width;
	h = rect.height;

	pixel = document.createElement("canvas");
	pixel.width = pixel.height = 1;
	pixelCtx = pixel.getContext("2d");

	copy = document.createElement("canvas");
	copy.width = w;
	copy.height = h;
	copyCtx = copy.getContext("2d");
	copyCtx.drawImage(imgCanvas,rect.left,rect.top,w,h, 0,0,w,h);
	
	// prepare variables for animation
	var xH1 = getNumberOfBlocks($("h1").width(), blockSize);
	var yH1 = getNumberOfBlocks($("h1").height(), blockSize);
	
	var xH2 = getNumberOfBlocks($("h2").width(), blockSize);
	var yH2 = getNumberOfBlocks($("h2").height(), blockSize);
	
	// pixelize around title
	for ( var j = 0; j < yH1; j++ ) {
		for ( var i = 1; i <= xH1; i++ ) {
			drawPixel (1024 - (blockSize*i), blockSize * j, blockSize, 0.8);
		}
	}
	
	// pixelize around subtitle
	for ( var l = yH1 - 1; l < yH2 + yH1 - 1; l++ ) {
		for ( var k = 1; k <= xH2; k++ ) {
			drawPixel (1024 - (blockSize*k), blockSize * l, blockSize, 0.8);
		}
	}
}

function drawPixel (x, y, blockSize, opacity) {
	var blockSizeX = blockSize;
	var blockSizeY = blockSize;

	if (blockSizeX + x > w)
		blockSizeX = w - x;
	if (blockSizeY + y > h)
		blockSizeY = h - y;

	pixelCtx.drawImage(copy, x, y, blockSizeX, blockSizeY, 0, 0, 1, 1);
	var data = pixelCtx.getImageData(0,0,1,1).data;
	imgCtx.fillStyle = "rgba(" + data[0] + "," + data[1] + "," + data[2] + "," + opacity + ")";
	imgCtx.fillRect(rect.left + x, rect.top + y, blockSize, blockSize);
}


function getNumberOfBlocks (val, blockSize) {
	return Math.ceil(val / blockSize) + 1;
}
