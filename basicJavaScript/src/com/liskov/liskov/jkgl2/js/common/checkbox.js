
/**
 * 通用字典表中的 初始化复选或单选
 * @param type 复选或单选类型 例如：复选  checkbox 单选 radio
 * @param url 路径
 * @param nameStr 对应input中name
 * @param tdid    对应td中的id
 * @param typeid 通用字典表中的 typeid 
 * @param rowNum  行数
 * @param funName  具体的方法
 */
function findCheckbox(type,url,nameStr,tdid,typeid,rowNum,funName){
	findCheckboxImp(type,url,nameStr,tdid,typeid,rowNum,funName,true);
}

/**
 * 通用字典表中的 获取复选或单选
 * @param type 复选或单选类型 例如：复选  checkbox 单选 radio
 * @param url 路径
 * @param nameStr 对应input中name
 * @param tdid    对应td中的id
 * @param typeid 通用字典表中的 typeid 
 * @param rowNum  行数
 * @param funName  具体的方法
 * @param async  加载方式（异步为true，同步为false）--更改为异步
 * @param nameValue checkbox的值
 */
function findCheckboxImp(type,url,nameStr,tdid,typeid,rowNum,funName,async,nameValue){
	var urlkx = url;
	$.ajax({
		url:urlkx+"?typeid="+typeid,
		type:"get",
		data:'',
		async:async, 
		dataType:"text",
		success:function(data){
			var o = eval(data);
			var tables = "<div ><table width='100%'   border='0'  cellpadding='0' cellspacing='0'> <tr>";
				//参数为一行时,只有一个<td>情况
			if(rowNum==1){
					 tables += "<td valign='top'>";
				}
			
			for(var i = 0; i < o.length; i++){ 
				if(rowNum==1){
					tables +="<input type='"+type+"' name='"+nameStr+"' onClick='"+funName+"'  value='"+o[i].id+"' />" +"<span>"+ o[i].id+"-"+ o[i].text+"</span>";

				}else{
					//判断td开始位置 
					if((i+1)%rowNum == 1){
						tables += "<td valign='top'>";
					}
					tables +="<input type='"+type+"' name='"+nameStr+"' onClick='"+funName+"'  value='"+o[i].id+"' />" +"<span>"+ o[i].id+"-"+ o[i].text+"</span><br>";
					//判断td结束位置
					if(((i+1)%rowNum == 0||i==o.length-1)){
						tables += "</td>";
					}
				}
				
			}
			//参数为一行时,只有一个</td>情况
			if(rowNum==1){
				 tables += "</td>";
			}
			tables += "</tr></table><div>";
			
			 $("#"+tdid).html(tables);
			 if(nameValue!=null && nameValue!=''){
				 initCheckboxCommon(nameStr, nameValue); 
			 }
		}
	});
}


/**
 * 通用字典表中的 获取复选或单选(横向顺序)
 * @param type 复选或单选类型 例如：复选  checkbox 单选 radio
 * @param url 路径
 * @param nameStr 对应input中name
 * @param tdid    对应td中的id
 * @param typeid 通用字典表中的 typeid 
 * @param colNum  列数
 * @param funName  具体的方法
 * @param async  加载方式（异步为true，同步为false）--更改为异步
 * @param nameValue checkbox的值
 * @param viewType 显示方式：1--id-text;2--text
 */
function findCheckboxImpHori(type,url,nameStr,tdid,typeid,colNum,funName,async,viewType,width,nameValue){
	var urlkx = url;
	$.ajax({
		url:urlkx+"?typeid="+typeid,
		type:"get",
		data:'',
		async:async, 
		dataType:"text",
		success:function(data){
			var o = eval(data);
			var tables = "<div ><table width='"+width+"'   border='0'  cellpadding='0' cellspacing='0'> <tr>";
			var mytds = new Array() ; 
			 
			for(var i = 0; i < colNum; i++){ 
				mytds[i] = "<td valign='top' >"
			}
			
			for(var i = 0; i < o.length; i++){ 
				if(viewType=="1"){
					mytds[i%colNum] =mytds[i%colNum] +"<input type='"+type+"' name='"+nameStr+"' onClick='"+funName+"'  value='"+o[i].id+"' />" +"<span>"+ o[i].id+"-"+ o[i].text+"</span><br>";
				}else{
					mytds[i%colNum] =mytds[i%colNum] +"<input type='"+type+"' name='"+nameStr+"' onClick='"+funName+"'  value='"+o[i].id+"' />" +"<span>"+ o[i].text+"</span><br>";
				} 
				
			}
			
			for(var i = 0; i < colNum; i++){ 
				mytds[i] = mytds[i]+"</td>";
				tables=tables+mytds[i];
			}
			 
			tables += "</tr></table><div>";
			
			 $("#"+tdid).html(tables);
			 if(nameValue!=null && nameValue!=''){
				 initCheckboxCommon(nameStr, nameValue); 
			 }
		}
	});
}



/**
 * 通用字典表中的 获取复选或单选(根据参数viewType显示不同)
 * @param type 复选或单选类型 例如：复选  checkbox 单选 radio
 * @param url 路径
 * @param nameStr 对应input中name
 * @param tdid    对应td中的id
 * @param typeid 通用字典表中的 typeid 
 * @param rowNum  行数
 * @param funName  具体的方法
 * @param async  加载方式（异步为true，同步为false）
 * @param viewType  显示方式：1--id-text;2--text
 */
function findCheckboxImpByViewType(type,url,nameStr,tdid,typeid,rowNum,funName,async,viewType){
	var urlkx = url;
	$.ajax({
		url:urlkx+"?typeid="+typeid,
		type:"get",
		data:'',
		async:async, 
		dataType:"text",
		success:function(data){
			var o = eval(data);
			var tables = "<div ><table width='100%'   border='0'  cellpadding='0' cellspacing='0'> <tr>";
				//参数为一行时,只有一个<td>情况
			if(rowNum==1){
					 tables += "<td valign='top'>";
				}
			
			for(var i = 0; i < o.length; i++){
				
				if(rowNum==1){
					tables +="<input type='"+type+"' name='"+nameStr+"' onClick='"+funName+"'  value='"+o[i].id+"' />" +"<span>"+ o[i].text+"</span>";

				}else{
					//判断td开始位置 
					if((i+1)%rowNum == 1){
						tables += "<td valign='top'>";
					}
					tables +="<input type='"+type+"' name='"+nameStr+"' onClick='"+funName+"'  value='"+o[i].id+"' />" +"<span>"+ o[i].text+"</span><br>";
					//判断td结束位置
					if(((i+1)%rowNum == 0||i==o.length-1)){
						tables += "</td>";
					}
				}
				
			}
			//参数为一行时,只有一个</td>情况
			if(rowNum==1){
				 tables += "</td>";
			}
			tables += "</tr></table><div>";
			
			 $("#"+tdid).html(tables);
			 
		}
	});
}


//其他症状 添加列宽  默认需要3列显示
function findCheckboxCol(type,url,nameStr,tdid,typeid,rowNum,funName,nameValue){
	var urlkx = url;
	$.ajax({
		url:urlkx+"?typeid="+typeid,
		type:"get",
		data:'',
		async:true, 
		dataType:"text",
		success:function(data){
			var o = eval(data);
			var tables = "<div ><table width='100%'   border='0'  cellpadding='0' cellspacing='0'>" +
					"  <colgroup><col width='33%'></col><col width='33%'></col><col width='34%'></col> </colgroup> " +
					" <tr>";
				//参数为一行时,只有一个<td>情况
			if(rowNum==1){
					 tables += "<td valign='top'>";
				}
			
			for(var i = 0; i < o.length; i++){
				
				if(rowNum==1){
					tables +="<input type='"+type+"' name='"+nameStr+"' onClick='"+funName+"'  value='"+o[i].id+"' />" +"<span>"+ o[i].id+"-"+ o[i].text+"</span>";

				}else{
					//判断td开始位置 
					if((i+1)%rowNum == 1){
						tables += "<td valign='top'>";
					}
					tables +="<input type='"+type+"' name='"+nameStr+"' onClick='"+funName+"'  value='"+o[i].id+"' />" +"<span>"+ o[i].id+"-"+ o[i].text+"</span><br>";
					//判断td结束位置
					if(((i+1)%rowNum == 0||i==o.length-1)){
						tables += "</td>";
					}
				}
				
			}
			//参数为一行时,只有一个</td>情况
			if(rowNum==1){
				 tables += "</td>";
			}
			tables += "</tr></table><div>";
			
			 $("#"+tdid).html(tables);
			 if(nameValue!=null && nameValue!=''){
				 initCheckboxCommon(nameStr, nameValue); 
			 }
		}
	});
}

/**
 * 初始化checkBox选中对应项并更改颜色
 * @param name  对应input中name
 * @param value 数据库中对应的值
 * @param color 选中后字体颜色（不更改颜色该项填""）
 */
function initCheckboxCommon(name,value,color){
	if(value==null||value==""||name==null||name==""){
		return;
	}
	var values=(value).split(",");
	var valueMap={};
	for(var i=0;i<values.length;i++){
		valueMap[values[i]]=values[i];
	}
	$(":input[name="+name+"]").each(function(){
		var v=$(this).val();
		if(valueMap[v]==v){
			$(this).attr("checked",true);
			if(color != ""){
				$(this).next().attr("style","color:"+color+";");
			}
		}
	});
	
	
	
}
/**
 * 儿少checkbox 伤害性质、伤害部位 含其他输入框
 * @param type
 * @param url
 * @param nameStr
 * @param tdid
 * @param typeid
 * @param colNum -列数
 * @param funName
 * @param async
 */
function findCheckboxEs(type,url,nameStr,tdid,typeid,colNum,funName,async,inputid,inputname){
	var urlkx = url;
	$.ajax({
		url:urlkx+"?typeid="+typeid,
		type:"get",
		data:'',
		async:async, 
		dataType:"text",
		success:function(data){
			var o = eval(data);
			var tables = "<div ><table width='100%'   border='0'  cellpadding='0' cellspacing='0'> ";
			tables +=" <colgroup><col width='16%'></col><col width='16%'></col><col width='16%'></col><col width='16%'></col><col ></col><col width='16%'></col></colgroup>";
		
			
			for(var i = 0; i < o.length; i++){
				
				
					//判断td开始位置 
					if((i+1)%colNum == 1){
						tables += "<tr>";
					}
					tables +="<td valign='top'><input type='"+type+"' name='"+nameStr+"' onClick='"+funName+"'  value='"+o[i].id+"' />" +"<span>"+ o[i].text+"</span></td>";
					
				
					//判断td结束位置
					if(((i+1)%colNum == 0||i==o.length-1)){
						//如果最后一个是其他选项，其他输入框 需要加载出来
						
						if(i==o.length-1){
							
							tables +="<td colspan='4'><input type='text' id='"+inputid+"' name='"+inputname+"' style='width:125px;height:19px;display:none;border: solid 1px #a5acb5' /></td>";
							}
						tables += "</tr>";
					}
				
				
			}
		
			tables += "</table><div>";
		
			 $("#"+tdid).html(tables);
			
		}
	});
}

/**
 * 通用字典表中的 获取 <a> 腹泻病诊断结果
 *
 * @param url 路径
 * @param nameStr 对应input中name
 * @param tdid    对应td中的id
 * @param typeid 通用字典表中的 typeid 
 * @param rowNum  行数
 * @param funName  具体的方法
 * @param async  加载方式（异步为true，同步为false）--更改为异步
 * 
 */
function findCheckboxFxbZdjg(url,tdid,typeid,rowNum,funName,async){
	var urlkx = url;
	$.ajax({
		url:urlkx+"?typeid="+typeid,
		type:"get",
		data:'',
		async:async, 
		dataType:"text",
		success:function(data){
			var o = eval(data);
			var tables = "<div ><table width='100%'   border='0'  cellpadding='0' cellspacing='0'> <tr>";
				//参数为一行时,只有一个<td>情况
			if(rowNum==1){
					 tables += "<td valign='top'>";
				}
			
			for(var i = 0; i < o.length; i++){ 
				if(rowNum==1){
					tables +="<a  href='#' onClick='"+funName+"'   >" +o[i].text+"</a>";
					
				}else{
					//判断td开始位置 
					if((i+1)%rowNum == 1){
						tables += "<td valign='top'>";
					}
					tables +="<a   href='#' onClick='"+funName+"'   >" +o[i].text+"</a><br>";

					//判断td结束位置
					if(((i+1)%rowNum == 0||i==o.length-1)){
						tables += "</td>";
					}
				}
				
			}
			//参数为一行时,只有一个</td>情况
			if(rowNum==1){
				 tables += "</td>";
			}
			tables += "</tr></table><div>";
			 $("#"+tdid).html(tables);
			
		}
	});
}

	