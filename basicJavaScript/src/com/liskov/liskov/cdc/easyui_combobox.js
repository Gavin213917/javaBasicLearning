//重写easyui-combobox的filter方法
	$.fn.combobox.defaults.filter = function(q,row){ 
		var opts=$(this).combobox("options");
		//return row[opts.textField].indexOf(q)==0; 
		return row[opts.textField].indexOf(q)>-1;//将从头位置匹配改为任意匹配 
	}