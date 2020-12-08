/**
	 * 将form表单内的元素序列化为对象
	 * 用法：$.fn.serializeObject($("#formId"))
	 * 用例：var param = new Object();
	 * 	   param = $.fn.serializeObject($("#queryForm"));
	 * 	   grid.load(param);
	 */
	jQuery.fn.serializeObject = function (form) { 
		var o = {};
		$.each(form.serializeArray(), function (index) {
			if (o[this['name']]) {
				o[this['name']] = o[this['name']] + "," + this['value'];
			} else {
				o[this['name']] = this['value'];
			}
		});
		return o;
	};

function showTab(url,title){
		var window = new Ext.Window({
			id:'showWin',
			title:'<font size="3">'+title+'</font>',
			plain:true,
			modal:true,
			resizable : true,
			maximized :true,
			maximizable:true,
			layout: 'fit',
			autoScroll :true,
			closable:false,
			constrainHeader :true,
			contentEl : Ext.DomHelper.append(document.body, {
				tag : 'iframe',
				src : url,
				height : "100%",
				width : "100%"
				})
			,   				
			buttonAlign:'center',
			buttons:[{
				text:'返回',
				handler : function(btn) {  
				Ext.getCmp('showWin').close(); 
				}
			}],
			listeners: {  
                close:function(w){  
                    //关键部分：关闭窗口前先还原,滚动条才不会消失  
                    w.restore();  
                },  
                maximize:function(w){      
                    //关键部分：最大化后需要将窗口重新定位，否则窗口会从最顶端开始最大 化    
                    w.setPosition(document.body.scrollLeft,document.body.scrollTop);  
	        	} 
	        }			
		});
		window.show();
	};

function showTabRefresh(url,title,gridId){
	var window = new Ext.Window({
		id:'showWin',
		title:'<font size="3">'+title+'</font>',
		plain:true,
		modal:true,
		resizable : true,
		maximized :true,
		maximizable:true,
		layout: 'fit',
		autoScroll :true,
		closable:false,
		constrainHeader :true,
		contentEl : Ext.DomHelper.append(document.body, {
			tag : 'iframe',
			src : url,
			height : "100%",
			width : "100%"
			})
		,   				
		buttonAlign:'center',
		buttons:[{
			text:'返回',
			handler : function(btn) {  
			Ext.getCmp('showWin').close(); 
			}
		}],
		listeners: {  
            close:function(w){  
                //关键部分：关闭窗口前先还原,滚动条才不会消失  
                w.restore();  
            },  
            maximize:function(w){      
                //关键部分：最大化后需要将窗口重新定位，否则窗口会从最顶端开始最大 化    
                w.setPosition(document.body.scrollLeft,document.body.scrollTop);  
        	},
        	beforeclose:function(){
        		Ext.getCmp(gridId).getStore().reload();
        	} 
        }			
	});
	window.show();
}

/******************************死亡方法开始*********************************/
/**
 * 最大化窗口<script type="text/javascript" src="../js/common.js"></script>
 * @param ids 窗口id 
 * @param titles 窗口标题
 * @param url 路径
 * @param params 参数 id='5'&name='30'
 * @param listener 可个选事件 {'beforeclose':resscr }
 * @author YaoXueFeng
 */
function cw_window(ids,titles,url,params,listener){
		if(typeof(ids)!='undefined'&&ids!=''&&ids.length!=0){
		_ids =ids;
		}else{
		_ids="cw_window";
		}
		
		if(typeof(titles)!='undefined'&&titles!=''&&titles.length!=0){
		_titles =titles;
		}else{
		_titles="窗口";
		}
		
		if(typeof(url)!='undefined'&&url!=''&&url.length!=0){
		_url =url;
		}else{
		alert("请填写真确的url地址");
		}
		
		if(typeof(params)!='undefined'&&params!=''&&params.length!=0){
		if(_url.indexOf('?') ==-1){
		_url +='?'+params;
		}else{
		_url +='&'+params;
		}
		}
			
			dlg0Win=new Ext.Window({
 			id:_ids,
			title:_titles,
 			contentEl : Ext.DomHelper.append(document.body, {
			tag : 'iframe',
			src : _url,
			height : "100%",
			width : "100%"
			}),		 			
			plain:true,
			modal:true,
			buttonAlign:'center',
//			buttons:[{
//				text:'返回',
//				handler : function(btn) {  
//				Ext.getCmp(ids).close(); 
//				}
//			}],
			resizable : true,
			maximized :true,
			maximizable:true, 
			layout: 'fit',
			autoScroll :true,
			closable:true,
			constrainHeader :true,
			listeners:listener
			});
			
			dlg0Win.show(); 
			      			
		
}	
/******************************死亡方法结束*********************************/
/******************************肿瘤方法开始*********************************/
/**
 * 最大化窗口<script type="text/javascript" src="../js/common.js"></script>
 * @param ids 窗口id 
 * @param titles 窗口标题
 * @param url 路径
 * @param params 参数 id='5'&name='30'
 * @param listener 可个选事件 {'beforeclose':resscr }
 * @author YaoXueFeng
 */
function zl_window(ids,titles,url,params,listener){
		if(typeof(ids)!='undefined'&&ids!=''&&ids.length!=0){
		_ids =ids;
		}else{
		_ids="cw_window";
		}
		
		if(typeof(titles)!='undefined'&&titles!=''&&titles.length!=0){
		_titles =titles;
		}else{
		_titles="窗口";
		}
		
		if(typeof(url)!='undefined'&&url!=''&&url.length!=0){
		_url =url;
		}else{
		alert("请填写真确的url地址");
		}
		
		if(typeof(params)!='undefined'&&params!=''&&params.length!=0){
		if(_url.indexOf('?') ==-1){
		_url +='?'+params;
		}else{
		_url +='&'+params;
		}
		}
			
			dlg0Win=new Ext.Window({
 			id:_ids,
			title:_titles,
 			contentEl : Ext.DomHelper.append(document.body, {
			tag : 'iframe',
			src : _url,
			height : "100%",
			width : "100%"
			}),		 			
			plain:true,
			modal:true,
			buttonAlign:'center',
			buttons:[{
				text:'返回',
				handler : function(btn) {  
				Ext.getCmp(ids).close(); 
				}
			}],
			resizable : true,
			maximized :true,
			maximizable:true, 
			layout: 'fit',
			autoScroll :true,
			closable:true,
			constrainHeader :true,
			listeners:listener
			});
			
			dlg0Win.show(); 
			      			
		
}	
/******************************肿瘤方法结束*********************************/
/**************结核病 报表通用方法 start add 2013-5-27*****************/
function showJhbTab(url,title){
	var window = new Ext.Window({
		id:'showJhbWin',
		title:'<font size="3">'+title+'</font>',
		plain:true,
		modal:true,
		resizable : true,
		maximized :true,
		maximizable:true,
		layout: 'fit',
		autoScroll :true,
		closable:false,
		constrainHeader :true,
		contentEl : Ext.DomHelper.append(document.body, {
			tag : 'iframe',
			src : url,
			height : "80%",
			width : "100%"
			})
		,   				
		listeners: {  
            close:function(w){  
                //关键部分：关闭窗口前先还原,滚动条才不会消失  
                w.restore();  
            },  
            maximize:function(w){      
                //关键部分：最大化后需要将窗口重新定位，否则窗口会从最顶端开始最大 化    
                w.setPosition(document.body.scrollLeft,document.body.scrollTop);  
        	} 
        }			
	});
	window.show();
};
//新增,修改时 刷新页面
function showJhbTabRefresh(url,title,gridId){
	var window = new Ext.Window({
		id:'showJhbWin',
		title:'<font size="3">'+title+'</font>',
		plain:true,
		modal:true,
		resizable : true,
		maximized :true,
		maximizable:true,
		layout: 'fit',
		autoScroll :true,
		closable:false,
		constrainHeader :true,
		contentEl : Ext.DomHelper.append(document.body, {
			tag : 'iframe',
			src : url,
			height : "80%",
			width : "100%"
			})
		,   				
		
		listeners: {  
            close:function(w){  
                //关键部分：关闭窗口前先还原,滚动条才不会消失  
                w.restore();  
            },  
            maximize:function(w){      
                //关键部分：最大化后需要将窗口重新定位，否则窗口会从最顶端开始最大 化    
                w.setPosition(document.body.scrollLeft,document.body.scrollTop);  
        	},
        	beforeclose:function(){
        		Ext.getCmp(gridId).getStore().reload();
        	} 
        }			
	});
	window.show();
}

/**************结核病 end*****************/


/***************高血压验证证件号码************************/
if($){
	if($.fn.validatebox){
		$.extend($.fn.validatebox.defaults.rules, {   
			 idcard: {   
		         validator: function(value, param){ 
			 			 var flag= isCardID(value);   
			             return flag==true?true:false;
			  		//return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value); 
			  		//return idCard(value);
		         },   
		         message:'请输入正确的身份证号码'
		     }   
		 });
	}
}
var aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
function isCardID(sId){    
    var iSum=0 ;   
    var info="" ;   
    if(!/^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(sId)) return "你输入的身份证长度或格式错误";    
    sId=sId.replace(/x$/i,"a");    
    if(aCity[parseInt(sId.substr(0,2))]==null) return "你的身份证地区非法";    
    sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));    
    var d=new Date(sBirthday.replace(/-/g,"/")) ;   
    if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法";    
    for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;   
    if(iSum%11!=1) return "你输入的身份证号非法";    
    return true;//aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女")    
};    
  



var isDateTime = function (format, reObj) {
    format = format || 'yyyy-MM-dd';
    var input = this, o = {}, d = new Date();
    var f1 = format.split(/[^a-z]+/gi), f2 = input.split(/\D+/g), f3 = format.split(/[a-z]+/gi), f4 = input.split(/\d+/g);
    var len = f1.length, len1 = f3.length;
    if (len != f2.length || len1 != f4.length) return false;
    for (var i = 0; i < len1; i++) if (f3[i] != f4[i]) return false;
    for (var i = 0; i < len; i++) o[f1[i]] = f2[i];
    o.yyyy = s(o.yyyy, o.yy, d.getFullYear(), 9999, 4);
    o.MM = s(o.MM, o.M, d.getMonth() + 1, 12);
    o.dd = s(o.dd, o.d, d.getDate(), 31);
    o.hh = s(o.hh, o.h, d.getHours(), 24);
    o.mm = s(o.mm, o.m, d.getMinutes());
    o.ss = s(o.ss, o.s, d.getSeconds());
    o.ms = s(o.ms, o.ms, d.getMilliseconds(), 999, 3);
    if (o.yyyy + o.MM + o.dd + o.hh + o.mm + o.ss + o.ms < 0) return false;
    if (o.yyyy < 100) o.yyyy += (o.yyyy > 30 ? 1900 : 2000);
    d = new Date(o.yyyy, o.MM - 1, o.dd, o.hh, o.mm, o.ss, o.ms);
    var reVal = d.getFullYear() == o.yyyy && d.getMonth() + 1 == o.MM && d.getDate() == o.dd && d.getHours() == o.hh && d.getMinutes() == o.mm && d.getSeconds() == o.ss && d.getMilliseconds() == o.ms;
    return reVal && reObj ? d : reVal;
    function s(s1, s2, s3, s4, s5) {
        s4 = s4 || 60, s5 = s5 || 2;
        var reVal = s3;
        if (s1 != undefined && s1 != '' || !isNaN(s1)) reVal = s1 * 1;
        if (s2 != undefined && s2 != '' && !isNaN(s2)) reVal = s2 * 1;
        return (reVal == s1 && s1.length != s5 || reVal > s4) ? -10000 : reVal;
    }
};

//多选框勾选与字体改变颜色
function initCheckboxCommon(name,value){
	if(value==null||value==""||name==null||name==""){
		return;
	}
	var values=value.split(",");
	var valueMap={};
	for(var i=0;i<values.length;i++){
		valueMap[values[i]]=values[i];
	}
	$(":input[name="+name+"]").each(function(){
		var v=$(this).val();
		if(valueMap[v]==v){
			$(this).attr("checked",true);
			$(this).next().attr("color","#CC33CC");
		}
	});
}
//合并列
function xjymMergeCells(){
	var dg=$("#xjym");
	var arr =[{mergeFiled:"jcjzmc",premiseFiled:"premiseFiled"},    //合并列的field数组及对应前提条件filed（为空则直接内容合并）  
              {mergeFiled:"bz",premiseFiled:"premiseFiled"},  
              {mergeFiled:"jcffmc",premiseFiled:"premiseFiled"} 
             ];  
	mergeCells(dg,arr);
}
function xjxqMergeCells(){
	var dg=$("#xjxq");
	var arr =[{mergeFiled:"jcjzmc",premiseFiled:"premiseFiled"},    //合并列的field数组及对应前提条件filed（为空则直接内容合并）  
              {mergeFiled:"xh",premiseFiled:"premiseFiled"}
             ];  
	mergeCells(dg,arr);
}
function jcjzxjymMergeCells(){
	var dg=$("#jcjzxjym");
	var arr =[{mergeFiled:"jcjzmc",premiseFiled:"premiseFiled"},    //合并列的field数组及对应前提条件filed（为空则直接内容合并）  
              {mergeFiled:"xh",premiseFiled:"premiseFiled"},  
              {mergeFiled:"jcffmc",premiseFiled:"premiseFiled"} 
             ]; 
	mergeCells(dg,arr);
}
function xjxqxjcxxMergeCells(){
	var dg=$("#xjxqxjcxx");
	var arr =[{mergeFiled:"jcjzmc",premiseFiled:"premiseFiled"},    //合并列的field数组及对应前提条件filed（为空则直接内容合并）  
              {mergeFiled:"xh",premiseFiled:"premiseFiled"}
             ]; 
	mergeCells(dg,arr);
}
function mergeCells(dg,arr){  
    //var dg = $("#"+id);   //要合并的datagrid中的表格id  
    var rowCount = dg.datagrid("getRows").length;  
    var cellName;  
    var span;  
    var perValue = "";  
    var curValue = "";  
    var perCondition="";  
    var curCondition="";  
    var flag=true;  
    var condiName="";  
    var length = arr.length - 1;  
    for (i = length; i >= 0; i--) {  
        cellName = arr[i].mergeFiled;  
        condiName=arr[i].premiseFiled;  
        if(condiName!=null && condiName!=''){  
            flag=false;  
        }  
        perValue = "";  
        perCondition="";  
        span = 1;  
        for (row = 0; row <= rowCount; row++) {  
            if (row == rowCount) {  
                curValue = "";  
                curCondition="";  
            } else {  
                curValue = dg.datagrid("getRows")[row][cellName];  
                /* if(cellName=="ORGSTARTTIME"){//特殊处理这个时间字段 
                    curValue =formatDate(dg.datagrid("getRows")[row][cellName],""); 
                } */  
                if(!flag){  
                    curCondition=dg.datagrid("getRows")[row][condiName];  
                }  
            }  
            if (perValue == curValue&&(flag||perCondition==curCondition)) {  
                span += 1;  
            } else {  
                var index = row - span;  
                dg.datagrid('mergeCells', {  
                    index : index,  
                    field : cellName,  
                    rowspan : span,  
                    colspan : null  
                });  
                span = 1;  
                perValue = curValue;  
                if(!flag){  
                    perCondition=curCondition;  
                }  
            }  
        }  
    }  
} 
//腹泻病多选框勾选与字体改变颜色
function initFxbCheckbox(name,value){
	if(value==null||value==""||name==null||name==""){
		return;
	}
	var values=value.split(",");
	var valueMap={};
	for(var i=0;i<values.length;i++){
		valueMap[values[i]]=values[i];
	}
	$(":input[name="+name+"]").each(function(){
		var v=$(this).val();
		if(valueMap[v]==v){
			$(this).attr("checked",true);
			$(this).next().attr("color","#FF0000");
		}
	});
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
		valueField : 'code',
		textField : 'text',
		mode : 'remote',
		onSelect : function(record) {
			if (codeObj != null) {
				codeObj.val(record.code);
			}
			if (nameObj != null) {
				nameObj.val(record.text);
			}
		},onLoadSuccess:function(){
			var data = $(this).combobox('getData');
			var h = (data.length*19);
			if(h >122){	
				$(this).combo({panelHeight:122});  
			}else{
				$(this).combo({panelHeight:h}); 
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

/**
 * 必填校验
 */
function checkRequire(value, name, id){
	if(value == null || value == ""){
		if(name !=null && name !=""){
			$.messager.alert('提示','必须项目未输入，请输入'+name+'！');
			$("#"+id).focus();
		}
	 return false;
	}
    return true;
}

/**
 * 日期转换为字符串
 * @param date 待转换日期
 * @param type 转换日期格式： 1.yyyy-MM-dd hh:mm:ss 2.yyyy-MM-dd
 */
function dateToString(date,type){ 
	if(date == null){
		return "";
	}
    var year = date.getFullYear();  
    var month =(date.getMonth() + 1).toString();  
    var day = (date.getDate()).toString();  
    var hour = (date.getHours()).toString();  
    var minute = (date.getMinutes()).toString();  
    var second = (date.getSeconds()).toString();  
    if (month.length == 1) {  
        month = "0" + month;  
    }  
    if (day.length == 1) {  
        day = "0" + day;  
    }  
    if (hour.length == 1) {  
        hour = "0" + hour;  
    }  
    if (minute.length == 1) {  
        minute = "0" + minute;  
    }  
    if (second.length == 1) {  
        second = "0" + second;  
    }  
    var dateTime = year + "-" + month + "-" + day +" "+ hour +":"+minute+":"+second;
    if(type == '1'){
    	return dateTime; 
    }else if(type == '2'){
    	return dateTime.substr(0,10); 
    }
}  

/**
 * 添加水印
 */
function watermark(settings,left,top) {

    //默认设置
    var defaultSettings={
      watermark_txt:settings.watermark_txt,
      watermark_x:75,//水印起始位置x轴坐标
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
    var obj = document.getElementById("watermark");
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
    $(".datagrid").children('pre').remove();
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
	$(".datagrid").append(oTemp);
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

function isNull(param){
	if(param === null || param == undefined ||param == ''){
		return false;
	}else{
		return true;
	}
}