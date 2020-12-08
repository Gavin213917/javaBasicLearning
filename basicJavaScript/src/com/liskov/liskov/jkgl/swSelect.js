function folkselect(val){
if(val == null || val == ""){
	val = -1;
}
	var obj=document.getElementById("minzu");
	for(var i=0; i<obj.length; i++){
		if (obj.options[i].value == val ) {
			obj.options[i].selected = true;
			return;
		}
	}
	for(var i=0; i<obj.length; i++){
		if(obj.options[i].text.indexOf(val) > 0){
			obj.options[i].selected = true;
			return;
		}
	}
}
function zjlxselect(val){
if(val == null || val == ""){
	val = -1;
}
	var obj=document.getElementById("zjlx");
	for(var i=0; i<obj.length; i++){
		if (obj.options[i].value == val  ) {
			obj.options[i].selected = true;
				return;
		}
	}
	for(var i=0; i<obj.length; i++){
		if(obj.options[i].text.indexOf(val) > 0){
			obj.options[i].selected = true;
			return;
		}
	}
}
function hyzkselect(val){
if(val == null || val == ""){
	val = -1;
}
	var obj=document.getElementById("hyzk");
	for(var i=0; i<obj.length; i++){
		if (obj.options[i].value == val ) {
			obj.options[i].selected = true;
				return;
		}
	}
	for(var i=0; i<obj.length; i++){
		if(obj.options[i].text.indexOf(val) > 0){
			obj.options[i].selected = true;
			return;
		}
	}
}
function zyselect(val){
if(val == null || val == ""){
	val = -1;
}
	var obj=document.getElementById("zy");
	for(var i=0; i<obj.length; i++){
		if (obj.options[i].value == val ) {
			obj.options[i].selected = true;
				return;
		}
	}
	for(var i=0; i<obj.length; i++){
		if(obj.options[i].text.indexOf(val) > 0){
			obj.options[i].selected = true;
			return;
		}
	}
}
function whcdselect(val){
if(val == null || val == ""){
	val = -1;
}
	var obj=document.getElementById("whcd");
	for(var i=0; i<obj.length; i++){
		if (obj.options[i].value == val ) {
			obj.options[i].selected = true;
				return;
		}
	}
	for(var i=0; i<obj.length; i++){
		if(obj.options[i].text.indexOf(val) > 0){
			obj.options[i].selected = true;
			return;
		}
	}
}
function zgzdyjlbdmselect(val){
if(val == null || val == ""){
	val = -1;
}
	var obj=document.getElementById("zgzdyjlbdm");
	for(var i=0; i<obj.length; i++){
		if (obj.options[i].value == val ) {
			obj.options[i].selected = true;
				return;
		}
	}
	for(var i=0; i<obj.length; i++){
		if(obj.options[i].text.indexOf(val) > 0){
			obj.options[i].selected = true;
			return;
		}
	}
}
function zgjgjbdmselect(val){
if(val == null || val == ""){
	val = -1;
}
	var obj=document.getElementById("zgjgjbdm");
	for(var i=0; i<obj.length; i++){
		if (obj.options[i].value == val ) {
			obj.options[i].selected = true;
				return;
		}
	}
	for(var i=0; i<obj.length; i++){
		if(obj.options[i].text.indexOf(val) > 0){
			obj.options[i].selected = true;
			return;
		}
	}
}
function swddlbdmselect(val){
if(val == null || val == ""){
	val = -1;
}
	var obj=document.getElementById("swddlbdm");
	for(var i=0; i<obj.length; i++){
		if (obj.options[i].value == val ) {
			obj.options[i].selected = true;
				return;
		}
	}
	for(var i=0; i<obj.length; i++){
		if(obj.options[i].text.indexOf(val) > 0){
			obj.options[i].selected = true;
			return;
		}
	}
}