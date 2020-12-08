/**
 * @Add xf 
 * 
 * @Date 2012 4 27
 * 
 * @Desc 使用的时候必须引用jquery.1.4.4.min.js
 */

_zlUI={
		slideToggle:function(clickId,showId,timer){
			var $obj = $("#" + clickId);
			//当鼠标移到这个div上面的时候让鼠标变成手型
			try{
				$obj.css("cursor","pointer").click(function(){
					timer = (timer == "undefined" || timer =="" || timer == null) ? 500:timer;
					$("#"+showId).slideToggle(timer);
				});
			}catch(e){
				
			}
		},
		//全选和取消
		//第一个是checkbox的子项的Name，第二个是就是“全选”按钮的Id 
		checkedAndDeleteAllCheckBox:function(checkBoxsName,clickCheckBoxId){
			var clickCheckBox = $("#"+clickCheckBoxId);
			var checkBoxs = $("input[name='"+checkBoxsName+"']");
				checkBoxs.each(function(){
					clickCheckBox.attr("checked")?$(this).attr("checked",true):$(this).removeAttr("checked");
				});
			
		},
		// obj1的日期不大于obj2的日期
		checkdatesmallbig:function(o1, o2) {
			typeof(o1) == "object" ? obj1 = o1 : obj1 = document.getElementById(o1);
			typeof(o2) == "object" ? obj2 = o2 : obj2 = document.getElementById(o2);
			
			var obj1value = obj1.value;
			var obj2value = obj2.value;
			if((obj1value == "" && obj2value != "")||(obj1value != "" && obj2value == "")){
				alert("请输入完整的起始时间和结束时间！");
				return false;
			}
			var obj1string = obj1value.substring(0, 4) + obj1value.substring(5, 7) + obj1value.substring(8, 10);
			var obj2string = obj2value.substring(0, 4) + obj2value.substring(5, 7) + obj2value.substring(8, 10);
			if (parseInt(obj1string) > parseInt(obj2string)) {
				alert("左边日期不得大于右边日期，请重新输入两个日期！");
				obj1.value = "";
				obj2.value = "";
				return false;
			}
			return true;
		},
		//搜索
		searchAjaxMessageBySearchFormAndGrid:function(searchForm,grid){
			if(Wonders.utils.validateForm(searchForm)){
				Wonders.grid.doQuery(searchForm, grid);
			}
		},
		//form重置
		formReset:function(formId){
			Ext.getCmp(formId).getForm().reset();
		}
		,
		openWindow:function(grid,ids,bklxInfo,dlg){
			var record = Ext.getCmp(grid).getSelectionModel().getSelected();	
	       	var id = record.get(ids);
			var bklx = record.get(bklxInfo);
			Wonders.window.show(dlg,'id='+id+'&bklx='+bklx);
		},
		//隐藏
		onclicks:function(url, result,k,c,name){
			var obj =document.getElementById(result);
			obj.style.display = obj.style.display == "block"?"none":"block";
			if(obj.innerHTML != "") return;
			$.post(url,{key:k,code:c},function(answer){
				var json = eval(answer);
				for ( var int = 0; int < json.length; int++) {
					var text = json[int].text;
					var id = json[int].id;
					var va = json[int].value;
					var newChildElement = _zlUI.createLi(text, id, va,name);
					obj.appendChild(newChildElement);
				}
			});
			//加一个全选按钮
			obj.appendChild(_zlUI.createCheckBoxLi(name));
		},
		/*
		创建一个li
		*/
		createLi:function(text,id,va,name){
			var liElement = document.createElement("<li></li>");
			var str = "<input type='checkBox' value="+va+" id="+id+" name="+name+">"+text+"</li>".toString();
			liElement.innerHTML = str;
			return liElement;
		},
		createCheckBoxLi:function(name){
			var liElement = document.createElement("<li></li>");
			var strId = "clickIds";
			var str = "<input type='checkBox' id='clickIds' onclick=_zlUI.checkedAndDeleteAllCheckBox('"+name+"','"+strId+"')>全选</li>".toString();
			liElement.innerHTML = str;
			return liElement;
		}
}