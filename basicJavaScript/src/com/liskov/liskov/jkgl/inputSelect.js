/**
 * 使用方法 初始化2个input 一个用于显示下拉内容id='xxxLabel'
 * 一个用于保存对应的码值 id='xxx'
 *  	<input id="xxxLabel" type="text"  class="selectInput"/>
 *		<input id="xxx" type="hidden">
 * 显示的内容声明为一个全局变量
 * 名为：var xxxData = [{CODE:'001',NAME:'学生1'},{CODE:'002',NAME:'学生2'}]
 */

// 初始化操作var tmpContentKey = "";
var tmpContentValue = "";
var tmpContentKeyFinal = "";
var tmpContentValueFinal = "";

//处理单击和双击不冲突的函数handleWisely的变量
var dcTime = 400; // 点击间隔小于400ms为双击
var dcDelay = 100; // 双击后100ms的点击 视为单击
var dcEventTime = 0; // 当前触发双击的时间 的毫秒数
var savEvtTime = 0; // 当前触发单击的时间 的毫秒数
var savTO = null; // 保存 延迟发出的单击操作
var fireClickFunName = "onclickInput(target)";// 单击触发函数字符串 便于eval触发函数
var fireDblClickFunName = "ondblclickInput(target)";// 双击触发函数字符串 便于eval触发函数

// 给所有设置了class='selectInput'的input添加对象事件
var allInputSelect = document.getElementsByTagName('INPUT');
window.attachEvent('onload', initTheInputEvent);

// 初始化div
document.write("<div id='queryResult' style='position:absolute;display:none;background:#FFFFFF;border:1px solid #A6C8E4;overflow-x:hidden;z-index:1000;padding:6px;'></div>")

// 初始化对应input的事件
function initTheInputEvent() {
	for (var i = 0; i < allInputSelect.length; i++) {
		if (allInputSelect[i].className == 'selectInput') {
			// 设置样式
			if (allInputSelect[i].value == ""
					|| allInputSelect[i].value == null) {
				allInputSelect[i].style.color = '#666666';
				allInputSelect[i].value = '请输入';
			}
			// 添加事件
			allInputSelect[i].attachEvent('onfocus', constructFunc(
							allInputSelect[i], onfocusInputSelect));
			allInputSelect[i].attachEvent('onkeydown', constructFunc(
							allInputSelect[i], chooseResult));
			allInputSelect[i].attachEvent('onblur', constructFunc(
							allInputSelect[i], completeInput));
			allInputSelect[i].attachEvent('onclick', constructFunc(
							allInputSelect[i], handleWisely));
			allInputSelect[i].attachEvent('ondblclick',constructFunc(
							allInputSelect[i],handleWisely));
			allInputSelect[i].attachEvent('onpropertychange',constructFunc(
					allInputSelect[i],changePropertyInput));
		} else {
			try { // 判断动态变量是否定义
				if (typeof(eval(allInputSelect[i].id + "ParentId")) != 'undefined') {
					var tmpParentId = eval(allInputSelect[i].id
							+ "ParentId");
					document.getElementById(tmpParentId).attachEvent(
							'onpropertychange',
							constructFunc(allInputSelect[i],
									makeDefault));
				}
			} catch (e) { // 不做任何事
			}
		}
	}
}

//处理 单击 双击 共存的函数
function handleWisely(target) {
	var eventType  = window.event.type; // 事件 
	switch (eventType) {
		case "click" :
			var d = new Date();
			savEvtTime = d.getTime();//保存当前单击触发的时间 的毫秒数
			/* setTimeOut 延迟 dcTime毫秒 来执行单击操作 并且把操作保存到savTo中*/
			savTO = setTimeout(
				function(){
					if (savEvtTime - dcEventTime <= 0) {//如果单击时间 在 双击时间之前 不做任何操作
						return false;
					};
					eval(fireClickFunName);//触发单击事件
				}, dcTime);
			break;
		case "dblclick" :
			var d = new Date();
			dcEventTime = d.getTime();
			if (savTO != null) {
				savTO = null;
			}
			eval(fireDblClickFunName);//触发双击事件
			break;
		default :
	}
}

// 设置联动子菜单为默认值function makeDefault(target) {
	target.value = "";
	var childMenuLabel = document.getElementById(target.id + 'Label');
	childMenuLabel.value = "请输入";
	childMenuLabel.style.color = '#666666';
}

// 封装闭包函数 用于绑定事件
function constructFunc(args, handler) {// args要调用方法的参数 handler用调用的方法
	// 返回一个函数对象 闭包
	return function() {
		handler(args);
	}
}

// div渲染
function queryData(target, result) {
	// 重新定位按上下键选择的行数
	divTableChooseRow = -1;
	// 清空div
	document.getElementById('queryResult').innerHTML = "";
	// 处理
	var point = getElementPos(target);
	var resultDiv = document.getElementById("queryResult");
	if (resultDiv.style.display == 'none') {
		resultDiv.style.top = point.y + 17;
		resultDiv.style.left = point.x - 2;
		resultDiv.style.display = 'block';
	}
	var content = "<table width='100%' id='divTable'  cellpadding='0' cellspacing='0'  border='0'>";
	var divWidth = 0;
	for (var i = 0; i < result.length; i++) {
		tmpContentKey = "";
		tmpContentValue = "";
		if(result[i].NAME.length*12 + 30 > divWidth){
			divWidth = result[i].NAME.length*12 + 30;
		}
		content = content
				+ "<tr style='cursor: hand;background:\"#ffffff\"' "
				+ "onmouseover='javascript:changeHide(\""
				+ result[i].CODE + "\",\"" + result[i].NAME
				+ "\",this);' "
				+ "onmouseout='this.style.background=\"#ffffff\"' "
				+ "onclick='clickResult(\"" + result[i].CODE
				+ "\",\"" + result[i].NAME + "\",\"" + target.id
				+ "\")' >"
//				+ "<td name='td' style='padding: 2px;color:#404040;'>" + (i + 1) + "-</td>"
				+ "<td name='td' style='padding: 2px;color:#404040;'>" + "<input type='hidden' value='"
				+ result[i].CODE + "'/>" + result[i].NAME
				+ "</td></tr>";
	}
	resultDiv.style.width = divWidth;
	content = content + "</table>";
	resultDiv.innerHTML = content;
	// 如果结果为空 隐藏DIV
	if (result.length == 0) {
		resultDiv.style.display = 'none';
	}
}

// 点击结果div
function clickResult(key, value, id) {
	tmpContentKeyFinal = key;
	tmpContentValueFinal = value;
	document.getElementById(id).value = value;
	document.getElementById(id.substring(0, id.indexOf('Label'))).value = key;
	document.getElementById('queryResult').innerHTML = '';
	document.getElementById('queryResult').style.display = 'none';
}

// 完成输入后
function completeInput(target) {
	if (document.activeElement.name == 'td') {
		return false;
	}
	if (tmpContentKeyFinal != "" && tmpContentValueFinal != "") {
		target.value = tmpContentValueFinal;
		var valueInputName = target.id.substring(0, target.id.indexOf('Label'))
				+ "";
		if(document.getElementById(valueInputName).value != tmpContentKeyFinal){
			document.getElementById(valueInputName).value = tmpContentKeyFinal;
		}
//		var inputs = target.parentNode.getElementsByTagName("INPUT");
//		for (var i = 0; i < inputs.length; i++) {
//			if (inputs[i].id == valueInputName) {
//				inputs[i].value = tmpContentKeyFinal;
//			}
//		}
	} else {
		target.style.color = '#666666';
		target.value = '请输入';
		document.getElementById(target.id.substring(0, target.id
						.indexOf('Label'))).value = "";
	}
	document.getElementById('queryResult').innerHTML = '';
	document.getElementById('queryResult').style.display = 'none';
}

// 鼠标移上查询结果 给隐藏域赋值
function changeHide(key, value, target) {
	target.style.background = "#CCE7FF";
	tmpContentValue = value;
	tmpContentKey = key;
}

// 获取网页元素的绝对位置
// 说明：用 Javascript 获取指定页面元素的位置
function getElementPos(el) {
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
var divTableChooseRow = -1;
function chooseResult(target) {
	var table = document.getElementById("divTable");
	var divDisplay = (document.getElementById("queryResult").style.display != 'none');
	if (event.keyCode == 38 && divDisplay) {
		if (divTableChooseRow == -1) {
			table.rows[table.rows.length - 1].style.background = '#80C3FF';
			tmpContentKey = table.rows[table.rows.length - 1]
					.getElementsByTagName('INPUT')[0].value;
			tmpContentValue = table.rows[table.rows.length - 1].cells[1].innerText;
			divTableChooseRow = table.rows.length - 1;
		} else if (divTableChooseRow == 0) {
			table.rows[divTableChooseRow].style.background = '#ffffff';
			tmpContentKey = "";
			tmpContentValue = "";
			divTableChooseRow = -1;
		} else if (divTableChooseRow > 0) {
			table.rows[divTableChooseRow].style.background = '#ffffff';
			table.rows[divTableChooseRow - 1].style.background = '#80C3FF';
			tmpContentKey = table.rows[divTableChooseRow - 1]
					.getElementsByTagName('INPUT')[0].value;
			tmpContentValue = table.rows[divTableChooseRow - 1].cells[1].innerText;
			divTableChooseRow--;
		}
	}
	if (event.keyCode == 40 && divDisplay) {
		if (divTableChooseRow == table.rows.length - 1) {
			table.rows[divTableChooseRow].style.background = '#ffffff';
			tmpContentKey = "";
			tmpContentValue = "";
			divTableChooseRow = -1;
		} else if (divTableChooseRow == -1) {
			table.rows[divTableChooseRow + 1].style.background = '#80C3FF';
			tmpContentKey = table.rows[divTableChooseRow + 1]
					.getElementsByTagName('INPUT')[0].value;
			tmpContentValue = table.rows[divTableChooseRow + 1].cells[1].innerText;
			divTableChooseRow = 0;
		} else if (divTableChooseRow < table.rows.length) {
			table.rows[divTableChooseRow].style.background = '#ffffff';
			table.rows[divTableChooseRow + 1].style.background = '#80C3FF';
			tmpContentKey = table.rows[divTableChooseRow + 1]
					.getElementsByTagName('INPUT')[0].value;
			tmpContentValue = table.rows[divTableChooseRow + 1].cells[1].innerText;
			divTableChooseRow++;
		}
	}
	if (event.keyCode == 13) {
		var expression = /[\d]+/g;
		var filterNum = target.value.replace(/[^\d]+/g, '');
		if(document.getElementById('queryResult').style.display != 'none'){
			if (!expression.test(target.value)) {
				tmpContentValueFinal = tmpContentValue;
				tmpContentKeyFinal = tmpContentKey;
			} else {
				var indexnum = filterNum - 1;
				if (indexnum >= 0 && indexnum < table.rows.length) {
					tmpContentKeyFinal = table.rows[indexnum]
							.getElementsByTagName('INPUT')[0].value;
					tmpContentValueFinal = table.rows[indexnum].cells[1].innerText;
				} else {
					tmpContentKeyFinal = "";
					tmpContentValueFinal = "";
				}
			}
		}
		event.keyCode = 9;
	}
}

// 焦点到输入下拉框
function onfocusInputSelect(target) {
	// 初始化全局变量
	var targetHidden = document.getElementById(target.id.substring(0, target.id
					.indexOf('Label'))).value;
	if (targetHidden != "") {
		tmpContentKeyFinal = targetHidden;
		tmpContentValueFinal = target.value;
	} else {
		tmpContentKeyFinal = '';
		tmpContentValueFinal = '';
	}
	var tmpresult = eval(target.id.substring(0,target.id.indexOf('Label'))+"Data");
	// 操作
	target.style.color = '000000';
	if (target.value == '请输入') {
		target.value = '';
	}
	if (target.value == '') {
		queryData(target, tmpresult);
	} 
}

//改变输入框的属性
function changePropertyInput(target){
	if(target.value == ''){
		onfocusInputSelect(target);
	}
}

// 点击输入框后的事件function onclickInput(target) {
	onfocusInputSelect(target); 
}

// 双击输入框后的事件function ondblclickInput(target) {
	target.value = '';
	tmpContentKeyFinal = '';
	tmpContentValueFinal = '';
	var tmpresult = eval(target.id.substring(0,target.id.indexOf('Label'))+"Data");
	queryData(target, tmpresult);
}