/** * * *
 * 非联动使用方法：
 * 
 * 页面：

 *	要在页面上写2个input
 *	①<input id="test1Label" type="text" class="selectInputAjax"/>
 *	②<input id="test1">
 *	③在本地的js中加入：
 *	   <script type="text/javascript">
 *	      var test1Url = 'getStreetSelect.action'   
 *	   </script>
 *	说明：

 *	    “①”是显示出来的input用于操作和放置地址名称
 *	    “②”是用于保存选中的地址代码
 *	    “①”和“②”的id命名规范必须是“xxxxLabel”和“xxxx”

 *	    “③”是一个本地js中的全局变量 命名规范是“xxxxUrl” 内容是后台查询Ajax action的URL。

 *	
 *	后台：

 *	    action的方法中：

 *	    response.setCharacterEncoding("UTF-8");
 *	    ①String inputText = new String(request.getParameter("inputText") .getBytes("ISO-8859-1"), "gb2312");
 *	    ②List streetList = this.createArchivesService.getStreetSelect(inputText);
 *	    ③JSONArray jsonArray = JSONArray.fromObject(streetList);
 *	     response.getWriter().write(jsonArray.toString());
 *	说明：

 *	    “①”是接受一个名为inputText的参数（控件实现的），是你在控件中输入的内容。//在此要编码转换

 *	    “②”根据输入的内容查找一个相应的List（List中每个元素必须是一个MAP 并且以{CODE：xxxx，VALUE：xxxx}的形式保存）
 *	        例如：

 *	            map.put("CODE", dicFolk.getDmxdmz());
 *	            map.put("NAME", dicFolk.getDmxmc());
 *     “③”转成json 传回前台
 * 
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * 
 * 
 * 使用方法 初始化2个input 
 * <input id="test1Label" type="text" class="selectInputAjax"/>
 * <input id="test1">
 * <input id="test2Label" type="text" class="selectInputAjax"/>
 * <input id="test2">
 * 显示的内容声明为一个全局变量
 * 名为：var test1Url = 'getStreetSelect.action';//对应test1的后台ajax获取的url var
 * test2Url = 'getVillagesSelect.action';//对应test2的后台ajax获取的url var
 * test2ParentId = 'test1';//设置联动 test2根据test1的值进行改变
 * 
 * ！！！注意：后台的程序需要接收2个参数 一个名为inputText 输入框中的值 一个名为parentCode 父菜单选择的项的值
 */

// 初始化操作

var tmpContentKeyAjax = "";//鼠标滑动到选项上 保存的结果

var tmpContentValueAjax = "";//鼠标滑动到选项上 保存的结果

var tmpContentKeyAjaxFinal = "";//选中 确定的结果

var tmpContentValueAjaxFinal = "";//选中 确定的结果

var targetId = "";//选中 确定结果 所对应的input的id

//处理【聚焦】和【单击】和【双击】不冲突的函数handleWiselyAjax的变量//2010-12-16加入的新功能
var focusIntervalTimeAjax = 100; // 聚焦 和 单击的 间隔小于100ms 响应单击事件
var clickIntervalTimeAjax = 400; // 点击间隔小于400ms 响应双击事件  
var dcEventTimeAjax = 0; // 当前触发双击的时间 的毫秒数
var cEventTimeAjax = 0; // 当前触发单击的时间 的毫秒数 
var fEventTimeAjax = 0; // 当前触发 聚焦的时间 的毫秒数
var saveDelayFocusOptAjax = null; // 保存 延迟发出的【聚焦】操作

var saveDelayClickOptAjax = null; // 保存 延迟发出的【单击】操作

var fireFocusFunNameAjax = "onfocusInputSelectAjax(target)";// 单击触发函数字符串 便于eval触发函数
var fireClickFunNameAjax = "onclickInputAjax(target)";// 单击触发函数字符串 便于eval触发函数
var fireDblClickFunNameAjax = "onDoubleClickInputAjax(target)";// 双击触发函数字符串 便于eval触发函数

//onpropertychange事件是否有效 解决初始化页面对父节点赋值导致子节点值 置空的问题

var onpropertychangeabled = false;

// 给所有设置了class='selectInputAjax'的input添加对象事件
var allInputSelectAjax = document.getElementsByTagName('INPUT');
window.attachEvent('onload', initTheInputEventAjax);

// 初始化div
document.write("<div id='queryResultAjax' style='position:absolute;display:none;background:#FFFFFF;border:1px solid #A6C8E4;overflow-x:hidden;z-index:1000;padding:6px;'></div>")

// 初始化对应input的事件

function initTheInputEventAjax() {
	for (var i = 0; i < allInputSelectAjax.length; i++) {
		if (allInputSelectAjax[i].className == 'selectInputAjax') {
			// 设置样式
			if (allInputSelectAjax[i].value == ""
					|| allInputSelectAjax[i].value == null) {
				allInputSelectAjax[i].style.color = '#666666';
				allInputSelectAjax[i].value = '请输入';
			}
			// 添加事件
			allInputSelectAjax[i].attachEvent('onfocus', constructFuncAjax(
							allInputSelectAjax[i], handleWiselyAjax));
			allInputSelectAjax[i].attachEvent('onkeydown', constructFuncAjax(
							allInputSelectAjax[i], chooseResultAjax));
			allInputSelectAjax[i].attachEvent('onblur', constructFuncAjax(
							allInputSelectAjax[i], completeInputAjax));
			allInputSelectAjax[i].attachEvent('onclick', constructFuncAjax(
							allInputSelectAjax[i], handleWiselyAjax));
			allInputSelectAjax[i].attachEvent('ondblclick',constructFuncAjax(
							allInputSelectAjax[i],handleWiselyAjax));
			allInputSelectAjax[i].attachEvent('onpropertychange',constructFuncAjax(
							allInputSelectAjax[i], onchangePropertyAjax));
		} else {
			try { // 判断动态变量是否定义

				if (typeof(eval(allInputSelectAjax[i].id + "ParentId")) != 'undefined') {//变量不存在会抛出异常
					var tmpParentId = eval(allInputSelectAjax[i].id
							+ "ParentId");
					document.getElementById(tmpParentId).attachEvent(
							'onpropertychange',
							constructFuncAjax(allInputSelectAjax[i],
									makeDefaultAjax));
				}
			} catch (e) { // 不做任何事
			}
		}
	}
}

//处理 聚焦 单击 双击 共存的函数

function handleWiselyAjax(target) {
	target.select();
	var eventType  = window.event.type; // 事件 
	switch (eventType) {
		case "focus" : 
			fEventTimeAjax = new Date().getTime();
			//进入等C状态

			saveDelayFocusOptAjax = setTimeout(
				function (){
					if(fEventTimeAjax - cEventTimeAjax <= 0){
						return false;
					};
					eval(fireFocusFunNameAjax);
				},focusIntervalTimeAjax);
			break;
		case "click" :
			cEventTimeAjax = new Date().getTime();
			if(saveDelayFocusOptAjax != null){
				saveDelayFocusOptAjax = null;
			}
			saveDelayClickOptAjax = setTimeout(
			function (){//F在前 从等C进入等D状态

				if (cEventTimeAjax - dcEventTimeAjax <= 0) {
					return false;
				};
				eval(fireClickFunNameAjax);
			}, clickIntervalTimeAjax);
			break;
		case "dblclick" :
			if (saveDelayClickOptAjax != null) {
				saveDelayClickOptAjax = null;
			}
			dcEventTimeAjax = new Date().getTime();
			eval(fireDblClickFunNameAjax);
			break;
		default :;
	}
}

// 设置联动子菜单为默认值
function makeDefaultAjax(target) {
	target.value = "";
	var childMenuLabel = document.getElementById(target.id + 'Label');
	if(childMenuLabel!=null){
	childMenuLabel.value = "请输入";
	childMenuLabel.style.color = '#666666';}
}

// 封装闭包函数 用于绑定事件
function constructFuncAjax(args, handler) {// args要调用方法的参数 handler用调用的方法
	// 返回一个函数对象 闭包
	return function() {
		handler(args);
	}
}

// 页面回车换单元格
function TabKeyEventAjax(target) {
	if (event.keyCode == 13) {
		event.keyCode = 9;
	}
}

// div渲染
function queryDataAjax(target, url, linkElementId) {
	// 重新定位按上下键选择的行数

	divTableChooseRowAjax = -1;
	// 清空div
	document.getElementById('queryResultAjax').innerHTML = "";
	// 处理
	var parentCode = "";
	var dataAjax = {
		'inputText' : target.value
	}
	if (linkElementId != null && linkElementId != "") {
		parentCode = document.getElementById(linkElementId).value;
		if (parentCode == '' || parentCode == null) {
			return;
		}
		dataAjax = {
			'inputText' : target.value,
			'parentCode' : parentCode
		}	
	}
	AjaxCall({
		url : url,
		data : dataAjax,
		context : target,
		recall : function(target, result) {
			if (result.length==null){return;}
			var point = getElementPosAjax(target);
			var resultDiv = document.getElementById("queryResultAjax");
			resultDiv.style.top = point.y + 17;
			resultDiv.style.left = point.x - 2;
			resultDiv.style.display = 'block';
			resultDiv.style.width = target.offsetWidth + 20;
			var content = "<table width='100%' id='divTableAjax'  cellpadding='0' cellspacing='0'  border='0'>";
			var divWidth = 0;
			for (var i = 0; i < result.length; i++) {
				tmpContentKeyAjax = "";
				tmpContentValueAjax = "";
				if(result[i].NAME.length*12 + 30 > divWidth){
					divWidth = result[i].NAME.length*12 + 30;
				}
				content = content
						+ "<tr style='cursor: hand;background:\"#ffffff\";'; "
						+ "onmouseover='javascript:changeHideAjax(\""
						+ result[i].CODE + "\",\"" + result[i].NAME
						+ "\",this);' "
						+ "onmouseout='this.style.background=\"#ffffff\"' "
						+ "onclick='clickResultAjax(\"" + result[i].CODE
						+ "\",\"" + result[i].NAME + "\",\"" + target.id
						+ "\");test(\"" + result[i].CODE+ "\")' >" + "<td name='td' style='padding: 2px;color:#404040;'></td>"
						+ "<td name='td' style='padding: 2px;color:#404040;'>" + "<input type='hidden' value='"
						+ result[i].CODE + "'/>" + result[i].NAME
						+ "</td></tr>";
			}
			resultDiv.style.width = divWidth;
			content = content + "</table>";
			resultDiv.innerHTML = content;
			// 如果已经选择好和查询结果 一样 隐藏DIV
//			if (result.length == 1) {
//				if (target.value == result[0].NAME) {
//					resultDiv.style.display = 'none';
//				}
//			}
			// 如果结果为空 隐藏DIV
			if (result.length == 0) {
				resultDiv.style.display = 'none';
			}
		}
	});
}

// 点击结果div
function clickResultAjax(key, value, id) {
	tmpContentKeyAjaxFinal = key;
	tmpContentValueAjaxFinal = value;
	targetId = id;
	var targetValue = document.getElementById(id).value;
	var targetKey = document.getElementById(id.substring(0, id.indexOf('Label'))).value;
	if(targetValue != value || targetKey != key){
		document.getElementById(id).value = value;
		document.getElementById(id.substring(0, id.indexOf('Label'))).value = key;
	}
	document.getElementById('queryResultAjax').innerHTML = '';
	document.getElementById('queryResultAjax').style.display = 'none';
}

// 完成输入后
function completeInputAjax(target) {
	onpropertychangeabled = false;//首先 设置onpropertychange事件无效
	if (document.activeElement.name == 'td') {//避免 click 和 onblur冲突 优先相应click 选取结果
		return false;
	}
	if (tmpContentKeyAjaxFinal != "" && tmpContentValueAjaxFinal != "" && target.id == targetId) {
		target.style.color = '#000000';
		target.value = tmpContentValueAjaxFinal;
		var valueInputName = target.id.substring(0, target.id.indexOf('Label'))
				+ "";
		if(document.getElementById(valueInputName).value != tmpContentKeyAjaxFinal){
			document.getElementById(valueInputName).value = tmpContentKeyAjaxFinal;
		}
	} else {
		target.style.color = '#666666';
		target.value = '请输入';
		document.getElementById(target.id.substring(0, target.id
						.indexOf('Label'))).value = "";
	}
	document.getElementById('queryResultAjax').innerHTML = '';
	document.getElementById('queryResultAjax').style.display = 'none';
}

// 鼠标移上查询结果 给隐藏域赋值
function changeHideAjax(key, value, target) {
	target.style.background = "#CCE7FF";
	tmpContentValueAjax = value;
	tmpContentKeyAjax = key;
}

// 获取网页元素的绝对位置

// 说明：用 Javascript 获取指定页面元素的位置

function getElementPosAjax(el) {
	var ua = navigator.userAgent.toLowerCase();
	var isOpera = (ua.indexOf('opera') != -1);
	var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
	if (el.parentNode === null || el.style.display == 'none') {
		return false;
	}
	var parent = null;
	var pos = [];
	var box;
	if (el.getBoundingClientRect) // IE
	{
		box = el.getBoundingClientRect();
		var scrollTop = Math.max(document.documentElement.scrollTop,
				document.body.scrollTop);
		var scrollLeft = Math.max(document.documentElement.scrollLeft,
				document.body.scrollLeft);
		return {
			x : box.left + scrollLeft,
			y : box.top + scrollTop
		};
	} else if (document.getBoxObjectFor) // gecko
	{
		box = document.getBoxObjectFor(el);
		var borderLeft = (el.style.borderLeftWidth)
				? parseInt(el.style.borderLeftWidth)
				: 0;
		var borderTop = (el.style.borderTopWidth)
				? parseInt(el.style.borderTopWidth)
				: 0;
		pos = [box.x - borderLeft, box.y - borderTop];
	} else // safari & opera
	{
		pos = [el.offsetLeft, el.offsetTop];
		parent = el.offsetParent;
		if (parent != el) {
			while (parent) {
				pos[0] += parent.offsetLeft;
				pos[1] += parent.offsetTop;
				parent = parent.offsetParent;
			}
		}
		if (ua.indexOf('opera') != -1
				|| (ua.indexOf('safari') != -1 && el.style.position == 'absolute')) {
			pos[0] -= document.body.offsetLeft;
			pos[1] -= document.body.offsetTop;
		}
	}
	if (el.parentNode) {
		parent = el.parentNode;
	} else {
		parent = null;
	}
	while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { // account
		// for
		// any
		// scrolled
		// ancestors
		pos[0] -= parent.scrollLeft;
		pos[1] -= parent.scrollTop;
		if (parent.parentNode) {
			parent = parent.parentNode;
		} else {
			parent = null;
		}
	}
	return {
		x : pos[0],
		y : pos[1]
	};
}

// 选择结果 键盘事件
var divTableChooseRowAjax = -1;
function chooseResultAjax(target) {
	var table = document.getElementById("divTableAjax");
	if (event.keyCode == 38) {//上建
		if(document.getElementById('queryResultAjax').style.display == 'none'){//如果结果div隐藏 不进行操作

			onchangePropertyAjax(target);//去后台查看 
			return;
		}
		if (divTableChooseRowAjax == -1) {
			table.rows[table.rows.length - 1].style.background = '#80C3FF';
			tmpContentKeyAjax = table.rows[table.rows.length - 1]
					.getElementsByTagName('INPUT')[0].value;
			tmpContentValueAjax = table.rows[table.rows.length - 1].cells[1].innerText;
			divTableChooseRowAjax = table.rows.length - 1;
		} else if (divTableChooseRowAjax == 0) {
			table.rows[divTableChooseRowAjax].style.background = '#ffffff';
			tmpContentKeyAjax = "";
			tmpContentValueAjax = "";
			divTableChooseRowAjax = -1;
		} else if (divTableChooseRowAjax > 0) {
			table.rows[divTableChooseRowAjax].style.background = '#ffffff';
			table.rows[divTableChooseRowAjax - 1].style.background = '#80C3FF';
			tmpContentKeyAjax = table.rows[divTableChooseRowAjax - 1]
					.getElementsByTagName('INPUT')[0].value;
			tmpContentValueAjax = table.rows[divTableChooseRowAjax - 1].cells[1].innerText;
			divTableChooseRowAjax--;
		}
	}
	if (event.keyCode == 40) {//下键
		if(document.getElementById('queryResultAjax').style.display == 'none'){//如果结果div隐藏 不进行操作

			onchangePropertyAjax(target);;//去后台查看

			return;
		}
		if (divTableChooseRowAjax == table.rows.length - 1) {
			table.rows[divTableChooseRowAjax].style.background = '#ffffff';
			tmpContentKeyAjax = "";
			tmpContentValueAjax = "";
			divTableChooseRowAjax = -1;
		} else if (divTableChooseRowAjax == -1) {
			table.rows[divTableChooseRowAjax + 1].style.background = '#80C3FF';
			tmpContentKeyAjax = table.rows[divTableChooseRowAjax + 1]
					.getElementsByTagName('INPUT')[0].value;
			tmpContentValueAjax = table.rows[divTableChooseRowAjax + 1].cells[1].innerText;
			divTableChooseRowAjax = 0;
		} else if (divTableChooseRowAjax < table.rows.length) {
			table.rows[divTableChooseRowAjax].style.background = '#ffffff';
			table.rows[divTableChooseRowAjax + 1].style.background = '#80C3FF';
			tmpContentKeyAjax = table.rows[divTableChooseRowAjax + 1]
					.getElementsByTagName('INPUT')[0].value;
			tmpContentValueAjax = table.rows[divTableChooseRowAjax + 1].cells[1].innerText;
			divTableChooseRowAjax++;
		}
	}
	if (event.keyCode == 13) {//回车键

		var expression = /[\d]+/g;
		var filterNum = target.value.replace(/[^\d]+/g, '');
		if(document.getElementById('queryResultAjax').style.display != 'none'){
			if(target.value == ""){
				tmpContentValueAjaxFinal = tmpContentValueAjax;
				tmpContentKeyAjaxFinal = tmpContentKeyAjax;
				targetId = target.id;
			}
			else if (!expression.test(target.value)) {
				tmpContentValueAjaxFinal = tmpContentValueAjax;
				tmpContentKeyAjaxFinal = tmpContentKeyAjax;
				targetId = target.id;
			} 
			else {
				var indexnum = filterNum - 1;
				if (indexnum >= 0 && indexnum < table.rows.length) {
					tmpContentKeyAjaxFinal = table.rows[indexnum]
							.getElementsByTagName('INPUT')[0].value;
					tmpContentValueAjaxFinal = table.rows[indexnum].cells[1].innerText;
					targetId = target.id;
				} else {
					tmpContentKeyAjaxFinal = "";
					tmpContentValueAjaxFinal = "";
					targetId = target.id;
				}
			}
		}
		event.keyCode = 9;
	}
}

// 焦点到输入下拉框
function onfocusInputSelectAjax(target) {
	if(!onpropertychangeabled){//设置onpropertychange事件有效
		onpropertychangeabled = true;
	}
	// 初始化全局变量
	var targetHidden = document.getElementById(target.id.substring(0, target.id
					.indexOf('Label'))).value;
	if (targetHidden != "") {
		tmpContentKeyAjaxFinal = targetHidden;
		tmpContentValueAjaxFinal = target.value;
		targetId = target.id;
	} else {
		tmpContentKeyAjaxFinal = '';
		tmpContentValueAjaxFinal = '';
		targetId = target.id;
	}
	// 操作
	if (target.value == '请输入') {
		target.style.color = '#000000';
		target.value = '';//自动触发onpropertychange事件
	}
}

// 更新输入下拉框的值后 触发的函数
function onchangePropertyAjax(target, tmpURL, tmpParentId) {
	if(!onpropertychangeabled){//onpropertychange无效 就不触发
		return;
	}
	if (target.value == '请输入') {
		document.getElementById('queryResultAjax').innerHTML = '';
		document.getElementById('queryResultAjax').style.display = 'none';
		return;
	}
	var expression = /[\d]+/g;//包含数字
	//if (expression.test(target.value.substring(0,1))) {
	//	return;
	//} else {
		if (tmpURL == null || tmpParentId == null) {
			tmpURL = eval(target.id.substring(0, target.id.indexOf('Label'))
					+ "Url");
			try {
				if (typeof(eval(target.id.substring(0, target.id
								.indexOf('Label'))
						+ "ParentId")) != 'undefined') {
					var tmpParentId = eval(target.id.substring(0, target.id
									.indexOf('Label'))
							+ "ParentId");
				}
			} catch (e) {
				var tmpParentId = null;
			}
		}
		queryDataAjax(target, tmpURL, tmpParentId);
	//}
}

// 点击输入框后的事件

function onclickInputAjax(target) {
	if(!onpropertychangeabled){//设置onpropertychange事件有效
		onpropertychangeabled = true;
	}
	// 初始化全局变量
	var targetHidden = document.getElementById(target.id.substring(0, target.id
					.indexOf('Label'))).value;
	if (targetHidden != "") {
		tmpContentKeyAjaxFinal = targetHidden;
		tmpContentValueAjaxFinal = target.value;
		targetId = target.id;
	} else {
		tmpContentKeyAjaxFinal = '';
		tmpContentValueAjaxFinal = '';
		targetId = target.id;
	} 
	if (target.value == '请输入') {
		target.style.color = '000000';
		target.value = '';//自动触发onpropertychange事件
	}else{
		onchangePropertyAjax(target);//去后台查看

	}
}

// 点击输入框后的事件
function onDoubleClickInputAjax(target) {
	if(!onpropertychangeabled){//设置onpropertychange事件有效
		onpropertychangeabled = true;
	}
	target.value = '';
	tmpContentKeyAjaxFinal = '';
	tmpContentValueAjaxFinal = '';
	targetId = target.id;
	var tmpURL = eval(target.id.substring(0, target.id.indexOf('Label'))
			+ "Url");
	try {
		if (typeof(eval(target.id.substring(0, target.id.indexOf('Label'))
				+ "ParentId")) != 'undefined') {
			var tmpParentId = eval(target.id.substring(0, target.id
							.indexOf('Label'))
					+ "ParentId");
		}
	} catch (e) {
		var tmpParentId = null;
	}
	queryDataAjax(target, tmpURL, tmpParentId);
}

function test(code) {
var flag=document.getElementById("flag").value;
		if(flag=="ture"){
	var val = document.getElementById("gbsy").value;
	if (val == code) {
		var target = document.getElementById("gbsy");
		var url = "getCCD.action";
		dataAjax = {
			'inputText' : code
		}
		AjaxCall({
			url : url,
			data : dataAjax,
			context : target,
			recall : function(target, result) {
				for ( var i = 0; i < result.length; i++) {
					var obj1 = document.getElementById("fltjbm");
					var obj2 = document.getElementById("fltjmc");
					obj1.value = result[i].CODE;
					obj2.value = result[i].NAME;
				}
			}
		});
	}
	}
}