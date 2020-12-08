function setCurrPage(num){
	if(parseInt(num) == 1){
		document.all("pageSet.currPage").value = 1;		
	}else if(parseInt(num) == 2){
		if(parseInt(document.all("pageSet.currPage").value) == 1)
			document.all("pageSet.currPage").value = 1;
		else
			document.all("pageSet.currPage").value = parseInt(document.all("pageSet.currPage").value) - 1;
	}else if(parseInt(num) == 3){
		if((parseInt(document.all("pageSet.currPage").value) + 1) > document.all("pageSet.totalPage").value){
			document.all("pageSet.currPage").value = document.all("pageSet.totalPage").value;
		}
		else{
			document.all("pageSet.currPage").value = parseInt(document.all("pageSet.currPage").value) + 1;
		}
	}else if(parseInt(num) == 4){		
		document.all("pageSet.currPage").value = document.all("pageSet.totalPage").value;		
	}else if(parseInt(num) == 5){
		if(parseInt(document.all("pageSet.turnPage").value) > parseInt(document.all("pageSet.totalPage").value))
			document.all("pageSet.currPage").value = document.all("pageSet.totalPage").value;
		else if(parseInt(document.all("pageSet.turnPage").value) < 1){
			document.all("pageSet.currPage").value = 1;
		}else{
			document.all("pageSet.currPage").value = document.all("pageSet.turnPage").value;
		}
	}
	document.form1.submit();
}