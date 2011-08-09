var
	img,
	imgCtx,
	imgCanvas,
	animateInterval,
	pixels = [];
	
$(document).ready(function(){

	console.log( 'ready' );

	imgCanvas = document.getElementById('image');
	imgCtx = document.getElementById('image').getContext('2d');
	drawImage();
	
});

function drawImage() {

	img = new Image();
	img.src = 'img/img1.jpg';
	
	img.onload = function(){
		imgCtx.drawImage(img, 0, 0);
		initPixels();	
	}	
}

function initPixels () {
	
	

}