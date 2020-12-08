$(function(){
					$("#ssyyqxid").change(function(){
						$("#dycssyyid").empty();//清空
						var areabh = $("#ssyyqxid").val();
						  var pid = $('#pid').val();
						   if(areabh!=''){
							$.ajax({			
								type: "POST",	
								url: "zlSfkList!savezlSfkFris.action",
								dataType: "json",			
								data: "pid="+pid+"&areabh="+areabh,		
								success: function(msg) {
								 	       var slt = $("#dycssyyid");
						 		    if(msg==""){
							 			   $(slt)[0].options.add(new Option("无",""));
								    }else{
								    	$(slt)[0].options.add(new Option("请选择",""));
									   for(var i = 0; i < msg.length; i++){
								         $(slt)[0].options.add(new Option(msg[i].NAME,msg[i].CODE));
								     }
								          $(slt)[0].options[0].selected=true ;//默认选中第一个option
								    }
							 	}			
							}); 
						   }	  	
					});
				});

				$(function(){
					$("#ssyyqx2id").change(function(){
						$("#dycssyy2id").empty();//清空
						var areabh = $("#ssyyqx2id").val();
						  var pid = $('#pid').val();
						   if(areabh!=''){
							$.ajax({			
								type: "POST",	
								url: "zlSfkList!savezlSfkFris.action",
								dataType: "json",			
								data: "pid="+pid+"&areabh="+areabh,		
								success: function(msg) {
								 	       var slt = $("#dycssyy2id");
						 		    if(msg==""){
							 			   $(slt)[0].options.add(new Option("无",""));
								    }else{
								    	$(slt)[0].options.add(new Option("请选择",""));
									   for(var i = 0; i < msg.length; i++){
								         $(slt)[0].options.add(new Option(msg[i].NAME,msg[i].CODE));
								     }
								          $(slt)[0].options[0].selected=true ;//默认选中第一个option
								    }
							 	}			
							}); 
						   }	  	
					});
				});

				$(function(){
					$("#ssyyqx3id").change(function(){
						$("#dycssyy3id").empty();//清空
						var areabh = $("#ssyyqx3id").val();
						  var pid = $('#pid').val();
						   if(areabh!=''){
							$.ajax({			
								type: "POST",	
								url: "zlSfkList!savezlSfkFris.action",
								dataType: "json",			
								data: "pid="+pid+"&areabh="+areabh,		
								success: function(msg) {
								 	       var slt = $("#dycssyy3id");
						 		    if(msg==""){
							 			   $(slt)[0].options.add(new Option("无",""));
								    }else{
								    	$(slt)[0].options.add(new Option("请选择",""));
									   for(var i = 0; i < msg.length; i++){
								         $(slt)[0].options.add(new Option(msg[i].NAME,msg[i].CODE));
								     }
								          $(slt)[0].options[0].selected=true ;//默认选中第一个option
								    }
							 	}			
							}); 
						   }	  	
					});
				});
				//化療醫院
				$(function(){
					$("#hlyyqxid").change(function(){
						$("#hlyyid").empty();//清空
						var areabh = $("#hlyyqxid").val();
						  var pid = $('#pid').val();
						   if(areabh!=''){
							$.ajax({			
								type: "POST",	
								url: "zlSfkList!savezlSfkFris.action",
								dataType: "json",			
								data: "pid="+pid+"&areabh="+areabh,		
								success: function(msg) {
								 	       var slt = $("#hlyyid");
						 		    if(msg==""){
							 			   $(slt)[0].options.add(new Option("无",""));
								    }else{
								    	$(slt)[0].options.add(new Option("请选择",""));
									   for(var i = 0; i < msg.length; i++){
								         $(slt)[0].options.add(new Option(msg[i].NAME,msg[i].CODE));
								     }
								          $(slt)[0].options[0].selected=true ;//默认选中第一个option
								    }
							 	}			
							}); 
						   }	  	
					});
				});
				
				$(function(){
					$("#hlyyqx2id").change(function(){
						$("#hlyy2id").empty();//清空
						var areabh = $("#hlyyqx2id").val();
						  var pid = $('#pid').val();
						   if(areabh!=''){
							$.ajax({			
								type: "POST",	
								url: "zlSfkList!savezlSfkFris.action",
								dataType: "json",			
								data: "pid="+pid+"&areabh="+areabh,		
								success: function(msg) {
								 	       var slt = $("#hlyy2id");
						 		    if(msg==""){
							 			   $(slt)[0].options.add(new Option("无",""));
								    }else{
								    	$(slt)[0].options.add(new Option("请选择",""));
									   for(var i = 0; i < msg.length; i++){
								         $(slt)[0].options.add(new Option(msg[i].NAME,msg[i].CODE));
								     }
								          $(slt)[0].options[0].selected=true ;//默认选中第一个option
								    }
							 	}			
							}); 
						   }	  	
					});
				});
				
				$(function(){
					$("#hlyyqx3id").change(function(){
						$("#hlyy3id").empty();//清空
						var areabh = $("#hlyyqx3id").val();
						  var pid = $('#pid').val();
						   if(areabh!=''){
							$.ajax({			
								type: "POST",	
								url: "zlSfkList!savezlSfkFris.action",
								dataType: "json",			
								data: "pid="+pid+"&areabh="+areabh,		
								success: function(msg) {
								 	       var slt = $("#hlyy3id");
						 		    if(msg==""){
							 			   $(slt)[0].options.add(new Option("无",""));
								    }else{
								    	$(slt)[0].options.add(new Option("请选择",""));
									   for(var i = 0; i < msg.length; i++){
								         $(slt)[0].options.add(new Option(msg[i].NAME,msg[i].CODE));
								     }
								          $(slt)[0].options[0].selected=true ;//默认选中第一个option
								    }
							 	}			
							}); 
						   }	  	
					});
				});
				
				//放療醫院
				$(function(){
					$("#flyyqxid").change(function(){
						$("#flyyid").empty();//清空
						var areabh = $("#flyyqxid").val();
						  var pid = $('#pid').val();
						   if(areabh!=''){
							$.ajax({			
								type: "POST",	
								url: "zlSfkList!savezlSfkFris.action",
								dataType: "json",			
								data: "pid="+pid+"&areabh="+areabh,		
								success: function(msg) {
								 	       var slt = $("#flyyid");
						 		    if(msg==""){
							 			   $(slt)[0].options.add(new Option("无",""));
								    }else{
								    	$(slt)[0].options.add(new Option("请选择",""));
									   for(var i = 0; i < msg.length; i++){
								         $(slt)[0].options.add(new Option(msg[i].NAME,msg[i].CODE));
								     }
								          $(slt)[0].options[0].selected=true ;//默认选中第一个option
								    }
							 	}			
							}); 
						   }	  	
					});
				});
				
				$(function(){
					$("#flyyqx2id").change(function(){
						$("#flyy2id").empty();//清空
						var areabh = $("#flyyqx2id").val();
						  var pid = $('#pid').val();
						   if(areabh!=''){
							$.ajax({			
								type: "POST",	
								url: "zlSfkList!savezlSfkFris.action",
								dataType: "json",			
								data: "pid="+pid+"&areabh="+areabh,		
								success: function(msg) {
								 	       var slt = $("#flyy2id");
						 		    if(msg==""){
							 			   $(slt)[0].options.add(new Option("无",""));
								    }else{
								    	$(slt)[0].options.add(new Option("请选择",""));
									   for(var i = 0; i < msg.length; i++){
								         $(slt)[0].options.add(new Option(msg[i].NAME,msg[i].CODE));
								     }
								          $(slt)[0].options[0].selected=true ;//默认选中第一个option
								    }
							 	}			
							}); 
						   }	  	
					});
				});
				
				$(function(){
					$("#flyyqx3id").change(function(){
						$("#flyy3id").empty();//清空
						var areabh = $("#flyyqx3id").val();
						  var pid = $('#pid').val();
						   if(areabh!=''){
							$.ajax({			
								type: "POST",	
								url: "zlSfkList!savezlSfkFris.action",
								dataType: "json",			
								data: "pid="+pid+"&areabh="+areabh,		
								success: function(msg) {
								 	       var slt = $("#flyy3id");
						 		    if(msg==""){
							 			   $(slt)[0].options.add(new Option("无",""));
								    }else{
								    	$(slt)[0].options.add(new Option("请选择",""));
									   for(var i = 0; i < msg.length; i++){
								         $(slt)[0].options.add(new Option(msg[i].NAME,msg[i].CODE));
								     }
								          $(slt)[0].options[0].selected=true ;//默认选中第一个option
								    }
							 	}			
							}); 
						   }	  	
					});
				});
				
				//首次实施手术
				$(function(){
					$("#scssyyqxid").change(function(){
						$("#scssssyyid").empty();//清空
						var areabh = $("#scssyyqxid").val();
						  var pid = $('#pid').val();
						   if(areabh!=''){
							$.ajax({			
								type: "POST",	
								url: "zlSfkList!savezlSfkFris.action",
								dataType: "json",			
								data: "pid="+pid+"&areabh="+areabh,		
								success: function(msg) {
								 	       var slt = $("#scssssyyid");
						 		    if(msg==""){
							 			   $(slt)[0].options.add(new Option("无",""));
								    }else{
								    	$(slt)[0].options.add(new Option("请选择",""));
									   for(var i = 0; i < msg.length; i++){
								         $(slt)[0].options.add(new Option(msg[i].NAME,msg[i].CODE));
								     }
								          $(slt)[0].options[0].selected=true ;//默认选中第一个option
								    }
							 	}			
							}); 
						   }	  	
					});
				});