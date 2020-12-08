 function cc(num){
    for(var id = 0;id<=8;id++)
    {
	    var mainlay="lay"+id;
		var maintt="tt"+id;
		
		var divlay = document.getElementById(mainlay);
		var divtt = document.getElementById(maintt);
	    if(parseInt(id)==parseInt(num)){
	    	divtt.className="bg2";
	    	if(divlay!=null)
	    		divlay.style.display="block";
		    	
		}else{
			if(document.getElementById(maintt)==null) break;
			document.getElementById(maintt).className="bg1";
			
			if(divlay!=null)
	    		divlay.style.display="none";
		}
  }
}

 function zz(num){
    for(var id = 1;id<=8;id++)
    {
    var mainlay="lay"+id;
	var maintt="tt"+id;
	
	var divlay = document.getElementById(mainlay);
	var divtt = document.getElementById(maintt);
    if(id==num){
    	if(divlay!=null)
    		divlay.style.display="block";
    		//document.getElementById(mainlay).style.display="block";
    	
	       divtt.className="bg3";
	}
    else{
	document.getElementById(maintt).className="bg1";
	if(divlay!=null)
    		divlay.style.display="none";
	//document.getElementById(mainlay).style.display="none";
	}
  }
}

function onSelectCurrMenu(obj,str){
	var f = parent.mainFrame.ba.cols;
	if(str==1){
		obj.className="bmenu1";
		for(var i=0;i<10;i++){
			if(document.getElementById("li_topmenu"+i)==null) break;
			document.getElementById("li_topmenu"+i).className="";
		}
		
		parent.mainFrame.ba.cols = "0,10,*";
		parent.mainFrame.bar.di.innerHTML="<div class='barr'>"
	}else if(str==2){
		document.getElementById("li_topmenu_1").className="bmenu3";
		for(var i=0;i<10;i++){
			if(document.getElementById("li_topmenu"+i)==null) break;
			document.getElementById("li_topmenu"+i).className="";
		}
		obj.className="bmenu2";
		
		parent.mainFrame.ba.cols = "199,10,*";
		parent.mainFrame.bar.di.innerHTML="<div class='barl'>"
	}
}
/*分页操作*/
function setCurrPage(num){
	if(parseInt(num) == 1){
		document.getElementById("currPage").value = 1;
	}else if(parseInt(num) == 2){
		if(parseInt(document.getElementById("currPage").value) == 1)
			document.getElementById("currPage").value = 1;
		else
			document.getElementById("currPage").value = parseInt(document.getElementById("currPage").value) - 1;
	}else if(parseInt(num) == 3){
		if((parseInt(document.getElementById("currPage").value) + 1) > document.getElementById("totalPage").value)
			document.getElementById("currPage").value = document.getElementById("totalPage").value;
		else
			document.getElementById("currPage").value = parseInt(document.getElementById("currPage").value) + 1;
	}else if(parseInt(num) == 4){
		document.getElementById("currPage").value = document.getElementById("totalPage").value;
	}else if(parseInt(num) == 5){
		if(parseInt(document.getElementById("turnPage").value) > parseInt(document.getElementById("totalPage").value))
			document.getElementById("currPage").value = document.getElementById("totalPage").value;
		else if(parseInt(document.getElementById("turnPage").value) < 1){
			document.getElementById("currPage").value = 1;
		}else{
			document.getElementById("currPage").value = document.getElementById("turnPage").value;
		}
	}
	document.form1.submit();
}


/*分页操作--只能输入正整数*/
function checkNum(e){
	if(e.value=="") return;
	/^([0-9]*)/.exec(e.value);
	if(e.value!=RegExp.$1) e.value=RegExp.$1;
}
/*设置为全部disabled*/
function allDisabled(){
	var formsObj=document.forms;
	for(var i=0;i<formsObj.length;i++){
  		var  formObj=formsObj[i];
  		for(var j=0;j<formObj.elements.length;j++){
  			var e=formObj.elements[j];
			if(e.type=="text"||e.type=="textarea")
	    		e.disabled=true;
	 		if(e.type=="checkbox"||e.type=="radio")
	  			e.disabled=true;
		  	if(e.type=="select-one")
		  		e.disabled=true;
  		}
	}
}
/*文本框字数限制*/
function textCounter(field,maxlimit){
  if(field.value.length > maxlimit)
  	field.value = field.value.substring(0,maxlimit);
}
