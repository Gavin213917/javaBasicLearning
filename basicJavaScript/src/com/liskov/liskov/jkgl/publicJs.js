/**
 * 检查输入框字符
 */
function checkInpub(text) {
	var errMess = "";
	var role = /[\u4e00-\u9fa5]|[\d]|[\w]|[_]|[\s]/;
	if (text != "") {
		for (var i = 0; i < text.length; i++) {
			if (!role.test(text.charAt(i))) {
				errMess = "只能输入汉字、字母、数字及下划线“_”！\n";
			}
		}
	}
	return errMess;
}
function checkInputWithoutCharacter(text) {
	var errMess = "";
	var role = /[\d]|[\w]|[_]|[\s]/;
	if(text!="") {
		for (var i = 0; i < text.length; i++) {
			if (!role.test(text.charAt(i))) {
				errMess = "只能输入字母、数字及下划线“_”！\n";
			}
		}
	}
	return errMess;
}
/**
 * 检查电话格式
 */
function checkPhone(text) {
	var errMess = "";
	var role = /^[1-9]d*$|[-]/;
	if(text != "") {
		for (var i= 0; i < text.length; i++) {
			if (!role.test(text.charAt(i))) {
				errMess = "号码只能输入数字及符号“-”！\n";
			}
		}
	}
	return errMess;
}
/**
 * 检查Email格式
 */
function checkEmailConst(emailText) {
	var reEmail = /^(?:\w+\.?)*\w+@(?:\w+\.?)*\w+$/;
	return reEmail.test(emailText)
}
/**
 * 禁用backspace键的后退功能，但是可以删除文本内容
 */
document.onkeydown = check;
function check(e) {
    var code;
    if (!e) var e = window.event;
    if (e.keyCode) code = e.keyCode;
    else if (e.which) code = e.which;
    if (((event.keyCode == 8) && ((event.srcElement.type != "text" && event.srcElement.type != "textarea" && event.srcElement.type != "password") || event.srcElement.readOnly == true)) || ((event.ctrlKey) && ((event.keyCode == 78) || (event.keyCode == 82))) || (event.keyCode == 116)) {
        event.keyCode = 0;
        event.returnValue = false;
    }
    return true;
}  
