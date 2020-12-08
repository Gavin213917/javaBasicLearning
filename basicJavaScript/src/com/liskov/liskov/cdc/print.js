// JavaScript Document// strPrintName ��ӡ������
// printDatagrid Ҫ��ӡ��datagrid
/**打印iframeHtmml的方法
 * 页面上iframe的id名称为printThis
 * */
function pintIframeHtml(){
		    var pobj = $("WebBrowser");
		    if (pobj == null) {
		        document.body.insertAdjacentHTML("beforeBegin", '<OBJECT ID="WebBrowser" WIDTH="0" HEIGHT="0" CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>');
		        pobj = $("WebBrowser");
		        if(!pobj){
		            return false;
		        }
		    }
		    document.all.printThis.ExecWB(7,1);//7为打印预览
		   // document.all.printThis.ExecWB(6,1);打印
}
//数据
function CreateFormPage(bz,strPrintName, printDatagrid) {
	
	var tableString='<br><div align="center"><font size="4" >'+strPrintName+'</font></div>'
  tableString += '<br><table cellspacing="0" align="center" class="pb">';// �õ�frozenColumns����
    var frozenColumns = printDatagrid.datagrid("options").frozenColumns;  
    var columns = printDatagrid.datagrid("options").columns;    // �õ�columns����
    var nameList = '';

    // 列标题
    if (typeof columns != 'undefined' && columns != '') {
        $(columns).each(function (index) {
            tableString += '<tr>';
            if (typeof frozenColumns != 'undefined' && typeof frozenColumns[index] != 'undefined') {
                for (var i = 0; i < frozenColumns[index].length; i++) {
                    if (!frozenColumns[index][i].hidden) {
                        tableString += '<th width="' + frozenColumns[index][i].width + '"';
                        if (typeof frozenColumns[index][i].rowspan != 'undefined' && frozenColumns[index][i].rowspan > 1) {
                            tableString += ' rowspan="' + frozenColumns[index][i].rowspan + '"';
                        }
                        if (typeof frozenColumns[index][i].colspan != 'undefined' && frozenColumns[index][i].colspan > 1) {
                            tableString += ' colspan="' + frozenColumns[index][i].colspan + '"';
                        }
                        if (typeof frozenColumns[index][i].field != 'undefined' && frozenColumns[index][i].field != '') {
                            nameList += ',{"f":"' + frozenColumns[index][i].field + '", "a":"' + frozenColumns[index][i].align + '"}';
                        }
                        tableString += '>' + frozenColumns[0][i].title + '</th>';
                    }
                }
            }
            for (var i = 0; i < columns[index].length; i++) {
                if (!columns[index][i].hidden) {
                    tableString += '<th width="' + columns[index][i].width + '"';
                    if (typeof columns[index][i].rowspan != 'undefined' && columns[index][i].rowspan > 1) {
                        tableString += ' rowspan="' + columns[index][i].rowspan + '"';
                    }
                    if (typeof columns[index][i].colspan != 'undefined' && columns[index][i].colspan > 1) {
                        tableString += ' colspan="' + columns[index][i].colspan + '"';
                    }
                    if (typeof columns[index][i].field != 'undefined' && columns[index][i].field != '') {
                        nameList += ',{"f":"' + columns[index][i].field + '", "a":"' + columns[index][i].align + '"}';
                    }
                    tableString += '>' + columns[index][i].title + '</th>';
                }
            }
            tableString += '</tr>';
        });
    }
    
    // 数据
    var rows = printDatagrid.datagrid("getRows"); // ��δ����ǻ�ȡ��ǰҳ��������
  var nl = eval('([' + nameList.substring(1) + '])');
    
  if(bz==9){
    for (var i = 0; i < rows.length; i++) {
        tableString += '<tr>';
        $(nl).each(function (j) {
            tableString += '<td>';
          
            if(j==2||j==3){
            	tableString += rows[i][nl[j+4].f];
            }
            else if(j==4||j==5||j==6||j==7||j==8){
            	tableString += rows[i][nl[j+5].f];
            }
            else if(j==9){
            	tableString += rows[i][nl[j-1].f];
            }
            else if(j==10||j==11||j==12||j==13){
            	tableString += rows[i][nl[j-8].f];
            }
            else{
            tableString += rows[i][nl[j].f];
            
            }
            tableString += '</td>';
        });
        
        tableString += '</tr>'; 
       
    }
  }else{
	  for (var i = 0; i < rows.length; i++) {
	        tableString += '<tr>';
	        $(nl).each(function (j) {
	            tableString += '<td>';
	          
	        
	            tableString += rows[i][nl[j].f];
	            
	          
	            tableString += '</td>';
	        });
	        
	        tableString += '</tr>'; 
	       
	    }
	  
  }
    tableString += '</table>';
    document.getElementById('printThis').contentWindow.document.body.innerHTML=tableString;//赋值
    var s1=$(document.getElementById('printThis').contentWindow.document.body).html();//取值
    alert(s1);
    pintIframeHtml();
}