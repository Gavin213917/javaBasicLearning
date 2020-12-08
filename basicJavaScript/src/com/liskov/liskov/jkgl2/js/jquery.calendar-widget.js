(function($) {
    //六月份测试数据 18号和15号有数据  *!这里没有加月份*


	function calendarWidget(el, params) {

		var now   = new Date();
        var nowday=now.getDate();
		var thismonth = now.getMonth();
		var thisyear  = now.getFullYear();
		//开发步骤：
		//此处用ajax方法调用后台，获取上月备忘数据，当月备忘数据，下月备忘数据
		//获取数据的json格式可参照testData，testPrecData，testNextData三个数组的
		//记得将下面的样例数据删除
		//$.ajax();
		//样例数据
		if(params != undefined)
		{
			thismonth = params.month;
			thisyear = params.year;
			if(params.month==4)
			{
			    var dateJson = [{day_2:'',day_1:'测试代办事项测试代办事项测试代办事项'},
			    				{day_29:'测试代办事项测试代办事项测试代办事项2',day_28:'测试代办事项测试代办事项测试代办事项2'},
			    				{day_1:'测试代办事项测试代办事项测试代办事项Next',day_3:''}	];
				var testData=dateJson[0];
			    var testPrecData=dateJson[1];
			    var testNextData=dateJson[2];
			}
			if(params.month==6)
			{
				var dateJson = [{day_26:'测试代办事项测试代办事项测试代办事项',day_17:'测试代办事项测试代办事项测试代办事项'},
			    				{day_30:'测试代办事项测试代办事项测试代办事项3',day_27:'测试代办事项测试代办事项测试代办事项3'},
			    				{day_3:'测试代办事项测试代办事项测试代办事项Next',day_6:'测试代办事项测试代办事项测试代办事项Next'}	];
				var testData=dateJson[0];
			    var testPrecData=dateJson[1];
			    var testNextData=dateJson[2];
			}
		}
        //alert(thisyear);
		//console.log(nowday);
		var opts = {
			month: thismonth,
			year: thisyear
		};

		$.extend(opts, params);

		var monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
		var dayNames = ['日', '一', '二', '三', '四', '五', '六'];
		month = i = parseInt(opts.month);
		year = parseInt(opts.year);
		var m = 0;
		var table = '';
			
			// next month
			if (month == 11) {
				var next_month = '<a date-day="'+0+','+(year+1)+'" href="?month=' + 1 + '&amp;year=' + (year + 1) + '" title="' + monthNames[0] + ' ' + (year + 1) + '">' + monthNames[0] + ' ' + (year + 1) + '</a>';
			} else {
				var next_month = '<a date-day="'+(month+1)+','+year+'" href="?month=' + (month + 2) + '&amp;year=' + (year) + '" title="' + monthNames[month + 1] + ' ' + (year) + '">' + monthNames[month + 1] + ' ' + (year) + '</a>';
			}

			// previous month
			if (month == 0) {
				var prev_month = '<a date-day="'+11+','+(year-1)+'" href="?month=' + 12 + '&amp;year=' + (year - 1) + '" title="' + monthNames[11] + ' ' + (year - 1) + '">' + monthNames[11] + ' ' + (year - 1) + '</a>';
			} else {
				var prev_month = '<a  date-day="'+(month-1)+','+year+'" href="?month=' + (month) + '&amp;year=' + (year) + '" title="' + monthNames[month - 1] + ' ' + (year) + '">' + monthNames[month - 1] + ' ' + (year) + '</a>';
			}

			table += ('<h3 class="calendar_title" id="current-month"><a class="calendar_left_btn" title="上一月" href="javascript:void(0);" ></a><span>'+monthNames[month]+' '+year+'</span><a class="calendar_right_btn" title="下一月" href="javascript:void(0);" ></a></h3>');
			// uncomment the following lines if you'd like to display calendar month based on 'month' and 'view' paramaters from the URL
			table += ('<div style="display: none" class="nav-prev">'+ prev_month +'</div>');
			table += ('<div style="display: none" class="nav-next">'+ next_month +'</div>');
			table += ('<table class="calendar-table" ' +'id="calendar-month'+i+' " cellspacing="0">');

			table += '<tr>';

			for (d=0; d<7; d++) {
				table += '<th class="weekday">' + dayNames[d] + '</th>';
			}

			table += '</tr>';

			var days = getDaysInMonth(month,year);
            var firstDayDate=new Date(year,month,1);
            var firstDay=firstDayDate.getDay();

			var prev_days = getDaysInMonth(month,year);
            var firstDayDate=new Date(year,month,1);
            var firstDay=firstDayDate.getDay();

			var prev_m = month == 0 ? 11 : month-1;
			var prev_y = prev_m == 11 ? year - 1 : year;
			var prev_days = getDaysInMonth(prev_m, prev_y);
			firstDay = (firstDay == 0 && firstDayDate) ? 7 : firstDay;

			var i = 0;
            for (j=0;j<42;j++){

              if ((j<firstDay)){
              	  if(testPrecData != undefined)
              	  {
              	  	  if(testPrecData['day_'+(prev_days-firstDay+j+1)]){
              	  	  	  table += ('<td class="other-month pday'+(prev_days-firstDay+j+1)+'">' +
              	  	  	  	  				
	                                        '<div class="day_box">'+(prev_days-firstDay+j+1)+
	                                        	'<input type="hidden" id="'+prev_y+'_'+(month==0?12:month)+'_'+(prev_days-firstDay+j+1)+'" value="'+prev_y+'-'+(month==0?12:month)+'-'+(prev_days-firstDay+j+1)+'" />'+
	                                            '<em class="c_green"></em>' +
	                                             '<div class="day_box_sub">' +
	                                                '<p class="p1">'+
	                                                testPrecData['day_'+(prev_days-firstDay+j+1)]+
	                                                '</p>'+
	                                                '<div class="calendar_more"><a class="look_more" href="#">详情</a>' +
	                                                '</div>' +
	                                            '</div>' +
	                                        '</div>' +
	                                    '</td>');
              	  	  }
              	  	  else
              	  	  {
              	  	  	  table += ('<td class="other-month pday'+(prev_days-firstDay+j+1)+'"><div class="day_box">'+ (prev_days-firstDay+j+1) +'<input type="hidden" id="'+prev_y+'_'+(month==0?12:month)+'_'+(prev_days-firstDay+j+1)+'" value="'+prev_y+'-'+(month==0?12:month)+'-'+(prev_days-firstDay+j+1)+'" />'+'</div></td>');
              	  	  }
              	  }
              	  else
              	  {
              	  	  table += ('<td class="other-month pday'+(prev_days-firstDay+j+1)+'"><div class="day_box">'+ (prev_days-firstDay+j+1) +'<input type="hidden" id="'+prev_y+'_'+(month==0?12:month)+'_'+(prev_days-firstDay+j+1)+'" value="'+prev_y+'-'+(month==0?12:month)+'-'+(prev_days-firstDay+j+1)+'" />'+'</div></td>');
              	  }
                
			  } else if ((j>=firstDay+getDaysInMonth(month,year))) {
			  	  i = i+1;
			  	  if(testNextData != undefined)
			  	  {
			  	  	   if(testNextData['day_'+i]){
	                        table += ('<td class="other-month oday'+i+'">' +
	                        				
	                                        '<div class="day_box">'+i+
	                                        	'<input type="hidden" id="'+year+'_'+(month+2)+'_'+i+'" value="'+year+'-'+(month+2)+'-'+i+'" />'+
	                                            '<em class="c_green"></em>' +
	                                             '<div class="day_box_sub">' +
	                                                '<p class="p1">'+
	                                                testNextData['day_'+i]+
	                                                '</p>'+
	                                                '<div class="calendar_more"><a class="look_more" href="#">详情</a>' +
	                                                '</div>' +
	                                            '</div>' +
	                                        '</div>' +
	                                    '</td>');
	                    }else{
	                        //table += ('<td class="current-month day'+(j-firstDay+1)+'"><div class="day_box">'+(j-firstDay+1)+'</div></td>');
                			table += ('<td class="other-month oday'+i+'"><div class="day_box">'+ i +'<input type="hidden" id="'+year+'_'+(month+2)+'_'+i+'" value="'+year+'-'+(month+2)+'-'+i+'" />'+'</div></td>');
	                    }
	                }
	                else
	                {
                		table += ('<td class="other-month oday'+i+'"><div class="day_box">'+ i +'<input type="hidden" id="'+year+'_'+(month+2)+'_'+i+'" value="'+year+'-'+(month+2)+'-'+i+'" />'+'</div></td>');
	                }
				
              }else{
				if(testData != undefined)
				{
	                if(nowday>(j-firstDay+1)){
	                    //过期数据
	                    if(testData['day_'+(j-firstDay+1)]){
	                        table += ('<td class="current-month day'+(j-firstDay+1)+'">' +
	                        			
	                                    '<div class="day_box">'+(j-firstDay+1)+
	                                    	'<input type="hidden" id="'+year+'_'+(month+1)+'_'+(j-firstDay+1)+'" value="'+year+'-'+(month+1)+'-'+(j-firstDay+1)+'" />'+
	                                        '<em></em>' +
	                                                 '<div class="day_box_sub">' +
	                                                '<p class="p1">'+
	                                                  testData['day_'+(j-firstDay+1)]+
	                                                 '</p>'+
	                                                '<div class="calendar_more"><a class="look_more" href="#">详情</a>' +
	                                                '</div>' +
	                                                '</div>' +
	                                    '</div>' +
	                                   '</td>')
	                    }else{
	                        table += ('<td class="current-month day'+(j-firstDay+1)+'"><div class="day_box">'+(j-firstDay+1)+'<input type="hidden" id="'+year+'_'+(month+1)+'_'+(j-firstDay+1)+'" value="'+year+'-'+(month+1)+'-'+(j-firstDay+1)+'" />'+'</div></td>')
	                    }

	                }else{
	                    //未过期数据
	                    if(testData['day_'+(j-firstDay+1)]){
	                        table += ('<td class="current-month day'+(j-firstDay+1)+'">' +
	                        			
	                                        '<div class="day_box">'+(j-firstDay+1)+
	                                        	'<input type="hidden" id="'+year+'_'+(month+1)+'_'+(j-firstDay+1)+'" value="'+year+'-'+(month+1)+'-'+(j-firstDay+1)+'" />'+
	                                            '<em class="c_green"></em>' +
	                                             '<div class="day_box_sub">' +
	                                                '<p class="p1">'+
	                                                testData['day_'+(j-firstDay+1)]+
	                                                '</p>'+
	                                                '<div class="calendar_more"><a class="look_more" href="#">详情</a>' +
	                                                '</div>' +
	                                            '</div>' +
	                                        '</div>' +
	                                    '</td>');
	                    }else{
	                        table += ('<td class="current-month day'+(j-firstDay+1)+'"><div class="day_box">'+(j-firstDay+1)+'<input type="hidden" id="'+year+'_'+(month+1)+'_'+(j-firstDay+1)+'" value="'+year+'-'+(month+1)+'-'+(j-firstDay+1)+'" />'+'</div></td>');
	                    }

	                }
	            }
	            else 
	            {
	            	table += ('<td class="current-month day'+(j-firstDay+1)+'"><div class="day_box">'+(j-firstDay+1)+'<input type="hidden" id="'+year+'_'+(month+1)+'_'+(j-firstDay+1)+'" value="'+year+'-'+(month+1)+'-'+(j-firstDay+1)+'" />'+'</div></td>');
	            }
              }
              if (j%7==6)  table += ('</tr>');
            }

            table += ('</table>');
		el.html(table);
        el.attr("year",year);
        el.attr("month",month);
        if(now.getMonth()==opts.month){
            $(".day"+nowday).find('.day_box').addClass("red_bg");
            someday = nowday;
        }

	}

	function getDaysInMonth(month,year)  {
		var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];
		if ((month==1)&&(year%4==0)&&((year%100!=0)||(year%400==0))){
		  return 29;
		}else{
		  return daysInMonth[month];
		}
	}

	var flg = false;
	var someday;
	// jQuery plugin initialisation
	$.fn.calendarWidget = function(params) {
        var that=this;
		calendarWidget(this, params);
		if(!flg)
		{
	        //上一个月
	        this.delegate(".calendar_left_btn","click",function(){
	            var arr=$('.nav-prev>a').attr('date-day').split(',');
	            var params={
	                month:parseInt(arr[0]),
	                year:parseInt(arr[1])
	            }
	            calendarWidget(that, params);
	        });
	
	        //下一个月
	        this.delegate(".calendar_right_btn","click",function(){
	
	            var arr=$('.nav-next>a').attr('date-day').split(',');
	            var params={
	                month:parseInt(arr[0]),
	                year:parseInt(arr[1])
	            }
	            calendarWidget(that, params);
	        });
	
	        //鼠标悬停日期展示数据
	        this.delegate('.day_box','mouseenter',function(event){
	        	$(this).addClass('blue_bg');
                var topset = $(this)[0].offsetTop;
                $(this).find('.day_box_sub').show();
                
            	if($(this).find('.day_box_sub')[0] != undefined)
            	{
            		var height = $(this).find('.day_box_sub')[0].clientHeight;
            		if(topset+height >= 204)
            		{
            			$(this).find('.day_box_sub').css({'top':14-204+height});
            		}
            	}
                $(this).css('z-index',100)
	        });
	
	        this.delegate('.day_box','mouseleave',function(){
	        	$(this).find('.day_box_sub').hide();
	            $(this).css('z-index','');
	            $(this).removeClass('blue_bg');
	        });
	        this.delegate('.day_box','click',function(){
	            $(".pday"+someday).find('.day_box').removeClass('red_bg');
	            $(".oday"+someday).find('.day_box').removeClass('red_bg');
	            $(".day"+someday).find('.day_box').removeClass('red_bg');
	            $(this).addClass('red_bg');
	            someday=$(this).find('.day_box').context.childNodes[0].nodeValue;
	        });
	      //双击日期
			this.delegate('.day_box','dblclick',function(){
				if(DialogComm != null)
				{
					//双击出现弹出框，如果已有备忘记录，则显示日期与备忘记录，如果没有则显示日期。
					DialogComm.init();
					if($(this).find('.day_box').context.childNodes[3] != undefined)
					{
						document.getElementById("txtRemark").value=$(this).find('.day_box').context.childNodes[3].childNodes[0].innerText;
					}
					else
					{
						document.getElementById("txtRemark").value="";
					}
					
					$("#startDate").datebox('setValue',$(this).find('.day_box').context.childNodes[1].defaultValue);
					
				}
	        });
			this.delegate('.look_more','click',function(){
				if(DialogComm != null)
				{
					//单击详情出现弹出框，如果已有备忘记录，则显示日期与备忘记录
					DialogComm.init();
					if($(this).context.parentNode.parentNode.parentNode.childNodes[3] != undefined)
					{
						document.getElementById("txtRemark").value=$(this).context.parentNode.parentNode.parentNode.childNodes[3].childNodes[0].innerText;
					}
					else
					{
						document.getElementById("txtRemark").value="";
					}
					
					$("#startDate").datebox('setValue',$(this).context.parentNode.parentNode.parentNode.childNodes[1].defaultValue);
					
				}
			});
			flg=true;
		}


		return this;
	};

})(jQuery);
