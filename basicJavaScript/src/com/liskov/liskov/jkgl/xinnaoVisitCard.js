/* inputSelectAjax的全局变量 */
// URL
//---地址所需


//ParentID
var neighborhoodsParentId = "street4";

//诊断单位
var zddw1Url = "getAllYljgdm.action";
var zddw2Url = "getAllYljgdm.action";
var zddw3Url = "getAllYljgdm.action";
var zddw4Url = "getAllYljgdm.action";
var zddw5Url = "getAllYljgdm.action";

//ICD编码
var icdUrl ='getIcdCodeList.action';
function bodyinit(){
init();
	var todaystring = gettodaystring();
	$("#tbJkglXnSfksfsj").val(todaystring);
	if($("#sfui").val()!=null&&$("#sfui").val()!=""){
		$("#buttonfanhui").hide();
	}
}

function gettodaystring(){
	var today=new Date();
	var todaymonth=eval(today.getMonth()+1);
	var todaymonthstring="0"+String(todaymonth);
	if(todaymonth>9){
		todaymonthstring =String(todaymonth);
	}
	var todaydate=today.getDate();
	var todaydatestring=String(todaydate);
	if(todaydate<10){
		todaydatestring ="0"+String(todaydate);
	}
	var todaystring=String(today.getYear())+"-"+todaymonthstring+"-"+todaydatestring;
	return todaystring;
}
//展示卡氏评分参照表
function showkashipingfenbiao(){
	$("#kashipingfenbiao").show();
	document.getElementById("kashipingfenbiaoframe").style.height = document.getElementById("kashipingfenbiao").offsetHeight;
	$("#kashipingfenbiaoframe").show();
}
//隐藏卡氏评分参照表
function closekashipingfenbiao(){
	$("#kashipingfenbiao").hide();
	$("#kashipingfenbiaoframe").hide();
}
//添加或去掉 历史诊断信息的输入框
function changefabingcishu(str){
	var tempvalue=$("#fabingcishu").val();
	var temp1 = parseInt(tempvalue)+1;
	if(str=='1'||str==1){//添加
		if(temp1 >5){
			return;
		}else{
			$("#di"+temp1+"cizhenduan").removeAttr("disabled").show();
			$("#fabingcishu").val(temp1);
		}
	}else if(str=='2'||str==2){//删除
		if(temp1 < 2){
			return;
		}else{
			var temp2= temp1-1;
			$("#di"+temp2+"cizhenduan").hide().attr("disabled","disabled");
			$("#fabingcishu").val(temp2-1);
		}
	}else{
		return;
	}
}
//诊断依据的1-7选择，只允许输入1-7
function checkonetoseven(obj){
	obj.value = obj.value.replace(/[^1-7]/g,'');
}
//更改转归状态，显示或隐藏一些区域
function changezgzt(obj){
	var objvalue=String(obj.value);
	$("#suifangneirongtable").hide();
	if(objvalue=='1'){//继续随访
		$("#suifangneirongtable").removeAttr("disabled").show();//随访详细内容显示
		$("#qcButton").hide();//查看并编辑的按钮隐藏
		$("#tbJkglXnSfkzgyy").hide().attr("disabled","disabled");//转归原因隐藏
		$("#qcdz").hide().attr("disabled","disabled");//迁出地址的div隐藏
		$("#qcdzframe").hide().attr("disabled","disabled");//迁出地址的iframe隐藏
		$("#siwangxinxiTable").hide().attr("disabled","disabled");//死亡相关信息 隐藏
		$("#hiddenzdfbjl").attr("disabled","disabled");//历史发病记录 disable
	}else if(objvalue=='2'){//迁出
		$("#suifangneirongtable").removeAttr("disabled").show();
		$("#qcButton").show();
		$("#tbJkglXnSfkzgyy").hide().attr("disabled","disabled");
		$("#qcdz").removeAttr("disabled").show();
		$("#qcdzframe").removeAttr("disabled").show();
		$("#siwangxinxiTable").hide().attr("disabled","disabled");
		$("#hiddenzdfbjl").attr("disabled","disabled");
	}else if(objvalue=='3'||objvalue=='4'||objvalue=='5'){//死亡//失访//拒防
		$("#suifangneirongtable").hide().attr("disabled","disabled");
		$("#qcButton").hide();
		$("#tbJkglXnSfkzgyy").removeAttr("disabled").show();
		$("#qcdz").hide().attr("disabled","disabled");
		$("#qcdzframe").hide().attr("disabled","disabled");
		if(objvalue=='3'){
			$("#siwangxinxiTable").removeAttr("disabled").show();
		}else{
			$("#siwangxinxiTable").hide().attr("disabled","disabled");
		}
		$("#hiddenzdfbjl").removeAttr("disabled");
	}else if(objvalue=='6'){//暂时性失访		$("#suifangneirongtable").hide().attr("disabled","disabled");
		$("#qcButton").hide();
		$("#tbJkglXnSfkzgyy").hide().attr("disabled","disabled");
		$("#qcdz").hide().attr("disabled","disabled");
		$("#qcdzframe").hide().attr("disabled","disabled");
		$("#siwangxinxiTable").hide().attr("disabled","disabled");
		$("#hiddenzdfbjl").removeAttr("disabled");
	}else{
		return;
	}
}
//点击迁出地址中的四种地址类型左边的checkbox事件
function checkqcdz(obj){
	var objid=obj.id;
	var objtd=objid+"td";//"checkbox4"->"checkbox4td"。
	if(obj.checked==false){
		$(obj.parentNode.parentNode).find(":input").attr("disabled","disabled");
		$(obj).removeAttr("disabled");
		return;
	}else{
		$(obj.parentNode.parentNode).find(":input").removeAttr("disabled");
		$("#personAddresssysid").val("");
		var addressinfosize = $("#addressinfosize").val();//原有地址条数。
		for(var i=0;i<addressinfosize;i++){//把已激活改成激活按钮
			var tempid="activebutton"+i;
			if($("#"+tempid).val()=="已激活"){
				$("#"+tempid).removeAttr("disabled").val("激活现住").attr("title","激活此地址为现住地址");
			}
		}
		
		var tempi=parseInt(objid.replace("checkbox",""));
		for(var i=1;i<=4;i++){//把其它选中效果去除
			if(i==tempi){
				continue;
			}
			if(document.getElementById("checkbox"+i).checked==true){
				document.getElementById("checkbox"+i).checked=false;
				$(document.getElementById("checkbox"+i).parentNode.parentNode).find(":input").attr("disabled","disabled");
				$(document.getElementById("checkbox"+i)).removeAttr("disabled");
			}
		}
	}
}
//迁出地址录入框 检验地址是否选择及是否完整。
function setqcdz(){
	var tempi=0;
	var flag=false;
	for(var i=1;i<=4;i++){
		if(document.getElementById("checkbox"+i).checked==true){
			tempi=i;
		}
	}
	if(tempi==1){//地名
		var street1=$("#street1").val();
		var lu=$("#checkbox1tdlu").val();
		var nong=$("#checkbox1tdnong").val();
		var hao=$("#checkbox1tdhao").val();
		var shi=$("#checkbox1tdshi").val();
		if(street1==""||lu==""||nong==""||hao==""||shi==""){
			return flag;
		}else{
			flag=true;
			$("#personAddresspaType").val("1");
			$("#personAddresspaTown").val(street1);
			$("#personAddresspaNeighborhood").val("");
			$("#personAddresspaVillage").val("");
			$("#personAddresspaRoad").val(lu);
			$("#personAddresspaAlley").val(nong);
			$("#personAddresspaUnit").val(hao);
			$("#personAddresspaRoom").val(shi);
		}
	}else if(tempi==2){//小区
		var neighborhoods=$("#neighborhoods").val();
		var hao=$("#checkbox2tdhao").val();
		var shi=$("#checkbox2tdshi").val();
		var street4=$("#street4").val();
		if(hao==""||shi==""||neighborhoods==""||street4==""){
			return flag;
		}else{
			flag=true;
			$("#personAddresspaType").val("2");
			$("#personAddresspaTown").val(street4);
			$("#personAddresspaNeighborhood").val(neighborhoods);
			$("#personAddresspaVillage").val("");
			$("#personAddresspaRoad").val("");
			$("#personAddresspaAlley").val("");
			$("#personAddresspaUnit").val(hao);
			$("#personAddresspaRoom").val(shi);
		}
	}else if(tempi==3){//农村
		var street2=$("#street2").val();
		var hao=$("#checkbox3tdhao").val();
		var dui=$("#checkbox3tddui").val();
		var village=$("#village").val();
		if(street2==""||hao==""||dui==""||village==""){
			return flag;
		}else{
			flag=true;
			$("#personAddresspaType").val("3");
			$("#personAddresspaTown").val(street2);
			$("#personAddresspaNeighborhood").val("");
			$("#personAddresspaVillage").val(village);
			$("#personAddresspaRoad").val(dui);
			$("#personAddresspaAlley").val("");
			$("#personAddresspaUnit").val(hao);
			$("#personAddresspaRoom").val("");
		}
	}else{
		$("#personAddresspaType").val("");
		if(tempi==4){//外区
			flag=true;
			$("#personAddresspaType").val("4");
		}else{
			if($("#personAddresssysid").val()==""){
				return flag;
			}else{
				flag=true;
			}
		}
		$("#personAddresspaTown").val("");
		$("#personAddresspaNeighborhood").val("");
		$("#personAddresspaVillage").val("");
		$("#personAddresspaRoad").val("");
		$("#personAddresspaAlley").val("");
		$("#personAddresspaUnit").val("");
		$("#personAddresspaRoom").val("");
	}
	return flag;
}
//迁出地址录入框，点击确认触发检验事件并弹出提示框。function querenqcdz(){
	var flag=true;
	if(flag){
		$("#qcdzsfwz").val("1");//迁出地址是否完整赋值为1
		$("#qcdz").hide();//隐藏地址录入框的div
		$("#qcdzframe").hide();//隐藏地址录入框的iframe
	}else{
		$("#qcdzsfwz").val("0");
		alert("您未选择迁出地址或激活原有地址，或迁出地址不完善！");
	}
}
//迁出地址录入框，点击关闭触发检验事件但不弹出提示框。function closeqcdz(){
	var flag=true;
	if(flag){
		$("#qcdzsfwz").val("1");
	}else{
		$("#qcdzsfwz").val("0");
	}
	$("#qcdz").hide();
	$("#qcdzframe").hide();
}
//激活原地址
function activeOldAddress(obj,str){
	var objid=obj.id;//id="activebutton+<s:property value="#stat.index" />"
	var index=parseInt(objid.replace("activebutton",""));
	var addressinfosize = $("#addressinfosize").val();//原有地址条数。	for(var i=0;i<addressinfosize;i++){//取消其它已激活状态		if(i==index){
			continue;
		}
		var tempid="activebutton"+i;
		if($("#"+tempid).val()=="已激活"){
			$("#"+tempid).removeAttr("disabled").val("激活现住").attr("title","激活此地址为现住地址");
		}
	}
	for(var i=1;i<=4;i++){//取消迁出地址的选择
		if(document.getElementById("checkbox"+i).checked==true){
			document.getElementById("checkbox"+i).checked=false;
			$(document.getElementById("checkbox"+i).parentNode.parentNode).find(":input").attr("disabled","disabled");
			$(document.getElementById("checkbox"+i)).removeAttr("disabled");
		}
	}
	obj.value="已激活";
	obj.title="此地址已激活待提交";
	obj.disabled=true;
	$("#personAddresssysid").val(str);
}
//更改慢性病因素
function changemxbwxys(str,obj){
	var strint=parseInt(str);
	var objvalue=obj.value;
	var temp1=$("#tbJkglXnSfkmxbwxys").val();
	var temp2=temp1.substring(0,strint-1)+objvalue+temp1.substring(strint);
	$("#tbJkglXnSfkmxbwxys").val(temp2);
}
//更改行为及其他因素function changexwjqtwxys(str,obj){
	var strint=parseInt(str);
	var objvalue=obj.value;
	var temp1=$("#tbJkglXnSfkxwjqtwxys").val();
	var temp2=temp1.substring(0,strint-1)+objvalue+temp1.substring(strint);
	$("#tbJkglXnSfkxwjqtwxys").val(temp2);
}
//更改主要障碍
function changezyza(str,obj){
	var strint=parseInt(str);
	var value="0";
	if(obj.checked==true){
		value="1";
	}
	var temp1=$("#tbJkglXnSfkzyza").val();
	var temp2=temp1.substring(0,strint-1)+value+temp1.substring(strint);
	$("#tbJkglXnSfkzyza").val(temp2);
}
//更改指导内容
function changezdnr(str,obj){
	var strint=parseInt(str);
	var value="0";
	if(obj.checked==true){
		value="1";
	}
	var temp1=$("#tbJkglXnSfkzdnr").val();
	var temp2=temp1.substring(0,strint-1)+value+temp1.substring(strint);
	$("#tbJkglXnSfkzdnr").val(temp2);
}
//更改 有无复发 时的响应事件
function changeywff(obj){
	if(obj.value==1||obj.value=='1'){
		$("#fufabingshi1").removeAttr("disabled").show();
		$("#fufabingshi2").removeAttr("disabled").show();
	}else{
		$("#fufabingshi1").hide().attr("disabled","disabled");
		$("#fufabingshi2").hide().attr("disabled","disabled");
	}
}
//检验 诊断依据填入的内容，并封装成 0010001 类型的值付给 zdyj字段
function checkzdyjbz(obj){
	var objvalue=obj.value;
	if(objvalue==""){
		return;
	}
	var objid=obj.id;
	var length=objvalue.length;
	if(length<2){//只有1位		var tempid = objid.replace("bz","");
		var tempvalue = $("#"+tempid).val();
		var objintvalue = parseInt(objvalue);
		tempvalue = tempvalue.substring(0,objintvalue-1)+"1"+tempvalue.substring(objintvalue,tempvalue.length);
		$("#"+tempid).val(tempvalue);
	}else{
		for(var i=0;i<length;i++){
			var num = 1;
			for(var j=i+1;j<objvalue.length;j++){
				if(objvalue.substring(j,j+1)==objvalue.substring(i,i+1)){
					num += 1;
				}
			}
			if(num > 1){
				alert("诊断依据输入内容有重复，请重输!");
				obj.value="";
				return;
			}
			var tempint=parseInt(objvalue.substring(i,i+1));
			var tempid = objid.replace("bz","");
			var tempvalue = $("#"+tempid).val();
			tempvalue = tempvalue.substring(0,tempint-1)+"1"+tempvalue.substring(tempint,tempvalue.length);
			$("#"+tempid).val(tempvalue);
		}
	}
}
//校验 卡氏评分、并进行四舍五入操作。function checkkspf(obj){
	if(obj.value==""){
		return;
	}
	var objvaluetemp=parseInt(obj.value);
	var objvalue = objvaluetemp+"";
	var length=objvalue.length;
	if(length==1){
		if((parseInt(objvalue))<5){
			obj.value="0";
		}else{
			obj.value="10";
		}
	}else if(length==2){
		var temp1=parseInt(objvalue.substring(0,1));
		var temp2=parseInt(objvalue.substring(1,2));
		if(temp2<5){
		}else{
			temp1 = temp1+1;
		}
		temp2 = 0;
		obj.value=	temp1+""+temp2;
	}else if(length==3){
		var temp1=parseInt(objvalue.substring(0,1));
		var temp2=parseInt(objvalue.substring(1,2));
		var temp3=parseInt(objvalue.substring(2,3));
		if(temp1>0){
			obj.value = "100";
		}else{
			if(temp3<5){
			}else{
				temp2 = temp2+1;
			}
			temp3 = 0;
			obj.value=	temp2+""+temp3;
		}
	}else {
		obj.value = "100";
	}
}
//选择其它的，实现对应的输入具体内容框的展示或隐藏。function changeshowhide(obj,value){
	if(obj.value==value){
		$(obj.parentNode).find(":input").last().show().removeAttr("disabled");
	}else{
		$(obj.parentNode).find(":input").last().hide().attr("disabled","disabled");
	}
}
//诊断单位选择市内、其它的改变
function changezddwselect(obj){
	var objid = obj.id;
	var idnum = objid.replace('zddwselect','');
	var objvalue = obj.value;
	if(objvalue=='1'){//就诊医院选择市内
		document.getElementById("zddw"+idnum+"Label").disabled=false;
		document.getElementById("zddw"+idnum+"Label").style.display="inline";
		document.getElementById("zddw"+idnum).disabled=false;
		document.getElementById("zddwqt"+idnum).disabled=true;
		document.getElementById("zddwqt"+idnum).style.display="none";
	}else{//就诊医院选择其它
		document.getElementById("zddwqt"+idnum).disabled=false;
		document.getElementById("zddwqt"+idnum).style.display="inline";
		document.getElementById("zddw"+idnum).disabled=true;
		document.getElementById("zddw"+idnum+"Label").disabled=true;
		document.getElementById("zddw"+idnum+"Label").style.display="none";
	}
}
//页面提交校验
function commit(obj){
	soluteLiveAddressList();
	$(obj).attr("disabled","disabled");
	var errorMessage = "";
	var onFocusElement = null;
	if($("#tbJkglXnSfksfsj").val()==""){
	    errorMessage += "【本次随访记录日期】未填写，请填写;\n"; 
	    if (onFocusElement == null) {
			onFocusElement = document.getElementById('tbJkglXnSfksfsj');
		}
	}
	var zgzt=$("#tbJkglXnSfkzgzt").val();
	if(zgzt=="1"||zgzt=="2"){
		if(zgzt=="2"&& $("#qcdzsfwz").val()=="0"){
	        errorMessage += "转归【2--迁出】的迁出地址未选择或不完善，请完善;\n"; 
	    }
	    if($("#tbJkglXnSfkzdxx").val()==""){
	        errorMessage += "【本次诊断信息】未选择，请选择;\n"; 
	        if (onFocusElement == null) {
				onFocusElement = document.getElementById('bencizhenduanxinxings');
			}
	    }
	    var fbcs=parseInt($("#fabingcishu").val());//添加的诊断信息次数	    if(fbcs>0){
	    	for(var i=1;i<=fbcs;i++){
	    		var id="di"+i+"cizhenduan";
	    		var items= (document.getElementById(id)).getElementsByTagName("INPUT");
	    		var flag = true;
	    		for (var j=0;j<items.length;j++){
	    			var temp = items[j];
	    			if(temp.disabled==true){
	    				continue;
	    			}
	    			if(temp.value==""||temp.value=="请输入"||temp.value=="请参照备注"){
	    				flag = false;
	    				if (onFocusElement == null) {
							onFocusElement = temp;
						}
	    			}
	    		}
	    		if(flag==false){
	    			var name = items[0].value;
	    			errorMessage += "【第"+name+"次诊断】不完善，请完善;\n"; 
	    		}
	    	}
	    }
	    var qcxj=document.getElementById("jxxjgs").checked;
	 
	    if(qcxj==true||qcxj=="true"){
	    
	    if($("#tbJkglXnSfkqcxjgs").val()==""){
	        errorMessage += "【前次心肌梗死】未选择，请选择;\n"; 
	        if (onFocusElement == null) {
				onFocusElement = document.getElementById('tbJkglXnSfkqcxjgs');
			}
	    }
	    }
	    if($("#qitaxinzangbing").val()=="1"){
	     	  if($("#tbJkglXnSfkmxbwxysqt").val()==""){
	     	   	errorMessage += "其他心脏病【有】具体内容未填写，请填写;\n"; 
	       	 	if (onFocusElement == null) {
					onFocusElement = document.getElementById('tbJkglXnSfkmxbwxysqt');
				}
	        }
		}
		if($("#qita").val()=="1"){
	     	  if($("#tbJkglXnSfkxwjqtwxysqt").val()==""){
	     	   	errorMessage += "其他行为因素【有】具体内容未填写，请填写;\n"; 
	       	 	if (onFocusElement == null) {
					onFocusElement = document.getElementById('tbJkglXnSfkxwjqtwxysqt');
				}
	        }
		}
	    if($("#tbJkglXnSfkzyza").val()=="00000"){
	        errorMessage += "【主要障碍】未选择，请选择;\n"; 
	    }else if(document.getElementById('zyzaqtcheck').checked==true){
	    	if($("#tbJkglXnSfkzyzaqt").val()==""){
	    		errorMessage += "主要障碍【其它】未填写，请填写;\n"; 
	       	 	if (onFocusElement == null) {
					onFocusElement = document.getElementById('tbJkglXnSfkzyzaqt');
				}
	    	}
	    }
	    if($("#tbJkglXnSfkzdnr").val()=="000000"){
	        errorMessage += "【指导内容】未选择，请选择;\n"; 
	    }else if(document.getElementById('zdnrqtcheck').checked==true){
	    	if($("#tbJkglXnSfkzdnrqt").val()==""){
	    		errorMessage += "指导内容【其它】未填写，请填写;\n"; 
	       	 	if (onFocusElement == null) {
					onFocusElement = document.getElementById('tbJkglXnSfkzdnrqt');
				}
	    	}
	    }
	    if($("#tbJkglXnSfkksdf").val()==""){
	        errorMessage += "【卡氏评分】未填写，请填写;\n"; 
	        if (onFocusElement == null) {
				onFocusElement = document.getElementById('tbJkglXnSfkksdf');
			}
	    }
//	    if($("#tbJkglXnSfkjdbs").val()==""){
//	        errorMessage += "【简单病史】未填写，请填写;\n"; 
//	        if (onFocusElement == null) {
//				onFocusElement = document.getElementById('tbJkglXnSfkjdbs');
//			}
//	    }
	    
	}else if(zgzt=="3"||zgzt=="4"||zgzt=="5"||zgzt=="6"){
		if(zgzt!="6"&& ($("#tbJkglXnSfkzgyy").val()==""||$("#tbJkglXnSfkzgyy").val()=="请注明原因...")){
	        errorMessage += "转归的【原因】为空，请填写;\n"; 
	        if (onFocusElement == null) {
				onFocusElement = document.getElementById('tbJkglXnSfkzgyy');
			}
	    }
	    if(zgzt=="3"){
	        if($("#tbJkglXnSfkswrq").val()==""){
	        	errorMessage += "【死亡日期】未填写，请填写;\n"; 
	        	if (onFocusElement == null) {
					onFocusElement = document.getElementById('tbJkglXnSfkswrq');
				}
	   		}
	    	if($("#tbJkglXnSfkswdd").val()=="9"){
	     	   if($("#tbJkglXnSfkswddqt").val()==""){
	     	   		errorMessage += "死亡地点【9--其它】具体内容未填写，请填写;\n"; 
	       	 		if (onFocusElement == null) {
						onFocusElement = document.getElementById('tbJkglXnSfkswddqt');
					}
	        	}
			}
			if($("#tbJkglXnSfkzysy").val()==""){
	        	errorMessage += "【主要死因】未选择，请选择;\n"; 
	        	if (onFocusElement == null) {
					onFocusElement = document.getElementById('tbJkglXnSfkzysy');
				}
	    	}else if($("#tbJkglXnSfkzysy").val()=="6"){
	        	if($("#tbJkglXnSfkzysyqt").val()==""){
	     	   		errorMessage += "主要死因【6--其它】具体内容未填写，请填写;\n"; 
	       	 		if (onFocusElement == null) {
						onFocusElement = document.getElementById('tbJkglXnSfkzysyqt');
					}
	        	}
	    	}
	    	if($("#icd").val()==""){
	        	errorMessage += "【ICD编码】未填写，请填写;\n"; 
	        	if (onFocusElement == null) {
					onFocusElement = document.getElementById('icdLabel');
				}
	   		}
	    }
	}
	
	if($("#tbJkglXnSfksfdw").val()==""){
	    errorMessage += "【随访单位】未选择，请选择;\n"; 
	    if (onFocusElement == null) {
			onFocusElement = document.getElementById('tbJkglXnSfksfdw');
		}
	}
	
	if (errorMessage != "") {
		alert(errorMessage);
		if (onFocusElement != null) {
			onFocusElement.focus();
		}
		$(obj).removeAttr("disabled");
	}else{
		if(confirm("确认提交么？")){
			for(var i=1;i<6;i++){
				if(document.getElementById('zddwselect'+i).value=='0'){//第i个添加的诊断单位选择其它
					document.getElementById('zddw'+i).disabled=false;
					document.getElementById('zddw'+i).value='0';//诊断单位代码置为0
				}
			}
			document.forms[0].submit();
	    }else{
	    	$(obj).removeAttr("disabled");
	    }
	}
}
//修改时的页面校验
function commitupdate(obj){
	$(obj).attr("disabled","disabled");
	var errorMessage = "";
	var onFocusElement = null;
	if($("#tbJkglXnSfksfsj").val()==""){
	    errorMessage += "【本次随访记录日期】未填写，请填写;\n"; 
	    if (onFocusElement == null) {
			onFocusElement = document.getElementById('tbJkglXnSfksfsj');
		}
	}
	var zgzt=$("#tbJkglXnSfkzgzt").val();
	if(zgzt=="1"||zgzt=="2"){
	    if($("#tbJkglXnSfkzdxx").val()==""){
	        errorMessage += "【本次诊断信息】未选择，请选择;\n"; 
	        if (onFocusElement == null) {
				onFocusElement = document.getElementById('bencizhenduanxinxings');
			}
	    }
	    var fbcs=parseInt($("#fabingcishu").val());//添加的诊断信息次数
	    if(fbcs>0){
	    	for(var i=1;i<=fbcs;i++){
	    		var id="di"+i+"cizhenduan";
	    		var items= (document.getElementById(id)).getElementsByTagName("INPUT");
	    		var flag = true;
	    		for (var j=0;j<items.length;j++){
	    			var temp = items[j];
	    			if(temp.disabled==true){
	    				continue;
	    			}
	    			if(temp.value==""||temp.value=="请输入"||temp.value=="请参照备注"){
	    				flag = false;
	    				if (onFocusElement == null) {
							onFocusElement = temp;
						}
	    			}
	    		}
	    		if(flag==false){
	    			var name = items[0].value;
	    			errorMessage += "【第"+name+"次诊断】不完善，请完善;\n"; 
	    		}
	    	}
	    }
	    if($("#tbJkglXnSfkqcxjgs").val()==""){
	        errorMessage += "【前次心肌梗死】未选择，请选择;\n"; 
	        if (onFocusElement == null) {
				onFocusElement = document.getElementById('tbJkglXnSfkqcxjgs');
			}
	    }
	    if($("#qitaxinzangbing").val()=="1"){
	     	  if($("#tbJkglXnSfkmxbwxysqt").val()==""){
	     	   	errorMessage += "其他心脏病【有】具体内容未填写，请填写;\n"; 
	       	 	if (onFocusElement == null) {
					onFocusElement = document.getElementById('tbJkglXnSfkmxbwxysqt');
				}
	        }
		}
		if($("#qita").val()=="1"){
	     	  if($("#tbJkglXnSfkxwjqtwxysqt").val()==""){
	     	   	errorMessage += "其他行为因素【有】具体内容未填写，请填写;\n"; 
	       	 	if (onFocusElement == null) {
					onFocusElement = document.getElementById('tbJkglXnSfkxwjqtwxysqt');
				}
	        }
		}
	    if($("#tbJkglXnSfkzyza").val()=="00000"){
	        errorMessage += "【主要障碍】未选择，请选择;\n"; 
	    }else if(document.getElementById('zyzaqtcheck').checked==true){
	    	if($("#tbJkglXnSfkzyzaqt").val()==""){
	    		errorMessage += "主要障碍【其它】未填写，请填写;\n"; 
	       	 	if (onFocusElement == null) {
					onFocusElement = document.getElementById('tbJkglXnSfkzyzaqt');
				}
	    	}
	    }
	    if($("#tbJkglXnSfkzdnr").val()=="000000"){
	        errorMessage += "【指导内容】未选择，请选择;\n"; 
	    }else if(document.getElementById('zdnrqtcheck').checked==true){
	    	if($("#tbJkglXnSfkzdnrqt").val()==""){
	    		errorMessage += "指导内容【其它】未填写，请填写;\n"; 
	       	 	if (onFocusElement == null) {
					onFocusElement = document.getElementById('tbJkglXnSfkzdnrqt');
				}
	    	}
	    }
	    if($("#tbJkglXnSfkksdf").val()==""){
	        errorMessage += "【卡氏评分】未填写，请填写;\n"; 
	        if (onFocusElement == null) {
				onFocusElement = document.getElementById('tbJkglXnSfkksdf');
			}
	    }
//	    if($("#tbJkglXnSfkjdbs").val()==""){
//	        errorMessage += "【简单病史】未填写，请填写;\n"; 
//	        if (onFocusElement == null) {
//				onFocusElement = document.getElementById('tbJkglXnSfkjdbs');
//			}
//	    }
	    
	}else if(zgzt=="3"||zgzt=="4"||zgzt=="5"||zgzt=="6"){
		if(zgzt!="6"&& ($("#tbJkglXnSfkzgyy").val()==""||$("#tbJkglXnSfkzgyy").val()=="请注明原因...")){
	        errorMessage += "转归‘3--死亡’或‘4--失访’或‘5--拒访’的【原因】为空，请填写转归原因;\n"; 
	        if (onFocusElement == null) {
				onFocusElement = document.getElementById('tbJkglXnSfkzgyy');
			}
	    }
	    if(zgzt=="3"){
	        if($("#tbJkglXnSfkswrq").val()==""){
	        	errorMessage += "【死亡日期】未填写，请填写;\n"; 
	        	if (onFocusElement == null) {
					onFocusElement = document.getElementById('tbJkglXnSfkswrq');
				}
	   		}
	    	if($("#tbJkglXnSfkswdd").val()=="4"){
	     	   if($("#tbJkglXnSfkswddqt").val()==""){
	     	   		errorMessage += "死亡地点【4--其它】具体内容未填写，请填写;\n"; 
	       	 		if (onFocusElement == null) {
						onFocusElement = document.getElementById('tbJkglXnSfkswddqt');
					}
	        	}
			}
			if($("#tbJkglXnSfkzysy").val()==""){
	        	errorMessage += "【主要死因】未选择，请选择;\n"; 
	        	if (onFocusElement == null) {
					onFocusElement = document.getElementById('tbJkglXnSfkzysy');
				}
	    	}else if($("#tbJkglXnSfkzysy").val()=="6"){
	        	if($("#tbJkglXnSfkzysyqt").val()==""){
	     	   		errorMessage += "主要死因【6--其它】具体内容未填写，请填写;\n"; 
	       	 		if (onFocusElement == null) {
						onFocusElement = document.getElementById('tbJkglXnSfkzysyqt');
					}
	        	}
	    	}
	    	if($("#icd").val()==""){
	        	errorMessage += "【ICD编码】未填写，请填写;\n"; 
	        	if (onFocusElement == null) {
					onFocusElement = document.getElementById('icdLabel');
				}
	   		}
	    }
	    
	}
	
	if (errorMessage != "") {
		alert(errorMessage);
		if (onFocusElement != null) {
			onFocusElement.focus();
		}
		$(obj).removeAttr("disabled");
	}else{
		if(confirm("确认提交么？")){
			if(zgzt=="1"||zgzt=="2"){
				for(var i=1;i<6;i++){
					if(document.getElementById('zddwselect'+i).value=='0'){//第i个添加的诊断单位选择其它
						document.getElementById('zddw'+i).disabled=false;
						document.getElementById('zddw'+i).value='0';//诊断单位代码置为0
					}
				}
			}
			document.forms[0].submit();
	    }else{
	    	$(obj).removeAttr("disabled");
	    }
	}
}