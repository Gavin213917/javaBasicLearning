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
//var roadHjUrl = "getRoadSelect.action";
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
//var roadUrl = "getRoadSelect.action";

//报告医院
var bgyyUrl = "getAllHospitalSelect.action";
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

/*******复制户籍地*******/
function copyHjAddress(){
    changeArea("JuZhu","1");
	$("#province").attr("value",$("#provinceHj").val());
	changeArea("JuZhu","2");
//	$("#provinceLabel").attr("value",$("#provinceHjLabel").val());
	$("#city").attr("value",$("#cityHj").val());
	changeArea("JuZhu","3");
//	$("#cityLabel").attr("value",$("#cityHjLabel").val());
	$("#district").attr("value",$("#districtHj").val());
	changeArea("JuZhu","4");
//	$("#districtLabel").attr("value",$("#districtHjLabel").val());
	$("#street").attr("value",$("#streetHj").val());
	changeArea("JuZhu","5");
//	$("#streetLabel").attr("value",$("#streetHjLabel").val());
	$("#village").attr("value",$("#villageHj").val());
//	$("#villageLabel").attr("value",$("#villageHjLabel").val());
	$("#road").attr("value",$("#roadHj").val());
//	$("#roadLabel").attr("value",$("#roadHjLabel").val());
	$("#room").attr("value",$("#roomHj").val());
//	$("#roomLabel").attr("value",$("#roomHjLabel").val());
	$("#text").attr("value",$("#textHj").val());
}
/*******地址初始化*******/
function initInfomation(){
	//户籍地
//	$("#provinceHj").attr("value",$("#hjdProvince").val());
//	$("#provinceHjLabel").attr("value",$("#hjdProvinceMc").val());
//	$("#cityHj").attr("value",$("#hjdCity").val());
//	$("#cityHjLabel").attr("value",$("#hjdCityMc").val());
//	$("#districtHj").attr("value",$("#hjdDistrict").val());
//	$("#districtHjLabel").attr("value",$("#hjdDistrictMc").val());
//	$("#streetHj").attr("value",$("#hjdTown").val());
//	$("#streetHjLabel").attr("value",$("#hjdTownMc").val());
//	$("#villageHj").attr("value",$("#hjdVillage").val());
//	$("#villageHjLabel").attr("value",$("#hjdVillageMc").val());
	$("#roadHj").attr("value",$("#hjdRoad").val());
//	$("#roadHjLabel").attr("value",$("#hjdRoadMc").val());
	$("#roomHj").attr("value",$("#hjdRoom").val());
	$("#textHj").attr("value",$("#hjdText").val());
	//居住地
//	$("#province").attr("value",$("#jzdProvince").val());
//	$("#provinceLabel").attr("value",$("#jzdProvinceMc").val());
//	$("#city").attr("value",$("#jzdCity").val());
//	$("#cityLabel").attr("value",$("#jzdCityMc").val());
//	$("#district").attr("value",$("#jzdDistrict").val());
//	$("#districtLabel").attr("value",$("#jzdDistrictMc").val());
//	$("#street").attr("value",$("#jzdTown").val());
//	$("#streetLabel").attr("value",$("#jzdTownMc").val());
//	$("#village").attr("value",$("#jzdVillage").val());
//	$("#villageLabel").attr("value",$("#jzdVillageMc").val());
	$("#road").attr("value",$("#jzdRoad").val());
//	$("#roadLabel").attr("value",$("#jzdRoadMc").val());
	$("#room").attr("value",$("#jzdRoom").val());
	$("#text").attr("value",$("#jzdText").val());
	//默认值
	/*
	if($("#hjdProvinceMc").val()==null || $("#hjdProvinceMc").val()==""){
		$("#provinceHjLabel").attr("value","上海市");
		$("#provinceHj").attr("value","310000000000");
	}
	if($("#hjdCityMc").val()==null || $("#hjdCityMc").val()==""){
		$("#cityHjLabel").attr("value","市辖区");
		$("#cityHj").attr("value","310100000000");
	}
	if($("#hjdDistrictMc").val()==null || $("#hjdDistrictMc").val()==""){
		$("#districtHjLabel").attr("value","闸北区");
		$("#districtHj").attr("value","310108000000");
	}
	if($("#jzdProvinceMc").val()==null || $("#jzdProvinceMc").val()==""){
		$("#provinceLabel").attr("value","上海市");
		$("#province").attr("value","310000000000");
	}
	if($("#jzdCityMc").val()==null || $("#jzdCityMc").val()==""){
		$("#cityLabel").attr("value","市辖区");
		$("#city").attr("value","310100000000");
	}
	if($("#jzdDistrictMc").val()==null || $("#jzdDistrictMc").val()==""){
		$("#districtLabel").attr("value","闸北区");
		$("#district").attr("value","310108000000");
	}
	*/
}
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
	initInfomation();
	changeArea("JuZhu","1");
    changeArea("HuJi","1");
}
/*******初始化诊断依据复选框*******/
function fixZdyj(){
	var vcZdyj = $("#zdyjFull").val();
	if(vcZdyj!=null&&vcZdyj!=""){
		for(var k=0;k<vcZdyj.length;k++){
			if(vcZdyj.substring(k,k+1)=="1"){
				var p = k + 1;
				$("#vcZdyj"+p).attr("checked","true");
			}
		}
	}
}
/*******提交表单*******/
function submitForm(){
	var errMsg = checkInputs();
	$("#idType").attr("value",$("#ylbxlb").val());
	$("#idValue").attr("value",$("#ylbxkh").val());
	$("#zjlx").attr("disabled",false) ;
	$("#zjh").attr("disabled",false) ;
	$("#bgyyLabel").attr("disabled",false) ;
	if(errMsg==""){
		if(confirm("您确定要提交该肿瘤报告卡吗？")){
			//transCsnyFormat();
//			$("#finalZdyj").attr("value",getAllZdyjCheckbox());
			getAllAddress();
			$("#form").submit();
		}
	}else{
		alert(errMsg);
	}
}
/*******转换所有地址 用于提交*******/
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
    if($("#zjlx").val()==null || $("#zjlx").val()=="" || $("#zjlx").val()=="-1"){
        errMsg = errMsg + "证件类型必填！\n";
    }
    if($("#zjh").val()==null || $("#zjh").val()==""){
        errMsg = errMsg + "证件号码必填！\n";
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


