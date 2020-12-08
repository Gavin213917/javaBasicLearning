/* inputSelectAjax的全局变量 */
// URL
//---地址所需
var street1Url = "getStreetSelect.action";
var street2Url = "getStreetSelect.action";
var street3Url = "getStreetSelect.action";
var villageUrl = "getVillagesSelect.action";
var neighborhoodsUrl = "getNeighborhoodsSelect.action";
//ParentID
var neighborhoodsParentId = "street3";
var villageParentId = "street2";
//---全区医院所需
var bfzjmxbyy1Url = "getAllYljgdm.action";
var bfzjmxbyy2Url = "getAllYljgdm.action";
var bfzjmxbyy3Url = "getAllYljgdm.action";
var bfzjmxbyy4Url = "getAllYljgdm.action";
var bfzjmxbyy5Url = "getAllYljgdm.action";
var bfzjmxbyy6Url = "getAllYljgdm.action";
var bfzjmxbyy7Url = "getAllYljgdm.action";
var bfzjmxbyy8Url = "getAllYljgdm.action";
var bfzjmxbyy9Url = "getAllYljgdm.action";
var bfzjmxbyy10Url = "getAllYljgdm.action";
var bfzjmxbyy11Url = "getAllYljgdm.action";
var bfzjmxbyy12Url = "getAllYljgdm.action";
var bfzjmxbyy13Url = "getAllYljgdm.action";
var bfzjmxbyy14Url = "getAllYljgdm.action";
var bfzjmxbyy15Url = "getAllYljgdm.action";

// 建议转诊标志
var zzbz = false;
// 是否 继承上次的病例种类 若上次是正常 认为没有继承
var sfjcbl = false;

//用于添加 并发症 的行 所用var TableArrayRows = [];

//并发症 联动 信息 对象
var linkInfoObject = {
	'bfz' : {
				'1' : {
						'1' : '冠心病',
						'2' : '脑血管疾病',
						'3' : '周围血管疾病',
						'17' : '其它'
					  },
				'2' : {
						'4' : '肾病',
						'5' : '神经病变',
						'6' : '视网膜病',
						'17' : '其它'
					  },
				'3' : {
						'7' : '酮症酸中毒'
					  },
				'4' : {
						'8' : '非酮症性昏迷'
				      }
			},
	'bfbjgr' : {
			   		'1' : {
			   				'9' : '低血糖症'
			   			  },
			   		'2' : {
			   				'10' : '皮肤真菌感染',
			   				'11' : '阴道炎',
			   				'12' : '膀胱炎',
			   				'13' : '肾盂肾炎',
			   				'17' : '其它'
			   			  }	
			   }
};


/* 初始化页面信息 */
function init() {
	//选择9.14日 是否显示TR
	changeblzl(document.getElementById('blzlSelect'));
	//病例种类 初始化 选择
	if(document.getElementById('lastBlzl').value != ''){
		if(document.getElementById('lastBlzl').value != 0){
			//需要disable掉的病例种类
			document.getElementById('blzlSelect').value = document
					.getElementById('lastBlzl').value;
			document.getElementById('blzlSelect').disabled = true;
			sfjcbl = true; //继承病例
		}
	}
	//更新医院下拉
	AjaxCall({
		url : 'getYYList.action',
		recall : updateSelect
	});
}

/* 更新医院选择下拉的信息 和 并发症及慢性病医院 和 并发症及慢性病诊断时间*/
function updateSelect(result) {
	var bzzdsjs = document.getElementsByName('bzzdsj');
	for (var i = 0; i < bzzdsjs.length; i++) {
		if(bzzdsjs[i].type != 'hidden'){//更新不是隐藏的并发症日期
			bzzdsjs[i].value = document.getElementById('visiting.bcsfjlrq').value;//默认今天
		}
	}
	var sfdw = document.getElementById("sfdwcode").value;
	if(document.getElementById("sfdwcode").tagName == 'INPUT'){//普通医院登录
		for (var j = 0; j < result.length; j++) { // 循环解析
			if (result[j].CODE == sfdw) {
				document.getElementById('sfdwname').value = result[j].NAME;
			}
		}
	}else {//卫生局 或者 疾控 登录
		for (var j = 0; j < result.length; j++) { // 循环解析
			var option = document.createElement("OPTION");
			option.value = result[j].CODE;
			option.text = result[j].NAME;
			document.getElementById("sfdwcode").options.add(option); // 把列表值添加到下拉菜单中
		}
	}
	updateYyCode();
}

/* 更新 以前并发症 的 就诊医院信息 */
function updateYyCode(){
	//判断转诊
	var mxbradio = document.getElementById('mxbradio');
	var bfbjgrradio = document.getElementById('bfbjgrradio');
	var bfzradio = document.getElementById('bfzradio');
	//初始化是否得并发症情况 来设置建议转诊
	if(bfzradio.checked == true 
		|| bfbjgrradio.checked == true 
		|| mxbradio.checked == true){
			 document.getElementById('sfjyzzYes').checked = true;
			 zzbz = true;//转诊标志更改
	}
	//翻译诊断医院名称
	var yyCodeList = document.getElementsByName('bzzdyy');
	for(var i = 0 ; i < yyCodeList.length ; i++){
		var inputValue = yyCodeList[i].value;
		var fontElement = yyCodeList[i].parentNode.getElementsByTagName('FONT')[0];
		if(yyCodeList[i].disabled == false){
			AjaxCall({
				url : 'getYYNameByCodeAjax.action',
				data : {'yyCode' : inputValue},
				context : fontElement,
				recall : function(context,result){
					context.innerText =  result.yyName;
				}
			});
		}
	}
}

/* 改变是否转型radio */
function changeSFZX(target) {
	var zxlx = document.getElementById('zxtd').getElementsByTagName('INPUT');
	var blzl = document.getElementById('blzlSelect');
	var blzlHidden = document.getElementById('blzlHidden');
	var zxth = document.getElementById('zxth');
	var zxtd = document.getElementById('zxtd');
	if (target.checked == true) {//发生转型
		//9.14 隐藏td
		zxth.style.display = 'inline';
		zxtd.style.display = 'inline';
		target.parentNode.colSpan = 2;
		document.getElementById('blzltr').style.display = 'none';
		for(var i = 0 ; i < zxlx.length ; i++){
			zxlx[i].disabled = false;
		}
		blzl.disabled = true;
		blzlHidden.disabled = true;
	} else {//不发生转型
		zxth.style.display = 'none';
		zxtd.style.display = 'none';
		target.parentNode.colSpan = 5;
		document.getElementById('blzltr').style.display = 'inline';
		for(var i = 0 ; i < zxlx.length ; i++){
			zxlx[i].disabled = true;
		}
		if(!sfjcbl){//如果没有继承病例 可以修改
			blzl.disabled = false;
		}
		blzlHidden.disabled = false;
	}
}

/* 改变服药情况 */ //9.14
function changeFYQK(target){
	var yylzth = document.getElementById('yylzth');//隐藏的TH
	var yylztd = document.getElementById('yylztd');//隐藏的TD
	var allYpInputs = yylztd.getElementsByTagName('INPUT');//所有的服药种类
	if (target.checked == true) {//不服用药物
		// 隐藏td
		yylzth.style.display = 'none';
		yylztd.style.display = 'none';
		for(var i = 0 ; i < allYpInputs.length ; i++ ){
			allYpInputs[i].disabled = true;		
		}
		target.parentNode.colSpan = 5;
	} else {//服用药物
		yylzth.style.display = 'inline';
		yylztd.style.display = 'inline';
		target.parentNode.colSpan = 2;
		for(var i = 0 ; i < allYpInputs.length ; i++ ){
			allYpInputs[i].disabled = false;		
		}
	}
}

/* 改变病例种类 */
function changeblzl(target) {
	var inputs = document.getElementsByName('visiting.sffszx');
	document.getElementById('blzlHidden').value = target.options[target.selectedIndex].value;
	if (target.options[target.selectedIndex].value != 5
			&& target.options[target.selectedIndex].value != 6
			&& target.options[target.selectedIndex].value != 3
			&& target.options[target.selectedIndex].value != 4) {
		//document.getElementById('sffszxtr').style.display = "none";		
		for (var i = 0; i < inputs.length; i++) {
			inputs[i].disabled = true;
		}
		document.getElementById('hiddensffszx').disabled = false;
	} else {//选择【IGR】 和 【其他】   【营养不良】
		document.getElementById('sffszxtr').style.display = "inline";	
		for (var i = 0; i < inputs.length; i++) {
			inputs[i].disabled = false;
		}
		document.getElementById('hiddensffszx').disabled = true;
	}
}

//当地址checkbox改变触发的事件 9.14日
function checkCheckBox(target){
	if(target.checked == true){
		var inputs = target.parentNode.parentNode.getElementsByTagName('INPUT');
		for(var i = 0 ; i < inputs.length ; i++){
			if(inputs[i] != target){
				inputs[i].disabled = false;
			}
		}
	}else{
		var inputs = target.parentNode.parentNode.getElementsByTagName('INPUT');
		for(var i = 0 ; i < inputs.length ; i++){
			if(inputs[i] != target){
				inputs[i].disabled = true;
			}
		}
	}
}

//点击地址的checkbox 9.14日
function clickCheckBox(target){
	if(target.checked == true){
		var checkboxes = document.getElementsByName('pType');
		for(var i = 0 ; i < checkboxes.length ; i++){
			if(checkboxes[i] != target 
			&& checkboxes[i].checked == true){
				checkboxes[i].checked = false;
			}
		}
	}
}

//激活原地址 9.14日
function activeOldAddress(target){
	var addTypes = document.getElementsByName("pType");
	for(var i = 0 ; i < addTypes.length ; i++){
		if(addTypes[i].disabled == false){
			addTypes[i].checked = false;
			addTypes[i].disabled = true;
		}
	}
	var activeButtons = document.getElementsByName("active");
	for(var i = 0 ; i < activeButtons.length ; i++){
		if(activeButtons[i] != target && activeButtons[i].disabled == true){
			activeButtons[i].disabled = false;
			activeButtons[i].value = "激活现住";
			var inputs = activeButtons[i].parentNode.getElementsByTagName("INPUT");
			for(var j = 0 ; j < inputs.length ; j++){
				if(inputs[j] != activeButtons[i]){
					inputs[j].disabled = true;
				}
			}
		}
	}
	target.value = "已激活";
	target.disabled = true;
	var inputs = target.parentNode.getElementsByTagName("INPUT");
	for(var j = 0 ; j < inputs.length ; j++){
		if(inputs[j] != target){
			inputs[j].disabled = false;
		}
	}
}

/* 更改转归状态取值 */
function changeZg() {
	var zg = document.getElementById("visiting.zg").value;// 取转归状态的值	if (zg == 4 || zg == 5) {// 失访/拒访
		hiddenOrShowYycxsfrq(true);
		document.getElementById("qcButton").style.display = "none";
		document.getElementById("visiting.zgyy").style.display = "inline";// 显示原因输入框		document.getElementById("visiting.zgyy").disabled = false;
		document.getElementById("qcdz").style.display = "none";
		document.getElementById("qcdzframe").style.display = "none";
		makeInputOfTheElementDisabled(document.getElementById("addressTable"));
	} else if (zg == 1 || zg == 3 || zg == 6 || zg == -1) {// 继续随访/死亡/暂时性失访
		if(zg == 3){
			hiddenOrShowYycxsfrq(false);
		}else{
			hiddenOrShowYycxsfrq(true);
		}
		document.getElementById("qcButton").style.display = "none";
		document.getElementById("visiting.zgyy").style.display = "none";
		document.getElementById("visiting.zgyy").disabled = true;
		document.getElementById("qcdz").style.display = "none";
		document.getElementById("qcdzframe").style.display = "none";
		makeInputOfTheElementDisabled(document.getElementById("addressTable"));
	} else if (zg == 2) {// 迁出
		hiddenOrShowYycxsfrq(true);
		document.getElementById("qcButton").style.display = "inline";
		document.getElementById("visiting.zgyy").style.display = "none";
		document.getElementById("visiting.zgyy").disabled = true;
		document.getElementById("qcdz").style.display = "inline";// 显示迁出地址输入框
		document.getElementById("qcdzframe").style.display = "inline";
		makeInputOfTheElementAbled(document.getElementById("addressTable"));
	} else {
		hiddenOrShowYycxsfrq(true);
		document.getElementById("qcButton").style.display = "none";
		document.getElementById("visiting.zgyy").style.display = "none";
		document.getElementById("visiting.zgyy").disabled = true;
		document.getElementById("qcdz").style.display = "none";
		document.getElementById("qcdzframe").style.display = "none";
		makeInputOfTheElementDisabled(document.getElementById("addressTable"));
	}
	if(zg == 3 || zg == 4 || zg == 5 || zg == 6){//如果选择 /失访/拒访/死亡/暂时性失访
		makeTrDisabledAndViable(false);
	}else{
		makeTrDisabledAndViable(true);
	}
}

/** 显示或者隐藏 下次随访记录时间 **/
/** visable = true 显示 visable = false 隐藏**/
function hiddenOrShowYycxsfrq(visable){
	var yycxsfrq = document.getElementById("visiting.yyxcsfrq");
	var yycxsfrqTds = yycxsfrq.parentNode.parentNode.cells;
	if(visable){
		yycxsfrq.disabled = false;
		yycxsfrqTds[1].colSpan = 2;
		yycxsfrqTds[2].style.display = 'inline';
		yycxsfrqTds[3].style.display = 'inline';
	}else{
		yycxsfrq.disabled = true;
		yycxsfrqTds[1].colSpan = 5;
		yycxsfrqTds[2].style.display = 'none';
		yycxsfrqTds[3].style.display = 'none';
	}
}

/* 设置触发TR到倒数第二排TR不可见 */
function makeTrDisabledAndViable(visable){
	var firstTable = document.getElementById('firstTable');
	var middleTable = document.getElementById('middleTable');
	var lastTable = document.getElementById('lastTable');
	var middleDownTable = document.getElementById('middleDownTable');
	var startIndex = event.srcElement.parentNode.parentNode.rowIndex + 1;
	if(visable == true){//显示出来
		for(var i=startIndex;i < firstTable.rows.length ; i++){
			if(firstTable.rows[i].id != "sffszxtr"){
				firstTable.rows[i].style.display = 'inline';
			}
		}
		for(var i = 0; i < middleTable.rows.length ; i++){
			middleTable.rows[i].style.display = 'inline';
		}
		for(var i = 0; i < middleDownTable.rows.length ; i++){
			middleDownTable.rows[i].style.display = 'inline';
		}
		for(var i = 0; i < lastTable.rows.length-1 ; i++){
			lastTable.rows[i].style.display = 'inline';
		}
	}else{//隐藏
		for(var i=startIndex;i < firstTable.rows.length ; i++){
			firstTable.rows[i].style.display = 'none';
		}
		for(var i = 0; i < middleTable.rows.length ; i++){
			middleTable.rows[i].style.display = 'none';
		}
		for(var i = 0; i < middleDownTable.rows.length ; i++){
			middleDownTable.rows[i].style.display = 'none';
		}
		for(var i = 0; i < lastTable.rows.length-1 ; i++){
			lastTable.rows[i].style.display = 'none';
		}
	}
	
}

/* 通用方法：根据鼠标提示符焦点，自动更新指定输入框信息 */
function fillInput(name, num) {// name：输入框系列名称/num：输入框系列序号
	document.getElementById(name).value = document.getElementById(name + num).value;
}

/* 通用方法：根据checkbox显示、隐藏input、并使div无效 */
function onclickShow(checkId, inputId) {
	if (document.getElementById(checkId).checked) {
		document.getElementById(inputId).style.width = "80%";
		document.getElementById(inputId).style.display = "inline";
		document.getElementById(inputId).disabled = false;
	} else {
		document.getElementById(inputId).style.display = "none";
		document.getElementById(inputId).disabled = true;
	}
}

/* 通用方法：下拉菜单两级联动(父菜单) */
function changeParentSelect(target, zl) {
	var linkTargetSelect;//目标select
	var selectes = target.parentNode.parentNode.getElementsByTagName('SELECT');
	for(var j = 0 ; j < selectes.length ; j++){
		if(selectes[j] != target){//添加一个option
			linkTargetSelect = selectes[j];
		}
	}
	while(linkTargetSelect.options.length>0) {//先清空需要更新下拉菜单中的选项
		linkTargetSelect.removeChild(linkTargetSelect.childNodes[0]);
	}
	var selectValue = target.options[target.selectedIndex].value;
	var resultObject = linkInfoObject[zl][selectValue];
	for(var i in resultObject){
		var option = document.createElement('OPTION');
		option.value = i;
		option.text = resultObject[i];
		linkTargetSelect.options.add(option);
	}
	//是【其它】隐藏
	var inputs =  target.parentNode.parentNode.getElementsByTagName("INPUT");
	for(var i = 0 ; i < inputs.length ; i++){
		if(inputs[i].name == 'bzmcqt'){
			inputs[i].style.display = 'none';
			inputs[i].disabled = true;;
		}
	}
}

/* 通用方法：下拉菜单两级联动(子菜单) */
function changeChildSelect(target){
	var QTinput;
	var inputs =  target.parentNode.getElementsByTagName("INPUT");
	for(var i = 0 ; i < inputs.length ; i++){
		if(inputs[i].name == 'bzmcqt'){
			QTinput = inputs[i];
		}
	}
	if(target.options[target.selectedIndex].value == '17'){//选了【其它】
		QTinput.style.display = 'inline';
		QTinput.disabled = false;
	}else{//没有选择【其它】
		QTinput.style.display = 'none';
		QTinput.disabled = true;
	}
}

/* 通用方法：根据radio显示、隐藏div */
function onclickRadioShow(target, divId) {
	if (target.checked) {
		document.getElementById(divId).style.display = "inline";
		var showTable = document.getElementById(divId).getElementsByTagName('TABLE')[0];
		for(var j = 1 ; j < showTable.rows.length ; j++){
			var trobj = showTable.rows[j];
			if(j == 1){
				trobj.style.display = 'inline';
			}
			if(trobj.style.display != 'none'){//如果可见
				var inputs = trobj.getElementsByTagName('INPUT');
				var selects = trobj.getElementsByTagName('SELECT');
				for (var i = 0; i < inputs.length; i++) {
					inputs[i].disabled = false;
				}
				for (var i = 0; i < selects.length; i++) {
					selects[i].disabled = false;
				}
			}
		}
		zzbz = true;//转诊标志更改
		document.getElementById("sfjyzzYes").checked = true;
	} else {
		var showTable = document.getElementById(divId).getElementsByTagName('TABLE')[0];
		for(var j = 1 ; j < showTable.rows.length ; j++){
			var trobj = showTable.rows[j];
			if(trobj.style.display != 'none'){//如果可见
				var inputs = trobj.getElementsByTagName('INPUT');
				var selects = trobj.getElementsByTagName('SELECT');
				for (var i = 0; i < inputs.length; i++) {
					inputs[i].disabled = true;
				}
				for (var i = 0; i < selects.length; i++) {
					selects[i].disabled = true;
				}
			}
		}
		document.getElementById(divId).style.display = "none";
		if(document.getElementById('bfbjgrradio').checked == false 
		&& document.getElementById('bfzradio').checked == false 
		&& document.getElementById('mxbradio').checked == false){//判断另外3个radio是否选择 “有” 
			zzbz = false;//转诊标志更改
			document.getElementById("sfjyzzNo").checked = true; 
		}
	}
}
/* 通用方法：循环显示、隐藏div */
function circleShowDiv(tableId, beginNum, endNum) {
	var tempNum = 0;
	for (var i = beginNum; i < endNum + 1; i++) {
		if (document.getElementById(tableId).rows[i].style.display == "none") {
			tempNum = i;
			break;
		}
	}
	if (tempNum > beginNum - 1 && tempNum < endNum + 1) {
		document.getElementById(tableId).rows[i].style.display = "inline";
		var inputs = document.getElementById(tableId).rows[i]
				.getElementsByTagName('INPUT');
		var selects = document.getElementById(tableId).rows[i]
				.getElementsByTagName('SELECT');
		for (var i = 0; i < inputs.length; i++) {
			inputs[i].disabled = false;
		}
		for (var i = 0; i < selects.length; i++) {
			selects[i].disabled = false;
		}
	} else {
		alert("只能显示" + endNum + "行...");
	}
}

 
/* 通用方法：隐藏div */
function hideDiv(target) {
	var trobj = target.parentNode.parentNode;
	trobj.style.display = "none";
	var inputs = trobj.getElementsByTagName('INPUT');
	var selects = trobj.getElementsByTagName('SELECT');
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].disabled = true;
	}
	for (var i = 0; i < selects.length; i++) {
		selects[i].disabled = true;
	}
}

/* 有“以上皆无”的checkBox组 选择后出发的事件 */
function checkTheCheckBoxes(target) {
	if (target.id == "fywzlqk8" || target.id == "jszk11"
			|| target.id == "lczz11") {
		if (target.checked == true) {
			var inputs = target.parentNode.parentNode.parentNode
					.getElementsByTagName('INPUT');
			for (var i = 0; i < inputs.length; i++) {
				if (inputs[i].type == 'checkbox' && inputs[i] != target) {
					inputs[i].checked = false;
				}
			}
		}
	} else {
		if (target.checked == true ) {
			var inputs = target.parentNode.parentNode.parentNode
					.getElementsByTagName('INPUT');
			for (var i = 0; i < inputs.length; i++) {
				if (inputs[i].type == 'checkbox'
						&& (inputs[i].id == "fywzlqk8"
								|| inputs[i].id == "jszk11" || inputs[i].id == "lczz11")) {
					inputs[i].checked = false;
				}
			}
		} 
	}
}
/* 建议转诊 */
function triggerZz(target){
	if(target.value != "" && target.value >= parseFloat('11.1')){
		zzbz = true;//转诊标志更改
		document.getElementById("sfjyzzYes").checked = true; 
	}else if(zzbz == false){
		document.getElementById("sfjyzzNo").checked = true; 
	}
}

/* 是否建议转诊选择 */
function checkRadio(target){
	if(target.checked == true && zzbz){
		if(window.confirm("您填写的随访卡的指标可能应该触发非定向转诊，是否取消这次非定向转诊?")){
			zzbz = false;
		}else{
			document.getElementById('sfjyzzYes').checked = true;
		}
	}
}

/** 地址填写 */
/* 重置地址信息，默认为符号# */


/* 置div下面的input为disabled = false */
function makeInputOfTheElementDisabled(element) {
	element.style.display = 'none';
	var inputs = element.getElementsByTagName('INPUT');
	for (var i = 0; i < inputs.length; i++) {
		//特殊处理 这个input的设置为无效 只能是点激活的时候
		if(inputs[i].name != "personAddress.sysid" && inputs[i].type != "button"){
			inputs[i].disabled = true;
		}
	}
}

/* 置div下面的input为disabled = true */
function makeInputOfTheElementAbled(element) {
	element.style.display = 'inline';
	var inputs = element.getElementsByTagName('INPUT');
	for (var i = 0; i < inputs.length; i++) {
		//特殊处理 这个input的设置为有效 只能是点激活的时候
		if(inputs[i].name != "personAddress.sysid" && inputs[i].type != "button"){
			inputs[i].disabled = false;
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

/* 提交 */
function commit() {
	// 提交表单
	/*首先执行所有有onkeyup校验的input的修正函数*/
	var allinputs = document.getElementsByTagName("INPUT");
	for(var i = 0 ; i < allinputs.length ; i++){
		if(allinputs[i].onkeyup != null && 
			allinputs[i].type == "text" && 
			allinputs[i].onkeyup.toString().indexOf("check") > -1){
			allinputs[i].onkeyup();//触发事件 修正input
		}
	}
	/* 校验流程开始 */
	var errorMessage = "";
	var onFocusElement = null;
	//根据转归类型进行相关的校验
	var zgValue = document.getElementById('visiting.zg').value;
	if(zgValue == 3 || zgValue == 4 || zgValue == 5 || zgValue == 6){//需简单校验
		// 随访时间检验
		var bcsfsj = document.getElementById('visiting.bcsfjlrq').value;
		if (bcsfsj == null || bcsfsj == "") {
			errorMessage += "【本次随访时间】为空！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.bcsfjlrq');
			}
		}
		var yysfsj = document.getElementById('visiting.yyxcsfrq').value;
		if(zgValue != 3){//如果 不是死亡
			if (yysfsj == null || yysfsj == "") {
				errorMessage += "【预约随访时间】为空！\n";
				if (onFocusElement == null) {
					onFocusElement = document.getElementById('visiting.yyxcsfrq');
				}
			}
			if(bcsfsj != null && yysfsj != null && yysfsj != "" && bcsfsj != ""){
				if(bcsfsj.split("-") > yysfsj.split("-")){
					errorMessage += "【预约随访时间】必须在【本次随访时间】之后！\n";
					if (onFocusElement == null) {
						onFocusElement = document.getElementById('visiting.yyxcsfrq');
					}
				}
			}
		}
		var zgyyValue = document.getElementById('visiting.zgyy').value;
		if((zgyyValue == "请注明原因..." || zgyyValue == "") && zgValue != 3 && zgValue != 6){
			errorMessage += "请注明【转归原因】!\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.zgyy');
			}
		}
		//随访医院
		var sfdw = document.getElementById("sfdwcode");
		if(sfdw.tagName == 'SELECT'){
			if(sfdw.options[sfdw.selectedIndex].value == ""){
				errorMessage += "【随访单位】没有选择！\n";
				if (onFocusElement == null) {
					onFocusElement = document.getElementById("sfdwcode");
				}		
			};
		}
		// 随访医生
		var sfys = document.getElementById('visiting.sfys').value;
		if (sfys == "") {
			errorMessage += "【随访医生】没有填写！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.sfys');
			}
		}
	}else{//需复杂校验
		/**
		 * 处理checkBox
		 */
		// 临床症状所有checkbox的值 放入到一个input中
		var lczz = "";
		for (var i = 1; i <= 11; i++) {
			if (document.all["lczz" + i].checked == true) {
				lczz += "1";
			} else {
				lczz += "0";
			}
		}
		document.getElementById('visiting.lczz').value = lczz;
		// 用药种类所有checkbox的值 放入到一个input中
	
		var yyzl = "";
		for (var i = 1; i <= 5; i++) {
			if (document.all["yyzl" + i].checked == true) {
				yyzl += "1";
			} else {
				yyzl += "0";
			}
		}
		document.getElementById('visiting.yyzl').value = yyzl;
		// 精神状况所有checkbox的值 放入到一个input中
	
		var jszk = "";
		for (var i = 1; i <= 11; i++) {
			if (document.all["jszk" + i].checked == true) {
				jszk += "1";
			} else {
				jszk += "0";
			}
		}
		document.getElementById('visiting.jszk').value = jszk;
		// 随访建议所有checkbox的值 放入到一个input中
	
		var sfjy = "";
		for (var i = 1; i <= 8; i++) {
			if (document.all["sfjy" + i].checked == true) {
				sfjy += "1";
			} else {
				sfjy += "0";
			}
		}
		document.getElementById('visiting.sfjy').value = sfjy;
		// 非药物治疗情况所有checkbox的值 放入到一个input中
	
		var fywzlqk = "";
		for (var i = 1; i <= 8; i++) {
			if (document.all["fywzlqk" + i].checked == true) {
				fywzlqk += "1";
			} else {
				fywzlqk += "0";
			}
		}
		document.getElementById('visiting.fywzlqk').value = fywzlqk;
		// 随访时间检验
	
		var bcsfsj = document.getElementById('visiting.bcsfjlrq').value;
		if (bcsfsj == null || bcsfsj == "") {
			errorMessage += "【本次随访时间】为空！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.bcsfjlrq');
			}
		}
		var yysfsj = document.getElementById('visiting.yyxcsfrq').value;
		if (yysfsj == null || yysfsj == "") {
			errorMessage += "【预约随访时间】为空！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.yyxcsfrq');
			}
		}
		if(bcsfsj != null && yysfsj != null && yysfsj != "" && bcsfsj != ""){
			if(bcsfsj.split("-") > yysfsj.split("-")){
				errorMessage += "【预约随访时间】必须在【本次随访时间】之后！\n";
				if (onFocusElement == null) {
					onFocusElement = document.getElementById('visiting.yyxcsfrq');
				}
			}
		}
		// 转归检验
	
		var zg = document.getElementById('visiting.zg');
		if (zg.options[zg.selectedIndex].value == "") {
			errorMessage += "【转归类型】没有选择！\n";
			if (onFocusElement == null) {
				onFocusElement = zg;
			}
		} 
		// 病例种类
		var sffszx = document.getElementById('sffszx');
		var blzl = document.getElementById('blzlSelect');
		if (sffszx.checked != true) {
			if (blzl.options[blzl.selectedIndex].value == "") {
				errorMessage += "【病例种类】没有填写！\n";
				if (onFocusElement == null) {
					onFocusElement = document.getElementById('blzlSelect');
				}
			}
		}
		
		// 血压（收缩压/舒张压）
		var ssy = document.getElementById('visiting.ssy').value;
		var szy = document.getElementById('visiting.szy').value;
		if (ssy == "") {
			errorMessage += "【收缩压】没有填写！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.ssy');
			}
		}
		if (szy == "") {
			errorMessage += "【舒张压】没有填写！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.szy');
			}
		}
		// 体重
		var tz = document.getElementById('visiting.tz').value;
		if (tz == "") {
			errorMessage += "【体重】没有填写！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.tz');
			}
		}
		// 腰围
		var yw = document.getElementById('visiting.yw').value;
		if (tz == "") {
			errorMessage += "【腰围】没有填写！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.yw');
			}
		}
		// 臀围
	
		var tw = document.getElementById('visiting.tw').value;
		if (tw == "") {
			errorMessage += "【臀围】没有填写！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.tw');
			}
		}
	
		// 临床症状
		var lczz10 = document.getElementById('lczz10');
		if (lczz10.checked == true) {
			if (document.getElementById("visiting.lczzqt").value == "") {
				errorMessage += "【临床症状】中的【其他症状】没有填写！\n";
				if (onFocusElement == null) {
					onFocusElement = document.getElementById("visiting.lczzqt");
				}
			}
		}
		var lczzs = lczz10.parentNode.parentNode.parentNode.getElementsByTagName("INPUT");
		var lzccschoose = false;
		for(var i = 0 ; i < lczzs.length ; i++){
			if(lczzs[i].type == "checkbox" && lczzs[i].checked == true){
				lzccschoose = true;
				break;
			}
		}
		if(!lzccschoose){
			errorMessage += "【临床症状】没有选择！\n";
		}
		
		// 眼底检查
	
		var ydjc = document.getElementById('visiting.ydjc');
		if (ydjc.options[ydjc.selectedIndex].value == "") {
			errorMessage += "【眼底检查结果】没有选择！\n"
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.ydjc');
			}
		}
		// 迁出地址录入
		if(zgValue == 2){
			var activeChoose = false;
			var activeButtons = document.getElementsByName("active");
			for(var i = 0 ; i < activeButtons.length ; i++){
				if(activeButtons[i].disabled == true){
					activeChoose = true;
				}
			}
			if(!activeChoose){
				var types = document.getElementsByName('pType');
				var choose = false;
				for(var i = 0 ; i < types.length ; i++){
					if(types[i].checked == true){
						choose = true;
						var inputs = types[i].parentNode.parentNode.getElementsByTagName('INPUT');
						for(var j = 0 ; j < inputs.length ; j++){
							if((inputs[j].value == "" || inputs[j].value == "请输入") && inputs[j].type != "hidden"){
								errorMessage += "请完善你的【转归】迁出地址输入的输入项！！\n";
								break;
							}
						}
					}
				}
				if(!choose){
					errorMessage += "请选择一个【转归】迁出地址种类！！\n";
				}
			}
		}
		// 用药种类 fix 9.14
		if(document.getElementById('fyqk').checked == false){
			var yyzl5 = document.getElementById('yyzl5');
			if (yyzl5.checked == true) {
				if (document.getElementById("visiting.yyzlqt").value == "") {
					errorMessage += "【用药种类】中的【其他】用药种类没有填写！\n";
					if (onFocusElement == null) {
						onFocusElement = document.getElementById("visiting.yyzlqt");
					}
				}
			}
			var yyzls = yyzl5.parentNode.parentNode.parentNode.getElementsByTagName("INPUT");
			var yyzlchoose = false;
			for(var i = 0 ; i < yyzls.length ; i++){
				if(yyzls[i].type == "checkbox" && yyzls[i].checked == true){
					yyzlchoose = true;
					break;
				}
			}
			if(!yyzlchoose){
				errorMessage += "【用药种类】没有选择！\n";
			}
		}
		// 闲时体育活动类型
		var xxstlhdlx = document.getElementById('visiting.xxstlhdlx');
		if (xxstlhdlx.options[xxstlhdlx.selectedIndex].value == "") {
			errorMessage += "【闲时体育活动类型】没有选择！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.xxstlhdlx');
			}
		}
		
		// 闲时体育活动时间
		var xxstlhdsj = document.getElementById('visiting.xxstlhdsj');
		if (xxstlhdsj.options[xxstlhdsj.selectedIndex].value == "") {
			errorMessage += "【闲时体育活动时间】没有选择！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.xxstlhdsj');
			}
		}
		
		//精神状况
		var jszks = document.getElementById('jszk1').parentNode.parentNode.parentNode.getElementsByTagName("INPUT");
		var jszkchoose = false;
		for(var i = 0 ; i < jszks.length ; i++){
			if(jszks[i].type == "checkbox" && jszks[i].checked == true){
				jszkchoose = true;
				break;
			}
		}
		if(!jszkchoose){
			errorMessage += "【精神状况】没有选择！\n";
		}
		
		//实验室指标 3项必须填写一项 
		var kfxt = document.getElementById('visiting.kfxt');
		var sjxt = document.getElementById('visiting.sjxt');
		var chlxsxt = document.getElementById('visiting.chlxsxt');
		if(kfxt.value == "" && sjxt.value == "" && chlxsxt.value == ""){
			errorMessage += "【实验室指标】中【空腹血糖】、【餐后两小时血糖】、【随机血糖】至少填写一个！\n";
			if (onFocusElement == null) {
				onFocusElement = kfxt;
			}
		}
		
		// 并发症
		var bfzDiv = document.getElementById('bfzDiv');
		if (bfzDiv.style.display != 'none') {
			var inputs = bfzDiv.getElementsByTagName('INPUT');
			var selects = bfzDiv.getElementsByTagName('SELECT');
			for (var i = 0; i < inputs.length; i++) {
				if ((inputs[i].disabled == false && inputs[i].value == ""
					 && inputs[i].style.display != 'none' && inputs[i].type != 'hidden') 
						|| (inputs[i].value == '请输入' && inputs[i].disabled == false)) {
						errorMessage += "【并发症】中有未填写的项目！\n";
					if (onFocusElement == null) {
						onFocusElement = document.getElementById('bfzmb');
					}
					break;
				}
			}
			for (var i = 0; i < selects.length; i++) {
				if (selects[i].disabled == false
						&& selects[i].options[selects[i].selectedIndex] == "") {
					errorMessage += "【并发症】中有未选择选项！\n";
					break;
				}
			}
		}
		
		//伴发病及感染
		var bfbjgrDiv = document.getElementById('bfbjgrDiv');
		if (bfbjgrDiv.style.display != 'none') {
			var inputs = bfbjgrDiv.getElementsByTagName('INPUT');
			var selects = bfbjgrDiv.getElementsByTagName('SELECT');
			for (var i = 0; i < inputs.length; i++) {
				if ((inputs[i].disabled == false && inputs[i].value == ""
					 && inputs[i].style.display != 'none' && inputs[i].type != 'hidden') 
						|| (inputs[i].value == '请输入' && inputs[i].disabled == false)) {
					errorMessage += "【伴发病及感染】中有未填写的项目！\n";
					if (onFocusElement == null) {
						onFocusElement = document.getElementById('bfzmb');
					}
					break;
				}
			}
			for (var i = 0; i < selects.length; i++) {
				if (selects[i].disabled == false
						&& selects[i].options[selects[i].selectedIndex] == "") {
					errorMessage += "【伴发病及感染】中有未选择选项！\n";
					break;
				}
			}
		}
		
		//慢性病
		var mxbDiv = document.getElementById('mxbDiv');
		if (mxbDiv.style.display != 'none') {
			var inputs = mxbDiv.getElementsByTagName('INPUT');
			var selects = mxbDiv.getElementsByTagName('SELECT');
			for (var i = 0; i < inputs.length; i++) {
				if ((inputs[i].disabled == false && inputs[i].value == ""
					 && inputs[i].style.display != 'none' && inputs[i].type != 'hidden') 
						|| (inputs[i].value == '请输入' && inputs[i].disabled == false)) {
						errorMessage += "【慢性病】中有未填写的项目！\n";
					if (onFocusElement == null) {
						onFocusElement = document.getElementById('bfzmb');
					}
					break;
				}
			}
			for (var i = 0; i < selects.length; i++) {
				if (selects[i].disabled == false
						&& selects[i].options[selects[i].selectedIndex] == "") {
					errorMessage += "【慢性病】中有未选择选项！\n";
					break;
				}
			}
		}
		
		// 每季度参加几次糖尿病健康活动
		var jdtnbd = document.getElementById('visiting.jdtnbd');
		if (jdtnbd.options[jdtnbd.selectedIndex].value == "") {
			errorMessage += "【每季度参加几次糖尿病健康活动】没有选择！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.jdtnbd');
			}
		}
		// 随访建议
		if (document.getElementById('sfjy8').checked == true) {
			var sfjyqt = document.getElementById('visiting.sfjyqt');
			if (sfjyqt == "") {
				errorMessage += "【随访建议】中选择了【其他】，但是没有填写！\n";
				if (onFocusElement == null) {
					onFocusElement = document.getElementById('visiting.sfjyqt');
				}
			}
		}
		var sfjys = document.getElementById('sfjy8').parentNode.parentNode.parentNode.getElementsByTagName("INPUT");
		var sfjychoose = false;
		for(var i = 0 ; i < sfjys.length ; i++){
			if(sfjys[i].type == "checkbox" && sfjys[i].checked == true){
				sfjychoose = true;
				break;
			}
		}
		if(!sfjychoose){
			errorMessage += "【随访建议】没有选择！\n";
		}
		
		//非药物治疗情况
	
		var fywzlqks = document.getElementById('fywzlqk1').parentNode.parentNode.parentNode.getElementsByTagName("INPUT");
		var fywzlqkchoose = false;
		for(var i = 0 ; i < fywzlqks.length ; i++){
			if(fywzlqks[i].type == "checkbox" && fywzlqks[i].checked == true){
				fywzlqkchoose = true;
				break;
			}
		}
		if(!fywzlqkchoose){
			errorMessage += "【非药物治疗状况】没有选择！\n";
		}
		//随访医院
		var sfdw = document.getElementById("sfdwcode");
		if(sfdw.tagName == 'SELECT'){
			if(sfdw.options[sfdw.selectedIndex].value == ""){
				errorMessage += "【随访单位】没有选择！\n";
				if (onFocusElement == null) {
					onFocusElement = document.getElementById("sfdwcode");
				}		
			};
		}
		
		// 随访医生
		var sfys = document.getElementById('visiting.sfys').value;
		if (sfys == "") {
			errorMessage += "【随访医生】没有填写！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.sfys');
			}
		}
	}
	
	/* 校验流程结束 */
	if (errorMessage != "") {
		alert(errorMessage);
		if (onFocusElement != null) {
			onFocusElement.focus();
		}
	} else {
		var jyzzmsg = (document.getElementById("sfjyzzYes").checked == true) ? "【此随访卡建议转诊】，" : "";//是否建议转诊
		//提醒转型 和 提交
		if(document.getElementById('sffszx').checked == true){
			var zxzlmsg = document.getElementById('zxlx').checked == true? '正常':'2型糖尿病';
			var cszlmsg = document.getElementById('blzlSelect').options[document.getElementById('blzlSelect').selectedIndex].text;
			//并发症name修正
			if(window.confirm('您所填写病人的糖尿病随访卡的信息中【病例种类】由【' + cszlmsg + '】型转型成为【' + zxzlmsg + '】，' + jyzzmsg + '确认提交吗？')){
				if (document.getElementById('zxlx').checked == false) {
					blzl.options[2].selected = true;
				} else {
					blzl.options[0].selected = true;
				}
				//并发症name修正
				modifyNameOfBfz();
				document.forms[0].submit();
			}
		}else{
			if(zgValue == 3 || zgValue == 4 || zgValue == 5 || zgValue == 6){//简单随访不需要转诊提示，修改日期20110603刘剑
				jyzzmsg = "";
			}
			//并发症name修正
			if(window.confirm(jyzzmsg + '您确认提交吗？')){
				modifyNameOfBfz();
				document.forms[0].submit();
			}
		}
	}
}

/** 修正 并发症**/
function modifyNameOfBfz(){
	var bfzTable = document.getElementById('bfzTable');
	var bfbjgrTable = document.getElementById('bfbjgrTable');
	var mxbTable = document.getElementById('mxbTable');
	var bfzDiv = document.getElementById('bfzDiv');
	var bfbjgrDiv = document.getElementById('bfbjgrDiv');
	var mxbDiv = document.getElementById('mxbDiv');
	var listCount = 0;
	var tables = [bfzTable ,bfbjgrTable ,mxbTable];//3个并发症表格
	var displayList = [bfzDiv ,bfbjgrDiv ,mxbDiv];//3个并发症 div的显示情况
	for(var i = 0 ; i < tables.length ; i++){
		var creTable = tables[i];
		if(displayList[i].style.display != 'none'){
			for(var j = 1 ; j < creTable.rows.length ; j++){
				if(creTable.rows[j].style.display != 'none'){
					var inputs = creTable.rows[j].getElementsByTagName('INPUT');
					for(var k = 0 ; k < inputs.length ; k++){
						if(inputs[k].name != 'undefined' && inputs[k].name != "" && inputs[k].name != null){
							inputs[k].name = "bfzList[" + listCount + "]." + inputs[k].name;
						}
					}
					var selects = creTable.rows[j].getElementsByTagName('SELECT');
					for(var k = 0 ; k < selects.length ; k++){
						if(selects[k].name != 'undefined' 
						&& selects[k].name != "" 
						&& selects[k].name != null){
							selects[k].name = "bfzList[" + listCount + "]." + selects[k].name;
						}
					}
					listCount++;//计数+1
				}
			}
		}
	}
}
