/**
 * Created by andycall on 15-1-21.
 */


// 计算滚动方向
var CaculateDirection = (function(){
	var direction = 1,
		scrollTmp = 0;

	return function(scrollTop){
		if(scrollTop > scrollTmp){
			direction = 1;
		}
		else{
			direction = -1;
		}
		scrollTmp = scrollTop;

		return direction;
	}
}());

$(document).ready(function(){
	$( "#tabs" ).tabs();

	function windowScroll(index){
		$("body").animate({
			scrollTop : positionArr[index]
		});
	}

	window.windowScroll = windowScroll;


	var d               = document,
		right_slider   = $(".e-rightslide"),
		right_offset     = right_slider.offset(),
		//toolBar_toggle  = $(".toolBar_toggle"),
		//drop_down_menu  = $(".drop_down_menu"),
		slide_item    = $(".slide-item"),
		//sec_title       = $(".sec_title"),
		//toolbar         = $(".toolbar_text"),
		//toolbar_text    = toolbar.find("span"),
		//shop_id         = $(".res_info_header").data("shop_id"),
		scrollIndex     = 0,
		positionArr = [660,  1222, 1820, 2410, 3431, 4084] ,
		ready_tmp,               // 状态保存
		ready_status    = false, // 是否需要运行切换
		good_list = {},
		cate_view  = $(".cate_view"),
		menu_list = $(".menu_list"),
		original_list = cate_view.html();


	$(".two-dimension-code").on('click', function(){
		$("body").animate({
			scrollTop : 0
		});
	});

	window.onload = function(){
		var startTop = $(window).scrollTop();
		var start = 0;
		var end = 5;
		for(var i = 0; i < 6; i ++){
			if(startTop > positionArr[i]){
				start++;
			}
		}
		$('.slide-item').each(function(){
			this.className = "slide-item";
		});
		slide_item.eq(start).addClass('current');
		scrollIndex = start;
	};

	slide_item.on('click', function(e){
		var target = $(e.target);
		var index = target.attr('data-index');
		$("body").animate({
			scrollTop : positionArr[index]
		});
		scrollIndex = index;
		$('.slide-item').each(function(){
			this.className = "slide-item";
		});
		slide_item.eq(index).addClass('current');
	});

	$(window).on('scroll', function(e){
		var scrollTop = $(window).scrollTop(),
			direction = CaculateDirection(scrollTop),
			isReady = scrollTop >= 650, // 是否可以切换fixed
			nextPosition, prevPosition,
			target,
			target_id;


		if(isReady != ready_tmp){
			ready_status = true;
			ready_tmp = isReady;
		}

		if(isReady && ready_status){
			right_slider.css({
				"position" : "fixed",
				"top" : 50
			});
			ready_status = false;
		}
		else if(!isReady && ready_status){
			right_slider.css({
				"position" : "absolute",
				"top"    : "695px"
			});
			ready_status = false;
		}


		if(isReady && direction === 1){
			if(scrollIndex + 1 >= positionArr.length) return;
			console.log(scrollTop);
			nextPosition = positionArr[scrollIndex+1];
			if(scrollTop + 30 > nextPosition){
				$('.slide-item').each(function(){
					this.className = "slide-item";
				});
				slide_item.eq(scrollIndex + 1).addClass('current');
				scrollIndex++;
			}
		}
		else if(isReady && direction === -1){
			if(scrollIndex - 1 < 0) return;
			prevPosition = positionArr[scrollIndex];
			if(scrollTop + 30 < prevPosition){
				$('.slide-item').each(function(){
					this.className = "slide-item";
				});
				slide_item.eq(scrollIndex -1).addClass('current');
				scrollIndex--;
			}
		}
	});

});