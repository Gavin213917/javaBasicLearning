/**
 * 
 * @param p0隐藏保存最下面一级的地址
 * @param p1省
 * @param p2市
 * @param p3县
 * @param p4乡
 * @param p5村
 * @param p6门牌
 * @param p7地址树
 */

function hkdChange(p0,p1,p2,p3,p4,p5,p6,p7) {
		var setValue=function (pArray,pArrayCode){
			$("#"+p1).textbox('setValue',pArray[0]);
			$("#"+p0).val(pArrayCode[0]);
			if(pArray[1] != null){
				$("#"+p2).textbox('setValue',pArray[1]);
				$("#"+p0).val(pArrayCode[1]);
			}else{
				$("#"+p2).textbox('setValue','');
			}
			if(pArray[2] != null){
				$("#"+p3).textbox('setValue',pArray[2]);
				$("#"+p0).val(pArrayCode[2]);
			}else{
				$("#"+p3).textbox('setValue','');
			}
			if(pArray[3] != null){
				$("#"+p4).textbox('setValue',pArray[3]);
				$("#"+p0).val(pArrayCode[3]);
			}else{
				$("#"+p4).textbox('setValue','');
			}
			if(pArray[4] != null){
				$("#"+p5).textbox('setValue',pArray[4]);
				$("#"+p0).val(pArrayCode[4]);
			}else{
				$("#"+p5).textbox('setValue','');
			}
			  $("#"+p6).textbox('setValue',''); 
		}
		
		var node = $("#"+p7).combotree('tree').tree('getSelected');
		if(node) {
			var p = $("#"+p7).combotree('tree').tree('getParent',node.target);
			var pArray = new Array();
			var pArrayCode = new Array();
			pArray.unshift(node.text);
			pArrayCode.unshift(node.id);
			while(p != null){
				pArray.unshift(p.text);
				pArrayCode.unshift(p.id);
				p = $("#"+p7).combotree('tree').tree('getParent',p.target);
			}
			setValue(pArray,pArrayCode);
		}
	}