//提交操作
function updateHurtZy() {
	var errorMessage = "";
	$("input[NN=notnull]").each(function () {
		if ($(this).css("display") != "none") {
			var id = $(this).attr('cn');
			var val = $(this).val();
			if(val == "" || val =="请输入"){
				if($(this).attr('cn') != '职业小类' || $("#zydlLabel").val() != '军人' ){
					errorMessage += id+"不能为空！\n";
					$(this).addClass("bgcolor");
				}else{
					$(this).removeClass("bgcolor");
				}
			}
		}
	});
	var nlValue = document.getElementById("nlId").value;
	if (Number(nlValue) >= 6) {
		if (document.getElementById("whcd").value == "") {
			errorMessage += "\u6587\u5316\u7a0b\u5ea6\u4e0d\u80fd\u4e3a\u7a7a\uff01\n";
			$("#whcd").addClass("bgcolor");
		} else {
			$("#whcd").removeClass("bgcolor");
		}
	} else {
		$("#whcd").removeClass("bgcolor");
	}
	var shxzValue = document.getElementById("shxz").value;
	var shxzValueArray = shxzValue.split("");
	for (var i = 0; i < shxzValueArray.length; i++) {
		if (shxzValueArray[i] == 9) {
			if (document.getElementById("shxzQt").value == "") {
				errorMessage += "\u4f24\u5bb3\u6027\u8d28\u5176\u4ed6\u4e0d\u80fd\u4e3a\u7a7a\uff01\n";
				$("#shxzQt").addClass("bgcolor");
				break;
			} else {
				$("#shxzQt").removeClass("bgcolor");
			}
		}
	}
	var role5 = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;// 校验标准5：电话校验
	var role7 = /\d{18}|\d{15}|\d{17}X|\d{14}X/;// 校验标准7：身份证校验
	var sfzhm = document.getElementById("sfzhmId").value;
	if (sfzhm != "" && !role7.test(sfzhm)) {
		errorMessage += "\u8eab\u4efd\u8bc1\u53f7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e\uff01\n";
		$("#sfzhmId").addClass("bgcolor");
	} else {
		$("#sfzhmId").removeClass("bgcolor");
	}
	var dhhm = document.getElementById("lxdhId").value;
	if (dhhm != "" && !role5.test(dhhm)) {
		errorMessage += "\u7535\u8bdd\u53f7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e\uff01\n";
		$("#lxdhId").addClass("bgcolor");
	} else {
		$("#lxdhId").removeClass("bgcolor");
	}
	var lxrdhhm = document.getElementById("lxrdhId").value;
	if (lxrdhhm != "" && !role5.test(lxrdhhm)) {
		errorMessage += "\u8054\u7cfb\u4eba\u7535\u8bdd\u53f7\u7801\u7535\u8bdd\u53f7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e\uff01\n";
		$("#lxrdhId").addClass("bgcolor");
	} else {
		$("#lxrdhId").removeClass("bgcolor");
	}
	var hzjzsjValue = document.getElementById("hzjzsj").value;
	if (hzjzsjValue != "" && !CheckyyyyMMdd(hzjzsjValue)) {
		errorMessage += "\u60a3\u8005\u5c31\u8bca\u65f6\u95f4\u683c\u5f0f\u4e0d\u6b63\u786e\uff01\n";
		$("#hzjzsj").addClass("bgcolor");
	} else {
		$("#hzjzsj").removeClass("bgcolor");
	}
	var shfssjValue = document.getElementById("shfssj").value;
	if (shfssjValue != "") {
		if (!CheckyyyyMMdd(shfssjValue)) {
			errorMessage += "\u4f24\u5bb3\u53d1\u751f\u65f6\u95f4\u683c\u5f0f\u4e0d\u6b63\u786e\uff01\n";
			$("#shfssj").addClass("bgcolor");
		} else {
			$("#shfssj").removeClass("bgcolor");
		}
	}
	var shfssjsValue = document.getElementById("shfssjs").value;
	if (shfssjsValue != "") {
		if (Number(shfssjsValue) > 23) {
			errorMessage += "\u4f24\u5bb3\u53d1\u751f\u65f6\u95f4\u5c0f\u65f6\u683c\u5f0f\u4e0d\u6b63\u786e\uff01\n";
			$("#shfssjs").addClass("bgcolor");
		} else {
			$("#shfssjs").removeClass("bgcolor");
		}
	}
	var shfssjfValue = document.getElementById("shfssjf").value;
	if (shfssjfValue != "") {
		if (Number(shfssjfValue) > 59) {
			errorMessage += "\u4f24\u5bb3\u53d1\u751f\u65f6\u95f4\u5206\u683c\u5f0f\u4e0d\u6b63\u786e\uff01\n";
			$("#shfssjf").addClass("bgcolor");
		} else {
			$("#shfssjf").removeClass("bgcolor");
		}
	}
	var zdwzjrjttjValue = document.getElementById("zdwzjrjttj").value;
	if (zdwzjrjttjValue != "") {
		var isRight;
		var array = zdwzjrjttjValue.split(",");
		for (var i = 0; i < array.length; i++) {
			isRight = false;
			for (var j = 0; j < 5; j++) {
				if (array[i] == j + 1) {
					isRight = true;
					break;
				}
			}
			if (isRight == true) {
				continue;
			} else {
				break;
			}
		}
		for (var i = 0; i < array.length; i++) {
			for (var j = i + 1; j < array.length; j++) {
				if (array[i] == array[j]) {
					isRight = false;
					break;
				}
			}
			if (isRight == true) {
				continue;
			} else {
				break;
			}
		}
		if (isRight == false) {
			errorMessage += "\u4e2d\u6bd2\u7269\u8d28\u8fdb\u5165\u4f53\u5185\u9014\u5f84\u8f93\u5165\u4e0d\u6b63\u786e\uff01\n";
			$("#zdwzjrjttj").addClass("bgcolor");
		} else {
			$("#zdwzjrjttj").removeClass("bgcolor");
		}
	}
	if (shxzValue != "") {
		var isRight;
		var array = shxzValue.split("");
		var n = 0;//1出现的个数
		for (var i = 0; i < array.length; ) {
			isRight = false;
			for (var j = 0; j < 10; j++) {
				if (array[i] == 1 && array[i + 1] == 0) {
					isRight = true;
					i = i + 2;
					n++;
					break;
				} else {
					if (array[i] == 1 && array[i + 1] != 0) {
						isRight = true;
						i = i + 1;
						n++;
						break;
					} else {
						if (array[i] == j + 1) {
							isRight = true;
							i = i + 1;
							break;
						}
					}
				}
			}
			if (isRight == true) {
				continue;
			} else {
				break;
			}
		}
		for (var i = 0; i < array.length; i++) {
			for (var j = i + 1; j < array.length; j++) {
				if (n > 2) {
					isRight = false;
					break;
				} else {
					if (array[i] == array[j]) {
						if ((array[j + 1] != 0 && array[i + 1] == 0) || (array[i + 1] != 0 && array[j + 1] == 0)) {
							break;
						} else {
							isRight = false;
							break;
						}
					}
				}
			}
			if (isRight == true) {
				continue;
			} else {
				break;
			}
		}
		if (isRight == false) {
			errorMessage += "\u4f24\u5bb3\u6027\u8d28\u683c\u5f0f\u4e0d\u6b63\u786e\uff01\n";
			$("#shxz").addClass("bgcolor");
		} else {
			$("#shxz").removeClass("bgcolor");
		}
	}
	var nbqgssValue = document.getElementById("nbqgss").value;
	if (nbqgssValue != "") {
		var isRight;
		var array = nbqgssValue.split(",");
		for (var i = 0; i < array.length; i++) {
			isRight = false;
			for (var j = 0; j < 12; j++) {
				if (array[i] == j + 1) {
					isRight = true;
					break;
				}
			}
			if (isRight == true) {
				continue;
			} else {
				break;
			}
		}
		for (var i = 0; i < array.length; i++) {
			for (var j = i + 1; j < array.length; j++) {
				if (array[i] == array[j]) {
					isRight = false;
					break;
				}
			}
			if (isRight == true) {
				continue;
			} else {
				break;
			}
		}
		if (isRight == false) {
			errorMessage += "\u5185\u90e8\u5668\u5b98\u635f\u4f24\u4e0d\u6b63\u786e\uff01\n";
			$("#nbqgss").addClass("bgcolor");
		} else {
			$("#nbqgss").removeClass("bgcolor");
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
	if (errorMessage != "") {
		alert(errorMessage);
	} else {
		if (document.getElementById("op").value == 1) {
			if (document.getElementById("spzt").value == 1 || document.getElementById("spzt").value == 2 || document.getElementById("spzt").value == 4) {
				alert("\u5df2\u5ba1\u6279\u901a\u8fc7\uff0c\u4e0d\u80fd\u4fee\u6539");
			} else {
				var confirmMsg = checkHurt();
				confirmMsg += "\u786e\u5b9a\u63d0\u4ea4\uff1f";
				if (confirm(confirmMsg)) {
					document.shbgkForm.action = "updateHurt.action";
					document.getElementById("cocon").disabled = true;
					document.shbgkForm.submit();
				}
			}
		} else {
			var confirmMsg = checkHurt();
			confirmMsg += "\u786e\u5b9a\u63d0\u4ea4\uff1f";
			if (confirm(confirmMsg)) {
				document.shbgkForm.action = "updateHurt.action";
				document.getElementById("cocon").disabled = true;
				document.shbgkForm.submit();
			}
		}
	}
}
function updateHurtMz() {
	var errorMessage = "";
	$("input[NN=notnull]").each(function () {
		if ($(this).css("display") != "none") {
			var id = $(this).attr('cn');
			var val = $(this).val();
			if(val == "" || val =="请输入"){
				if($(this).attr('cn') != '职业小类' || $("#zydlLabel").val() != '军人' ){
					errorMessage += id+"不能为空！\n";
					$(this).addClass("bgcolor");
				}else{
					$(this).removeClass("bgcolor");
				}
			}
		}
	});
	var nlValue = document.getElementById("nlId").value;
	if (Number(nlValue) >= 6) {
		if (document.getElementById("whcd").value == "") {
			errorMessage += "\u6587\u5316\u7a0b\u5ea6\u4e0d\u80fd\u4e3a\u7a7a\uff01\n";
			$("#whcd").addClass("bgcolor");
		} else {
			$("#whcd").removeClass("bgcolor");
		}
	} else {
		$("#whcd").removeClass("bgcolor");
	}
	var shxzValue = document.getElementById("shxz").value;
	var shxzValueArray = shxzValue.split("");
	for (var i = 0; i < shxzValueArray.length; i++) {
		if (shxzValueArray[i] == 9) {
			if (document.getElementById("shxzQt").value == "") {
				errorMessage += "\u4f24\u5bb3\u6027\u8d28\u5176\u4ed6\u4e0d\u80fd\u4e3a\u7a7a\uff01\n";
				$("#shxzQt").addClass("bgcolor");
				break;
			} else {
				$("#shxzQt").removeClass("bgcolor");
			}
		}
	}
	var role5 = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;// 校验标准5：电话校验
	var role7 = /\d{18}|\d{15}|\d{17}X|\d{14}X/;// 校验标准7：身份证校验
	var sfzhm = document.getElementById("sfzhmId").value;
	if (sfzhm != "" && !role7.test(sfzhm)) {
		errorMessage += "\u8eab\u4efd\u8bc1\u53f7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e\uff01\n";
		$("#sfzhmId").addClass("bgcolor");
	} else {
		$("#sfzhmId").removeClass("bgcolor");
	}
	var dhhm = document.getElementById("lxdhId").value;
	if (dhhm != "" && !role5.test(dhhm)) {
		errorMessage += "\u7535\u8bdd\u53f7\u7801\u683c\u5f0f\u4e0d\u6b63\u786e\uff01\n";
		$("#lxdhId").addClass("bgcolor");
	} else {
		$("#lxdhId").removeClass("bgcolor");
	}
	var hzjzsjValue = document.getElementById("hzjzsj").value;
	if (hzjzsjValue != "" && !CheckyyyyMMdd(hzjzsjValue)) {
		errorMessage += "\u60a3\u8005\u5c31\u8bca\u65f6\u95f4\u683c\u5f0f\u4e0d\u6b63\u786e\uff01\n";
		$("#hzjzsj").addClass("bgcolor");
	} else {
		$("#hzjzsj").removeClass("bgcolor");
	}
	var shfssjValue = document.getElementById("shfssj").value;
	if (shfssjValue != "") {
		if (!CheckyyyyMMdd(shfssjValue)) {
			errorMessage += "\u4f24\u5bb3\u53d1\u751f\u65f6\u95f4\u683c\u5f0f\u4e0d\u6b63\u786e\uff01\n";
			$("#shfssj").addClass("bgcolor");
		} else {
			$("#shfssj").removeClass("bgcolor");
		}
	}
	var shfssjsValue = document.getElementById("shfssjs").value;
	if (shfssjsValue != "") {
		if (Number(shfssjsValue) > 23) {
			errorMessage += "\u4f24\u5bb3\u53d1\u751f\u65f6\u95f4\u5c0f\u65f6\u683c\u5f0f\u4e0d\u6b63\u786e\uff01\n";
			$("#shfssjs").addClass("bgcolor");
		} else {
			$("#shfssjs").removeClass("bgcolor");
		}
	}
	var shfssjfValue = document.getElementById("shfssjf").value;
	if (shfssjfValue != "") {
		if (Number(shfssjfValue) > 59) {
			errorMessage += "\u4f24\u5bb3\u53d1\u751f\u65f6\u95f4\u5206\u683c\u5f0f\u4e0d\u6b63\u786e\uff01\n";
			$("#shfssjf").addClass("bgcolor");
		} else {
			$("#shfssjf").removeClass("bgcolor");
		}
	}
	var zdwzjrjttjValue = document.getElementById("zdwzjrjttj").value;
	if (zdwzjrjttjValue != "") {
		var isRight;
		var array = zdwzjrjttjValue.split(",");
		for (var i = 0; i < array.length; i++) {
			isRight = false;
			for (var j = 0; j < 5; j++) {
				if (array[i] == j + 1) {
					isRight = true;
					break;
				}
			}
			if (isRight == true) {
				continue;
			} else {
				break;
			}
		}
		for (var i = 0; i < array.length; i++) {
			for (var j = i + 1; j < array.length; j++) {
				if (array[i] == array[j]) {
					isRight = false;
					break;
				}
			}
			if (isRight == true) {
				continue;
			} else {
				break;
			}
		}
		if (isRight == false) {
			errorMessage += "\u4e2d\u6bd2\u7269\u8d28\u8fdb\u5165\u4f53\u5185\u9014\u5f84\u8f93\u5165\u4e0d\u6b63\u786e\uff01\n";
			$("#zdwzjrjttj").addClass("bgcolor");
		} else {
			$("#zdwzjrjttj").removeClass("bgcolor");
		}
	}
	if (shxzValue != "") {
		var isRight;
		var array = shxzValue.split("");
		var n = 0;//1出现的个数
		for (var i = 0; i < array.length; ) {
			isRight = false;
			for (var j = 0; j < 10; j++) {
				if (array[i] == 1 && array[i + 1] == 0) {
					isRight = true;
					i = i + 2;
					n++;
					break;
				} else {
					if (array[i] == 1 && array[i + 1] != 0) {
						isRight = true;
						i = i + 1;
						n++;
						break;
					} else {
						if (array[i] == j + 1) {
							isRight = true;
							i = i + 1;
							break;
						}
					}
				}
			}
			if (isRight == true) {
				continue;
			} else {
				break;
			}
		}
		for (var i = 0; i < array.length; i++) {
			for (var j = i + 1; j < array.length; j++) {
				if (n > 2) {
					isRight = false;
					break;
				} else {
					if (array[i] == array[j]) {
						if ((array[j + 1] != 0 && array[i + 1] == 0) || (array[i + 1] != 0 && array[j + 1] == 0)) {
							break;
						} else {
							isRight = false;
							break;
						}
					}
				}
			}
			if (isRight == true) {
				continue;
			} else {
				break;
			}
		}
		if (isRight == false) {
			errorMessage += "\u4f24\u5bb3\u6027\u8d28\u683c\u5f0f\u4e0d\u6b63\u786e\uff01\n";
			$("#shxz").addClass("bgcolor");
		} else {
			$("#shxz").removeClass("bgcolor");
		}
	}
		
			
//		if(document.getElementById("shfsyy").value == 3)
//		{
//			errorMessage += checkNull("dlzllx","跌倒坠落类型");
//			errorMessage += checkNull("typmsddyy","跌倒原因");
//			errorMessage += checkNull("sfyj","是否饮酒");
//		}
	if (errorMessage != "") {
		alert(errorMessage);
	} else {
		if (document.getElementById("op").value == 1) {
			if (document.getElementById("spzt").value == 1 || document.getElementById("spzt").value == 2 || document.getElementById("spzt").value == 4) {
				alert("\u5df2\u5ba1\u6279\u901a\u8fc7\uff0c\u4e0d\u80fd\u4fee\u6539");
			} else {
				var confirmMsg = checkHurt();
				confirmMsg += "\u786e\u5b9a\u63d0\u4ea4\uff1f";
				if (confirm(confirmMsg)) {
					document.shbgkForm.action = "updateHurt.action";
					document.getElementById("cocon").disabled = true;
					document.shbgkForm.submit();
				}
			}
		} else {
			var confirmMsg = checkHurt();
			confirmMsg += "\u786e\u5b9a\u63d0\u4ea4\uff1f";
			if (confirm(confirmMsg)) {
				document.shbgkForm.action = "updateHurt.action";
				document.getElementById("cocon").disabled = true;
				document.shbgkForm.submit();
			}
		}
	}
}
function returnHurt() {	
//alert();
	document.getElementById("kpbhId").value = "";
	document.shbgkForm.action = "searchHurtList.action";
	document.shbgkForm.submit();
}
//Alt+s提交页面
function onkeydownBody() {
	if ((window.event.altKey) && (window.event.keyCode == 83)) {
		insertHurt();
	}
}

