//页面载入
	function init(){
		AjaxCall({//名族
			url : 'getFlokSelect.action',
			recall : function(result){
				var select = document.getElementById("MINZU"); 
				for(var i = 0 ; i < result.length ; i++){
					var option = document.createElement("OPTION");
					option.value = result[i].CODE;
					option.text = result[i].NAME;
					select.options.add(option);
				}
				select.value = document.getElementById("tmpMinzu").value;
			}
		});
	}
	
/* 更改地址类型 */
	function changeDz(target) {
		var dz = target.value;// 取地址类型
		var divs = target.parentNode.parentNode.getElementsByTagName("DIV");
		if (dz == 1) {// 街道
			for(var i = 0 ; i < divs.length ; i++){
				if(divs[i].id == 'jd'){
					makeInputOfTheElementAbled(divs[i]);// 显示街道
				}else{
					makeInputOfTheElementDisabled(divs[i]);//隐藏其他
				}
			}
		} else if (dz == 2) {// 小区
			for(var i = 0 ; i < divs.length ; i++){
				if(divs[i].id == 'xq'){
					makeInputOfTheElementAbled(divs[i]);// 显示小区
				}else{
					makeInputOfTheElementDisabled(divs[i]);//隐藏其他
				}
			}
		} else if (dz == 3) {// 农村
			for(var i = 0 ; i < divs.length ; i++){
				if(divs[i].id == 'nc'){
					makeInputOfTheElementAbled(divs[i]);// 显示农村
				}else{
					makeInputOfTheElementDisabled(divs[i]);//隐藏其他
				}
			}
		} else {// 外区
			for(var i = 0 ; i < divs.length ; i++){
				if(divs[i].id == 'wq'){
					makeInputOfTheElementAbled(divs[i]);// 显示外区
				}else{
					makeInputOfTheElementDisabled(divs[i]);//隐藏其他
				}
			}
		}
	}

/* 置div下面的input为disabled = false */
	function makeInputOfTheElementDisabled(element) {
		element.style.display = 'none';
		var inputs = element.getElementsByTagName('INPUT');
		for (var i = 0; i < inputs.length; i++) {
			inputs[i].disabled = true;
		}
	}

/* 置div下面的input为disabled = true */
	function makeInputOfTheElementAbled(element) {
		element.style.display = 'inline';
		var inputs = element.getElementsByTagName('INPUT');
		for (var i = 0; i < inputs.length; i++) {
			inputs[i].disabled = false;
		}
	}

	
//获取管理单位
	function getManageDepartment(){
		var areaCode = "";
		var chooseLive = false;
		var lives = document.getElementsByName('live');
		for(var i = 0 ; i < lives.length ; i++){
			if(lives[i].value == '1'){
				chooseLive = true;
				var inputs = lives[i].parentNode.parentNode.getElementsByTagName('INPUT');
				for(var j = 0 ; j < inputs.length ; j++){
					if(inputs[j].value != "#" && (inputs[j].name == "neighborhoods" || inputs[j].name == "village"  || inputs[j].name == "street")){
						if(inputs[j] == ""){
							alert("请首先完善你的现住地址！");
							return;
						}else{
				 			areaCode = inputs[j].value;
				 			break;
				 		}
				 	}
				 }
			}
		}
		if(!chooseLive){
			alert("请首先选择并完整填写的一个现住地址！");
			return;
		}
		//后台取数据
		AjaxCall({//名族
			url : 'getManageDepartment.action',
			data : {'areaCode' : areaCode},
			recall : function(result){
				document.getElementById("personObj.gldw").value = result[0].CODE;
				document.getElementById("gldw").value = result[0].NAME;
				if(confirm("确定提交？")){
					document.all["archives"].submit();
				}
			}
		}); 
	}
	
//添加新住址
	function addNewAddress(){
		var addressTable = document.getElementById('addressTable');
		var row = addressTable.insertRow(addressTable.rows.length);
		for(var i = 0 ; i < 5 ; i++){
			row.insertCell(i)
			row.cells[i].align = 'center';
		}
		row.cells[0].innerHTML ="<select name='addressType' onchange='javascript:changeDz(this);'> "+
								"	<option value='1'>                                             "+
								"		街道                                                                "+
								"	</option>                                                      "+
								"	<option value='2'>                                             "+
								"		小区                                                                "+
								"	</option>                                                      "+
								"	<option value='3'>                                             "+
								"		农村                                                                "+
								"	</option>                                                      "+
								"	<option value='4'>                                             "+
								"		外区                                                                "+
								"	</option>								                       "+
								"</select>      												   ";
		row.cells[1].innerHTML ="			<div id='jd' style='display: inline;'>                                                                 "+
								"					<input id='personAddress.paTownLabel' size='18'                                                "+
								"						style='color:#666666' value='请输入'                                                        "+
								"						onfocus='onfocusInputSelect(this,1)'                                                       "+
								"						onpropertychange='onchangeProperty(this,1)'                                                "+
								"						onkeydown='chooseResult(this)' onblur='completeInput(this)'                                "+
								"						class='selectInput' onclick='onclickInput(this,1)'>                                        "+
								"					街道(乡、镇)                                                                                     "+
								"					<input name='personAddress.paRoad' size='8'                                                    "+
								"						onkeyup='checkCharacter(this)' />                                                          "+
								"					路                                                                                             			   "+
								"					<input name='personAddress.paAlley' size='8'  onkeyup='checkNum(this)' />                      "+
								"					弄                                                                                                           "+
								"					<input name='personAddress.paUnit' size='8'  onkeyup='checkNum(this)' />                       "+
								"					号                                                                                             			   "+
								"					<input name='personAddress.paRoom' size='8'  onkeyup='checkNum(this)' />                       "+
								"					室                                                                                             			   "+
								"					<input type='hidden' name='personAddress.paNeighborhood' value='#'  />                         "+
								"					<input type='hidden' name='personAddress.paVillage' value='#'  />                              "+
								"					<input type='hidden' name='personAddress.paTown' value='#'  />                                 "+
								"					<input type='hidden' name='personAddress.isLastAddress' value='1' >                            "+
								"					<input type='hidden' name='personAddress.effective' value='1' >                                "+
								"				</div>                                                                                             "+
								"				<div id='xq' style='display: none;'>                                                               "+
								"					<input id='personAddress.paNeighborhoodLabel' size='18' disabled                               "+
								"						style='color:#666666' value='请输入'                                                        "+
								"						onfocus='onfocusInputSelect(this,2)'                                                       "+
								"						onpropertychange='onchangeProperty(this,2)'                                                "+
								"						onkeydown='chooseResult(this)' onblur='completeInput(this)'                                "+
								"						class='selectInput' onclick='onclickInput(this,2)'>                                        "+
								"					小区                                                                                           			   "+
								"					<input name='personAddress.paUnit' size='8' disabled onkeyup='checkNum(this)' />               "+
								"					号                                                                                                           "+
								"					<input name='personAddress.paRoom' size='8' disabled onkeyup='checkNum(this)' />               "+
								"					室                                                                                                           "+
								"					<input type='hidden' name='personAddress.paTown' value='#' disabled />                         "+
								"					<input type='hidden' name='personAddress.paVillage' value='#' disabled />                      "+
								"					<input type='hidden' name='personAddress.paRoad' value='#' disabled />                         "+
								"					<input type='hidden' name='personAddress.paAlley' value='#' disabled />                        "+
								"					<input type='hidden' name='personAddress.paNeighborhood' value='' disabled />                  "+
								"					<input type='hidden' name='personAddress.isLastAddress' value='1' disabled>                    "+
								"					<input type='hidden' name='personAddress.effective' value='1' disabled>                        "+
								"				</div>                                                                                             "+
								"				<div id='nc' style='display: none;'>                                                               "+
								"					<input id='personAddress.paTownLabel' size='18' disabled                                       "+
								"						style='color:#666666' value='请输入'                                                        "+
								"						onfocus='onfocusInputSelect(this,1)'                                                       "+
								"						onpropertychange='onchangeProperty(this,1);'                                               "+
								"						onkeydown='chooseResult(this)' onblur='completeInput(this)'                                "+
								"						class='selectInput' onclick='onclickInput(this,1)'>                                        "+
								"					街道(乡、镇)                                                                                     "+
								"					<input id='personAddress.paVillageLabel' size='18' disabled                                    "+
								"						style='color:#666666' value='请输入'                                                        "+
								"						onfocus='onfocusInputSelect(this,3)'                                                       "+
								"						onpropertychange='onchangeProperty(this,3)'                                                "+
								"						onkeydown='chooseResult(this)' onblur='completeInput(this)'                                "+
								"						class='selectInput' onclick='onclickInput(this,3)'>                                        "+
								"					村                                                                                                           "+
								"					<input name='personAddress.paRoad' size='8' disabled                                           "+
								"						onkeyup='checkCharacter(this)' />                                                          "+
								"					队(组)                                                                                          "+
								"					<input name='personAddress.paUnit' size='8' disabled onkeyup='checkNum(this)' />               "+
								"					号                                                                                                           "+
								"					<input name='personAddress.paNeighborhood' type='hidden' value='#' disabled />                 "+
								"					<input name='personAddress.paAlley' type='hidden' value='#' disabled />                        "+
								"					<input name='personAddress.paRoom' type='hidden' value='#' disabled />                         "+
								"					<input name='personAddress.paTown' type='hidden' value='' disabled />                          "+
								"					<input name='personAddress.paVillage' type='hidden' value='' disabled />                       "+
								"					<input type='hidden' name='personAddress.isLastAddress' value='1' disabled>                    "+
								"					<input type='hidden' name='personAddress.effective' value='1' disabled>                        "+
								"				</div>                                                                                             "+
								"				<div id='wq' style='display: none;'>                                                               "+
								"					<input type='hidden' name='personAddress.paTown' value='#' disabled />                         "+
								"					<input type='hidden' name='personAddress.paNeighborhood' value='#' disabled />                 "+
								"					<input type='hidden' name='personAddress.paVillage' value='#' disabled />                      "+
								"					<input type='hidden' name='personAddress.paRoad' value='#' disabled />                         "+
								"					<input type='hidden' name='personAddress.paAlley' value='#' disabled />                        "+
								"					<input type='hidden' name='personAddress.paUnit' value='#' disabled />                         "+
								"					<input type='hidden' name='personAddress.paRoom' value='#' disabled />                         "+
								"					<input type='hidden' name='personAddress.isLastAddress' value='1' disabled>                    "+
								"					<input type='hidden' name='personAddress.effective' value='1' disabled>                        "+
								"				</div>  																						   ";
		row.cells[2].innerHTML ="<input name='livecheckbox' type='checkbox'                                                       					"+
								"					onclick='changeTheCheckBox(this);' > 												"+
								"				<b style='color:green'>&nbsp;现住</b>                                                   	"+
								"				<input name='live' type='hidden' value='2' />             							 	";
		row.cells[3].innerHTML ="				是否确认&nbsp;&nbsp;                                                                      "+
								"				<select name='confirm'>                                                                 "+
								"					<option value='1' >                                                                 "+
								"						确认                                                                                        "+
								"					</option>                                                                           "+
								"					<option value='2' >                                                                 "+
								"						待确认                                                                                      "+
								"					</option>                                                                           "+
								"				</select>   																			";
		row.cells[4].innerHTML ="<input type='button' onclick='deleteTheAddress(this)' value='删除'>  ";
	}

//删除创建的地址
	function deleteTheAddress(postion){
		var table = postion.parentNode.parentNode.parentNode;
		for(var i = 0 ; i < table.childNodes.length ; i++){
			if(table.rows[i] == postion.parentNode.parentNode){
				table.deleteRow(i);
				return;
			}
		}
	}
	
//选择是否现住
	function changeTheCheckBox(target){
		if(target.checked == true){//选中
			var addressTable = document.getElementById('addressTable');
			var tableRows = addressTable.rows;
			//判断是否已经添加了现住的地址
			for(var i = 1 ; i < tableRows.length; i++){
				if(tableRows[i].cells[2].innerText == "现住"){
					alert("对不起您已经确定添加了一个现住的地址!!");
					target.checked = false;
					return;
				}
			}
			var checkboxes = document.all['livecheckbox'];
			for(var i = 0 ; i < checkboxes.length ; i++){
				if(checkboxes[i] != target){
					if(checkboxes[i].checked == true){
						checkboxes[i].checked = false;
						var tmpChild = checkboxes[i].parentNode.getElementsByTagName('INPUT');
						for(var j= 0 ; j < tmpChild.length ; j++){
							if(tmpChild[j] != checkboxes[i]){
								tmpChild[j].value = "2";
							}
						}
					}
				}else{
					var tmpChild = checkboxes[i].parentNode.getElementsByTagName('INPUT');
					for(var j= 0 ; j < tmpChild.length ; j++){
						if(tmpChild[j] != checkboxes[i]){
							tmpChild[j].value = "1";
						}
					}
				}
			}
		}else{//取消
			var tmpChild = target.parentNode.getElementsByTagName('INPUT');
			for(var j= 0 ; j < tmpChild.length ; j++){
				if(tmpChild[j] != target){
					tmpChild[j].value = "2";
				}
			}
		}
	}
	
	
	function queryData(target,code){
	//重新定位按上下键选择的行数
	divTableChooseRow = -1;
	//清空div
	document.getElementById('queryResult').innerHTML = "";
	//获取变量 获取 参数
	var queryAction = "";
	var queryStr;
	if(code == '1'){
		queryStr = {inputText : target.value};
		queryAction = "getStreetSelect.action";
	}
	else if(code == '2'){
		queryStr = {inputText : target.value};
		queryAction = "getNeighborhoodsSelect.action";
	}
	else if(code == '3'){
		queryAction = "getVillagesSelect.action";
		var inputs = target.parentNode.getElementsByTagName('INPUT');
		for(var i = 0 ; i < inputs.length ; i++){
			if(inputs[i].name == 'street'){
				var value = inputs[i].value;
				queryStr =  {townid : value , inputText : target.value};
			}
		}
	}
	AjaxCall({
		url:queryAction,
		data:queryStr,
		context:target,
		recall : function(context,result){
			var point = getElementPos(context);
		    var resultDiv = document.getElementById("queryResult");
		    if(resultDiv.style.display == 'none'){
		    	resultDiv.style.top = point.y + 17;
		    	resultDiv.style.left = point.x - 2;
		    	resultDiv.style.display = 'block';
		    	resultDiv.style.width = context.offsetWidth -2;
		    }
		    var content = "<table id='divTable' width=150  cellpadding='0' cellspacing='0'  border='0'>";
			for(var i = 0 ; i < result.length ; i++){
				if(i == 0){
					document.getElementById('tmpContentKey').value = result[i].CODE;
					document.getElementById('tmpContentValue').value = result[i].NAME;
				}
				content = content + "<tr style='background:\"#ffffff\"' " 
								  + "onmouseover='javascript:changeHide(\"" 
								  + result[i].CODE  
								  + "\",\"" 
								  + result[i].NAME 
								  + "\",this);' "
								  + "onmouseout='this.style.background=\"#ffffff\"' >" 
								  + "<td>"
								  + (i+1)
								  + "</td>"
								  + "<td>" 
								  + "<input type='hidden' value='"
								  + result[i].CODE 
								  + "'/>"
								  + result[i].NAME 
								  + "</td></tr>";
			}
			content = content + "</table>";
		   	resultDiv.innerHTML = content;
		   	//如果已经选择好和查询结果 一样 隐藏DIV
		   	if(result.length == 1){
		   		if(target.value == result[0].NAME){
		   			resultDiv.style.display = 'none';
		   		}
		   	}
		   	//如果结果为空 隐藏DIV
		   	if(result.length == 0){
		   		resultDiv.style.display = 'none';
		   	}
		}
	});
}

	//完成地址输入后
	function completeInput(target){
		target.value = document.getElementById('tmpContentValue').value;
		var valueInputName = target.id.substring(0,target.id.indexOf('Label')) + "";
		var inputs = target.parentNode.getElementsByTagName("INPUT");
		for(var i = 0 ; i < inputs.length ; i++){
			if(inputs[i].name == valueInputName){
				inputs[i].value = document.getElementById('tmpContentKey').value;
			}
		}
		document.getElementById('queryResult').style.display='none';
	}	
	
	//鼠标移上查询结果 给隐藏域赋值
	function changeHide(key,value,target){
		target.style.background="#316AC5";
		document.getElementById('tmpContentValue').value=value;
		document.getElementById('tmpContentKey').value=key;
	}
	
	//获取网页元素的绝对位置
	// 说明：用 Javascript 获取指定页面元素的位置
	function getElementPos(el) {
		var ua = navigator.userAgent.toLowerCase();
		var isOpera = (ua.indexOf('opera') != -1);
		var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof
		if(el.parentNode === null || el.style.display == 'none'){
			return false;
		}
		var parent = null;
		var pos = [];
		var box;
		if(el.getBoundingClientRect) //IE
		{
			box = el.getBoundingClientRect();
			var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
			var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
			return {x:box.left + scrollLeft, y:box.top + scrollTop};
		}
		else if(document.getBoxObjectFor) // gecko
		{
			box = document.getBoxObjectFor(el);
			var borderLeft = (el.style.borderLeftWidth)?parseInt(el.style.borderLeftWidth):0;
			var borderTop = (el.style.borderTopWidth)?parseInt(el.style.borderTopWidth):0;
			pos = [box.x - borderLeft, box.y - borderTop];
		}
		else // safari & opera
		{
			pos = [el.offsetLeft, el.offsetTop];
			parent = el.offsetParent;
			if (parent != el) {
				while (parent) {
					pos[0] += parent.offsetLeft;
					pos[1] += parent.offsetTop;
					parent = parent.offsetParent;
					}
				}
			if (ua.indexOf('opera') != -1
				|| ( ua.indexOf('safari') != -1 && el.style.position == 'absolute' ))
			{
				pos[0] -= document.body.offsetLeft;
				pos[1] -= document.body.offsetTop;
			}
		}
		if (el.parentNode) { parent = el.parentNode; }
		else { parent = null; }
		while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML')
		{ // account for any scrolled ancestors
			pos[0] -= parent.scrollLeft;
			pos[1] -= parent.scrollTop;
			if (parent.parentNode) { parent = parent.parentNode; }
			else { parent = null; }
		}
		return {x:pos[0], y:pos[1]};
	} 
	
	//选择结果 键盘事件
	var divTableChooseRow = -1;
	function chooseResult(target){
		var table = document.getElementById("divTable");
		if(event.keyCode == 38){
			if(divTableChooseRow == -1){
				table.rows[table.rows.length-1].style.background = '#316AC5';
				document.getElementById('tmpContentKey').value = table.rows[table.rows.length-1].getElementsByTagName('INPUT')[0].value;
				document.getElementById('tmpContentValue').value = table.rows[table.rows.length-1].cells[1].innerText;
				divTableChooseRow = table.rows.length-1;
			}
			else if(divTableChooseRow == 0){
				table.rows[divTableChooseRow].style.background = '#ffffff';
				document.getElementById('tmpContentKey').value = table.rows[0].getElementsByTagName('INPUT')[0].value;
				document.getElementById('tmpContentValue').value = table.rows[0].cells[1].innerText;
				divTableChooseRow = -1;
			}
			else if(divTableChooseRow > 0){
				table.rows[divTableChooseRow].style.background = '#ffffff';
				table.rows[divTableChooseRow-1].style.background = '#316AC5';
				document.getElementById('tmpContentKey').value = table.rows[divTableChooseRow-1].getElementsByTagName('INPUT')[0].value;
				document.getElementById('tmpContentValue').value = table.rows[divTableChooseRow-1].cells[1].innerText;		
				divTableChooseRow--;
			}
		}
		if(event.keyCode == 40){
			if(divTableChooseRow == table.rows.length-1){
				table.rows[divTableChooseRow].style.background = '#ffffff';
				document.getElementById('tmpContentKey').value = table.rows[0].getElementsByTagName('INPUT')[0].value;
				document.getElementById('tmpContentValue').value = table.rows[0].cells[1].innerText;		
				divTableChooseRow = -1;
			}
			else if(divTableChooseRow == -1){
				table.rows[divTableChooseRow+1].style.background = '#316AC5';
				document.getElementById('tmpContentKey').value = table.rows[divTableChooseRow+1].getElementsByTagName('INPUT')[0].value;
				document.getElementById('tmpContentValue').value = table.rows[divTableChooseRow+1].cells[1].innerText;	
				divTableChooseRow = 0;
			}
			else if(divTableChooseRow < table.rows.length){
				table.rows[divTableChooseRow].style.background = '#ffffff';
				table.rows[divTableChooseRow+1].style.background = '#316AC5';	
				document.getElementById('tmpContentKey').value = table.rows[divTableChooseRow+1].getElementsByTagName('INPUT')[0].value;
				document.getElementById('tmpContentValue').value = table.rows[divTableChooseRow+1].cells[1].innerText;		
				divTableChooseRow++;
			}
		}
		if(event.keyCode == 13){
			var numExpression = /^[\d]+$/;
			if(target.value == "" || !numExpression.test(target.value)){
				target.value = document.getElementById('tmpContentValue').value;
				var valueInputName = target.id.substring(0,target.id.indexOf('Label')) + "";
				var inputs = target.parentNode.getElementsByTagName("INPUT");
				for(var i = 0 ; i < inputs.length ; i++){
					if(inputs[i].name == valueInputName){
						inputs[i].value = document.getElementById('tmpContentKey').value;
					}
				}
			}else{
				var indexnum = target.value -1;
				if(indexnum >= 0 && indexnum < table.rows.length){
					document.getElementById('tmpContentKey').value = table.rows[indexnum].getElementsByTagName('INPUT').value;
					document.getElementById('tmpContentValue').value = table.rows[indexnum].cells[1].innerText;
					target.value = document.getElementById('tmpContentValue').value;
					var valueInputName = target.id.substring(0,target.id.indexOf('Label')) + "";
					var inputs = target.parentNode.getElementsByTagName("INPUT");
					for(var i = 0 ; i < inputs.length ; i++){
						if(inputs[i].name == valueInputName){
							inputs[i].value = document.getElementById('tmpContentKey').value;
						}
					}
				}else{
					alert("索引超出范围！！");
				}
			}
		}
	}
	//联动清空
	function linkChange(target){
		document.getElementById('villageLabel').value='请输入';
		document.getElementById('villageLabel').style.color='#000000';
	}
	
	//焦点到输入下拉框
	function onfocusInputSelect(target,typeValue){
		target.style.color='#000000';
		if(target.value == '请输入'){
			target.value ='';
		}
		queryData(target,typeValue);
	}
	
	//更跟输入下拉框的值后 触发的函数
	function onchangeProperty(target,typeValue){
		var numExpression = /^[\d]+$/;
		if(target.value == ""){
			return;
		}
		else if(numExpression.test(target.value)){
			return;
		}
		else{
			queryData(target,typeValue);
		}
	}
	
	//点击输入框后的事件
	function onclickInput(target,typeValue){
		target.value = '';
		queryData(target,typeValue);
	}
	
/**以上是地址*/

//添加另外的电话
	function addNewPhone(postion){
		//验证
		var rownum;
		var tr = postion.parentNode.parentNode;
		var trs = tr.parentNode.getElementsByTagName("tr");
		for(var i = 0 ; i < trs.length ; i ++){
			if(tr == trs[i]){
				rownum = i + 1;
			}
		}
		var newTR = tr.parentNode.parentNode.insertRow(rownum);
		var td1 = newTR.insertCell(0);
		var td2 = newTR.insertCell(1);
		td1.innerHTML = "其他电话号码&nbsp;&nbsp;";
		td1.align = "right";
		td1.style.background = "#D3DEF1";
		td2.innerHTML = "  <input name='phoneNum' type='text' onfocus='this.select();' maxlength='20' value=''>"
					+	"  <input name='first' type='hidden' value='2'/>&nbsp;"
					+	"	<input name='firstCheckBox' type='checkbox' onclick='checkFirst(this)'>"
					+	"	<b style='color:green'>首选&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>"
					+	"	<input name='phoneconfirm' type='hidden' value='1'/>"
					+	"	<input type='button' onClick='javascript:deleteThePhone(this);' value='删除' />";
		newTR.insertCell(2);
		newTR.insertCell(3);
	}		
	
//删除创建的电话
	function deleteThePhone(postion){
		var table = postion.parentNode.parentNode.parentNode;
		for(var i = 0 ; i < table.childNodes.length ; i++){
			if(table.rows[i] == postion.parentNode.parentNode){
				table.deleteRow(i);
				return;
			}
		}
	}
	
//选取电话的首选
	function checkFirst(target){
		var checkBoxes = document.getElementsByName("firstCheckBox");
		if(checkBoxes.length == 1 && target == checkBoxes[0]){
			if(target.checked == true){
				document.getElementsByName("first").value = "1";
			}else{
				alert("对不起必须有一个首选项!");
				target.checked = true;
			}
		}else{
			for(var i = 0 ;i < checkBoxes.length ; i++){
				if(target.checked == true){//选中
					if(checkBoxes[i] != target){
						if(checkBoxes[i].checked == true){
							checkBoxes[i].checked = false;
							var inputs = checkBoxes[i].parentNode.childNodes;
							for(var j = 0 ; j < inputs.length ; j++){
								if(inputs[j].name == "first"){
									inputs[j].value = "2";
								}
							}
						}
					}else{
						var inputs = target.parentNode.childNodes;
						for(var j = 0 ; j < inputs.length ; j++){
							if(inputs[j].name == "first"){
								inputs[j].value = "1";
							}
						}
					}
				}else{//取消
					target.checked = true;
					alert("必须有一个首选的电话号码!!");
				}
			}
		}
	}
//以上是电话
	
	
//数据编码校验与提交
	function commit(){
		var errorMessage="";
		var role1 = /[\u4e00-\u9fa5]|[\d]|[\w]|[_]/;//校验标准1：数字，字母，中文及_
		var role2 = /[\d]|[\w]|[_]/;//校验标准2：数字，字母及_
		var role3 = /[\d]/;//校验标准3：数字
		var role4 = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;//校验标准4：邮箱校验
		var role5 = /(^[0-9]{3,4}\-[0-9]{7,8}$)|(^[0-9]{7,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^0{0,1}15[0-9]{9}$)|(^0{0,1}18[0-9]{9}$)/;//校验标准5：电话校验
		var role6 = /[1-9]{1}(\d+){5}/;//校验标准6：邮编校验
		var role7 = /\d{18}|\d{15}/;//校验标准7：身份证校验
		var role8 = /^(19|20)\d{2}-(0?\d|1[012])-(0?\d|[12]\d|3[01])$/;//日期格式 1999-09-09
		//姓名
		if(document.getElementById("XM").value==""){
			errorMessage += "姓名不能为空！\n";
		}
		//性别
		var xb = document.all["personObj.xb"];
		if( xb[0].checked == false && 
		    xb[1].checked == false){
			errorMessage += "性别不能为空！\n";
		}
		//出生年月
		var csny = document.getElementById('CSNY').value;
		if(csny != ''){
			if(!role8.test(csny)){
				errorMessage += "出生日期格式不正确！\n";
			}
		}
		//证件类型
		var zjlx = document.all["personObj.zjlx"];
		if( zjlx[0].checked == false && 
			zjlx[1].checked == false && 
			zjlx[2].checked == false && 
			zjlx[3].checked == false ){
			errorMessage += "证件类型不能为空！\n";
		}
		//证件号
		if(document.getElementById("ZJH").value==""){
			errorMessage += "证件号不能为空！\n";
		}else{
			for(var i = 0 ; i < zjlx.length ; i ++ ){
				if(zjlx[i] == 1){
					var zjh = document.getElementById("ZJH").value;
					if(!role7.test(zjh)){
						errorMessage += "证件号格式不符合规范！\n";
					}
				}
			}
		}
		//电话号码
		var dhhm = document.getElementsByName('phoneNum');
		var test = false;
		for(var i = 0 ; i < dhhm.length ; i++){
			if(dhhm[i].value == ""){
				test = true;//有一个号码为空	
			}
		}
		if(test){
			errorMessage += "电话号码不能为空！\n";
		}else{
			for(var i = 0 ; i < dhhm.length ; i++){
				if(!role5.test(dhhm[i].value)){
					errorMessage += "第"+ (i+1) + "个电话号码格式不正确！\n";
				}
			}
		}
		//地址校验
		//地址未填写校验
		var addresses = document.getElementsByName('addressType');
		for(var i = 0 ; i < addresses.length ; i++){
			if(addresses[i].checked == true){
				var inputs = addresses[i].parentNode.parentNode.getElementsByTagName('INPUT');
				for(var j = 0 ; j < inputs.length ; j++){
					if(inputs[j].type == 'text' && inputs[j].value == ''){
						errorMessage += "地址中有未填写项！\n";
						break;
					}
				}
			}
		}
		//常住地址选择校验
		var lives = document.getElementsByName('live');
		var chooseLive = true;
		for(var i = 0 ; i < lives.length ; i++){
			if(lives[i].value == '1'){
				 chooseLive = false;
			}
		}
		var adressTableRow = document.getElementById('addressTable').rows;
		for(var i = 1 ; i < adressTableRow.length ; i++){
			if(adressTableRow[i].cells[2].innerText == '现住'){
				chooseLive = false;
			}
		}
		if(chooseLive){
			errorMessage += "地址中有必须有一个现住地址！\n";
		}
		//工作单位 联系人邮编 联系人电话
		var gzdwyb = document.getElementById("GZDWYB").value;
		if(gzdwyb != "" && !role6.test(gzdwyb)){
			errorMessage += "工作单位邮编格式不符合规范！\n";
		}
		var lxryb = document.getElementById("LXRYB").value;
		if(lxryb != "" && !role6.test(lxryb)){
			errorMessage += "联系人邮编格式不符合规范！\n";
		}
		var lxrdh = document.getElementById("LXRDH").value;
		if(lxrdh != "" && !role5.test(lxrdh)){
			errorMessage += "联系人电话格式不符合规范！\n";
		}
		if (errorMessage != ""){
			alert(errorMessage);
		}else{
			getManageDepartment();
		}
	}