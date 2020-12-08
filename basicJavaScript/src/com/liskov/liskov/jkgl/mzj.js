// JavaScript 文件



function addSelcetRow(){
	
	var selectTable = document.getElementById("zlxxT")
    var newTr = selectTable.insertRow();
	newTr.id = "tr";
    newTr.runtimeStyle.backgroundColor="#FFFFFF";  
	//添加四列
    var newTd0 = newTr.insertCell();
    var newTd1 = newTr.insertCell();
    var newTd2 = newTr.insertCell();
    var newTd3 = newTr.insertCell();
    
    var uniqeCode = new Date();
   	var count = uniqeCode.getTime();  
    
   	
   	
    newTd0.innerHTML = "<input name='kszlrq' readonly='readonly' id='kszlrq"+count+"'  onclick='new Calendar().show(this);' />";
    newTd1.innerHTML = "<input name='tzzlrq' readonly='readonly' id='tzzlrq"+count+"'  onclick='new Calendar().show(this);' />";
    newTd2.innerHTML = "<select name='zlfa' id='zlfa"+count+"'>" +
    		"<option value=''>请选择</option>" +
    		"<option value='1'>2H3R3Z3E3/4H3R3</option>" +
    		"<option value='2'>2HREZ/4H3R3</option>" +
    		"<option value='3'>FDC-2HRZE/4HR</option>" +
    		"<option value='4'>2HRZE/4HR</option>" +
    		"<option value='5'>3H3R3Z3E3/4H3R3</option>" +
    		"<option value='6'>2H3R3Z3E3S3/6H3R3E3</option>" +
    		"<option value='7'>3H3R3Z3E3/6H3R3E3</option>" +
    		"<option value='8'>2HRZES/6HRE</option>" +
    		"<option value='9'>2H3R3Z3/4H3R3</option>" +
    		"<option value='10'>2H3L3Z3E3/4H2L2E2</option>" +
    		"<option value='11'>FDC-HRZS/HR</option>" +
    		"<option value='99'>其它</option>" +
    		"</select>";
    newTd3.innerHTML = "<a style='cursor:hand' onclick='delRow(this)'>删除</a>" +
    		"<input name='rowCount' type='hidden' value='0' />"
	
}

function saveXxa(){
	var yx = document.getElementById("yx");
	if(yx.value == '' || yx.value == null){
		yx.focus();
		doErrorStyle(yx,'月序不能为空');
		return;
	}
	var xxyc = document.getElementById("xxyc");
	if(xxyc.value == '' || xxyc.value == null){
		xxyc.focus();
		doErrorStyle(xxyc,'X线异常不能为空');
		return;
	}
	var form = document.forms('baxxForm');
	form.submit();
}

function saveTjxx(){
	var yx = document.getElementById("yx");
	if(yx.value == '' || yx.value == null){
		yx.focus();
		doErrorStyle(yx,'月序不能为空');
		return;
	}
	var tjjg = document.getElementById("tjjg");
	if(tjjg.value == '' || tjjg.value == null){
		tjjg.focus();
		doErrorStyle(tjjg,'痰检结果不能为空');
		return;
	}
	var tjrq = document.getElementById("tjrq");
	if(tjrq.value == '' || tjrq.value == null){
		tjrq.focus();
		doErrorStyle(tjrq,'痰检日期不能为空');
		return;
	}
	var form = document.forms('baxxForm');
	form.submit();
}

function saveTpyxx(){
	var yx = document.getElementById("yx");
	if(yx.value == '' || yx.value == null){
		yx.focus();
		doErrorStyle(yx,'月序不能为空');
		return;
	}
	var tpyjg = document.getElementById("tpyjg");
	if(tpyjg.value == '' || tpyjg.value == null){
		tpyjg.focus();
		doErrorStyle(tpyjg,'痰培养结果不能为空');
		return;
	}
	var tpyrq = document.getElementById("tpyrq");
	if(tpyrq.value == '' || tpyrq.value == null){
		tpyrq.focus();
		doErrorStyle(tpyrq,'痰培养日期不能为空');
		return;
	}
	var form = document.forms('baxxForm');
	form.submit();
}

function saveYmxx(){
	var ymsydm = document.getElementById("ymsydm");
	if(ymsydm.value == '' || ymsydm.value == null){
		ymsydm.focus();
		doErrorStyle(ymsydm,'药敏试验单位不能为空');
		return;
	}
	var ymsyrq = document.getElementById("ymsyrq");
	if(ymsyrq.value == '' || ymsyrq.value == null){
		ymsyrq.focus();
		doErrorStyle(ymsyrq,'药敏试验日期不能为空');
		return;
	}
	var form = document.forms('baxxForm');
	form.submit();
}


function saveQyxx(){
	
	var form = document.forms('baxxForm');
	form.submit();
}


function saveBaxx(){
	var hzxm = document.getElementById('hzxm');
	if(hzxm.value == '' || hzxm.value == null){
		hzxm.focus();
		doErrorStyle(hzxm,'患者姓名不能为空');
		return;
	}
	var xb = $("input[name='djgl.xb']");
	var xbs = false;
	for(i=0;i<xb.length;i++){
		if(xb[i].checked){
			xbs = true;
		}
	}
	if(!xbs){
		xb[0].focus();
		doErrorStyle(xb[0],'性别不能为空');
		return;
	}
	var csrq = document.getElementById('csrq');
	var sznl = document.getElementById('sznl');
	if((csrq.value == '' || csrq.value == null) && (sznl.value == '' || sznl.value == null)){
		csrq.focus();
		doErrorStyle(csrq,'出生日期，实足年龄不能同时为空');
		return;
	}
	var mz = document.getElementById('mz');
	if(mz.value == '' || mz.value == null){
		mz.focus();
		doErrorStyle(mz,'请选择民族');
		return;
	}
	var hzzy = document.getElementById('hzzy');
	if(hzzy.value == '' || hzzy.value == null){
		hzzy.focus();
		doErrorStyle(hzzy,'请选择职业');
		return;
	}
	var jyry = $("input[name='djgl.jyrybz']");
	var jyrys = false;
	for(i=0;i<jyry.length;i++){
		if(jyry[i].checked){
			jyrys = true;
		}
	}
	if(!jyrys){
		jyry[0].focus();
		doErrorStyle(jyry[0],'羁押人员标志不能为空');
		return;
	}
	var hjlx = document.getElementById('hjlx');
	if(hjlx.value == '' || hjlx.value == null){
		hjlx.focus();
		doErrorStyle(hjlx,'户籍类型不能为空');
		return;
	}
	var hzly = document.getElementById('hzly');
	if(hzly.value == '' || hzly.value == null){
		hzly.focus();
		doErrorStyle(hzly,'患者来源不能为空');
		return;
	}
	
	var dyzzcsrq = document.getElementById('dyzzcsrq');
	if(dyzzcsrq.value == '' || dyzzcsrq.value == null){
		dyzzcsrq.focus();
		doErrorStyle(dyzzcsrq,'症状出现日期不能为空');
		return;
	}
	var bcszrq = document.getElementById('bcszrq');
	if(bcszrq.value == '' || bcszrq.value == null){
		bcszrq.focus();
		doErrorStyle(bcszrq,'本次首诊日期不能为空');
		return;
	}
	var bcqzrq = document.getElementById('bcqzrq');
	if(bcqzrq.value == '' || bcqzrq.value == null){
		bcqzrq.focus();
		doErrorStyle(bcqzrq,'本次确诊日期不能为空');
		return;
	}
	var zdfx = document.getElementById('zdfx');
	if(zdfx.value == '' || zdfx.value == null){
		zdfx.focus();
		doErrorStyle(zdfx,'患者诊断分型不能为空');
		return;
	}
	var zdjg = document.getElementById('zdjg');
	if(zdjg.value == '' || zdjg.value == null){
		zdjg.focus();
		doErrorStyle(zdjg,'诊断结果不能为空');
		return;
	}
	var djrq = document.getElementById('djrq');
	if(djrq.value == '' || djrq.value == null){
		djrq.focus();
		doErrorStyle(djrq,'登记日期不能为空');
		return;
	}
	var djfl = document.getElementById('djfl');
	if(djfl.value == '' || djfl.value == null){
		djfl.focus();
		doErrorStyle(djfl,'登记分类不能为空');
		return;
	}
	var lrrq = document.getElementById('lrrq');
	if(lrrq.value == '' || lrrq.value == null){
		lrrq.focus();
		doErrorStyle(lrrq,'录入日期不能为空');
		return;
	}
	var lrdw = document.getElementById('lrdw');
	if(lrdw.value == '' || lrdw.value == null){
		lrdw.focus();
		doErrorStyle(lrdw,'录入单位不能为空');
		return;
	}
	var bgrxm = document.getElementById('bgrxm');
	if(bgrxm.value == '' || bgrxm.value == null){
		bgrxm.focus();
		doErrorStyle(bgrxm,'报告医生不能为空');
		return;
	}
	
	var form = document.forms('baxxForm');
	form.submit();
}

function delRow(obj){   
    obj.parentNode.parentNode.removeNode(true);   
} 

function changeAddr(jb,v){
	if(jb == 'she'){
		$("#jzdz").val(v);
	}
	else if(jb == 'shi' && v != '请输入'){
		var she = $("#jzdSheLabel").val();
		$("#jzdz").val(she+v);
	}
	else if(jb == 'xia' && v != '请输入'){
		var she = $("#jzdSheLabel").val();
		var shi = $("#jzdShiLabel").val();
		$("#jzdz").val(she+shi+v);
		
	}
	else if(jb == 'xng' && v != '请输入'){
		var she = $("#jzdSheLabel").val();
		var shi = $("#jzdShiLabel").val();
		var xia = $("#jzdXiaLabel").val();
		$("#jzdz").val(she+shi+xia+v);
		
	}else if(jb == 'cun' && v != '请输入'){
		var she = $("#jzdSheLabel").val();
		var shi = $("#jzdShiLabel").val();
		var xia = $("#jzdXiaLabel").val();
		var xng = $("#jzdXngLabel").val();
		if(xng == '请输入'){
			xng = "";
		}
		$("#jzdz").val(she+shi+xia+xng+v);
		
	}else if(jb == 'lu' && v != '请输入'){
		var she = $("#jzdSheLabel").val();
		var shi = $("#jzdShiLabel").val();
		var xia = $("#jzdXiaLabel").val();
		var xng = $("#jzdXngLabel").val();
		var cun = $("#jzdCunLabel").val();
		if(xng == '请输入'){
			xng = "";
		}
		if(cun == '请输入'){
			cun = "";
		}
		$("#jzdz").val(she+shi+xia+xng+cun+v);
		
	}else if(jb == 'mph'){
		var she = $("#jzdSheLabel").val();
		var shi = $("#jzdShiLabel").val();
		var xia = $("#jzdXiaLabel").val();
		var xng = $("#jzdXngLabel").val();
		var cun = $("#jzdCunLabel").val();
		var lu = $("#jzdLuLabel").val();
		if(xng == '请输入'){
			xng = "";
		}
		if(cun == '请输入'){
			cun = "";
		}
		if(lu == '请输入'){
			lu = "";
		}
		$("#jzdz").val(she+shi+xia+xng+cun+lu+v);
		
	}
	
}

function addTrace(){
	var zzqk = document.getElementById('zzqk');
	if(zzqk.value == '' || zzqk.value == null){
		zzqk.focus();
		doErrorStyle(zzqk,'请选择追踪情况');
		return;
	}
	
	if(zzqk.value == '1'){
		var dwrq = document.getElementById('dwrq');
		if(dwrq.value == '' || dwrq.value == null){
			dwrq.focus();
			doErrorStyle(dwrq,'到位日期不能为空');
			return;
		}
		var dwfs = document.getElementById('dwfs');
		if(dwfs.value == '' || dwfs.value == null){
			dwfs.focus();
			doErrorStyle(dwfs,'到位方式不能为空');
			return;
		}
	}
	if(zzqk.value == '2'){
		var wdwyy = document.getElementById('wdwyy');
		if(wdwyy.value == '' || wdwyy.value == null){
			wdwyy.focus();
			doErrorStyle(wdwyy,'未到位原因不能为空');
			return;
		}
		
	}
	if(zzqk.value == '3'){
		var wzzyy = document.getElementById('wzzyy');
		if(wzzyy.value == '' || wzzyy.value == null){
			wzzyy.focus();
			doErrorStyle(wzzyy,'未追踪原因不能为空');
			return;
		}
		
	}
	var form = document.forms('tuberculosRptForm');
	form.submit();
}

function saveRpt(){
	var hzxm = document.getElementById('hzxm');
	if(hzxm.value == '' || hzxm.value == null){
		hzxm.focus();
		doErrorStyle(hzxm,'患者姓名不能为空');
		return;
	}
	var xb = $("input[name='xb']");
	var xbs = false;
	for(i=0;i<xb.length;i++){
		if(xb[i].checked){
			xbs = true;
		}
	}
	if(!xbs){
		xb[0].focus();
		doErrorStyle(xb[0],'性别不能为空');
		return;
	}
	var csrq = document.getElementById('csrq');
	var sznl = document.getElementById('sznl');
	if((csrq.value == '' || csrq.value == null) && (sznl.value == '' || sznl.value == null)){
		csrq.focus();
		doErrorStyle(csrq,'出生日期，实足年龄不能同时为空');
		return;
	}
	
	var jbbz = document.getElementById('jbbz');
	if(jbbz.value == '' || jbbz.value == null){
		jbbz.focus();
		doErrorStyle(jbbz,'发病病种不能为空');
		return;
	}
	var hzzy = document.getElementById('hzzy');
	if(hzzy.value == '' || hzzy.value == null){
		hzzy.focus();
		doErrorStyle(hzzy,'患者职业不能为空');
		return;
	}
	
	var fbrq = document.getElementById('fbrq');
	if(fbrq.value == '' || fbrq.value == null){
		fbrq.focus();
		doErrorStyle(fbrq,'发病日期不能为空');
		return;
	}
	var zdrq = document.getElementById('zdrq');
	if(zdrq.value == '' || zdrq.value == null){
		zdrq.focus();
		doErrorStyle(zdrq,'诊断日期不能为空');
		return;
	}
	var bgys = document.getElementById('bgys');
	if(bgys.value == '' || bgys.value == null){
		bgys.focus();
		doErrorStyle(bgys,'报告医生不能为空');
		return;
	}
	var bgdw = document.getElementById('bgdw');
	if(bgdw.value == '' || bgdw.value == null){
		bgdw.focus();
		doErrorStyle(bgdw,'报告单位不能为空');
		return;
	}
	var tkrq = document.getElementById('tkrq');
	if(tkrq.value == '' || tkrq.value == null){
		tkrq.focus();
		doErrorStyle(tkrq,'报告日期不能为空');
		return;
	}
	var jzdShe = document.getElementById('jzdSheLabel');
	if(jzdShe.value == '请输入' || jzdShe.value == '' || jzdShe.value == null){
		jzdShe.focus();
		doErrorStyle(jzdShe,'请选择居住地省');
		return;
	}
	var jzdShi = document.getElementById('jzdShiLabel');
	if(jzdShi.value == '请输入' || jzdShi.value == '' || jzdShi.value == null){
		jzdShi.focus();
		doErrorStyle(jzdShi,'请选择居住地市');
		return;
	}
	var jzdXia = document.getElementById('jzdXiaLabel');
	if(jzdXia.value == '请输入' || jzdXia.value == '' || jzdXia.value == null){
		jzdXia.focus();
		doErrorStyle(jzdXia,'请选择居住地区县');
		return;
	}
	var jzdXng = document.getElementById('jzdXngLabel');
	if(jzdXng.value == '请输入' || jzdXng.value == '' || jzdXng.value == null){
		jzdXng.focus();
		doErrorStyle(jzdXng,'请选择居住地街道');
		return;
	}

	
	var pd = document.getElementById('csrq').value;
	var fd = document.getElementById('fbrq').value;
	var zd = document.getElementById('zdrq').value;
	var sd = document.getElementById('swrq').value;
	var bd = document.getElementById('tkrq').value;
	if(fd != null && fd !='' && pd != null && pd !=''){
		pd = pd.replace(/-/g,'/');
		fd = fd.replace(/-/g,'/');
		var d1 = new Date(pd);
		var d2 = new Date(fd);
		if(d2<d1){
			var p = document.getElementById('fbrq')
			p.focus();
			doErrorStyle(p,'发病日期必须大于出生日期');
			return;
		}
	}
	if(zd != null && zd !='' && pd != null && pd !='' ){
		pd = pd.replace(/-/g,'/');
		zd = zd.replace(/-/g,'/');
		var d1 = new Date(pd);
		var d3 = new Date(zd);
		if(d3<d1){
			var p = document.getElementById('zdrq')
			p.focus();
			doErrorStyle(p,'诊断日期必须大于出生日期');
			return;
		}
	}
	if(sd != null && sd !='' && pd != null && pd !='' ){
		pd = pd.replace(/-/g,'/');
		sd = zd.replace(/-/g,'/');
		var d1 = new Date(pd);
		var d4 = new Date(sd);
		if(d4<d1){
			var p = document.getElementById('swrq')
			p.focus();
			doErrorStyle(p,'死亡日期必须大于出生日期');
			return;
		}
	}
	if(bd != null && bd !='' && pd != null && pd !='' ){
		pd = pd.replace(/-/g,'/');
		bd = bd.replace(/-/g,'/');
		var d1 = new Date(pd);
		var d3 = new Date(bd);
		if(d3<d1){
			var p = document.getElementById('tkrq')
			p.focus();
			doErrorStyle(p,'报告日期必须大于出生日期');
			return;
		}
	}
	if(pd != null && pd !=''){
		var d1 = new Date();
		pd = pd.replace(/-/g,'/');
		var d2 = new Date(pd);
		var year = calcDifYear(d1,d2);
		var cn = document.getElementById('hejzxm');
		if(year < 14 && (cn.value == null || cn.value == '')){
			alert('请填写患儿家长姓名');
			cn.style.backgroundColor="#AACFFE";
			cn.title = '请填写患儿家长姓名';
			return;
		}
		
	}
	
	
	
	var form = document.forms('tuberculosRptForm');
	form.submit();
}

function validateRequired(r){
	if(r=='hzxm'){
		var rv = $("#hzxm").val();
		if(rv == null || rv == ''){
			$("#hzxmTag").text("患者姓名不能为空！");
		}else{
			$("#hzxmTag").text('');
		}
	}
	else if(r=='csrq'){
		var rv = $("#csrq").val();
		var rv2 = $("#sznl").val();
		if((rv == null || rv == '')&&(rv2 == null || rv2 == '')){
			$("#csrqTag").text("出生日期、实足年龄不能同时为空！");
		}else{
			$("#csrqTag").text('');
			$("#sznlTag").text('');
		}
	}
	else if(r=='sznl'){
		var rv = $("#csrq").val();
		var rv2 = $("#sznl").val();
		if((rv == null || rv == '')&&(rv2 == null || rv2 == '')){
			$("#sznlTag").text("出生日期、实足年龄不能全部为空！");
		}else{
			$("#sznlTag").text('');
			$("#csrqTag").text('');
		}
	}
	else if(r=='fbrq'){
		var rv = $("#fbrq").val();
		if(rv == null || rv == ''){
			$("#fbrqTag").text("发病日期不能为空！");
		}else{
			$("#fbrqTag").text('');
		}
	}
	else if(r=='zdrq'){
		var rv = $("#zdrq").val();
		if(rv == null || rv == ''){
			$("#zdrqTag").text("诊断日期不能为空！");
		}else{
			$("#zdrqTag").text('');
		}
	}else if(r=='bgys'){
		var rv = $("#bgys").val();
		if(rv == null || rv == ''){
			$("#bgysTag").text("报告医生不能为空！");
		}else{
			$("#bgysTag").text('');
		}
	}else if(r=='zdys'){
		var rv = $("#zdys").val();
		if(rv == null || rv == ''){
			$("#zdysTag").text("诊断医生不能为空！");
		}else{
			$("#zdysTag").text('');
		}
	}
	else if(r=='bgdw'){
		var rv = $("#bgdw").val();
		if(rv == null || rv == ''){
			$("#bgdwTag").text("报告单位不能为空！");
		}else{
			$("#bgdwTag").text('');
		}
	}
	else if(r=='tkrq'){
		var rv = $("#tkrq").val();
		if(rv == null || rv == ''){
			$("#tkrqTag").text("填卡日期不能为空！");
		}else{
			$("#tkrqTag").text('');
		}
	}
	else if(r=='bczzcxrq'){
		var rv = $("#dyzzcsrq").val();
		if(rv == null || rv == ''){
			$("#bczzcxrqTag").text("症状出现日期不能为空！");
		}else{
			$("#bczzcxrqTag").text('');
		}
	}
	else if(r=='bcszrq'){
		var rv = $("#bcszrq").val();
		if(rv == null || rv == ''){
			$("#bcszrqTag").text("本次首诊日期不能为空！");
		}else{
			$("#bcszrqTag").text('');
		}
	}
	else if(r=='bcqzrq'){
		var rv = $("#bcqzrq").val();
		if(rv == null || rv == ''){
			$("#bcqzrqTag").text("本次确诊日期不能为空！");
		}else{
			$("#bcqzrqTag").text('');
		}
	}
	else if(r=='djrq'){
		var rv = $("#djrq").val();
		if(rv == null || rv == ''){
			$("#djrqTag").text("登记日期不能为空！");
		}else{
			$("#djrqTag").text('');
		}
	}
	else if(r=='lrrq'){
		var rv = $("#lrrq").val();
		if(rv == null || rv == ''){
			$("#lrrqTag").text("录入日期不能为空！");
		}else{
			$("#lrrqTag").text('');
		}
	}
	else if(r=='lrdw'){
		var rv = $("#lrdw").val();
		if(rv == null || rv == ''){
			$("#lrdwTag").text("录入单位不能为空！");
		}else{
			$("#lrdwTag").text('');
		}
	}
	else if(r=='bgrxm'){
		var rv = $("#bgrxm").val();
		if(rv == null || rv == ''){
			$("#bgrxmTag").text("报告医生不能为空！");
		}else{
			$("#bgrxmTag").text('');
		}
	}
	
	
	
}


function changeBrgs(v){
	
	if(v == '1'){
		$("#jzdSheLabel").val('上海市');
		$("#jzdShe").val('310000');
		$("#jzdShiLabel").val('市辖区');
		$("#jzdShi").val('310100');
		$("#jzdXiaLabel").val('长宁区');
		$("#jzdXia").val('310105');
		$("#jzdz").val($("#jzdSheLabel").val()+$("#jzdShiLabel").val()+$("#jzdXiaLabel").val());
	}
	else if(v == '2'){
		$("#jzdSheLabel").val('上海市');
		$("#jzdShe").val('310000');
		$("#jzdShiLabel").val('市辖区');
		$("#jzdShi").val('310100');
		$("#jzdXiaLabel").val('请输入');
		$("#jzdXia").val('#');
		$("#jzdz").val($("#jzdSheLabel").val()+$("#jzdShiLabel").val());
	}
	else if(v == '3'){
		$("#jzdSheLabel").val('上海市');
		$("#jzdShe").val('310000');
		$("#jzdShiLabel").val('请输入');
		$("#jzdShi").val('#');
		$("#jzdXiaLabel").val('请输入');
		$("#jzdXia").val('#');
		$("#jzdz").val($("#jzdSheLabel").val());
	}else{
		$("#jzdSheLabel").val('请输入');
		$("#jzdShe").val('#');
		$("#jzdShiLabel").val('请输入');
		$("#jzdShi").val('#');
		$("#jzdXiaLabel").val('请输入');
		$("#jzdXia").val('#');
		$("#jzdz").val('');
	}
	
	
}

function changeSelect(lx,v){
	if(lx=='zzqk'){  //针对追踪情况的样式变化
		hiddenTag('blzz');   //先恢复所有标签不显示样式
		if(v == '1'){  
			$("#tdwrq").removeClass('displayHidden');
			$("#tdwfs").removeClass('displayHidden');
			$("#tzyrq").removeClass('displayHidden');
			$("#tcyrq").removeClass('displayHidden');
			$("#tpcrq").removeClass('displayHidden');
		}
		else if(v == '2'){
			$("#twdwyy").removeClass('displayHidden');
			$("#tzzfs").removeClass('displayHidden');
			$("#tzyrq").removeClass('displayHidden');
			$("#tcyrq").removeClass('displayHidden');
		}
		else if(v == '3'){
			$("#twzzyy").removeClass('displayHidden');
		}
		else if(v == '4'){
			$("#tzyrq").removeClass('displayHidden');
			$("#tcyrq").removeClass('displayHidden');
		}
		else if(v == '5'){
			$("#tzzrq").addClass('displayHidden');   //转诊日期标签只有在重卡时不显示，默认是显示的，所以在这里增加隐藏样式
			
		}
		
	}
	if(lx == 'dwfs'){
		
		if(v == '2'){  //只有追踪到位(2)时，显示追踪方式
			$("#tzzfs").removeClass('displayHidden');
		}
		else{
			$("#tzzfs").addClass('displayHidden');
			$("#zzfs").val("");   //重置下拉框
		}
	}
	
}

function hiddenTag(lx){  //根据页面编码隐藏标签
	if(lx == 'blzz'){
		$("#tdwrq").addClass('displayHidden');
		$("#tdwfs").addClass('displayHidden');
		$("#twdwyy").addClass('displayHidden');
		$("#tzzfs").addClass('displayHidden');
		$("#twzzyy").addClass('displayHidden');
		$("#tzzjg").addClass('displayHidden');
		$("#tzdjg").addClass('displayHidden');
		$("#tzyrq").addClass('displayHidden');
		$("#tcyrq").addClass('displayHidden');
		$("#tpcrq").addClass('displayHidden');
		$("#tzyrq").addClass('displayHidden');
		$("#tzzrq").removeClass('displayHidden');
		$("#dwfs").val("");  //下拉框重置
		$("#wdwyy").val("");
		$("#zzfs").val("");
		$("#wzzyy").val("");
	}
}


function hiddenShyy(){
	$("#shyy").addClass('displayHidden');
}

function showShyy(){
	$("#shyy").removeClass('displayHidden');
}








