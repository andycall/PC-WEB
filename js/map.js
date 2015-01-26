$(document).ready(function(){

	var elementCache = document.createDocumentFragment();
	$.each(place, function(index, value){
		if(index == 0){
			$('.essay').html(value['content']);
			$('.forMore').attr('href', value['moreHref']);
			$('.place-icon').html(value['title']);
			$('.content_image').attr('src', value['image']);
		}

		var elementStr =
			'<li style="top: ' + value['top'] +'px; left: ' + value['left' ]+'px;" class="island-item" data-image="' + value['image'] +'" data-moreHref="' + value['moreHref'] + '"  data-content="' + value['content'] +'"> ' +
				'<a href="javascript:void(0)">' + value['title']  +'</a> ' +
			'</li>';

		elementCache.appendChild($(elementStr)[0]);
	});
	$('.island-list').html(elementCache);


	$(".island-item").on('click', function(e){
		var target = e.target;
		if(target.nodeName != 'LI') target = target.parentNode;

		var title = $(target).find('a').html();
		var content = $(target).attr('data-content');
		var moreHref = $(target).attr('data-moreHref');
		var image = $(target).attr('data-image');
		$('.essay').html(content);
		$('.forMore').attr('href', moreHref);
		$('.place-icon').html(title);
		$('.content_image').attr('src', image);
	});

});