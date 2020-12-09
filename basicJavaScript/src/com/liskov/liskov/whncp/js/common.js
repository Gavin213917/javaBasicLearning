$(function () {
    $(document)
        .on("click",'.downmenu>li>a',function(){
        event.stopPropagation();
        $('.downmenu>li').removeClass('onLink');
        $(this).parent('li').addClass('onLink');
    })
        .on("click",'.tabList span',function(){
            $(this).addClass('active').siblings('span').removeClass('active');
            var idx = $(this).index();
            $(".tabBody").eq(idx).addClass('tactive').siblings('.tabBody').removeClass('tactive');
        })
        .on("click",'.menu > .title',function(){
            if(!$(this).hasClass('ontitle')) {
                $('.menu .title').removeClass('ontitle');
                $(this).addClass('ontitle');
            }else{
                $(this).removeClass('ontitle');
            }
        }) .on("click",'.downmenu .title',function(){
        if(!$(this).hasClass('ontitle')) {
            $('.downmenu .title').removeClass('ontitle');
            $(this).addClass('ontitle');
        }else{
            $(this).removeClass('ontitle');
        }
    });
    var phone = $("#mobilephone").val();
    if (phone != '' && phone.length >= 4) {
        phone = phone.substring(phone.length-4, phone.length);
    }

    function dateFtt(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()//毫秒
        };
        if (arguments.length == 1) {
            fmt = 'yyyyMMddhhmmss';
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    var displayTxt;
    //有电话显示电话，没电话显示用户名
    var telephone = $("#mobilephone").val();
    console.log(telephone);
    if(telephone != ''){
        displayTxt = telephone;
    }else{
        displayTxt = $("#loginName").text();
    }
    console.log(displayTxt);
    watermark({ watermark_txt: displayTxt + " "　+  dateFtt(new Date())});

})

//调整iframe高度
function iFrameHeight() {
    var ifm = document.getElementById("rightiframe");
    if (ifm != null) {
        ifm.height =  window.screen.availHeight;
    }
}

//加水印方法
var mask_div = document.createElement('div');
mask_div.id = 'mask_div1';
mask_div.style.position = "absolute";
mask_div.style.left =  '20px';
mask_div.style.top =  '20px';
mask_div.style.overflow = "hidden";
mask_div.style.zIndex = "9999";
mask_div.style.opacity = 0;
document.body.appendChild(mask_div);

function watermark(settings) {
    //默认设置
    var defaultSettings={
        watermark_txt:"text",
        watermark_x:20,//水印起始位置x轴坐标
        watermark_y:20,//水印起始位置Y轴坐标
        watermark_rows:6,//水印行数
        watermark_cols:20,//水印列数
        watermark_x_space:100,//水印x轴间隔
        watermark_y_space:50,//水印y轴间隔
        watermark_color:'#000000',//水印字体颜色
        watermark_alpha:0.1,//水印透明度
        watermark_fontsize:'15px',//水印字体大小
        watermark_font:'微软雅黑',//水印字体
        watermark_width:150,//水印宽度
        watermark_height:100,//水印长度
        watermark_angle:15//水印倾斜度数
    };
    //采用配置项替换默认值，作用类似jquery.extend
    if(arguments.length===1&&typeof arguments[0] ==="object" ) {
        var src=arguments[0]||{};
        for(key in src) {
            if(src[key]&&defaultSettings[key]&&src[key]===defaultSettings[key]) {
                continue;
            } else if(src[key]) {
                defaultSettings[key]=src[key];
            }
        }
    }

    var oTemp = document.createDocumentFragment();
    //获取页面最大宽度
    var page_width = Math.max(document.body.scrollWidth,document.body.clientWidth);
    //获取页面最大长度
    var page_height = Math.max(document.body.scrollHeight,document.body.clientHeight);

    //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
    if (defaultSettings.watermark_cols == 0 || (parseInt(defaultSettings.watermark_x + defaultSettings.watermark_width *defaultSettings.watermark_cols + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1)) > page_width)) {
        defaultSettings.watermark_cols = parseInt((page_width-defaultSettings.watermark_x+defaultSettings.watermark_x_space) / (defaultSettings.watermark_width + defaultSettings.watermark_x_space));
        defaultSettings.watermark_x_space = parseInt((page_width - defaultSettings.watermark_x - defaultSettings.watermark_width * defaultSettings.watermark_cols) / (defaultSettings.watermark_cols - 1));
    }
    //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
    if (defaultSettings.watermark_rows == 0 || (parseInt(defaultSettings.watermark_y + defaultSettings.watermark_height * defaultSettings.watermark_rows + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1)) > page_height)) {
        defaultSettings.watermark_rows = parseInt((defaultSettings.watermark_y_space + page_height - defaultSettings.watermark_y) / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
        defaultSettings.watermark_y_space = parseInt(((page_height - defaultSettings.watermark_y) - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1));
    }
    var x;
    var y;
    for (var i = 0; i < defaultSettings.watermark_rows; i++) {
        y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
        for (var j = 0; j < defaultSettings.watermark_cols; j++) {
            x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;

            var mask_div = document.createElement('div');
            mask_div.id = 'mask_div' + i + j;
            mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt));
            //设置水印div倾斜显示
            mask_div.style.webkitTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.MozTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.msTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.OTransform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.transform = "rotate(-" + defaultSettings.watermark_angle + "deg)";
            mask_div.style.visibility = "";
            mask_div.style.position = "absolute";
            mask_div.style.left = x + 'px';
            mask_div.style.top = y + 'px';
            mask_div.style.overflow = "hidden";
            mask_div.style.zIndex = "9999";
            //mask_div.style.border="solid #eee 1px";
            mask_div.style.opacity = defaultSettings.watermark_alpha;
            mask_div.style.fontSize = defaultSettings.watermark_fontsize;
            mask_div.style.fontFamily = defaultSettings.watermark_font;
            mask_div.style.color = defaultSettings.watermark_color;
            mask_div.style.textAlign = "center";
            mask_div.style.width = defaultSettings.watermark_width + 'px';
            mask_div.style.height = defaultSettings.watermark_height + 'px';
            mask_div.style.display = "block";
            mask_div.style.pointerEvents = "none"; //禁止水印被复制并防止遮挡【实体虚化】
            oTemp.appendChild(mask_div);
        };
    };
    document.body.appendChild(oTemp);
}

