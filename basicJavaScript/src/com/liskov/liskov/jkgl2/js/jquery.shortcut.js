(function($) {
	//形成快捷方式菜单的方法
	function shortCutForm(el,params){
		//拼接三个快捷方式控件语句的变量
		var content = '';
		if(params != undefined)
		{
			content += ('<ul class="other-link-list">');
			content += ('<li class="list one">');
			if(params.scarr[0] == undefined)
			{
				content += ('<div><i class="icon-no"></i>未添加</div>');
			}
			else
			{
				content += ('<a href="'+params.scarr[0].url+'"><i class="icon-doctor"></i>'+params.scarr[0].text+'<span></span></a>');
			}
			content += ('</li>');
			content += ('<li class="list two">');
			if(params.scarr[1] == undefined)
			{
				content += ('<div><i class="icon-no"></i>未添加</div>');
			}
			else
			{
				content += ('<a href="'+params.scarr[1].url+'"><i class="icon-doctor"></i>'+params.scarr[1].text+'<span></span></a>');
			}
			content += ('</li>');
			content += ('<li class="list three">');
			if(params.scarr[2] == undefined)
			{
				content += ('<div><i class="icon-no"></i>未添加</div>');
			}
			else
			{
				content += ('<a href="'+params.scarr[2].url+'"><i class="icon-doctor"></i>'+params.scarr[2].text+'<span></span></a>');
			}
			content += ('</li>');
			content += ('</ul>');
		}
		else
		{
			content += ('<ul class="other-link-list">');
			content += ('<li class="list one">');
			content += ('<div><i class="icon-no"></i>未添加</div>');
			content += ('</li>');
			content += ('<li class="list two">');
			content += ('<div><i class="icon-no"></i>未添加</div>');
			content += ('</li>');
			content += ('<li class="list three">');
			content += ('<div><i class="icon-no"></i>未添加</div>');
			content += ('</li>');
			content += ('</ul>');
		}
		el.html(content);
	}
	
	//快捷方式方法入口
	$.fn.shortcut = function(params){
		//this 指的是当前要绑定的控件
		var that=this;
		shortCutForm(that,params);
	}
})(jQuery);