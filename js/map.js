$(document).ready(function(){

    var elementCache = document.createDocumentFragment();

    $.each(place, function(index, value){
        if(index == 0){
            $('.map_essay').html(value['content']);
            $('.forMore').attr('href', value['moreHref']);
            $('.place-icon').html(value['title']);
            $('.content_image').attr('src', value['image']);
        }

        var elementStr =
            '<li style="top: ' + value['top'] +'px; left: ' + value['left' ]+'px;" class="island-item" data-image="' + value['image'] +'" data-moreHref="' + value['moreHref'] + '"  data-content="' + value['content'] +'"> ' +
            '<div style="position: relative; width: 100%; height: 100%;">' +
            '<a style="position: absolute; left: ' + value['font_left'] +'px; top : ' + value['font_top'] + 'px" href="javascript:void(0)">' + value['title']  +'</a> ' +
            '<span class="map_placeicon"></span>' +
            '</div>' +
            '</li>';

        elementCache.appendChild($(elementStr)[0]);
    });
    $('.island-list').html(elementCache);
	var placeicon = $('.map_placeicon');

    var island_item = $('.island-item');
    var image_url = island_item.find('.map_placeicon').css('background-image');

	placeicon.eq(0).css({'background-image' : image_url.replace('place.png', 'place2.png')});

    island_item.on('click', function(e){
        var target = e.target;
        if(target.className != 'map_placeicon'){
			while(target.className != 'island-item') target = target.parentNode;
			target = $(target).find('.map_placeicon')[0];
		}

		console.log(target);

		placeicon.each(function(index){
            $(this).css({
                'background-image' : image_url
            });
        });

        $(target).css({
            'background-image' : image_url.replace('place.png', 'place2.png')
        });

        var title = $(target).parents(".island-item").find('a').html();
        var content = $(target).parents(".island-item").attr('data-content');
        var moreHref = $(target).parents(".island-item").attr('data-moreHref');
        var image = $(target).parents(".island-item").attr('data-image');

        $('.map_essay').html(content);
        $('.pic-link').attr('href', moreHref);
        $('.forMore').attr('href', moreHref);
        $('.place-icon').html(title);
        $('.content_image').attr('src', image);
    });

});