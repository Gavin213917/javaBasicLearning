// 屏蔽IE返回
history.forward();

//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
function banBackSpace(e){
    var ev = e || window.event;//获取event对象
    var obj = ev.target || ev.srcElement;//获取事件源

    var t = obj.type || obj.getAttribute('type');//获取事件源类型

    //获取作为判断条件的事件类型
    var vReadOnly = obj.getAttribute('readonly');
    var vEnabled = obj.getAttribute('enabled');
    //处理null值情况
    vReadOnly = (vReadOnly == null) ? false : vReadOnly;
    vEnabled = (vEnabled == null) ? true : vEnabled;

    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
    //并且readonly属性为true或enabled属性为false的，则退格键失效
    var flag1=(ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")
                && (vReadOnly==true || vEnabled!=true))?true:false;

    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
    var flag2=(ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea")
                ?true:false;

    //判断
    if(flag2){
        return false;
    }
    if(flag1){
        return false;
    }
}

//禁止后退键 作用于Firefox、Opera
document.onkeypress=banBackSpace;
//禁止后退键  作用于IE、Chrome
document.onkeydown=banBackSpace;

//半角数字
var HANKAKU_NUM = "0123456789";
//以下是输入校正，用于onkeyup方法中
var eventCode = ['8','37','39','46'];
Array.prototype.in_array = function(e)
{
	for(i=0;i<this.length && this[i]!=e;i++);
	return !(i==this.length);
}

//将手输的8位日期进行校验，格式化为yyyy-mm-dd
function dateVerify(obj){
    var objvalue = obj.value;
    var objstring;
	if(objvalue.length==8){
		objstring = objvalue.substring(0, 4)+"-"+ objvalue.substring(4, 6)+"-" +objvalue.substring(6, 8);
		var rule = /^(19[0-9][0-9]|2[0-9][0-9][0-9])(\-)(0[1-9]|1[0-2])(\-)(0[1-9]|[1-2][0-9]|3[0-1])$/;
		if(!rule.test(objstring)){
           return;
		}
		obj.value = objstring;
	}
}

//整数
function checkNum(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	obj.value = obj.value.replace(/[^\d]/g, '');
}

//根据长度校验日期
function checkDateByStrlength(objlength, objvalue) {
    var length = parseInt(objlength);// 对象字符长度
    if (length == 4) {// 1#年份
        if (!isNaN(objvalue) && objvalue.indexOf(" ") < 0) {
            return true;
        }
    } else if (length == 7) {// 2#年份-月份
        var objyear = objvalue.substring(0, 4);
        var obj_1 = objvalue.substring(4, 5);
        var objmonth = objvalue.substring(5, 7);
        if (!isNaN(objyear) && objyear.indexOf(" ") < 0) {
            if (obj_1 == '-') {
                if (!isNaN(objmonth) && objmonth.indexOf(" ") < 0
                        && objmonth <= 12 && objmonth > 0) {
                    return true;
                }
            }
        }
    } else if (length == 10) {// 3#年份-月份-日期
        var objyear = objvalue.substring(0, 4);// 对象年份
        var obj_1 = objvalue.substring(4, 5);// 对象的‘-’
        var objmonth = objvalue.substring(5, 7);// 对象的月份
        var obj_2 = objvalue.substring(7, 8);// 对象的‘-’
        var objdate = objvalue.substring(8, 10);// 对象的日期
        if (!isNaN(objyear) && objyear.indexOf(" ") < 0) {// 对象年份是整数
            if (obj_1 == '-' && obj_2 == '-') {
                if (!isNaN(objmonth) && objmonth.indexOf(" ") < 0
                        && objmonth <= 12 && objmonth > 0) {// 对象月份是整数并且不大于12
                    if (!isNaN(objdate)
                            && objdate.indexOf(" ")
                            && objdate <= (new Date(objyear, objmonth, 0)
                                    .getDate()) && objdate > 0) {// 对象日期是整数并且当月的最后一天
                        return true;
                    }
                }
            }
        }
    } else if(length == 5){ // #4时分模式HH:mm
    	var objhour = objvalue.substring(0, 2);// 时
    	var obj_1 = objvalue.substring(2, 3);// 对象的:
    	var objmin = objvalue.substring(3, 5); // 分
    	if(!isNaN(objhour) && !isNaN(objmin) && objvalue.indexOf(" ") < 0){ // 时分是整数
    		if(Number(objhour) < 24 && Number(objmin) < 60 && obj_1 == ":"){ // 合法时间
    			return true;
    		}
    	}
    }
    return false;
}

// obj1的日期不大于obj2的日期
function checkDateGT(obj1, obj2) {
    var obj1value = obj1.value;
    var obj2value = obj2.value;
    var obj1string = obj1value.substring(0, 4) + obj1value.substring(5, 7)
            + obj1value.substring(8, 10);
    var obj2string = obj2value.substring(0, 4) + obj2value.substring(5, 7)
            + obj2value.substring(8, 10);
    if (parseInt(obj1string) > parseInt(obj2string)) {
        return false;
    }
    return true;

}


function dateCompare(date1,date2){
	         date1 = date1.replace(/\-/gi,"/");
	         date2 = date2.replace(/\-/gi,"/");
	         var time1 = new Date(date1).getTime();
	         var time2 = new Date(date2).getTime();
	         if(time1 >= time2){
		         return true;
	         }else{
	             return false;
	         }
         }

//日期格式化
Date.prototype.Format = function(fmt)
        { //author: meizz
            var o = {
                "M+" : this.getMonth()+1,                 //月份
                "d+" : this.getDate(),                    //日
                "h+" : this.getHours(),                   //小时
                "m+" : this.getMinutes(),                 //分
                "s+" : this.getSeconds(),                 //秒
                "q+" : Math.floor((this.getMonth()+3)/3), //季度
                "S"  : this.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt))
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(var k in o)
                if(new RegExp("("+ k +")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                    return fmt;
         }



// 检查日期是否超出今天，允许 1#年份，2#年份-月份,3#年份-月份-日期 的3种日期形式。
// 传入参数为 日期对象 this;num指需要验证的哪种类型：1#年份，2#年份-月份,3#年份-月份-日期,num可为null及''等。
// 此方法主要用来限定目标日期的字符数字值不能大于今天的字符数字值，如2010-11-10的20101110<2010-11-12的20101112；
// 但2009-52-69则不能限定，不过输入日期结束、丢失焦点的时候会有检查输入日期是否合法的判定。如果通过空间输入也不会出现非法日期。
function checkdatenoaftertoday(obj, num) {
    var objvalue = obj.value;
    if (objvalue == null || objvalue == '') {
        return;
    }
    var temp = checkDate(objvalue, num);
    if (temp == 0) {
        alert("日期输入超出今天或者日期不合法");
        obj.value = '';
    }
}

// 检查带时间的日期是否超过今天
function checkdateafterToday(obj, num) {
	var objvalue = obj.value;
    if (objvalue == null || objvalue == '') {
        return;
    }
    objvalue = objvalue.substring(0, 10);
    var temp = checkDate(objvalue, num);
    if (temp == 0) {
        alert("日期输入超出今天或者日期不合法");
        obj.value = '';
    }
}

function checkDate(objvalue, num){
	var temp = 0;
    var objlength = parseInt(objvalue.length);
    var numint = parseInt(num);
    var today = new Date();
    var todayear = today.getYear();// 今天的年份
    var todaymonth = eval(today.getMonth() + 1);// 今天的月份
    var todaydate = today.getDate();// 今天的日期
    var todayhour = today.getHours(); // 现在的时、分、秒
    var todaymin = today.getMinutes();
    var todaysec = today.getSeconds();
    var todaymonthstring = "0" + String(todaymonth);
    if (todaymonth > 9) {
        todaymonthstring = String(todaymonth);
    }
    var todaydatestring = String(todaydate);
    if (todaydate < 10) {
        todaydatestring = "0" + String(todaydate);
    }
    var todahourstring = String(todayhour);
    if (todayhour < 10) {
    	todahourstring = "0" + String(todayhour);
    }
    var todayminstring = String(todaymin);
    if (todaymin < 10) {
    	todayminstring = "0" + String(todaymin);
    }
    var todaysecstring = String(todaysec);
    if (todaysec < 10) {
    	todaysecstring = "0" + String(todaysec);
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
            var objmonth = objvalue.substring(5, 7);// 对象的月份
            var objdate = objvalue.substring(8, 10);// 对象的日期
            if (parseInt(objyear + objmonth + objdate) <= parseInt(todayear
                    + todaymonthstring + todaydatestring)) {// 对象的数字组合不得到与今天的数字组合
                temp = 1;
            }
        }else {
            temp = 1;
        }
    } else if(num == 4){
    	if(objlength == 19){
    		var objyear = objvalue.substring(0, 4);// 对象年份
            var objmonth = objvalue.substring(5, 7);// 对象的月份
            var objdate = objvalue.substring(8, 10);// 对象的日期
            var objhour = objvalue.substring(11, 13); // 对象的小时
            var objmin = objvalue.substring(14, 16); // 对象的分钟
            var objsec = objvalue.substring(17, 19); // 对象的秒
            if (parseInt(objyear + objmonth + objdate + objhour + objmin + objsec) <= parseInt(todayear
                    + todaymonthstring + todaydatestring + todahourstring + todayminstring + todaysecstring)) {// 对象的数字组合不得到与今天的数字组合
                temp = 1;
            }
    	}else{
    		temp = 1;
    	}
    }else {
        if (objlength == 4) {
            if (parseInt(objvalue) <= todayear) {
                temp = 1;
            }
        } else if (objlength == 7) {
            var objyear = objvalue.substring(0, 4);// 对象年份
            var objmonth = objvalue.substring(5, 7);// 对象的月份
            if (parseInt(objyear + objmonth) <= parseInt(todayear
                    + todaymonthstring)) {
                temp = 1;
            }
        } else if (objlength == 10) {
            var objyear = objvalue.substring(0, 4);// 对象年份
            var objmonth = objvalue.substring(5, 7);// 对象的月份
            var objdate = objvalue.substring(8, 10);// 对象的日期
            if (parseInt(objyear + objmonth + objdate) <= parseInt(todayear
                    + todaymonthstring + todaydatestring)) {// 对象的数字组合不得到与今天的数字组合
                temp = 1;
            }
        } else {
            temp = 1;
        }
    }
    return temp;
}

// 必须入力检查
function checkRequire(obj, message) {
    if(obj == null || obj == ""){
        if (message != null && message != "") {
            alert(message);
        }
        return false;
    } else if (obj.value == null || obj.value == "") {
        if (message != null && message != "") {
            alert(message);
        }
        return false;
    }
    return true;
}

//校验身份证
function IsIdCard(numberTmp){
    //var number = trim(numberTmp).toLowerCase();
	var number = numberTmp.toLowerCase();
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
//死亡证编号校验规则 20YY-3-0000000
function checkSwbgkno(swbgkno,lx){
    if (swbgkno.length==14){
        var str_num=swbgkno.substring(0,2);
        //校验前四位年份
        var str_nf=swbgkno.substring(0,4);
        var str_1=swbgkno.substring(4,5);
        var str_bklx=swbgkno.substring(5,6);
        var str_2=swbgkno.substring(6,7);
        var str_sjs=swbgkno.substring(7);
        if(str_num=="20" && checkDateByStrlength(4,str_nf) && str_1=="-" && str_2=="-"  && !isNaN(str_sjs)){
            if(lx==str_bklx || str_bklx=='0'){
                return true;
            }else{
                return false;
            }
        }else{
            return false;
        }
    }
}
// 将15位身份证转化为18位身份证
function ChangeCardID(oldCardId){
	if(oldCardId.length != 15){
		return null;
	}else{
		var Ti = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
		var Tc = "10X98765432";
		var Result = oldCardId.substring(0,6) + '19' + oldCardId.substring(6);
		var S = 0;
		for(var i = 0;i < 17;i++){
			S += Number(Result.substring(i,i+1)) * Ti[i]
		}
		Result +=  Tc.charAt(S%11);
		if(Result.length == 18){
			return Result;
		}else{
			return null;
		}
	}
}

// 年月日检验函数
function CheckyyyyMMdd(dayString) {
    // 年月日检验函数
    var digit = "0123456789";
    datelist = new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    if (dayString.length != 8)
        return (false);
    for (i = 0; i < 8; i++) {
        if (digit.indexOf(dayString.charAt(i), 0) == -1)
            return (false);
    }
    year = dayString.substr(0, 4); // 截取年部分
    month = dayString.substr(4, 2); // 截取月部分
    date = dayString.substr(6, 2); // 截取日部分
    if (year > 2200 || year < 1900 || month > 12 || month < 1 || date > 31
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

//浮点小数
function checkFloat(obj) {
	var expression = /^\d+\.?\d*$/g;
	if (!expression.test(obj.value)) {
		obj.value = "";
	}
}

//保留begin到end位小数 例：checkDouble(obj,'1','2')保留1到2位小数
function checkDouble(obj,begin,end) {
	var str = "^([1-9]\\d*(\\.[0-9]{"+begin+","+end+"})?|0\\.[1-9][0-9]|0\\.0[1-9])$";
	var expression = new RegExp(str);
	if (!expression.test(obj.value)) {
		obj.value = "";
	}
}

//根据身份证取生日
function getBirthdayFromSFZ(val){
    var birthdayValue;
    // 15位身份证号码
    if(15==val.length){
        birthdayValue = val.charAt(6)+val.charAt(7);
        if(parseInt(birthdayValue)<10){
           birthdayValue = '20'+birthdayValue;
        }else{
           birthdayValue = '19'+birthdayValue;
        }
        birthdayValue=birthdayValue+'-'+val.charAt(8)+val.charAt(9)+'-'+val.charAt(10)+val.charAt(11);
    }
    // 18位身份证号码
    if(18==val.length){
        birthdayValue=val.charAt(6)+val.charAt(7)+val.charAt(8)+val.charAt(9)+'-'+val.charAt(10)+val.charAt(11)+'-'+val.charAt(12)+val.charAt(13);
    }
    return birthdayValue;
}

//根据身份证取性别
function getSexFromSFZ(val){
    var sexValue;
    if(15==val.length){// 15位身份证号码
        if(parseInt(val.charAt(14)/2)*2!=val.charAt(14)){
            sexValue=1;
        }else {
            sexValue=2;
        }
    }
    if(18==val.length){// 18位身份证号码
        if(parseInt(val.charAt(16)/2)*2!=val.charAt(16)) {
            sexValue=1;
        }else {
            sexValue=2;
        }
    }
    return sexValue;
}

//根据身份证设定性别
function setBirthdaySexFromSFZ(zjlx, zjhm, birthday, sex){
    if (checkRequire(zjhm,"")) {
        zjhm.value=zjhm.value.toUpperCase();
    }
    if (checkRequire(zjhm,"") && zjlx.value=="01" && IsIdCard(zjhm.value)) {
        birthday.value = getBirthdayFromSFZ(zjhm.value);
        sex.value = getSexFromSFZ(zjhm.value);
        var newCardId = ChangeCardID(zjhm.value);
        if(newCardId != null){ // 15位身份证自动转为18位
        	zjhm.value = newCardId;
        }
    }
}

//  半角数字check
function checkNumber( a_value ) {

  a_value = trimSpace(a_value);
  if ( !funIsLetter(a_value, HANKAKU_NUM) ) {
    return ( false );
  }
  return ( true );
}

//是否存在半角数字check
function checkExistNumber( a_value ) {

  a_value = trimSpace(a_value);
  if ( funIsExistLetter(a_value, HANKAKU_NUM) ) {
    return ( false );
  }
  return ( true );
}


//空格符号消去
function trimSpace(strInputData)
{
    var strStart;
    var strEnd;
    var bFlag = true;

    if (strInputData.length == 0)
        return strInputData;
    while(bFlag)
       {
        strStart = strInputData.substring(0, 1);
        strEnd = strInputData.substring(strInputData.length - 1);
        if (strStart == " ")
            strInputData = strInputData.substring(1, strInputData.length);
        else if(strEnd == " ")
            strInputData = strInputData.substring(0, strInputData.length - 1);
        else
            bFlag = false;
       }
    return strInputData;
}

//如果是数字与字母下划线，返回真，否则返回假
function isAlpha(str) {
	if(str==null)
	return ture;
	return (str.replace(/\w/g, "").length == 0);
}

// 检查是否包含汉字
function isInChinese(str) {
	if(str==null)
		return true;
	return (str.length != str.replace(/[^\x00-\xff]/g,"**").length);
}

//  文字check
function funIsLetter( a_strInData, a_strCheckLetters ) {
  var i;
  var strChar;

  for ( i = 0; i < a_strInData.length; i++ ) {
    strChar = a_strInData.substring( i, i + 1 );
    if ( a_strCheckLetters.indexOf( strChar, 0 ) == -1 ) {
      return ( false );
    }
  }
  return ( true );
}

//是否存在文字check
function funIsExistLetter( a_strInData, a_strCheckLetters ) {
  var i;
  var strChar;

  for ( i = 0; i < a_strInData.length; i++ ) {
    strChar = a_strInData.substring( i, i + 1 );
    if ( a_strCheckLetters.indexOf( strChar, 0 ) != -1 ) {
      return ( true );
    }
  }
  return ( false );
}

// 计算两个日期的间隔天数
function computation(sDate1, sDate2){   //sDate1和sDate2是2008-12-13格式
	var aDate, oDate1, oDate2, iDays
	aDate = sDate1.split("-")
	oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])   //转换为12-13-2008格式
	aDate = sDate2.split("-")
	oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
	iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24)   //把相差的毫秒数转换为天数
	return iDays
}

//返回字符串的字节长度
function checkLength(str){
	var i,sum=0;
	for(i=0;i<str.length;i++){
	if((str.charCodeAt(i)>=0) && (str.charCodeAt(i)<=255))
	sum=sum+1;
	else
	sum=sum+2;
	}
	return sum;
	}
//检查身份证日期与出生日期是否匹配
function checkZjhAndCsny(objZjhm,objCsny){
	if(objZjhm!=null&&objCsny!=null){
		if(getBirthdayFromSFZ(objZjhm.value)==objCsny.value){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}

}
//消息提示框，默认选中‘取消’
function ConfirmCancelDefault(msg){
	window.confirm = function(str){
        str=   str.replace(/\'/g,   "'&   chr(39)   &'").replace(/\r\n/g,   "'&   VBCrLf   &'");
        execScript("n   =   msgbox('"+   str   +"',   289,   '来自网页的消息')",   "vbscript");
        return(n   ==   1);
        }
        return window.confirm(msg);
}


//获取字符串的字节长度
function getByteLengthOfValue(value){
	  var len = value.replace(/[^\x00-\xff]/g, "**").length;
	  return len;
}
