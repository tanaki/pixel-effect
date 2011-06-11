(function( $ ){
	$.fn.random = function(min, max) {
		do {
			rand = Math.round( Math.random() * 10 );
		}
		while ( rand < min || rand > max )
		return rand;
	};
	
	$.random = $.fn.random;
})( jQuery );