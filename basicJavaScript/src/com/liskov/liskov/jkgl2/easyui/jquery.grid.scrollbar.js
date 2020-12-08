function defaultHaveScrollForDatagrid(gridid) {
	var opts = $('#' + gridid).datagrid('options');
	var text = '{';
	for ( var i = 0; i < opts.columns.length; i++) {
		var inner_len = opts.columns[i].length;
		for ( var j = 0; j < inner_len; j++) {
			if ((typeof opts.columns[i][j].field) == 'undefined')
				break;
			text += "'" + opts.columns[i][j].field + "':''";
			if (j != inner_len - 1) {
				text += ",";
			}
		}
	}
	text += "}";
	text = eval("(" + text + ")");
	var data = {
		"total" : 1,
		"rows" : [ text ]
	};
	$('#' + gridid).datagrid('loadData', data);
	$("tr[class=datagrid-row]").css( {
		"visibility" : "hidden"
	});
	var thepager = $('#' + gridid).datagrid('getPager');       
	var rpmsg = thepager.find('.pagination-info')[0].innerText;
	rpmsg=rpmsg.replace(/1/g,'0');
	thepager.find('.pagination-info').html(rpmsg);
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
			if (j != inner_len - 1) {
				text += ",";
			}
		}
	}
	text += "}";
	text = eval("(" + text + ")");
	var data = {
		"total" : 1,
		"rows" : [ text ]
	};
	$('#' + gridid).treegrid('loadData', data);
	$("tr[class=datagrid-row]").css( {
		"visibility" : "hidden"
	});
	var thepager = $('#' + gridid).datagrid('getPager');       
	var rpmsg = thepager.find('.pagination-info')[0].innerText;
	rpmsg=rpmsg.replace(/1/g,'0');
	thepager.find('.pagination-info').html(rpmsg);
	
}