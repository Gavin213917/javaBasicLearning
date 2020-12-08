/**
 * 此js必须和jquery.form.js共同存在
 * <img src='resource/images/loading.gif' />
 *
 **/

/*等待div*/
var elementDiv = "<div id='waitMsg' style='position: absolute;left: 20%;top:20%;display: none;'>" + 
				 "	<table width='70%'>" +
				 "		<tr>" +
				 "			<td width='100%' align='center'>" +
				 "				<img src='resource/images/loading.gif' />" +
				 "			</td>" +
				 "		</tr>" +
				 "		<tr>" +
				 "			<td align='center'>" +
				 "				<b style=\"font-size: 30px;font-family: '微软雅黑'\">数据导出中……请稍候……</b>" +
				 "			</td>" +
				 "		</tr>" +
				 "	</table>" +
				 "</div>";
/*下载确认div*/
var downloadFileDiv = 
				 "<div id='downloadDiv' style='position: absolute;left: 30%;top:30%;display: none;border:1px solid black;background-color: #EAF1F9;padding:6px;'>" + 
				 "	<table width='50%'>" +
				 "		<tr>" +
				 "			<td width='100%' align='center'>" +
				 "				导出的文件生成完毕，是否下载此导出文件？<br><hr>" +
				 "			</td>" +
				 "		</tr>" +
				 "		<tr>" +
				 "			<td align='center'>" +
				 "				<input class='submit_02' type='button' value='下 载' onclick='downloadFile();'/>&nbsp;&nbsp;" +
				 "				<input class='submit_02' type='button' value='取 消' onclick='canceldownFile();'/>" +
				 "			</td>" +
				 "		</tr>" +
				 "	</table>" +
				 "</div>";
document.write(elementDiv);
document.write(downloadFileDiv);
	
/*提交表单选项*/
$(document).ready(function() {
    var options = { 
       // target:        '#output2',   // target element(s) to be updated with server response 
        beforeSubmit:  showRequest,  // pre-submit callback 
        success:       showResponse,  // post-submit callback 
        type : 'post'
        // other available options: 
        //url:       url         // override for form's 'action' attribute 
        //type:      type        // 'get' or 'post', override for form's 'method' attribute 
        //dataType:  null        // 'xml', 'script', or 'json' (expected server response type) 
        //clearForm: true        // clear all form fields after successful submit 
        //resetForm: true        // reset the form after successful submit 
 
        // $.ajax options can be used here too, for example: 
        //timeout:   3000 
    }; 
    
    $("form[id='form1']").submit(function() { 
        // inside event callbacks 'this' is the DOM element so we first 
        // wrap it in a jQuery object and then invoke ajaxSubmit
        if($("#temp").val()=='1'){
        	$(this).ajaxSubmit(options); 
        	return false; 
        }
        // !!! Important !!! 
        // always return false to prevent standard browser submit and page navigation 
    });
    
 
}); 		
     
/*导出前的准备*/
function showRequest(){
	var waitDiv = $('#waitMsg');
	waitDiv.show();
	window.location.href="#waitMsg";
}

var filePath;
/*下载文件生成完毕*/
function showResponse(responseText, statusText, xhr, $form)  {
	var dataObj = eval("(" + responseText + ")");
	filePath = dataObj.filePath;
	$('#waitMsg').hide();
	$('#downloadDiv').show();
//	if(window.confirm("导出的文件生成完毕，是否下载此导出文件？")){
//		window.location.href='downLoadFile.action?filePath=' +  dataObj.filePath + '&downLoad=1';
//	}else{
//		$.ajax({
//			type : "POST",
//			url : 'downLoadFile.action?filePath=' + dataObj.filePath + '&downLoad=2'
//		});
//	}
}

//选择下载
function downloadFile(){
	window.location.href='downLoadFile.action?filePath=' +  filePath + '&downLoad=1';
	$('#downloadDiv').hide();
}

//取消下载
function canceldownFile(){
	$.ajax({
			type : "POST",
			url : 'downLoadFile.action?filePath=' + filePath + '&downLoad=2'
		});
	$('#downloadDiv').hide();	
}

//导出excel
function exportExcel(urlForExport,urlForQuery){
	//"exportComplexQueryExcel.action"
	$("form[id='form1']").attr("action",urlForExport);
    $("form[id='form1']").submit();
    // "complexConditionQuery.action"
    $("form[id='form1']").attr("action",urlForQuery);
}	
