$(document).ready(function(){
	
	$(".link-corner")
		.mouseenter(function(e){
			$(".link-corner").mousemove(function(e){
				var 
					right = parseInt($('.img-cropped').css('right')) + 1,
					bottom = parseInt($('.img-cropped').css('bottom')) + 1;
				
					console.log( right, bottom );
					
				$('.img-cropped').css({
					'right' : right,
					'bottom' : bottom,
				});
			});
		})
		.mouseleave(function(e){
			$(".link-corner").unbind("mousemove");
		});
});
