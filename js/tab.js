$(document).ready(function(){
	var titCon = $('.tit-con');
	$('.item').on('click', function(e){
		var target = e.target;
		var notice_btn = $('.notice_btn');
		while(target.className != 'item') target = target.parentNode;

		var index = $(target).attr('data-index');

		titCon.each(function(){
			$(this).hide();
		});

		notice_btn.each(function(){
			this.className = "notice_btn";
		});

		titCon.eq(index).show();
		target.parentNode.className = "notice_btn selected";
	});
});