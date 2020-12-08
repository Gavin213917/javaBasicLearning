$(document).ready( function (){
    //一级导航菜单切换
  $(".left_box .sub_tit div").click(function(){
		  $(this).parent().parent().parent().find(".tab").removeClass("default"); 
		  $(this).addClass("current").siblings().removeClass(); 						  
		  var ss = $(this).attr("rel");
		  $(this).parent().parent().parent().find(".tab."+ ss).addClass("default"); 
	});
   
var k=$(window).height();// 浏览器当前窗口可视区域高度
$("#left, .win_height").css({"height":k}); 
 //alert(k);


 $('.left_list li').click(function(){
		$(this).children('div').slideDown().end().siblings().children('div').slideUp();
		$(this).addClass('current').siblings().removeClass('current');
		
		if($(this).children('div').is(':visible')){
			$(this).addClass('current').siblings().removeClass('current');
			}
	});

});
function barzd(){
	var f = parent.document.getElementById("ba").cols;
	if(f=="203,12,*"){
		parent.document.getElementById("ba").cols = "0,12,*";
		document.getElementById("di").innerHTML="<div class='barr' title='展开'>";
	}else{
		parent.document.getElementById("ba").cols = "203,12,*";
		document.getElementById("di").innerHTML="<div class='barl' title='收缩'>";
	}
	var main=window.parent.frames["main"];
	var w=main.document.body.clientWidth;
	if(main.resize){
		main.resize(w);
	}
}