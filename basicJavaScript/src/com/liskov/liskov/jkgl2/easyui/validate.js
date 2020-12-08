/** 
功能： 去除字符串两端的空格
参数： String str 字符串
返回： String 去除两端空格的字符串 
*/ 
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
 

/** 
功能： 判断输入值是否不为空
参数： Object obj 标签对象 boolean 是否先去除字符串两端的空格
返回： boolean 输入值是否不为空 
*/ 
function isNotBlank(obj,isSpaceFilter) { 
	if(isSpaceFilter) 
		obj.value = trim(obj.value); 
	return obj.value!="" 
}

 
/** 
功能： 判断输入值是否不为空（去除字符串两端的空格）
参数： Object obj 标签对象
返回： boolean 输入值是否不为空 
*/ 
function isNotBlankEx(obj) { 
	return isNotBlank(obj,true); 
} 


/** 
功能： 判断输入值是否为数值
参数： Object obj 标签对象
返回： boolean 输入值是否为数值 
*/ 
function isNumber(obj) { 
	obj.value = trim(obj.value); 
	return !isNaN(obj.value) 
}


/**
功能： 判断输入值是否为整数
参数： Object obj 标签对象
返回： boolean 输入值是否为整数 
*/ 
function isInteger(obj) { 
	if(!isNumber(obj)) 
		return false; 
	if(parseInt(obj.value,10)==parseFloat(obj.value)) 
		return true; 
	else 
		return false; 
} 


/** 
功能： 判断输入值是否在一区间内
参数： Object obj 标签对象 float nMin 左边界取值  boolean isContainMin 是否左边界为闭区间 float nMax 右边界取值 boolean isContainMax 是否右边界为闭区间
返回： boolean 输入值是否在一区间内 
*/ 
function isBetween(obj,nMin,isContainMin,nMax,isContainMax) { 
	if(!isNumber(obj)) 
		return false; 
	var result = parseFloat(obj.value); 
	var condition1 = (result>nMin && !isContainMin) || (result>=nMin && isContainMin); 
	var condition2 = (result<nMax && !isContainMax) || (result<=nMax && isContainMax);
	if(condition1 && condition2)
		return true; 
	else 
		return false; 
} 

/** 
功能： 判断输入值是否大于某一数值
参数： Object obj 标签对象 float nMin 左边界取值  boolean 左边界是否闭区间
返回： boolean 输入值是否小于某一数值 
*/ 
function isAbove(obj,nMin,isContainMin) { 
	var result = parseFloat(obj.value); 
	var condition = (result>nMin && !isContainMin) || (result>=nMin && isContainMin); 
	if(condition)
		return true;
	else
		return false;
} 


/** 
功能： 判断输入值是否大于某一数值（左边界为闭区间）
参数： Object obj 标签对象 float nMin 左边界取值
返回： boolean 输入值是否小于某一数值 
*/ 
function isAboveEx(obj,nMin) { 
	return isAbove(obj,nMin,true); 
} 


/** 
功能： 判断输入值长度是否在一闭区间内
参数： Object obj 标签对象 int nMin 长度左边界 int nMax 长度右边界
返回： boolean 输入值长度是否在一闭区间内 
*/ 
function isLengthBetween(obj,nMin,nMax) { 
	obj.value = trim(obj.value); 
	if(obj.value.length>=nMin && obj.value.length<=nMax) 
		return true; 
	else 
		return false; 
} 


/** 
功能： 判断输入值长度是否小于某一值
参数： Object obj 标签对象 int nMax 长度右边界
返回： boolean 输入值长度是否小于某一值 
*/ 
function isLengthBelow(obj,nMax) { 
	return isLengthBetween(obj,0,nMax); 
} 


/* 
功能： 判断输入值是否小于某一数值
参数： Object obj 标签对象 float nMax 右边界取值 boolean isContainMax 是否右边界为闭区间
返回： boolean 输入值是否小于某一数值 
*/ 
function isBelow(obj,nMax,isContainMax) { 
	if(!isNumber(obj)) 
		return false; 
	var result = parseFloat(obj.value); 
	if(result<nMax && !isContainMax || result<=nMax && isContainMax) 
		return true; 
	else 
		return false; 
} 


/* 
功能： 判断输入值是否小于某一数值（右边界为闭区间）
参数： Object obj 标签对象 float nMax 右边界取值 boolean isContainMax 是否右边界为闭区间
返回： boolean 输入值是否小于某一数值 
*/ 
function isBelowEx(obj,nMax) { 
	return isBelow(obj,nMax,true); 
} 


/* 
功能： 判断输入值是否为正数
参数： Object obj 标签对象 boolean isContainZero 是否允许零为合法
返回： boolean 输入值是否为正数 
*/ 
function isPositiveNumber(obj,isContainZero) { 
	return isAbove(obj,0,isContainZero); 
} 

/* 
功能： 判断输入值是否为正数（允许零为合法）
参数： Object obj 标签对象
返回： boolean 输入值是否为正数 
*/ 
function isPositiveNumberEx(obj) { 
	return isPositiveNumber(obj,true); 
} 


/* 
功能： 判断输入值是否为合法的日期类型（格式为yyyy?mm?dd其中年份必须为[1000,9999]）
参数:  Object obj 标签对象 String conjunction 为年月日的连接符（长度为1）
返回： boolean 输入值是否为合法的日期类型 
*/ 
function isStandardDate(obj,conjunction) { 
	obj.value = trim(obj.value); 
	if(obj.value=="") 
		return false; 
	if(obj.value.charAt(4)!=conjunction || obj.value.charAt(7)!=conjunction) 
		return false; 
	var year = obj.value.substring(0,4); 
	var month = obj.value.substring(5,7); 
	var day = obj.value.substring(8,10); 
	var condition1 = isNaN(year) || isNaN(month) || isNaN(day); 
	var condition2 = parseInt(year,10)!=parseFloat(year) || parseInt(month,10)!=parseFloat(month) || parseInt(day,10)!=parseFloat(day) 
	if(condition1 || condition2) 
		return false; 
	var d = new Date(); 
	d.setFullYear(parseInt(year,10)); 
	d.setMonth(parseInt(month,10)-1); 
	d.setDate(parseInt(day,10)); 
	year = d.getFullYear(); 
	month = d.getMonth()+1; 
	day = d.getDate(); 
	var temp = year+conjunction; 
	if(month<10) 
		temp+="0"; 
	temp+=month+conjunction; 
	if(day<10) 
		temp+="0"; 
	temp+=day; 
	if(obj.value==temp) 
		return true; 
	else 
		return false; 
} 


/* 
功能： 判断输入值是否为合法的日期类型（格式为yyyy?mm?dd hh:mm 其中年份必须为[1000,9999]）
参数:  Object obj 标签对象 String conjunction 为年月日的连接符（长度为1）
返回： boolean 输入值是否为合法的日期类型 
*/ 
function isStandardTime(obj,conjunction) { 
	obj.value = trim(obj.value); 
	if(obj.value=="") 
		return false; 
	if(obj.value.length != 16) 
		return false; 
	if(obj.value.charAt(4)!=conjunction || obj.value.charAt(7)!=conjunction || obj.value.charAt(10) != ' ' || obj.value.charAt(13) != ':') 
		return false; 
	
	var year = obj.value.substring(0,4); 
	var month = obj.value.substring(5,7); 
	var day = obj.value.substring(8,10);
	var hour = obj.value.substring(11,13);
	var mini = obj.value.substring(14,16);
	
	
	
	var condition1 = isNaN(year) || isNaN(month) || isNaN(day) || isNaN(hour) || isNaN(mini); 
	var condition2 = parseInt(year,10)!=parseFloat(year) || parseInt(month,10)!=parseFloat(month) || parseInt(day,10)!=parseFloat(day) || parseInt(hour,10)!=parseFloat(hour) || parseInt(mini,10)!=parseFloat(mini);
	if(condition1 || condition2) 
		return false; 
	
	var d = new Date(); 
	d.setFullYear(parseInt(year,10)); 
	d.setMonth(parseInt(month,10)-1); 
	d.setDate(parseInt(day,10)); 
	d.setHours(parseInt(hour,10));
	d.setMinutes(parseInt(mini,10))
	year = d.getFullYear(); 
	month = d.getMonth()+1; 
	day = d.getDate(); 
	hour = d.getHours();
	mini = d.getMinutes();
	var temp = year+conjunction; 
	if(month<10) 
		temp+="0"; 
	temp+=month+conjunction; 
	if(day<10) 
		temp+="0"; 
	temp+=day; 
	
	temp += ' ';
	if(hour<10) 
		temp+="0"; 
	
	temp += hour;
	
	temp += ':';
	
	if(mini<10) 
		temp+="0"; 
	
	temp += mini;
	
	if(obj.value==temp) 
		return true; 
	else 
		return false; 
} 


/* 
功能： 判断输入值是否为合法的日期类型（格式为yyyy?mm其中年份必须为[1000,9999]）
参数： Object obj 标签对象 String conjunction 为年月的连接符（长度为1）
返回： boolean 输入值是否为合法的日期类型 
*/ 
function isStandardYM(obj,conjunction) { 
	obj.value = trim(obj.value); 
	if(obj.value=="") 
		return false; 
	if(obj.value.charAt(4)!=conjunction) 
		return false; 
	var year = obj.value.substring(0,4); 
	var month = obj.value.substring(5,7); 
	var condition1 = isNaN(year) || isNaN(month); 
	var condition2 = parseInt(year,10)!=parseFloat(year) || parseInt(month,10)!=parseFloat(month) 
	if(condition1 || condition2) 
		return false; 
} 


/* 
功能：简单查询输入匡选择
参数：fname form名称 flag 1:清空value 0:不清空value 
返回：无备注：select contField的顺序和contValue顺序一致 
*/ 
function changesel(fname,flag){ 
	var i=0; 
	theform = eval(fname); 
	for(i;i < theform.condValue.length;i++){ 
		theform.condValue[i].style.display = "none"; 
		theform.condValue[i].disabled = true; 
	} 
	theform.condValue[theform.condField.selectedIndex].style.display = ""; 
	theform.condValue[theform.condField.selectedIndex].disabled = false; 
	if(flag==1) 
		theform.condValue[theform.condField.selectedIndex].value = ""; 
} 
	
	
//计算表单元素的实际位置 
function getIEPosX(elt) { 
	return getIEPos(elt,"Left"); 
} 

function getIEPosY(elt) { 
	return getIEPos(elt,"Top"); 
} 


function getIEPos(elt,which) { 
	var iPos = 0;
	while (elt!=null) { 
		iPos += elt["offset" + which];
		elt = elt.offsetParent;
	} 
	return iPos; 
} 


/*
功能： 在确认操作前弹出提示信息，以确认是否确定要执行操作。
参数： String msg 提示信息 String url 所要联结的地方或要递交的form名称 int urlType 0:url 1:form name 2:window.open url 
返回：无 
*/ 
function submitConfirm(msg,url,urlType){ 
	var agree = confirm(msg); 
	if(agree == true && urlType==0) 
		window.location = url; 
	if(agree == true && urlType==1) 
		eval(url).submit(); 
	if(agree == true && urlType==2) 
		window.open(url); 
} 

/* 
功能： 判断输入值长度是否为某一值
参数： Object obj 标签对象 int n 字符串必须长度
返回： boolean 输入值长度是否为某一值 
*/ 
function isLengthEqual(obj,n) { 
	return isLengthBetween(obj,n,n); 
}


function validDate(value) {
	if ($.trim(value) == "") {
		return true;
	}
	var obj = {};
	obj.value = value;
	if (!isStandardDate(obj, '-')) {
		return false;
	}
	var dateTime = Date.parse(value.replace(/-/g, "/"));
	var todayTime = new Date().getTime();
	if (dateTime > todayTime) {
		return false;
	}
	return true;
}


	
