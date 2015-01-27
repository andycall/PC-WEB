/**
 * Created by huai.yang on 2015/1/17.
 */

/*******  使用jquery ready创建一个闭包  ********/
$(document).ready(function(){

    var pop_share = (function(){
        var AppKey = "100244931";
        var ObjPro = Object.prototype;
        var encode = encodeURIComponent;

        var Share = {
            "weibo" : {
                "url" : "http://service.weibo.com/share/share.php",
                "parse" : function(params){
                    var undef = null;
                    return {
                        url: params.url || location.href,
                        type:'3',
                        count: params.count || undef, /**是否显示分享数，1显示(可选)*/
                        appkey:params.appkey || AppKey, /**您申请的应用appkey,显示分享来源(可选)*/
                        title: params.title || "#去哪儿攻略#" + document.title, /**分享的文字内容(可选，默认为所在页面的title)*/
                        pic: params.pic || undef, /**分享图片的路径(可选)*/
                        ralateUid:params.uid || undef, /**关联用户的UID，分享微博会@该用户(可选)*/
                        language:params.language || undef , /**设置语言，zh_cn|zh_tw(可选)*/
                        dpc:1
                    };

                }
            },
            "QQroom" : {
                "url" : "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey",
                "parse" : function(params){
                    return {
                        desc:  params.title || "#去哪儿攻略#" + document.title,
                        title : "#去哪儿攻略#" + document.title,
                        summary : "#去哪儿攻略#" + document.title,
                        url: params.url || location.href,
                        site : params.site || location.hostname
                    };
                }
            },
            "tencent" : {
                "url" : "http://v.t.qq.com/share/share.php",
                "parse" : function(params){
                    return {
                        title : "#去哪儿攻略#" + document.title,
                        url: params.url || location.href,
                        site : params.site || location.hostname,
                        content: params.title || "#去哪儿攻略#" + document.title
                    };
                }
            }
        };

        var paramsToStr = function(params){
            var params_array = [];

            for (var i in params){
                var q_name = i;
                var q_val = params[q_name];

                if (ObjPro.toString.call(q_val) === "[object Array]") {
                    q_val = q_val.join(",");
                }
                if (q_val != null) {
                    q_val = encode(q_val);
                    params_array.push(q_name+"="+q_val);
                }
            }
            return params_array.join("&");
        };

        function sendShare(type,options){
            var config = Share[type];
            options = options || {};

            var url = config.url;
            var params = config.parse(options);
            var params_str = paramsToStr(params);
            url += "?" + params_str;
            window.open(url);
        }

        return sendShare;
    })();


    /*******  将所有的对象提前声明， 包括document对象缓存  ********/

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

        if(index == exercise.length - 1){
            $('.option').on('click', last_click);
        }
        else{
            $('.option').on(' click', option_click);
        }

    }

    /***** 模板快 end ****/
    //
    //$choice.on(' click', function(e){
    //    e.preventDefault();
    //    $(this).parents('.describtion').hide();
    //    $testcontent.show();
    //
    //});

    /***  事件处理 ****/

    $('body').delegate(".retest"," click",function(e){
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

    $next.on(' click', function(e){
        if($(".active").length == 0){
            return;
        }
        index++;

        if(index < exercise.length){
            setTimeout(function(){
                render_question();
            }, 100);
        }else{
            $share.show();
            $next.hide();
        }
        return false;
    });
    $share.on(' click', function(e){
        if($(".active").length == 0){
            return;
        }
        $dialogmask.show();
        //$testbg.hide();
        return false;
    });

    $shareDialog.on(' click',function(e){
        var best = Input_result.getBest();
        var type = $(e.target).attr('data-type');
        pop_share(type,  {
            title:'最适合我的海岛竟然是 '
            + exersize_result[best]['name']
            + exersize_result[best]['share']
            +'  小伙伴们表羡慕嫉妒恨啦！一起来测测吧！~ @去哪儿攻略 @去哪儿网'
        });
        $dialogmask.hide();
        $testbg.hide();
        var island_pic = window.template($('#island_pic').html())({
            name: best,
            reason : exersize_result[best]['reason'],
            share : exersize_result[best]['share'],
            img : exersize_result[best]['img']
        });
        $('.test-result').html(island_pic);
        $resultcontent.show();
        return false;
    });


    function option_click(e){
        var target = $(e.currentTarget).find('.circle');
        var allcircle = target.parents('.subject').find('.circle');
        var result = target.parents('.option').data('island').split(',');

        allcircle.each(function(){
            this.className = "circle";
        });

        for(var i = 0,len = result.length; i < len; i ++){
            Input_result.add(result[i]);
        }
        target.addClass('active');
        return false;
    }

    function last_click(e){
        var target = $(e.currentTarget).find('.circle');
        var allcircle = target.parents('.subject').find('.circle');
        var result = target.parents('.option').data('island').split(',');

        allcircle.each(function(){
            this.className = "circle";
        });

        for(var i = 0,len = result.length; i < len; i ++){
            Input_result.add(result[i]);
        }
        target.addClass('active');

        $share.show();
        $next.hide();

        return false;
    }

    /***  事件处理 END ****/
    render_question();
});