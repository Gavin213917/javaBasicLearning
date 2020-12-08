// 设定地址联动
function setAdressComboBox(index, objs, async){
    if (index >= objs.size()-1) {return;}
    for (var i = index + 1; i < objs.size(); i++) {
        objs[i].options.length=0; 
        objs[i].options.add(new Option("请选择...",""));
    }
    var url = "comboBoxAjaxAction!setAreaComboBox.action";
    var value = objs[index].value; 
    dataAjax = {
    'inputText' : value
    }
    AjaxCall({
        url : url,
        data : dataAjax,
        async : async,
        recall:function(result){ 
            var target = objs[index+1];
            for(var i = 0;i<result.length;i++){
                target.options.add(new Option(result[i].cname, result[i].ccode));  
            }
        }    
    });
}

// 必须入力检查并设定焦点
function checkRequireFocus(obj, message) {
    var result = checkRequire(obj, message);
    if (!result) {
        obj.focus();
    }
    return result;
}

// 检查登记管理信息
function checkGlxx() {
    if (document.getElementById("jkrq") != null) {
    	var sDate = $("#sysdate").val();
    	var date;
    	if (sDate != "") {
	    	var aDate = sDate.split("-");   
	    	date = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]).Format("yyyy-MM-dd");
    	} else {
    		date = new Date().Format("yyyy-MM-dd");
    	}
    	
        var jkrq = document.getElementById("jkrq").value;
        if(jkrq == null || jkrq == ""){
            alert(getMessage(MSG_C007,'建卡日期'));
            document.getElementById("jkrq").focus();
            return false;
        }else{
            if(checkDateByStrlength(10,jkrq) == false){
                alert(getMessage(MSG_C004,'建卡日期'));
                document.getElementById("jkrq").focus();
                return false;
            }
            if(dateCompare(date,jkrq) == false){
                alert(getMessage(MSG_C005,'建卡日期'));
                document.getElementById("jkrq").focus();
                return false;
            }
            if ($("input[name='cardId']")[0].value == "") {
	            if(dateCompare(DateAdd("m",2,jkrq), date) ==  false){
	                alert(getMessage(MSG_C902));
	                document.getElementById("jkrq").focus();
	                return false;
	            }
            }
        }
    }        
    if($("[name='thjdbz']")[1].checked == false && $("[name='thjdbz']")[0].checked == false){
	    var ywdShe = document.getElementById("ywdShe").value;
	    if(ywdShe == null || ywdShe == ""){
	        alert(getMessage(MSG_C007,'业务地址 省（自治区、直辖市）'));
	        document.getElementById("ywdShe").focus();
	        return false;
	    }
	    var ywdShi = document.getElementById("ywdShi").value;
	    if(ywdShi == null || ywdShi == ""){
	        alert(getMessage(MSG_C007,'业务地址 市（地区）'));
	        document.getElementById("ywdShi").focus();
	        return false;
	    }
	    var ywdXia = document.getElementById("ywdXia").value;
	    if(ywdXia == null || ywdXia == ""){
	        alert(getMessage(MSG_C007,'业务地址 县（区）'));
	        document.getElementById("ywdXia").focus();
	        return false;
	    }
	    var ywdXng = document.getElementById("ywdXng").value;
	    if(ywdXng == null || ywdXng == ""){
	        alert(getMessage(MSG_C007,'业务地址 乡（镇、街道办事处）'));
	        document.getElementById("ywdXng").focus();
	        return false;
	    }
	    var ywdCun = document.getElementById("ywdCun").value;
	    if(ywdCun == null || ywdCun == ""){
	        alert(getMessage(MSG_C007,'业务地址 村（街、路、弄）'));
	        document.getElementById("ywdCun").focus();
	        return false;
	    }
	    var ywdMph = document.getElementById("ywdMph").value;
	    if(ywdMph == null || ywdMph == ""){
	        alert(getMessage(MSG_C007,'业务地址 门牌号'));
	        document.getElementById("ywdMph").focus();
	        return false;
	    }
	    
        if (!checkAreaComboBoxRemove("ywdShe","ywdShi","ywdXia","ywdXng","ywdJwh")){return false;}
		  //选择同户籍地时, 
    }else if($("[name='thjdbz']")[0].checked==true){
        var ywdShe = document.getElementById("provinceHj").value;
        if(ywdShe == null || ywdShe == ""){
            alert(getMessage(MSG_C007,'业务地址 省（自治区、直辖市）'));
            document.getElementById("provinceHj").focus();
            return false;
        }
        var ywdShi = document.getElementById("cityHj").value;
        if(ywdShi == null || ywdShi == ""){
            alert(getMessage(MSG_C007,'业务地址 市（地区）'));
            document.getElementById("cityHj").focus();
            return false;
        }
        var ywdXia = document.getElementById("districtHj").value;
        if(ywdXia == null || ywdXia == ""){
            alert(getMessage(MSG_C007,'业务地址 县（区）'));
            document.getElementById("districtHj").focus();
            return false;
        }
        var ywdXng = document.getElementById("townHj").value;
        if(ywdXng == null || ywdXng == ""){
            alert(getMessage(MSG_C007,'业务地址 乡（镇、街道办事处）'));
            document.getElementById("townHj").focus();
            return false;
        }
        var ywdCun = document.getElementById("roadHj").value;
        if(ywdCun == null || ywdCun == ""){
            alert(getMessage(MSG_C007,'业务地址 村（街、路、弄）'));
            document.getElementById("roadHj").focus();
            return false;
        }
        var ywdMph = document.getElementById("roomHj").value;
        if(ywdMph == null || ywdMph == ""){
            alert(getMessage(MSG_C007,'业务地址 门牌号'));
            document.getElementById("roomHj").focus();
            return false;
        }   
        //选择同居住地时
    }else if($("[name='thjdbz']")[1].checked==true){
        var ywdShe = document.getElementById("provinceJz").value;
        if(ywdShe == null || ywdShe == ""){
            alert(getMessage(MSG_C007,'业务地址 省（自治区、直辖市）'));
            document.getElementById("provinceJz").focus();
            return false;
        }
        var ywdShi = document.getElementById("cityJz").value;
        if(ywdShi == null || ywdShi == ""){
            alert(getMessage(MSG_C007,'业务地址 市（地区）'));
            document.getElementById("cityJz").focus();
            return false;
        }
        var ywdXia = document.getElementById("districtJz").value;
        if(ywdXia == null || ywdXia == ""){
            alert(getMessage(MSG_C007,'业务地址 县（区）'));
            document.getElementById("districtJz").focus();
            return false;
        }
        var ywdXng = document.getElementById("townJz").value;
        if(ywdXng == null || ywdXng == ""){
            alert(getMessage(MSG_C007,'业务地址 乡（镇、街道办事处）'));
            document.getElementById("townJz").focus();
            return false;
        }
        var ywdCun = document.getElementById("roadJz").value;
        if(ywdCun == null || ywdCun == ""){
            alert(getMessage(MSG_C007,'业务地址 村（街、路、弄）'));
            document.getElementById("roadJz").focus();
            return false;
        }
        var ywdMph = document.getElementById("roomJz").value;
        if(ywdMph == null || ywdMph == ""){
            alert(getMessage(MSG_C007,'业务地址 门牌号'));
            document.getElementById("roomJz").focus();
            return false;
        }   
    }
    return true;
}

function calSznl(csny,nldw,sysDate){
	csny = csny.replace(/-/g, "/");
	sysDate = sysDate.replace(/-/g, "/");
	var d1 = new Date(csny);
    var d2 = new Date(sysDate);
    var todayMonth = d2.getMonth();
	var csnyMonth = d1.getMonth();
	var todayDay = d2.getDate();
	var csnyDay = d1.getDate();
    if(nldw == "1"){
    	var year = d2.getFullYear() - d1.getFullYear();
		if(todayMonth < csnyMonth){
		    if(year > 0){
		        year = year - 1;
		    }else{
		        year = 0;
		    }
		}
		if(todayMonth == csnyMonth){
		    if(todayDay < csnyDay){
		        if(year > 0){
		            year = year - 1;
		        }else{
		            year = 0;
		        }
		    }
		}
		sznl = year;
    }
	if(nldw == "2"){
		var month = (d2.getFullYear() - d1.getFullYear()) * 12 + (todayMonth - csnyMonth);
		if(todayDay < csnyDay){
			if(month > 0){
				month = month - 1;
			}else{
		        month = 0;
			}
		}
		var time= d2.getTime() - d1.getTime();
        var day = parseInt(time / (1000 * 60 * 60 * 24));  
		if(month == 0 && day > 27){ // 若不足一个月但超过27天则按一个月算
			month = 1;
		}
		sznl = month;
	}
	if(nldw == "3"){
        var time= d2.getTime() - d1.getTime();
        var day = parseInt(time / (1000 * 60 * 60 * 24));  
        sznl = day;
	}
	return sznl;
}		    
				
// 日期加上天数等于第二个日期
function dateAddDay(originalDate, day) {
	originalDate = originalDate.replace(/-/g, "/");
	var d = new Date(originalDate);
	d = d.valueOf();
	d = d + day * 24 * 60 * 60 * 1000;
	d = new Date(d)
	return d.Format("yyyy-MM-dd");
}

/*
* 功能:实现VBScript的DateAdd功能.
* 参数:interval,字符串表达式，表示要添加的时间间隔.
* 参数:number,数值表达式，表示要添加的时间间隔的个数.
* 参数:date,时间对象.
* 返回:新的时间对象.
* var now = new Date();
* var newDate = DateAdd( "d",5,now);
*--------------- DateAdd(interval,number,date) -----------------
*/
function DateAdd(interval, number, originalDate) {
	originalDate = originalDate.replace(/-/g, "/");
	var date = new Date(originalDate);
	switch (interval) {
	case "y":
		date.setFullYear(date.getFullYear() + number);
		return date.Format("yyyy-MM-dd");
		break;
		date.setMonth(date.getMonth() + number * 3);
		return date.Format("yyyy-MM-dd");
		break;
	case "m":
		date.setMonth(date.getMonth() + number);
		return date.Format("yyyy-MM-dd");
		break;
	case "w":
		date.setDate(date.getDate() + number * 7);
		return date.Format("yyyy-MM-dd");
		break;
	case "d":
		date.setDate(date.getDate() + number);
		return date.Format("yyyy-MM-dd");
		break;
	case "h ":
		date.setHours(date.getHours() + number);
		return date.Format("yyyy-MM-dd");
		break;
	case "m":
		date.setMinutes(date.getMinutes() + number);
		return date.Format("yyyy-MM-dd");
		break;
	case "s":
		date.setSeconds(date.getSeconds() + number);
		return date.Format("yyyy-MM-dd");
		break;
	default:
		date.setDate(d.getDate() + number);
		return date.Format("yyyy-MM-dd");
		break;
	}
}

function closeForm() {
	window.opener=null;
	window.open('', '_self', '');
	window.close();
}

/*
* 功能:初始化Remote easyUI comboBox
* 参数:obj      ：初始化对象
* 参数:url      ：url地址
* 参数:initValue：默认值
* 使用方法：按照如下命名3个控件(XXX可替换)，json数据格式（[{valueField:'CODE',textField:'NAME'}]），
*  1)XXXinput：comboBox的id
*  2)XXX     ：保存code控件的id
*  3)XXXname：保存name控件的id
*/
function initRemoteCombobox(obj, url, initValue) {
	var objId = obj[0].id.replace("input","");
	var codeObj = $("#"+objId);
	var nameObj = $("#"+objId+"name");
	obj.combobox({
		url : url,
		value : initValue,
		valueField : 'CODE',
		textField : 'NAME',
		mode : 'remote',
		onSelect : function(record) {
			if (codeObj != null) {
				codeObj.val(record.CODE);
			}
			if (nameObj != null) {
				nameObj.val(record.NAME);
			}
		},
		onHidePanel : function() {
			var opts = $(this).combobox('options');
			var rows = $(this).combobox('getData');
			var text = $(this).combobox('getText');
			for ( var i = 0; i < rows.length; i++) {
				if (rows[i][opts.textField] == text || rows[i][opts.valueField] == text) {
					$(this).combobox('setValue', rows[i][opts.valueField]);
					if (codeObj != null && codeObj.val() != rows[i][opts.valueField]) {
						codeObj.val(rows[i][opts.valueField]);
					}
					if (nameObj != null && nameObj.val() != rows[i][opts.textField]) {
						nameObj.val(rows[i][opts.textField]);
					}
					break;
				} else if (i == rows.length - 1) {
					if (codeObj != null) {
						codeObj.val("");
					}
					if (nameObj != null) {
						nameObj.val("");
					}
				}
			}
		}
	});
	var opt = obj.combobox('options');
	opt.keyHandler.left = function(){};
	opt.keyHandler.right = function(){};
}

/*
* 功能:初始化用户comboBox
* 参数:obj      ：初始化对象
* 参数:url      ：url地址
* 参数:initValue：默认值
* 使用方法：按照如下命名3个控件(XXX可替换)，json数据格式（[{valueField:'CODE',textField:'NAME'}]），
*  1)XXXinput：comboBox的id
*  2)XXX     ：保存code控件的id
*  3)XXXname：保存name控件的id
*/
function initYsCombobox(obj, url, initValue) {
	initLocalCombobox(obj, url, initValue, 'CODE', 'NAME', 'DISPLAYNAME');
}

/*
* 功能:初始化local easyUI comboBox
* 参数:obj      ：初始化对象
* 参数:url      ：url地址
* 参数:initValue：默认值
* 使用方法：按照如下命名3个控件(XXX可替换)，json数据格式（[{valueField:'CODE',textField:'NAME'}]），
*  1)XXXinput：comboBox的id
*  2)XXX     ：保存code控件的id
*  3)XXXname：保存name控件的id
*/
function initLocalCombobox(obj, url, initValue, valueField, textField, displayField) {
	var objId = obj[0].id.replace("input","");
	var codeObj = $("#"+objId);
	var nameObj = $("#"+objId+"name");
	var vField = valueField;
	var tField = textField;
	var dField = displayField;
	if (vField == null) {
		vField = "CODE";
	}
	if (tField == null) {
		tField = "NAME";
	}
	if (dField == null) {
		dField = "NAME";
	}
	
	obj.combobox({
		url : url,
		value : initValue,
		valueField : vField,
		textField : dField,
		onSelect : function(record) {
			if (codeObj != null) {
				codeObj.val(record[vField]);
			}
			if (nameObj != null) {
				nameObj.val(record[tField]);
			}
		},
		onHidePanel : function() {
			var opts = $(this).combobox('options');
			var rows = $(this).combobox('getData');
			var text = $(this).combobox('getText');
			for ( var i = 0; i < rows.length; i++) {
				if (rows[i][opts.textField] == text || rows[i][opts.valueField] == text) {
					$(this).combobox('setValue', rows[i][opts.valueField]);
					if (codeObj != null && codeObj.val() != rows[i][vField]) {
						codeObj.val(rows[i][vField]);
					}
					if (nameObj != null && nameObj.val() != rows[i][tField]) {
						nameObj.val(rows[i][tField]);
					}
					break;
				} else if (i == rows.length - 1) {
					if (codeObj != null) {
						codeObj.val("");
					}
					if (nameObj != null) {
						nameObj.val("");
					}
				}
			}
		},
		filter : function(q, row) {
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) > -1;
		}
	});
	var opt = obj.combobox('options');
	opt.keyHandler.left = function(){};
	opt.keyHandler.right = function(){};
}

/*
* 功能:初始化local easyUI 民族 comboBox
* 参数:obj      ：初始化对象
* 参数:initValue：默认值
* 使用方法：按照如下命名3个控件(XXX可替换)，json数据格式（[{valueField:'CODE',textField:'NAME'}]），
*  1)XXXinput：comboBox的id
*  2)XXX     ：保存code控件的id
*  3)XXXname：保存name控件的id
*/
function initMinZuCombobox(obj,initValue) {
	initLocalCombobox(obj,"getMinzuSelect.action", initValue,null,null,"CODENAME");
	obj.combobox({
		filter : function(q, row) {
			var opts = $(this).combobox('options');
			return (row[opts.textField].indexOf(q) > -1 
				  ||row["MZJC"].indexOf(q.toLocaleUpperCase()) > -1);
		}
	});
}

/*
* 功能:初始化local easyUI 数据字典多选 comboBox
* 参数:obj      ：初始化对象
* 参数:dicType  ：数据字典类型
* 参数:initValue：默认值
* 使用方法：按照如下命名2个控件(XXX可替换)，json数据格式（[{valueField:'CODE',textField:'NAME'}]），
*  1)XXXinput：comboBox的id
*  2)XXX     ：保存code控件的id
*/
function initDicMultipleCombobox(obj,dicType,initValue) {
	var objId = obj[0].id.replace("input","");
	var codeObj = $("#"+objId);
	var url = "getDicSelect.action?dicType=" + dicType;
	var vField = "CODE";
	var tField = "NAME";
	var dField = "NAME";
	obj.combobox({
		url : url,
		value : initValue,
		valueField : vField,
		textField : dField,
		onSelect : function(record) {
			if (codeObj != null && codeObj.val()!= null && codeObj.val()!= "" ) {
				codeObj.val(codeObj.val()+","+record[vField]);
			}else{
				codeObj.val(record[vField]);
			}
		},
		onUnselect : function(record) {
			var tv = record[vField];
			codeObj.val(codeObj.val().replace(tv+",","").replace(","+tv,"").replace(tv,""));
		}, 
		onLoadSuccess : function() {
			if (codeObj != null && codeObj.val()!= null && codeObj.val()!= "" ) {
				$(this).combobox('setValues',codeObj.val().split(","));
			}
		},
		onHidePanel : function() {
			if (codeObj != null && codeObj.val()!= null && codeObj.val()!= "" ) {
				$(this).combobox('setValues',codeObj.val().split(","));
			}
		}, multiple:true,editable:false
	});
	var opt = obj.combobox('options');
	opt.keyHandler.left = function(){};
	opt.keyHandler.right = function(){};
}

function getBmiNum(sg,tz){
	var bmi;
    if(sg != null && sg != "" && tz != null && tz != ""){
        bmi = 100*100*tz/(sg*sg);
        bmi = Math.round(bmi*Math.pow(10,1))/Math.pow(10,1);
        bmi = bmi + "";
        var i = bmi.indexOf(".");
        if(i > 0){
            bmi = bmi.substring(0,i+2);
        }
	}
	return bmi
}

/**
 * 糖尿病、高血压肺炎意愿控制
 */
//调查结果 控制 2017年4月24日
function changDcjg(){
	$("#dcjgTd")[0].colSpan=6;
	$(".jzsjTd").hide();
	$(".jjlyTd").hide();
	var dcjg = $("#dcjg")[0].value;
	if("4"==dcjg){
    	$("#dcjgTd")[0].colSpan=1;
		$(".jzsjTd").show();
		$("#jjly").val("");
		$("#jjlyqt").val("");
	}else if("2"==dcjg ||"3"==dcjg){
		$("#dcjgTd")[0].colSpan=1;
		$(".jjlyTd").show();
		$("#jzsj").val("");
	}
}

/**
 * 糖尿病、高血压流感意愿调查结果控制
 * 2017年7月3日
 * add by yujingyu
 */
function changLgDcjg(){
	$("#dcjgTd_lg")[0].colSpan=6;
	$(".jzsjTd_lg").hide();
	$(".jjlyTd_lg").hide();
	var dcjg = $("#dcjg_lg")[0].value;
	if("4"==dcjg){//已接种
    	$("#dcjgTd_lg")[0].colSpan=1;
		$(".jzsjTd_lg").show();
		$("#jjly_lg").val("");
	}else if("3"==dcjg){//不愿意
		$("#dcjgTd_lg")[0].colSpan=1;
		$(".jjlyTd_lg").show();
		$("#jzsj_lg").val("");
	}
}

//检测地址下拉是否为废弃地址
function testAreaComboBoxRemove(sheng, shi, xian, xiang, juwei){
	 var url = "comboBoxAjaxAction!testAreaComboBoxRemove.action";
	 var test = true;
	 var massage = "";
     dataAjax = {'shengCode' : sheng,'shiCode' : shi,'xianCode' : xian, 'xiangCode' : xiang,'juweiCode' : juwei};
     AjaxCall({
		url : url,
		data : dataAjax,
		async : "false",
		recall:function(result) {
		massage = result;
		}
	});
	return massage;
}

//检测地址下拉是否为废弃地址
function checkAreaComboBoxRemove(shengId, shiId, xianId, xiangId, juweiId){
    var massage = "废弃地址不可用!";
    var province = $("#"+shengId).val();
    var city = $("#"+shiId).val();
    var district = $("#"+xianId).val();
    var town = $("#"+xiangId).val();
    var village = $("#"+juweiId).val();
    //校验废弃地址-户籍地址  
    var msg = testAreaComboBoxRemove(province,city,district,town,village);
    if(msg =="1"){
        alert(massage);
        document.getElementById(shengId).focus();
        return false;
    }else if(msg == "2"){
        alert(massage);
        document.getElementById(shiId).focus();
        return false;
    }else if(msg == "3"){
        alert(massage);
        document.getElementById(xianId).focus();
        return false;
    }else if(msg == "4"){
        alert(massage);
        document.getElementById(xiangId).focus();
        return false;
    }else if(msg == "5"){
        alert(massage);
        document.getElementById(juweiId).focus();
        return false;
    }
    return true;
}

//检测地址是否为废弃地址
function existScrapAddress(address){
    var massage = "废弃地址不可用!";
    var add = $("#"+address).val();
    var url = "comboBoxAjaxAction!existScrapAddress.action";
	var result = "";
    AjaxCall({
		url : url,
		data: {'address' : add},
		async : "false",
		recall:function(data) {
    		result = data;
		}
	});
    if(result == "1"){
        alert(massage);
        document.getElementById(address).focus();
        return false;
    }
    return true;
}

/**
 * 添加水印2
 */
function watermark(settings,left,top) {
	setWatermarkById(settings,left,top,"watermark");
}

/**
 * 添加水印
 */
function setWatermarkById(settings,left,top,id) {

    //默认设置
    var defaultSettings={
      watermark_txt:settings.watermark_txt,
      watermark_x:0,//水印起始位置x轴坐标
      watermark_y:0,//水印起始位置Y轴坐标
      watermark_rows:5,//水印行数
      watermark_cols:20,//水印列数
      watermark_x_space:50,//水印x轴间隔
      watermark_y_space:50,//水印y轴间隔
      watermark_alpha:1,//水印透明度
      watermark_fontsize:'10px',//水印字体大小
      watermark_font:'宋体',//水印字体
      watermark_width:130,//水印宽度
      watermark_height:80,//水印长度
      watermark_angle:15//水印倾斜度数
    };
    //采用配置项替换默认值，作用类似jquery.extend
    if(arguments.length===1&&typeof arguments[0] ==="object" )
    {
      var src=arguments[0]||{};
      for(key in src)
      {
        if(src[key]&&defaultSettings[key]&&src[key]===defaultSettings[key])
          continue;
        else if(src[key])
          defaultSettings[key]=src[key];
      }
    }

    var oTemp = document.createDocumentFragment();
    var obj = document.getElementById(id);
    //获取页面最大宽度
    var page_width = Math.max(document.body.scrollWidth,document.body.clientWidth);
    page_width=obj.offsetWidth-217;
    //获取页面最大长度
    var page_height = Math.max(document.body.scrollHeight,document.body.clientHeight);

    //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
    if (defaultSettings.watermark_cols == 0 ||
      (parseInt(defaultSettings.watermark_x
        + defaultSettings.watermark_width *defaultSettings.watermark_cols
        + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1))
      > page_width)) {
      defaultSettings.watermark_cols =
        parseInt((page_width
          -defaultSettings.watermark_x
          +defaultSettings.watermark_x_space)
          / (defaultSettings.watermark_width
          + defaultSettings.watermark_x_space));
      defaultSettings.watermark_x_space =
        parseInt((page_width
          - defaultSettings.watermark_x
          - defaultSettings.watermark_width
          * defaultSettings.watermark_cols)
          / (defaultSettings.watermark_cols - 1));
    }
    //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
    if (defaultSettings.watermark_rows == 0 ||
      (parseInt(defaultSettings.watermark_y
        + defaultSettings.watermark_height * defaultSettings.watermark_rows
        + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1))
      > page_height)) {
      defaultSettings.watermark_rows =
        parseInt((defaultSettings.watermark_y_space
          + page_height - defaultSettings.watermark_y)
          / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
      defaultSettings.watermark_y_space =
        parseInt((page_height
          - defaultSettings.watermark_y
          - defaultSettings.watermark_height
          * defaultSettings.watermark_rows)
          / (defaultSettings.watermark_rows - 1));
    }
    var x;
    var y;
    $("#"+id).children('pre').remove();
    for (var i = 0; i < defaultSettings.watermark_rows; i++) {
        y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
      for (var j = 0; j < defaultSettings.watermark_cols; j++) {
        x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;

        var mask_div = document.createElement('pre');
        mask_div.id = 'mask_div' + i + j;
		mask_div.className = 'mask_div';
        mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt));
        //设置水印div倾斜显示
        mask_div.style.visibility = "";
        mask_div.style.position = "absolute";
        mask_div.style.left = x + 'px';
        mask_div.style.top = y + 'px';
        mask_div.style.overflow = "hidden";
        mask_div.style.zIndex = "9999";
        mask_div.style.opacity = defaultSettings.watermark_alpha;
        mask_div.style.fontSize = defaultSettings.watermark_fontsize;
        mask_div.style.fontFamily = defaultSettings.watermark_font;
        mask_div.style.textAlign = "center";
        mask_div.style.width = defaultSettings.watermark_width + 'px';
        mask_div.style.height = defaultSettings.watermark_height + 'px';
        oTemp.appendChild(mask_div);
      };
    };
    
	$("#"+id).append(oTemp);
	clearMask();
    
}

function clearMask(){
	$(".mask_div").click(function(){
		$(".mask_div").css("display","block");
		$(".mask_div").css("z-index","9999");
	 	var z=$(this).css("display");
	 	if(z.length>5){
 			$(this).css("display","block");
		}else{
	 		$(this).css("display","none");
		}
	});
}

