var TableOperation = {
	addByCursor:function(tabID){		
		var trobj,tdobj,rowIndex,idNo,id;
		var tableObj=document.getElementById(tabID);
//		rowIndex = tableObj.rows.length;
		rowIndex = event.srcElement.parentNode.parentNode.rowIndex;
		trobj=tableObj.insertRow(rowIndex);
		idNo = rowIndex + 1;
		id = "r"+(idNo++);		
		trobj.id=id;
		trobj.style.cursor = "hand";
		for(var i=0;i<TableArrayRows.length;i++){
			if(TableArrayRows[i] == 'index'){//表示填入索引
				tdobj=trobj.insertCell(-1);
		    	tdobj.innerHTML = rowIndex;
			}else{
				tdobj=trobj.insertCell(-1);
		    	tdobj.innerHTML=TableArrayRows[i];
			}
		}
		return tableObj;
	},
	
	delByCursor:function(tabID){
		var currRowIndex=event.srcElement.parentNode.parentNode.rowIndex;
		var tableObj=document.getElementById(tabID);
  		tableObj.deleteRow(currRowIndex);//table10--表格id
	},
	
	addRowByOrder : function(){
		var tableObj,trobj,tdobj,rowIndex;
		tableObj = document.getElementById(arguments[0]);
		rowIndex = tableObj.rows.length
		trobj = tableObj.insertRow(rowIndex);
		if(arguments[1] == 'undefined'){
			trobj.id = "r"+(tableObj.rows.length);
		}else{
			trobj.id = arguments[1];
		}
		trobj.style.cursor = "hand";
		for(var i=0;i<TableArrayRows.length;i++){
			if(TableArrayRows[i] == 'index'){//表示填入索引
				tdobj = trobj.insertCell(-1);
		    	tdobj.innerHTML = rowIndex;
			}else{
				tdobj = trobj.insertCell(-1);
		    	tdobj.innerHTML = TableArrayRows[i];
			}
		}
		return tableObj;
	},
	
	deleteByRowId : function(tabID,rowID){
		var tableObj,trobj,tdobj;
		tableObj = document.getElementById(arguments[0]);
		for(var i = 1 ; i < tableObj.rows.length ; i++){
			trobj = tableObj.rows[i];
			if(trobj.id == rowID){
				tableObj.deleteRow(i);
			}
		}
		for(var i = 1 ; i < tableObj.rows.length ; i++){
			tableObj.rows[i].cells(0).innerText = i;
		}
	},
	
	addByCopyRow : function(tabID){
		var tableObj,trobj;
		tableObj = document.getElementById(tabID);
		var rowHtml = tableObj.rows[1].cloneNode(true);//复制一行
		trobj = tableObj.rows[1];
		trobj.parentNode.insertBefore(rowHtml); //curRow(行)
	}
	
}