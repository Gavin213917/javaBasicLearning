//填报日期≥患者就诊时间≥伤害发生时间
//伤害原因选1，2，发生地点在5以外提示
//伤害原因8，9，10，受伤部位1以外提示
//伤害原因7，伤害性质6以外提示
//伤害发生时活动“驾乘交通工具”，伤害原因1，2以外提示
//
function checkHurt(){
	var confirmMsg = "";
	var tbrq = document.getElementById("tbrq").value;//tbrq 8 位
	var hzjzsj = document.getElementById("hzjzsj").value;// 10位
	var shfssj = document.getElementById("shfssj").value;// 10位
	
	var hzjzsjf = document.getElementById("hzjzsjf").value;
	var shfssjf = document.getElementById("shfssjf").value;
	var hzjzsjs = document.getElementById("hzjzsjs").value;
	var shfssjs = document.getElementById("shfssjs").value;
	if(hzjzsjf.length<2){
		hzjzsjf = "0"+hzjzsjf;
	}
	if(shfssjf.length<2){
		shfssjf = "0"+shfssjf;
	}
	if(hzjzsjs.length<2){
		hzjzsjs = "0"+hzjzsjs;
	}
	if(shfssjs.length<2){
		shfssjs = "0"+shfssjs;
	}
	if(Number(tbrq) < Number(hzjzsj.substr(0,8)) || Number(hzjzsj+hzjzsjs+hzjzsjf) < Number(shfssj+shfssjs+shfssjf)){
		confirmMsg +="三个时间填写有误！填报日期≥患者就诊时间≥伤害发生时间 \n";
		
	}
	var shyyValue = document.getElementById("shfsyy").value; 
	var shfsddValue = document.getElementById("shfsdd").value; 
	var shbwValue = document.getElementById("shbw").value; 
	var shxzValue = document.getElementById("shxz").value; 
	var shfsshdValue = document.getElementById("shfsshd").value; 
	if((shyyValue == 1 || shyyValue ==2) && shfsddValue != 5){
		confirmMsg +="伤害原因中的“1机动车车祸”、“2非机动车车祸”,而发生地点中不为“5街道公路”！ \n";
	}
	if((shyyValue == 8 || shyyValue ==9 || shyyValue ==10) && shbwValue != 6){
		confirmMsg +="伤害原因的“8窒息悬吊、9溺水、10中毒”,而受伤部位中不为“6全身广泛受伤”！ \n";
	}
	var isRight =false;
	if(shyyValue == 7){
		var shxzValue = shxzValue.split(",");
		for(var i=0;i<shxzValue.length;i++){
					if(shxzValue[i] ==6){
					isRight = true ;
					break;
				}
			}
		if(isRight == false){
			confirmMsg +="伤害原因为“7烧烫伤”,而伤害性质中不包含“6烧烫伤”！ \n";
		}
	}
	if((shyyValue == 1 || shyyValue ==2) && shfsshdValue != 5){
		confirmMsg +="伤害原因中的“1机动车车祸”、“2非机动车车祸”,而伤害发生时活动中不为“5驾乘交通工具”！ \n";
	}
	
	return confirmMsg;
}