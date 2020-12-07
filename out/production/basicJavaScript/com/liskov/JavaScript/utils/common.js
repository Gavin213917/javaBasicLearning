var Common = function () {
    var baseUrl = "";
    var repeatCom = {};
    var ueditors = {};
    var initFormComs = function (coms) {
        if (repeatCom[coms]) {
            return;
        } else if (coms === "select2") {
            $('.js-select2').each(function () {
                var $select2 = jQuery(this);
                var $width = $select2.data('width') || '100%';
                $select2.select2({
                    width: $width, //设置下拉框的宽度
                    language: "zh-CN"
                });
            });
        } else if (coms === "image" || coms === "images" || coms === "file" || coms === "files") {
            initFileUploader(baseUrl);
            viewerLoader();
            repeatCom['image'] = true;
            repeatCom['images'] = true;
            repeatCom['file'] = true;
            repeatCom['files'] = true;
        } else if (coms === "date") {
            $(".js-date").each(function () {
                let id = $(this).attr("id");
                layui.laydate.render({
                    elem: '#' + id
                });
            });
        } else if (coms === "time") {
            $(".js-time").each(function () {
                let id = $(this).attr("id");
                layui.laydate.render({
                    elem: '#' + id
                    , type: 'time'
                    , format: 'H:m'
                });
            });
        } else if (coms === "datetime") {
            $(".js-datetime").each(function () {
                let id = $(this).attr("id");
                layui.laydate.render({
                    elem: '#' + id
                    , type: 'datetime'
                });
            });
        } else if (coms === "icon") {
            $(".js-icon").each(function () {
                let id = $(this).attr("id");
                layui.iconPickerFa.render({
                    // 选择器，推荐使用input
                    elem: '#' + id,
                    // fa 图标接口
                    url: baseUrl + "/static/libs/font-awesome-4.7.0/less/variables.less",
                    // 是否开启搜索：true/false，默认true
                    search: true,
                    // 是否开启分页：true/false，默认true
                    page: true,
                    // 每页显示数量，默认12
                    limit: 72,
                    // 点击回调
                    click: function (data) {
                    },
                    // 渲染成功后的回调
                    success: function (d) {
                    }
                });
            });
        } else if (coms === "ueditor") {
            $('.js-ueditor').each(function () {
                var ueditor_id = $(this).attr('id');
                var height = $(this).attr("height");
                if (height == undefined || height == "") {
                    height = 400;
                }
                ueditors[ueditor_id] = UE.getEditor(ueditor_id, {
                    initialFrameHeight: height,  //初始化编辑器高度,默认320
                    autoHeightEnabled: false,  //是否自动长高
                    maximumWords: 50000, //允许的最大字符数
                    serverUrl: baseUrl + "/attachment/ueditor"
                });
            });
        } else if (coms === "wang-editor") {
            initWangEditor();
        } else if (coms === "bmap") {
            initBMap();
        }
        repeatCom[coms] = true;
    };

    var initBMap = function () {
        // 百度地图
        $('.js-bmap').each(function () {
            var $self = $(this);
            var map_canvas = $self.find('.bmap').attr('id');
            var address = $self.find('.bmap-address');
            var address_id = address.attr('id');
            var map_pointx = $self.find('.bmap-pointx');
            var map_pointy = $self.find('.bmap-pointy');
            var search_result = $self.find('.searchResultPanel');
            var point_lng = 116.331398;
            var point_lat = 39.897445;
            var map_level = 17;

            // 百度地图API功能
            var map = new BMap.Map(map_canvas);
            //开启鼠标滚轮缩放
            map.enableScrollWheelZoom(true);
            // 左上角，添加比例尺
            var top_left_control = new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT});
            // 左上角，添加默认缩放平移控件
            var top_left_navigation = new BMap.NavigationControl();
            map.addControl(top_left_control);
            map.addControl(top_left_navigation);

            // 智能搜索
            var local = new BMap.LocalSearch(map, {
                onSearchComplete: function () {
                    var point = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                    map.centerAndZoom(point, map_level);
                    // 创建标注
                    create_mark(point);
                }
            });

            // 创建标注
            var create_mark = function (point) {
                // 清空所有标注
                map.clearOverlays();
                var marker = new BMap.Marker(point);  // 创建标注
                map.addOverlay(marker);    //添加标注
                marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
                // 写入坐标
                map_pointx.val(point.lng);
                map_pointy.val(point.lat);
            };

            // 建立一个自动完成的对象
            var ac = new BMap.Autocomplete({
                "input": address_id,
                "location": map
            });
            // 鼠标放在下拉列表上的事件
            ac.addEventListener("onhighlight", function (e) {
                var str = "";
                var _value = e.fromitem.value;
                var value = "";
                if (e.fromitem.index > -1) {
                    value = _value.province + _value.city + _value.district + _value.street + _value.business;
                }
                str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

                value = "";
                if (e.toitem.index > -1) {
                    _value = e.toitem.value;
                    value = _value.province + _value.city + _value.district + _value.street + _value.business;
                }
                str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
                search_result.html(str);
            });


            // 鼠标点击下拉列表后的事件
            var myValue;
            ac.addEventListener("onconfirm", function (e) {
                var _value = e.item.value;
                myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
                search_result.html("onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue);

                local.search(myValue);
            });

            // 监听点击地图时间
            map.addEventListener("click", function (e) {
                // 创建标注
                create_mark(e.point);
            });

            if (map_pointx.val() != '' && map_pointy.val() != '') {
                point_lng = map_pointx.val();
                point_lat = map_pointy.val();
            } else if (address.val() != '') {
                local.search(address.val());
            } else {
                // 根据ip获取当前城市，并定位到当前城市
                var myCity = new BMap.LocalCity();
                myCity.get(function (result) {
                    var cityName = result.name;
                    map.setCenter(cityName);
                });
            }

            // 初始化地图,设置中心点坐标和地图级别
            var point = new BMap.Point(point_lng, point_lat);
            map.centerAndZoom(point, map_level);
            if (map_pointx.val() != '' && map_pointy.val() != '') {
                // 创建标注
                create_mark(point);
            }
            if (address.val() != '') {
                ac.setInputValue(address.val())
            }
        });
    };
    var wangeditors = {};
    var initWangEditor = function () {
        $('.js-wangeditor').each(function () {
            var wangeditor_id = $(this).attr('id');
            var imgExt = $(this).data('img-ext') || '';
            // 关闭调试信息
            wangEditor.config.printLog = false;
            // 实例化编辑器
            wangeditors[wangeditor_id] = new wangEditor(wangeditor_id);
            // 上传图片地址
            wangeditors[wangeditor_id].config.uploadImgUrl = baseUrl + "/attachment/wangeditor";
            // 允许上传图片后缀
            wangeditors[wangeditor_id].config.imgExt = imgExt;
            // 配置文件名
            wangeditors[wangeditor_id].config.uploadImgFileName = 'file';
            // 此处换成自己申请的密钥
            wangeditors[wangeditor_id].config.mapAk = $(this).attr("baidu-map-key");
            // 去掉地图
            // wangeditors[wangeditor_id].config.menus = $.map(wangEditor.config.menus, function (item, key) {
            //     if (item === 'location') {
            //         return null;
            //     }
            //     return item;
            // });
            // 添加表情
            wangeditors[wangeditor_id].config.emotions = {
                'default': {
                    title: '默认',
                    data: baseUrl + "/static/libs/wang-editor/emotions.data"
                }
            };
            wangeditors[wangeditor_id].create();
        });
    };
    /**
     * 页面加载提示
     * @param $mode 'show', 'hide'
     */
    var closeIndex = undefined;
    var pageLoader = function ($mode) {
        var $loadingEl = jQuery('#loading');
        $mode = $mode || 'show';
        if ($mode === 'show') {
            // if ($loadingEl.length) {
            //     $loadingEl.fadeIn(250);
            // } else {
            //     jQuery('body').prepend('<div id="loading"><div class="loading-box"><i class="layui-icon layui-icon-loading layui-icon layui-anim layui-anim-rotate layui-anim-loop"></i> <span class="loding-text">请稍等...</span></div></div>');
            // }
            closeIndex = layer.load();
        } else if ($mode === 'hide') {
            // if ($loadingEl.length) {
            //     $loadingEl.fadeOut(250);
            // }
            if (closeIndex == undefined){
                layer.closeAll();
            } else {
                layer.close(closeIndex);
            }
        }
        return false;
    };

    var confirm = function (text, func) {
        swal({
            // title: "确定要执行该操作吗？",
            title: text,
            text: "",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d26a5c',
            confirmButtonText: "确认",
            cancelButtonText: "取消",
            closeOnConfirm: true,
            html: false
        }, func);
    };
    /**
     * 初始化图片查看
     */
    var viewerLoader = function () {
        $('.js-upload-image img,.js-upload-images img').each(function () {
            $(this).viewer('destroy');
            $(this).viewer({url: 'data-original'});
        });
    };
    return {
        // 初始化图片查看
        viewer: function () {
            viewerLoader();
        },
        // 页面加载提示
        loading: function ($mode) {
            pageLoader($mode);
        },
        error: function (message) {
            layer.msg(message, {icon: 5});
        },
        success: function (message) {
            layer.msg(message, {icon: 6});
        },
        confirm: function (text, func) {
            confirm(text, func);
        },
        //弹出表单
        open: function (url, title) {
            layer.open({
                title: title,
                type: 2,
                scrollbar: true,
                content: url,
                shadeClose: true,
                area: ['80%', '90%'],
                maxmin: true
            });
        },
        tips: function (selector, message) {
            layer.tips(message, selector, {
                tips: [2, 'red']
            });
        },
        initForm: function (url, coms) {
            baseUrl = url;
            if (coms instanceof Array) {
                for (let $index in coms) {
                    initFormComs(coms[$index]);
                }
            } else {
                initFormComs(coms);
            }
        }
    }
}();


function getGenderAndAge(zjhm) {
    var obj = {};
    obj.birthday = GetBirthday(zjhm);
    obj.gender = Getsex(zjhm);
    obj.age = GetAge(zjhm);
    return obj;
}

function GetBirthday(psidno){
    var birthdayno,birthdaytemp
    if(psidno.length == 18){
        birthdayno = psidno.substring(6,14)
    }else if(psidno.length==15){
        birthdaytemp = psidno.substring(6,12)
        birthdayno = "19" + birthdaytemp
    }else{
        return null
    }
    return birthdayno.substring(0,4)+"-"+birthdayno.substring(4,6)+"-"+birthdayno.substring(6,8)
}

function Getsex(psidno){
    var sexno,sex
    if(psidno.length == 18){
        sexno=psidno.substring(16,17)
    }else if(psidno.length == 15){
        sexno=psidno.substring(14,15)
    }else{
        return null;
    }
    var tempid = sexno%2;
    if(tempid == 0){
        sex='2'
    }else{
        sex='1'
    }
    return sex
}

function GetAge(psidno){
    var birthday = GetBirthday(psidno);
    if (birthday != null){
        var birthDate = new Date(birthday);
        var nowDateTime = new Date();
        var age = nowDateTime.getFullYear() - birthDate.getFullYear();
        if (nowDateTime.getMonth() < birthDate.getMonth() || (nowDateTime.getMonth() == birthDate.getMonth() && nowDateTime.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
    return null;
}