function autoheight(){
	var bodyheight=document.body.clientHeight;
	var middleheight=eval(document.body.clientHeight-70);
	if(middleheight<0) middleheight=0;
	document.getElementById("left_middle").style.height=middleheight+"px";
	}
function aa(){
	var bodyheight=document.body.clientHeight;
	document.getElementById("welcome").style.height=eval(bodyheight-14)+"px";
	}
	
function bb(){
	var bodyheight=document.body.clientHeight;
	if(document.getElementById("nr_box")!=null)
		document.getElementById("nr_box").style.height=eval(bodyheight-34)+"px";
	}
	