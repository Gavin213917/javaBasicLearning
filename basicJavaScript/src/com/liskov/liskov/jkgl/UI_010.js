// URL
var folkUrl = "getFolkSelect.action";
var province1Url = "getProvinceSelect.action";
var province2Url = "getProvinceSelect.action";
var countryUrl = "getCountrySelect.action";
var street1Url = "getStreetSelect.action";
var street2Url = "getStreetSelect.action";
var street3Url = "getStreetSelect.action";
var street4Url = "getStreetSelect.action";
var village1Url = "getVillagesSelect.action";
var neighborhoods1Url = "getNeighborhoodsSelect.action";

var provinceUrl = "getProvinceSelect.action";
var cityUrl = "getCitySelect.action";
var districtUrl = "getDistrictSelect.action";
var streetUrl = "getStreetSelectZl.action";
var villageUrl = "getNeighborhoodSelect.action";
var roadUrl = "getRoadSelect.action";

var provinceHjUrl = "getProvinceSelect.action";
var cityHjUrl = "getCitySelect.action";
var districtHjUrl = "getDistrictSelect.action";
var streetHjUrl = "getStreetSelectZl.action";
var villageHjUrl = "getNeighborhoodSelect.action";
var roadHjUrl = "getRoadSelect.action";

// ParentID
//var neighborhoods1ParentId = "street4";
//var village1ParentId = "street2";

var cityParentId = "province";
var districtParentId = "city";
var streetParentId = "district";
var villageParentId = "street";

var cityHjParentId = "provinceHj";
var districtHjParentId = "cityHj";
var streetHjParentId = "districtHj";
var villageHjParentId = "streetHj";


// 页面载入
function init() {
	AjaxCall({// 民族
		url : 'getFolkSelect.action',
		recall : function(result) {
			var folk = document.getElementById("folk");
			for (var i = 0; i < result.length; i++) {
				if (folk.value == result[i].CODE) {
					var folkLabel = document.getElementById('folkLabel');
					folkLabel.value = result[i].NAME;
				}
			}
		}
	});
	initializeAddress();
	initializeHjAddress();
}

//初始化地址
function initializeAddress(){
	var provinceLabel = document.getElementById("provinceLabel");
	provinceLabel.value = "上海市";
	var province = document.getElementById("province");
	province.value = "310000";
	var cityLabel = document.getElementById("cityLabel");
	cityLabel.value = "市辖区";
	var city = document.getElementById("city");
	city.value = "310100";

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

// 获取管理单位
function getManageDepartment() {
	var areaCode = "";
	var chooseLive = false;
	var lives = document.getElementsByName('isLastAddress');
	for (var i = 0; i < lives.length; i++) {
		if (lives[i].value == '1') {
			chooseLive = true;
			var inputs = lives[i].parentNode.parentNode
					.getElementsByTagName('INPUT');
			for (var j = 0; j < inputs.length; j++) {
				if(inputs[j].name == 'paTown' && inputs[j].value != null && inputs[j].value != ''){
					areaCode = inputs[j].value;
					break;
				}
			}
		}
	}
	if (!chooseLive) {
		alert("请首先选择并完整填写的一个现住地址！");
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
			var adressTableRow = document.getElementById('addressTable').rows;
			for (var i = adressTableRow.length - 2; i >= 1; i--) {
				if (adressTableRow[i].cells[2].innerText == '现住' && adressTableRow[i].cells[0].innerText == '外区') {
					checkOutArea = true;
					break;
				}
			}
			if (confirm((checkOutArea ? "您的现住地址选择了【外区】,":"") +"确定提交？")) {
				//处理户籍地址的List
				soluteRegAddressList();
				//处理居住地址的List
				soluteLiveAddressList();
				//处理电话号码的List
				solutePhoneList();
				//提交
				document.all["archives"].submit();
			}
		}
	});
}

//处理户籍地址为List可以接收
function soluteRegAddressList(){
	var regAddressTable = document.getElementById("regAddressTable");
	for(var i = 0 ; i < regAddressTable.rows.length-1 ; i++){
		var inputs = regAddressTable.rows[i+1].getElementsByTagName("INPUT");
		for(var j = 0 ; j < inputs.length ; j++){
			if(inputs[j].type == 'hidden'){
				//inputs[j].name = "regAddressList[" + i + "]." + inputs[j].name;
				inputs[j].name = "hjAddressList[" + i + "]." + inputs[j].name;
			}
		}
	}
}

//处理居住地址为List可以接收
function soluteLiveAddressList(){
	
	var liveAddressTable = document.getElementById("addressTable");
	for(var i = 0 ; i < liveAddressTable.rows.length-1 ; i++){
		var inputs = liveAddressTable.rows[i+1].getElementsByTagName("INPUT");
		for(var j = 0 ; j < inputs.length ; j++){
			if(inputs[j].type == 'hidden'){
				inputs[j].name = "liveAddressList[" + i + "]." + inputs[j].name;
			}
		}
	}
}

//处理电话号码为List可以接收
function solutePhoneList(){
	var phoneList = document.getElementsByName("phoneList");
	for(var i = 0 ; i < phoneList.length ; i++){
		var inputs = phoneList[i].parentNode.getElementsByTagName("INPUT");
		for(var j = 0 ; j < inputs.length ; j++){
			if(inputs[j].name != null && inputs[j].name != '' && inputs[j].value != null && inputs[j].value != ''){
				inputs[j].name = "phoneList[" + i + "]." + inputs[j].name;
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



// 创建新的户籍地址
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
	var hjTypeValue = postion.parentNode.parentNode.childNodes[0].childNodes[0].value;// 地址类型
	var hjAddressTypeLabel = "";

	var hjHiddenInput = "<input name='paType' value='" + hjTypeValue
			+ "' type='hidden'/>";// 隐藏域
	var objHjaddress = postion.parentNode.parentNode.childNodes[0]
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


var hjLabel = "<input name='isLastAddress' value='2' type='hidden'/><input name='liveButton' type='button' value='激活' onclick='checkRegAdderss(this)' /><font color='red'><b>非现住</b></font>";

	// 添加一个空行
	var row = hjTable.insertRow(1);
	row.height = '30px';
	var td1 = row.insertCell(0);
	td1.align = 'center';
	var td2 = row.insertCell(1);
	td2.align = 'center';
	var td3 = row.insertCell(2);
	td3.align = 'center';
	//var td4 = row.insertCell(3);
	//td4.align = 'center';
	// 改变空行内容
	//td1.innerHTML = addressTypeLabel + hiddenInput;
	//td2.innerHTML = addLabel;
	//td3.innerHTML = liveLabel;
	//td4.innerHTML = "<input type='button' value='删除' onclick='javascript:deleteTheAddress(this)'/>";
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
	//if (hjTable.rows.length > 2) {
		//hjTable.rows[hjTable.rows.length - 1].style.display = 'none';
	//}
	initializeHjAddress();
}

// 创建新的地址
function addNewAddress(postion) {
	// 验证
	var addressInputs = postion.parentNode.parentNode
			.getElementsByTagName('INPUT');
	for (var i = 0; i < addressInputs.length; i++) {
		if ((addressInputs[i].value == "" || addressInputs[i].value == "请输入")
				&& addressInputs[i].type != "hidden" && addressInputs[i].id != "text") {
			alert("有未填写的输入项！！");
			if (addressInputs[i].value != "请输入") {
				addressInputs[i].focus();
			}
			return;
		}
	}
	// 判断是否已经添加现住地址
	var livesInput = postion.parentNode.parentNode.childNodes[1]
			.getElementsByTagName('INPUT');
	for (var i = 0; i < livesInput.length; i++) {
		if (livesInput[i].value == 1) {
			var addressTable = document.getElementById('addressTable');
			var tableRows = addressTable.rows;
			// 判断是否已经添加了现住的地址
			for (var j = tableRows.length - 2; j >= 1; j--) {
				if (tableRows[j].cells[2].innerText == "现住") {
					alert("对不起您已经确定添加了一个现住的地址!!");
					livesInput[i].value = 2;
					livesInput[i].focus();
					return;
				}
			}
		}
	}
	// 添加
	var table = document.getElementById('addressTable');
	var typeValue = postion.parentNode.parentNode.childNodes[0].childNodes[0].value;// 地址类型
	var addressTypeLabel = "";
	
	var hiddenInput = "<input name='paType' value='" + typeValue
			+ "' type='hidden'/>";// 隐藏域
	var objaddress = postion.parentNode.parentNode.childNodes[0]
			.getElementsByTagName('INPUT');
	var addLabel = "";// 地址 对应显示


	if (typeValue == "9") {  
		for (var i = 0; i < objaddress.length; i++) {
			if (objaddress[i].id == "provinceLabel") {
				addLabel = "省（自治区、直辖市）【" + objaddress[i].value + "】";
			}else if (objaddress[i].id == "province") {
				hiddenInput = hiddenInput + "<input name='paProvince' type='hidden' value='" + objaddress[i].value + "'/>";
			}else if (objaddress[i].id == "cityLabel") {
				addLabel = addLabel + "市（地区）【" + objaddress[i].value + "】";
			}else if (objaddress[i].id == "city") {
				hiddenInput = hiddenInput + "<input name='paCity' type='hidden' value='" + objaddress[i].value + "'/>";
			}else if (objaddress[i].id == "districtLabel") {
				addLabel = addLabel + "县（区）【" + objaddress[i].value + "】";
			}else if (objaddress[i].id == "district") {
				hiddenInput = hiddenInput + "<input name='paDistrict' type='hidden' value='" + objaddress[i].value + "'/>";
			}else if (objaddress[i].id == "streetLabel") {
				addLabel = addLabel + "街道（镇）【" + objaddress[i].value + "】";
			}else if (objaddress[i].id == "street") {
				hiddenInput = hiddenInput + "<input name='paTown' type='hidden' value='" + objaddress[i].value + "'/>";
			}else if (objaddress[i].id == "villageLabel") {
				addLabel = addLabel + "居委【" + objaddress[i].value + "】";
			}else if (objaddress[i].id == "village") {
				hiddenInput = hiddenInput + "<input name='paVillage' type='hidden' value='" + objaddress[i].value + "'/>";
			}else if (objaddress[i].id == "roadLabel") {
				addLabel = addLabel + "路、弄【" + objaddress[i].value + "】";
			}else if (objaddress[i].id == "road") {
				hiddenInput = hiddenInput + "<input name='paRoad' type='hidden' value='" + objaddress[i].value + "'/>";
			}else if (objaddress[i].id == "room") {
				addLabel = addLabel + "门牌号【" + objaddress[i].value + "】";
				hiddenInput = hiddenInput + "<input name='paRoom' type='hidden' value='" + objaddress[i].value + "'/>";
			}else if(objaddress[i].id == "text"){
				hiddenInput = hiddenInput + "<input name='paText' type='hidden' value='" + objaddress[i].value + "'/>";
			}else if (objaddress[i].id == "confirm") {
				hiddenInput = hiddenInput + "<input name='effective' type='hidden' value='" + objaddress[i].value + "'/>";
			}else {
				
			}
		}
	} else {
		for (var i = 0; i < objaddress.length; i++) {
			if (objaddress[i].id == "confirm") {
				hiddenInput = hiddenInput
						+ "<input name='effective' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			}
		}
	}
	
	// 常住
	/*if(table.rows.length > 2){
		var liveLabel = "<input name='isLastAddress' value='2' type='hidden'/><input name='liveButton' type='button' value='激活' onclick='checkLiveAdderss(this)' /><font color='red'><b>非现住</b></font>";
	}
	else{
		var liveLabel = "<input name='isLastAddress' value='1' type='hidden'/><input name='liveButton' type='button' value='已激活' onclick='checkLiveAdderss(this)' disabled/><font color='green'><b>现住</b></font>";
	}*/

		var liveLabel = "<input name='isLastAddress' value='2' type='hidden'/><input name='liveButton' type='button' value='激活' onclick='checkLiveAdderss(this)' /><font color='red'><b>非现住</b></font>";
//
	// 添加一个空行	var row = table.insertRow(1);
	row.height = '30px';
	var td1 = row.insertCell(0);
	td1.align = 'center';
	var td2 = row.insertCell(1);
	td2.align = 'center';
	var td3 = row.insertCell(2);
	td3.align = 'center';
	td1.innerHTML = hiddenInput + addLabel;
	td2.innerHTML = liveLabel;
	td3.innerHTML = "<input type='button' value='删除' onclick='javascript:deleteTheAddress(this)'/>";
	// 清空单元格	var inputs = postion.parentNode.parentNode.getElementsByTagName('INPUT');
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
	//if (table.rows.length > 2) {
		//table.rows[table.rows.length - 1].style.display = 'none';
	//}
	
	initializeAddress();
	document.getElementById('submitButton').focus();
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
	for(var i = 1 ; i < table.rows.length ; i++){
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

//激活现住地址的操作
function checkLiveAdderss(target){
	target.value = "已激活";
	target.disabled = true;
	target.parentNode.getElementsByTagName('FONT')[0].color = "green";
	target.parentNode.getElementsByTagName('FONT')[0].innerHTML = "<b>现住</b>";
	var ins = target.parentNode.getElementsByTagName('INPUT');
	for(var i = 0 ; i < ins.length ; i++){
		if(ins[i] != target){
			ins[i].value = "1";
		}
	}
	var table = document.getElementById('addressTable');
	for(var i = 1 ; i < table.rows.length; i++){
		var inputs = table.rows[i].cells[1].getElementsByTagName('INPUT');
		for(var j = 0 ; j < inputs.length ; j++){
			if(inputs[j].parentNode != target.parentNode){
				if(inputs[j].type == "button" ){
					if(inputs[j].disabled == true){
						inputs[j].disabled = false;
						inputs[j].value = "激活";
						inputs[j].parentNode.getElementsByTagName('FONT')[0].color = "red";
						inputs[j].parentNode.getElementsByTagName('FONT')[0].innerHTML = "<b>非现住</b>";
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

/** 以上是地址 */

