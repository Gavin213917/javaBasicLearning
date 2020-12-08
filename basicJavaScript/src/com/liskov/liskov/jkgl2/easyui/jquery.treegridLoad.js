function treegridLoad(treegrid) {  
	var event = $.Event("keydown");//模拟一个键盘事件          
	event.keyCode = 13;//keyCode=13是回车  
	pager = treegrid.datagrid('getPager');       
	pager.find('input.pagination-num').val(1); //设置跳转页为当前指定页面         
	pager.find('input.pagination-num').trigger(event);  
} 