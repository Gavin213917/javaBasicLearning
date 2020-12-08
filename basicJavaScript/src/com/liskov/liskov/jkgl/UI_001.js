// URL
var folkUrl = "getFolkSelect.action";
var neighborhoods1Url = "getNeighborhoodsSelect.action";
var whcdUrl = "getWhcdSelect.action";

// 检查日期
function checkDate(obj, name) {
	if (obj.val() != '') {
	    if (obj.val().length != 10 || !checkDateByStrlength(10, obj.val())) {
	        alert(getMessage(MSG_C004,name));
	        obj[0].focus();
	        return false;
	    }
    }
    return true;
}

// 获取管理单位
function getManageDepartment() {
	var areaCode =document.getElementById("areaJieDaoHj").value;
	var chooseLive = false;
	if (areaCode != '') {
			chooseLive = true;
	}
	if (!chooseLive) {
		alert("请首先选择并完整填写的一个户籍地址！");
		return;
	}
	// 后台取数据	var jddwCode = document.getElementById("JDDW").value;
	AjaxCall({
		url : 'getManageDepartment.action',
		data : {
			'areaCode' : areaCode,
			'jddwCode' : jddwCode
		},
		recall : function(result) {
			document.getElementById("personObj.gldw").value = result[0].CODE;
			document.getElementById("gldw").value = result[0].NAME;
			//提取出现住地址---看是否是外区
			var checkOutArea = false;
			if (confirm("请确定信息的准确性，确定提交？")) {
				//提交
				document.all["archives"].submit();
			}
		}
	});
}

//处理户籍地址为List可以接收
function soluteRegAddressList(){
	var regAddressTable = document.getElementById("regAddressTable");
	for(var i = 0 ; i < regAddressTable.rows.length-2 ; i++){
		var inputs = regAddressTable.rows[i+1].getElementsByTagName("INPUT");
		for(var j = 0 ; j < inputs.length ; j++){
			if(inputs[j].type == 'hidden'){
				//inputs[j].name = "regAddressList[" + i + "]." + inputs[j].name;
				inputs[j].name = "hjAddressList[" + i + "]." + inputs[j].name;
			}
		}
	}
}

// 页面回车换单元格
function TabKeyEvent(target) {
	if (event.keyCode == 13) {
		event.keyCode = 9;
	}
}

// 数据编码校验与提交
function commit() {
	// 姓名
	if (!checkRequireFocus($("#XM")[0],getMessage(MSG_C007,'姓名'))){return;}
	// 证件类型
	if (!checkRequireFocus($("#ZJLX")[0],getMessage(MSG_C007,'证件类型'))){return;}
	// 证件号
	if (!checkRequireFocus($("#ZJH")[0],getMessage(MSG_C007,'证件号'))){return;}
    if ($("#ZJLX").val()=="01" && !IsIdCard($("#ZJH").val())) {
        alert(getMessage(MSG_C002));
        $("#ZJH")[0].focus();
        return;
    }
    if($("#ZJLX").val()=="01" && trim(document.getElementById("SFLX").value) == "8" ){//如果卡类型是8（身份证） 
        if(zjh.toUpperCase() != document.getElementById("SFBZ").value){//判断是否和录入卡号相等
            alert("你所录入的身份证号 和 改档案所对应的身份证号不一致！请核实！或者点击“上一步”查看录入的卡号是否有误！");
            $("#ZJH")[0].focus();
            return;
        }
    }
	//如果 卡号正确,转成大写
	$("#ZJH").val($("#ZJH").val().toUpperCase());
	// 性别
	if (!checkRequireFocus($("#listSex")[0],getMessage(MSG_C007,'性别'))){return;}
	// 出生年月
    if (!checkRequireFocus($("#CSNY")[0],getMessage(MSG_C007,'出生年月'))){return;}
    if (!checkDate($("#CSNY"),'出生年月')){return;}
    // 民族
    if (!checkRequireFocus($("#folk")[0],getMessage(MSG_C007,'民族'))){return;}
    // 婚姻状况
    if (!checkRequireFocus($("#huiYin")[0],getMessage(MSG_C007,'婚姻状况'))){return;}
	// 户籍地址校验
	if (!checkRequireFocus($("#areaShengHj")[0],getMessage(MSG_C007,'户籍地址：省（自治区、直辖市）'))){return;}
	if (!checkRequireFocus($("#areaShiHj")[0],getMessage(MSG_C007,'户籍地址：市（地区）'))){return;}
	if (!checkRequireFocus($("#areaXianHj")[0],getMessage(MSG_C007,'户籍地址：县（区）'))){return;}
	if (!checkRequireFocus($("#areaJieDaoHj")[0],getMessage(MSG_C007,'户籍地址：街道（镇）'))){return;}
	if (!checkRequireFocus($("#roadHj")[0],getMessage(MSG_C007,'户籍地址：路、弄'))){return;}
	if (!checkRequireFocus($("#roomHj")[0],getMessage(MSG_C007,'户籍地址：门牌号'))){return;}
	//居住地址校验
    if (!checkRequireFocus($("#areaSheng")[0],getMessage(MSG_C007,'居住地址：省（自治区、直辖市）'))){return;}
    if (!checkRequireFocus($("#areaShi")[0],getMessage(MSG_C007,'居住地址：市（地区）'))){return;}
    if (!checkRequireFocus($("#areaXian")[0],getMessage(MSG_C007,'居住地址：县（区）'))){return;}
    if (!checkRequireFocus($("#areaJieDao")[0],getMessage(MSG_C007,'居住地址：街道（镇）'))){return;}
    if (!checkRequireFocus($("#road")[0],getMessage(MSG_C007,'居住地址：路、弄'))){return;}
    if (!checkRequireFocus($("#room")[0],getMessage(MSG_C007,'居住地址：门牌号'))){return;}
	// 疾病史确诊时间1校验 
	if (!checkDate($("#jbsDate1"),'确诊日期')){return;}
	// 疾病史确诊时间2校验
	if (!checkDate($("#jbsDate2"),'确诊日期')){return;}
	// 疾病史确诊时间3校验
	if (!checkDate($("#jbsDate3"),'确诊日期')){return;}
	// 疾病史确诊时间4校验
	if (!checkDate($("#jbsDate4"),'确诊日期')){return;}
	// 疾病史确诊时间5校验
	if (!checkDate($("#jbsDate5"),'确诊日期')){return;}
	// 疾病史确诊时间6校验
	if (!checkDate($("#jbsDate6"),'确诊日期')){return;}
	// 手术史时间1校验
	if (!checkDate($("#sssDate1"),'手术日期')){return;}
	// 手术史时间2校验
	if (!checkDate($("#sssDate2"),'手术日期')){return;}
	// 外伤史时间1校验
	if (!checkDate($("#wssDate1"),'日期')){return;}
	// 外伤史时间2校验
	if (!checkDate($("#wssDate2"),'日期')){return;}
	// 输血史时间1校验
	if (!checkDate($("#sxsDate1"),'日期')){return;}
	// 输血史时间2校验
	if (!checkDate($("#sxsDate2"),'日期')){return;}

	getManageDepartment();
}
