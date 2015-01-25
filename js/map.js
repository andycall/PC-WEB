$(document).ready(function(){
	var place = [
		{
			left: 750,
			top: 100,
			image : "",
			title : "北美洲",
			content : "laskdlk12e1j12d2",
			moreHref : "http://baidu.com"
		},
		{
			left: 850,
			top: 280,
			image : "",
			title : "南美洲",
			content : "laskdlk12e1j12qqwdqwdqwdwqdd2",
			moreHref : "http://taobao.com"
		}

	];
	var elementCache = document.createDocumentFragment();
	$.each(place, function(index, value){
		if(index == 0){
			$('.essay').html(value['content']);
			$('.forMore').attr('href', value['moreHref']);
			$('.place-icon').html(value['title']);
		}

		var elementStr =
			'<li style="top: ' + value['top'] +'px; left: ' + value['left' ]+'px;" class="island-item" data-moreHref="' + value['moreHref'] + '"  data-content="' + value['content'] +'"> ' +
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
		$('.essay').html(content);
		$('.forMore').attr('href', moreHref);
		$('.place-icon').html(title);
	});

});