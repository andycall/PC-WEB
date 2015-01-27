$(document).ready(function(){

	var templates = template($("#push_island").html())({
		islands : recommend
	});
	$('#recommend-content').html(templates);
	$('.close').on('click', function(){
		$(this).parents('.dialog').hide();
	});

	$('.push_item').on('click', function(e){
		var target = e.target;
		while(target.className.indexOf('push_item') < 0) target = target.parentNode;

		var place = $(target).attr('data-place');
		var writer = $(target).attr('data-writer');
		var content = $(target).attr('data-content');
		var show_pic = $(target).attr('data-show_pic').split(",");
		var flag = $(target).attr('data-flag');

		var dialog = $('.dialog');
		dialog.find('h2').html(place);
		dialog.find('.name').html(writer);
		dialog.find('.flag').html(flag);
		dialog.find('.essay').html(content);

		var img_container = dialog.find('.show');
		img_container.html("");
		for(var i = 0, len = show_pic.length; i < len; i ++){
			img_container.append('<li class="pic"><img src="' + show_pic[i] +'" alt=""/></li>')
		}

		dialog.show();

	});
});