function defaultHaveScrollForDatagrid(gridid) {
	var opts = $('#' + gridid).datagrid('options');
	var text = '{';
	for ( var i = 0; i < opts.columns.length; i++) {
		var inner_len = opts.columns[i].length;
		for ( var j = 0; j < inner_len; j++) {
			if ((typeof opts.columns[i][j].field) == 'undefined')
				break;
			text += "'" + opts.columns[i][j].field + "':''";
			text += ",";
		}
	}
	text += "isScrollbarData:true}";
	text = eval("(" + text + ")");
	var data = {
		"total" : 1,
		"rows" : [ text ]
	};
	$('#' + gridid).datagrid('loadData', data);
	$('#'+gridid).parent().find("tr[class=datagrid-row]").css( {
		"visibility" : "hidden"
	});
}

function defaultHaveScrollForTreegrid(gridid) {
	var opts = $('#' + gridid).datagrid('options');
	var text = '{';
	for ( var i = 0; i < opts.columns.length; i++) {
		var inner_len = opts.columns[i].length;
		for ( var j = 0; j < inner_len; j++) {
			if ((typeof opts.columns[i][j].field) == 'undefined')
				break;
			text += "'" + opts.columns[i][j].field + "':''";
			text += ",";
		}
	}
	text += "isScrollbarData:true}";
	text = eval("(" + text + ")");
	var data = {
		"total" : 1,
		"rows" : [ text ]
	};
	$('#' + gridid).treegrid('loadData', data);
	$('#'+gridid).parent().find("tr[class=datagrid-row]").css( {
		"visibility" : "hidden"
	});
}