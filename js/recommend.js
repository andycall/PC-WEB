$(document).ready(function(){

	$('.close').on('click', function(){
		$(this).parents('.dialog').hide();
	});


    var imageWidth = $('.bg_image').width();
    var imageHeight = $('.bg_image').height();
    //var animateLock = false;

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

});