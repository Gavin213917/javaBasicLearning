
var ydjcData = [{CODE:'1',NAME:'I 单纯性 有微动脉瘤或并有小出血点'},{CODE:'2',NAME:'II 单纯性 有黄白色硬性渗出及出血斑'},{CODE:'3',NAME:'III 单纯性 有白色“软性渗出”或并有出血斑'},{CODE:'4',NAME:'IV 增生性 眼底有新生血管或并有玻璃体积血'},{CODE:'5',NAME:'V 增生性 眼底有新生血管和纤维增生'},{CODE:'6',NAME:'VI 增生性 眼底有新生血管和纤维增生，并发现视网膜脱离'},{CODE:'8',NAME:'正常'}];
//分屏效果，展示隐藏页面
function showPage(pageNum){
	switch(pageNum){
		case 1:{
			$("#pageFirstTd").addClass("choosedTD").removeClass("unchoosedTD").siblings("TD").addClass("unchoosedTD").removeClass("choosedTD");
			$("DIV.divFirst").fadeIn("fast");
			$("DIV.divSecond").hide();
			break;
		}
		case 2:{
			$("#pageSecondTd").addClass("choosedTD").removeClass("unchoosedTD").siblings("TD").addClass("unchoosedTD").removeClass("choosedTD");
			$("DIV.divSecond").fadeIn("fast");
			$("DIV.divFirst").hide();
			break;
		}
	}
}

/* 初始化页面信息 */
function init3g() {
	changeblzlNew(document.getElementById('blzlSelect'));
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
	
	if($('#fyqk').attr('checked')){
		var yylztd1 = document.getElementById('yylztd1');
		var yylztd2 = document.getElementById('yylztd2');
		var yylztd3 = document.getElementById('yylztd3');
		var yylztd4 = document.getElementById('yylztd4');
		yylztd2.style.display = 'none';
		yylztd4.style.display = 'none';
		yylztd1.colSpan = 5;
		yylztd3.colSpan = 5;
		$('#yyzl').attr('disabled',true);
		$('#yyzlqt').attr('disabled',true);
	}
	
	if($('#mxbradio').attr('checked') == true 
		|| $('#bfbjgrradio').attr('checked') == true 
		|| $('#bfzradio').attr('checked') == true){
			 $('#sfjyzzYes').attr('checked',true);
			 zzbz = true;//转诊标志更改
	}
	//更新随访医院，并发症医院
	$.ajax({
			url  : 'getYYList.action',
			type : 'POST',
			dataType : 'json',			
			error : function(request) {
//				alert("操作失败");
			},
			success : function(data) {
				var val = $('input[name=visiting.sfdw]').val();
				var sfdw = document.getElementById("sfdwcode");
				if(sfdw.tagName == 'FONT'){
					for(var i=0;i<data.length;i++){
						if(data[i].CODE == val) {
							$('#sfdwcode').html(data[i].NAME);
						}
					}
				}else{
					for (var i=0;i<data.length;i++) { // 循环解析
						var option = document.createElement("OPTION");
						option.value = data[i].CODE;
						option.text = data[i].NAME;
						document.getElementById("sfdwcode").options.add(option); // 把列表值添加到下拉菜单中
					}
				}
				$('input[name=bzzdyy]').each(function(){
					for(var i=0;i<data.length;i++){
						if(data[i].CODE == $(this).val()) {
							$(this).siblings().html(data[i].NAME);
						}
					}
					
				});
				
			}
		});	
}



//收起展开并发症等
function showBFZDiv(target){
	if($(target).attr("title") == "点击展开"){
		$(target).attr({"title":"点击收起"}).css({"background":"#A8EAFB"});
		$(target).find("table td:last-child").attr("innerText","︽");
		$("#BFZTR").slideToggle("fast");	
	}else{
		$(target).attr({"title":"点击展开"}).css({"background":"#358DE7"});
		$(target).find("table td:last-child").attr("innerText","︾");
		$("#BFZTR").fadeOut("fast");
	}
}

/* 通用方法：根据checkbox显示、隐藏input、并使div无效 */
function onclickShow3g(checkId, inputId) {
	if (document.getElementById(checkId).checked) {
		document.getElementById(inputId).style.width = "60%";
		document.getElementById(inputId).style.display = "inline";
		document.getElementById(inputId).disabled = false;
	} else {
		document.getElementById(inputId).style.display = "none";
		document.getElementById(inputId).disabled = true;
	}
}

/* 眼底检查 */
function onclickYdjc(target) {
	if($(target).attr('checked')==false){
		$('#ydjc').attr('Value','');
		$('#ydjcLabel').show();
	}else{
		$('#ydjc').val($(target).val());
		$('#ydjcLabel').hide();
	}
}

//改变转归状态，如选择拒防带来的隐藏展示
function changeZglx3g(obj){
	var objvalue=obj.value;
	if(objvalue=="1"){
		$("DIV.divThird").fadeOut("fast").attr("disabled","disabled");
		$("DIV.divFourth").removeAttr("disabled").fadeIn("fast");
		$("#pageTable").fadeIn("fast");
		document.getElementById("visiting.zgyy").style.display = "none";
		document.getElementById("visiting.zgyy").disabled = true;
	}else if(objvalue == 5){
		$("DIV.divFourth").fadeOut("fast");
		$("DIV.divThird").removeAttr("disabled").fadeIn("fast");
		$("#pageTable").fadeOut("fast");
		$("#sfjyzzNo").attr('disabled',false);
		document.getElementById("visiting.zgyy").style.display = "inline";// 显示原因输入框
		document.getElementById("visiting.zgyy").disabled = false;
		
	}
}

/* 改变病例种类 */
function changeblzlNew(target) {
	var inputs = document.getElementsByName('visiting.sffszx');
	document.getElementById('blzlHidden').value = target.options[target.selectedIndex].value;
	if (target.options[target.selectedIndex].value != 5
			&& target.options[target.selectedIndex].value != 6
			&& target.options[target.selectedIndex].value != 3
			&& target.options[target.selectedIndex].value != 4) {
		for (var i = 0; i < inputs.length; i++) {
			inputs[i].disabled = true;
		}
		document.getElementById('hiddensffszx').disabled = false;
	} else {//选择【IGR】 和 【其他】   【营养不良】
			for (var i = 0; i < inputs.length; i++) {
				inputs[i].disabled = false;
			}
		document.getElementById('hiddensffszx').disabled = true;
	}
}

/* 改变是否转型radio */
function changeSFZXNew(target) {
	var zxlx = document.getElementById('zxtd').getElementsByTagName('INPUT');
	var blzl = document.getElementById('blzlSelect');
	var blzlHidden = document.getElementById('blzlHidden');
	var zxth = document.getElementById('zxth');
	var zxtd = document.getElementById('zxtd');
	var blzlth = document.getElementById('blzlth');
	var blzltd = document.getElementById('blzltd');
	if (target.checked == true) {//发生转型
		zxth.style.display = 'block';
		zxtd.style.display = 'inline';
		blzlth.style.display = 'none';
		blzltd.style.display = 'none';
		target.parentNode.colSpan = 2;
		for(var i = 0 ; i < zxlx.length ; i++){
			zxlx[i].disabled = false;
		}
		blzl.disabled = true;
		blzlHidden.disabled = true;
	} else {//不发生转型

		zxth.style.display = 'none';
		zxtd.style.display = 'none';
		blzlth.style.display = 'inline';
		blzltd.style.display = 'inline';
		target.parentNode.colSpan = 5;
		for(var i = 0 ; i < zxlx.length ; i++){
			zxlx[i].disabled = true;
		}
		if(!sfjcbl){//如果没有继承病例 可以修改
			blzl.disabled = false;
		}
		blzlHidden.disabled = false;
	}
}


/* 改变服药情况 */ 
function changeFYQK3g(target){
	var yylztd1 = document.getElementById('yylztd1');
	var yylztd2 = document.getElementById('yylztd2');
	var yylztd3 = document.getElementById('yylztd3');
	var yylztd4 = document.getElementById('yylztd4');
//	var allYpInputs = yylztd.getElementsByTagName('INPUT');//所有的服药种类
	if (target.checked == true) {//不服用药物

		// 隐藏td
		yylztd2.style.display = 'none';
		yylztd4.style.display = 'none';
		yylztd1.colSpan = 5;
		yylztd3.colSpan = 5;
		$('#yyzl').attr('disabled',true);
		$('#yyzlqt').attr('disabled',true);
//		for(var i = 0 ; i < allYpInputs.length ; i++ ){
//			allYpInputs[i].disabled = true;		
//		}
	} else {//服用药物
		yylztd2.style.display = 'inline';
		yylztd4.style.display = 'inline';
		yylztd1.colSpan = 1;
		yylztd3.colSpan = 1;
		$('#yyzl').attr('disabled',false);
		$('#yyzlqt').attr('disabled',false);
//		for(var i = 0 ; i < allYpInputs.length ; i++ ){
//			allYpInputs[i].disabled = false;		
//		}
	}
}

//点击提交按钮
function commit3g(){
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
	var errorMessage = "";
	var onFocusElement = null;
	var zgValue = $("#zg").val();
	//随访医院
	var sfdw = document.getElementById("sfdwcode");
	if( zgValue == 5 ){//需简单校验
		if(sfdw.tagName == 'SELECT'){
			if(sfdw.options[sfdw.selectedIndex].value == ""){
				errorMessage += "【随访单位】没有选择！\n";
				if (onFocusElement == null) {
					onFocusElement = document.getElementById("sfdwcode");
				}		
			};
		}
		// 随访时间检验
		if ($("#bcsfjlrq").val() == null || $("#bcsfjlrq").val() == "") {
			errorMessage += "【本次随访时间】为空！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('bcsfjlrq');
			}
		}
		if(zgValue != 3){//如果 不是死亡
			if ($("#yyxcsfrq").val() == null || $("#yyxcsfrq").val() == "") {
				errorMessage += "【预约随访时间】为空！\n";
				if (onFocusElement == null) {
					onFocusElement = document.getElementById('yyxcsfrq');
				}
			}
			if($("#bcsfjlrq").val() != null && $("#yyxcsfrq").val() != null && $("#yyxcsfrq").val() != "" && $("#bcsfjlrq").val() != ""){
				if($("#bcsfjlrq").val().split("-") > $("#yyxcsfrq").val().split("-")){
					errorMessage += "【预约随访时间】必须在【本次随访时间】之后！\n";
					if (onFocusElement == null) {
						onFocusElement = document.getElementById('bcsfjlrq');
					}
				}
			}
		}
		var zgyyValue = document.getElementById('visiting.zgyy').value;
		if((zgyyValue == "请注明原因..." || zgyyValue == "") && zgValue == 5){
			errorMessage += "请注明【转归原因】!\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('visiting.zgyy');
			}
		}
	}else{
		if(sfdw.tagName == 'SELECT'){
			if(sfdw.options[sfdw.selectedIndex].value == ""){
				errorMessage += "【随访单位】没有选择！\n";
				if (onFocusElement == null) {
					onFocusElement = document.getElementById("sfdwcode");
				}		
			};
		}
		// 用药种类所有checkbox的值 放入到一个input中	
		var yyzl = "";
		for (var i = 1; i <= 5; i++) {
			if (document.all["yyzl" + i].checked == true) {
				yyzl += "1";
			} else {
				yyzl += "0";
			}
		}
		document.getElementById('yyzl').value = yyzl;
		// 精神状况所有checkbox的值 放入到一个input中	
		var jszk = "";
		for (var i = 1; i <= 11; i++) {
			if (document.all["jszk" + i].checked == true) {
				jszk += "1";
			} else {
				jszk += "0";
			}
		}
		document.getElementById('jszk').value = jszk;
		// 随访建议所有checkbox的值 放入到一个input中	
		var sfjy = "";
		for (var i = 1; i <= 8; i++) {
			if (document.all["sfjy" + i].checked == true) {
				sfjy += "1";
			} else {
				sfjy += "0";
			}
		}
		document.getElementById('sfjy').value = sfjy;
		// 非药物治疗情况所有checkbox的值 放入到一个input中	
		var fywzlqk = "";
		for (var i = 1; i <= 8; i++) {
			if (document.all["fywzlqk" + i].checked == true) {
				fywzlqk += "1";
			} else {
				fywzlqk += "0";
			}
		}
		document.getElementById('fywzlqk').value = fywzlqk;	
		
		// 临床症状所有checkbox的值 放入到一个input中

		var lczz = "";
		for (var i = 1; i <= 11; i++) {
			if (document.all["lczz" + i].checked == true) {
				lczz += "1";
			} else {
				lczz += "0";
			}
		}
		document.getElementById('lczz').value = lczz;
		// 随访时间检验
		if ($("#bcsfjlrq").val() == null || $("#bcsfjlrq").val() == "") {
			errorMessage += "【本次随访时间】为空！\n";
			if (onFocusElement == null) {
				
				onFocusElement = document.getElementById('bcsfjlrq');
			}
		}
		if(zgValue != 3){//如果 不是死亡
			if ($("#yyxcsfrq").val() == null || $("#yyxcsfrq").val() == "") {
				errorMessage += "【预约随访时间】为空！\n";
				if (onFocusElement == null) {
					onFocusElement = document.getElementById('yyxcsfrq');
				}
			}
			if($("#bcsfjlrq").val() != null && $("#yyxcsfrq").val() != null && $("#yyxcsfrq").val() != "" && $("#bcsfjlrq").val() != ""){
				if($("#bcsfjlrq").val().split("-") > $("#yyxcsfrq").val().split("-")){
					errorMessage += "【预约随访时间】必须在【本次随访时间】之后！\n";
					if (onFocusElement == null) {
						onFocusElement = document.getElementById('bcsfjlrq');
					}
				}
			}
		}
		
		//每季度 不为空
		var jdtnbhd = 0 ;
		$('input[name=visiting.jdtnbhd]').each(function (){
			if($(this).attr('checked')){
				jdtnbhd = 1;
			}
		});
		if (jdtnbhd == 0){
			errorMessage += "【每季度参加糖尿病健康活动次数】为空！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('jdtnbhd');
			}
		}
		
		//休闲时体力活动类型
		var xxstlhdlx = 0 ;
		$('input[name=visiting.xxstlhdlx]').each(function (){
			if($(this).attr('checked')){
				xxstlhdlx = 1;
			}
		});
		if (xxstlhdlx == 0){
			errorMessage += "【休闲时体力活动类型】为空！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('xxstlhdlx');
			}
		}
		
		//休闲时体力活动时间
		var xxstlhdsj = 0 ;
		$('input[name=visiting.xxstlhdsj]').each(function (){
			if($(this).attr('checked')){
				xxstlhdsj = 1;
			}
		});
		if (xxstlhdsj == 0){
			errorMessage += "【休闲时体力活动时间（包括上下班）】为空！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('xxstlhdsj');
			}
		}
		
		//饮食状况
		var yszk = 0 ;
		$('input[name=visiting.yszk]').each(function (){
			if($(this).attr('checked')){
				yszk = 1;
			}
		});
		if (yszk == 0){
			errorMessage += "【饮食状况】为空！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('yszk');
			}
		}
		
		//服药情况
		var fyqkgl = 0 ;
		$('input[name=visiting.fyqk]').each(function (){
			if($(this).attr('checked')){
				fyqkgl = 1;
			}
		});
		if (fyqkgl == 0){
			errorMessage += "【服药情况】为空！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('fyqkgl');
			}
		}
		
		//用药种类
	
	// 用药种类 fix 9.14
		if(document.getElementById('fyqk').checked == false){
			var yyzl5 = document.getElementById('yyzl5');
			if (yyzl5.checked == true) {
				if (document.getElementById("yyzlqt").value == "") {
					errorMessage += "【用药种类】中的【其他】用药种类没有填写！\n";
					if (onFocusElement == null) {
						onFocusElement = document.getElementById("yyzlqt");
						if (onFocusElement == null) {
							onFocusElement = document.getElementById('yyzlqt');
						}
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
				if (onFocusElement == null) {
					onFocusElement = document.getElementById('yyzl1');
				}
			}
		}	
	
	// 临床症状
		var lczz10 = document.getElementById('lczz10');
		if (lczz10.checked == true) {
			if (document.getElementById("lczzqt").value == "") {
				errorMessage += "【临床症状】中的【其他症状】没有填写！\n";
				if (onFocusElement == null) {
					onFocusElement = document.getElementById('lczzqt');
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
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('lczz1');
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
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('jszk1');
			}
		}
	
	// 转归检验

	
		var zg = document.getElementById('zg');
		if (zg.options[zg.selectedIndex].value == "") {
			errorMessage += "【转归类型】没有选择！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('zg');
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
		
		//测量血糖规律
		var clxtgl = 0 ;
		$('input[name=visiting.clxtgl]').each(function (){
			if($(this).attr('checked')){
				clxtgl = 1;
			}
		});
		if (clxtgl == 0){
			errorMessage += "【测量血糖规律】为空！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('clxtgl');
			}
		}
	
		
		
		// 血压（收缩压/舒张压）
		var ssy = document.getElementById('ssy').value;
		var szy = document.getElementById('szy').value;
		if (ssy == "") {
			errorMessage += "【收缩压】没有填写！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('ssy');
			}
		}
		if (szy == "") {
			errorMessage += "【舒张压】没有填写！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('szy');
			}
		}
		// 体重
		var tz = document.getElementById('tz').value;
		if (tz == "") {
			errorMessage += "【体重】没有填写！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('tz');
			}
		}
		// 腰围
		var yw = document.getElementById('yw').value;
		if (tz == "") {
			errorMessage += "【腰围】没有填写！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('yw');
			}
		}
		// 臀围

	
		var tw = document.getElementById('tw').value;
		if (tw == "") {
			errorMessage += "【臀围】没有填写！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('tw');
			}
		}
		
		// 眼底检查	
		var ydjc = document.getElementById('ydjc');
		if (!document.getElementById("ydjcwz").checked){
			if (ydjc.value == "") {
				errorMessage += "【眼底检查结果】没有选择！\n"
				if (onFocusElement == null) {
					onFocusElement = document.getElementById('ydjcwz');
				}
			}
		}else{
//			$('#ydjc').attr('disabled','true');
		}
		
		
		
		//实验室指标 3项必须填写一项 
		if ($("#kfxt").val()==("") && $("#chlxsxt").val()==("") && $("#sjxt").val()==("")){
			errorMessage += "【实验室指标】中【空腹血糖】、【餐后两小时血糖】、【随机血糖】至少填写一个！\n";
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('kfxt');
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
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('sfjy1');
			}
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
			if (onFocusElement == null) {
				onFocusElement = document.getElementById('fywzlqk1');
			}
		}
	}
	

	if (errorMessage != "") {		
		alert(errorMessage);
		if ($(onFocusElement).parents('div.divFirst').css('display')=='none'){
			showPage(1);
		}
		
		if (onFocusElement != null) {
			onFocusElement.focus();
		}
		
	} else {
		if( zgValue != 5 ){//需简单校验
			//提醒转型 和 提交
					if($('#sffszx').attr('checked')  && $('#sfjyzzYes').attr('checked')){
						var zxzlmsg = document.getElementById('zxlx').checked == true? '正常':'2型糖尿病';
						if(window.confirm('您所填写病人的糖尿病随访卡的信息中【病例种类】由IGR转型成为' + zxzlmsg + '。\n您所填写病人的糖尿病随访卡的信息中触发了非定向转诊。\n 是否确认提交？ ')){
							if (document.getElementById('zxlx').checked == false) {
								blzl.options[2].selected = true;
							} else {
								blzl.options[0].selected = true;
							}
							//并发症name修正
							modifyNameOfBfz();
							document.forms[0].submit();
						}
					}else if($('#sffszx').attr('checked') ==true && $('#sfjyzzYes').attr('checked') ==false){
						var zxzlmsg = document.getElementById('zxlx').checked == true? '正常':'2型糖尿病';
						if(window.confirm('您所填写病人的糖尿病随访卡的信息中【病例种类】由IGR转型成为' + zxzlmsg + '， 是否确认提交？ ')){
							if (document.getElementById('zxlx').checked == false) {
								blzl.options[2].selected = true;
							} else {
								blzl.options[0].selected = true;
							}
							//并发症name修正
							modifyNameOfBfz();
							document.forms[0].submit();
						}
					}else if($('#sffszx').attr('checked') ==false && $('#sfjyzzYes').attr('checked') ==true){
						if(window.confirm('您所填写病人的糖尿病随访卡的信息中触发了非定向转诊， 是否确认提交？ ')){
							
							//并发症name修正
							modifyNameOfBfz();
							document.forms[0].submit();
				}
			}else{
				
				//并发症name修正
				modifyNameOfBfz();
				if(window.confirm("确定提交吗？")){
					document.forms[0].submit();
				}
			}
		}else{
			//并发症name修正
			modifyNameOfBfz();
			if(window.confirm("确定提交吗？")){
				document.forms[0].submit();
			}
		}
		
	}
	
	
}




