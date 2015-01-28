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

    var island_item = $('.map_placeicon');
    var image_url = island_item.css('background-image');

    island_item.eq(0).css({'background-image' : image_url.replace('place.png', 'place2.png')});

    island_item.on('click', function(e){
        var target = e.target;
        if(target.nodeName != 'LI') target = target.parentNode;


        island_item.each(function(index){
            $(this).css({
                'background-image' : image_url
            });
        });

        $(target).css({
            'background-image' : image_url.replace('place.png', 'place2.png')
        });

        var title = $(target).find('a').html();
        var content = $(target).attr('data-content');
        var moreHref = $(target).attr('data-moreHref');
        var image = $(target).attr('data-image');
        $('.map_essay').html(content);
        $('.pic-link').attr('href', moreHref);
        $('.forMore').attr('href', moreHref);
        $('.place-icon').html(title);
        $('.content_image').attr('src', image);
    });

});