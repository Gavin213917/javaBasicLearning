function checkbutton(value){
			if(value==1){
				document.getElementById("gwRowInfo").style.display='block';
				document.getElementById("gwRow").style.display='block';
			}else{
			    document.getElementById("gwRow").style.display='none';
				document.getElementById("gwRowInfo").style.display='none';
			}
		}
		 function test(val){
    			var objId = parseInt(val.id)+1
				var flag=val.value;
				var target = document.getElementById(""+objId);
				var url = "comboBoxTest!liandong.action";
				dataAjax = {
				'inputText' : flag
				}
				AjaxCall({
						url : url,
						data : dataAjax,
						context : target,
						recall:function(target,result){
							for(var j = objId;j<=5;j++){
							var obj=document.getElementById(""+j);
							obj.options.length=0;
							obj.options.add(new Option("请选择..."," "));}
								for(var i = 0;i<result.length;i++){
								var obj=document.getElementById(""+objId);
									 obj.options.add(new Option(result[i].cname,result[i].ccode));
									
									
								}
							}
						});
			
		
		}
		//高血压报卡 输入项验证函数
		
	/*var eventCode = ['8','37','39','46'];
Array.prototype.in_array = function(e)
{
	for(i=0;i<this.length && this[i]!=e;i++);
	return !(i==this.length);
}
	function checkNumber(obj) {
	if(eventCode.in_array(event.keyCode)){
		return;
	}
	obj.value = obj.value.replace(/[^\d]/g, '');
}*/
/*	function checkValue(val){
		bklx = document.getElementById("bklx");
		if(bklx.value == "03"){
	 	var obj1;
	 	var obj2;
	 		
	 		if(val.id == "ssy"){
	 			obj1 = val;
	 			obj2 = document.getElementById("szy");
	 		}else{
	 			obj1 = document.getElementById("ssy");
	 			obj2 = val;
	 		}
	 		if((obj1.value !=null&&obj1.value!="") && (obj2.value != null && obj2.value!="")){
	 			if(obj1.value >= 140 || obj2.value >= 90){
		 			var sfscxyyc = document.getElementsByName("gxybk.sfscxyyc");
				 			for(var i = 0 ;i < sfscxyyc.length;i++){
				 				sfscxyyc[i].disabled="";
				 			}
		 			var sfbcqzgxy = document.getElementsByName("gxybk.sfqrwgxy");
				 			for(var i = 0 ;i < sfbcqzgxy.length;i++){
				 				sfbcqzgxy[i].disabled="";
				 			}
		 		}
	 		}
	 		if((obj1.value !=null&&obj1.value!="") && (obj2.value != null && obj2.value!="")){
	 		if(obj1.value <140 && obj2.value < 90){
	 			var sfscxyyc = document.getElementsByName("gxybk.sfscxyyc");
	 			for(var i = 0 ;i < sfscxyyc.length;i++){
	 				sfscxyyc[i].checked = false;
	 				sfscxyyc[i].disabled="disabled"
	 			}
	 			var sfbcqzgxy = document.getElementsByName("gxybk.sfqrwgxy");
	 			for(var i = 0 ;i < sfbcqzgxy.length;i++){
	 				sfbcqzgxy[i].checked = false;
	 				sfbcqzgxy[i].disabled="disabled"
	 			}
	 		}else{
	 			var sfyjsgxy = document.getElementsByName("gxybk.sfyjsgxy");
	 			for(var i=0;i<sfyjsgxy.length;i++){
			        if(sfyjsgxy[i].checked == true){
			          var val = sfyjsgxy[i].value;
			          if(val == "1"){
			          	var sfscxyyc = document.getElementsByName("gxybk.sfscxyyc");
		 					for(var i = 0 ;i < sfscxyyc.length;i++){
		 						sfscxyyc[i].checked = false;
		 						sfscxyyc[i].disabled="disabled"
		 						
		 					}
		 				var sfbcqzgxy = document.getElementsByName("gxybk.sfqrwgxy");
	 						for(var i = 0 ;i < sfbcqzgxy.length;i++){
	 							sfbcqzgxy[i].checked = false;
	 							sfbcqzgxy[i].disabled="disabled"
	 							
	 						}	
			          }
		 			}
	 			}
	 		}
	 	}
	 }*/
//是否已经是高血压 控制函数		

//将手输的8位日期长度、格式进行校验，格式化为yyyy-mm-dd
function dateVerify(obj){
    var objvalue = obj.value;
    var objstring;
	if(objvalue.length==8){
		objstring = objvalue.substring(0, 4)+"-"+ objvalue.substring(4, 6)+"-" +objvalue.substring(6, 8);
		var rule = /^(19[0-9][0-9]|2[0-9][0-9][0-9])(\-)(0[1-9]|1[0-2])(\-)(0[1-9]|[1-2][0-9]|3[0-1])$/;
		if(!rule.test(objstring)){
			alert("日期格式不正确");
			obj.value = "";
           return;
		}
		obj.value = objstring;
		obj.focus();
	}else if(objvalue.length==10){
		var rule = /^(19[0-9][0-9]|2[0-9][0-9][0-9])(\-)(0[1-9]|1[0-2])(\-)(0[1-9]|[1-2][0-9]|3[0-1])$/;
		if(!rule.test(objstring)){
			alert("日期格式不正确");
			obj.value = "";
           return;
		}
	}else{
			alert("日期格式不正确");
			obj.value = "";
           return;
	}
}
function checkdatenoaftertoday(obj, num) {
	var objvalue = obj.value;
	if (objvalue == null || objvalue == '') {
		return;
	}
	var temp = 0;
	var objlength = parseInt(objvalue.length);
	var numint = parseInt(num);
	var today = new Date();
	var todayear = today.getYear();// 今天的年份
	var todaymonth = eval(today.getMonth() + 1);// 今天的月份
	var todaydate = today.getDate();// 今天的日期
	var todaymonthstring = "0" + String(todaymonth);
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
			var objmonth = objvalue.substring(5, 7);// 对象的月份
			var objdate = objvalue.substring(8, 10);// 对象的日期
			if (parseInt(objyear + objmonth + objdate) <= parseInt(todayear
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
	if (temp == 0) {
		alert("日期输入超出今天");
		obj.value = '';
		obj.foucs();
		return;
	}
}

//日期格式检验函数
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
    }
    return false;
}
/*
 *身份证校验函数
 *
 */
function IsIdCard(numberTmp){
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
//去空格
function trim(s){
		return s.replace(/\s+/g,"");
		//replace(/[ ]/g,""); //替换所有空格！
}
		
//检查身份证 日期部分函数
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