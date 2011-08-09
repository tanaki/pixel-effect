$('.filter').live('click', function(e){
	e.preventDefault();
	
	$('.filtered')
		.animate({
			'height' : 150
		}, 400, moveSelected);
	
	$('.grid-project').each(function(i, el){
		if (i != 1 && i != 7) {
			$(el).animate({
				'opacity' : 0.5
			}, 300);
		} else {
			$(el).addClass('grid-selected');
		}
	});
	
});

function moveSelected(){
	
	$('.grid-selected').each(function(i, el){
		cloneItem(el);
	});
	moveClones();
}

function cloneItem(el) {
	var pos = $(el).position();
	var clone = $(el).clone();
	clone
		.addClass('grid-clone')
		.css({
			'position' : 'absolute',
			'top' : pos.top,
			'left' : pos.left
		});
	$('.filtered').append(clone);
	$(el).css('visibility', 'hidden');
}

function moveClones() {
	
	var pos = {};
	$('.grid-clone').each(function(i, el){
		
		if (i==0) {
			$(el)
				.animate({
					rotate : '20deg'
				})
				.animate({
					top : '20px',
					left : 200 * i
				}, {
					step : function(now, fx) {
						if ( fx.prop == "top" ) pos.top = now;
						if ( fx.prop == "left" ) pos.left = now + 100;
						Update( pos );
					},
					complete : function(){
					
						$(this).animate({
							rotate : '0'
						});
					}
				});
		}
	});
}