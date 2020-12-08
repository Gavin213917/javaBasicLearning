	/**
	 * 将form表单内的元素序列化为对象
	 * 用法：$.fn.serializeObject($("#formId"))
	 * 用例：var param = new Object();
	 * 	   param = $.fn.serializeObject($("#queryForm"));
	 * 	   grid.load(param);
	 */
	jQuery.fn.serializeObject = function (form) { 
		var o = {};
		$.each(form.serializeArray(), function (index) {
			if (o[this['name']]) {
				o[this['name']] = o[this['name']] + "," + this['value'];
			} else {
				o[this['name']] = this['value'];
			}
		});
		return o;
	};

	/**
	 * 去左空格
	 */
	function ltrim(s) {
	    return s.replace(/^\s*/, "");
	}
	
	/**
	 * 去右空格
	 */
	function rtrim(s) {
	    return s.replace(/\s*$/, "");
	}
	
	/**
	 * 去右空格
	 */
	function trim(s) {
	    return rtrim(ltrim(s));
	}
	
	/**
	 * 对象属性值前后空格处理（录入界面提交时常用）
	 * @param obj
	 * @returns
	 */
	function trimObject(obj){
		if(obj !=null){
			for(var i in obj){  
			    if("string"==(typeof obj[i])){
			    	obj[i]=trim(obj[i]);
			    }
				 
			} 
		}
		
		return obj;
	} 
	
	
	/**
	 * grid合并单元格
	 */
	function onLoadSuccess(typelx,gridid){
		var gridName =mini.get(gridid).getData();
		var jcjz ="";
		var xh ="";
		var num=1;
		var qsw =0;
		var jsw =0;
		var sz={};
		//通过循环判断有几组数据，每组数据中有多少行然后通过拼接的方法写
		for(var j =0; j < gridName.length ; j++){
			if(j==0){
				jcjz =gridName[j].jcjz;
				xh = gridName[j].xh; 
			}
			if(!(gridName[j].jcjz== jcjz && gridName[j].xh == xh)){
				jsw=j-qsw;
				var bz = num+","+qsw+","+jsw;
				sz[num-1]=bz;
				qsw=j;
				num=num+1;
				jcjz =gridName[j].jcjz;
				xh = gridName[j].xh; 
				
			}
			if(j==gridName.length-1){
				jsw=gridName.length-qsw;
				var bz = num+","+qsw+","+jsw;
				sz[num-1]=bz;
			}
			
		}
		if(num==1){
			sz[0]="1,0,"+gridName.length;
		}
		var mergerss="[";
		if(typelx==2){
			for(var i=0;i< num;i++){
				var s=sz[i].split(",");
				if(i == num-1){
					mergerss+="{rowIndex:"+s[1]+", columnIndex: 0, rowSpan:"+s[2]+", colSpan: 1},{rowIndex:"+s[1]+", columnIndex: 1, rowSpan: "+s[2]+", colSpan: 1}]"
				} 
				else{
					mergerss+="{rowIndex:"+s[1]+", columnIndex: 0, rowSpan: "+s[2]+", colSpan: 1},{rowIndex:"+s[1]+", columnIndex: 1, rowSpan: "+s[2]+", colSpan: 1},"
				}
			}
		}else if(typelx==1){
			for(var i=0;i< num;i++){
				var s=sz[i].split(",");
				if(i == num-1){
					mergerss+="{rowIndex:"+s[1]+", columnIndex: 0, rowSpan:"+s[2]+", colSpan: 1},{rowIndex:"+s[1]+", columnIndex: 1, rowSpan: "+s[2]+", colSpan: 1},{rowIndex:"+s[1]+", columnIndex: 2, rowSpan: "+s[2]+", colSpan: 1}]"
				} 
				else{
					mergerss+="{rowIndex:"+s[1]+", columnIndex: 0, rowSpan: "+s[2]+", colSpan: 1},{rowIndex:"+s[1]+", columnIndex: 1, rowSpan: "+s[2]+", colSpan: 1},{rowIndex:"+s[1]+", columnIndex: 2, rowSpan: "+s[2]+", colSpan: 1},"
				}
			}
		}
		var obj = eval(mergerss);
			mini.get(gridid).mergeCells(obj);
	}
	/**
	 * 判断是否是数字字符串
	 */
	 function isnumber(s){  
	        var reg = new RegExp("^[0-9]*$");
	        if(s == null || s == ""){
	        	return false;
	        }else{
	        	return reg.test(s)
	        }
		     
	     
	  }  
	
	/**
	 * 获取区级健康档案调阅URL
	 */
	 function getQjkdadyUrl(url){
		 $.ajax({
             url: url,
             type: "get",
             success: function (data) {
             	if (data != null && data != "") {
	            	$("#urlA").show();
	            	$("#url").val(data);
             	} else {
             		$("#urlA").hide();
             	}
             }
         });
	 }  
	 
	 
	 function isNull(param){
		 if(param === null || param === '' || param === undefined){
			 return false;
		 }else{
			 return true;
		 }
	 }
	 
	 /**
	  * 添加水印
	  */
	 function watermark(settings,left,top) {

	     //默认设置
	     var defaultSettings={
	       watermark_txt:settings.watermark_txt,
	       watermark_x:75,//水印起始位置x轴坐标
	       watermark_y:0,//水印起始位置Y轴坐标
	       watermark_rows:5,//水印行数
	       watermark_cols:20,//水印列数
	       watermark_x_space:50,//水印x轴间隔
	       watermark_y_space:50,//水印y轴间隔
	       watermark_alpha:1,//水印透明度
	       watermark_fontsize:'10px',//水印字体大小
	       watermark_font:'宋体',//水印字体
	       watermark_width:130,//水印宽度
	       watermark_height:80,//水印长度
	       watermark_angle:15//水印倾斜度数
	     };
	     //采用配置项替换默认值，作用类似jquery.extend
	     if(arguments.length===1&&typeof arguments[0] ==="object" )
	     {
	       var src=arguments[0]||{};
	       for(key in src)
	       {
	         if(src[key]&&defaultSettings[key]&&src[key]===defaultSettings[key])
	           continue;
	         else if(src[key])
	           defaultSettings[key]=src[key];
	       }
	     }

	     var oTemp = document.createDocumentFragment();
	     var obj = document.getElementById("watermark");
	     //获取页面最大宽度
	     var page_width = Math.max(document.body.scrollWidth,document.body.clientWidth);
	     page_width=obj.offsetWidth-217;
	     //获取页面最大长度
	     var page_height = Math.max(document.body.scrollHeight,document.body.clientHeight);

	     //如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
	     if (defaultSettings.watermark_cols == 0 ||
	       (parseInt(defaultSettings.watermark_x
	         + defaultSettings.watermark_width *defaultSettings.watermark_cols
	         + defaultSettings.watermark_x_space * (defaultSettings.watermark_cols - 1))
	       > page_width)) {
	       defaultSettings.watermark_cols =
	         parseInt((page_width
	           -defaultSettings.watermark_x
	           +defaultSettings.watermark_x_space)
	           / (defaultSettings.watermark_width
	           + defaultSettings.watermark_x_space));
	       defaultSettings.watermark_x_space =
	         parseInt((page_width
	           - defaultSettings.watermark_x
	           - defaultSettings.watermark_width
	           * defaultSettings.watermark_cols)
	           / (defaultSettings.watermark_cols - 1));
	     }
	     //如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
	     if (defaultSettings.watermark_rows == 0 ||
	       (parseInt(defaultSettings.watermark_y
	         + defaultSettings.watermark_height * defaultSettings.watermark_rows
	         + defaultSettings.watermark_y_space * (defaultSettings.watermark_rows - 1))
	       > page_height)) {
	       defaultSettings.watermark_rows =
	         parseInt((defaultSettings.watermark_y_space
	           + page_height - defaultSettings.watermark_y)
	           / (defaultSettings.watermark_height + defaultSettings.watermark_y_space));
	       defaultSettings.watermark_y_space =
	         parseInt((page_height
	           - defaultSettings.watermark_y
	           - defaultSettings.watermark_height
	           * defaultSettings.watermark_rows)
	           / (defaultSettings.watermark_rows - 1));
	     }
	     var x;
	     var y;
	     $(".mini-datagrid").children('pre').remove();
	     for (var i = 0; i < defaultSettings.watermark_rows; i++) {
	    	 y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
           for (var j = 0; j < defaultSettings.watermark_cols; j++) {
	         x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;

	         var mask_div = document.createElement('pre');
	         mask_div.id = 'mask_div' + i + j;
	 		mask_div.className = 'mask_div';
	         mask_div.appendChild(document.createTextNode(defaultSettings.watermark_txt));
	         //设置水印div倾斜显示
	         mask_div.style.visibility = "";
	         mask_div.style.position = "absolute";
	         mask_div.style.left = x + 'px';
	         mask_div.style.top = y + 'px';
	         mask_div.style.overflow = "hidden";
	         mask_div.style.zIndex = "9999";
	         mask_div.style.opacity = defaultSettings.watermark_alpha;
	         mask_div.style.fontSize = defaultSettings.watermark_fontsize;
	         mask_div.style.fontFamily = defaultSettings.watermark_font;
	         mask_div.style.textAlign = "center";
	         mask_div.style.width = defaultSettings.watermark_width + 'px';
	         mask_div.style.height = defaultSettings.watermark_height + 'px';
	         oTemp.appendChild(mask_div);
	       };
	     };
	    
	 	$(".mini-datagrid").append(oTemp);
	 	clearMask();
	 }
	 function clearMask(){
		 $(".mask_div").click(function(){
			 $(".mask_div").css("display","block");
			 $(".mask_div").css("z-index","9999");
			 var z=$(this).css("display");
			 if(z.length!=5){
				 $(this).css("display","block");
			 }else{
				 $(this).css("display","none");
			  
			 }
		 });
	 }