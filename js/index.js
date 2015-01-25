/**
 * Created by huai.yang on 2015/1/17.
 */

/*******  使用jquery ready创建一个闭包  ********/
$(document).ready(function(){

    /*******  将所有的对象提前声明， 包括document对象缓存  ********/
    var document = document;

    var $next = $("#next");
    var $share = $("#share");
    var $choice = $("#choice");
/*    var $retest = $("#retest");*/

    var $headerinfo = $('.header-info');
    var $shareDialog = $(".dialog-share");
    var $testcontent = $('#test_content');
    var $resultcontent = $('#result-content');
    var $dialogmask = $('#dialog-mask');
    var $question = $('#question');
    var $testbg = $('#test_bg');
    var index = 0; // 题目索引

    /*******  输入结果缓存对象， 用户保存用户输入结果   Start   ********/
    var Input_result = window.input = (function(){
        // 输入对象构造函数
        function Input(){
            this.result = {};
        }

        Input.prototype.add = function(name){
            if(!this.result[name]){
                this.result[name] = {
                    length : 1
                };
                return 0;
            }
            this.result[name].length++;
            return 1;
        };

        Input.prototype.getBest = function(){
            var target = 1,
                index,
                is_equal = false,
                isone = true;

            for(var key in this.result){
                if(this.result[key].length > target){
                    index = key;
                    target = this.result[key].length;
                    is_equal = false;
                }else if(this.result[key].length == target){
                    is_equal = true;
                }
                if(this.result[key].length > 1)
                    isone = false;
            }

            if(is_equal){
                var nameArr = Object.keys(this.result);
                /*index = parseInt((nameArr.length - 1) * Math.random());*/
                index = 0;
                return nameArr[index];
            }

            if(isone){
                return "%￥#@！#";
            }

            return index;
        };
        return new Input();
    })();

    /*******  输入结果缓存对象， 用户保存用户输入结果   End       ********/

    /*****   模板渲染 start *****/
    function render_question(){
        var exercise_JSON = exercise[index];
        var exercise_HTML = template($("#test_template").html())({
            index : index,
            title : exercise_JSON['title'],
            test : exercise_JSON['test']
        });
        $question.html(exercise_HTML);
        $('.option').on('touchstart click', option_click);
    }
    /***** 模板快 end ****/

    $choice.on('touchstart click', function(e){
        e.preventDefault();
        $(this).parents('.describtion').hide();
        $testcontent.show();
        render_question();
    });

    /***  事件处理 ****/

    $('body').delegate(".retest","touchstart click",function(e){
        e.preventDefault();
        index = 0;
        $headerinfo.html("<p>有人说，爱她就带她去海岛，恨她就让她来选岛！</p>" +
            "<p>驼儿君说，选岛攻略哪家强，去哪儿攻略来帮忙！</p>");
        render_question();
        $next.show();
        $testbg.show();
        $resultcontent.hide();
        $share.hide();
    });

    $next.on('touchstart click', function(e){
        e.preventDefault();
        if($(".island-active").length == 0){

            return;
        }
        index++;
        if(index == 4){
            $share.show();
            $next.hide();
        }
        if(index < exercise.length){
            setTimeout(function(){
                render_question();
            }, 100);
        }else{
            $share.show();
        }
    });
    $share.on('touchstart click', function(e){
        e.preventDefault();
        if($(".island-active").length == 0){
            return;
        }
        $dialogmask .show();
        window.best = Input_result.getBest();
    });

    $shareDialog.on('touchstart click',function(e){
        e.preventDefault();
        $dialogmask .hide();

        $headerinfo.html("<p class='result'>经过测算，最适合你的海岛是</p>");
        $testbg.hide();

        var island_pic = window.template($('#island_pic').html())({
            name: best,
            reason : exersize_result[best]['reason'],
            img : exersize_result[best]['img']
        });
        $('.island-pic').html(island_pic);
        $resultcontent.show();
    });

    function option_click(e){
        e.preventDefault();
        var target = $(e.currentTarget).find('.circle');
        var allcircle = target.parents('.subject').find('.circle');
        var result = target.parents('.option').data('island').split(',');

        allcircle.each(function(){
            this.className = "circle";
        });

        for(var i = 0,len = result.length; i < len; i ++){
            Input_result.add(result[i]);
        }
        target.addClass('island-active');
    }

    /***  事件处理 END ****/

});