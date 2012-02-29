/*
*	jQuery lavaLamp plugin
*	Version: 0.1.0
*	Author: Steffen Dietz
*
*	Rewritten b\c old plugin also triggered on nested lists, which is not always useful.
*	
*/


(function($) {
	$.fn.lavaLamp = function(o) {
		
		/*
		*	SETUP OBJECT
		*	TODO: Check if possible to provide less vars but put them in the lavaLamp call
		*	critical vars: excludeEl, outOfBounds, 
		*/
		
		o = $.extend({  fx: 'swing',
						speed: 300,
						elem: $('li',this),
						activeEl: $('li.active',this),
						excludeEl: $('li>ul>li'),
						slider: $('<li class="back"><div class="left"></div></li>'),
						appendSlider: true,
						click: function(){}
						},
						o || {}
						);

		return this.each(function() {
		
			/*
			*	SETUP lavaLamp
			*
			*	TODO: if has active then outOfBounds has to be false to have the indicator going 
			*	there on init - u know what i mean?!
			*	best way - don't provide outOfBounds - just check for activeEl ?!
			*/
			
			var me = $(this),
				noop = function(){},
				s = o.appendSlider ? $(o.slider).appendTo(me) : o.slider,
				curr = o.activeEl.length ? move(o.activeEl) : move(null);
			
			$(o.elem).not(o.excludeEl).not(s).hover(
				function() {
					move(this);
				},
				noop
			);
			
			$(this).hover(
				noop,
				function() {
					move(curr);
				}
			);

			$(o.elem).click(function(e) {
				setCurr(this);
				return o.click.apply(this, [e, this]);
			});
			
			function move(el) {
				
				if(el != null){
					
					s.each(function() {
						$(this).dequeue();
					}).animate({
						width: $(el).width(),
						left: $(el).position().left
					}, o.speed, o.fx);

				}
				else
				{
				
					s.each(function() {
						$(this).dequeue();
					}).animate({
						width: 0,
						left: 0
					},o.speed, o.fx);
					
				}
				
				return el;
			};

		});
	};
})(jQuery);
