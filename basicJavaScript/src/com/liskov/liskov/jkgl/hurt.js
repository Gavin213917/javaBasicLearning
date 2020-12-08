var shfsyyData = [{CODE:'1',NAME:'机动车车祸'},{CODE:'2',NAME:'非机动车车祸'},{CODE:'3',NAME:'跌倒/坠落'},{CODE:'4',NAME:'钝器伤'},{CODE:'5',NAME:'火器伤'},{CODE:'6',NAME:'刀/锐器伤'},{CODE:'7',NAME:'烧烫伤'},{CODE:'8',NAME:' 窒息/悬吊'},{CODE:'9',NAME:'溺水'},{CODE:'10',NAME:'中毒'},{CODE:'11',NAME:'动物伤'},{CODE:'12',NAME:'性侵犯'},{CODE:'13',NAME:'其他'},{CODE:'14',NAME:'不清楚'}];
var shfsddData = [{CODE:'1',NAME:'家中'},{CODE:'2',NAME:'公共居住场所'},{CODE:'3',NAME:'学校与公共场所'},{CODE:'4',NAME:'体育和运动场所'},{CODE:'5',NAME:'公路/街道'},{CODE:'6',NAME:'贸易和服务场所'},{CODE:'7',NAME:'工业和建筑场所'},{CODE:'8',NAME:'农场/农田'},{CODE:'9',NAME:'其他'},{CODE:'10',NAME:'不清楚'}];
var shfsshdData = [{CODE:'1',NAME:'体育活动'},{CODE:'2',NAME:'休闲活动'},{CODE:'3',NAME:'有偿工作'},{CODE:'4',NAME:'家务/学习'},{CODE:'5',NAME:'驾乘交通工具'},{CODE:'6',NAME:'其他'},{CODE:'7',NAME:'不清楚'}];
var shbwData = [{CODE:'1',NAME:'头部'},{CODE:'2',NAME:'上肢'},{CODE:'3',NAME:'下肢'},{CODE:'4',NAME:'躯干'},{CODE:'5',NAME:'多部位'},{CODE:'6',NAME:'全身广泛受伤'},{CODE:'7',NAME:'呼吸系统'},{CODE:'8',NAME:'消化系统'},{CODE:'9',NAME:'大脑/脑干'},{CODE:'10',NAME:'脊髓'},{CODE:'11',NAME:'外周神经'},{CODE:'12',NAME:'其他'},{CODE:'13',NAME:'不清楚'}];
var sszjtfsData = [{CODE:'1',NAME:'行走'},{CODE:'2',NAME:'脚踏车'},{CODE:'3',NAME:'电/助动车'},{CODE:'4',NAME:'摩托车'},{CODE:'5',NAME:'载客机动车'},{CODE:'6',NAME:'载货机动车'},{CODE:'7',NAME:'其他'},{CODE:'8',NAME:'不详'}];
var sszjsData = [{CODE:'1',NAME:'行人'},{CODE:'2',NAME:'司机、骑车者'},{CODE:'3',NAME:'乘坐者'},{CODE:'4',NAME:'正在上下车者'},{CODE:'5',NAME:'其他'},{CODE:'6',NAME:'不详'}];
var sgdfqkData = [{CODE:'1',NAME:'行人'},{CODE:'2',NAME:'脚踏车'},{CODE:'3',NAME:'电/助动车'},{CODE:'4',NAME:'摩托车'},{CODE:'5',NAME:'载客机动车'},{CODE:'6',NAME:'载货机动车'},{CODE:'7',NAME:'其他'},{CODE:'8',NAME:'无碰撞'},{CODE:'9',NAME:'不详'}];
var ywbhcsData = [{CODE:'1',NAME:'系安全带'},{CODE:'2',NAME:'戴头盔'},{CODE:'3',NAME:'两者皆无'},{CODE:'4',NAME:'不详'}];
var dlzllxData = [{CODE:'1',NAME:'同一平面上的滑、绊、摔倒'},{CODE:'2',NAME:'从轮椅、椅子、床上或其他家具上'},{CODE:'3',NAME:'从运动设施（包括滑板、溜冰鞋等）上'},{CODE:'4',NAME:'从楼梯/台阶上'},{CODE:'5',NAME:'从梯子上'},{CODE:'6',NAME:'从脚手架上'},{CODE:'7',NAME:'从建筑物上'},{CODE:'8',NAME:'其他'},{CODE:'9',NAME:'不详'}];
var typmsddyyData = [{CODE:'1',NAME:'地面/鞋底光滑'},{CODE:'2',NAME:'被物/人绊倒'},{CODE:'3',NAME:'被推撞'},{CODE:'4',NAME:'踏/坐空'},{CODE:'5',NAME:'下肢无力'},{CODE:'6',NAME:'昏倒'},{CODE:'7',NAME:'其他'}];
var zydlData = [{CODE:'1',NAME:'国家机关、党群组织、企业、事业单位负责人'},{CODE:'2',NAME:'专业技术人员'},{CODE:'3',NAME:'办事人员和有关人员'},{CODE:'4',NAME:'商业、服务业人员'},{CODE:'5',NAME:'农、林、牧、渔、水利业生产人员'},{CODE:'6',NAME:'生产、运输设备操作人员及有关人员'},{CODE:'7',NAME:'军人'},{CODE:'8',NAME:'不便分类的其他从业人员'}];
var shfsjdData = [{CODE:'31022701',NAME:'岳阳街道'},{CODE:'31022702',NAME:'泗泾镇'},{CODE:'31022704',NAME:'车墩镇'},{CODE:'31022705',NAME:'中山街道'},{CODE:'31022706',NAME:'永丰街道'},{CODE:'31022708',NAME:'九亭镇'},{CODE:'31022709',NAME:'洞泾镇'},{CODE:'31022710',NAME:'新桥镇'},{CODE:'31022712',NAME:'小昆山镇'},{CODE:'31022713',NAME:'佘山镇'},{CODE:'31022714',NAME:'泖港镇'},{CODE:'31022716',NAME:'叶榭镇'},{CODE:'31022717',NAME:'石湖荡镇'},{CODE:'31022720',NAME:'新浜镇'},{CODE:'31022722',NAME:'方松街道'},{CODE:'00000000',NAME:'其他'}];
var bswqdmData = [{CODE:'310101',NAME:'黄浦区'},{CODE:'310103',NAME:'卢湾区'},{CODE:'310104',NAME:'徐汇区'},{CODE:'310105',NAME:'长宁区'},{CODE:'310106',NAME:'静安区'},{CODE:'310107',NAME:'普陀区'},{CODE:'310108',NAME:'闸北区'},{CODE:'310109',NAME:'虹口区'},{CODE:'310110',NAME:'杨浦区'},{CODE:'310112',NAME:'闵行区'},{CODE:'310113',NAME:'宝山区'},{CODE:'310124',NAME:'浦东新区'},{CODE:'310222',NAME:'嘉定区'},{CODE:'310226',NAME:'奉贤县'},{CODE:'310228',NAME:'金山区'},{CODE:'310229',NAME:'青浦县'},{CODE:'310230',NAME:'崇明县'}];
var ybcshjzyymcData = [{CODE:'42506001700',NAME:'松江区新桥社区卫生服务中心'},{CODE:'42505900800',NAME:'松江区妇幼保健院'},{CODE:'42506039100',NAME:'松江区石湖荡社区卫生服务中心'},{CODE:'42502432300',NAME:'松江区乐都医院'},{CODE:'42502310100',NAME:'松江区小昆山社区卫生服务中心'},{CODE:'42506098100',NAME:'松江区佘山社区卫生服务中心'},{CODE:'42505907500',NAME:'松江区方塔中医院'},{CODE:'42502344300',NAME:'松江区精神卫生中心'},{CODE:'42506016400',NAME:'松江区中山社区卫生服务中心'},	{CODE:'42505997200',NAME:'松江区泖港社区卫生服务中心'},{CODE:'42502341900',NAME:'松江区永丰社区卫生服务中心'},{CODE:'42502345100',NAME:'松江区九亭社区卫生服务中心'},{CODE:'42506079700',NAME:'松江区车墩社区卫生服务中心'},{CODE:'42506084200',NAME:'松江区中心医院'},{CODE:'42506076200',NAME:'松江区岳阳社区卫生服务中心'},{CODE:'42506009200',NAME:'松江区叶榭社区卫生服务中心'},{CODE:'42506087700',NAME:'松江区洞泾社区卫生服务中心'},{CODE:'42505956900',NAME:'松江区泗泾医院'},	{CODE:'42506059400',NAME:'松江区新浜社区卫生服务中心'},{CODE:'76879417800',NAME:'松江区方松社区卫生服务中心'},{CODE:'79708657600',NAME:'松江区九亭医院'},{CODE:'000',NAME:'第一人民医院南院'},{CODE:'00000000000',NAME:'其他'}];

var map = {};
map['shfsyy'] = shfsyyData;
map['shfsdd'] = shfsddData;
map['shfsshd'] = shfsshdData;
map['shbw'] = shbwData;
map['sszjtfs'] = sszjtfsData;
map['sszjs'] = sszjsData;
map['sgdfqk'] =	sgdfqkData
map['ywbhcs'] = ywbhcsData;
map['dlzllx'] = dlzllxData;
map['typmsddyy'] = typmsddyyData;
map['zydl'] = zydlData;
map['shfsjd'] = shfsjdData;
map['bswqdm'] =bswqdmData;
map['ybcshjzyymc'] =ybcshjzyymcData;

map.get = function(key,val){
	var data = this[key];
	for(var i=0;i<data.length;i++){
		if(data[i].CODE == val) return data[i].NAME
	}
	return null;
}
	
	
	

var jdxxUrl = 'getJdxx.action';
var mzzdUrl ='getMzzd.action';
var zyzdUrl ='getZyzd.action';
var cyzdUrl ='getZyzd.action';
//var zydlUrl = 'getZydl.action';
var zyxlUrl = 'getZyxl.action';
var zyxlParentId = 'zydl';






function showSchool(){
	if(document.getElementById("zyxlLabel").value == '在校学生'){
		document.getElementById("school").style.display = 'block';
		document.getElementById("jdxxLabel").style.display = 'inline';
		$("#jdxxLabel").removeClass("bgcolor");
		document.getElementById("jdxx").disabled = false;
		if(document.getElementById("jdxxmc").value != ''){
			document.getElementById("jdxxLabel").value = document.getElementById("jdxxmc").value;
		}	
	}else{
		if(document.getElementById("jdxxLabel").value != '请输入'){
			document.getElementById("jdxxmc").value = document.getElementById("jdxxLabel").value;
		}
		document.getElementById("jdxxLabel").value = '请输入';
		document.getElementById("jdxx").disabled = true;
		document.getElementById("jdxxLabel").style.display = 'none';
		document.getElementById("school").style.display = 'none';
	}
}

function checkNull(id,str){
	var returnValue="";
	if(document.getElementById(id).value==""){
			returnValue = str+"不能为空！\n";
		}
		  	return returnValue;
		
}

//院前急救转向控制
function checkYQJJ(){
	if(event.keyCode == 13){
		if(document.getElementById("yqjj").value == '2'){
			document.getElementById("jjry").focus();
		}
	}
}

function displayHidden(inputObject,showId,qtValue){
	if( inputObject.value == qtValue){
		document.getElementById(showId).disabled=false;
		document.getElementById(showId).style.display="inline";
	}else{
		document.getElementById(showId).disabled="true";
		document.getElementById(showId).style.display="none";
	}
}

function displayHiddenOnly(inputObject,showId,qtValue){
	//与上一方法类似，不过只控制隐藏，不控制现实
	if( inputObject.value == qtValue){
	}else{
		document.getElementById(showId).disabled="true";
		document.getElementById(showId).style.display="none";
	}
}

function displayshxz(){
	//特别制作，控制伤害性质的显示方式
	var shxz = document.getElementById("shxz").value;
	if(shxz == '9'){
		document.getElementById("shxztd").colSpan = "3";
		document.getElementById("shxzqtth").style.display = "inline";
		document.getElementById("shxzqttd").style.display = "inline";
		document.getElementById("shxzQt").disabled = false;
		document.getElementById("shxzQt").focus();
	}else{
		document.getElementById("shxzQt").disabled = true;
		document.getElementById("shxzqttd").style.display = "none";
		document.getElementById("shxzqtth").style.display = "none";
		document.getElementById("shxztd").colSpan="7";
		document.getElementById("shbwLabel").focus();
	}
}

function displayDiv(obj){
			if(obj.value == 1 || obj.value==2){
			   $("#jtsg").show(s);
			    $("#ddzl").hide(h);
			    $("#zd").hide(h);
//			    $("#shfsjdLabel").foucs();
			}else if(obj.value == 3){
			    $("#jtsg").hide(h);
			    $("#ddzl").show(s);
			    $("#zd").hide(h);
			}else if(obj.value == 10){
			    $("#jtsg").hide(h);
			    $("#ddzl").hide(h);
			    $("#zd").show(s);
			}else{
			    $("#jtsg").hide(h);
			    $("#ddzl").hide(h);
			    $("#zd").hide(h);
			}
	}

function s(){
  $(this).attr("disabled", "");
  $(this).find("input[type!='button']").eq(0).focus();
}

function h(){
   $(this).attr("disabled", "disabled");
}
	
	
		//提交操作
function insertHurtZy(){
		var errorMessage="";
		$("input[NN=notnull]").each(function(){
			if($(this).css('display') != 'none'){
				var id = $(this).attr('cn');
				var val = $(this).val();
				if(val == "" || val =="请输入"){
					if($(this).attr('cn') != '职业小类' || $("#zydlLabel").val() != '军人' ){
						errorMessage += id+"不能为空！\n";
						$(this).addClass("bgcolor");
					}else{
						$(this).removeClass("bgcolor");
					}
			}else{
				if($(this)[0].className.indexOf('bgcolor') != -1){
						$(this).removeClass("bgcolor");
					}
				}	
			}
		});
		var nlValue =document.getElementById("nlId").value ;
		if(Number(nlValue)>=6){
			if(document.getElementById("whcd").value == ''){
				errorMessage +="文化程度不能为空！\n";
				$('#whcd').addClass("bgcolor");
			}else{
				$('#whcd').removeClass("bgcolor");	
			}
		}else{$('#whcd').removeClass("bgcolor");	}
		var shxzValue =document.getElementById("shxz").value ;
		var shxzValueArray = shxzValue.split("");
		for(var i=0;i<shxzValueArray.length;i++){
			if(shxzValueArray[i] ==9){
				if(document.getElementById("shxzQt").value == ''){
					errorMessage += "伤害性质其他不能为空！\n";
					$('#shxzQt').addClass("bgcolor");
					break;
				}else{
					$('#shxzQt').removeClass("bgcolor");	
				}
			}
		}
		var role5 = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;// 校验标准5：电话校验
		var role7 = /\d{18}|\d{15}|\d{17}x|\d{14}x|\d{17}X|\d{14}X/;// 校验标准7：身份证校验
		var sfzhm = document.getElementById("sfzhmId").value;
			if(sfzhm !="" && !role7.test(sfzhm)){
				errorMessage += "身份证号码格式不正确！\n";
				$('#sfzhmId').addClass("bgcolor");
			}else{
				$('#sfzhmId').removeClass("bgcolor");	
			}
		var dhhm = document.getElementById("lxdhId").value;
			if (dhhm != "" && !role5.test(dhhm)) {
				errorMessage += "电话号码格式不正确！\n";
				$('#lxdhId').addClass("bgcolor");
			}else{
				$('#lxdhId').removeClass("bgcolor");	
			}
		var lxrdhhm = document.getElementById("lxrdhId").value;
			if (lxrdhhm != "" && !role5.test(lxrdhhm)) {
				errorMessage += "联系人电话号码电话号码格式不正确！\n";
				$('#lxrdhId').addClass("bgcolor");
			}else{
				$('#lxrdhId').removeClass("bgcolor");	
			}
		var hzjzsjValue =document.getElementById("hzjzsj").value ;
			if(hzjzsjValue != "" && !CheckyyyyMMdd(hzjzsjValue)){
			errorMessage += "患者就诊时间格式不正确！\n";
				$('#hzjzsj').addClass("bgcolor");
			}else{
				$('#hzjzsj').removeClass("bgcolor");	
			}
		var shfssjValue =document.getElementById("shfssj").value ;
			if(shfssjValue != "" ){
				if(!CheckyyyyMMdd(shfssjValue)){
					errorMessage += "伤害发生时间格式不正确！\n";
					$('#shfssj').addClass("bgcolor");
				}else{
					$('#shfssj').removeClass("bgcolor");	
				}
			}
		var shfssjsValue =document.getElementById("shfssjs").value ;
			if(shfssjsValue != "" ){
				if(Number(shfssjsValue)>23){
					errorMessage += "伤害发生时间小时格式不正确！\n";
					$('#shfssjs').addClass("bgcolor");
				}else{
					$('#shfssjs').removeClass("bgcolor");	
				}
			}
		var shfssjfValue =document.getElementById("shfssjf").value ;
			if(shfssjfValue != "" ){
				if(Number(shfssjfValue)>59){
					errorMessage += "伤害发生时间分格式不正确！\n";
					$('#shfssjf').addClass("bgcolor");
				}else{
					$('#shfssjf').removeClass("bgcolor");	
				}
			}
		var zdwzjrjttjValue =document.getElementById("zdwzjrjttj").value ;
		if(zdwzjrjttjValue != "" ){
			var isRight;
			var array = zdwzjrjttjValue.split(",");
			for(var i=0;i<array.length;i++){
				isRight =false;
				for (var j=0;j<5;j++){
					if(array[i] ==j+1){
						isRight =true;
						break;
					} 
				}
				if(isRight ==true){
					continue;
				}else{
					break;
				}
			}
			for(var i=0;i<array.length;i++){
				for(var j=i+1;j<array.length;j++){
					if(array[i]==array[j]){
						isRight = false;
						break;
					}
				}
				if(isRight ==true){
					continue;
				}else{
					break;
				}
			}
			if(isRight==false){
				errorMessage += "中毒物质进入体内途径输入不正确！\n";
				$('#zdwzjrjttj').addClass("bgcolor");
			}else{
				$('#zdwzjrjttj').removeClass("bgcolor");	
			}
		}
		
		if(shxzValue != "" ){
			var isRight;
			var array = shxzValue.split("");
			var n =0;//1出现的个数
			for(var i=0;i<array.length;){
				isRight =false;
				for (var j=0;j<10;j++){
					if(array[i]==1 && array[i+1]==0){
						isRight =true;
						i = i+2;
						n++;
						break;					
					}else if(array[i]==1 && array[i+1]!=0){
						isRight =true;
						i = i+1;
						n++;
						break;		
					}else if(array[i] ==j+1){
						isRight =true;
						i = i+1;
						break;
					} 
				}
				if(isRight ==true){
					continue;
				}else{
					break;
				}
			}
			for(var i=0;i<array.length;i++){
				for(var j=i+1;j<array.length;j++){
					if(n>2){
						isRight = false;
						break;
					}else if(array[i]==array[j]){
						if((array[j+1] !=0 && array[i+1] ==0) || (array[i+1] !=0 && array[j+1] ==0)){
							break;
						}else{
							isRight = false;
							break;
						}
					}
				}
				if(isRight ==true){
					continue;
				}else{
					break;
				}
			}
			if(isRight==false){
				errorMessage += "伤害性质格式不正确！\n";
				$('#shxz').addClass("bgcolor");
			}else{
				$('#shxz').removeClass("bgcolor");	
			}
		}
		
		var nbqgssValue =document.getElementById("nbqgss").value ;
		if(nbqgssValue != "" ){
			var isRight;
			var array = nbqgssValue.split(",");
			for(var i=0;i<array.length;i++){
				isRight =false;
				for (var j=0;j<12;j++){
					if(array[i] ==j+1){
						isRight =true;
						break;
					} 
				}
				if(isRight ==true){
					continue;
				}else{
					break;
				}
			}
			for(var i=0;i<array.length;i++){
				for(var j=i+1;j<array.length;j++){
					if(array[i]==array[j]){
						isRight = false;
						break;
					}
				}
				if(isRight ==true){
					continue;
				}else{
					break;
				}
			}
			if(isRight==false){
				errorMessage += "内部器官损伤不正确！\n";
				$('#nbqgss').addClass("bgcolor");
			}else{
				$('#nbqgss').removeClass("bgcolor");	
			}
		}
		
//		var icdCode=document.getElementById("zyzd").value;
//		if(document.getElementById("shfsyy").value == 3 
//			&& (
//				icdCode == 'S02.0' || 
//				icdCode == 'S02.1' || 
//				icdCode == 'S02.7' || 
//				icdCode =='S02.9' || 
//				( icdCode.substr(2,icdCode.length-2) >= 6.0 && icdCode.substr(2,icdCode.length-2)<= 6.9 && icdCode.substr(0,2)=='S0') ||
//				icdCode =='T06.0' ||
//				icdCode =='S14.0' ||
//				icdCode =='S14.1' ||
//				icdCode =='S18' ||
//				icdCode =='S24.0' ||
//				icdCode =='S24.1' ||
//				icdCode =='S34.0' ||
//				icdCode =='S34.1' ||
//				icdCode =='S34.3' ||
//				icdCode =='T06.0' ||
//				icdCode =='T06.1' ||
//				icdCode =='T09.3' ||
//				icdCode =='T09.6' ||
//				( icdCode.substr(2,icdCode.length-2) >= 6.0 && icdCode.substr(2,icdCode.length-2)<= 6.9 && icdCode.substr(0,2)=='S2') ||
//				( icdCode.substr(2,icdCode.length-2) >= 7.0 && icdCode.substr(2,icdCode.length-2)<= 7.9 && icdCode.substr(0,2)=='S2') ||
//				( icdCode.substr(2,icdCode.length-2) >= 6.0 && icdCode.substr(2,icdCode.length-2)<= 6.9 && icdCode.substr(0,2)=='S3') ||
//				( icdCode.substr(2,icdCode.length-2) >= 7.0 && icdCode.substr(2,icdCode.length-2)<= 7.9 && icdCode.substr(0,2)=='S3') ||
//				icdCode =='S39.6' 
//				)
//			)
//		{
//			errorMessage += checkNull("dlzllx","跌倒坠落类型");
//			errorMessage += checkNull("typmsddyy","跌倒原因");
//			errorMessage += checkNull("sfyj","是否饮酒");
//		}
		
		if (errorMessage != ""){
			alert(errorMessage);
		}else{
			var confirmMsg = checkHurt();
			confirmMsg+= "确定提交？";
			if (confirm(confirmMsg)) {
				document.shbgkForm.action="insertHurt.action";
				document.getElementById("cocon").disabled = true;
				document.shbgkForm.submit();
		}
		}
	}	
	
//<%--提交操作--%>
	function insertHurtMz(){
		
		var errorMessage="";
		$("input[NN=notnull]").each(function(){
			if($(this).css('display') != 'none'){
				var id = $(this).attr('cn');
				var val = $(this).val();
				if(val == "" || val =="请输入"){
					if($(this).attr('cn') != '职业小类' || $("#zydlLabel").val() != '军人' ){
						errorMessage += id+"不能为空！\n";
						$(this).addClass("bgcolor");
					}else{
						$(this).removeClass("bgcolor");
					}
			}else{
					if($(this)[0].className.indexOf('bgcolor') != -1){
						$(this).removeClass("bgcolor");
					}
				}
			}
		});
		var nlValue =document.getElementById("nlId").value ;
		if(Number(nlValue)>=6){
			if(document.getElementById("whcd").value == ''){
				errorMessage +="文化程度不能为空！\n";
				$('#whcd').addClass("bgcolor");
			}else{
				$('#whcd').removeClass("bgcolor");	
			}
		}else{$('#whcd').removeClass("bgcolor");	}
		var shxzValue =document.getElementById("shxz").value ;
		var shxzValueArray = shxzValue.split("");
		for(var i=0;i<shxzValueArray.length;i++){
			if(shxzValueArray[i] ==9){
				if(document.getElementById("shxzQt").value == ''){
					errorMessage += "伤害性质其他不能为空！\n";
					$('#shxzQt').addClass("bgcolor");
					break;
				}else{
					$('#shxzQt').removeClass("bgcolor");	
				}
			}
		}
		var role5 = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;// 校验标准5：电话校验
		var role7 = /\d{18}|\d{15}|\d{17}X|\d{14}X/;// 校验标准7：身份证校验
		var sfzhm = document.getElementById("sfzhmId").value;
			if(sfzhm !="" && !role7.test(sfzhm)){
				errorMessage += "身份证号码格式不正确！\n";
				$('#sfzhmId').addClass("bgcolor");
			}else{
				$('#sfzhmId').removeClass("bgcolor");	
			}
		var dhhm = document.getElementById("lxdhId").value;
			if (dhhm != "" && !role5.test(dhhm)) {
				errorMessage += "电话号码格式不正确！\n";
				$('#lxdhId').addClass("bgcolor");
			}else{
				$('#lxdhId').removeClass("bgcolor");	
			}
		var hzjzsjValue =document.getElementById("hzjzsj").value ;
			if(hzjzsjValue != "" && !CheckyyyyMMdd(hzjzsjValue)){
			errorMessage += "患者就诊时间格式不正确！\n";
				$('#hzjzsj').addClass("bgcolor");
			}else{
				$('#hzjzsj').removeClass("bgcolor");	
			}
		var shfssjValue =document.getElementById("shfssj").value ;
			if(shfssjValue != "" ){
				if(!CheckyyyyMMdd(shfssjValue)){
					errorMessage += "伤害发生时间格式不正确！\n";
					$('#shfssj').addClass("bgcolor");
				}else{
					$('#shfssj').removeClass("bgcolor");	
				}
			}
		var shfssjsValue =document.getElementById("shfssjs").value ;
			if(shfssjsValue != "" ){
				if(Number(shfssjsValue)>23){
					errorMessage += "伤害发生时间小时格式不正确！\n";
					$('#shfssjs').addClass("bgcolor");
				}else{
					$('#shfssjs').removeClass("bgcolor");	
				}
			}
		var shfssjfValue =document.getElementById("shfssjf").value ;
			if(shfssjfValue != "" ){
				if(Number(shfssjfValue)>59){
					errorMessage += "伤害发生时间分格式不正确！\n";
					$('#shfssjf').addClass("bgcolor");
				}else{
					$('#shfssjf').removeClass("bgcolor");	
				}
			}
		var zdwzjrjttjValue =document.getElementById("zdwzjrjttj").value ;
		if(zdwzjrjttjValue != "" ){
			var isRight;
			var array = zdwzjrjttjValue.split(",");
			for(var i=0;i<array.length;i++){
				isRight =false;
				for (var j=0;j<5;j++){
					if(array[i] ==j+1){
						isRight =true;
						break;
					} 
				}
				if(isRight ==true){
					continue;
				}else{
					break;
				}
			}
			for(var i=0;i<array.length;i++){
				for(var j=i+1;j<array.length;j++){
					if(array[i]==array[j]){
						isRight = false;
						break;
					}
				}
				if(isRight ==true){
					continue;
				}else{
					break;
				}
			}
			if(isRight==false){
				errorMessage += "中毒物质进入体内途径输入不正确！\n";
				$('#zdwzjrjttj').addClass("bgcolor");
			}else{
				$('#zdwzjrjttj').removeClass("bgcolor");	
			}
		}
		
		if(shxzValue != "" ){
			var isRight;
			var array = shxzValue.split("");
			var n =0;//1出现的个数
			for(var i=0;i<array.length;){
				isRight =false;
				for (var j=0;j<10;j++){
					if(array[i]==1 && array[i+1]==0){
						isRight =true;
						i = i+2;
						n++;
						break;					
					}else if(array[i]==1 && array[i+1]!=0){
						isRight =true;
						i = i+1;
						n++;
						break;		
					}else if(array[i] ==j+1){
						isRight =true;
						i = i+1;
						break;
					} 
				}
				if(isRight ==true){
					continue;
				}else{
					break;
				}
			}
			for(var i=0;i<array.length;i++){
				for(var j=i+1;j<array.length;j++){
					if(n>2){
						isRight = false;
						break;
					}else if(array[i]==array[j]){
						if((array[j+1] !=0 && array[i+1] ==0) || (array[i+1] !=0 && array[j+1] ==0)){
							break;
						}else{
							isRight = false;
							break;
						}
					}
				}
				if(isRight ==true){
					continue;
				}else{
					break;
				}
			}
			if(isRight==false){
				errorMessage += "伤害性质格式不正确！\n";
				$('#shxz').addClass("bgcolor");
			}else{
				$('#shxz').removeClass("bgcolor");	
			}
		}
		
		
//		if(document.getElementById("shfsyy").value == 3)
//		{
//			errorMessage += checkNull("dlzllx","跌倒坠落类型");
//			errorMessage += checkNull("typmsddyy","跌倒原因");
//			errorMessage += checkNull("sfyj","是否饮酒");
//		}
		
		if (errorMessage != ""){
			alert(errorMessage);
		}else{
			var confirmMsg = checkHurt();
			confirmMsg+= "确定提交？";
			if (confirm(confirmMsg)) {
				document.shbgkForm.action="insertHurt.action";
				document.getElementById("cocon").disabled = true;
				document.shbgkForm.submit();
		}
		}
	}	
	
	