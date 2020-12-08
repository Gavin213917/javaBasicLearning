
/*	
Ext.Ajax.request({
	url: '../pt/codeQuery.action',
	params:{key:'gb',code:'xb'},
	success: function(response, options) {
		var respText = Ext.util.JSON.decode(resp.responseText);  
		alert(respText);
	}
 });
$.post("../pt/codeQuery.action",{key:'gb',code:'xb'},function(result){
	alert('ss');
	alert(result);
});
*/   
    
	
function delete_line(){ 
	for(var i=currentStep;i<max_line_num;i++){
		if((i-0+1) <=max_line_num){
			//修改序号
			$('#line'+i+" td:eq(1)").html((i-0+1));
			$('#line'+(i-0+1)+" td:eq(1)").html(i);

			//取得两行的内容
			thisLine = $('#line'+i).html();
			tempLine = $('#line'+(i-0+1)).html();

			//交换当前行与上一行内容
			$('#line'+i).html(tempLine);
			$('#line'+(i-0+1)).html(thisLine);
		}
	}
	$('#line'+max_line_num).remove()
	max_line_num = max_line_num-1;
	currentStep = 0;
}

//置顶、置底、上移、下移、删除操作
function chanageLine(tag,obj){
	if(obj != null){
		$(obj).parent().parent().children("td:eq(0)").find("input").eq(0).attr("checked",true);
		currentStep=$(obj).parent().parent().children("td:eq(1)").html();
	}
	
	var thisLine='';
	var tempLine='';
	if(tag == 'top'){
		for(var i=currentStep;i>0;i--){
			if((i-1) >0){
				//修改序号
				$('#line'+i+" td:eq(1)").html((i-1));
				$('#line'+(i-1)+" td:eq(1)").html(i);

				//取得两行的内容
				thisLine = $('#line'+i).html();
				tempLine = $('#line'+(i-1)).html();

				//交换当前行与上一行内容
				$('#line'+i).html(tempLine);
				$('#line'+(i-1)).html(thisLine);
			}
		}
		currentStep = 1;
	}
	if(tag == 'bottom'){
		for(var i=currentStep;i<max_line_num;i++){
			if((i-0+1) <=max_line_num){
				//修改序号
				$('#line'+i+" td:eq(1)").html((i-0+1));
				$('#line'+(i-0+1)+" td:eq(1)").html(i);

				//取得两行的内容
				thisLine = $('#line'+i).html();
				tempLine = $('#line'+(i-0+1)).html();

				//交换当前行与上一行内容
				$('#line'+i).html(tempLine);
				$('#line'+(i-0+1)).html(thisLine);
			}
		}
		currentStep = max_line_num;
	}
	
	if(tag == 'top-move' && currentStep>1){
		//修改序号
		$('#line'+currentStep+" td:eq(1)").html((currentStep-1));
		$('#line'+(currentStep-1)+" td:eq(1)").html(currentStep);

		//取得两行的内容
		thisLine = $('#line'+currentStep).html();
		tempLine = $('#line'+(currentStep-1)).html();

		//交换当前行与上一行内容
		$('#line'+currentStep).html(tempLine);
		$('#line'+(currentStep-1)).html(thisLine);
		currentStep = currentStep-1;
	}
	if(tag == 'bottom-move' && currentStep<max_line_num){
		var last = parseInt(currentStep-0+1);
		//修改序号
		$('#line'+currentStep+" td:eq(1)").html(last);
		$('#line'+last+" td:eq(1)").html(currentStep);

		//取得两行的内容
		thisLine = $('#line'+currentStep).html();
		tempLine = $('#line'+last).html();

		//交换当前行与上一行内容
		$('#line'+currentStep).html(tempLine);
		$('#line'+last).html(thisLine);
		currentStep = last;
	}
	$('#content tr').each(function(){$(this).css("background-color","#ffffff");});
	$('#line'+currentStep).css("background-color","#ADADAD"); 
}  	
	
function isHas(bh){
	currentStep = 0;
	$("input[name^='bh']").each(function(i){
        if($(this).val() == bh){
        	currentStep = (i-0+1);
        	return false;
        }
	});
}





//自定义字典对象
function Dictionary(){
	this.data = new Array();
 
	this.put = function(key,value){
		this.data[key] = value;
	};
	this.get = function(key){
		return this.data[key];
	};
	this.remove = function(key){
		this.data[key] = null;
	};
	this.isEmpty = function(){
		return this.data.length == 0;
	};
	this.size = function(){
		return this.data.length;
	};
}

//自定义Map对象
function Map(){
	this.keys = new Array();
	this.data = new Array();
 
	this.put = function(key,value){
		if(this.data[key] == null){
			this.keys.push(value);
		}
		this.data[key] = value;
	};
 
	this.get = function(key){
		return this.data[key];
	};
 
	this.remove = function(key){
		this.keys.remove(key);
		this.data[key] = null;
	};
 
	this.isEmpty = function(){
		return this.keys.length == 0;
	};
 
	this.size = function(){
		return this.keys.length;
	};
}