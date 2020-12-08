var utils = {
    /**
     * 日期格式化
     *
     * @param {Date} date 指定日期
     * @param {String} format
     * @returns {String}
     * @summary 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     * 年(y)可以用 1-4个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * @example (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02
     * 08:09:04.423 (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
     */
    formatDate: function (date, format) {
        var o = {
            'M+': date.getMonth() + 1, //month
            'd+': date.getDate(), //day
            'h+': date.getHours(), //hour
            'm+': date.getMinutes(), //minute
            's+': date.getSeconds(), //second
            'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
            'S': date.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        return format;
    },

    // 获取过去的n天
    getBeforeDay: function (date, days) {
        var date = date || new Date();
        return new Date(Date.parse(date.toString()) - 86400000 * days);
    },

    // 查询字符串
    getQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg); // 获取url中"?"符后的字符串并正则匹配
        var context = "";
        if (r != null) {
            context = r[2];
        }
        reg = null;
        r = null;
        return (context == null || context == "" || context == "undefined") ? "" : context;
    },

    // 删除空白字符串
    delBlankSpace: function (str) {
        var str = str.replace(/<\/?[^>]*>/gim, "");// 去掉所有的html标记
        var result = str.replace(/(^\s+)|(\s+$)/g, "");// 去掉前后空格
        return result.replace(/\s/g, "");// 去除文章中间空格
    },

    // 判断参数非空
    validateBlank: function (tmp) {
        if (!tmp && typeof (tmp) != "undefined" && tmp != 0) {
        // null
            return;
        } else if (typeof (tmp) == "undefined") {
        // undefined
            return;
        } else if (Array.isArray(tmp) && tmp.length === 0) {
        // 空数组
            return;
        } else if ($.trim(tmp) == "") {
        // 空串
            return;
        } else if (Object.prototype.isPrototypeOf(tmp) && Object.keys(tmp).length === 0) {
        // 空对象
            return;
        } else {
            return tmp;
        }
    },

    // 检测段落里空格和换行,转换成html输出
    blankRegExp: function (str) {
        if (typeof str != "string")
            return "";

        return this.htmlEncode(str).replace(/\r{0,}\n/g, '<br/>');
    },

    // 转义html为安全文本
    htmlEncode: function (str) {
        //多个replace会有bug
        //return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\'/g, "&#39;").replace(/ /g, "&nbsp;");
        var html_encodes = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": "&#39;",
            ' ': '&nbsp;'
        };
        return str.replace(/(&|<|>|\"|\'| )/g, function (str, item) {
            return html_encodes[item];
        });
    },
    //正则解码
    htmlDecode: function (str) {
        var html_decodes = {
            '&amp;': '&',
            '&lt;': '<',
            '&gt;': '>',
            '&quot;': '"',
            "&#39;": "'",
            '&nbsp;': ' '
        };
        return str.replace(/(&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;)/g, function (str, item) {
            return html_decodes[item];
        });
    },
        /*用浏览器内部转换器实现html转码*/
        HTMLEncode: function (html) {
        //1.首先动态创建一个容器标签元素，如DIV
        var temp = document.createElement("div");
        //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
        (temp.textContent != undefined) ? (temp.textContent = html) : (temp.innerText = html);
        //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
        var output = temp.innerHTML;
        temp = null;
        return output;
    },

    /*用浏览器内部转换器实现html解码*/
    HTMLDecode: function (input) {
        var converter = document.createElement("DIV");
        converter.innerHTML = input;
        var output = converter.innerText;
        converter = null;
        return output;
    },

    // 裁剪文字，显示...
    cutText: function (str, maxLength, showEllipsis) {
        if (str.length > maxLength) {
            str = str.substr(0, maxLength);
            if (showEllipsis) {
                str += "...";
            }
        }
        return str;
    },

    // 判断微信内置浏览器
    isWeixin: function () {
        var ua = navigator.userAgent.toLowerCase();
        return (ua.match(/MicroMessenger/i) == "micromessenger");
    },

    // [Hack]修改iOS微信浏览器的title
    setTitle: function (t) {
        document.title = t;
        var i = document.createElement('iframe');
        i.src = '//m.baidu.com/favicon.ico';
        i.style.display = 'none';
        i.onload = function () {
            setTimeout(function () {
                i.remove();
            }, 9);
        }
        document.body.appendChild(i);
    },

    // 微信分享
    shareToWeiXin: function (param, success, cancel, mSuccess, mCancel) {
        var self = this;
        // this.getContent(utils.getQueryString("infoId"),utils.getQueryString('salesmanId'));
        var url = location.href.split('#')[0];
        alert('验证签名url == ' + url)
        alert('分享参数param==' + JSON.stringify(param));
        $.ajax({
            url: '/plug/do/common/weixin/genWxConfig',
            type: 'post',
            data: {
                url: url,
                authType: '1'
            },
            dataType: 'json',
            success: function (data) {
                if (data && data.resultCode === '000') {
                    var config = data.data.config;
                    config.debug = true;
                    config.jsApiList = ['checkJsApi', 'showMenuItems', 'onMenuShareAppMessage', 'onMenuShareTimeline'];
                    wx.config(config);
                    wx.ready(function () {
                        wx.showMenuItems({
                            menuList: ["menuItem:share:appMessage", "menuItem:share:timeline"]
                        });
                        wx.onMenuShareAppMessage({//分享朋友
                            title: param.infoTitle,
                            desc: param.infoSummary, // 分享描述
                            imgUrl: param.imgUrl,
                            link: param.link, // 分享链接
                            success: function () {
                                success && success();
                            },
                            cancel: function () {
                                cancel && cancel();
                            }
                        });

                        wx.onMenuShareTimeline({//分享朋友圈
                            title: param.infoTitle,
                            desc: param.infoSummary, // 分享描述
                            imgUrl: param.imgUrl,
                            link: param.link, // 分享链接
                            success: function () {
                                mSuccess && mSuccess();
                            },
                            cancel: function () {
                                mCancel && mCancel();
                            }
                        });
                    });

                    wx.error(function (res) {
                        alert('error :' + JSON.stringify(res));
                    });
                }
            },
            error: function (err) {
                alert("err:" + JSON.stringify(err))
                console.log('请求页面报错: ' + err);
            }
        });
    },

    // 微信授权
    getUserInfo: function (success) {
        var self = this;
        var url = location.href;
        var wxCode = utils.getQueryString("code");
        alert('wxCode==' + wxCode);
        Backbone.ajax({
            url: '/plug/do/A2ATApp/saveCustomerInfo',
            dataType: "JSON",
            type: "post",
            data: {
                code: wxCode,
                operationSystem: 'IOS-test',
                network: '4G-test',
                operatorType: 'operatorType',
                models: 'models',
                appVersion: 'appVersion'
            },
            success: function (data) {
                if (data && data.resultCode == '000') {

                    success && success();
                } else {
                    alert('userInfo=' + JSON.stringify(data));
                }
            },
            error: function (e) {
                alert('error==' + JSON.stringify(e));
            }
        });

    },

    // 获取页面停留时间,依赖jquery.cookie.js
    countStayTime: function () {
        var second = 0;
        window.setInterval(function () {
            second++;
        }, 1000);
        var tjArr = localStorage.getItem("jsArr") ? localStorage.getItem("jsArr") : '[{}]';
        $.cookie('tjRefer', getReferrer(), {
            expires: 1,
            path: '/'
        });

        window.onbeforeunload = function () {
            if ($.cookie('tjRefer') == '') {
                var tjT = eval('(' + localStorage.getItem("jsArr") + ')');
                if (tjT) {
                    tjT[tjT.length - 1].time += second;
                    var jsArr = JSON.stringify(tjT);
                    localStorage.setItem("jsArr", jsArr);
                }
            } else {
                var tjArr = localStorage.getItem("jsArr") ? localStorage.getItem("jsArr") : '[{}]';
                var dataArr = {
                    'url': location.href,
                    'time': second,
                    'refer': getReferrer() || document.referrer,
                    'timeIn': Date.parse(new Date()),
                    'timeOut': Date.parse(new Date()) + (second * 1000)
                };
                tjArr = eval('(' + tjArr + ')');
                tjArr = JSON.stringify(dataArr);
                localStorage.setItem("jsArr", tjArr);
            }
            var standTime = (JSON.parse(localStorage.getItem('jsArr'))).time;
            return standTime; //单位：s
        };

    },

    // 获取前一个页面的url
    getReferrer: function () {
        var referrer = '';
        try {
            referrer = window.top.document.referrer;
        } catch (e) {
            if (window.parent) {
                try {
                    referrer = window.parent.document.referrer;
                } catch (e2) {
                    referrer = '';
                }
            }
        }
        if (referrer === '') {
            referrer = document.referrer;
        }
        return referrer;
    },

    //屏蔽alert 弹框
    noAlert: function () {
        //if(true) return
        window.alert = function (str) {
            return;
        };
    },

};


//event事件
var EventUtil = {

    addHandler: function (element, type, handler) { //添加事件
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);  //使用DOM2级方法添加事件
        } else if (element.attachEvent) {                    //使用IE方法添加事件
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;          //使用DOM0级方法添加事件
        }
    },

    removeHandler: function (element, type, handler) {  //取消事件
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },

    getEvent: function (event) {  //使用这个方法跨浏览器取得event对象
        return event ? event : window.event;
    },

    getTarget: function (event) {  //返回事件的实际目标
        return event.target || event.srcElement;
    },

    preventDefault: function (event) {   //阻止事件的默认行为
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    stopPropagation: function (event) {  //立即停止事件在DOM中的传播
        //避免触发注册在document.body上面的事件处理程序
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    getRelatedTarget: function (event) {  //获取mouseover和mouseout相关元素
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {      //兼容IE8-
            return event.toElement;
        } else if (event.formElement) {
            return event.formElement;
        } else {
            return null;
        }
    },

    getButton: function (event) {    //获取mousedown或mouseup按下或释放的按钮是鼠标中的哪一个
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch (event.button) {   //将IE模型下的button属性映射为DOM模型下的button属性
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;  //按下的是鼠标主按钮（一般是左键）
                case 2:
                case 6:
                    return 2;  //按下的是中间的鼠标按钮
                case 4:
                    return 1;  //鼠标次按钮（一般是右键）
            }
        }
    },

    getWheelDelta: function (event) { //获取表示鼠标滚轮滚动方向的数值
        if (event.wheelDelta) {
            return event.wheelDelta;
        } else {
            return -event.detail * 40;
        }
    },

    getCharCode: function (event) {   //以跨浏览器取得相同的字符编码，需在keypress事件中使用
        if (typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    }

};