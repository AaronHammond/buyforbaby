templates = {};

(function () {
	$('script[type="text/x-handle-bars-template"]').each(function(index) {
		$template = $(this);
		// step over all template 'script' elements, compile each into our global template holder
		templates[$template.attr('id').replace('-template', '')] = Handlebars.compile($template.html()); 
	});
})();

