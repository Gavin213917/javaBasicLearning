/**
 * 脑卒中通用JS
 * @author xf
 * @date 2012 8 27
 */

_nczUI = {
		//二次录入和回访录入提交报告卡
		twoAndBackSubmit:function(subFormId,formUrl,zkdx,zkId){
		
			switch(zkdx){
				case "bgk":formUrl += "?id="+zkId+"&card=bgk";
					break;
				case "cfk":formUrl += "?id="+zkId+"&card=cfk";
					break;
				default: 
					break;
			}
			
			Ext.Ajax.request({
				url:formUrl,
				method:"post",
				form:subFormId,
				success : function(response, options) {
					Wonders.Msg.info("保存成功！");
				},
				failure : function() {
					Wonders.Msg.warn("提示","保存失败！");
				}
			});
		},
		//抽取字段
		extractField:function(subForm,formUrl,ruleId,maskId){
			formUrl += "?ruleId="+ruleId;
			//$('#'+maskId).mask('抽取中请稍后...');
			Ext.Ajax.request({
				url:formUrl,
				method:"post",
				form:subForm,
				success : function(response, options) {
					//$('#'+maskId).unmask();
					Wonders.Msg.info("抽取成功!");
				},
				failure : function() {
					//$('#'+maskId).unmask();
					Wonders.Msg.warn("提示","抽取失败！");
				}
			});
		},
		
		record:function(zkid,zkdx,gldxid){
			
			Wonders.window.show(dlg);
		},
		//全选和取消
		//第一个是checkbox的子项的Name，第二个是就是“全选”按钮的Id 
		checkedAndDeleteAllCheckBox:function(checkBoxsName,clickCheckBoxId){
			var clickCheckBox = $("#"+clickCheckBoxId);
			var checkBoxs = $("input[name='"+checkBoxsName+"']");
				checkBoxs.each(function(){
					var $checks = $(this);
					if($checks.attr("rd") != 'rd'){
						clickCheckBox.attr("checked")?$checks.attr("checked",true):$checks.removeAttr("checked");
					}
				});
			
		},
		//反选
		unCheckedAndDeleteAllCheckBox:function(checkBoxsName,clickCheckBoxId){ 
			var clickCheckBox = $("#"+clickCheckBoxId);
			var checkBoxs = $("input[name='"+checkBoxsName+"']");
				checkBoxs.each(function(index){
					var $checks = $(this);
					if($checks.attr("rd") != 'rd'){
						$checks.attr("checked")?$checks.attr("checked",false):$checks.attr("checked",true);
					}
				});
			
		},
		combineToArr:function(str){
			var strArr = new Array();
			strArr = str.split("-");
			return strArr;
		},
		//如果数据库中已经抽取过的字段，在查询的时候，就需要把该checkBox打上勾
		clickCheckBoxByDataBase:function(bgkStrFields,cfkStrFields,bgkCheckBoxName,cfkCheckBoxName){
			var bgkStrArr = _nczUI.combineToArr(bgkStrFields);
			var cfkStrArr = _nczUI.combineToArr(cfkStrFields);
			
			var checkBoxs = $("input[name='"+bgkCheckBoxName+"']");
			
			checkBoxs.each(function(){
				for(var i=0;i<bgkStrArr.length;i++){
					if($(this).val() == bgkStrArr[i]){
						$(this).attr("checked","true");
					}
				}
			
			});
			checkBoxs = $("input[name='"+cfkCheckBoxName+"']");
			checkBoxs.each(function(){
				for(var i=0;i<cfkStrArr.length;i++){
					if($(this).val() == cfkStrArr[i]){
						$(this).attr("checked","true");
					}
				}
			});
		},
		modifyValue:function(obj){
			$child = $(obj);
			$parent = $child.parent();
			//得到tr下的所有td
			$tds = $tr.children().children();
			$($tds.get(0)).html("xxx");
			$($tds.get(2)).html("xxx");
		}
		,
		
		errorReason:function(bgkfield,zkfield,i,value){
			if(value == null || value == "undefine"){
				if((bgkfield == null || bgkfield == "undefine") && (zkfield != null || zkfield != "undefine"))
				{
					return "漏报<input type='hidden' value='"+i+"-2' name='errorReason'>";
				}
				if((bgkfield != null || bgkfield != "undefine") && (zkfield == null || zkfield == "undefine")){
					return "其他<input type='hidden' value='"+i+"-3' name='errorReason'>";
				}
				if(bgkfield != zkfield){
					return "错误<input type='hidden' value='"+i+"-1' name='errorReason'>";
				}
				if(bgkfield == zkfield){
					return "正确<input type='hidden' value='"+i+"-4' name='errorReason'>";
				}
				return "其他<input type='hidden' value='"+i+"-3' name='errorReason'>";
			}else{
				if((bgkfield == null || bgkfield == "undefine") && (zkfield != null || zkfield != "undefine"))
				{
					return "漏报<input type='hidden' value='"+i+"-2' name='errorReason'>";
				}
				if((bgkfield != null || bgkfield != "undefine") && (zkfield == null || zkfield == "undefine")){
					return "其他<input type='hidden' value='"+i+"-3' name='errorReason'>";
				}
				if(bgkfield != zkfield){
					return "错误<input type='hidden' value='"+i+"-1' name='errorReason'>";
				}
				if(bgkfield == zkfield){
					return "正确<input type='hidden' value='"+i+"-4' name='errorReason'>";
				}
				return "其他<input type='hidden' value='"+i+"-3' name='errorReason'>";
			}
		},
		writeToErrorTd:function(errorReasonId,allCount,bgkId,cfkId){
			//查找一次，如果原因不是空的话，就手动加载一次，否则就是使用保存
		//	$.post("../ncz/getZkInfoByBgkId.action",{"bgkId":bgkId,"cfkId":cfkId},function(result){
			//	if(result == "YES"){ //已经存在了，那么就加载
					$.post("../ncz/getReasonById.action",{"bgkId":bgkId,"cfkId":cfkId},function(result){
						var errorReasons = result.split(",");
						var lubao = 0;//漏报 2
						var cuowu = 0;//错误 1
						var qita = 0;//其他  3
						var zhengque = 0;//正确 4
						var zongshu = 0;
						for ( var i = 0; i < errorReasons.length; i++) {
							
							var tdObject = errorReasons[i].split("-");
							if(tdObject.length == 2){
								var id = tdObject[0];
								var value = tdObject[1];
								$errorTd = $("#"+id); //得到了所有的错误td
								$tr = $errorTd.parent();
								$tds = $tr.children();
								if($tds.leng != 0 && $tds.leng != '0'){
									var $baseTdValue = $($tds.get(1)).html();
									var $newTdValue = $($tds.get(2)).html();
									$errorTd.html(_nczUI.switchValueByCode(value));
								}
								
								/**
								 * 计算漏报.错误.其他.正确总数
								 */
								if(value == '1'){
									cuowu ++;
								}else if(value == '2'){
									lubao ++;
								}else if(value == '3'){
									qita ++;
								}else if(value == '4'){
									zhengque ++;
								}
								
							}else if(tdObject.length >2){
								var id = tdObject[0];
								var value = tdObject[1];
								var reason = tdObject[2];
								$errorTd = $("#"+id); //得到了所有的错误td
								$tr = $errorTd.parent();
								$tds = $tr.children();
								if($tds.leng != 0 && $tds.leng != '0'){
									var $baseTdValue = $($tds.get(1)).html();
									var $newTdValue = $($tds.get(2)).html();
									$errorTd.html(_nczUI.switchValueByCode(value));
									$($tds.get(4)).html(reason);
								}
								
								if(value == '1'){
									cuowu ++;
								}else if(value == '2'){
									lubao ++;
								}else if(value == '3'){
									qita ++;
								}else if(value == '4'){
									zhengque ++;
								}
								
							}
							
							
						}
						zongshu = cuowu + lubao + qita +zhengque;
						$("#zongshu").html(zongshu);
						$("#cuowu").html(cuowu);
						$("#lubao").html(lubao);
						$("#qita").html(qita);
						$("#zhengque").html(zhengque);
					});
				//}
			//});
			
		},
		updateErrorReason:function(obj,index,ids,bgkId){
			//没有完成对比的话是不允许进行修改的
			$.post("../ncz/canUpdate.action?",{"bgkZkId":bgkId},function(result){
				if(result == "YES"){
					if(index == 1){
						//打开				
						//var obj = Ext.getCmp('updateWindow');
						//obj.show();
						var win = document.getElementById("updateWindow");
						win.style.className = "updateWindow";
						win.style.display = "block";
						win.style.position = "absolute";
						win.style.width = "300px";
						win.style.height = "110px";
						win.style.zIndex = "1000";
						win.style.backgroundColor = "#D4E7FF";
						win.style.border = "5px";
						win.style.borderColor = "#7CBFD8";
						win.style.borderStyle = "solid";
						win.style.left =  document.documentElement.scrollLeft+150 + "px";
						win.style.top = document.documentElement.scrollTop +150 + "px";
						$("#index").val(ids);
						$("#bktype").val(obj);
						$("#reasonText").val("");
					}else if(index == 2){
						//修改
						var reasonIndexs = document.getElementsByName("reasons");
						var reasonIndex = 0;
						var reasonText = $("#reasonText").val(); //从前台传过来的错误原因
						var bktype = $("#bktype").val();
						for ( var i = 0; i < reasonIndexs.length; i++) {
							var but = reasonIndexs[i];
							if(but.checked == true){
								reasonIndex = but.value;
							}
						}
						//修改后台
						$.post("../ncz/updateErrorReason.action",{"ids":ids,"bgkId":bgkId,"otherReason":reasonIndex,"reasonText":reasonText,"bkType":bktype},function(result){
							var win = document.getElementById("updateWindow");
							win.style.display = "none";
							//如果成功，那么就修改前台
							//修改前台
							var $errorReason = $("#"+ids);
							var choose = _nczUI.switchValueByCode(reasonIndex);  //从前台传过来的错误选项
							$errorReason.html(choose);
							var $otherReason =  $("#"+ids+"_"); 
							$otherReason.html(reasonText);
							
							Wonders.Msg.info("修改成功!");
						});
						
					}
				}else{
					Wonders.Msg.info("没有进行数据比对，请进行数据比对后进行修改!");
					return;
				}
			});
		},
		switchValueByCode:function(index){
			var result = "";
			switch(index){
				case "1" : result = "错误"; break;
				case "2" : result = "漏报"; break;
				case "3" : result = "其他"; break;
				case "4" : result = "正确"; break;
			}
			return result;
		},
		closeDiv:function(obj){
			$(obj).click(function(){
				$("#updateWindow").attr("style","display:none");
			});
		},
		openWindow:function(title,url,width,height){
			var win = new window.parent.Ext.Window({
	            title:title,
	            width:width,
	            height:height,
	            draggable:true,
	            constrain:false,//将拖动范围限制在容器内
	            autoDestroy:false,
	            closeAction:'hide',
	            modal : true,
	            isTopContainer : true,
	            url:url,
	            resizable : false,
	            contentEl : Ext.DomHelper.append(document.body, {
	                tag : 'iframe',
	                style : "border 0px none;scrollbar:true",
	                src : url,
	                height : "100%",
	                width : "100%"
	               })
	        });        
			win.show(); 
		}
};



//---------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------jsp前台排序---------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------//

/**用法
<table border="1" id="table1">
			<thead>
				<tr>
					<th width="10%" onClick="sortTable('table1','str',this,1,0)" sortType="desc">字段</th>
					<th width="7%"  onClick="sortTable('table1','num',this,1,0)" sortType="desc">不符</th>
				</tr>
			</thead>
</table>			

**/


var http_request = false;   
function initRequest(){   
	http_request = false;   
	//initialize XMLHttpRequest object   
	if(window.XMLHttpRequest){//Mozilla browser   
	  http_request = new XMLHttpRequest();   
	  if(http_request.overrideMimeType){//MiME type   
	   http_request.overrideMimeType("text/xml");   
	  }   
	}   
	else if (window.ActiveXObject){//IE browser   
	  try {   
	   http_request = new ActiveXObject("Msxml2.XMLHTTP");   
	  }catch (e) {   
	   try {   
	    http_request = new ActiveXObject("Microsoft.XMLHTTP");   
	   } catch (e) {}   
	  }   
	}   
	if (!http_request){ // cann't initialize XMLHttpRequest object   
	  window.alert("cann't initialize XMLHttpRequest object instance");   
	  return false;   
	}   
}   


function byId(str){   
	return document.getElementById(str);   
}   

function byName(str){   
	return document.getElementsByName(str);   
}   

function byTagName(str){   
	return document.getElementsByTagName(str);   
}   

//check browser type: IE ,FireFox...   
var isIE = false;   
function checkType(){   
	if(document.all){   
	  	isIE = true;   
	}   
}   

/**   
计算包含中文的长度   
*/   
function strlen(str){   
	return str.replace(/[^\x00-\xff]/g,"**").length;   
} 
  
//设置查询结果iframe的高度,让它的横向滚动条显示在浏览器的最下方   
function changeHeight(hei){   
	//document.getElementById("resultHeight").height = hei;   
	var he = document.body.clientHeight;   
	var obj = document.getElementById("resultHeight");   
	var rec = getoffset(obj);   
	if(he<rec[0]) return;   
	obj.height = he - rec[0];   
}   

//获得元素的绝对位置,返回一个数组,长度为2,rec[0]为top value(距离网页顶端的px),rec[1]为left value(距离网页左边的px)   
function getoffset(e)    
{     
  var t=e.offsetTop;     
  var l=e.offsetLeft;     
  while(ee=e.offsetParent)    
  {     
   t+=e.offsetTop;     
   l+=e.offsetLeft;     
  }     
  var rec = new Array(1);    
  rec[0]  = t;    
  rec[1] = l;    
  return rec;    
}   

/*   
判断是否为整数,例如:   
isNumber("+1234");返回true;   
isNumber("-1234");返回true;   
isNumber("1234");返回true;   
也就是说输入的数可以为正整数（前面可以有+号，也可以没有），也可以为负整数   
*/   
function isNumber(str){   
	var pattern = /^[+-]{0,1}\d+$/;   
		if(pattern.test(str)){   
			  return true;   
		}   
	return false;   
}  

 
/*   
判断是否为小数,例如:   
isNumber("+1234.00");返回true;   
isNumber("-1234.01");返回true;   
isNumber("1234.11");返回true;   
也就是说输入的数可以为正数（前面可以有+号，也可以没有），也可以为负数   
*/   
function isDec(str){   
	var pattern = /^[+-]{0,1}\d+\.{0,1}\d*$/;   
	if(pattern.test(str)){   
	  	return true;   
	}   
	else{   
	 	 return false;   
	}	   
}   


/*   
给String增加trim函数,用法如下:   
var str = "  test  ".trim();   
这样得到的str的内容就是test   
*/   
String.prototype.trim=function(){   
	return this.replace(/(^\s*)|(\s*$)/g,"");   
};   


/*   
表格排序,参数说明   
id : 待排序的表格的名称   
type : 排序的类型(num:按数字;str:按字符串)   
obj : 排序的列(使用的时候写入this即可)   
start : 排序的起始行(主要是去掉无须排序的其它行)   
end : table最后无需参与排序的行数   
例如:   
需要对table1进行排序,由于第一行是表头,所以不参与排序,其余行全部都需要参与排序,所以写法如下,需要增加一个sortType   
<td onClick="sortTable('tableId','str',this,1,0,'tableThName')" sortType="asc">  
*/   
function sortTable(id,type,obj,start,end) {   
	var tblEl = document.getElementById(id);   
	var i, j;   
	var minVal, minIdx;   
	var testVal;   
	var cmp;   
	var col = obj.cellIndex;   
	//var start = 1;   
	var total = new Array();   
	var str = new Array();   
	var order = obj.sortType;   
	var rowCount = tblEl.rows.length;//得到行数   
	if (isNaN(rowCount) || rowCount==start) return;//没有纪录就不需要排序了   
	for(i = start;i<rowCount - end;i++)   
	{   
	  total[i - start] = tblEl.rows[i];   
	  str[i - start] = tblEl.rows[i].cells[col].innerText.trim();   
	}   
	for (var step = str.length >> 1; step > 0; step >>= 1)   
	    {   
	        for (var i = 0; i < step; ++i)   
	        {   
	            for (var j = i + step; j < str.length; j += step)   
	            {   
	                var k = j;   
	                var value = str[j];   
	                var rowValue = total[j];   
	                while (k >= step && compareValues(str[k - step],value,type,order) > 0 )   
	                {   
	                    str[k] = str[k - step];   
	                    total[k] = total[k - step];   
	                    k -= step;   
	                }   
	                str[k] = value;   
	                total[k] = rowValue;   
	            }   
	        }   
	    }   
	for(i = 0;i<total.length;i++)   
	{   
		//tblEl.rows[start - 1].insertAdjacentElement("beforeEnd",total[i]);   
		tblEl.rows[start - 0].insertAdjacentElement("beforeBegin",total[i]);   
	}   
	if(order=="asc"){   
	  	obj.sortType = "desc";
	    updateBackgroundImage();
	    obj.style.backgroundImage = "url(../images/tb_asc.png)";
	    //在这里设置Head上的图标 向下
	}   
	else{   
	  	obj.sortType = "asc";
	    updateBackgroundImage(); 
	    obj.style.backgroundImage = "url(../images/tb_desc.png)";
		//在这里设置Head上的图标 向上
	  
	  	
	}   
}   


function compareValues(v1, v2,type,order) {   
	var f1, f2;   
	if(v1=="" && order=="asc") {   
	  return 1;//如果内容为空,排序时就放置在最后一行   
	}   
	if(v2=="" && order=="asc") {   
	  return -1;//如果内容为空,排序时就放置在最后一行   
	}   
	if (type=="num"){   
	  re = /,/g;   
	  v1v1 = v1.replace(re,"");   
	  v2v2 = v2.replace(re,"");   
	  if (isDec(v1)){   
	  	 v1 = parseFloat(v1);   
	  }   
      
	  if (isDec(v2)){   
	  	 v2 = parseFloat(v2);   
	  }   
	}   
    
	if (v1 == v2) {   
	return 0;   
	}   
	if (v1 > v2){   
	  if(order=="asc"){   
	      
	   return 1;   
	  }   
	  else{   
	   return -1;   
	    
	  }   
	}   
	else{   
	  if(order=="asc"){   
	   return -1;   
	  }   
	  else{   
	   return 1;   
	    
	  }   
	}   
}   
function updateBackgroundImage(){
	var ths = document.getElementsByTagName("th");
	for(var i=0;i<ths.length;i++){
		ths[i].style.backgroundImage = "url(../images/tb_nomal.png)";
	}
}
 	


//---------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------------------------------table tr变色---------------------------------------------------------------//
//---------------------------------------------------------------------------------------------------------------------------------------------//
/**
 * 用法  每个TR -->  <tr onClick="changeColorByTablesTr(this,'tableId')">
 */

//第一个是tr对象，第二个是table的ID
var sample = function(id){return document.getElementById(id);};
function changeColorByTablesTr(obj,tableId,bgBefore,bgAfter){
    if(!sample(tableId).trcolor)
    {
    	sample(tableId).trcolor=obj;
    	obj.style.backgroundColor=bgBefore;
    	return;
    }
    sample(tableId).trcolor.style.backgroundColor=bgAfter;
    obj.style.backgroundColor=bgBefore;
    sample(tableId).trcolor=obj;
}


//拖动一个DIV



