var DialogComm;
var DialogCommSetup;
var g = {
	
    fullheight:function(elem,cut) {
        if($(elem).length==0){
            return;
        }
        if(cut==undefined){
            cut=0
        }
        var top = $(elem).offset().top;
        $(elem).css({'height': $(window).height() - top-cut});
        $(window).resize(function () {
            var top = $(elem).offset().top;
            $(elem).css({'height': $(window).height() - top-cut});
        });
    },

    TabShow: function (tabNavID, $pageTabBox, Event) {/*简单的tab切换效果*/
        var $pageTabBox = $($pageTabBox);
        var $pageChild = $pageTabBox.children('div');
        $(tabNavID).children('li').not(".more").bind(Event, function () {
            var $this = $(this);
            var index = $this.index();
           // alert(fn);
            $this.addClass('active').siblings().removeClass('active')
            $pageChild.removeClass('active').hide();
            $pageChild.eq(index).addClass('active').show();
            //return false;
        });
    },
    AlertBox: function (elem, alertBox, obj, callbacksure, callbackclose) { //可以增加关闭和其他按钮的回调函数
        if ($(alertBox).length == 0) {
            return;
        }
        if($.ui.Dialog){
            var opt = {
                elem: alertBox,
                overlay: false
            };
            if (typeof obj == 'object') {
                $.extend(opt, obj);
            }
            var Dialog = new $.ui.Dialog(elem, opt);
            DialogComm = Dialog;
            $(alertBox).find(".close").click(function () {
                Dialog.close();
                if (typeof callbackclose == 'function') {
                    callbackclose();
                }
            });
            $(alertBox).find(".save_btn").click(function () {
                //Dialog.close();
                //$.fn.calendarWidget();
                if (typeof callbacksure == 'function') {
                    callbacksure();
                }
            });
        }
    },
    AlertText: function (elem, obj) {//具体配置请参考Dialog库
        if($.ui.Dialog){
            var Dialog = new $.ui.Dialog(elem, obj);
        }
    },
    //快捷方式设定弹出框
    SetupBox: function (elem, setupBox, obj, callbacksure, callbackclose) { //可以增加关闭和其他按钮的回调函数
        if ($(setupBox).length == 0) {
            return
        }
        if($.ui.Dialog){
            var opt = {
                elem: setupBox,
                overlay: false
            }
            if (typeof obj == 'object') {
                $.extend(opt, obj)
            }
            var Dialog = new $.ui.Dialog(elem, opt);
            DialogCommSetup = Dialog;
            $(setupBox).find(".setup_close").click(function () {
            	
                Dialog.close();
                
                if (typeof callbackclose == 'function') {
                    callbackclose();
                }
            });
            $(setupBox).find(".setup_btn").click(function () {
                //Dialog.close();
                //$.fn.calendarWidget();
                if (typeof callbacksure == 'function') {
                    callbacksure();
                }
            });
        }
    },
    SetupText: function (elem, obj) {//具体配置请参考Dialog库
        if($.ui.Dialog){
            var Dialog = new $.ui.Dialog(elem, obj);
        }
    }
}

$(function(){
    if($.fn.layout) {
        $('#LayoutBox').layout({
            openCallback:function(){
                $('.ecope_likescrollbar').show();
            },
            closeCallback:function(){
                $('.ecope_likescrollbar').hide();
            }
        });
    }

    var iframe=$('#Content');
    var rightIframe=$('#rightMain');
    $('.nav-box').find('a').click(function(e){
        var e = e || window.event;
        e.preventDefault();
        e.stopPropagation();
        var $li=$(this).parent('li');
        var src=$(this).attr('href');
        if(src!=""&&src!=undefined&&src!='#'&&src!='javascript:void(0);'){
            $('.nav-box').find('li').removeClass('active');
            $li.addClass('active');
            iframe.attr('src',src);
        }
        return false;
    });

    /*导航下拉菜单*/
    $('.nav-box').find('li').hover(function(){
        $(this).children('ul').show();
        $(this).addClass('hover');

    },function(){
        $(this).children('ul').hide();
        $(this).removeClass('hover');
    });



    /*左侧导航*/
    (function(){
        var navTime,show=false;
        $('.left-nav-box').find('.nav-ul').children('li').hover(function(){
            clearTimeout(navTime);
            $('.left-nav-box').find('.sub-nav').hide();

            $('.left-nav-box').find('.nav-ul').children('li').removeClass('hover');

            var top=$(this).offset().top;
            var id=$(this).attr('data-nav');
            if(typeof(id)!='undefined')
            {
	            var height =$('#'+id)[0].children.length*38;
	            if(top<0)
	            {
	            	top=10;
	            }
	            else if(top+height-480>=0)
	            {
	            	top = top - (height-(480-top));
	            }
	            $('#'+id).show().css({'top':top});
	            $(this).addClass('hover');
        	}
        },function(e){
            var that=this;
            var id=$(this).attr('data-nav');
            navTime=setTimeout(function(){
                if(show){
                    return;
                }
                $(that).removeClass('hover');
                $('#'+id).hide();
            },400);
        });
        $('.left-nav-box').find('.sub-nav').hover(function(){
            show=true;
        },function(){
            show=false;
            $(this).hide();
        });
    })();

    $('.left-nav-box').find('a').click(function(e){
        var e = e || window.event;
        e.preventDefault();
        e.stopPropagation();
        var $li=$(this).parent('li');
        var src=$(this).attr('href');
        if(src!=""&&src!=undefined&&src!='#'&&src!='javascript:void(0);'){
            $('.nav-box').find('li').removeClass('active');
            $li.addClass('active');
            rightIframe.attr('src',src);
        }
        return false;
    });
    
    
});
