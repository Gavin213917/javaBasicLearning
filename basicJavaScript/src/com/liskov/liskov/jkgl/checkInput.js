//以下是输入校正，用于onkeyup方法中var eventCode = ['8','37','39','46'];
Array.prototype.in_array = function(e)
{
	for(i=0;i<this.length && this[i]!=e;i++);
	return !(i==this.length);
}
//浮点小数
function checkFloat(obj) {
	var expression = /^\d+\.?\d*$/g;
	if (!expression.test(obj.value)) {
		obj.value = "";
	}
}

// 整数
function checkNum(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	obj.value = obj.value.replace(/[^\d]/g, '');
}

// 姓名

function checkCharacter(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	obj.value = obj.value.replace(/[^\u4e00-\u9fa5a-zA-Z0-9_\.\-]/g, '');
}

// 年月
function checkClender(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	obj.value = obj.value.replace(/[^0-9]/g, '');
}

// 证件号码
function checkCardNum(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	obj.value = obj.value.replace(/[^0-9a-zA-Z]/g, '');
}

// 证件类型 只能1 2 3 4
function checkCardType(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	obj.value = obj.value.replace(/[^1-4]/g, '');
}

// 婚姻状况 只能1 2 3 4 9
function checkWedding(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	obj.value = obj.value.replace(/[^1-49]/g, '');
}

// 是否 选项
function checkYesOrNo(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	obj.value = obj.value.replace(/[^1-2]/g, '');
}

// 只能1 2 3 4 5
function checkOneToFive(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	obj.value = obj.value.replace(/[^1-5]/g, '');
}

// 只能1 2 3 4 5 6
function checkOneToSix(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	obj.value = obj.value.replace(/[^1-6]/g, '');
}

// 只能1 2 3
function checkOneToThree(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	obj.value = obj.value.replace(/[^1-3]/g, '');
}

// 只能1 2 3 4
function checkOneToFour(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	obj.value = obj.value.replace(/[^1-4]/g, '');
}

// 只能数字加,
function checkNumDot(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	obj.value = obj.value.replace(/[^0-9,]/g, '');
}

// 只能数字加,
function checkPhone(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	obj.value = obj.value.replace(/[^0-9-()]/g, '');
}
// 替换掉单、双引号
function checkquote(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	var reg = /[\'\"]/g;
	obj.value = obj.value.replace(reg, '');
}

function TabKeyEvent() {
	if (event.keyCode == 13) {
		event.keyCode = 9;
	}
}
// 检验obj对象的字符最大长度，适用范围较广，不过主要针对于类似textarea的没有maxlength属性的输入框。function checkmaxlength(obj, maxlength) {
	var objvalue = obj.value;
	var objlength = objvalue.length;
	var length = parseInt(maxlength);
	if (objlength > length) {
		alert("字符输入长度超出最大限度!");
		obj.value = objvalue.substring(0, length);
	}
}
// 禁止F5等效果的方法，用于body的onkeydown事件,注意一定是onkeydown事件而不是onkeyup事件。function forbiddenKeyCode() {
	if (((event.keyCode == 8) && // BackSpace
	((event.srcElement.type != "text" && event.srcElement.type != "textarea" && event.srcElement.type != "password") || event.srcElement.readOnly == true))
			|| ((event.ctrlKey) && ((event.keyCode == 78) || (event.keyCode == 82)))
			|| // CtrlN,CtrlR
			(event.keyCode == 116)) { // F5的keycode为116，ctrl的keycode为17。		event.keyCode = 0;
		event.returnValue = false;
	}
}

function CheckyyyyMMdd(dayString) {
	// 年月日检验函数	var digit = "0123456789";
	datelist = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	if (dayString.length != 8)
		return (false);
	for (i = 0; i < 8; i++) {
		if (digit.indexOf(dayString.charAt(i), 0) == -1)
			return (false);
	}
	year = dayString.substr(0, 4); // 截取年部分	month = dayString.substr(4, 2); // 截取月部分	date = dayString.substr(6, 2); // 截取日部分	if (year > 2200 || year < 1900 || month > 12 || month < 1 || date > 31
			|| date < 1)
		return (false);
	if (date > datelist[month - 1])
		return (false);

	yyyy = eval(year);
	if (month == "02") {
		if ((yyyy % 400) == 0) {
			if (date > 29)
				return (false);
		} else if ((yyyy % 4) == 0 && (yyyy % 100) != 0) {
			if (date > 29)
				return (false);
		} else {
			if (date > 28)
				return (false);
		}
	}
	return (true);
} // end function CheckyyyyMMdd

function CheckyyyyMMddHH(dayString) {
	// 年月日检验函数	var digit = "0123456789";
	datelist = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	if (dayString.length != 10)
		return (false);
	for (i = 0; i < 10; i++) {
		if (digit.indexOf(dayString.charAt(i), 0) == -1)
			return (false);
	}
	year = dayString.substr(0, 4); // 截取年部分	month = dayString.substr(4, 2); // 截取月部分	date = dayString.substr(6, 2); // 截取日部分	hour = dayString.substr(8, 2); // 截取小时部分
	if (year > 2200 || year < 1900 || month > 12 || month < 1 || date > 31
			|| date < 1 || hour > 23)
		return (false);
	if (date > datelist[month - 1])
		return (false);
	yyyy = eval(year);
	if (month == "02") {
		if ((yyyy % 400) == 0) {
			if (date > 29)
				return (false);
		} else if ((yyyy % 4) == 0 && (yyyy % 100) != 0) {
			if (date > 29)
				return (false);
		} else {
			if (date > 28)
				return (false);
		}
	}
	return (true);
} // end function CheckyyyyMMddHH

// 校验日期输入函数，格式如YYYY-MM-DD，不可大于今天的日期;并允许选择只输入年份、年份-月份、年份-月份-日期三种的任意一种，函数目的是校验输入内容合法。function CheckDateYYYY_MM_DD(obj, num) {
	// 参数obj指输入的日期字符的this对象，num指需要验证的哪种类型：1#年份，2#年份-月份,3#年份-月份-日期，提供num参数以实现函数大众化。	// num为空或null表示三种情况都允许，将num参数设为3则表示只允许一般的YYYY-MM-DD格式。	var objvalue = obj.value;
	if (objvalue == null || objvalue == '') {
		return;
	}
	var objlength = objvalue.length;
	var tempi = 0;// 标记位	if (num == 1 || num == '1') {
		if (objlength == 4 || objlength == '4') {// 1#年份
			tempi = checkDatebystrlength(objlength, objvalue);
		}
	} else if (num == 2 || num == '2') {
		if (objlength == 7 || objlength == '7') {// 2#年份-月份
			tempi = checkDatebystrlength(objlength, objvalue);
		}
	} else if (num == 3 || num == '3') {
		if (objlength == 10 || objlength == '10') {// 3#年份-月份-日期
			tempi = checkDatebystrlength(objlength, objvalue);
		}
	} else {
		tempi = checkDatebystrlength(objlength, objvalue);
	}
	if (tempi == 0) {
		alert("日期输入格式不合法，请重新输入！");
		obj.value = "";
		return;
	}
}
function checkDatebystrlength(objlength, objvalue) {
	var length = parseInt(objlength);// 对象字符长度
	var out = 0;// 返回结果的标记值	if (length == 4) {// 1#年份
		if (!isNaN(objvalue) && objvalue.indexOf(" ") < 0) {
			out = 1;
		}
	} else if (length == 7) {// 2#年份-月份
		var objyear = objvalue.substring(0, 4);
		var obj_1 = objvalue.substring(4, 5);
		var objmonth = objvalue.substring(5, 7);
		if (!isNaN(objyear) && objyear.indexOf(" ") < 0) {
			if (obj_1 == '-') {
				if (!isNaN(objmonth) && objmonth.indexOf(" ") < 0
						&& objmonth <= 12 && objmonth > 0) {
					out = 1;
				}
			}
		}
	} else if (length == 10) {// 3#年份-月份-日期
		var objyear = objvalue.substring(0, 4);// 对象年份
		var obj_1 = objvalue.substring(4, 5);// 对象的‘-’		var objmonth = objvalue.substring(5, 7);// 对象的月份		var obj_2 = objvalue.substring(7, 8);// 对象的‘-’		var objdate = objvalue.substring(8, 10);// 对象的日期		if (!isNaN(objyear) && objyear.indexOf(" ") < 0) {// 对象年份是整数			if (obj_1 == '-' && obj_2 == '-') {
				if (!isNaN(objmonth) && objmonth.indexOf(" ") < 0
						&& objmonth <= 12 && objmonth > 0) {// 对象月份是整数并且不大于12
					if (!isNaN(objdate)
							&& objdate.indexOf(" ")
							&& objdate <= (new Date(objyear, objmonth, 0)
									.getDate()) && objdate > 0) {// 对象日期是整数并且当月的最后一天						out = 1;// 符合要求，返回值改为1
					}
				}
			}
		}
	}
	return out;
}

// 检查日期是否超出今天，允许 1#年份，2#年份-月份,3#年份-月份-日期 的3种日期形式。// 传入参数为 日期对象 this;num指需要验证的哪种类型：1#年份，2#年份-月份,3#年份-月份-日期,num可为null及''等。// 此方法主要用来限定目标日期的字符数字值不能大于今天的字符数字值，如2010-11-10的20101110<2010-11-12的20101112；// 但2009-52-69则不能限定，不过输入日期结束、丢失焦点的时候会有检查输入日期是否合法的判定。如果通过空间输入也不会出现非法日期。function checkdatenoaftertoday(obj, num) {
	var objvalue = obj.value;
	if (objvalue == null || objvalue == '') {
		return;
	}
	var temp = 0;
	var objlength = parseInt(objvalue.length);
	var numint = parseInt(num);
	var today = new Date();
	var todayear = today.getYear();// 今天的年份	var todaymonth = eval(today.getMonth() + 1);// 今天的月份	var todaydate = today.getDate();// 今天的日期	var todaymonthstring = "0" + String(todaymonth);
	if (todaymonth > 9) {
		todaymonthstring = String(todaymonth);
	}
	var todaydatestring = String(todaydate);
	if (todaydate < 10) {
		todaydatestring = "0" + String(todaydate);
	}

	if (num == 1) {
		if (objlength == 4) {
			if (parseInt(objvalue) <= todayear) {
				temp = 1;
			}
		} else {
			temp = 1;
		}
	} else if (num == 2) {
		if (objlength == 7) {
			var objyear = objvalue.substring(0, 4);// 对象年份
			var objmonth = objvalue.substring(5, 7);// 对象的月份

			if (parseInt(objyear + objmonth) <= parseInt(todayear
					+ todaymonthstring)) {
				temp = 1;
			}
		} else {
			temp = 1;
		}
	} else if (num == 3) {
		if (objlength == 10) {
			var objyear = objvalue.substring(0, 4);// 对象年份
			var objmonth = objvalue.substring(5, 7);// 对象的月份			var objdate = objvalue.substring(8, 10);// 对象的日期			if (parseInt(objyear + objmonth + objdate) <= parseInt(todayear
					+ todaymonthstring + todaydatestring)) {// 对象的数字组合不得到与今天的数字组合
				temp = 1;
			}
		} else {
			temp = 1;
		}
	} else {
		if (objlength == 4) {
			if (parseInt(objvalue) <= todayear) {
				temp = 1;
			}
		} else if (objlength == 7) {
			var objyear = objvalue.substring(0, 4);// 对象年份
			var objmonth = objvalue.substring(5, 7);// 对象的月份			if (parseInt(objyear + objmonth) <= parseInt(todayear
					+ todaymonthstring)) {
				temp = 1;
			}
		} else if (objlength == 10) {
			var objyear = objvalue.substring(0, 4);// 对象年份
			var objmonth = objvalue.substring(5, 7);// 对象的月份			var objdate = objvalue.substring(8, 10);// 对象的日期			if (parseInt(objyear + objmonth + objdate) <= parseInt(todayear
					+ todaymonthstring + todaydatestring)) {// 对象的数字组合不得到与今天的数字组合
				temp = 1;
			}
		} else {
			temp = 1;
		}
	}
	if (temp == 0) {
		alert("日期输入超出今天或者日期不合法");
		obj.value = '';
	}
}
// obj1的日期不大于obj2的日期function checkdatesmallbig(obj1, obj2) {
//	checkdate(obj1);
//	checkdate(obj2);    dateVerify(obj1);    dateVerify(obj2);    
	var obj1value = obj1.value;
	var obj2value = obj2.value;	
	if (obj1value == "" || obj2value == "") {
		return;
	}
	var obj1string = obj1value.substring(0, 4) + obj1value.substring(5, 7)
			+ obj1value.substring(8, 10);
	var obj2string = obj2value.substring(0, 4) + obj2value.substring(5, 7)
			+ obj2value.substring(8, 10);
	if (parseInt(obj1string) > parseInt(obj2string)) {
		alert("左边日期不得大于右边日期，请重新输入两个日期！");
		obj1.value = "";
		obj2.value = "";
	}
}function dateVerify(obj){    var objvalue = obj.value;    var objstring;	if(objvalue.length==8){		objstring = objvalue.substring(0, 4)+"-"+ objvalue.substring(4, 6)+"-" +objvalue.substring(6, 8);		var rule = /^(19[0-9][0-9]|2[0-9][0-9][0-9])(\-)(0[1-9]|1[0-2])(\-)(0[1-9]|[1-2][0-9]|3[0-1])$/;		if(!rule.test(objstring)){		   alert("日期输入错误！");		   obj.value = "";           return;		}		obj.value = objstring;	}    }
function checkdate(obj) {
	var objvalue = obj.value;
	if (objvalue == "") {
		return;
	} else if (objvalue.length != 10) {
		alert("日期输入错误！");
		obj.value = "";
		return;
	}
}
//校验身份证function IsIdCard(numberTmp){
	var number = trim(numberTmp).toLowerCase();
	var date, Ai;
	var verify = "10x98765432";
	var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
	var area = ['','','','','','','','','','','','北京','天津','河北','山西','内蒙古','','','','','','辽宁','吉林','黑龙江','','','','','','','','上海','江苏','浙江','安微','福建','江西','山东','','','','河南','湖北','湖南','广东','广西','海南','','','','重庆','四川','贵州','云南','西藏','','','','','','','陕西','甘肃','青海','宁夏','新疆','','','','','','台湾','','','','','','','','','','香港','澳门','','','','','','','','','国外'];
	var re = number.match(/^(\d{2})\d{4}(((\d{2})(\d{2})(\d{2})(\d{3}))|((\d{4})(\d{2})(\d{2})(\d{3}[x\d])))$/i);
	if(re == null) return false;
	if(re[1] >= area.length || area[re[1]] == "") return false;
	if(re[2].length == 12){
		Ai = number.substr(0, 17);
		date = [re[9], re[10], re[11]].join("");
	}
	else{
		Ai = number.substr(0, 6) + "19" + number.substr(6);
		date = ["19" + re[4], re[5], re[6]].join("");
	}
	if(!CheckyyyyMMdd(date)) return false;
	var sum = 0;
	for(var i = 0;i<=16;i++){
		sum += Ai.charAt(i) * Wi[i];
	}
	Ai +=  verify.charAt(sum%11);
	return (number.length ==15 || number.length == 18 && number == Ai);
}

//去左空格;
function ltrim(s) {
	return s.replace(/^\s*/, "");
}

// 去右空格;
function rtrim(s) {
	return s.replace(/\s*$/, "");
}

// 左右空格;
function trim(s) {
	return rtrim(ltrim(s));
}