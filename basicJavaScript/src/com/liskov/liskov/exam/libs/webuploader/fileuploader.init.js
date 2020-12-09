function initFileUploader(baseUrl) {

    var webuploader = [];
    // 当前上传对象
    var curr_uploader = {};
    var upload_url = baseUrl + "/attachment/upload";
    var check_url = baseUrl + "/attachment/check";
    var swf_url = baseUrl + "/static/libs/webuploader/Uploader.swf";

    var upload_flag = true;
    // 注册WebUploader事件，实现秒传
    if (window.WebUploader) {
        WebUploader.Uploader.register({
            "before-send-file": "beforeSendFile" // 整个文件上传前
        }, {
            beforeSendFile: function (file) {
                var $li = $('#' + file.id);
                var deferred = WebUploader.Deferred();
                var owner = this.owner;

                owner.md5File(file).then(function (val) {
                    $.ajax({
                        type: "POST",
                        url: check_url,
                        data: {
                            md5: val
                        },
                        cache: false,
                        timeout: 10000, // 超时的话，只能认为该文件不曾上传过
                        dataType: "json"
                    }).then(function (res, textStatus, jqXHR) {
                        if (res.code == "1") {
                            // 已上传，触发上传完成事件，实现秒传
                            upload_flag = false;
                            deferred.reject();
                            curr_uploader.trigger('uploadSuccess', file, res);
                            curr_uploader.trigger('uploadComplete', file);
                        } else {
                            // 文件不存在，触发上传
                            deferred.resolve();
                            $li.find('.file-state').html('<span class="text-info">正在上传...</span>');
                            $li.find('.img-state').html('<div class="bg-info">正在上传...</div>');
                            $li.find('.progress').show();
                        }
                    }, function (jqXHR, textStatus, errorThrown) {
                        // 任何形式的验证失败，都触发重新上传
                        deferred.resolve();
                        $li.find('.file-state').html('<span class="text-info">正在上传...</span>');
                        $li.find('.img-state').html('<div class="bg-info">正在上传...</div>');
                        $li.find('.progress').show();
                    });
                });
                return deferred.promise();
            }
        });
    }

// 文件上传
    $('.js-upload-file,.js-upload-files').each(function () {
        var $input_file = $(this).find('input');
        var $input_file_name = $input_file.attr('name');
        var $input_id = $input_file.attr('id');
        // 是否多文件上传
        var $multiple = $input_file.data('multiple');
        // 允许上传的后缀
        var $ext = $input_file.data('ext');
        // 文件限制大小
        var $size = $input_file.data('size');
        // 文件列表
        var $file_list = $(this).find(".uploader-list");

        // 实例化上传
        var uploader = WebUploader.create({
            // 选完文件后，是否自动上传。
            auto: true,
            // 去重
            duplicate: true,
            // swf文件路径
            swf: swf_url,
            // 文件接收服务端。
            server: upload_url,
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: {
                id: '#picker_' + $input_id,
                multiple: $multiple
            },
            // 文件限制大小
            fileSingleSizeLimit: $size,
            // 只允许选择文件文件。
            accept: {
                title: 'Files',
                extensions: $ext
            }
        });

        // 当有文件添加进来的时候
        uploader.on('fileQueued', function (file) {
            var $li = '<li id="' + file.id + '" class="list-group-item file-item">' +
                '<span class="pull-right file-state"><span class="text-info"><i class="fa fa-sun-o fa-spin"></i> 正在读取文件信息...</span></span>' +
                '<i class="fa fa-file"></i> ' +
                file.name +
                ' [<a href="javascript:void(0);" class="download-file">下载</a>] [<a href="javascript:void(0);" class="remove-file">删除</a>]' +
                '<div class="progress progress-mini remove-margin active" style="display: none"><div class="progress-bar progress-bar-primary progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div></div>' +
                '</li>';

            if ($multiple) {
                $file_list.append($li);
            } else {
                $file_list.html($li);
                // 清空原来的数据
                $input_file.val('');
            }

            // 设置当前上传对象
            curr_uploader = uploader;
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function (file, percentage) {
            var $percent = $('#' + file.id).find('.progress-bar');
            $percent.css('width', percentage * 100 + '%');
        });

        // 文件上传成功
        uploader.on('uploadSuccess', function (file, response) {
            var $li = $('#' + file.id);
            if (response.code != "0") {
                if ($multiple) {
                    if ($input_file.val()) {
                        $input_file.val($input_file.val() + ',' + response.id);
                    } else {
                        $input_file.val(response.id);
                    }
                    $li.find('.remove-file').attr('data-id', response.id);
                } else {
                    $input_file.val(response.id);
                }
            }
            // 加入提示信息
            $li.find('.file-state').html('<span class="text-' + response.clazz + '">' + response.info + '</span>');
            // 添加下载链接
            $li.find('.download-file').attr('href', baseUrl + response.path);

            // 文件上传成功后的自定义回调函数
            if (window['dp_file_upload_success'] !== undefined) window['dp_file_upload_success']();
            // 文件上传成功后的自定义回调函数
            if (window['dp_file_upload_success_' + $input_file_name] !== undefined) window['dp_file_upload_success_' + $input_file_name]();
        });

        // 文件上传失败，显示上传出错。
        uploader.on('uploadError', function (file) {
            if (upload_flag) {
                var $li = $('#' + file.id);
                $li.find('.file-state').html('<span class="text-danger">服务器发生错误~</span>');

                // 文件上传出错后的自定义回调函数
                if (window['dp_file_upload_error'] !== undefined) window['dp_file_upload_error']();
                // 文件上传出错后的自定义回调函数
                if (window['dp_file_upload_error_' + $input_file_name] !== undefined) window['dp_file_upload_error_' + $input_file_name]();
            }
        });

        // 文件验证不通过
        uploader.on('error', function (type) {
            switch (type) {
                case 'Q_TYPE_DENIED':
                    Common.error('文件类型不正确，只允许上传后缀名为：' + $ext + '，请重新上传！');
                    break;
                case 'F_EXCEED_SIZE':
                    Common.error('文件不得超过' + ($size / 1024) + 'kb，请重新上传！');
                    break;
            }
        });

        // 完成上传完了，成功或者失败，先删除进度条。
        uploader.on('uploadComplete', function (file) {
            setTimeout(function () {
                $('#' + file.id).find('.progress').remove();
            }, 500);

            // 文件上传完成后的自定义回调函数
            if (window['dp_file_upload_complete'] !== undefined) window['dp_file_upload_complete']();
            // 文件上传完成后的自定义回调函数
            if (window['dp_file_upload_complete_' + $input_file_name] !== undefined) window['dp_file_upload_complete_' + $input_file_name]();
        });

        // 删除文件
        $file_list.delegate('.remove-file', 'click', function () {
            if ($multiple) {
                var id = $(this).parent(".file-item").attr('id'),
                    ids = $input_file.val().split(',');

                if (id) {
                    for (var i = 0; i < ids.length; i++) {
                        if (ids[i] == id) {
                            ids.splice(i, 1);
                            break;
                        }
                    }
                    $input_file.val(ids.join(','));
                }
            } else {
                $input_file.val('');
            }
            $(this).closest('.file-item').remove();
        });

        // 将上传实例存起来
        webuploader.push(uploader);
    });

// 图片上传
    $('.js-upload-image,.js-upload-images').each(function () {
        var $input_file = $(this).find('input');
        var $input_id = $input_file.attr('id');
        var $input_file_name = $input_file.attr('name');
        // 是否多图片上传
        var $multiple = $input_file.data('multiple');
        // 允许上传的后缀
        var $ext = $input_file.data('ext');
        // 图片限制大小
        var $size = $input_file.data('size');
        // 缩略图参数
        var $thumb = $input_file.data('thumb');
        // 水印参数
        var $watermark = $input_file.data('watermark');
        // 图片列表
        var $file_list = $(this).find(".uploader-list");
        // 优化retina, 在retina下这个值是2
        var ratio = window.devicePixelRatio || 1;
        // 缩略图大小
        var thumbnailWidth = 100 * ratio;
        var thumbnailHeight = 100 * ratio;
        // 实例化上传
        var uploader = WebUploader.create({
            // 选完图片后，是否自动上传。
            auto: true,
            // 去重
            duplicate: true,
            // 不压缩图片
            resize: false,
            compress: false,
            // swf图片路径
            swf: swf_url,
            // 图片接收服务端。
            server: upload_url,
            // 选择图片的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: {
                id: '#picker_' + $input_id,
                multiple: $multiple
            },
            // 图片限制大小
            fileSingleSizeLimit: $size,
            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: $ext,
                mimeTypes: 'image/jpg,image/jpeg,image/bmp,image/png,image/gif'
            },
            // 自定义参数
            formData: {
                thumb: $thumb,
                watermark: $watermark
            }
        });

        // 当有文件添加进来的时候
        uploader.on('fileQueued', function (file) {
            var $li = $(
                    '<div id="' + file.id + '" class="file-item js-gallery thumbnail">' +
                    '<img>' +
                    '<div class="info">' + file.name + '</div>' +
                    '<i class="fa fa-times-circle remove-picture"></i>'  +
                    '<div class="progress progress-mini remove-margin active" style="display: none">' +
                    '<div class="progress-bar progress-bar-primary progress-bar-striped" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"></div>' +
                    '</div>' +
                    '<div class="file-state img-state"><div class="bg-info">正在读取...</div>' +
                    '</div>'
                ),
                $img = $li.find('img');

            if ($multiple) {
                $file_list.append($li);
            } else {
                $file_list.html($li);
                $input_file.val('');
            }

            // 创建缩略图
            // 如果为非图片文件，可以不用调用此方法。
            // thumbnailWidth x thumbnailHeight 为 100 x 100
            uploader.makeThumb(file, function (error, src) {
                if (error) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }
                $img.attr('src', src);
            }, thumbnailWidth, thumbnailHeight);

            // 设置当前上传对象
            curr_uploader = uploader;
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function (file, percentage) {
            var $percent = $('#' + file.id).find('.progress-bar');
            $percent.css('width', percentage * 100 + '%');
        });

        // 文件上传成功
        uploader.on('uploadSuccess', function (file, response) {
            var $li = $('#' + file.id);

            if (response.code != "0") {
                if ($multiple) {
                    if ($input_file.val()) {
                        $input_file.val($input_file.val() + ',' + response.id);
                    } else {
                        $input_file.val(response.id);
                    }
                    $li.find('.remove-picture').attr('data-id', response.id);
                } else {
                    $input_file.val(response.id);
                }
            }

            $li.find('.file-state').html('<div class="bg-' + response.clazz + '">' + response.info + '</div>');
            $li.find('img').attr('data-original', baseUrl + response.path);
            // 上传成功后，再次初始化图片查看功能
            Common.viewer();

            // 文件上传成功后的自定义回调函数
            if (window['dp_image_upload_success'] !== undefined) window['dp_image_upload_success']();
            // 文件上传成功后的自定义回调函数
            if (window['dp_image_upload_success_' + $input_file_name] !== undefined) window['dp_image_upload_success_' + $input_file_name]();
        });

        // 文件上传失败，显示上传出错。
        uploader.on('uploadError', function (file) {
            if (upload_flag) {
                var $li = $('#' + file.id);
                $li.find('.file-state').html('<div class="bg-danger">服务器错误</div>');

                // 文件上传出错后的自定义回调函数
                if (window['dp_image_upload_error'] !== undefined) window['dp_image_upload_error']();
                // 文件上传出错后的自定义回调函数
                if (window['dp_image_upload_error_' + $input_file_name] !== undefined) window['dp_image_upload_error_' + $input_file_name]();
            }
        });

        // 文件验证不通过
        uploader.on('error', function (type) {
            switch (type) {
                case 'Q_TYPE_DENIED':
                    Common.error('图片类型不正确，只允许上传后缀名为：' + $ext + '，请重新上传！');
                    break;
                case 'F_EXCEED_SIZE':
                    Common.error('图片不得超过' + ($size / 1024) + 'kb，请重新上传！');
                    break;
            }
        });

        // 完成上传完了，成功或者失败，先删除进度条。
        uploader.on('uploadComplete', function (file) {
            setTimeout(function () {
                $('#' + file.id).find('.progress').remove();
            }, 500);

            // 文件上传完成后的自定义回调函数
            if (window['dp_image_upload_complete'] !== undefined) window['dp_image_upload_complete']();
            // 文件上传完成后的自定义回调函数
            if (window['dp_image_upload_complete_' + $input_file_name] !== undefined) window['dp_image_upload_complete_' + $input_file_name]();
        });

        // 删除图片
        $file_list.delegate('.remove-picture', 'click', function () {
            $(this).closest('.file-item').remove();
            if ($multiple) {
                var ids = [];
                $file_list.find('.remove-picture').each(function () {
                    ids.push($(this).data('id'));
                });
                $input_file.val(ids.join(','));
            } else {
                $input_file.val('');
            }
            // 删除后，再次初始化图片查看功能
            Common.viewer();
        });

        // 将上传实例存起来
        webuploader.push(uploader);

        // 如果是多图上传，则实例化拖拽
        // if ($multiple) {
        //     try {
        //         $file_list.sortable({
        //             connectWith: ".uploader-list",
        //             handle: '.move-picture',
        //             stop: function () {
        //                 var ids = [];
        //                 $file_list.find('.remove-picture').each(function () {
        //                     ids.push($(this).data('id'));
        //                 });
        //                 $input_file.val(ids.join(','));
        //                 // 拖拽排序后，重新初始化图片查看功能
        //                 // Common.viewer();
        //             }
        //         }).disableSelection();
        //     } catch (e){
        //     }
        // }
    });

}