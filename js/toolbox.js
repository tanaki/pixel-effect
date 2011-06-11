var ToolBox = {
	
	init : function(){
		
		$("#slider-pixel").slider({
			value:30,
			min: 10,
			max: 100,
			step: 10,
			slide: function( event, ui ) {
				$("#pixel-size").text( ui.value );
			}
		});
		
		$("#slider-title").slider({
			value:6,
			min: 1,
			max: 20,
			step: 1,
			slide: function( event, ui ) {
				$("#title-size").text( ui.value );
				$("#wrapper h1").css("font-size", ui.value+"em");
			}
		});
		
		$("#slider-subtitle").slider({
			value:3,
			min: 1,
			max: 20,
			step: 1,
			slide: function( event, ui ) {
				$("#subtitle-size").text( ui.value );
				$("#wrapper h2").css("font-size", ui.value+"em");
			}
		});
		
	}
	
};