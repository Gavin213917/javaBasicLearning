//报告医院
var bgyyUrl = "getAllHospitalSelect.action";

/*******页面加载方法*******/
function init(){
	//锁input
	var disabledInput = $("input[name='disabled']");
	for(var i=0;i<disabledInput.length;i++){
		disabledInput[i].disabled = true;
	}
	var disabledSelect = $("select[name='disabled']");
	for(var j=0;j<disabledSelect.length;j++){
		disabledSelect[j].disabled = true;
	}
	//初始化诊断依据复选框
	fixZdyj();
	//初始化死亡信息
	var sfsw = $("#sfswFull").val();
	if(sfsw=="1"){
		$("#swrq").attr("disabled",true);
		$("#syzl").attr("disabled",true);
		$("#gbsydm").attr("disabled",true);
	}
	var syzl = $("#syzlFull").val();
	if(syzl=="1"){
		$("#gbsydm").attr("disabled",true);
	}
	clickSwbfk();
}
/*******初始化诊断依据复选框*******/
function fixZdyj(){
	
	var data = $("#zdyjFull").val();
	var test = data.split(",");
	for(var i=0;i<test.length;i++){
	    var str = "#vcZdyj"+test[i] ;
		str = str.replace(".","\\.") ;
		$(str).attr("checked",true) ;
	}
}
/*******提交表单*******/
function submitForm(){
	var errMsg = checkInputs()
	if(errMsg==""){
		if(confirm("您确定要提交该肿瘤报告卡吗？")){
			$("#form").submit();
		}
	}else{
		alert(errMsg);
	}
}

/*******校验地址*******/
function checkAddress(){
	var errMsg="";
	if($("#provinceHj").val()==""||$("#provinceHj").val()==null||$("#provinceHj").val()=="#"){
		errMsg=errMsg+"请选择户籍地址（省、自治区、直辖市）！\n";
	}
	if($("#cityHj").val()==""||$("#cityHj").val()==null||$("#cityHj").val()=="#"){
		errMsg=errMsg+"请选择户籍地址（市、地区）！\n";
	}
	if($("#districtHj").val()==""||$("#districtHj").val()==null||$("#districtHj").val()=="#"){
		errMsg=errMsg+"请选择户籍地址（县、区）！\n";
	}
	if($("#streetHj").val()==""||$("#streetHj").val()==null||$("#streetHj").val()=="#"){
		errMsg=errMsg+"请选择户籍地址（街道、镇）！\n";
	}
	if($("#roadHj").val()==""||$("#roadHj").val()==null){
		errMsg=errMsg+"请选择户籍地址（路）！\n";
	}
	if($("#roomHj").val()==""||$("#roomHj").val()==null){
		errMsg=errMsg+"请选择户籍地址（门牌号）！\n";
	}
	if($("#province").val()==""||$("#province").val()==null||$("#province").val()=="#"){
		errMsg=errMsg+"请选择居住地址（省、自治区、直辖市）！\n";
	}
	if($("#city").val()==""||$("#city").val()==null||$("#city").val()=="#"){
		errMsg=errMsg+"请选择居住地址（市、地区）！\n";
	}
	if($("#district").val()==""||$("#district").val()==null||$("#district").val()=="#"){
		errMsg=errMsg+"请选择居住地址（县、区）！\n";
	}
	if($("#street").val()==""||$("#street").val()==null||$("#street").val()=="#"){
		errMsg=errMsg+"请选择居住地址（街道、镇）！\n";
	}
	if($("#road").val()==""||$("#road").val()==null){
		errMsg=errMsg+"请选择居住地址（路）！\n";
	}
	if($("#room").val()==""||$("#room").val()==null){
		errMsg=errMsg+"请选择居住地址（门牌号）！\n";
	}
	return errMsg;
}
/*******校验页面提交信息*******/
function checkInputs(){
	var errMsg = "";
	if($("#vcGzbr").val()==null || $("#vcGzbr").val()=="" || $("#vcGzbr").val()=="-1"){
        errMsg = errMsg + "病情是否已告知病人必填！\n";
    }
    if($("#vcZqsf").val()==null || $("#vcZqsf").val()=="" || $("#vcZqsf").val()=="-1"){
        errMsg = errMsg + "患者是否同意随访必填！\n";
    }
	if($("#xm").val()==null || $("#xm").val()==""){
		errMsg = errMsg + "姓名必填！\n";
	}
	if($("#xb").val()==null || $("#xb").val()=="" || $("#xb").val()=="-1"){
		errMsg = errMsg + "性别必填！\n";
	}
	if($("#mz").val()==null || $("#mz").val=="" || $("#mz").val()=="-1"){
		errMsg = errMsg + "民族必填！\n";
	}
	if($("#csny").val()==null || $("#csny").val()==""){
		errMsg = errMsg + "出生日期必填！\n";
	}
	if($("#icd10mc").val()==null || $("#icd10mc").val()==""){
		errMsg = errMsg + "肿瘤诊断名称必填！\n";
	}
	if($("#icdomc").val()==null || $("#icdomc").val()==""){
		errMsg = errMsg + "病理诊断名称必填！\n";
	}
	var zdyj = document.getElementsByName("tbZlCardInfo.vcZdyj");
	var zdyjFlag = false;
	var zdyj15Flag = false;
	for(var i = 0; i < zdyj.length; i++){
	    if(zdyj[i].checked == true){
	        if(i != 14){
	            zdyjFlag = true;
	            break;
	        }else{
	            zdyj15Flag = true;
	            break;
	        }	        
	    }
	}
	var zdyj15 = document.getElementById("vcZdyj9");
	if(zdyj15.checked == true && zdyjFlag == true){
	     errMsg = errMsg + "诊断依据如果为不详，不能选择其他！\n";
	}
//	if(zdyjFlag == false && zdyj15Flag == false){
//	    errMsg = errMsg + "诊断依据必选！\n";
//	}
//	if(getAllZdyjCheckbox()=="0000000000000000"){
//		errMsg = errMsg + "诊断依据必选！\n";
//	}
	if($("#dtSczdrq").val()==null || $("#dtSczdrq").val()==""){
		errMsg = errMsg + "首次诊断日期必填！\n";
	}
	if($("#vcBgys").val()==null || $("#vcBgys").val()==""){
		errMsg = errMsg + "报告医师必填！\n";
	}
	if($("#bgyy").val()==null || $("#bgyy").val()=="" || $("#bgyyLabel").val()=="请输入" || $("#bgyyLabel").val()==null || $("#bgyyLabel").val()==""){
		errMsg = errMsg + "报告医院必填！\n";
	}
	if($("#dtBgrq").val()==null || $("#dtBgrq").val()==""){
		errMsg = errMsg + "报告日期必填！\n";
	}
	if($("#sfsw").val()==null || $("#sfsw").val()=="" || $("#sfsw").val()=="-1"){
		errMsg = errMsg + "死亡信息必选！\n";
	}else{
		if($("#sfsw").val()=="2"){//已死亡的
			if($("#swrq").val()==null || $("#swrq").val()==""){
				errMsg = errMsg + "如患者已死亡，死亡日期必填！\n";
			}
			if($("#syzl").val()==null || $("#syzl").val()=="" || $("#syzl").val()=="-1"){
				errMsg = errMsg + "如患者已死亡，死亡原因必选！\n";
			}else{
				if($("#syzl").val()=="2"){//死于非肿瘤
					if($("#gbsydm").val()==null || $("#gbsydm").val()=="" || $("#gbsydm").val()=="-1"){
						errMsg = errMsg + "如患者死于非肿瘤，死亡ICD-10必选！\n";
					}
				}
			}
		}
	}
	//校验身份证号
	var checkSfz = checkJzhm();
	if(checkSfz!=""){
		errMsg = errMsg + checkSfz;
	}
	//页面逻辑校验
	if($("#csny").val()!=null && $("#csny").val()!=""){
		if($("#csny").val()>$("#sysTime").val()){
			errMsg = errMsg + "出生日期大于系统当前日期！\n";
		}
	}
	if($("#dtSczdrq").val()!=null && $("#dtSczdrq").val()!=""){
		if($("#dtSczdrq").val()>$("#sysTime").val()){
			errMsg = errMsg + "首次诊断日期大于系统当前日期！\n";
		}
	}
	if($("#dtSczdrq").val()!=null && $("#dtSczdrq").val()!="" && $("#csny").val()!=null && $("#csny").val()!=""){
		if($("#dtSczdrq").val()<$("#csny").val()){
			errMsg = errMsg + "首次诊断日期小于出生日期！\n";
		}
	}
	if($("#dtSczdrq").val()!=null && $("#dtSczdrq").val()!="" && $("#dtBgrq").val()!=null && $("#dtBgrq").val()!=""){
		if($("#dtSczdrq").val()>$("#dtBgrq").val()){
			errMsg = errMsg + "首次诊断日期大于报告日期！\n";
		}
	}
	if($("#dtBgrq").val()!=null && $("#dtBgrq").val()!=""){
		if($("#dtBgrq").val()>$("#sysTime").val()){
			errMsg = errMsg + "报告日期大于系统当前日期！\n";
		}
	}
	if($("#dtBgrq").val()!=null && $("#dtBgrq").val()!="" && $("#csny").val()!=null && $("#csny").val()!=""){
		if($("#dtBgrq").val()<$("#csny").val()){
			errMsg = errMsg + "报告日期小于出生日期！\n";
		}
	}
	if($("#swrq").val()!=null&&$("#swrq").val()!=""&&$("#swrq").attr("disabled")==false){
		if($("#swrq").val()>$("#sysTime").val()){
			errMsg = errMsg + "死亡日期大于系统当前日期！\n";
		}
		if($("#csny").val()!=null && $("#csny").val()!=""){
			if($("#csny").val()>$("#swrq").val()){
				errMsg = errMsg + "出生日期大于死亡时间！\n";
			}
		}
		if($("#dtSczdrq").val()!=null && $("#dtSczdrq").val()!=""){
			if($("#dtSczdrq").val()>$("#swrq").val()){
				errMsg = errMsg + "首次诊断日期大于死亡时间！\n";
			}
		}
	}
	var checkAddresses = checkAddress();
	if(checkAddresses!=""){
		errMsg = errMsg + checkAddresses;
	}
	return errMsg;
}
/*******整合诊断依据复选框*******/
function getAllZdyjCheckbox(){
	var zdyj = "";
	var tempZdyj = $("input[name='vcZdyj']");
	for(var i=0;i<tempZdyj.length;i++){
		if(tempZdyj[i].checked){
			zdyj = zdyj + "1";
		}else{
			zdyj = zdyj + "0";
		}
	}
	return zdyj;
}
/*******死亡信息变更联动*******/
function changeSfsw(){
	if($("#sfsw").val()=="1"){
		$("#swrq").attr("disabled",true);
		$("#syzl").attr("disabled",true);
		$("#gbsydm").attr("disabled",true);
	}else{
		$("#swrq").attr("disabled",false);
		$("#syzl").attr("disabled",false);
		if($("#syzl").val()=="1"){
			$("#gbsydm").attr("disabled",true);
		}else{
			$("#gbsydm").attr("disabled",false);
		}
	}
}
/*******格式化出生日期*******/
function transCsnyFormat(){
	var csny = $("#csny").val().substring(0,4)+"-"+$("#csny").val().substring(4,6)+"-"+$("#csny").val().substring(6,8);
	$("#csny").attr("value",csny);
}
/*******点击诊断依据 死亡补发卡联动*******/
function clickSwbfk(){
	if($("#vcZdyj16").attr("checked")==true){
		$("#sfsw").attr("value","2");
	}else{
		$("#sfsw").attr("value","1");
	}
	changeSfsw();
}
/*******死于肿瘤变更联动*******/
function changeSyzl(){
	if($("#syzl").val()=="1"){
		$("#gbsydm").attr("disabled",true);
	}else{
		$("#gbsydm").attr("disabled",false);
	}
}
/*******诊断时期别联动*******/
function changeZdsqbT(){
	if($("#vcZdsqbt").val()==""){
		$("#vcZdsqbn").attr("disabled",true);
		$("#vcZdsqbm").attr("disabled",true);
	}else{
		$("#vcZdsqbn").attr("disabled",false);
		$("#vcZdsqbm").attr("disabled",false);
	}
}
/*******身份证号校验*******/
function checkJzhm(){
	var errMsg="";
	if($("#zjlx").val() == "01"){
	if($("#zjh").val()!=null || $("#zjh").val()!=""){
	if($("#zjh").val().length!=18&&$("#zjh").val().length!=15){
		errMsg=errMsg+"身份证号位数错误！\n";
	}else{
		var tempCsny = $("#csny").val().substring(0,4)+$("#csny").val().substring(5,7)+$("#csny").val().substring(8,10);
		var tempXb = $("#xb").val();
		if($("#zjh").val().length==18){
			//出生年月校验
			var sfzCsny = $("#zjh").val().substring(6,14);
			if(tempCsny!=sfzCsny){
				errMsg=errMsg+"身份证号与出生年月不相符！\n";
			}
			//性别校验
			var tempXb = $("#xb").val();
			var sfzXb = $("#zjh").val().substring(14,17);
			if((sfzXb%2==0 && tempXb=="1") || (sfzXb%2==1 && tempXb=="2")){
				errMsg=errMsg+"身份证号与性别不相符！\n";
			}
		}
		if($("#zjh").val().length==15){
			//出生年月校验
			var sfzCsny = "19" + $("#zjh").val().substring(6,12);//实际上是不正确的，不适用1900年及以前出生的人，再议
			if(tempCsny!=sfzCsny){
				errMsg=errMsg+"身份证号与出生年月不相符！\n";
			}
			//性别校验
			var sfzXb = $("#zjh").val().substring(14,15);
			if((sfzXb%2==0 && tempXb=="1") || (sfzXb%2==1 && tempXb=="2")){
				errMsg=errMsg+"身份证号与性别不相符！\n";
			}
		}
		}
		}
	}
	return errMsg;
}