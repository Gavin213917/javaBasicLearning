// URL
var folkUrl = "getICDSelect.action";
var province1Url = "getProvinceSelect.action";
var province2Url = "getProvinceSelect.action";
var countryUrl = "getCountrySelect.action";
var street1Url = "getStreetSelect.action";
var street2Url = "getStreetSelect.action";
var street3Url = "getStreetSelect.action";
var street4Url = "getStreetSelect.action";
var village1Url = "getVillagesSelect.action";
var neighborhoods1Url = "getNeighborhoodsSelect.action";
// ParentID
var neighborhoods1ParentId = "street4";
var village1ParentId = "street2";

// 页面载入
function init() {
	AjaxCall({// 民族
		url : 'getICDSelect.action',
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
	for(var i = 0 ; i < regAddressTable.rows.length-2 ; i++){
		var inputs = regAddressTable.rows[i+1].getElementsByTagName("INPUT");
		for(var j = 0 ; j < inputs.length ; j++){
			if(inputs[j].type == 'hidden'){
				inputs[j].name = "regAddressList[" + i + "]." + inputs[j].name;
			}
		}
	}
}

//处理居住地址为List可以接收
function soluteLiveAddressList(){
	var liveAddressTable = document.getElementById("addressTable");
	for(var i = 0 ; i < liveAddressTable.rows.length-2 ; i++){
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

// Alt+s提交页面
function onkeydownBody() {
	if ((window.event.altKey) && (window.event.keyCode == 83)) {
		commit();
	}
}

// 创建新的地址
function addNewAddress(postion) {
	// 验证
	var addressInputs = postion.parentNode.parentNode
			.getElementsByTagName('INPUT');
	for (var i = 0; i < addressInputs.length; i++) {
		if ((addressInputs[i].value == "" || addressInputs[i].value == "请输入")
				&& addressInputs[i].type != "hidden") {
			alert("有未填写的输入项！！");
			if (addressInputs[i].value != "请输入") {
				addressInputs[i].focus();
			}
			return;
		}
	}
	// 判断是否已经添加现住地址
	var livesInput = postion.parentNode.parentNode.childNodes[2]
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
	switch (typeValue) {
		case "1" :
			addressTypeLabel = "街道";
			break;
		case "2" :
			addressTypeLabel = "小区";
			break;
		case "3" :
			addressTypeLabel = "农村";
			break;
		case "4" :
			addressTypeLabel = "外区";
			break;
	}
	var hiddenInput = "<input name='paType' value='" + typeValue
			+ "' type='hidden'/>";// 隐藏域
	var objaddress = postion.parentNode.parentNode.childNodes[1]
			.getElementsByTagName('INPUT');
	var addLabel = "";// 地址 对应显示

	if (typeValue == '1') {
		for (var i = 0; i < objaddress.length; i++) {
			if (objaddress[i].id == "street1Label") {
				addLabel = objaddress[i].value + " 街道(乡、镇) ";
			} else if (objaddress[i].id == "street1") {
				hiddenInput = hiddenInput
						+ "<input name='paTown' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			} else if (objaddress[i].id == "road") {
				addLabel = addLabel + objaddress[i].value + " 路(地名) ";
				hiddenInput = hiddenInput
						+ "<input name='paRoad' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			} else if (objaddress[i].id == "lane") {
				addLabel = addLabel + objaddress[i].value + " 弄 ";
				hiddenInput = hiddenInput
						+ "<input name='paAlley' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			} else if (objaddress[i].id == "number") {
				addLabel = addLabel + objaddress[i].value + " 号 ";
				hiddenInput = hiddenInput
						+ "<input name='paUnit' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			} else if (objaddress[i].id == "room") {
				addLabel = addLabel + objaddress[i].value + " 室 ";
				hiddenInput = hiddenInput
						+ "<input name='paRoom' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			} else if (objaddress[i].id == "confirm") {
				hiddenInput = hiddenInput
						+ "<input name='effective' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			}
		}
	} else if (typeValue == '2') {
		for (var i = 0; i < objaddress.length; i++) {
			if (objaddress[i].id == "street4Label") {
				addLabel = addLabel + objaddress[i].value + " 街道(乡、镇) ";
			} else if (objaddress[i].id == "street4") {
				hiddenInput = hiddenInput
						+ "<input name='paTown' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			} else if (objaddress[i].id == "neighborhoods1Label") {
				addLabel = addLabel + objaddress[i].value + " 小区 ";
			} else if (objaddress[i].id == "neighborhoods1") {
				hiddenInput = hiddenInput
						+ "<input name='paNeighborhood' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			} else if (objaddress[i].id == "number") {
				addLabel = addLabel + objaddress[i].value + " 号 ";
				hiddenInput = hiddenInput
						+ "<input name='paUnit' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			} else if (objaddress[i].id == "room") {
				addLabel = addLabel + objaddress[i].value + " 室 ";
				hiddenInput = hiddenInput
						+ "<input name='paRoom' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			} else if (objaddress[i].id == "confirm") {
				hiddenInput = hiddenInput
						+ "<input name='effective' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			} 
		}
	} else if (typeValue == '3') {
		for (var i = 0; i < objaddress.length; i++) {
			if (objaddress[i].id == "street2Label") {
				addLabel = objaddress[i].value + " 街道(乡、镇) ";
			} else if (objaddress[i].id == "street2") {
				hiddenInput = hiddenInput
						+ "<input name='paTown' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			} else if (objaddress[i].id == "village1Label") {
				addLabel = addLabel + objaddress[i].value + " 村 ";
			} else if (objaddress[i].id == "village1") {
				hiddenInput = hiddenInput
						+ "<input name='paVillage' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			} else if (objaddress[i].id == "road") {
				addLabel = addLabel + objaddress[i].value + " 队(组) ";
				hiddenInput = hiddenInput
						+ "<input name='paRoad' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			} else if (objaddress[i].id == "number") {
				addLabel = addLabel + objaddress[i].value + " 号 ";
				hiddenInput = hiddenInput
						+ "<input name='paUnit' type='hidden' value='"
						+ objaddress[i].value + "'/>";
			} else if (objaddress[i].id == "confirm") {
				hiddenInput = hiddenInput
						+ "<input name='effective' type='hidden' value='"
						+ objaddress[i].value + "'/>";
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
	if(table.rows.length > 2){
		var liveLabel = "<input name='isLastAddress' value='2' type='hidden'/><input name='liveButton' type='button' value='激活' onclick='checkLiveAdderss(this)' /><font color='red'><b>非现住</b></font>";
	}
	else{
		var liveLabel = "<input name='isLastAddress' value='1' type='hidden'/><input name='liveButton' type='button' value='已激活' onclick='checkLiveAdderss(this)' disabled/><font color='green'><b>现住</b></font>";
	}
	// 添加一个空行	var row = table.insertRow(1);
	row.height = '30px';
	var td1 = row.insertCell(0);
	td1.align = 'center';
	var td2 = row.insertCell(1);
	td2.align = 'center';
	var td3 = row.insertCell(2);
	td3.align = 'center';
	var td4 = row.insertCell(3);
	td4.align = 'center';
	// 改变空行内容
	td1.innerHTML = addressTypeLabel + hiddenInput;
	td2.innerHTML = addLabel;
	td3.innerHTML = liveLabel;
	td4.innerHTML = "<input type='button' value='删除' onclick='javascript:deleteTheAddress(this)'/>";
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
	if (table.rows.length > 2) {
		table.rows[table.rows.length - 1].style.display = 'none';
	}
	document.getElementById('commitButton').focus();
}

//更改户籍地址类型
function changeRegAddressType(target){
	if(target.options[target.selectedIndex].value == '1'){//区内
		document.getElementById("street3Label").style.display = 'inline';
	}else{//区外
		document.getElementById("street3Label").style.display = 'none';
	}
}

//添加户籍地址
function addNewRegAddress(position){
	var typeSelectObj = position.parentNode.parentNode.getElementsByTagName("SELECT")[0];
	var addressInputs = position.parentNode.parentNode.getElementsByTagName("INPUT");
	var addressInputHtml,addressText,enableStatus;
	var typeText;
	if(typeSelectObj.options[typeSelectObj.selectedIndex].value=='1'){//选择区内
		//校验
		var inputSelectValue = "";
		var inputSelectName = "";
		var detailInfo = "";
		for (var i = 0; i < addressInputs.length; i++) {
			if ((addressInputs[i].value == "" || addressInputs[i].value == "请输入")
					&& addressInputs[i].type != "hidden") {
				alert("有未填写的输入项！！");
				if (addressInputs[i].value != "请输入") {
					addressInputs[i].focus();
				}
				return;
			}else{
				if(addressInputs[i].type != "hidden" && addressInputs[i].className == 'selectInputAjax'){
					inputSelectName = addressInputs[i].value;
				}else if(addressInputs[i].type == "hidden"){
					inputSelectValue = addressInputs[i].value;
				}else if(addressInputs[i].id == "regAddressXM"){
					detailInfo = addressInputs[i].value;
				}
			}
		}
		//拼接地址
		addressInputHtml = "<input name='type' type='hidden' value='1'>" + 
								"<input name='streetCode' type='hidden' value='" +
								inputSelectValue + "'>" + 
								"<input name='detialInfo' type='hidden' value='" + 
								detailInfo + "'>";
		addressText = inputSelectName + "(街道) " + detailInfo;
		typeText = "区内";
	}else if(typeSelectObj.options[typeSelectObj.selectedIndex].value=='2'){//选择区外
		//校验
		for (var i = 0; i < addressInputs.length; i++) {
			var detailInfo;
			if (addressInputs[i].value == "" && addressInputs[i].id != "street3" && addressInputs[i].style.display != 'none'){
				alert("有未填写的输入项！！");
				addressInputs[i].focus();
				return;
			}else if(addressInputs[i].id == "regAddressXM"){
				detailInfo = addressInputs[i].value;
			}
		}
		//拼接地址
		addressInputHtml = "<input name='type' type='hidden' value='2'>" + 
							"<input name='detialInfo' type='hidden' value='" + 
							detailInfo + "'>";
		addressText = detailInfo;
		typeText = "区外";
	}
	var regAddressTable = document.getElementById("regAddressTable");
	if(regAddressTable.rows.length > 2){
		statusHtml = "<input name='xybz' value='2' type='hidden'/><input type='button' value='激活' onclick='checkRegAdderss(this)' /><font color='red'><b>非现用</b></font>";
	}
	else{
		statusHtml = "<input name='xybz' value='1' type='hidden'/><input type='button' value='已激活' onclick='checkRegAdderss(this)' disabled/><font color='green'><b>现用</b></font>";
	}
	addressInputHtml = addressInputHtml + "<input name='scbz' type='hidden' value='0'>";
	//添加一行
	var row = regAddressTable.insertRow(1);
	row.height = '30px';
	var td1 = row.insertCell(0);
	td1.align = 'center';
	var td2 = row.insertCell(1);
	td2.align = 'center';
	var td3 = row.insertCell(2);
	td3.align = 'center';
	var td4 = row.insertCell(3);
	td4.align = 'center';
	// 改变空行内容
	td1.innerHTML = typeText;
	td2.innerHTML = addressInputHtml + addressText;
	td3.innerHTML = statusHtml;
	td4.innerHTML = "<input type='button' value='删除' onclick='javascript:deleteTheAddress(this)'/>";
	// 清空单元格
	for (var j = 0; j < addressInputs.length; j++) {
		if (addressInputs[j].type == 'text') {
			if (addressInputs[j].size == 15) {
				addressInputs[j].value = '请输入';
				addressInputs[j].style.color = '#666666';
			} else {
				addressInputs[j].value = '';
			}
		}
	}
	// 隐藏提示信息
	if (regAddressTable.rows.length > 2) {
		regAddressTable.rows[regAddressTable.rows.length - 1].style.display = 'none';
	}
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
		var inputs = table.rows[i].cells[2].getElementsByTagName('INPUT');
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
	for(var i = 1 ; i < table.rows.length-1 ; i++){
		var inputs = table.rows[i].cells[2].getElementsByTagName('INPUT');
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

// 添加另外的电话
function addNewPhone(postion) {
	// 验证
	if (event.keyCode == 13) {
		if (postion.value == 1) {
			var rownum;
			var tr = postion.parentNode.parentNode;
			var trs = tr.parentNode.getElementsByTagName("tr");
			for (var i = 0; i < trs.length; i++) {
				if (tr == trs[i]) {
					rownum = i + 1;
				}
			}
			var newTR = tr.parentNode.parentNode.insertRow(rownum);
			var td1 = newTR.insertCell(0);
			var td2 = newTR.insertCell(1);
			td1.innerHTML = "其他电话号码&nbsp;&nbsp;";
			td1.align = "right";
			td1.style.background = "#D3DEF1";
			td2.innerHTML = "<input name='phoneList' type='hidden'>" 
					+ "<input name='phoneNumber' type='text' onfocus='this.select();' maxlength='20' value='' onkeydown='TabKeyEvent(this);' onfocus='this.select();' size='11'>"
					+ "	<font color='red'>* </font><b>是否首选</b>"
					+ "	<input name='isPreferred' type='text' value='2' size='1' maxlength='1' onchange='checkFirst(this)' onkeydown='TabKeyEvent(this);' onfocus='this.select();'>"
					+ "	<font color='blue'>(1-首选 2-非首选)&nbsp;&nbsp;</font>"
					+ "	<b>是否继续添加</b><input type='text' size='1' value='2' maxlength='1' onkeydown='addNewPhone(this);' onfocus='this.select();'/>"
					+ "	<font color='blue'>(1-是 2-否)&nbsp;</font>"
					+ "	<input name='effective' type='hidden' value='1'/>"
					+ "	<input type='button' onClick='javascript:deleteThePhone(this);' value='删除' onkeydown='TabKeyEvent(this);'/>";
			td2.colSpan = "5";
			TabKeyEvent();
		} else {
			TabKeyEvent();
		}
	}
}

// 删除创建的电话function deleteThePhone(postion) {
	var table = postion.parentNode.parentNode.parentNode;
	for (var i = 0; i < table.childNodes.length; i++) {
		if (table.rows[i] == postion.parentNode.parentNode) {
			var inputs = table.rows[i].getElementsByTagName('INPUT');
			for (var j = 0; j < inputs.length; j++) {
				if (inputs[j].name == 'first' && inputs[j].value == 1) {
					alert("无法删除首选电话！如果想删除此电话，请将其置为非首选！");
					return;
				}
			}
			table.deleteRow(i);
			return;
		}
	}
}

// 选取电话的首选function checkFirst(target) {
	var firsts = document.getElementsByName("isPreferred");
	if (firsts.length == 1 && target == firsts[0]) {
		if (target.value == 2) {
			alert("对不起必须有一个首选项!");
			target.value = 1;
		}
	} else {
		for (var i = 0; i < firsts.length; i++) {
			if (target.value == 1) {// 选中
				if (firsts[i] != target) {
					if (firsts[i].value == 1) {
						firsts[i].value = 2;
					}
				} else {
					firsts[i].value = 1;
				}
			} else {// 取消
				target.value = 1;
				alert("必须有一个首选的电话号码!!");
			}
		}
	}
}
// 以上是电话

// 数据编码校验与提交
function commit() {
	var errorMessage = "";
	var role1 = /[\u4e00-\u9fa5]|[\d]|[\w]|[_]/;// 校验标准1：数字，字母，中文及_
	var role2 = /[\d]|[\w]|[_]/;// 校验标准2：数字，字母及_
	var role3 = /[\d]/;// 校验标准3：数字
	var role4 = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;// 校验标准4：邮箱校验
	var role5 = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;// 校验标准5：电话校验
	var role6 = /[1-9]{1}(\d+){5}/;// 校验标准6：邮编校验
	var role7 = /\d{18}|\d{15}/;// 校验标准7：身份证校验
	var role8 = /^(19|20)\d{2}(0?\d|1[012])(0?\d|[12]\d|3[01])$/;// 日期格式
	var onFocusElement = null;
	// 19990909
	// 姓名
	if (document.getElementById("XM").value == "") {
		errorMessage += "姓名不能为空！\n";
		if (onFocusElement == null) {
			onFocusElement = document.getElementById("XM");
		}
	}
	// 性别
	var xb = document.getElementById('personObj.xb').value;
	if (xb == "") {
		errorMessage += "性别不能为空！\n";
		if (onFocusElement == null) {
			onFocusElement = document.getElementById('personObj.xb');
		}
	}
	// 出生年月
	var csny = document.getElementById('CSNY').value;
	var csnyCorrect = false;
	if (csny != '') {
		if (!CheckyyyyMMdd(csny)) {
			errorMessage += "出生日期格式不正确！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('CSNY');
			}
		} else {
			document.getElementById('csnySubmit').value = csny.substring(0, 4)
					+ "-" + csny.substring(4, 6) + "-" + csny.substring(6, 8);
			csnyCorrect = true;
		}
	} else {
		errorMessage += "出生日期不能为空！\n";
		if (onFocusElement == null) {
			onFocusElement = document.getElementById('CSNY');
		}
	}
	// 民族
	var folk = document.getElementById('folkLabel').value;
	if (folk == '请输入') {
		errorMessage += "民族要选择！\n";
	} else if (document.getElementById('folk').value == '') {
		errorMessage += "民族重新选择！\n";
	}
	// 出生地
	var birthPlace = document.getElementById('province1Label').value;
	if (birthPlace == '请输入') {
		errorMessage += "出生地要选择！\n";
	} else if (document.getElementById('province1').value == '') {
		errorMessage += "出生地重新选择！\n";
	}
	// 籍贯
	var jiguan = document.getElementById('province2Label').value;
	if (jiguan == '请输入') {
		errorMessage += "籍贯要选择！\n";
	} else if (document.getElementById('province2').value == '') {
		errorMessage += "籍贯重新选择！\n";
	}
	// 国籍
	var country = document.getElementById('countryLabel').value;
	if (country == '请输入') {
		errorMessage += "国籍要选择！\n";
	} else if (document.getElementById('country').value == '') {
		errorMessage += "国籍重新选择！\n";
	}
	// 证件类型
	var zjlx = document.getElementById('personObj.zjlx').value;
	if (zjlx == "") {
		errorMessage += "证件类型不能为空！\n";
		if (onFocusElement == null) {
			onFocusElement = document.getElementById('personObj.zjlx');
		}
	}
	// 证件号
	var zjhIsAccuracy = true;
	var zjh = document.getElementById("ZJH").value;
	if (zjh == "") {
		zjhIsAccuracy = false;
		errorMessage += "证件号不能为空！\n";
		if (onFocusElement == null) {
			onFocusElement = document.getElementById("ZJH");
		}
	} else {
		if (zjlx == 1) {
			if (!IsIdCard(zjh)) {
				zjhIsAccuracy = false;
				errorMessage += "证件号格式不符合规范！\n";
				if (onFocusElement == null) {
					onFocusElement = document.getElementById("ZJH");
				}
			}else{//符合身份证规范
				if(trim(document.getElementById("SFLX").value) == "8" ){//如果卡类型是8（身份证） 
					if(zjh.toUpperCase() != document.getElementById("SFBZ").value){//判断是否和录入卡号相等
						zjhIsAccuracy = false;
						errorMessage += "你所录入的身份证号 和 改档案所对应的身份证号不一致！请核实！或者点击“上一步”查看录入的卡号是否有误！\n";
						if (onFocusElement == null) {
							onFocusElement = document.getElementById("ZJH");
						}
					}
				}
				//校验身份证的出生日期 和 录入的出生日期是否一致
//				if(zjh.length == 15 && csnyCorrect){//15位身份证
//					if(zjh.substring(6,12) != csny.substring(2,8)){
//						zjhIsAccuracy = false;
//						errorMessage += "你所录入的【身份证号】上的出生年月和所录入的【出生年月】不一致！\n";
//						if (onFocusElement == null) {
//							onFocusElement = document.getElementById("ZJH");
//						}
//					}
//				}else if (zjh.length == 18 && csnyCorrect){//18位身份证
//					if(zjh.substring(6,14) != csny.substring(0,8)){
//						zjhIsAccuracy = false;
//						errorMessage += "你所录入的【身份证号】上的出生年月和所录入的【出生年月】不一致！\n";
//						if (onFocusElement == null) {
//							onFocusElement = document.getElementById("ZJH");
//						}
//					}
//				}
			}
		}
	}
	if(zjhIsAccuracy){//如果 卡号正确
		document.getElementById("ZJH").value = zjh.toUpperCase(); //转成大写
	}
	// 电话号码
	var dhhm = document.getElementsByName('phoneNumber');
	var test = false;
	for (var i = 0; i < dhhm.length; i++) {
		if (dhhm[i].value == "") {
			test = true;// 有一个号码为空			if (onFocusElement == null) {
				onFocusElement = dhhm[i];
			}
		}
	}
	if (test) {
		errorMessage += "电话号码不能为空！\n";
	} else {
		for (var i = 0; i < dhhm.length; i++) {
			if (!role5.test(dhhm[i].value)) {
				errorMessage += "第" + (i + 1) + "个电话号码格式不正确！\n";
				if (onFocusElement == null) {
					onFocusElement = dhhm[i];
				}
			}
		}
	}
	// 地址校验
	// 地址未填写校验	var addressTable = document.getElementById('addressTable');
	if (addressTable.rows.length <= 1) {
		errorMessage += "没有添加地址！\n";
	}
	// 常住地址选择校验
	var lives = document.getElementsByName('isLastAddress');
	var chooseLive = true;
	var adressTableRow = document.getElementById('addressTable').rows;
	for (var i = adressTableRow.length - 2; i >= 1; i--) {
		if (adressTableRow[i].cells[2].innerText == '现住') {
			chooseLive = false;
		}
	}
	if (chooseLive) {
		errorMessage += "地址中有必须有一个现住地址！\n";
	}
	// 工作单位 联系人邮编 联系人电话
	var gzdwyb = document.getElementById("GZDWYB").value;
	if (gzdwyb != "" && !role6.test(gzdwyb)) {
		errorMessage += "工作单位邮编格式不符合规范！\n";
		if (onFocusElement == null) {
			onFocusElement = document.getElementById("GZDWYB");
		}
	}
	var lxryb = document.getElementById("LXRYB").value;
	if (lxryb != "" && !role6.test(lxryb)) {
		errorMessage += "联系人邮编格式不符合规范！\n";
		if (onFocusElement == null) {
			onFocusElement = document.getElementById("LXRYB");
		}
	}
	var lxrdh = document.getElementById("LXRDH").value;
	if (lxrdh != "" && !role5.test(lxrdh)) {
		errorMessage += "联系人电话格式不符合规范！\n";
		if (onFocusElement == null) {
			onFocusElement = document.getElementById("LXRDH");
		}
	}
	if (errorMessage != "") {
		alert(errorMessage);
		if (onFocusElement != null) {
			onFocusElement.focus();
		}
	} else {
		getManageDepartment();
	}
}
//建档页面增加新方法，提示输入第二遍身份证以确认。by 20110603 刘剑。//
//function checksfzsecondInput(obj){
//	if(obj.value==''){
//		return;
//	}
//	var zjlx = document.getElementById('personObj.zjlx').value;
//	if(zjlx!='1'){
//		return;
//	}
//	var zjh = obj.value;
//	var sfzsecondInput = prompt("为了确保身份证号输入的正确性，我们需要您再输入一遍身份证号以确认，谢谢！对此给您带来的不便深感抱歉。","");   
//	if(sfzsecondInput!=zjh){
//		alert("两次输入的身份证号不一致，清空重新输入！");
//		obj.value = "";
//		obj.focus();
//	}
//}
//禁止使用ctrl+c、ctrl+v。by 20110603 刘剑。//
//function forbidectrlcv(){
//	if (((window.event.ctrlKey) && (window.event.keyCode == 67))//ctrl+c
//		||((window.event.ctrlKey) && (window.event.keyCode == 86))) {//ctrl+v
//		event.keyCode = 0;
//		event.returnValue = false;
//	}
//}