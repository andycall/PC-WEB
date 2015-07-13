$(document).ready(function(){

	var templates = template($("#push_island").html())({
		islands : recommend
	});
	$('#recommend-content').html(templates);
	$('.close').on('click', function(){
		$(this).parents('.dialog').hide();
	});

    var imageWidth = $('.bg_image').width();
    var imageHeight = $('.bg_image').height();

	$(".bg_image").hover(function(e){
        console.log(e.target);
        if(e.target.className !== 'bg_image') return;
        var item = e.target;
        $(item).animate({
            width : imageWidth * 1.02,
            height : imageHeight * 1.02,
            left : 0 - imageHeight * 0.02 ,
            top : 0 - imageWidth * 0.02 / 2
        }, 200);
    }, function(e){
        if(e.target.className !== 'bg_image') return;
        var item = e.target;
        $(item).animate({
            width : imageWidth,
            height : imageHeight,
            top: 0,
            left: 0
        }, 200);
    });
	$('.push_item').on('click', function(e){
		var target = e.target;
        while(target.className.indexOf('push_item') < 0) target = target.parentNode;

		var place = $(target).attr('data-place');
		var writer = $(target).attr('data-writer');
        var writer_url = $(target).attr('data-writer_url');
		var content = $(target).attr('data-content');
		var show_pic = $(target).attr('data-show_pic').split(",");
		var flag = $(target).attr('data-flag');
        var link = $(target).attr('data-link');
        var code_img = $(target).attr('data-code_img');
        var place_url = $(target).attr('data-place_url');

		var dialog = $('.dialog');
		dialog.find('.recommend-tit').html(place).attr('href',place_url);
		dialog.find('.name').html(writer);
        dialog.find('.writer-img').attr('src',code_img);
        dialog.find('.writer-space').attr('href',writer_url);
		dialog.find('.flag').html(flag);
		dialog.find('.intro').html(content +'<a href="'+ link +'" target="_blank">去看我的'+place+'游记</a>');

		var img_container = dialog.find('.show');
		img_container.html("");
		for(var i = 0, len = show_pic.length; i < len; i ++){
			img_container.append('<li class="pic"><a href="'+ link +'" target="_blank"><img src="' + show_pic[i] +'" alt=""/></a></li>')
		}

		dialog.show();

	});
});

$('body').delegate('*', 'mousedown', function (event) {
    var beacon = $(event.currentTarget).data('beacon');
    if (beacon) {
        QNR.clickLog(SID, beacon);
        event.stopPropagation();
    }
});