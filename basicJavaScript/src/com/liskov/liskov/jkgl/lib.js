/*
 * 获得Table中的第i行
 */
function getRowInTable(tbody,i){
	return tbody.rows[i];
}

/*
 * 计算两日期的差
 * @param date1 小日期
 * @param date2 大日期
 * return 包含两分量的数字数组,第一个分量为月差,第二分量为日差
 */
function computeMouthDateByCompare(date1,date2){ 
	date1 = new Date(date1);
	date2 = new Date(date2);
	var y1 = date1.getFullYear();
	var m1 = date1.getMonth()+1;
	var d1 = date1.getDate();
	var y2 = date2.getFullYear();
	var m2 = date2.getMonth()+1;
	var d2 = date2.getDate();
	var m = (y2-y1)*12+m2-m1;
	var d;
	if(d2 >= d1){
		d= d2-d1;
	}
	else{
		m = m-1;
		var preMounthLen = 31;
		if(m2 != 1){
			preMounthLen = getMonthLen(y2)[m2-2];
		}
		d = preMounthLen - d1+d2;
	}
	var result=[];
	result[0] = m;
	result[1] = d+1;
	return result;
}
/*
 * 删掉字符串前后的空格
 */
String.prototype.trim=function()
{
    return this.replace(/(^\s*)|(\s*$)/g,"");
}

/*
 * 获取字符串的长度(中文字符的长度为2)
 */
String.prototype.getLength=function()
{
	var arr=escape(this).match(/%u/g);	
	return arr ? arr.length+this.length:this.length;
}

/*
 * 将浮点数拆成整数部分和小数部分
 * 返回数组第一个分量为整数部分,第二分量为小数部分
 */
Number.prototype.split=function()
{
	var integer=this<0 ? Math.ceil(this):Math.floor(this);
	return [integer,Math.abs(this-integer)];
}

/*
 * 1.若无参数或dec为false则对数字进行四舍五入
 * 2.dec 指定小数位数(若以$开头,则该数字每三位加一逗号)
 */
Number.prototype.format=function(dec) 
{
	if (dec) 
	{
		var iC=dec.indexOf('$')==0;
		dec=iC ? (dec.length>1 ? Number(dec.substr(1)):2):Number(dec);
	}
	if (!dec)
		return Math.round(this);
	var b=this>=0;
	var s=(Math.round((b?this:-this)*Math.pow(10,dec))/Math.pow(10,dec)+Math.pow(10,-dec-1))+"";
	if(s.indexOf(".") == -1)
	{
		s = s+".001";
	}
	var r=(b?"":"-")+s.substr(0,s.indexOf(".")+dec+1);
	if (iC) 
	{
		var k = r.substr(0,1);
		if(k=='-' || k=='+')
		{
			r = r.substr(1);
		}
		var i=r.indexOf(".");
		var integer=r.substr(0,i);
		var tmp=r.substr(i);
		while (integer.length>3) 
		{
			tmp=","+integer.substr(integer.length-3)+tmp;
			integer=integer.substr(0,integer.length-3);
		}
		r=integer+tmp;
		
		if(k=='-' || k=='+')
			r=k+r;
	}
	return r;
}

/*
 * 判断字符串是否数字
 */
function isNumber(str) 
{
	var b = !isNaN(Number(str));
	if (b) 
		return true;
	else 
		return false;
}

var selected={};

function disableEvent() 
{
	return false;
}

/*
 * 屏蔽一些快捷键
 */
function checkonkeydown(){
	 if((event.keyCode == 8) && (event.srcElement.type != "text" && event.srcElement.type != "textarea" && event.srcElement.type != "password"))
     {//退格
     	event.keyCode=0;
     	event.returnValue=false;
     	
     }
     if((event.keyCode==116))//F5|| (event.ctrlKey && event.keyCode==82))
     {
     	event.keyCode=0;
     	event.returnValue=false;
     }
     if((event.ctrlKey && event.keyCode==82)) //Ctrl + R
     {
     	event.keyCode=0;
		event.returnValue=false;
	 }
     
     if ((event.ctrlKey)&&(event.keyCode==78))   //屏蔽 Ctrl+n
     {
     	event.keyCode=0;
     	event.returnValue=false;
     }
  	 if ((event.shiftKey)&&(event.keyCode==121)) //屏蔽 shift+F10
  	 {
  	 	event.keyCode=0;
     	event.returnValue=false;
     }
     	
     if((event.keyCode==112))//F1
     {
     	event.keyCode=0;
     	event.returnValue=false;
     }           
}

var doc=document;

//doc.onselectstart=disableEvent;
//doc.oncontextmenu=disableEvent;//鼠标右键
doc.onkeydown= checkonkeydown;

//function window.onhelp(){
//	return false;
//} 

/*
 * 显示模态对话框
 * @param url 请求的url
 * @param argument 带入对话框页面的参数
 * @param size 模态窗口尺寸
 * @param template 模版页面(用jsp/Dialog.html)
 */
function showDialog(url,argument,size,template) {
	var ex=150*(size ? Number(size):1);
	var feature="help:0;resizable:0;status:0;center:1;scrollbars:0;";
	feature+="dialogWidth:"+(300+ex)+"px;dialogHeight:"+(200+ex)+"px;";
	var argu={
		url:url,
		argument:argument,
		unitedInfo:typeof unitedInfo!="undefined" ? unitedInfo:null
	};
	return result=showModalDialog(template,argu,feature);
}

var regExps={
	date:[/Y+/,/M+/,/D+/,/h+/,/m+/,/s+/,/星期/,/week/],
	weekCN:["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
	weekEN:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
	tele:/((\([0-9]+\))(\-)[0-9]+)|([0-9]+(\-)[0-9]+)|((\([0-9]+\))[0-9]+)|([0-9]+)|((\([0-9]+\))(\-)([0-9]+)(\*)[0-9]+)|((\(\+[0-9]+\))(\-)([0-9]+)(\*)[0-9]+)|([0-9]+(\-)([0-9]+)(\*)([0-9]+))|((\+[0-9])+(\-)([0-9]+)(\*)([0-9]+))|((\([0-9]+\))([0-9]+)(\*)[0-9]+)|((\(\+[0-9]+\))([0-9]+)(\*)[0-9]+)|([0-9]+(\*)[0-9]+)/g,
	mobile:/[0-9]+/g,
	email:/[\w\-\.]+@(\w+[\.]{1})+\w+/g
}

/*
 * 对日期及时间字段执行掩码运算
 */
Date.prototype.doMask=function(mask)
{
	var str=[];
	var re=regExps.date;
	var _Y=re[0].exec(mask);
	var _M=re[1].exec(mask);
	var _D=re[2].exec(mask);
	var _h=re[3].exec(mask);
	var _m=re[4].exec(mask);
	var _s=re[5].exec(mask);
	var _wcn=re[6].exec(mask);
	var _wen=re[7].exec(mask);
	if (_Y)
		str[0]=(this.getFullYear()+"").substr(4-_Y.toString().length);
	if (_M){
		var monStr=this.getMonth()+1+"";
		str[1]=monStr.length<_M.toString().length ? "0"+monStr:monStr;
	}
	if (_D){
		var dayStr=this.getDate()+"";
		str[2]=dayStr.length<_D.toString().length ? "0"+dayStr:dayStr;
	}
	if (_h){
		var hourStr=this.getHours()+"";
		str[3]=hourStr.length<_h.toString().length ? "0"+hourStr:hourStr;
	}
	if (_m){
		var minStr=this.getMinutes()+"";
		str[4]=minStr.length<_m.toString().length ? "0"+minStr:minStr;
	}
	if (_s){
		var secStr=this.getSeconds()+"";
		str[5]=secStr.length<_s.toString().length ? "0"+secStr:secStr;
	}
	if (_wcn)
		str[6]=this.base.weekCN[this.getDay()];
	if (_wen)
		str[7]=this.base.weekEN[this.getDay()];
	for (var i in re)
		mask=mask.replace(re[i],str[i]);
	return mask;
}

var myImagesArr=[];

function preloadImages() 
{
	for (var i=0;i<arguments.length;i++) 
	{
		myImagesArr[i]=new Image;
		myImagesArr[i].src=arguments[i];
	}
}

/*
 * 将页面控件的样式设为错误样式(框架tag调用该方法)
 * @param p 页面控件
 * @param q 要显示的错误信息
 */
function doErrorStyle(p,q) {
	p.style.backgroundColor="#FF0000";
	p.style.color="#FFFFFF";
	p.title=q;
	alert(q);
}

/*
 * 将页面控件的样式设为正常样式(框架tag调用该方法)
 * @param p 页面控件
 */
function doNormalStyle(p) {
	if(p.dtype=='group'){
		var tbname = p.name+'_WrapTable';
		var tb = p.parentNode;
		while(tb.tagName !='TABLE' || tb.name !=tbname){
			tb = tb.parentNode;
		}
		tb.style.backgroundColor="#FFFFFF";
		tb.style.color="#000000";
		cursor="text";
		tb.title = '';
	}else{
		if (p.readOnly) {
			p.style.backgroundColor="#EEEEEE";
			p.style.color="#666666";
			cursor="default";
		} else {
			p.style.backgroundColor="#FFFFFF";
			p.style.color="#000000";
			cursor="text";
		}
		p.title="";
	}
}
/*
 * 将页面控件的样式设为Disable样式
 * @param p 页面控件
 */
function doDisableStyle(p){
	p.style.backgroundColor="#EEEEEE";
	p.style.color="#666666";
	cursor="default";
}

/*
 * 检测是否闰年(框架tag调用该方法)
 * @param p 待检测的年
 * @return 该年2月的实际天数
 */
function checkLeapYear(p) 
{
	return ((p%4==0 && p%100 != 0) || p%400==0) ? 29:28;
}

/*
 * 获取各月的日数(框架tag调用该方法)
 * @param p 待获取月的年
 * @return 长度为12的数组(其中每一分量为该月的日数) 
 */
function getMonthLen(p) 
{
	return [31,checkLeapYear(p),31,30,31,30,31,31,30,31,30,31];
}

/*
 * 转换日期字符串(框架tag调用该方法)
 */
function refixDate(p,toMax)
{
	var r=p.trim().replace(/[\-\.]/g,"/");
	var i=r.indexOf(" ");
	var arr;
	var time;
	if (i==-1) {
		arr=r.split("/");
		time="00:00:00";
	}
	else{
		arr=r.substr(0,i).split("/");
		time=r.substr(i+1);
	}
	var y=arr[0];
	var m=arr[1];
	var d;
	if (toMax)
		d=getMonthLen(y)[m-1];
	else{
		d=arr[2];
	}
	return y+"/"+m+"/"+d+" "+time;
}

/*
 * 按传入的字段名,获取该字段的值(框架tag调用该方法)
 * @param p F(字段名)
 * @param doc document
 * @return 该字段的值,若该值有错误则返回NaN
 */
function calc(p,row) {
	var reg=/F\([\w\.]+\)/g;
	var flds=p.match(reg),j,fld,type;
	for (var i=0;i<flds.length;i++) {
		j=flds[i];
		fld=document.getElementsByName(j.substring(2,j.length-1))[row];
		if(fld.dtype != null && fld.dtype !=''){
			type=fld.dtype.substr(0,1);
			switch (type) {
				case "d":
					var v = fld.realValue;
					v = v.replace(/-/g,'/');
					p=p.replace(j,fld.title ? "NaN":new Date(refixDate(v)));
					break;
				default:
					p=p.replace(j,fld.title ? "NaN":fld.realValue);
			}
		}else{
			p = fld.realValue;
		}	
		return p;
	}
}

/*
 * 对field进行校验,如有错误则设置error style(框架tag调用该方法)
 */
function disposeField(p) {
	var ps = document.getElementsByName(p.name);
	var rowIndex = 0;
	if(ps != null && ps.length>0){
		for(x=0;x<ps.length;x++){
			if(ps[x] == p){
				rowIndex = x;
				break;
			}	
		}
	}
	var value=p.value;
	p.inputValue=value;
	value=value.trim();
	p.value=value;
	if (value) {
		var dtype=p.dtype,type=dtype.substr(0,1),par=dtype.substring(2,dtype.length-1);
		switch (type) {
			case "i":
			case "f":
			case "c":
			case "p":
				switch (type) {
					case "c":
						var v=Number(value.replace(/\,/g,""));
						break;
					case "p":
						var v=Number(value.replace(/%/g,""));
						break;
					default:
						if(value.indexOf('e')>=0 || value.indexOf('E')>=0)
							return doErrorStyle(p,"错误：包含非法字符");
						var v=Number(value);
				}
				if (isNaN(v))
					return doErrorStyle(p,"错误：包含非法字符");
				var arr=par.split(","),mask=arr[0],arr2=arr[2];
				var len=type=="i" ? Number(mask):Math.floor(mask);
				var min=arr[1] || 0;
				if (!arr2 || arr2=="null") {
					var seq=mask.indexOf(".");
					if (seq!=-1)
						var max=Number(Math.pow(10,mask.substr(0,seq))-1) + "." + (Math.pow(10,mask.substr(seq+1))-1);
					else
						var max=Number(Math.pow(10,mask)-1);
				} else
					var max=arr2.indexOf("F")!=-1 ? calc(max,rowIndex):Number(arr2);
				if (min!="null") {
					min=isNaN(min) && min.indexOf("F")!=-1 ? calc(min,rowIndex):Number(min);
					if (v<min)
						return doErrorStyle(p,"错误：超出数值边界（最小值："+min+"）");
				}
				if (v>max)
					return doErrorStyle(p,"错误：超出数值边界（最大值："+max+"）");
				switch (type) {
					case "i":
						v=Math.round(v);
						p.showValue=v;
						break;
					case "f":
						var pt=mask.indexOf('.');
						var dem=pt!=-1 ? mask.substr(pt+1):'';
						v=Number(v).format(dem,false);
						p.showValue=v;
						break;
					case "c":
						var pt=mask.indexOf('.');
						var dem=pt!=-1 ? mask.substr(pt+1):'';
						v=Number(v).format(dem,false);
						p.showValue=Number(v).format("$"+dem);
						break;
					case "p":
						var pt=mask.indexOf('.');
						var dem=pt!=-1 ? mask.substr(pt+1):'';
						v=Number(v).format(dem,false);
						p.showValue=v+"%";
						break;
				}
				break;
			case "n":
				if ((/[^ \+\(\)\-\*,;0-9]/g).test(value)) 
				{
					return doErrorStyle(p,"错误：包含非法字符");
				}
				var v = value;
				if (value.length>Number(par)) 
					return doErrorStyle(p,"错误：超出长度（"+par+"）限制");
				p.realValue=value;
				p.showValue=value;
				break;
			case "m":
				if ((/[^ ,;0-9]/g).test(value)) 
					return doErrorStyle(p,"错误：包含非法字符");
				var va=value.match(regExps.mobile);
				if (!va)
					return doErrorStyle(p,"错误：未包含有效内容");
				var v=va.toString();
				if (v.length>Number(par)) 
					return doErrorStyle(p,"错误：超出长度（"+par+"）限制");
				p.realValue=v;
				p.showValue=v;
				break;
			case "z":
				if (value.indexOf('.')>=0) 
					return doErrorStyle(p,"错误：包含非法字符");
				if (value.indexOf('+')>=0) 
					return doErrorStyle(p,"错误：包含非法字符");
				if (value.indexOf('-')>=0) 
					return doErrorStyle(p,"错误：包含非法字符");
				if (isNaN(value)) 
					return doErrorStyle(p,"错误：包含非法字符");
				var v=value;
				if (v.length>6) 
					return doErrorStyle(p,"错误：超出长度（6）限制");
				var len=6-v.toString().length;
				while (len>0) {
					v+="0";
					len--;
				}
				p.realValue=v;
				p.showValue=v;
				break;
			case "a":
				if (isNaN(value) || value.indexOf(".")!=-1)
					return doErrorStyle(p,"错误：包含非法字符");
				if (value.length!=15 && value.length!=18)
					return doErrorStyle(p,"错误：身份证填写不正确");
				p.realValue=value;
				p.showValue=value;
				break;
			case "e":
				var arr=value.match(regExps.email);
				if (!arr)
					return doErrorStyle(p,"错误：E-mail格式不正确");
				var v=arr.toString();
				if(v.length>Number(par))
					return doErrorStyle(p,"错误：超出长度（"+par+"）限制");
				p.realValue=v;
				p.showValue=v;
				break;
			case "v":
				var lowerValue = value.toLowerCase();
				if(lowerValue.indexOf('script')>=0){
					return doErrorStyle(p,"错误：包含非法字符");
				}
				if(lowerValue.indexOf('<!--')>=0){
					return doErrorStyle(p,"错误：包含非法字符");
				}
				if(lowerValue.indexOf('-->')>=0){
					return doErrorStyle(p,"错误：包含非法字符");
				}
				if(lowerValue.indexOf('//')>=0){
					return doErrorStyle(p,"错误：包含非法字符");
				}
				if(lowerValue.indexOf('/*')>=0){
					return doErrorStyle(p,"错误：包含非法字符");
				}
				if(lowerValue.indexOf('*/')>=0){
					return doErrorStyle(p,"错误：包含非法字符");
				}
				if(lowerValue.indexOf('*')>=0){
					return doErrorStyle(p,"错误：包含非法字符");
				}
				if(lowerValue.indexOf('%')>=0){
					return doErrorStyle(p,"错误：包含非法字符");
				}
				if(lowerValue.indexOf('@')>=0){
					return doErrorStyle(p,"错误：包含非法字符");
				}
				if(lowerValue.indexOf('^')>=0){
					return doErrorStyle(p,"错误：包含非法字符");
				}
				if(lowerValue.indexOf('{')>=0){
					return doErrorStyle(p,"错误：包含非法字符");
				}
				if(lowerValue.indexOf('}')>=0){
					return doErrorStyle(p,"错误：包含非法字符");
				}
				if(lowerValue.indexOf('|')>=0){
					return doErrorStyle(p,"错误：包含非法字符");
				}
				value = filterEncoder(value);
				var i=par.indexOf(','),re,min,max;
				if (i!=-1){
					var arr = par.split(',');
					min = arr[0];
					max = arr[1];
					if(arr.length == 3)
						re=new RegExp(arr[2],"g");
				}else
					max = par;
				if (re && !re.test(value)){
					return doErrorStyle(p,"错误：格式不正确");
				}
				if (value.getLength()>Number(max))
					return doErrorStyle(p,"错误：超出长度（"+max+"）限制\n说明：一个汉字将占2个长度");
				if(min)
					if(value.getLength()<Number(min))
						return doErrorStyle(p,"错误：短于长度（"+min+"）限制\n说明：一个汉字将占2个长度");
				p.realValue=value;
				p.showValue=value;
				break;
			case "d":
				var fixedDate=refixDate(value);
				var d=new Date(fixedDate);
				var arr=par.split(","),mask=arr[0],arr1=arr[1],arr2=arr[2];
				if (arr1 && arr1!="null") {
					var min;
					if(arr1 == 'current'){
						min = new Date();
					}else{
						min=arr1.indexOf("F(")!=-1 ? new Date(calc(arr1,rowIndex)):new Date(refixDate(arr1));
					}
					var strmonth = min.getMonth() + 1;
					var strmin=min.getYear()+'-'+strmonth+'-'+min.getDate();
					if (d<min)
						return doErrorStyle(p,"错误：超出日期边界（最小值："+strmin+"）");
				}
				if (arr2 && arr2!="null") {
					var max;
					if(arr2 == 'current'){
						max = new Date();
					}else{
						max=arr2.indexOf("F(")!=-1 ? new Date(calc(arr2,rowIndex)):new Date(refixDate(arr2));
					}
					var strmonth = max.getMonth() + 1;
					var strmax=max.getYear()+'-'+strmonth+'-'+max.getDate();
					if (d>max) 
						return doErrorStyle(p,"错误：超出日期边界（最大值："+strmax+"）");
				}
				break;
		}
	}
	p.realValue=v || value;
	if(p.dtype=='group'){
		var tbname = p.name+'_WrapTable';
		var tb = p.parentNode;
		while(tb.tagName !='TABLE' || tb.name !=tbname){
			tb = tb.parentNode;
		}
		if(tb.title){
			doNormalStyle(p);
		}
	}
	if (p.title)
		doNormalStyle(p);
}

/* 提交表单
 * @param action 提交到后台的action参数
 * @param form 要提交的form名
 * @param unCheck 是否不校验
 * @param needCommit 是否提交
 */
function commit(action, form,needCommit,unCheck) {
	var frm=document.forms(form);
	if(frm == null)
		return;
	var arr = frm.elements;
	for (var i=0;i<arr.length;i++) {
		var field = arr[i];
		if(field.dtype){
			if(field.value != null && field.value != '' && (field.realValue == null || field.realValue =='')){
				if(field.dtype.indexOf('v') == 0
				|| field.dtype.indexOf('i') == 0
				|| field.dtype.indexOf('f') == 0 
				|| field.dtype.indexOf('e') == 0
				|| field.dtype.indexOf('m') == 0
				|| field.dtype.indexOf('n') == 0
				|| field.dtype.indexOf('z') == 0
				|| field.dtype.indexOf('d') == 0){
					field.realValue = field.value;
					field.showValue = field.value;
					field.inputValue = field.value;
				}
				if(field.dtype.indexOf('c') == 0){
					field.realValue = field.value;
					field.inputValue = field.value;
					var fieldValue=Number(field.value).format('$2');
					field.showValue = fieldValue;		
				}
				if(field.dtype.indexOf('p') == 0){
					field.realValue = field.value;
					field.inputValue = field.value;
					var fieldValue=Number(field.value).format('2');
					field.showValue = fieldValue+'%';		
				}
			}
			
		}	
	}
	var inError=false,inRequired=false;
	if(!(unCheck != null && unCheck == true)){
		for (var i=0;i<arr.length;i++) {	
			var j=arr[i];
			if ((j.dtype || j.tagName=="SELECT") && !j.disabled && j.offsetHeight && j.offsetWidth) {
				if (j.tagName=="SELECT") {	
					if(j.required && j.required != "false"){
						if(j.value== null || j.value==''){
							j.style.backgroundColor="#AACFFE";
							j.title="请填写必填项";
							if (!inRequired)
								inRequired=true;
						}
					}
				} else {
					if(j.dtype=='group'){
						var tbname = j.name+'_WrapTable';
						var tb = j.parentNode;
						while(tb.tagName !='TABLE' || tb.name !=tbname){
							tb = tb.parentNode;
						}
						if(tb.required =='true'){
							var td = j.parentNode;
							var gps = td.children;;
							var chk = false;
							for(m=0;m<gps.length;m++){
								if(gps[m].type=='checkbox'|| gps[m].type=='radio'){
									if(gps[m].checked==true){
										chk=true;
										break;
									}
								}
							}
							if(chk==false){
								tb.style.backgroundColor="#AACFFE";
								tb.title="请填写必填项";
								if (!inRequired)
								inRequired=true;
							}
						}
					}else{
						if (j.value) {
							if (j.title && !inError)
								inError=true;
						} else {
							if (j.required && j.required!="false") {
								j.style.backgroundColor="#AACFFE";
								j.title="请填写必填项";
								if (!inRequired)
								inRequired=true;
							}
						}
					}
				}
			}
		}
	}
	if (inError || inRequired) {
		var msg="页面中包含以下错误：              \n\n",index=1;
		if (inError) {
			msg+=index+"、红色部分的数据错误\n";
			index++;
		}
		if (inRequired) {
			msg+=index+"、蓝色部分必须填写\n";
			index++;
		}
		alert(msg+"\n请修正后重试。");
		return;
	}
	for (var i=0;i<arr.length;i++) {
		var j=arr[i];
		if (j.dtype && j.dtype!='group' && j.value && j.tagName!="SELECT"){
			j.value=j.realValue;
			if(j.dtype.indexOf('v') == 0){
				j.value = filterEncoder(j.value);
			}
		}
		if(j.tagName=="SELECT" && j.multiple==true){
			var str =''; 
			for(k=0;k<j.options.length;k++){
				var op = j.options[k];
				if(op.selected == true){
					if(str=='')
						str += op.value;
					else
						str = str + ','+op.value;
					op.selected = false;
				}
			}
			if(str != ''){					
				var nop = new Option(' ',str);
				nop.selected = true;
				j.options[j.options.length] = nop
			}
		}
		if(j.dtype=='group' && j.type=='checkbox'){
			var td = j.parentNode;
			var hid = td.lastChild;
			var realname = j.name+'_Real';
			if(hid.name==realname){
				var v = '';
				var chks = td.children;
				for(n=0;n<chks.length;n++){
					if(chks[n].type=='checkbox'){
						if(chks[n].checked==true){
							if(v=='')
								v+=chks[n].value;
							else
								v+=','+chks[n].value;
						}
					}
				}
				hid.value = v;
			}
		}
		if(j.name.indexOf('[')>0){
			j.name=j.id;
		}
	}
	if (action != null && action != 'null' && action != '')
		frm.action=action;
	if(frm("targetPage")){
		frm("targetPage").value = "";
		frm("totalPages").value = "";
		frm("totalRecords").value = "";
	}
	if(event != null && event.srcElement != null){
		if((event.srcElement.type=='button' || event.srcElement.type=='img' || event.srcElement.tagName=='IMG') && event.srcElement.performone=='true')
			event.srcElement.disabled = true;
	}
	if (needCommit==null)
		needCommit=true;
	if(needCommit)
		frm.submit();
}



/*
 * 当鼠标移到列表行上时调用此方法,以改变行的式样(框架已封装)
 */
function overRow(p) 
{
	var src=event.srcElement;
	if (src && src.tagName=="TD" && src.rowSpan>1)
		return;
	if (selected[p.ownerCase]!=p.sectionRowIndex)
		p.className="listRowHigh";
}

/*
 * 当鼠标移出列表行上时调用此方法,以改变行的式样(框架已封装)
 */
function outRow(p) 
{
	var src=event.srcElement;
	if (src && src.tagName=="TD" && src.rowSpan>1)
		return;
	if (selected[p.ownerCase]!=p.sectionRowIndex)
		p.className=p.sectionRowIndex%2 ? "listRow2":"listRow1";
}

/*
 * 当单击列表行上时调用此方法,以改变行的式样(框架已封装)
 */
function clickRow(p) {
	var t = p.parentNode;
	var src=event.srcElement;
	if (src && src.tagName=="TD" && src.rowSpan>1)
		return;
	var i=p.sectionRowIndex,j=selected[p.ownerCase];
	if(j!=i){
		var check=p.all(p.ownerCase+"_switch");
		var pks=check.value ? check.value.split(','):[];
		var jrow = getRowInTable(t,j);
		if(j>=0){
			jrow.all(p.ownerCase+"_switch").checked=false;
		}
		for (var k=0;k<pks.length;k++) {
			p.all(pks[k]).disabled = false;
			if(j>=0){
				jrow.all(pks[k]).disabled = true;
				jrow.className = "";
			}
		}
		check.checked=true;
		p.className="listRowSelected";
		selected[p.ownerCase]=i;
	}
}

/*
 * 当鼠标移到多选列表行上时调用此方法,以改变行的式样(tag已封装)
 */
function moverRow(p) {
	var src=event.srcElement;
	if (src && src.tagName=="TD" && src.rowSpan>1)
		return;
	if(p.all(p.ownerCase+"_switch") == null || p.all(p.ownerCase+"_switch").checked == false)
		p.className="listRowHigh";
}

/*
 * 当鼠标移出多选列表行上时调用此方法,以改变行的式样(tag已封装)
 */
function moutRow(p) {
	var src=event.srcElement;
	if (src && src.tagName=="TD" && src.rowSpan>1)
		return;
	if(p.all(p.ownerCase+"_switch") == null || p.all(p.ownerCase+"_switch").checked == false)
		p.className=p.sectionRowIndex%2 ? "listRow2":"listRow1";
}

/*
 * 当单击多选列表行上时调用此方法,以改变行的式样(tag已封装)
 */
function mclickRow(p) {
	var t = p.parentNode;
	var src=event.srcElement;
	if (src && src.tagName=="TD" && src.rowSpan>1)
		return;
	var i=p.sectionRowIndex,ownerCase=p.ownerCase,sc=selected[ownerCase];
	var switchs=document.getElementsByName(ownerCase+"_switch");
	var pks=switchs[0].value ? switchs[0].value.split(','):[],key="$"+i;
	var fs = p.parentNode.fullselected;
	if (sc[key] || fs=='true') {
			p.all(ownerCase+"_switch").checked=false;
			p.className=i%2 ? "listRow2":"listRow1";
			for (var k=0;k<pks.length;k++)
				p.all(pks[k]).disabled=true;
			if(fs=='true')
				fs = 'false';
			else
				delete sc[key];
	} else {
			p.all(ownerCase+"_switch").checked=true;
			p.className="listRowSelected";
			for (var k=0;k<pks.length;k++)
				p.all(pks[k]).disabled=false;
			sc[key]=key;
	}
	var m=0;
	for (var n in sc)
		m++;
	document.getElementById(ownerCase+"_switchAll").checked=m==switchs.length;
}

/*
 * 当单击多选列表表头的多选框时调用此方法,进行全选(框架已封装)
 */
function switchAll(p) 
{
	var id=p.id;
	var switchs=document.getElementsByName(id.substr(0,id.length-3));
	if (!switchs.length) {
		p.checked=false;
		return;
	}
	var pks=switchs[0].value? switchs[0].value.split(','):[],ownerCase=switchs[0].parentNode.parentNode.ownerCase,sc=selected[ownerCase];
	for (var i=0;i<switchs.length;i++) {
		var j=switchs[i];
		j.checked=p.checked;
		var row=j.parentNode.parentNode;
		var key="$"+row.sectionRowIndex;
		if (p.checked) {
			row.className="listRowSelected";
			sc[key]=key;
			for (var k=0;k<pks.length;k++)
				document.getElementsByName(pks[k])[i].disabled=false;
			
		} else {
			row.className="";
			delete sc[key];
			for (var k=0;k<pks.length;k++)
				document.getElementsByName(pks[k])[i].disabled=true;
		}
	}
}

function clickField (p){
	if(p.readOnly == true){
		return;
	}
	if(p.dtype.indexOf('d')== 0){
		if(p.dtype.indexOf('hour')>0 || p.dtype.indexOf('minute')>0 || p.dtype.indexOf('second')>0){
			calendars();
		}else if(p.dtype.indexOf('day') >0){
			calendar();
		}
	}
}

/*
 * 在Field的onchange事件中调用,进行校验(框架已封装)
 */
function changeField (p){
	if (p.tagName=="SELECT"){
		if (p.title){
			p.style.backgroundColor="transparent";
			p.title="";
		}
	}
	else
		disposeField(p) ;
}

/*
 * 在Field的onfocus事件中调用(框架已封装)
 */
function focusField(p) {
	if(p.readOnly || p.disabled){
		p.returnvalue=false;
		return;
	}
	if (((p.tagName=="INPUT" && (p.type=="text" || p.type=="password")) || p.tagName=="TEXTAREA")) {
		if (p.value) {
			if (!p.title && p.inputValue)
				p.value=p.inputValue;
			p.select();
		}
	} else
		document.selection.empty();
	if (p.className=="gridFld" || p.className=="gridReadOnlyFld" || p.className=='gridinputred') {
		if (!p.readOnly && p.className !='gridinputred')
			p.style.borderStyle="inset";
		var row=p.parentNode.parentNode;
		var i=row.sectionRowIndex,j=selected[row.ownerCase];
		if (j!=i) {
			row.className="listRowSelected";
			selected[row.ownerCase]=i;
		}
	}
}

/*
 * 在Field的onblur事件中调用(框架已封装)
 */
function blurField(p) 
{
	if (p.value) 
	{
		if (p.showValue && !p.title)
			p.value=p.showValue;
	}
	
	if (p.className=="gridFld" || p.className=="gridReadOnlyFld") 
	{
		if (p.dtype && (p.dtype.substr(0,1)=="d" || p.dialog)) 
		{
				var arr=document.getElementsByName(p.name+"_icon");
				if (arr.length)
					arr[p.parentNode.parentNode.sectionRowIndex].style.visibility="hidden";
		}
		if (!p.readOnly)
			p.style.borderStyle="solid";
	}
}

/*
 *  处理onkeydown事件,处理回车软tab和屏蔽快捷键(框架已封装)
 */
function keydownField(p) {
	if(event.keyCode == 8 || event.keyCode ==35 || event.keyCode == 36)
	{//退格,end,home键
		if(p.readOnly || p.disabled)
		{
			event.keyCode=0;
			event.returnValue=false;
			return;
		}
	}
	if (event.keyCode==13)
		event.keyCode=9;
}



/*
 * 处理极联式下拉框(tag已封装)
 */
function domino(p) {
	var fldpos = getFieldIndexInArray(p);
	var v=p.value;
	var listenerStr=p.listener;
	var listenerSet = [];
	var idx = listenerStr.indexOf(",");
	var point = 0;
	while(idx != -1){
		listenerSet[point++] = listenerStr.substr(0,idx);
		listenerStr = listenerStr.substr(idx+1);
		idx = listenerStr.indexOf(",");
	}
	listenerSet[point]=listenerStr;
	for(k=0;k<listenerSet.length;k++){
		var listeners = document.getElementsByName(listenerSet[k]);
		var listener = listeners[fldpos];
		listener.length=0;
		if (v) {
			listener.style.display="";
			var n=0;
			if(listener.prompt=='true'){
				listener.options[0]=new Option("-请选择-","");
				n++;
			}
			var dataStr=listener.data;
			var dataSet=[];
			var pos = dataStr.indexOf(",");
			var i=0;
			while(pos != -1){
				dataSet[i++] = dataStr.substr(0,pos);
				dataStr = dataStr.substr(pos+1);
				pos = dataStr.indexOf(",");
			}
			dataSet[i] = dataStr;
			var j=0;
			for(;j<dataSet.length;j++){
				var temp = dataSet[j];
				var p = temp.indexOf(":");
				var name = temp.substr(0,p);
				var value = temp.substr(p+1);
				if(value.indexOf(v)==0){
					var pos = value.indexOf('@');
					value = value.substr(pos+1);
					listener.options[n++]=new Option(name,value);
					if(listener.cscDefValue == value){
						listener.value = value;
					}
				}
			}
		if (listener.onchange)
			listener.onchange();
		}
	}
}

function forwardPage(targetPageFld,totalPages,listForm,queryForm,totalRecord,recordPerPage,searchAction){
	var p = document.getElementById(targetPageFld);
	var canGoto = false;
	if(p.value != null && p.value !=''){
		if(isNumber(p.value)){
			if(p.value.indexOf('.')<0){
				if(p.value >= 1 && p.value <= totalPages){
					canGoto = true;
				}
			}
		}
	}
	if(canGoto == true){
		gotoPage(9,listForm,queryForm,p.value,totalRecord,recordPerPage,searchAction);
	} else{
		//alert('请输入介于1和'+totalPages+'之间的整数');
		alert('无此页');
		p.value='';
		p.focus();
	}
}

/*
 * 用于list分页(tag已封装)
 */
function gotoPage(n, listForm,queryForm,targetPage,totalRecord,recordPerPage,searchAction) {
	var totalPages = totalRecord/ recordPerPage;
	totalPages = Math.ceil(totalPages);
	var frm=document.forms(queryForm);
	var fld=frm("targetPage");
	var num=Number(targetPage);
    switch (n) {
		case 1:
            if(num>1)
				fld.value=num-1;
			break;
		case 2:
			fld.value=1;
			break;
		case 3:
			fld.value= totalPages;
			break;
		case 4:
			if(num<Number(totalPages))
				fld.value=num+1;
			break;
		default:
			fld.value=targetPage;
			break;
	}
	var fld2 = frm("recordPerPage");
	var frm2 = document.forms(listForm);
	var fld4 = frm("totalPages");
	var fld5 = frm("totalRecords");
	fld4.value = Number(totalPages);
	fld5.value = Number(totalRecord);
	fld2.value = 10;
	if(searchAction != null && searchAction != '')	
		frm.action = searchAction;
	var arr=frm.elements;
	for (var i=0;i<arr.length;i++) {
		var j=arr[i];
		if (j.dtype && j.value)
			j.value=j.realValue;
	}
	frm.submit();
}

/*
 * 改变每页记录数(tag已封装)
 */
function changeQueryFormRecsPerPage(p,queryForm,searchAction,listName)
{
	var frm=document.forms(queryForm);
	var fld = frm("recordPerPage");
	if(isNumber(p.value))
	{
		if(p.value==0)
		{
			alert('请输入大于0的数字');
			p.value = 10;
			return;
		}
		if(p.value>200)
		{
			var swit = document.getElementById(listName+'_table_switchAll');
			if(swit)
			{
				alert('多选列表每页最多显示200条记录');
				p.value = 10;
				return;
			}
		}
		fld.value = p.value;
		if(fld[0] != null)
			fld[0].value = p.value
		if(searchAction.indexOf('#') == 0)
		{
			//若以#开头表示要改变查询Form的action
			frm.action = searchAction.substr(1);
		}
		else
		{
			var fld6 = frm("ACTION");
			fld6.value = searchAction;
		}
		commit("",searchAction,queryForm,false);
	}
	else
	{
		alert('请输入大于0的数字');
		p.value =10;
		return;
	}
}


/*
 * 填充字符
 * @ source 源字符串
 * @ len 长度
 * @ fillstr 填充字符
 * @ tail 是否填充在尾部
 * @ return 
 */
function fillString(source,len,fillstr,tail)
{
	var result;
	if(source.getLength() ==len)
	{
		result = source;
	}
	else
	if(source.getLength() >len)
	{
		result = source.substr(0,len);
	}
	else
	{
		var str = "";
		var dif = len-source.getLength();
		for (var i=0;i<dif;i++)
		{
			str += fillstr;
		} 
		if(tail)
			result = source+str;
		else
			result = str+source;
	}
	return result;
	
}

function resetForm(p) 
{
	var frm=document.forms(p);
    var arr=frm.elements;
	for (var i=0;i<arr.length;i++) 
	{
		var j=arr[i];
		if(j.name != "ACTION" && j.name!="RESOURCEID" && j.name != "isDialog" && (j.freeze == null || j.freeze !="true"))
		{
			if (j.dtype) 
			{
				j.value="";
				j.showValue="";
				j.inputValue="";
				if (j.title)
					doNormalStyle(j);
			}
			if (j.type=="hidden") 
			{
				j.value="";
			}
			if (j.tagName=="SELECT")
				j.selectedIndex=0;
		}
		
	}
}

/*
 * disable Form中的所有元素
 * @param p From名
 * @param frozen 不要disable的元素名数组
 */
function disableForm(p,frozen)
{
	var frm=document.forms(p);
    var arr=frm.elements;
	for (var i=0;i<arr.length;i++) 
	{
		var j=arr[i];
		if(j.name != "ACTION" && j.name!="RESOURCEID" && j.name != "isDialog" && j.name !="targetPage" && j.name != "recordPerPage" && j.name != "totalPages" && j.name != "totalRecords")
		{
			if(frozen != null && frozen.length>0)
			{
				var f = true;
				for(k=0;k<frozen.length;k++)
				{
					if(j.name == frozen[k] || j.id == frozen[k])
					{
						f = false;
						break;
					}
				}
				if(f)
					j.disabled = true;
			}
			else
			{
				j.disabled = true;
			}
		}
	}
}


/*
 * 检查列表项是否选中,选中返回true否则false
 * @param listTable 列表名(即list tag 的name属性)
 * @param isMulti 是否多选
 */
function checkSelect(listTable,isMulti){
	if(listTable.indexOf('_table') <=0){
		listTable += '_table';
	}
	if(isMulti != null && isMulti ==true){
		var switchs=document.getElementsByName(listTable+'_switch');	
		var isSelected = false
		for (var i=0;i<switchs.length;i++) {
			var j=switchs[i];
			var row=j.parentNode.parentNode;
			if(row.style.display!="none"){
				if(j.checked == true){
					isSelected = true;
					break;
				}
			}
		}
		if(isSelected)
			return true;
		else
			return false;
	}
	else{
		var j=-1;
		j=selected[listTable];
		if(j==null || j<0 )
			return false;
		else
			return true;
	}
}

function initList(p){
	if(p.indexOf('_table')<=0)
		p = p+'_table';
	var list = document.getElementById(p);
	if(!list)
		return;
	var tbody=list.tBodies[0];
	var row;
	var ncs;
	var isMulti;
	var switchs=document.getElementsByName(p+'_switch');
	if(switchs==null && switchs.length <=0)
		return;
	if(switchs[0]!= null){
		if(switchs[0].type == 'checkbox')
			isMulti = true;
		else if(switchs[0].type == 'radio')
			isMulti = false;
	}
	if(isMulti){
		for(i=0;i<tbody.rows.length;i++){
			row = tbody.rows[i];
			if(row.style.display!="none" && row.className !='listHead' && row.name !='rowSplitLine'){
				ncs = row.cells;
				var fld = row.all(p+'_switch');
				if(fld != null && fld.checked){
					row.className = 'listRowSelected';
					var sc = selected[p];
					if(sc != null){
						var key = "$"+row.sectionRowIndex;
						sc[key]=key;
					}
					for(j=0;j<ncs.length;j++){
						var cell = ncs[j];
						var child = cell.children;
						for(m=0;m<child.length;m++){
							child[m].disabled = false;
							if(child[m].tagName=='IMG')
								child[m].style.display='';
						}
					}
				}
			}
		}
	}
	else{
		for(i=0;i<tbody.rows.length;i++){
			row = tbody.rows[i];
			if(row.style.display!="none" && row.className !='listHead' && row.name !='rowSplitLine'){
				var fld = row.all(p+'_switch');
				if(fld != null && fld.checked){
					row.className = 'listRowSelected';
					ncs = row.cells;
					selected[p] = row.sectionRowIndex;
					for(j=0;j<ncs.length;j++){
						var cell = ncs[j];
						var child = cell.children;
						for(m=0;m<child.length;m++){
							child[m].disabled = false;
							if(child[m].tagName=='IMG')
								child[m].style.display='';
						}
					}
					break;
				}
			}
		}
	}
}

function initForm(form){
	var frm=document.forms(form);
	var arr = frm.elements;
	for (var i=0;i<arr.length;i++) {	
		var field = arr[i];
		if(field.dtype){
			if(field.parentNode){
				var td = field.parentNode;
				if(td.tagName =='TD'){
					var tr = td.parentNode;
					while(tr.tagName !='TR'){
						tr = tr.parentNode;
					}
					var row = tr.sectionRowIndex;
					var checkCtls = document.getElementsByName(form+'_table_switch');
					if(checkCtls && checkCtls[row])
						field.disabled = !checkCtls[row].checked;
				}
			}
			if(field.value != null && field.value != ''){
				if(field.dtype.indexOf('v') == 0
				|| field.dtype.indexOf('i') == 0
				|| field.dtype.indexOf('f') == 0 
				|| field.dtype.indexOf('e') == 0
				|| field.dtype.indexOf('m') == 0
				|| field.dtype.indexOf('n') == 0
				|| field.dtype.indexOf('d') == 0
				|| field.dtype.indexOf('z') == 0){
					field.realValue = field.value;
					field.showValue = field.value;
					field.inputValue = field.value;
					field.defaultValue = field.value
				}
				if(field.dtype.indexOf('c') == 0){
					field.realValue = field.value.replace(/\,/g,'');
					field.inputValue = field.realValue;
					field.showValue = field.value;		
					field.defaultValue = field.value;
				}
				if(field.dtype.indexOf('p') == 0){
					field.realValue = field.value.replace(/\%/g,'');
					field.inputValue = field.realValue;
					field.showValue = field.value;	
					field.defaultValue = field.value;	
				}
			}
			
		}
		
	}
}

/*
 * 获得List的行数
 * param p List 名 
 */
function getListRowCount(p)
{
	var count = 0;
	if(p.indexOf('_table')<=0)
	{
		p = p+'_table';
	}
	var tbody=document.getElementById(p).tBodies[0];
	for(i=0;i<tbody.rows.length;i++)
	{
		row = tbody.rows[i];
		if(row.className !='listHead')
		{
			count++;
		}
	}
	return count;
}

/*
 * 获得List的显示行数(不计隐藏行)
 * param p List 名 
 */
function getListShowRowCount(p)
{
	var count = 0;
	if(p.indexOf('_table')<=0)
	{
		p = p+'_table';
	}
	var tbody=document.getElementById(p).tBodies[0];
	for(i=0;i<tbody.rows.length;i++)
	{
		row = tbody.rows[i];
		if(row.style.display!="none" && row.className !='listHead')
		{
			count++;
		}
	}
	return count;
}

/*
 * 获得选中的行数
 * param p List名
 */
function getListSelectedRowCount(p){
	var count = 0;
	if(p.indexOf('_table')<=0)
		p = p+'_table';
	var tbody=document.getElementById(p).tBodies[0];
	for(i=0;i<tbody.rows.length;i++){
		row = tbody.rows[i];
		if(row.style.display!="none" && row.className !='listHead' && row.name !='rowSplitLine'){
			var j=row.all(p+'_switch');
			if(j!=null && j.checked == true)
				count++;
		}
	}
	return count;
}

/*
 * 获得选中的行
 * param p List名
 * return TR DOM 数组
 */
function getListSelectedRow(p){
	var result=[];
	if(p.indexOf('_table')<=0)
		p = p+'_table';
	var tbody=document.getElementById(p).tBodies[0];
	for(i=0;i<tbody.rows.length;i++){
		row = tbody.rows[i];
		if(row.style.display!="none" && row.className !='listHead' && row.name !='rowSplitLine'){
			var j=row.all(p+'_switch');
			if(j!= null && j.checked == true)
				result[result.length] = row;
		}
	}
	return result;
}
/*
 * 获得选中的行中的列值
 * param p List名, c 列名
 * return 列值数组
 */
function getListSelectedColumn(p,c){
	var result=[];
	var cols=document.getElementsByName(p+'.'+c);
	if(p.indexOf('_table')<=0)
		p = p+'_table';
	var tbody=document.getElementById(p).tBodies[0];
	for(i=0;i<tbody.rows.length;i++){
		row = tbody.rows[i];
		if(row.style.display!="none" && row.className !='listHead' && row.name !='rowSplitLine'){
			var j=row.all(p+'_switch');
			if(j!= null && j.checked == true){
				result[result.length] = cols[i].value;
			}
		}
	}
	return result;
}

function statusbar(txt){
	window.status=txt;
}



function showAllExcel(form,action,nvpair,tableModel){
	var frm=document.forms(form);
	frm.target='_top';
	var nvpairfld = frm("nvpair");
	var tmfld = frm("tableModel");
	var fileTypeFld = frm("fx_FileType");
	var allDataFld = frm("fx_AllData");
	tmfld.value = tableModel;
	nvpairfld.value =nvpair 
	fileTypeFld.value = 'xls';
	allDataFld.value = 'true';
	frm.submit();
	nvpairfld.value='';
	tmfld.value='';
	frm.target='_self';
	fileTypeFld.value = '';
	allDataFld.value = '';
}

function showCurrentExcel(form,action,nvpair,tableModel){
	var frm=document.forms(form);
	frm.target='_top';
	var nvpairfld = frm("nvpair");
	var tmfld = frm("tableModel");
	var fileTypeFld = frm("fx_FileType");
	tmfld.value = tableModel;
	nvpairfld.value =nvpair 
	fileTypeFld.value = 'xls';
	var fld = frm("ACTION");
	fld.value = action;
	frm.submit();
	nvpairfld.value='';
	tmfld.value='';
	frm.target='_self';
	fileTypeFld.value = '';
}

function showAllPdf(form,action,nvpair,tableModel){
	var frm=document.forms(form);
	frm.target='_top';
	var nvpairfld = frm("nvpair");
	var tmfld = frm("tableModel");
	var fileTypeFld = frm("fx_FileType");
	var allDataFld = frm("fx_AllData");
	tmfld.value = tableModel;
	nvpairfld.value =nvpair 
	fileTypeFld.value = 'pdf';
	allDataFld.value = 'true';
	var fld = frm("ACTION");
	fld.value = action;
	frm.submit();
	nvpairfld.value='';
	tmfld.value='';
	frm.target='_self';
	fileTypeFld.value = '';
	allDataFld.value = '';
}

function showCurrentPdf(form,action,nvpair,tableModel){
	var frm=document.forms(form);
	frm.target='_top';
	var nvpairfld = frm("nvpair");
	var tmfld = frm("tableModel");
	var fileTypeFld = frm("fx_FileType");
	tmfld.value = tableModel;
	nvpairfld.value =nvpair 
	fileTypeFld.value = 'pdf';
	var fld = frm("ACTION");
	fld.value = action;
	frm.submit();
	nvpairfld.value='';
	tmfld.value='';
	frm.target='_self';
	fileTypeFld.value = '';
}

function showAllHtml(form,action,nvpair,tableModel){
	var frm=document.forms(form);
	frm.target='_top';
	var nvpairfld = frm("nvpair");
	var tmfld = frm("tableModel");
	var fileTypeFld = frm("fx_FileType");
	var allDataFld = frm("fx_AllData");
	tmfld.value = tableModel;
	nvpairfld.value =nvpair 
	fileTypeFld.value = 'htm';
	allDataFld.value = 'true';
	var fld = frm("ACTION");
	fld.value = action;
	frm.submit();
	nvpairfld.value='';
	tmfld.value='';
	frm.target='_self';
	fileTypeFld.value = '';
	allDataFld.value = '';
}

function showCurrentHtml(form,action,nvpair,tableModel){
	var frm=document.forms(form);
	frm.target='_top';
	var nvpairfld = frm("nvpair");
	var tmfld = frm("tableModel");
	var fileTypeFld = frm("fx_FileType");
	tmfld.value = tableModel;
	nvpairfld.value =nvpair 
	fileTypeFld.value = 'htm';
	var fld = frm("ACTION");
	fld.value = action;
	frm.submit();
	nvpairfld.value='';
	tmfld.value='';
	frm.target='_self';
	fileTypeFld.value = '';
}

function setFieldValue(fld,v){
	fld.value = v;
	fld.realValue = v;
	fld.showValue = v;
	fld.inputValue = v;
}



/*
 *	获得field在数组中的位置
 */
function getFieldIndexInArray(p){
	var fldName = p.name;
	var flds = document.getElementsByName(fldName);
	for(i=0;i<flds.length;i++){
		if(p == flds[i])
			return i;
	}
}

function switchShow(titleid,itemid){
    var _item = document.getElementById(itemid);
    var _title = document.getElementById(titleid);
    if (_item.style.display=="none"){
        _item.style.display="";
		_title.innerHTML="关闭";
    }
    else{
        _item.style.display="none";
		_title.innerHTML="展开";
    }
}

var DivSelectToSelect_ifr = null;
var DivSelectToSelect = null;
function showSelectToSelectDialog(p){
	var fld = p.nextSibling;
	if(fld.realValue == null){
		fld = fld.nextSibling.nextSibling;
	}
	var fldName = fld.name;
	var fldIndex = 0;
	var flds = document.getElementsByName(fldName); 
	if(flds != null){
		for(i=0;i<flds.length;i++){
			if(fld == flds[i]){
				fldIndex = i;
				break;
			}
		}
	}
	if(DivSelectToSelect==null){
		DivSelectToSelect = document.createElement("div");
		DivSelectToSelect_ifr = document.createElement("iframe");
		document.body.appendChild(DivSelectToSelect);
		document.body.appendChild(DivSelectToSelect_ifr);
		DivSelectToSelect.style.position = 'absolute';
		DivSelectToSelect.style.zIndex = '9999';
		DivSelectToSelect_ifr.style.position = 'absolute';
		DivSelectToSelect_ifr.style.zIndex = '9998';
	}
	var ht = "<table width='600' border='0' cellpadding='0' cellspacing='0'>";
	ht+="<tr>";
	ht+="<td width='6'><img src='img/foot02.gif' width='6' height='5' /></td>";
	ht+="<td background='img/foot03.gif'></td>";
	ht+="<td width='6'><img src='img/foot04.gif' width='6' height='5' /></td>"
	ht+="</tr>";
	ht+="<tr>"; 
	ht+="<td background='img/foot05.gif'></td>";
	ht+="<td bgcolor='white' height='100' >";
	ht+="<table width='570' border='0' align='center' cellpadding='6' cellspacing='0'>";
	ht+="<tr><td><div id='SelectToSelect_Title' style='font-weight:bold;'></div>";
	ht+="</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>";
	ht+="<select name='SelectToSelect_BeSelect' ondblclick='SelectToSelect_CommandAdd()' size='15' style='width:200px;' multiple='true'></select>";
	ht+="</td><td><div align='center'>";
	ht+="<a href='javascript:SelectToSelect_CommandAdd();'>";
	ht+="<img src='img/bt_z.gif' border='0' width='48' height='21' />";
	ht+="</a><br /><br /><a href='javascript:SelectToSelect_CommandRemove();'>";
	ht+="<img src='img/bt_z1.gif' border='0' width='48' height='21' />";
	ht+="</a></div></td><td>";
	ht+="<select name='SelectToSelect_Selected' size='15' style='width:200px;' ondblclick='SelectToSelect_CommandRemove();' multiple='true'>";
	ht+="</select></td></tr><tr><td colspan='3'>";
	ht+="<div align='center'><a href=\"javascript:SelectToSelect_CommandConfrim(\'";
	ht+=fldName;
	ht+="\',";
	ht+=fldIndex;
	ht+=");\">";
	ht+="<img src='img/bt_xxz.gif' border='0' width='48' height='21' />";
	ht+="</a>&nbsp;&nbsp;<a href=\"javascript:DivSelectToSelect.style.display=DivSelectToSelect_ifr.style.display=\'none\'; undefined\">";
	ht+="<img src='img/bt_qx.gif' width='48' height='21' border='0' />";
	ht+="</a></div></td></tr></table></td><td background='img/foot09.gif'></td>"; 
	ht+="</tr><tr><td><img src='img/foot06.gif' width='6' height='5' /></td>";
	ht+="<td background='img/foot07.gif'></td>";
	ht+="<td><img src='img/foot08.gif' width='6' height='5' /></td>";
	ht+="</tr></table>";
	DivSelectToSelect.innerHTML = ht;
	document.getElementById('SelectToSelect_Title').innerText='请选择';
	selectedvalues = fld.realValue.split(',');	
	selectednames = fld.value.split(',');
	selectvalues = ',' + fld.selectedItemPair + ',';
	while(document.getElementById('SelectToSelect_Selected').options.length>0){
		document.getElementById('SelectToSelect_Selected').options.remove(0);
	}
	while(document.getElementById('SelectToSelect_BeSelect').options.length>0){
		document.getElementById('SelectToSelect_BeSelect').options.remove(0);
	}
	if(selectedvalues.length>0){
		for(var i=0;i<selectedvalues.length;i++){
			if(selectedvalues[i] != ''){
				document.getElementById('SelectToSelect_Selected').options.add(new Option(selectednames[i],selectedvalues[i]));
				selectvalues = selectvalues.replace(','+selectednames[i]+'='+selectedvalues[i]+',',','); // 除掉所有已选项。
			}
		}
	}
	if(selectvalues.length>=2)selectvalues=selectvalues.substring(1,selectvalues.length-1);
	selectvaluess = selectvalues.split(',');
	for(var i=0;i<selectvaluess.length;i++){
		selectvaluepair = selectvaluess[i].split('=');
		if(selectvaluepair.length==2)
			document.getElementById('SelectToSelect_BeSelect').options.add(new Option(selectvaluepair[0],selectvaluepair[1]));
	}
	DivSelectToSelect.style.display = DivSelectToSelect_ifr.style.display = 'inline';
	// 激活选中项
	if(document.getElementById('SelectToSelect_BeSelect').options.length>0)document.getElementById('SelectToSelect_BeSelect').options[0].selected=true;
	if(document.getElementById('SelectToSelect_Selected').options.length>0)document.getElementById('SelectToSelect_Selected').options[0].selected=true;
	// 重新定位
	
	DivSelectToSelect.style.left = (document.body.offsetWidth - DivSelectToSelect.offsetWidth)/2;
	DivSelectToSelect.style.top = (document.body.offsetHeight - DivSelectToSelect.offsetHeight)/2 + document.body.scrollTop;
	DivSelectToSelect_ifr.style.left = DivSelectToSelect.style.left;
	DivSelectToSelect_ifr.style.top = DivSelectToSelect.style.top;
	DivSelectToSelect_ifr.style.width = DivSelectToSelect.offsetWidth;
	DivSelectToSelect_ifr.style.height = DivSelectToSelect.offsetHeight;
}

function SelectToSelect_CommandAdd(){
	while((optIdx = document.getElementById('SelectToSelect_BeSelect').selectedIndex)>-1){
			var opt = document.getElementById('SelectToSelect_BeSelect').options[optIdx];
			document.getElementById('SelectToSelect_BeSelect').options.remove(optIdx);
			document.getElementById('SelectToSelect_Selected').options.add(opt);
	}
}

function SelectToSelect_CommandRemove(){
	while((optIdx = document.getElementById('SelectToSelect_Selected').selectedIndex)>-1){
			var opt = document.getElementById('SelectToSelect_Selected').options[optIdx];
			document.getElementById('SelectToSelect_Selected').options.remove(optIdx);
			document.getElementById('SelectToSelect_BeSelect').options.add(opt);
	}
}

function SelectToSelect_CommandConfrim(fldName,fldIndex){
	var fld = document.getElementsByName(fldName)[fldIndex];
	var vals = "";
	var names = "";
	for(var i=0;i<document.getElementById('SelectToSelect_Selected').options.length;i++){
		vals += document.getElementById('SelectToSelect_Selected').options[i].value + ",";
		names += document.getElementById('SelectToSelect_Selected').options[i].innerText + ",";
	}
	if(vals.length>0){
		vals = vals.substring(0,vals.length-1);
		names = names.substring(0,names.length-1);
	}
	fld.realValue = vals;
	fld.value = names;
	if(fld.realValue !=''){
		fld.style.backgroundColor="#FFFFFF";
		fld.title ='';
	}
	DivSelectToSelect.style.display=DivSelectToSelect_ifr.style.display="none";
}

function filterEncoder(str)  {   
	var s = "";   
 	if(str.length == 0 || str == null)   
 		return "";   
    for(var i=0; i<str.length; i++){   
    	switch(str.substr(i,1)){   
        	case "<" :   
        		s += "&lt;";
        		break;   
            case ">" :   
            	s += "&gt;";       
            	break;   
            case "&" :   
            	s += "&amp;";     
            	break;   
            case "   " :   
            	s += "&nbsp;";   
            	break;   
            case "\"" :   
            	s += "&quot;";   
            	break;   
            case "\n" :   
            	s += "<br>";   
            	break;   
            default :   
            	s += str.substr(i,1);   
            	break;   
		}   
	}   
	return   s;   
}
/*
 * 计算两日期间隔的年
 */
function calcDifYear(d1,d2){
	var dif = Math.abs(d1.getTime() - d2.getTime());
	var year = Math.floor(dif / (1000 * 60 * 60 * 24 * 365));
	return year;
	
}


function filterOldform(p){
	var frm=document.forms(p);
	if(frm == null)
		return;
	var arr = frm.elements;
	for (var i=0;i<arr.length;i++) {
		var field = arr[i];
		if(field.value != null && field.value != ''){
			field.value = filterEncoder(field.value);
		}
	}
}

function checkOldFieldLen(p,l){
	if(p.value != null && p.value !=''){
		if(p.value.getLength()>l){
			alert('字段值超过长度,最长'+l);
			p.value = '';
			p.focus;
		}
	}
}

function checkOldFieldNum(p){
	if(p.value != null && p.value !=''){
		if(!isNumber(p.value)){
			alert('请输入数字');
			p.value = '';
			p.focus;
		}
	}
}
