var MSG_C001 = "必须项目未输入，请输入@1！";
var MSG_C002 = "本次操作已成功！";
var MSG_C003 = "是否确认进行本次保存操作？";
var MSG_C004 = "是否确认进行本次删除操作？";
var MSG_C005 = "是否确认@1选择的对象？";
var MSG_C006 = "请选择一条数据!";
var MSG_C007 = "@1必须大于等于@2，请重新输入！";
var MSG_C008 = "录入条数不能超过@1条!";
var MSG_C009 = "本次操作失败【@1】！";
var MSG_C010 = "导出对象数据过大（多余10000条），请重新输入检索条件查询后重新导出！";
var MSG_C011 = "没有可以导出的数据，请确认！";
var MSG_C012 = "请选择需要打印的数据！";
var MSG_C013 = "没有可以打印的数据，请确认！";
var MSG_C014 = "没有可以保存的数据，请确认！";
var MSG_C015 = "是否确认进行本次打印操作？";
var MSG_C016 = "未保存数据，是否关闭窗口？";
var MSG_C017 = "是否关闭窗口？";
var MSG_C018 = "没有符合要求的数据，请确认？";
var MSG_C019 = "本次录入无需采样！";
var MSG_C020 = "请输入正确的数据！";
var MSG_C021 = "超出应采样本！";
var MSG_C022 = "请填写正确的身份证号！";
var MSG_C023 = "您输入的@1超过了一般正常范围(@2)请确认!";
var MSG_C024 = "请输入证件类型！";
var MSG_C025 = "不能录入，此病例无该菌种阳性记录";
var MSG_C026 = "您输入的证件类型、证件号码的相关基本信息不存在！";
var MSG_C027 = "信息获取处理成功时，会将证件类型、证件号码以外的基本信息重置。\r\n请确认是否继续？";
var MSG_C028 = "是否确认进行本次批量审核操作？";
var MSG_C029 = "没有可以批量审核的数据，请确认！";
var MSG_C030 = "匹配到身份证：身份证、伤害发生日期必填！";
var MSG_C031 = "未匹配到身份证：姓名、性别、出生日期、伤害发生日期必填！";
var MSG_C032 = "是否确定设定该病例信息为重复卡？";
var MSG_C033 = "是否确定取消该病例信息的重复卡设定？";
var MSG_C034 = "报告开始月份和报告结束月份之差不能超过12个月！";
var MSG_C035 = "没有查询到符合条件的数据！";
var MSG_C036 = "@1录入数据不合格，请重新输入数据";
var MSG_C037 = "信息获取成功！";
var MSG_C038="是否确定保存该交换结果？";
var MSG_C039="是否确认进行本次审核操作？";
var MSG_C040 = "导出对象数据过大（多余100000条），请重新输入检索条件查询后重新导出！";
var MSG_ES001="选择多种性质必须选择2个或以上的其余的选项";
var MSG_ES002="选择多部位必须选择2个或以上的其余的选项";
var MSG_ES003='该学生已有同一个伤害发生时间的伤害个案，请重新录入';
var MSG_ES004='本次操作已成功！</br>该伤害个案来源于因病缺课缺课个案，请一并修改!';
var MSG_C040 = "该报卡不存在！";
var MSG_ES005 = "本次操作已取消！";
var MSG_ES006 = "该@1在当前报告日期已经存在一条缺课个案信息，不能重复填报！";
var MSG_ES007 = "学校保健老师：你今天报告的因病缺课个案中，系统发现该人员有疑似传染病相关症状，<br/>请进一步关注是否还有其他的症状。如发现问题，请及时与社区卫生服务中心联系。";
var MSG_ES008 = "该@1连续3天缺课，是否需要修改缺课原因？";
var MSG_ES010 = "该部门信息已存在，请确认！";
var MSG_ES009 = "该填报日期为停课日，请重新确认后再填报！";
var MSG_ES014 = "@1请输入英文或数字！";
var MSG_ES015 = "@1录入数据超出长度，请重新输入数据";
var MSG_MG001 = "已维护信息化设备档案";
var MSG_MG002 = "已维护专业人员档案";
var MSG_MG003 = "该专业人员档案已经存在";
var MSG_MG004 = "采购年份不能大于当前年份，请重新输入";
var MSG_MG005 = "本单位已存在当前设备编码，请重新输入";
var MSG_MG006 = "请先盘点库存！";
var MSG_MG007="实际库存值域有误，请输入整数!";
var MSG_MG008="已经存在相同疫苗编码和批号的数据,请重新修改!";
var MSG_CS001 = "该接产单位在当前报告年月已经存在一条记录交接单记录，不能重复录入！";
var MSG_CS002 = "表单类型是必填项！";
var MSG_C041 = "@1必须小于等于@2，请重新输入！";
var MSG_CS999 = "导出的数据超过2000条！";
var MSG_CS998 = "授权成功！可进行数据下载！";
var MSG_CS997 = "授权失败！该账号无授权权限，请确认！";
var MSG_CS1000 = "用户名或者密码错误，请确认！";
var EXPORTCOUNTS = "2000";
function getMessage(msg) {
	getMessage(msg, '');
}

function getMessage(msg, param1) {
	getMessage(msg, param1, '');
}

function getMessage(msg, param1, param2) {
	getMessage(msg, param1, param2, '');
}

function getMessage(msg, param1, param2, param3) {
	var returnMsg = msg;
	if (msg == null || msg == '') {return;}
	if (param1 != null && param1 != '') {
		returnMsg = returnMsg.replace('@1', param1);
	}
	if (param2 != null && param2 != '') {
		returnMsg = returnMsg.replace('@2', param2);
	}
	if (param3 != null && param3 != '') {
		returnMsg = returnMsg.replace('@3', param3);
	}
	return returnMsg;
}