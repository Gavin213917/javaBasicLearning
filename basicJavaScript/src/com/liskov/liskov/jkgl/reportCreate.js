/**
 * 此js必须和jquery.form.js共同存在
 * <img src='resource/images/loading.gif' />
 **/
/*等待div*/
var elementDiv = "<div class='content-pages-wrap' id='waitMsg' style='position: absolute;left: 20%; height:210px;" +
		         "top:20%;display: none;border: 1px solid black; background: #ECECFF; margin: 0px;'>" + 
				 "	<table width='70%' height='100%'>" +
				 "		<tr>" +
				 "			<td width='100%' align='center'>" +
				 "				<img src='resource/images/loading.gif' />" +
				 "			</td>" +
				 "		</tr>" +
				 "		<tr>" +
				 "			<td align='center' valign='top'> " +
				 "				<b style=\"font-size: 30px;font-family: '微软雅黑'\">报表作成中……请稍候……</b>" +
				 "			</td>" +
				 "		</tr>" +
				 "	</table>" +
				 "</div>";

document.write(elementDiv);
     
/*导出前的准备*/
function showRequest(){
	var waitDiv = $('#waitMsg');
	waitDiv.show();
}