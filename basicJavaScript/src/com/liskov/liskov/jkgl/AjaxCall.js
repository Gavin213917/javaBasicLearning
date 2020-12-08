/**
 * 2010-08-19
 * 解决了多次提交Ajax 结果被覆盖的问题
 * 方法：httpXMLRequest声明为局部变量
 */
 
/**
 * 创建一个XMLHttpRequest对象
 * @return {}
 */
function  _createObj()
{
	var request = null;
	if (window.XMLHttpRequest) { // 如果是 Google Chrome、 Mozilla
									// Firefox、Netscape、Opera
									// 8.0+、Safari、IE7+ 等浏览器
		request = new XMLHttpRequest();
		if (request.overrideMimeType) { // 设置 MiME 类别
		/*
		 * 有些版本的浏览器在处理服务器返回的未包含XML mime-type头部
		 * 信息的内容时会报错，因此，要确保返回的内容包含text/xml信息。		 */
			request.overrideMimeType("text/xml");
		}
	} else if (window.ActiveXObject) { // 如果是 Internet Explorer
										// 6.0- 浏览器		var msXml = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.5.0",
				"Msxml2.XMLHTTP.4.0", "Msxml2.XMLHTTP.3.0",
				"Msxml2.XMLHTTP", "Microsoft.XMLHTTP"];
		for (var i = 0; i < msXml.length; i++) {
			try {
				request = new ActiveXObject(msXml[i]);
				break;
			} catch (e) {
				request = null;
			}
		}
		if (request == null) {
			alert("Sorry! Because you are using a browser that does not support AJAX, the server can not process a request submitted!");
			return;
		}
	}
	return request;
}



/**
 * 外部调用的主方法
 * @param {} arg
 */
function AjaxCall(arg) {      
	//创建一个XMLHttpRequest对象
	var localHttpRequest = new _createObj();//fix in 2010.08.19					
	var recall; //回调函数
	var url = "";	//访问地址
	var context;//上下文对象
	var data;
	var sendType;
	var async; //是否同步 added by wr @ 2012.7.10
	for(var item in arg){
		if(item == "recall"){
			recall = arg[item];
		}
		if(item == "context"){
			context = arg[item];
		}
		if(item == "data"){
			data = arg[item];
			var i = 0;
			for(var key in data){
				if(i == 0){
					url = url + encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
				}else{
					url = url + "&" + encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
				}
				i++;
			}
		}
		if(item == "url"){
			url = arg[item] + "?" + url;
		}
		if(item == "type"){
			sendType = "post";
		}
		// 是否同步 added by wr @ 2012.7.10
        if(item == "async"){
            async = arg[item];
        }
	}
	//args要调用方法的参数 handler用调用的方法 返回一个函数对象 闭包
	function constructFunc(args1,arg2,httpRequest,handler){
		return function(){
			handler(args1,arg2,localHttpRequest);
		}
	}
	//将状态触发器（XMLHttpRequest对象的一个属性）绑定到一个处理函数processor
	localHttpRequest.onreadystatechange=constructFunc(context,recall,localHttpRequest,processor);
	//通过GET方法向指定的URL建立服务器的调用
	url += "&randomTime=" + new Date().valueOf();
	if (async != null && async == "false") {
	   localHttpRequest.open(sendType == null || sendType == "" || sendType.toLowerCase() == "get"?"GET":"POST",url,false);
	} else {
	   localHttpRequest.open(sendType == null || sendType == "" || sendType.toLowerCase() == "get"?"GET":"POST",url);	
	}
	//发送请求
	if(sendType == "post"){
		//设置头
		localHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		localHttpRequest.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		localHttpRequest.send(url.substring(url.indexOf('?')+1));
	}else{
		localHttpRequest.send(null);
	}
}

//处理从服务器返回的XML文档，更新下拉菜单列表
function processor(context,recall,HttpRequest) {
	var result;	//定义一个变量用来存放从服务器返回的响应结果
	if(HttpRequest.readyState==4) {//4——表示响应已经完成		if(HttpRequest.status==200) {//200——返回成功			result = HttpRequest.responseText;//取出服务器返回的XML文档中所有city标签的子节点
			//2012/05/11 tjf 添加 try catch防止js出错
			try {
				result = eval('(' + result + ')');
				if(recall != null){
					if(context != null && result != null){
						recall(context,result);
					}else if(result != null){
						recall(result);
					}else if(context != null){
						recall(context);
					}else{
						recall();
					}
				}
			} catch (e) {
			}
		}
	}
}