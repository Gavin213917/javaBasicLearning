function timee()
{
	
	var nowTime = new Date();
	t = nowTime.getHours();
	t = parseInt(t);
	if(t>=6 && t<= 12)
	{
		document.write("上午：祝您上午工作愉快！");
	} 
	else if(t>=12 && t<= 13)
	{
		document.write("中午：人是铁饭是钢，午餐时间到啦！");
	}
	else if(t>=13 && t<= 19)
	{
		document.write("下午：办公室外透透气，精神好！");
	}
	else if(t>=20 && t<= 23)
	{
		document.write("晚上：结束了一天的疲惫，轻松一下！");
	}
	else if(t>=0 && t<= 5)
	{
		document.write("凌晨：现在夜已深了,您要注意休息！");
	}
}