// JavaScript Document
$(function() { 
	$(".ksa").click(function() {
		if ( $(this).hasClass("cur") ) {
			//alert("a")
		} else {
			$("#snav").find(".cur").removeClass("cur");
			$(this).addClass("cur");
		}
	})
//bigjsend	

 /*--表格全选单选特效--*/   
 $dou = $("input[name='checkall']");
 $sin = $("input[name='check']");
 //checkbox全选控制
 $dou.click(function(){       
    if(this.checked){     
        $sin.attr("checked", true); 
		$sin.parent().parent().find("td").css({"background":"#fde2c9"});    
    }else{           
        $sin.attr("checked", false); 
		$sin.parent().parent().find("td.even").css({"background":"#fff"});
		$sin.parent().parent().find("td.odd").css({"background":"#f1f1f1"});      
    }       
  });	
 //checkbox单击选中 			   
  $sin.click(function(){
     $dou.attr('checked',$sin.length==$sin.filter(':checked').length); //用filter方法筛选出选中的复选框 判断是否全选
     if(this.checked==true){    
	      $(this).parent().parent().find("td").css({"background":"#fde2c9"}); //单击选中一行改变背景颜色
	   } 
	 if(this.checked==false){
          $sin.parent().parent().find("td.even").css({"background":"#fff"});
		  $sin.parent().parent().find("td.odd").css({"background":"#f1f1f1"});
	   } 
  });
 
  /****遮罩层****/
	$("#add_m1").click(function(){
		 $('#dialog-box', top.document).show();
		 $("select[name='doct_sel']").hide();
	});
	$("#btn_qd").click(function(){
		 $('#dialog-box2', top.document).show();
	});
	$("#btn_keep").click(function(){
		 $('#dialog-box3', top.document).show();
	});
	$("#btn_open4").click(function(){
		 $('#dialog-box4', top.document).show();
	});
  	$("#btn_open5").focus(function(){
		 $('#dialog-box5', top.document).show();
	});
					   
  //关闭遮罩层
    $("#btn_off", top.document).click(function () {		
	    $('#dialog-box', top.document).hide();
		$("select[name='doct_sel']").show();
		return false;
	});
	$("#btn_off2", top.document).click(function () {		
	    $('#dialog-box2', top.document).hide();	
		return false;
	});
	$("#btn_off3", top.document).click(function () {		
	    $('#dialog-box3', top.document).hide();	
		return false;
	});
	$("#btn_off4", top.document).click(function () {		
	    $('#dialog-box4', top.document).hide();	
		return false;
	});
	$("#btn_off5", top.document).click(function () {		
	    $('#dialog-box5', top.document).hide();	
		return false;
	});
	
//标签选项切换
  $(".switch_tit span").click(function(){
	          $(this).parent().parent().parent().parent().parent().find(".layer").removeClass("default"); 
	          $(this).addClass("default").siblings().removeClass(); 						  
	            var yy = $(this).attr("rel");
	          $(this).parent().parent().parent().parent().parent().find(".layer."+ yy).addClass("default"); 
	});	

	
 })
