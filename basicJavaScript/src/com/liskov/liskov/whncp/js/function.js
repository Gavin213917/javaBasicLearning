(function($, window, undefined) {
  $(function() {
    $(".sortable").click(function() {
      sortTable($(this));
    });

    function sortTable(th) {
      var myCompFunc = function($td1, $td2, isAsc) {
        var v1 = $.trim($td1.text()).replace(/,|\s+|%/g, "");
        var v2 = $.trim($td2.text()).replace(/,|\s+|%/g, "");
        var pattern = /^\d+(\.\d*)?$/;
        if (pattern.test(v1) && pattern.test(v2)) {
          v1 = parseFloat(v1);
          v2 = parseFloat(v2);
        }

        return isAsc ? v1 > v2 : v1 < v2;
      };

      var doSort = function($tbody, index, compFunc, isAsc) {
        var $trList = $tbody.find("tr");
        var len = $trList.length;
        for (var i = 0; i < len - 1; i++) {
          for (var j = 0; j < len - i - 1; j++) {
            var $td1 = $trList
              .eq(j)
              .find("td")
              .eq(index);
            var $td2 = $trList
              .eq(j + 1)
              .find("td")
              .eq(index);

            if (compFunc($td1, $td2, isAsc)) {
              var t = $trList.eq(j + 1);
              $trList.eq(j).insertAfter(t);
              $trList = $tbody.find("tr");
            }
          }
        }
      };

      var init = function(th) {
        var asc = th.attr("data-asc");
        th.siblings()
          .removeClass("asc")
          .removeClass("desc");
        var index = th.index();

        isAsc = asc === undefined ? true : asc > 0 ? true : false;

        doSort(
          $(th)
            .closest("table")
            .find("tbody"),
          index,
          myCompFunc,
          isAsc
        );

        $(th).attr("data-asc", 1 - (isAsc ? 1 : 0));
        if (isAsc) {
          th.addClass("asc").removeClass("desc");
        } else {
          th.addClass("desc").removeClass("asc");
        }
      };

      init(th);
    }
  });

  var js = {
    //分页设置
    setPage: function(pageCurrent, pageSum, callback) {
      if (pageCurrent == undefined) {
        pageCurrent = 1;
      }
      if (pageSum == undefined) {
        pageSum = 1;
      }
      $(".pagination").bootstrapPaginator({
        //设置版本号
        bootstrapMajorVersion: 3,
        // 显示第几页
        currentPage: pageCurrent,
        // 总页数
        totalPages: pageSum,
        alignment: "right",
        numberOfPages: 5,
        itemTexts: function(type, page, current) {
          switch (type) {
            case "first":
              return "首页";
            case "prev":
              return "上一页";
            case "next":
              return "下一页";
            case "last":
              return "末页";
            case "page":
              return page;
          }
        },
        //当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
        onPageClicked: function(event, originalEvent, type, page) {
          // 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
          currentPage = page;
          callback && callback(page);
        }
      });
    },
    showPage: function(total, pageSize, currentPage, callback) {
      $(".pagination").empty();
      var pageHtml = '<div class="M-box"></div>';
      $(".pagination").append(pageHtml);
      if (total == undefined) {
        total = 0;
      }
      if (pageSize == undefined) {
        pageSize = 10;
      }
      if (currentPage == undefined) {
        currentPage = 1;
      }
      var totalPage = Math.ceil(total / pageSize);
      $(".totalPage").text(totalPage);
      $(".count").text(total);
      $(".M-box").pagination({
        totalData: total,
        pageCount: totalPage,
        current: currentPage, //当前第几页
        keepShowPN: true, //是否一直显示上一页下一页
        mode: "fixed",
        jump: true,
        coping: true,
        homePage: "首页",
        endPage: "末页",
        prevContent: "上页",
        nextContent: "下页",
        callback: function(api) {
          callback(api.getCurrent());
        }
      });
    },
    getFormData: function(form) {
      var row = form.serializeArray();
      var reqparmas = {};
      for (var i = 0; i < row.length; i++) {
        reqparmas[row[i]["name"]] = row[i]["value"];
      }
      return reqparmas;
    },
    loading: function(msg) {
      if (msg == undefined) {
        var index = layer.load(0, { shade: 0.15 }); //0代表加载的风格，支持0-2
        return index;
      } else {
        var index = layer.msg(msg, {
          icon: 16,
          shade: 0.15
        });
        return index;
      }
    },
    openLayer: function(options) {
      window.layerIndex = layer.open(
        $.extend(options, {
          skin: "layui-layer-lan",
          type: 2,
          shadeClose: true,
          size: "690,400"
        })
      );
    },
    alert: function(message, options, closed) {
      if (typeof options != "object") {
        closed = options;
        options = { icon: 1, skin: "layui-layer-lan" };
      }
      if (!layer) {
        alert(message);
        if (typeof closed == "function") {
          closed();
        }
        return;
      }
      layer.alert(message, options, function(index) {
        if (typeof closed == "function") {
          closed(index);
        }
        layer.close(index);
      });
    },
    confirm: function(message, func) {
      if (!layer) {
        if (confirm(message)) {
          func();
        }
        return;
      }
      var options = {
        icon: 3,
        skin: "layui-layer-lan",
        title: "系统提示",
        btn: ["确认", "取消"],
        btnclass: ["btn btn-primary", "btn btn-danger"]
      };
      layer.confirm(message, options, function(index) {
        func();
        layer.close(index);
      });
      return false;
    },
    windowOpen: function(url, name, width, height) {
      if (!(width && height)) {
        width = window.screen.width - 200;
        height = window.screen.height - 150;
      }
      var top = parseInt((window.screen.height - height) / 2 - 20, 10),
        left = parseInt((window.screen.width - width) / 2, 10),
        options =
          "location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes,width=" +
          width +
          ",height=" +
          height +
          ",top=" +
          top +
          ",left=" +
          left;
      window.open(url, name, options);
    },
    windowClose: function() {
      setTimeout(function() {
        window.opener = null;
        window.open("", "_self");
        window.close();
      }, 100);
    },
    toUrlPrarms: function(json) {
      var params = Object.keys(json)
        .map(function(key) {
          // body...
          return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
        })
        .join("&");
      return params;
    },
    addParam: function(url, params) {
      if (params != "") {
        url += url.indexOf("?") == -1 ? "?" : "&";
        url += params;
      }
      return url;
    },
    getParam: function(paramName, url) {
      var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)", "i");
      if (!url || url == "") {
        url = window.location.search;
      } else {
        url = url.substring(url.indexOf("?"));
      }
      r = url.substr(1).match(reg);
      if (r != null) {
        // return unescape(r[2]);
        return decodeURIComponent(r[2]);
      }
      return null;
    },
    error: function(msg) {
      layer.msg(msg);
      js.log(msg);
    },
    log: function(msg) {
      console.log(msg);
    },
    showSucceMessage: function(msg) {
      layer.alert(msg, { icon: 1, skin: "layui-layer-lan" });
    },
    showErrorMessage: function(msg) {
      layer.alert(msg, { icon: 2, skin: "layui-layer-lan" });
    },
    closeLoading: function(index) {
      layer.close(index);
    },
    dateRange: function(startEl, endEl) {
      // 开始时间
      var start = laydate.render({
        elem: startEl,
        theme: "#038cf3",
        trigger: "click",
        done: function(value, date) {
          end.config.min = {
            year: date.year,
            month: date.month - 1,
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
          // 作为 结束选择 的 开始时间
          end.config.value = value;
        }
      });
      // 结束时间
      var end = laydate.render({
        // 绑定元素
        elem: endEl,
        //  主题色
        theme: "#038cf3",
        //  触发方式
        trigger: "click",
        // 底部按钮
        // btns: ['clear', 'confirm'],
        // showBottom: false,
        // 选择完成回调
        done: function(value, date) {
          start.config.max = {
            year: date.year,
            month: date.month - 1,
            date: date.date,
            hours: date.hours,
            minutes: date.minutes,
            seconds: date.seconds
          };
          start.config.value = value;
        }
      });
      laydate.render(start);
      laydate.render(end);
    },
    dateEl: function(el, options) {
      laydate.render(
        $.extend(
          {
            elem: el,
            theme: "#038cf3",
            trigger: "click"
          },
          options
        )
      );
    },
    dateTimeEl: function(el, options) {
      laydate.render(
        $.extend(
          {
            elem: el,
            type: "datetime",
            theme: "#038cf3",
            trigger: "click"
          },
          options
        )
      );
    },
    appendZero: function(value) {
      var val = value + "";
      return val.length > 1 ? val : "0" + val;
    },
    getCurrentDate: function() {
      var date = new Date();
      return (
        date.getFullYear() +
        "-" +
        js.appendZero(date.getMonth() + 1) +
        "-" +
        js.appendZero(date.getDate())
      );
    },
    ajaxReq: function(options) {
      var url = options.url;
      var method = options.type || "GET";
      var contentType =
        options.contentType ||
        "application/x-www-form-urlencoded;charset=UTF-8";
      var dk = js.createDk();
      var data = {
        // params: js.sm2Encrypt(JSON.stringify(options.data), dk)
        params: js.sm4Encrypt(JSON.stringify(options.data), dk)
      };
      if (contentType.indexOf("application/json") > -1) {
        data = JSON.stringify(data);
      }
      var async = options.async;
      if (async == undefined) {
        async = true;
      }
      var index = js.loading(options.message);
      $.ajax({
        url: url,
        type: method,
        contentType: contentType, //关键是要加上这行
        traditional: true, //这使json格式的字符不会被转码
        xhrFields: {
          withCredentials: true
        },
        async: async,
        data: data,
        crossDomain: true,
        beforeSend: function(XMLHttpRequest) {
          XMLHttpRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
          XMLHttpRequest.setRequestHeader("Data-Key", base64.encode(dk));
        },
        error: function(data) {
          $(".btn").attr("disabled", false);
          js.showErrorMessage(data.responseText);
          js.closeLoading(index);
          if (typeof options.error == "function") {
            options.error(data, status, xhr);
          } else {
            js.log(data);
          }
        },
        success: function(data, status, xhr) {
          js.closeLoading(index);
          try {
            if (options.success) {
              // if (data.returnTag == 0) {
                options.success(data);
              // } else {
              //   layer.msg(data.returnMsg);
              // }
            } else {
              js.log(data);
            }
          } catch (e) {
            js.error(e.message);
          }
        }
      });
    },
    /**
         * @param el
         * @param data
         * @param options
         *  {
            pageNum: 1,
                pageSize: 10,
                rowEvent:function(i,row){

                },
            fields: [
            {
                field: "",
                merge:false,
                dict: [{
                    code: "",
                    name: "",
                }
                ],
                format: function (index, item, field, value) {

                }
            }
        ]
        }
         */
    initTableBody: function(el, data, options) {
      if (!$(el)) return;
      if (!data) return;
      if (!options) return;
      var tbody = $(el);
      tbody.empty();
      var rows = [];
      var eventTr = options.rowEvent;
      var mergeObj = [];

      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var tr = $("<tr></tr>");
        if (eventTr != undefined) {
          eval(eventTr + "(i,item)");
        }

        for (var j = 0; j < options.fields.length; j++) {
          var row = options.fields[j];
          var td = $("<td ></td>");
          if (row.class != undefined || row.style != undefined) {
            if (row.style == undefined) {
              row.style = "";
            }
            var aclass = "";
            if (row.class != undefined) {
              aclass = "class='" + row.class + "' ";
            }
            td = $("<td " + aclass + row.style + "></td>");
          }
          if (row.format != undefined && row.format != "") {
            var value = row.format(i + 1, item, row.field, item[row.field]);
            td.append(value);
          } else if (row.field != undefined && row.field != "") {
            if (row.field == "[index]") {
              if (options.pageNum != undefined) {
                td.append((options.pageNum - 1) * options.pageSize + i + 1);
              } else {
                td.append(i + 1);
              }
            }

            var tdValue;
            if (row.dict != undefined && row.dict != "") {
              var dicts = row.dict;

              var ss = "0";
              for (var k = 0; k < dicts.length; k++) {
                if (dicts[k]["CODE"] == item[row.field]) {
                  tdValue = dicts[k]["NAME"];
                  ss = "1";
                  break;
                }
              }
              if (ss == "0") {
                tdValue = "";
              }
            } else {
              tdValue = item[row.field];
            }

            if (row.merge != undefined && row.merge == true) {
              var merge = null;
              var ii = 0;
              for (ii = 0; ii < mergeObj.length; ii++) {
                if (
                  mergeObj[ii].field == row.field &&
                  mergeObj[ii].value == tdValue
                ) {
                  merge = mergeObj[ii];
                  merge.count = merge.count + 1;
                  mergeObj[ii] = merge;
                  break;
                }
              }
              if (merge == null) {
                mergeObj.push({
                  index: j,
                  field: row.field,
                  value: tdValue,
                  count: 1
                });
              }
              td.append(tdValue);
            } else {
              td.append(tdValue);
            }
          }
          tr.append(td);
        }
        tbody.append(tr);
      }
      //合并单元格
      if (mergeObj.length > 0) {
        var trs = tbody.find("tr");
        var index2 = -1;
        var count2 = 0;
        for (var j = 0; j < mergeObj.length; j++) {
          var index = mergeObj[j].index;
          var count = mergeObj[j].count;

          var i = 0;
          if (index == index2) {
            i = count2;
            count2 = count2 + count;
          } else {
            count2 = count;
          }
          for (i; i < count2; i++) {
            var tr = trs[i];
            var td = $(tr)
              .find("td")
              .get(index);
            if (i == count2 - count) {
              $(td).attr("rowspan", count);
            } else {
              $(td).remove();
            }
          }
          index2 = index;
        }
      }
      if (data.length == 0) {
        tbody.append(
          "<tr><td  colspan='" +
            options.fields.length +
            "'>没有找到匹配的记录</td></tr>"
        );
      }
    },
    getDict: function(elem, params, value) {
      js.getDictData(params, function(data) {
        js.setDict(elem, data, value);
      });
    },
    setDict: function(elem, data, value) {
      if (elem != undefined && data != undefined) {
        var select = $(elem);

        if (value == undefined) {
          value = select.val();
        }
        select.empty();

        select.append('<option value="">请选择</option>');
        for (var i = 0; i < data.length; i++) {
          if (data[i]["gcode"] == value) {
            select.append(
              "<option selected value=" +
                data[i]["gcode"] +
                ">" +
                data[i]["gname"] +
                "</option>"
            );
          } else {
            select.append(
              "<option value=" +
                data[i]["gcode"] +
                ">" +
                data[i]["gname"] +
                "</option>"
            );
          }
        }
      }
    },
    getDictData: function(params, callback) {
      js.ajaxReq({
        type: "post",
        url: "../common/getDicList",
        contentType: "application/json",
        data: params,
        success: function(data) {
          if (callback) {
            callback(data.returnData);
          }
        }
      });
    },
    getManageDocData: function(params, callback) {
      js.ajaxReq({
        type: "post",
        url: "../communityPush/getUserByJg",
        contentType: "application/json",
        data: params,
        success: function(data) {
          if (callback) {
            callback(data.returnData);
          }
        }
      });
    },
    getDictJG: function(elem, params, value) {
      js.getDictJGData(params, function(data) {
        js.setDictJG(elem, data, value);
      });
    },
    setDictJG: function(elem, data, value) {
      if (elem != undefined && data != undefined) {
        var select = $(elem);

        if (value == undefined) {
          value = select.val();
        }
        select.empty();

        select.append('<option value="">请选择</option>');
        for (var i = 0; i < data.length; i++) {
          if (data[i]["JGID"] == value) {
            select.append(
              "<option selected value=" +
                data[i]["JGID"] +
                ">" +
                data[i]["JGMC"] +
                "</option>"
            );
          } else {
            select.append(
              "<option value=" +
                data[i]["JGID"] +
                ">" +
                data[i]["JGMC"] +
                "</option>"
            );
          }
        }
      }
    },
    setDictManageDoc: function(elem, data, value) {
      if (elem != undefined && data != undefined) {
        var select = $(elem);

        if (value == undefined) {
          value = select.val();
        }
        select.empty();

        select.append('<option value="">请选择</option>');
        for (var i = 0; i < data.length; i++) {
          if (data[i]["ID"] == value) {
            select.append(
              "<option selected value=" +
                data[i]["ID"] +
                ">" +
                data[i]["NAME"] +
                "(" +
                data[i]["EMPLOYEENO"] +
                ")</option>"
            );
          } else {
            select.append(
              "<option value=" +
                data[i]["ID"] +
                ">" +
                data[i]["NAME"] +
                "(" +
                data[i]["EMPLOYEENO"] +
                ")</option>"
            );
          }
        }
      }
    },
    getDictJGData: function(params, callback) {
      js.ajaxReq({
        type: "post",
        url: "../common/getJgList",
        contentType: "application/json",
        data: params,
        success: function(data) {
          if (callback) {
            callback(data.returnData);
          }
        }
      });
    },

    getGljgData: function(params, callback) {
      js.ajaxReq({
        type: "post",
        url: "../common/getJgList",
        contentType: "application/json",
        message: "数据加载中，请稍候。。。",
        data: params,
        success: function(data) {
          if (callback) {
            callback(data.returnData);
          }
        }
      });
    },
    getDictGLD: function(elem, params, value) {
      js.getDictGLDData(params, function(data) {
        js.setDictGLD(elem, data, value);
      });
    },
    //获取有医生的隔离点
    getDictYsGLD: function(elem, params, value) {
      js.getDictYsGLDData(params, function(data) {
        js.setDictGLD(elem, data, value);
      });
    },
    setDictGLD: function(elem, data, value) {
      if (elem != undefined && data != undefined) {
        var select = $(elem);

        if (value == undefined) {
          value = select.val();
        }
        select.empty();

        select.append('<option value="">请选择</option>');
        for (var i = 0; i < data.length; i++) {
          if (data[i]["jzgldId"] == value) {
            select.append(
              "<option selected value=" +
                data[i]["jzgldId"] +
                ">" +
                data[i]["gldmc"] +
                "</option>"
            );
          } else {
            select.append(
              "<option value=" +
                data[i]["jzgldId"] +
                ">" +
                data[i]["gldmc"] +
                "</option>"
            );
          }
        }
      }
    },
    getDictGLDData: function(params, callback) {
      js.ajaxReq({
        type: "post",
        url: "../common/getJzgldByAreaCode",
        contentType: "application/json",
        data: params,
        success: function(data) {
          if (callback) {
            callback(data.returnData);
          }
        }
      });
    },
    getDictYsGLDData: function(params, callback) {
      js.ajaxReq({
        type: "post",
        url: "../common/getYsJzgldByAreaCode",
        contentType: "application/json",
        data: params,
        success: function(data) {
          if (callback) {
            callback(data.returnData);
          }
        }
      });
    },
    getDicArea: function(elem, params, value) {
      js.getDicAreaData(params, function(data) {
        js.setDicArea(elem, data, value);
      });
    },
    setDicArea: function(elem, data, value) {
      if (elem != undefined && data != undefined) {
        var select = $(elem);

        if (value == undefined) {
          value = select.val();
        }
        select.empty();

        select.append('<option value="">请选择</option>');
        for (var i = 0; i < data.length; i++) {
          if (data[i]["eCode"] == value) {
            select.append(
              "<option selected value=" +
                data[i]["eCode"] +
                ">" +
                data[i]["explainMemo"] +
                "</option>"
            );
          } else {
            select.append(
              "<option value=" +
                data[i]["eCode"] +
                ">" +
                data[i]["explainMemo"] +
                "</option>"
            );
          }
        }
      }
    },
    setDicAreaAllCity: function(elem, data, value) {
      if (elem != undefined && data != undefined) {
        var select = $(elem);

        if (value == undefined) {
          value = select.val();
        }
        select.empty();

        select.append('<option value="">全市</option>');
        for (var i = 0; i < data.length; i++) {
          if (data[i]["eCode"] == value) {
            select.append(
              "<option selected value=" +
                data[i]["eCode"] +
                ">" +
                data[i]["explainMemo"] +
                "</option>"
            );
          } else {
            select.append(
              "<option value=" +
                data[i]["eCode"] +
                ">" +
                data[i]["explainMemo"] +
                "</option>"
            );
          }
        }
      }
    },
    setDicAreaNoAll: function(elem, data, value) {
      if (elem != undefined && data != undefined) {
        var select = $(elem);

        if (value == undefined) {
          value = select.val();
        }
        select.empty();
        for (var i = 0; i < data.length; i++) {
          if (data[i]["eCode"] == value) {
            select.append(
              "<option selected value=" +
                data[i]["eCode"] +
                ">" +
                data[i]["explainMemo"] +
                "</option>"
            );
          } else {
            select.append(
              "<option value=" +
                data[i]["eCode"] +
                ">" +
                data[i]["explainMemo"] +
                "</option>"
            );
          }
        }
      }
    },
    getDicAreaData: function(params, callback) {
      js.ajaxReq({
        type: "post",
        url: "../common/getAreaList",
        contentType: "application/json",
        data: params,
        success: function(data) {
          if (callback) {
            callback(data.returnData);
          }
        }
      });
    },
    getGcdData: function(elem, jgmc, callback) {
      js.ajaxReq({
        url: "../common/getGcdData",
        data: {
          jgmc: jgmc,
          frmz: "1"
        },
        success: function(res) {
          var data = res.returnData;
          if (elem != undefined && data != undefined) {
            var select = $(elem);
            select.empty();

            select.append('<option value="">请选择</option>');
            for (var i = 0; i < data.length; i++) {
              select.append(
                "<option value=" +
                  data[i]["CODE"] +
                  ">" +
                  data[i]["NAME"] +
                  "</option>"
              );
            }
            $("#" + elem).selectpicker("refresh");
          }
          if (callback) {
            callback(data);
          }
        }
      });
    },
    download: function(url, id) {
      try {
        if ($("#" + id).length > 0) {
          document.getElementById(id).src = url;
        } else {
          var elemIF = document.createElement("iframe");
          elemIF.src = url;
          elemIF.style.display = "none";
          elemIF.id = id;
          document.body.appendChild(elemIF);
        }
      } catch (e) {}
    },
    parseDate: function(date) {
      if (date == undefined) {
        return null;
      }
      return new Date(date.replace(/-/g, "/"));
    },
    formatDate: function(date, f) {
      if (date == undefined) {
        return "";
      }
      if (f == undefined) {
        f = "yyyy-MM-dd HH:mm";
      }
      var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "H+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
      };
      if (/(y+)/.test(f)) {
        f = f.replace(
          RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length)
        );
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(f)) {
          f = f.replace(
            RegExp.$1,
            RegExp.$1.length == 1
              ? o[k]
              : ("00" + o[k]).substr(("" + o[k]).length)
          );
        }
      }
      return f;
    },
    //以下函数排序属性并未写死，可直接拿去用自定义属性
    SortByProps: function(item1, item2, obj) {
      var props = [];
      if (obj) {
        props.push(obj);
      }
      var cps = []; // 存储排序属性比较结果。
      // 如果未指定排序属性(即obj不存在)，则按照全属性升序排序。
      // 记录下两个排序项按照各个排序属性进行比较得到的结果
      var asc = true;
      if (props.length < 1) {
        for (var p in item1) {
          if (item1[p] > item2[p]) {
            cps.push(1);
            break; // 大于时跳出循环。
          } else if (item1[p] === item2[p]) {
            cps.push(0);
          } else {
            cps.push(-1);
            break; // 小于时跳出循环。
          }
        }
      } else {
        for (var i = 0; i < props.length; i++) {
          var prop = props[i];
          for (var o in prop) {
            asc = prop[o] === "ascending";
            if (item1[o] > item2[o]) {
              cps.push(asc ? 1 : -1);
              break; // 大于时跳出循环。
            } else if (item1[o] === item2[o]) {
              cps.push(0);
            } else {
              cps.push(asc ? -1 : 1);
              break; // 小于时跳出循环。
            }
          }
        }
      }

      // 根据各排序属性比较结果综合判断得出两个比较项的最终大小关系
      for (var j = 0; j < cps.length; j++) {
        if (cps[j] === 1 || cps[j] === -1) {
          return cps[j];
        }
      }
      return false;
    },
    cookie: function(name, value, options) {
      if (typeof value != "undefined") {
        options = options || {};
        if (value === null) {
          value = "";
          options.expires = -1;
        }
        var expires = "";
        if (
          options.expires &&
          (typeof options.expires == "number" || options.expires.toUTCString)
        ) {
          var date;
          if (typeof options.expires == "number") {
            date = new Date();
            date.setTime(
              date.getTime() + options.expires * 24 * 60 * 60 * 1000
            );
          } else {
            date = options.expires;
          }
          expires = "; expires=" + date.toUTCString();
        }
        var path = options.path
          ? "; path=" + options.path
          : window.ctxPath
          ? "; path=" + window.ctxPath
          : "";
        var domain = options.domain ? "; domain=" + options.domain : "";
        var secure = options.secure ? "; secure" : "";
        document.cookie = [
          name,
          "=",
          encodeURIComponent(value),
          expires,
          path,
          domain,
          secure
        ].join("");
      } else {
        var cookieValue = null;
        if (document.cookie && document.cookie != "") {
          var cookies = document.cookie.split(";");
          for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == name + "=") {
              cookieValue = decodeURIComponent(
                cookie.substring(name.length + 1)
              );
              break;
            }
          }
        }
        return cookieValue;
      }
    },
    sm2Encrypt: function(str, pubkeyHex) {
      if (pubkeyHex == null || typeof pubkeyHex == 'undefined') {
        return null;
      }
      var msgData = CryptoJS.enc.Utf8.parse(str);
      if (pubkeyHex.length > 130) {
        pubkeyHex = pubkeyHex.substr(pubkeyHex.length - 130);
      }
      var cipher = new SM2Cipher(SM2CipherMode.C1C3C2);
      var userKey = cipher.CreatePoint(pubkeyHex);
      msgData = cipher.str2Bytes(msgData.toString());
      return cipher.Encrypt(userKey, msgData);
    },
    sm4Encrypt: function(str, key) {
      var s4 = new SM4Util();
      s4.secretKey = key;
      return s4.encryptData_ECB(str);
    },
    createDk: function () {
      //return sessionStorage.getItem("encryptKey");
      var len = 32;
      var $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
      var maxPos = $chars.length;
      var pwd = "";
      for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    }
  };
  window.base64 = new Base64();
  window.js = js;
  window.log = js.log;
  window.error = js.error;
  window.lang = window.lang || "zh_CN";
  window.text = js.text;
})(window.jQuery, window);
