/*******URL*******/
//户籍地 省
var provinceHjUrl = "getProvinceSelect.action";
//户籍地 市
var cityHjUrl = "getCitySelect.action";
//户籍地 区
var districtHjUrl = "getDistrictSelect.action";
//户籍地 街道
var streetHjUrl = "getStreetSelectZl.action";
//户籍地 居委
var villageHjUrl = "getNeighborhoodSelect.action";
//户籍地 路
var roadHjUrl = "getRoadSelect.action";
//居住地 省
var provinceUrl = "getProvinceSelect.action";
//居住地 市
var cityUrl = "getCitySelect.action";
//居住地 区
var districtUrl = "getDistrictSelect.action";
//居住地 街道
var streetUrl = "getStreetSelectZl.action";
//居住地 居委
var villageUrl = "getNeighborhoodSelect.action";
//居住地 路
var roadUrl = "getRoadSelect.action";
/*******ParentId 二级联动*******/
//户籍地 省市联动
var cityHjParentId = "provinceHj";
//户籍地 市区联动
var districtHjParentId = "cityHj";
//户籍地 区街道联动
var streetHjParentId = "districtHj";
//户籍地 街道居委联动
var villageHjParentId = "streetHj";
//居住地 省市联动
var cityParentId = "province";
//居住地 市区联动
var districtParentId = "city";
//居住地 区街道联动
var streetParentId = "district";
//居住地 街道居委联动
var villageParentId = "street";

//ParentId
var cityHjParentId = "provinceHj";
var districtHjParentId = "cityHj";
var streetHjParentId = "districtHj";
var villageHjParentId = "streetHj";

var cityParentId = "province";
var districtParentId = "city";
var streetParentId = "district";
var villageParentId = "street";

//页面载入
function initialize() {
	//锁input
	var disabledInput = $("input[name='disabled']");
	for(var i=0;i<disabledInput.length;i++){
		disabledInput[i].disabled = true;
	}
	var disabledSelect = $("select[name='disabled']");
	for(var j=0;j<disabledSelect.length;j++){
		disabledSelect[j].disabled = true;
	}

	
	//户籍地
	var hjp =$("#hjdProvince").val();
	if(hjp==""||hjp==null){
	var provinceHjLabel = document.getElementById("provinceHjLabel");
	provinceHjLabel.value = "上海市";
	var provinceHj = document.getElementById("provinceHj");
	provinceHj.value = "310000";
	}else {
		$("#provinceHj").attr("value",$("#hjdProvince").val());
	}
	var hjc =$("#hjdCity").val();
	if(hjc==""||hjc==null){
	var cityHjLabel = document.getElementById("cityHjLabel");
	cityHjLabel.value = "市辖区";
	var cityHj = document.getElementById("cityHj");
	cityHj.value = "310100";
	}else {
	$("#cityHj").attr("value",$("#hjdCity").val());
	}
	
	$("#districtHj").attr("value",$("#hjdDistrict").val());
	$("#streetHj").attr("value",$("#hjdTown").val());
	$("#villageHj").attr("value",$("#hjdVillage").val());
	$("#roadHj").attr("value",$("#hjdRoad").val());
	$("#roomHj").attr("value",$("#hjdRoom").val());
	$("#textHj").attr("value",$("#hjdText").val());
	//居住地
	var jzdp =$("#jzdProvince").val();
	if(jzdp==""||jzdp==null){
	var provinceLabel = document.getElementById("provinceLabel");
	provinceLabel.value = "上海市";
	var province = document.getElementById("province");
	province.value = "310000";
	}else {
	$("#province").attr("value",$("#jzdProvince").val());
	}
	var jzdc =$("#jzdCity").val();
	if(jzdc==""||jzdc==null){
	var cityLabel = document.getElementById("cityLabel");
	cityLabel.value = "市辖区";
	var city = document.getElementById("city");
	city.value = "310100";
	}else {
	$("#city").attr("value",$("#jzdCity").val());
	}
	$("#district").attr("value",$("#jzdDistrict").val());
	$("#street").attr("value",$("#jzdTown").val());
	$("#village").attr("value",$("#jzdVillage").val());
	$("#road").attr("value",$("#jzdRoad").val());
	$("#room").attr("value",$("#jzdRoom").val());
	$("#text").attr("value",$("#jzdText").val());
	$("#lxdh").attr("value",$("#dhhm").val());
	
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
function getAllAddress(){

	//户籍地
	$("#finalhrprovince").attr("value",$("#provinceHj").val());
	$("#finalhrcity").attr("value",$("#cityHj").val());
	$("#finalhrdistrict").attr("value",$("#districtHj").val());
	$("#finalhrtown").attr("value",$("#streetHj").val());
	$("#finalhrvillage").attr("value",$("#villageHj").val());
	$("#finalhrroad").attr("value",$("#roadHj").val());
	$("#finalhrroom").attr("value",$("#roomHj").val());
	$("#finalhrtext").attr("value",$("#textHj").val());
	//居住地
	$("#finalprovince").attr("value",$("#province").val());
	$("#finalcity").attr("value",$("#city").val());
	$("#finaldistrict").attr("value",$("#district").val());
	$("#finaltown").attr("value",$("#street").val());
	$("#finalvillage").attr("value",$("#village").val());
	$("#finalroad").attr("value",$("#road").val());
	$("#finalroom").attr("value",$("#room").val());
	$("#finaltext").attr("value",$("#text").val());
}
/*******校验地址*******/
function checkAddress(){

	var errMsg="";
	/*if($("#provinceHj").val()==""||$("#provinceHj").val()==null||$("#provinceHj").val()=="#"||$("#provinceHjLabel").val()==""||$("#provinceHjLabel").val()==null||$("#provinceHjLabel").val()=="请输入"){
		errMsg=errMsg+"请选择户籍地址（省、自治区、直辖市）...\n";
	}
	if($("#cityHj").val()==""||$("#cityHj").val()==null||$("#cityHj").val()=="#"||$("#cityHjLabel").val()==""||$("#cityHjLabel").val()==null||$("#cityHjLabel").val()=="请输入"){
		errMsg=errMsg+"请选择户籍地址（市、地区）...\n";
	}
	if($("#districtHj").val()==""||$("#districtHj").val()==null||$("#districtHj").val()=="#"||$("#districtHjLabel").val()==""||$("#districtHjLabel").val()==null||$("#districtHjLabel").val()=="请输入"){
		errMsg=errMsg+"请选择户籍地址（县、区）...\n";
	}*/
	
	if($("#streetHj").val()==""||$("#streetHj").val()==null||$("#streetHj").val()=="#"||$("#streetHjLabel").val()==""||$("#streetHjLabel").val()==null||$("#streetHjLabel").val()=="请输入"){
		//errMsg=errMsg+"请选择户籍地址（街道、镇）...\n";
		$("#hjwtbz").attr("value",1);
	}
	
	if($("#province").val()==""||$("#province").val()==null||$("#province").val()=="#"||$("#provinceLabel").val()==""||$("#provinceLabel").val()==null||$("#provinceLabel").val()=="请输入"){
		errMsg=errMsg+"请选择居住地址（省、自治区、直辖市）...\n";
	}
	if($("#city").val()==""||$("#city").val()==null||$("#city").val()=="#"||$("#cityLabel").val()==""||$("#cityLabel").val()==null||$("#cityLabel").val()=="请输入"){
		errMsg=errMsg+"请选择居住地址（市、地区）...\n";
	}
	if($("#district").val()==""||$("#district").val()==null||$("#district").val()=="#"||$("#districtLabel").val()==""||$("#districtLabel").val()==null||$("#districtLabel").val()=="请输入"){
		errMsg=errMsg+"请选择居住地址（县、区）...\n";
	}
	if($("#street").val()==""||$("#street").val()==null||$("#street").val()=="#"||$("#streetLabel").val()==""||$("#streetLabel").val()==null||$("#streetLabel").val()=="请输入"){
		errMsg=errMsg+"请选择居住地址（街道、镇）...\n";
	}
	return errMsg;
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
//处理户籍地址为List可以接收

function soluteRegAddressList(){
/*
	var regAddressTable = document.getElementById("regAddressTable");
	if(regAddressTable!=null){
	for(var i = 0 ; i < regAddressTable.rows.length-1 ; i++){
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
*/
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
	
	// 添加一个空行
	var row = table.insertRow(1);
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
	//if (table.rows.length > 2) {
		//table.rows[table.rows.length - 1].style.display = 'none';
	//}
	
	initializeAddress();
	document.getElementById('button2').focus();
}

//后台对象
//private List<TbJkglPersonHrAddress> hjAddressList;// 长宁户籍List