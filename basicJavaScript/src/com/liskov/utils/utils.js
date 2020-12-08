	 //必填验证
	function checkRequire(obj, name){
		if(obj.value == null || obj.value == ""){
			if(name !=null && name !=""){
				mini.alert('必须项目未输入，请输入'+name+'！','提示',function(){
				   var scrollTo = $("#"+obj.id);
				   var top = scrollTo.offset().top - $('.mini-panel-body').offset().top + $('.mini-panel-body').scrollTop()-200;
				   $('.mini-panel-body').animate({scrollTop: top}, 800);
				   mini.get(obj.id).focus();
				});
			}
		 return false;
		}
	    return true;
	}
	
	//校验身份证
	function IsIdCard(numberTmp){
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
	
	// 计算两个日期的间隔天数   
	function computation(sDate1, sDate2){   //sDate1和sDate2是2008-12-13格式     
		var aDate, oDate1, oDate2, iDays;     
		aDate = sDate1.split("-");     
		oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);   //转换为12-13-2008格式     
		aDate = sDate2.split("-");     
		oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);     
		iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 /24);   //把相差的毫秒数转换为天数     
		return iDays;     
	}
	//计算两个日期相隔月数
	function getMonths(d1 , d2){
	    //用-分成数组
	    date1 = d1.split("-");
	    date2 = d2.split("-");
	    //获取年,月数
	    var year1 = parseInt(date1[0]) , 
	        month1 = parseInt(date1[1]) , 
	        year2 = parseInt(date2[0]) , 
	        month2 = parseInt(date2[1]) ,
	        //通过年,月差计算月份差
	        months = (year2 - year1) * 12 + (month2-month1);
	    if(year2 == year1){
	    	var days = computation(d1, d2);
	    	months = parseInt(days/30);
	    }
	    return months;    
	}
	
	 //非空校验
	function checkIsNull(id){
		if(mini.get(id).getValue() == null || mini.get(id).getValue() == ""){
			return true;
		}else{
			return false;
		}
	}
	//比较两个日期大小
	function dateCompare(date1,date2){
		date1=date1.replace(/\-/gi,"/");
		date2=date2.replace(/\-/gi,"/");
		var time1=new Date(date1).getTime();
		var time2=new Date(date2).getTime();
		if(time1 >time2){
			return true;
		}else{
			return false;
		}
	}
	
	function scrollById(id){
		 var scrollTo = $("#"+id);
		 var top = scrollTo.offset().top - $('.mini-panel-body').offset().top + $('.mini-panel-body').scrollTop()-170;
		 $('.mini-panel-body').animate({scrollTop: top}, 300);
	}
	
	//检验日期不能大于当前日期
	function dateBeforeToday(id,name){
	   var date = mini.get(id).getValue();
       var d = new Date(); 
       if (date != "" && date != null && date.getTime() > d.getTime()) {
 	      mini.alert(name+"不能大于当前日期，请重新输入！","提示",function(r) {
	          if (r == "ok" || r == "close") {
	        	  mini.get(id).setValue("");
	              mini.get(id).focus();
	          }
          });
       }
	}
	
	//检验地址是否存在废地址
	function existScrapAddress(id,name,scrapAddressUrl){
		var flag = false;
		var address = mini.get(id).getValue();
		if(address != null && address != ""){
			$.ajax({
		        url: scrapAddressUrl+address,
		        type: "get",
		        async: false,
		        success: function(data) {
		        	var resultObj = $.parseJSON(data);
		        	if(parseInt(resultObj) > 0){ //存在废地址
		        		mini.alert(name+"为已废弃地址，请重新输入！","提示",function(r) {
		        			if (r == "ok" || r == "close") {
		      	        	    mini.get(id).setValue("");
		      	                mini.get(id).focus();
		      	            }
		                });
		        		flag = true;
		        	}
		      	}
			});
		}
		return flag;
	}

     // 数字2位转换
     export function toDouble(num) {
         if (num < 10) {
             return '0' + num;
         } else {
             return num;
         }
     }
     // 数字位数，只获取整数位
     export function getNumBit(num) {
         let intNum = num.toFixed(0);
         return intNum.length;
     }
     // 动态加载js
     export function loadApi(src) {
         return new Promise((resolve, reject) => {
             const script = document.createElement('script');
             script.type = '';
             script.src = src;
             script.async = 'async';
             document.head.appendChild(script);

             script.onload = () => { resolve(); };
             script.onerror = () => { reject(); };
         });
     }
     // 动态加载css
     export function loadCss(src) {
         return new Promise((resolve, reject) => {
             const link = document.createElement('link');
             link.rel = 'stylesheet';
             link.href = src;
             document.head.appendChild(link);
         });
     }
     // 对象取值
     export function getVal(obj, path, returnedVal = '') {
         if (!path) return returnedVal;
         const pathArr = path.split('.');
         let current = obj;
         for (let i = 0, l = pathArr.length; i < l; i++) {
             if (!current) break;
             const prop = pathArr[i];
             current = current[prop];
         }
         if (current || current === 0) {
             return current;
         } else {
             return returnedVal;
         }
     }
     // 冒泡排序
     export function bubbleSort(arr) {
         let i = arr.length - 1;
         while (i > 0) {
             let maxIndex = 0;
             for (let j = 0; j < i; j++) {
                 if (arr[j] > arr[j + 1]) {
                     let temp = arr[j + 1];
                     arr[j + 1] = arr[j];
                     arr[j] = temp;
                     maxIndex = j;
                 }
             }
             i = maxIndex;
         }
         return arr;
     };
     // 通过属性值冒泡排序
     export function bubbleSortByProp(arr, prop) {
         let i = arr.length - 1;
         while (i > 0) {
             let maxIndex = 0;
             for (let j = 0; j < i; j++) {
                 if (arr[j][prop] > arr[j + 1][prop]) {
                     let temp = arr[j + 1];
                     arr[j + 1] = arr[j];
                     arr[j] = temp;
                     maxIndex = j;
                 }
             }
             i = maxIndex;
         }
         return arr;
     }
     // 按照属性值把数组分类
     export function arrClassifyByProp(arr, prop) {
         let result = {};
         arr.forEach(item => {
             const key = item[prop];
             if (result[key]) {
                 result[key].push(item);
             } else {
                 result[key] = [item];
             }
         });
         return result;
     }
     // 通过属性值查找数组某一项
     export function findArrItemByPropVal(arr, prop, val) {
         let result = null;
         for (let i = 0, l = arr.length; i < l; i++) {
             if (arr[i][prop] === val) {
                 result = arr[i];
                 break;
             }
         }
         return result;
     }
     // 获取指定月份天数
     export function getDateByMon(year, month){
         let d = new Date(year, month, 0);
         return d.getDate();
     }
     // 判断时间是不是今天
     export function isTodayDate(time) {
         if (time.toDateString() === new Date().toDateString()) {
             return true;
         } else {
             return false;
         }
     }
     // 对象判空
     export function isObjEmpty(obj) {
         if (obj && obj.constructor === Object) {
             return Object.keys(obj).length;
         }
         if (obj && obj.constructor === Array) {
             return obj.length;
         }
     }
     // 扁平化对象数组
     export function flatObjArr(obj) {
         let result = [];
         Object.keys(obj).forEach(key => {
             const list = obj[key];
             result = result.concat(list);
         });
         return result;
     }
     // 数组对象属性值转换映射对象 (参数 'a:b' [{a: c, b: d}] --> {c: d})
     export function arrPropValToMap(arr, format) {
         const pArr = format.split(':');
         const p1 = pArr[0];
         const p2 = pArr[1];
         let res = {};
         for (let i = 0, l = arr.length; i < l; i++) {
             let v1 = arr[i][p1];
             let v2 = arr[i][p2];
             result[v1] = result[v2];
         }
         return res;
     }
     // 首字母大写
     export const capitalizeFirstLetter = (string) => {
         return string.charAt(0).toUpperCase() + string.slice(1);
     };
     // 过滤值为空字符串或者为null的参数
     export function getQuery(query) {
         let res = {};
         for (let [key, val] of Object.entries(query)) {
             if (typeof val === 'string') {
                 if (!val.trim() || val === 'null') continue;
             } else {
                 if (val === null || val === undefined) continue;
             }
             res[key] = val;
         };
         return res;
     }

     export function isImage(fileName) {
         if (typeof fileName !== 'string') return;
         let name = fileName.toLowerCase();
         return name.endsWith('.png') || name.endsWith('.jpeg') || name.endsWith('.jpg') || name.endsWith('.png') || name.endsWith('.bmp');
     }

     export function isH5Video(fileName) {
         if (typeof fileName !== 'string') return;
         let name = fileName.toLowerCase();
         return name.endsWith('.mp4') || name.endsWith('.webm') || name.endsWith('.ogg');
     }
     export function isPdf(fileName) {
         if (typeof fileName !== 'string') return;
         let name = fileName.toLowerCase();
         return name.endsWith('.pdf');
     }

     export function isWord(fileName) {
         if (typeof fileName !== 'string') return;
         let name = fileName.toLowerCase();
         return name.endsWith('.doc') || name.endsWith('.docx');
     }

     export function isExcel(fileName) {
         if (typeof fileName !== 'string') return;
         let name = fileName.toLowerCase();
         return name.endsWith('.xlsx') || name.endsWith('.xls');
     }

     export const sStorage = {
         set(key, val) {
             let valStr = JSON.stringify(val);
             if (sessionStorage !== null) {
                 sessionStorage.setItem(key, valStr);
             }
         },
         get(key) {
             if (sessionStorage !== null) {
                 let valStr = sessionStorage.getItem(key);
                 return JSON.parse(valStr);
             } else {
                 return null;
             }
         },
         clear() {
             if (sessionStorage !== null) {
                 sessionStorage.clear();
             }
         }
     }

     export const lStorage = {
         set(key, val) {
             let valStr = JSON.stringify(val);
             if (localStorage !== null) {
                 localStorage.setItem(key, valStr);
             }
         },
         get(key) {
             if (localStorage !== null) {
                 let valStr = localStorage.getItem(key);
                 return JSON.parse(valStr);
             } else {
                 return null;
             }
         },
         clear() {
             if (localStorage !== null) {
                 localStorage.clear();
             }
         }
     };

     export function openFullScreen(dom) {
         let el = dom,
             rfs =
                 el.requestFullScreen ||
                 el.webkitRequestFullScreen ||
                 el.mozRequestFullScreen ||
                 el.msRequestFullScreen,
             wscript;

         if (typeof rfs !== "undefined" && rfs) {
             rfs.call(el);
             return;
         }

         if (typeof window.ActiveXObject !== "undefined") {
             wscript = new ActiveXObject("WScript.Shell");
             if (wscript) {
                 wscript.SendKeys("{F11}");
             }
         }
     }

     export function exitFullscreen() {
         if (document.exitFullscreen) {
             document.exitFullscreen();
         } else if (document.mozCancelFullScreen) {
             document.mozCancelFullScreen();
         } else if (document.webkitExitFullscreen) {
             document.webkitExitFullscreen();
         }
     }
