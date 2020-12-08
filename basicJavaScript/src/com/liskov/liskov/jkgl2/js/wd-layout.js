/**
 * Created by Administrator on 2015/3/2.
 */

/**
 * Created by Administrator on 2014/11/10.
 */
$.widget('wd.layout',{
    version:'1.0.0',
    options:{
        defaultValue:28,  //收缩后的高度或者宽度
        openCallback:function(elem){

        },
        closeCallback:function(elem){

        }
    },
    _create:function(){
        var that=this;
        var element=this.element;
        $(element).hide();
        that.init();
        $(element).fadeIn();
        element.on('click','.layout-toggler',function(){
            var parentElement=$(this).parent();
            if(parentElement.attr('data-show')=='hide'){
                that.showAnimate(parentElement, function(){that.init();that.options.openCallback(parentElement);});
                parentElement.attr('data-show','show');
                $(this).addClass('layout-toggler-close').removeClass('layout-toggler-open');
            }else{
                that.options.closeCallback(parentElement);
                that.hideAnimate(parentElement, function(){that.init(); });
                parentElement.attr('data-show','hide');
                $(this).removeClass('layout-toggler-close').addClass('layout-toggler-open');
            }
        });
    },
    init:function(){
        var that=this,
             element=this.element;

        that.height=element.height()!=0?element.height():$(window).height();
        that.width=element.width()!=0?element.width():$(window).width();
        element.css({height:that.height,width:that.width});

        that.topHeight=0;  //记录top值
        that.leftWidth=0;
        that.rightWidth=0;
        that.bottomHeight=0;
        that.setPosition();
        $(window).resize(function(){

            that.height=/*element.height()!=0?element.height():*/$(window).height();
            that.width=/*element.width()!=0?element.width():*/$(window).width();
            element.css({height:that.height,width:that.width});

            that.topHeight=0;  //记录top值
            that.leftWidth=0;
            that.rightWidth=0;
            that.bottomHeight=0;
            that.setPosition();
        });
    },
    setPosition:function(){
        var that=this;
        var element=this.element;
        var topElement=element.children("[data-layout='top']");
        var BottomElement=element.children("[data-layout='bottom']");
        var leftElement=element.children("[data-layout='left']");
        var rightElement=element.children("[data-layout='right']");
        var leftElement=element.children("[data-layout='left']");
        var centerElement=element.children("[data-layout='center']");

        topElement.each(function(index){
            if($(this).attr('data-show')=='hide'){
                var heights= parseInt($(this).attr('data-height'),10);
                $(this).css({'position': 'absolute', 'left': '0', 'top': that.topHeight, width: '100%', 'height':heights,top:-heights});
                that.topHeight += 0;
                return
            }else {
                var heights = parseInt($(this).attr('data-height'), 10);
                $(this).css({'position': 'absolute', 'left': '0', 'top': that.topHeight, width: '100%', 'height': heights});
                that.topHeight += heights;
            }
        });

        BottomElement.each(function(index){
                if($(this).attr('data-show')=='hide'){
                    var heights= parseInt($(this).attr('data-height'),10);
                    $(this).css({'position': 'absolute', 'left': '0', 'bottom':that.bottomHeight, width: '100%', 'height': heights,bottom:-heights});
                    that.bottomHeight += 0;
                    return;
                }else {
                    var heights= parseInt($(this).attr('data-height'),10);
                    $(this).css({'position':'absolute','left':'0','bottom':that.bottomHeight,width:'100%','height':heights});
                    that.bottomHeight+= heights;
                }
        });

        leftElement.each(function(index){
                if($(this).attr('data-show')=='hide'){
                    var widths = parseInt($(this).attr('data-width'), 10);
                    $(this).css({'position': 'absolute', 'left': that.leftWidth, 'top': that.topHeight, 'height': that.height - that.topHeight - that.bottomHeight, 'width': widths,left:-widths});
                    that.leftWidth += 0;
                    return;
                }else {
                    var widths = parseInt($(this).attr('data-width'), 10);
                    $(this).css({'position': 'absolute', 'left': that.leftWidth, 'top': that.topHeight, 'height': that.height - that.topHeight - that.bottomHeight, 'width': widths});
                    that.leftWidth += widths;
                }
        });

        rightElement.each(function(index){
                if($(this).attr('data-show')=='hide'){
                    var widths = parseInt($(this).attr('data-width'), 10);
                    $(this).css({'position': 'absolute', 'right': that.rightWidth, 'top': that.topHeight, 'height': that.height - that.topHeight - that.bottomHeight, 'width': widths,right:-widths });
                    that.rightWidth += 0;
                    return
                }else {
                    var widths = parseInt($(this).attr('data-width'), 10);
                    $(this).css({'position': 'absolute', 'right': that.rightWidth, 'top': that.topHeight, 'height': that.height - that.topHeight - that.bottomHeight, 'width': widths});
                    that.rightWidth += widths;
                }
        });
        centerElement.each(function(index){
                if($(this).attr('data-show')=='hide'){
                    $(this).hide();
                    return
                }else {
                    $(this).css({'position': 'absolute', 'left': that.leftWidth, 'top': that.topHeight, 'height': that.height - that.topHeight - that.bottomHeight, 'width': that.width - that.leftWidth - that.rightWidth});
                }
        });

    },
    showAnimate:function(element,callback){
        var value=$(element).attr('data-layout'),width,height;
        if(value=='top'){
            height=parseInt($(element).attr('data-height'));
            $(element).animate({top:0},500,callback);
        }else if(value=='bottom'){
            height=parseInt($(element).attr('data-height'));
            $(element).animate({bottom:0},500,callback);
        }else if(value=='left'){
            width=parseInt($(element).attr('data-width'));
            $(element).animate({left:0},500,callback);
        }else if(value=='right'){
            width=parseInt($(element).attr('data-width'));
            $(element).animate({right:0},500,callback);
        }
    },
    hideAnimate:function(element,callback){
        var value=$(element).attr('data-layout'),width,height;
        if(value=='top'){
            height=parseInt($(element).attr('data-height'));
            $(element).animate({top:-height},500,callback);
        }else if(value=='bottom'){
            height=parseInt($(element).attr('data-height'));
            $(element).animate({bottom:-height},500,callback);
        }else if(value=='left'){
            width=parseInt($(element).attr('data-width'));
            $(element).animate({left:-width},300,callback);
        }else if(value=='right'){
            width=parseInt($(element).attr('data-width'));
            $(element).animate({right:-width},300,callback);
        }
    },
    _destroy: function(){
    },
    _setOption: function(key, value){
        this._super('_setOption', key, value);
    }
});
