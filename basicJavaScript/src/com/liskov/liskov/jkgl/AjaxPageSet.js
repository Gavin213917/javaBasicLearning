var xmlHttpForPage;                       		//定义一个变量用来存放XMLHttpRequest对象
var callAfterSolution = '';						//在返回处理完成后的函数名称
var tableMsg;									//表格信息
var sort;										//排序字段名称

/*Ajax分页操作*/
function setCurrPageForAjax(num,callAfterSolution,tableMsg,sort){
	this.tableMsg = tableMsg;
	this.callAfterSolution = callAfterSolution;
	this.sort = sort;
	if(parseInt(num) == 1){
		document.getElementById("currPage").value = 1;
		document.getElementById("showCur").innerHTML = 1;
	}else if(parseInt(num) == 2){
		if(parseInt(document.getElementById("currPage").value) == 1){
			document.getElementById("currPage").value = 1;
			document.getElementById("showCur").innerHTML = 1;
		}
		else{
			document.getElementById("currPage").value = parseInt(document.getElementById("currPage").value) - 1;
			document.getElementById("showCur").innerHTML = parseInt(document.getElementById("currPage").value);
		}
			
	}else if(parseInt(num) == 3){
		if((parseInt(document.getElementById("currPage").value) + 1) > document.getElementById("totalPage").value){
			document.getElementById("currPage").value = document.getElementById("totalPage").value;
			document.getElementById("showCur").innerHTML = document.getElementById("totalPage").value;
		}
		else{
			document.getElementById("currPage").value = parseInt(document.getElementById("currPage").value) + 1;
			document.getElementById("showCur").innerHTML = parseInt(document.getElementById("currPage").value);
		}
	}else if(parseInt(num) == 4){
		document.getElementById("currPage").value = document.getElementById("totalPage").value;
		document.getElementById("showCur").innerHTML = document.getElementById("totalPage").value;
	}else if(parseInt(num) == 5){
		if(parseInt(document.getElementById("turnPage").value) > parseInt(document.getElementById("totalPage").value)){
			document.getElementById("currPage").value = document.getElementById("totalPage").value;
			document.getElementById("showCur").innerHTML = document.getElementById("totalPage").value;
		}
			
		else if(parseInt(document.getElementById("turnPage").value) < 1){
			document.getElementById("currPage").value = 1;
			document.getElementById("showCur").innerHTML = 1;
		}else{
			document.getElementById("currPage").value = document.getElementById("turnPage").value;
			document.getElementById("showCur").innerHTML = document.getElementById("turnPage").value;
		}
	}
	createAjaxPageSet();
}



function createAjaxPageSet(){
	xmlHttpForPage = createXMLHttpRequestForPageSet();					//创建一个XMLHttpRequest对象
	xmlHttpForPage.onreadystatechange=changeTabCallBack;	//将状态触发器（XMLHttpRequest对象的一个属性）绑定到一个处理函数processor
	var url = document.form1.action + '?';	//拼接分页的url
	url = url.split('.')[0] + 'ForAjax.' + url.split('.')[1];
	var form1 = document.form1.elements;
	for(var i = 0 ; i < form1.length ; i++){
		if(form1[i].name != null && form1[i].name != ''){
			if(i == form1.length-1){
				url = url + form1[i].name + '=' + form1[i].value;
			}else{
				url = url + form1[i].name + '=' + form1[i].value + '&';
			}
		}
	}
	xmlHttpForPage.open("GET",url);		//通过GET方法向指定的URL建立服务器的调用
	xmlHttpForPage.send(null);				//发送请求
}

/* 判断浏览器 创建XMLHttpRequest对象 */
function createXMLHttpRequestForPageSet() {				//该函数用来创建一个XMLHttpRequest对象
	if(window.ActiveXObject) {					//根据浏览器是否支持ActiveXObject而采用不同的方式创建XMLHttpRequest对象
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	else if(window.XMLHttpRequest) {
		return new XMLHttpRequest();
	}
}

/* 分页后的处理函数 */
function changeTabCallBack() {							//处理从服务器返回的XML文档，更新table
	var result;									//定义一个变量用来存放从服务器返回的响应结果
	if(xmlHttpForPage.readyState==4) {					//4——表示响应已经完成
		if(xmlHttpForPage.status==200) {				//200——返回成功
			result=xmlHttpForPage.responseText;		//取出服务器返回的XML文档中所有city标签的子节点
			/*result为后台的经过处理的json字符对象*/
			/**处理**/
			var tableinfo = eval(result);
			/*清空表格 更新表格*/
			var rows = document.getElementById("resulttable").rows.length;
			var table = document.getElementById("resulttable");
			for(var i = rows; i > 1  ; i--){
				table.deleteRow(i - 1);//清空表格
			}
			for(var i = 0;i < tableMsg.length; i++){
				if(sort != ''){
					if(tableMsg[i]==sort){
						table.rows[0].cells[i].style.background='#2662DF';
					}
					else{
						table.rows[0].cells[i].style.background='#C8DBEA';
					}
				}
			}
			//插入表格
			for(var i = 0; i < tableinfo.length ; i ++){
				var tr = table.insertRow(i + 1);
				tr.align = 'center';
				if(tableinfo[i].cwts != ''){//错误提示设置（没有需求可以删除）
					tr.title = tableinfo[i].cwts;
					tr.style.background = '#EAC0D8';
				}
				function constructFunc(args,handler){//args要调用方法的参数 handler用调用的方法 返回一个函数对象 闭包
					return function(){
						handler(args);
					}
				}
				//为此TR添加事件
				tr.attachEvent('onmouseover',constructFunc(tr,mousemove));
				tr.attachEvent('onmouseout',constructFunc(tr,mouseout));
				//生成TD
				for(var j = 0; j < tableMsg.length ; j ++){
					tr.insertCell();
					if(tableMsg[j] != ''){
						table.rows[i + 1].cells[j].innerHTML = eval('tableinfo[i].' + tableMsg[j]);
					}
				}
			}
			if(callAfterSolution != ''){
				eval(callAfterSolution + '()');
			}
		}
	}
}