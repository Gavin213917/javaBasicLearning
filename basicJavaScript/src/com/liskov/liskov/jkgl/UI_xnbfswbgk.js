//Url
var provinceHjUrl = "getProvinceSelect.action";
var cityHjUrl = "getCitySelect.action";
var districtHjUrl = "getDistrictSelect.action";
var streetHjUrl = "getStreetSelectZl.action";
var villageHjUrl = "getNeighborhoodSelect.action";
var roadHjUrl = "getRoadSelect.action";

//ParentId
var cityHjParentId = "provinceHj";
var districtHjParentId = "cityHj";
var streetHjParentId = "districtHj";
var villageHjParentId = "streetHj";

//页面载入
function initialize() {
	initializeHjAddress();
	
}
// 页面回车换单元格
function TabKeyEvent(target) {
	if (event.keyCode == 13) {
		event.keyCode = 9;
	}
}

//初始化户籍地址
function initializeHjAddress(){
 


	var provinceHjLabel = document.getElementById("provinceHjLabel");
	provinceHjLabel.value = "上海市";
	var provinceHj = document.getElementById("provinceHj");
	provinceHj.value = "310000";
	var cityHjLabel = document.getElementById("cityHjLabel");
	cityHjLabel.value = "市辖区";
	var cityHj = document.getElementById("cityHj");
	cityHj.value = "310100";
	//var districtHjLabel = document.getElementById("districtHjLabel");
	//districtHjLabel.value = "长宁区";
	//var districtHj = document.getElementById("districtHj");
	//districtHj.value = "310105";
	
}

//点击添加按钮
function addNewHjAddress(postion) {
	// 验证
	var hjAddressInputs = postion.parentNode.parentNode
			.getElementsByTagName('INPUT');
	for (var i = 0; i < hjAddressInputs.length; i++) {
		if ((hjAddressInputs[i].value == "" || hjAddressInputs[i].value == "请输入")
				&& hjAddressInputs[i].type != "hidden" && hjAddressInputs[i].id != "textHj") {
			alert("有未填写的输入项！！");
			if (hjAddressInputs[i].value != "请输入") {
				hjAddressInputs[i].focus();
			}
			return;
		}
	}
	// 判断是否已经添加现住地址
	var hjLivesInput = postion.parentNode.parentNode.childNodes[1]
			.getElementsByTagName('INPUT');
	for (var i = 0; i < hjLivesInput.length; i++) {
		if (hjLivesInput[i].value == 1) {
			var hjAddressTable = document.getElementById('regAddressTable');
			var hjTableRows = hjAddressTable.rows;
			// 判断是否已经添加了现住的地址
			for (var j = hjTableRows.length - 2; j >= 1; j--) {
				if (hjTableRows[j].cells[2].innerText == "现住") {
					alert("对不起您已经确定添加了一个现住的地址!!");
					hjLivesInput[i].value = 2;
					hjLivesInput[i].focus();
					return;
				}
			}
		}
	}
	// 添加
	var hjTable = document.getElementById('regAddressTable');
	var hjTypeValue = postion.parentNode.parentNode.childNodes[1].childNodes[0].value;// 地址类型
	var hjAddressTypeLabel = "";
	var hjHiddenInput = "<input name='paType' value='" + hjTypeValue
			+ "' type='hidden'/>";// 隐藏域
	var objHjaddress = postion.parentNode.parentNode.childNodes[1]
			.getElementsByTagName('INPUT');
	var addHjLabel = "";// 地址 对应显示
	if (hjTypeValue == "9") {
		for (var i = 0; i < objHjaddress.length; i++) {
			if (objHjaddress[i].id == "provinceHjLabel") {
				addHjLabel = "省（自治区、直辖市）【" + objHjaddress[i].value + "】";
			}else if (objHjaddress[i].id == "provinceHj") {
				hjHiddenInput = hjHiddenInput + "<input name='paProvince' type='hidden' value='" + objHjaddress[i].value + "'/>";
			}else if (objHjaddress[i].id == "cityHjLabel") {
				addHjLabel = addHjLabel + "市（地区）【" + objHjaddress[i].value + "】";
			}else if (objHjaddress[i].id == "cityHj") {
				hjHiddenInput = hjHiddenInput + "<input name='paCity' type='hidden' value='" + objHjaddress[i].value + "'/>";
			}else if (objHjaddress[i].id == "districtHjLabel") {
				addHjLabel = addHjLabel + "县（区）【" + objHjaddress[i].value + "】";
			}else if (objHjaddress[i].id == "districtHj") {
				hjHiddenInput = hjHiddenInput + "<input name='paDistrict' type='hidden' value='" + objHjaddress[i].value + "'/>";
			}else if (objHjaddress[i].id == "streetHjLabel") {
				addHjLabel = addHjLabel + "街道（镇）【" + objHjaddress[i].value + "】";
			}else if (objHjaddress[i].id == "streetHj") {
				hjHiddenInput = hjHiddenInput + "<input name='paTown' type='hidden' value='" + objHjaddress[i].value + "'/>";
			}else if (objHjaddress[i].id == "villageHjLabel") {
				addHjLabel = addHjLabel + "居委【" + objHjaddress[i].value + "】";
			}else if (objHjaddress[i].id == "villageHj") {
				hjHiddenInput = hjHiddenInput + "<input name='paVillage' type='hidden' value='" + objHjaddress[i].value + "'/>";
			}else if (objHjaddress[i].id == "roadHjLabel") {
				addHjLabel = addHjLabel + "路、弄【" + objHjaddress[i].value + "】";
			}else if (objHjaddress[i].id == "roadHj") {
				hjHiddenInput = hjHiddenInput + "<input name='paRoad' type='hidden' value='" + objHjaddress[i].value + "'/>";
			}else if (objHjaddress[i].id == "roomHj") {
				addHjLabel = addHjLabel + "门牌号【" + objHjaddress[i].value + "】";
				hjHiddenInput = hjHiddenInput + "<input name='paRoom' type='hidden' value='" + objHjaddress[i].value + "'/>";
			}else if (objHjaddress[i].id == "textHj"){
				hjHiddenInput = hjHiddenInput + "<input name='paText' type='hidden' value='" + objHjaddress[i].value + "'/>";
			}else if (objHjaddress[i].id == "confirmHj") {
				hjHiddenInput = hjHiddenInput + "<input name='effective' type='hidden' value='" + objHjaddress[i].value + "'/>";
			}else {
				
			}
		}
	} else {
		for (var i = 0; i < objHjaddress.length; i++) {
			if (objHjaddress[i].id == "confirmHj") {
				hjHiddenInput = hjHiddenInput
						+ "<input name='effective' type='hidden' value='"
						+ objHjaddress[i].value + "'/>";
			}
		}
	}
	// 常住
	if(hjTable.rows.length > 2){
		var hjLabel = "<input name='isLastAddress' value='2' type='hidden'/><input name='liveButton' type='button' value='激活' onclick='checkRegAdderss(this)' /><font color='red'><b>非现住</b></font>";
	}
	else{
		var hjLabel = "<input name='isLastAddress' value='1' type='hidden'/><input name='liveButton' type='button' value='已激活' onclick='checkRegAdderss(this)' disabled/><font color='green'><b>现住</b></font>";
	}
	// 添加一个空行
	var row = hjTable.insertRow(1);
	row.height = '30px';
	var td1 = row.insertCell(0);
	td1.align = 'center';
	var td2 = row.insertCell(1);
	td2.align = 'center';
	var td3 = row.insertCell(2);
	td3.align = 'center';
	// 改变空行内容
	td1.innerHTML = hjHiddenInput + addHjLabel;
	td2.innerHTML = hjLabel;
	td3.innerHTML = "<input type='button' value='删除' onclick='javascript:deleteTheAddress(this)'/>";
	// 清空单元格
	var inputs = postion.parentNode.parentNode.getElementsByTagName('INPUT');
	for (var j = 0; j < inputs.length; j++) {
		if (inputs[j].type == 'checkbox' && inputs[j].name != 'addressType') {
			inputs[j].checked = false;
		}
		if (inputs[j].type == 'text') {
			if (inputs[j].size == 15) {
				inputs[j].value = '请输入';
				inputs[j].style.color = '#666666';
			} else {
				inputs[j].value = '';
			}
		}
	}
	// 隐藏提示信息
	if (hjTable.rows.length > 2) {
		hjTable.rows[hjTable.rows.length - 1].style.display = 'none';
	}
	initializeHjAddress();
}

//激活户籍地址操作
function checkRegAdderss(target){
	target.value = "已激活";
	target.disabled = true;
	target.parentNode.getElementsByTagName('FONT')[0].color = "green";
	target.parentNode.getElementsByTagName('FONT')[0].innerHTML = "<b>现用</b>";
	var ins = target.parentNode.getElementsByTagName('INPUT');
	for(var i = 0 ; i < ins.length ; i++){
		if(ins[i] != target){
			ins[i].value = "1";
		}
	}
	var table = document.getElementById('regAddressTable');
	for(var i = 1 ; i < table.rows.length-1 ; i++){
		var inputs = table.rows[i].cells[1].getElementsByTagName('INPUT');
		for(var j = 0 ; j < inputs.length ; j++){
			if(inputs[j].parentNode != target.parentNode){
				if(inputs[j].type == "button" ){
					if(inputs[j].disabled == true){
						inputs[j].disabled = false;
						inputs[j].value = "激活";
						inputs[j].parentNode.getElementsByTagName('FONT')[0].color = "red";
						inputs[j].parentNode.getElementsByTagName('FONT')[0].innerHTML = "<b>非现用</b>";
					}
				}else{
					inputs[j].value = "2"; 
				}
			}
		}
	}
}

// 删除创建的地址
function deleteTheAddress(postion) {
	var table = postion.parentNode.parentNode.parentNode;
	for (var i = 0; i < table.childNodes.length; i++) {
		if (table.rows[i] == postion.parentNode.parentNode) {
			table.deleteRow(i);
			if (table.rows.length <= 2) {
				// 表格隐藏
				table.rows[1].style.display = 'block';
			}
			return;
		}
	}
}

// 清除填写单元格内容
function clearContent(element) {
	if (element.tagName == "INPUT") {
		if (element.type == "text") {
			element.value = "";
		} else if (element.type == "checkbox") {
			element.checked = false;
		}
	} else if (element.tagName == "SELECT") {
		element.value = "#";
	}
}

//处理户籍地址为List可以接收
function soluteRegAddressList(){
	var regAddressTable = document.getElementById("regAddressTable");
	if(regAddressTable!=null){
	for(var i = 0 ; i < regAddressTable.rows.length-2 ; i++){
		var inputs = regAddressTable.rows[i+1].getElementsByTagName("INPUT");
		for(var j = 0 ; j < inputs.length ; j++){
			if(inputs[j].type == 'hidden'){
				inputs[j].name = "hjAddressList[" + i + "]." + inputs[j].name;
			}
		}
	}
	}else {
		errorMessage += "户籍地址未填写！\n";
	}
}
//后台对象
//private List<TbJkglPersonHrAddress> hjAddressList;// 长宁户籍List