/**
 * @author admin_xf 
 * @descript 门诊日设置专用
 * columns12 --> 区分疫苗周门诊/双周门诊
 * columns34 --> 区分疫苗月门诊/双月门诊
 * columns56 --> 不区分疫苗周门诊/双周门诊
 * columns78 --> 不区分疫苗月门诊/双月门诊
 * columns910 --> 区分地块周门诊/双周门诊
 * columns1112 --> 区分地块月门诊/双月门诊
 */

columns12 = [[
              {title:'疫苗信息',width:80,align:"center",colspan:5},
              {field:'ruleId',hidden:true},
              {title:'<span id="mzr">门诊日（周门诊）</span>',width:80,colspan:7},
             ],
             [
              {title:'疫苗名称',field:'vaccineName',width:150},
              {title:'剂次种类',field:'vacciType',width:60,
            	    formatter:function(v,r){
		            	var result = "";
		  				if(v == '1'){
		  					result = "基础";
		  				}else if(v == '2'){
		  					result = "加强";
		  				}
		  				return result;
              		}
              },
              {title:'剂次',field:'vacciSeq',width:60},
              {title:'自动预约',field:'autoReserveFlag',width:60,
	            	formatter:function(v,r){
            	  		var result = "";
		  				if(v && v == 0){
		  					result = "<input type='checkbox' checked disabled='disabled'/>";
		  				}else{
		  					result = "<input type='checkbox' disabled='disabled'/>";
		  				}
		  				return result;
	              	}
              },
              {title:'单独预约',field:'singleReserveFlag',width:60,
            	   formatter:function(v,r){
	      	  			var result = "";
		  				if(v && v == 0){
		  					result = "<input type='checkbox' checked disabled='disabled'/>";
		  				}else{
		  					result = "<input type='checkbox' disabled='disabled'/>";
		  				}
		  				return result;
	               }
              },
              {title:'星期一',field:'monday',width:60,
	            	formatter:function(v,r){
		            	var result = "";
			  			if(v && v == 1){
			  				result = "<input type='checkbox' name='ck' checked />";
			  			}else{
			  				result = "<input type='checkbox' name='ck' />";
			  			}
			  			return result;
	              	}
              },
              {title:'星期二',field:'tuesday',width:60,
	              	formatter:function(v,r){
						var result = "";
						if(v && v == 1){
							result = "<input type='checkbox' name='ck' checked />";
						}else{
							result = "<input type='checkbox' name='ck' />";
						}
						return result;
	                }
               },
               {title:'星期三',field:'wednesday',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
               		}
               },
               {title:'星期四',field:'thursday',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'星期五',field:'friday',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'星期六',field:'saturday',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'星期日',field:'sunday',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
              
             ]];


columns34 = [[
              {title:'疫苗信息',width:80,align:"center",colspan:5},
              {field:'ruleId',hidden:true},
              {title:'<span id="mzr">门诊日（月门诊）</span>',width:80,colspan:31},
             ],
             [
              {title:'疫苗名称',field:'vaccineName',width:150},
              {title:'剂次种类',field:'vacciType',width:60,
            	    formatter:function(v,r){
		            	var result = "";
		  				if(v == '1'){
		  					result = "基础";
		  				}else if(v == '2'){
		  					result = "加强";
		  				}
		  				return result;
              		}
              },
              {title:'剂次',field:'vacciSeq',width:60},
              {title:'自动预约',field:'autoReserveFlag',width:60,
	            	formatter:function(v,r){
            	  		var result = "";
		  				if(v && v == 0){
		  					result = "<input type='checkbox' checked disabled='disabled'/>";
		  				}else{
		  					result = "<input type='checkbox' disabled='disabled'/>";
		  				}
		  				return result;
	              	}
              },
              {title:'单独预约',field:'singleReserveFlag',width:60,
            	   formatter:function(v,r){
	      	  			var result = "";
		  				if(v && v == 0){
		  					result = "<input type='checkbox' checked disabled='disabled'/>";
		  				}else{
		  					result = "<input type='checkbox' disabled='disabled'/>";
		  				}
		  				return result;
	               }
              },
              {title:'1号',field:'m1',width:60,
	            	formatter:function(v,r){
		            	var result = "";
			  			if(v && v == 1){
			  				result = "<input type='checkbox' name='ck' checked />";
			  			}else{
			  				result = "<input type='checkbox' name='ck' />";
			  			}
			  			return result;
	              	}
              },
              {title:'2号',field:'m2',width:60,
	              	formatter:function(v,r){
						var result = "";
						if(v && v == 1){
							result = "<input type='checkbox' name='ck' checked />";
						}else{
							result = "<input type='checkbox' name='ck' />";
						}
						return result;
	                }
              },
	          {title:'3号',field:'m3',width:60,
		           formatter:function(v,r){
		           	   var result = "";
		           	   if(v && v == 1){
		           		   result = "<input type='checkbox' name='ck' checked />";
		           	   }else{
		           		   result = "<input type='checkbox' name='ck' />";
		           	   }
		           	   return result;
	          		}
	           },
               {title:'4号',field:'m4',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'5号',field:'m5',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'6号',field:'m6',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'7号',field:'m7',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'8号',field:'m8',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'9号',field:'m9',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'10号',field:'m10',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'11号',field:'m11',width:60,
	            	formatter:function(v,r){
		            	var result = "";
			  			if(v && v == 1){
			  				result = "<input type='checkbox' name='ck' checked />";
			  			}else{
			  				result = "<input type='checkbox' name='ck' />";
			  			}
			  			return result;
	              	}
             },
             {title:'12号',field:'m12',width:60,
	              	formatter:function(v,r){
						var result = "";
						if(v && v == 1){
							result = "<input type='checkbox' name='ck' checked />";
						}else{
							result = "<input type='checkbox' name='ck' />";
						}
						return result;
	                }
              },
              {title:'13号',field:'m13',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
              		}
              },
              {title:'14号',field:'m14',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'15号',field:'m15',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'16号',field:'m16',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'17号',field:'m17',width:60,
            	  	formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'18号',field:'m18',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'19号',field:'m19',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'20号',field:'m20',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'21号',field:'m21',width:60,
	            	formatter:function(v,r){
		            	var result = "";
			  			if(v && v == 1){
			  				result = "<input type='checkbox' name='ck' checked />";
			  			}else{
			  				result = "<input type='checkbox' name='ck' />";
			  			}
			  			return result;
	              	}
              },
            {title:'22号',field:'m22',width:60,
	              	formatter:function(v,r){
						var result = "";
						if(v && v == 1){
							result = "<input type='checkbox' name='ck' checked />";
						}else{
							result = "<input type='checkbox' name='ck' />";
						}
						return result;
	                }
             },
             {title:'23号',field:'m23',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
             		}
             },
             {title:'24号',field:'m24',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'25号',field:'m25',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'26号',field:'m26',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'27号',field:'m27',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'28号',field:'m28',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'29号',field:'m29',width:60,
            	 	formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'30号',field:'m30',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'31号',field:'m31',width:60,
	       	   		formatter:function(v,r){
		            	   var result = "";
		            	   if(v && v == 1){
		            		   result = "<input type='checkbox' name='ck' checked />";
		            	   }else{
		            		   result = "<input type='checkbox' name='ck' />";
		            	   }
		            	   return result;
	              }
	          }
              
           ]];

columns56 = [[
              {field:'ruleId',hidden:true},
              {title:'<span id="mzr">门诊日（周门诊）</span>',width:80,colspan:7},
             ],
             [
              {title:'星期一',field:'monday',width:60,
	            	formatter:function(v,r){
		            	var result = "";
			  			if(v && v == 1){
			  				result = "<input type='checkbox' name='ck' checked />";
			  			}else{
			  				result = "<input type='checkbox' name='ck' />";
			  			}
			  			return result;
	              	}
              },
              {title:'星期二',field:'tuesday',width:60,
	              	formatter:function(v,r){
						var result = "";
						if(v && v == 1){
							result = "<input type='checkbox' name='ck' checked />";
						}else{
							result = "<input type='checkbox' name='ck' />";
						}
						return result;
	                }
               },
               {title:'星期三',field:'wednesday',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
               		}
               },
               {title:'星期四',field:'thursday',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'星期五',field:'friday',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'星期六',field:'saturday',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'星期日',field:'sunday',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
              
             ]];

columns78 = [[
              {field:'ruleId',hidden:true},
              {title:'<span id="mzr">门诊日（月门诊）</span>',width:80,colspan:31},
             ],
             [
              {title:'1号',field:'m1',width:60,
	            	formatter:function(v,r){
		            	var result = "";
			  			if(v && v == 1){
			  				result = "<input type='checkbox' name='ck' checked />";
			  			}else{
			  				result = "<input type='checkbox' name='ck' />";
			  			}
			  			return result;
	              	}
              },
              {title:'2号',field:'m2',width:60,
	              	formatter:function(v,r){
						var result = "";
						if(v && v == 1){
							result = "<input type='checkbox' name='ck' checked />";
						}else{
							result = "<input type='checkbox' name='ck' />";
						}
						return result;
	                }
              },
	          {title:'3号',field:'m3',width:60,
		           formatter:function(v,r){
		           	   var result = "";
		           	   if(v && v == 1){
		           		   result = "<input type='checkbox' name='ck' checked />";
		           	   }else{
		           		   result = "<input type='checkbox' name='ck' />";
		           	   }
		           	   return result;
	          		}
	           },
               {title:'4号',field:'m4',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'5号',field:'m5',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'6号',field:'m6',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'7号',field:'m7',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'8号',field:'m8',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'9号',field:'m9',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'10号',field:'m10',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'11号',field:'m11',width:60,
	            	formatter:function(v,r){
		            	var result = "";
			  			if(v && v == 1){
			  				result = "<input type='checkbox' name='ck' checked />";
			  			}else{
			  				result = "<input type='checkbox' name='ck' />";
			  			}
			  			return result;
	              	}
             },
             {title:'12号',field:'m12',width:60,
	              	formatter:function(v,r){
						var result = "";
						if(v && v == 1){
							result = "<input type='checkbox' name='ck' checked />";
						}else{
							result = "<input type='checkbox' name='ck' />";
						}
						return result;
	                }
              },
              {title:'13号',field:'m13',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
              		}
              },
              {title:'14号',field:'m14',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'15号',field:'m15',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'16号',field:'m16',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'17号',field:'m17',width:60,
            	  	formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'18号',field:'m18',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'19号',field:'m19',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'20号',field:'m20',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'21号',field:'m21',width:60,
	            	formatter:function(v,r){
		            	var result = "";
			  			if(v && v == 1){
			  				result = "<input type='checkbox' name='ck' checked />";
			  			}else{
			  				result = "<input type='checkbox' name='ck' />";
			  			}
			  			return result;
	              	}
              },
            {title:'22号',field:'m22',width:60,
	              	formatter:function(v,r){
						var result = "";
						if(v && v == 1){
							result = "<input type='checkbox' name='ck' checked />";
						}else{
							result = "<input type='checkbox' name='ck' />";
						}
						return result;
	                }
             },
             {title:'23号',field:'m23',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
             		}
             },
             {title:'24号',field:'m24',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'25号',field:'m25',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'26号',field:'m26',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'27号',field:'m27',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'28号',field:'m28',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'29号',field:'m29',width:60,
            	 	formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'30号',field:'m30',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             }
             ,
             {title:'31号',field:'m31',width:60,
	       	   		formatter:function(v,r){
		            	   var result = "";
		            	   if(v && v == 1){
		            		   result = "<input type='checkbox' name='ck' checked />";
		            	   }else{
		            		   result = "<input type='checkbox' name='ck' />";
		            	   }
		            	   return result;
	              }
	         }
              
           ]];


columns910 = [[
              {title:'地块信息',width:80,align:"left"},
              {field:'regionId',hidden:true},
              {title:'<span id="mzr">门诊日（周门诊）</span>',width:80,colspan:7},
             ],
             [
              {title:'地块名称',field:'regionName',width:80},
              {title:'星期一',field:'monday',width:60,
	            	formatter:function(v,r){
		            	var result = "";
			  			if(v && v == 1){
			  				result = "<input type='checkbox' name='ck' checked />";
			  			}else{
			  				result = "<input type='checkbox' name='ck' />";
			  			}
			  			return result;
	              	}
              },
              {title:'星期二',field:'tuesday',width:60,
	              	formatter:function(v,r){
						var result = "";
						if(v && v == 1){
							result = "<input type='checkbox' name='ck' checked />";
						}else{
							result = "<input type='checkbox' name='ck' />";
						}
						return result;
	                }
               },
               {title:'星期三',field:'wednesday',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
               		}
               },
               {title:'星期四',field:'thursday',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'星期五',field:'friday',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'星期六',field:'saturday',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'星期日',field:'sunday',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
              
           ]];


columns1112 = [[
              {title:'地块信息',width:80,align:"center"},
              {field:'regionId',hidden:true},
              {title:'<span id="mzr">门诊日（月门诊）</span>',width:80,colspan:31},
             ],
             [
              {title:'地块名称',field:'regionName',width:150},
              {title:'1号',field:'m1',width:60,
	            	formatter:function(v,r){
		            	var result = "";
			  			if(v && v == 1){
			  				result = "<input type='checkbox' name='ck' checked />";
			  			}else{
			  				result = "<input type='checkbox' name='ck' />";
			  			}
			  			return result;
	              	}
              },
              {title:'2号',field:'m2',width:60,
	              	formatter:function(v,r){
						var result = "";
						if(v && v == 1){
							result = "<input type='checkbox' name='ck' checked />";
						}else{
							result = "<input type='checkbox' name='ck' />";
						}
						return result;
	                }
              },
	          {title:'3号',field:'m3',width:60,
		           formatter:function(v,r){
		           	   var result = "";
		           	   if(v && v == 1){
		           		   result = "<input type='checkbox' name='ck' checked />";
		           	   }else{
		           		   result = "<input type='checkbox' name='ck' />";
		           	   }
		           	   return result;
	          		}
	           },
               {title:'4号',field:'m4',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'5号',field:'m5',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'6号',field:'m6',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'7号',field:'m7',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'8号',field:'m8',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'9号',field:'m9',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'10号',field:'m10',width:60,
            	   formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                   }
               },
               {title:'11号',field:'m11',width:60,
	            	formatter:function(v,r){
		            	var result = "";
			  			if(v && v == 1){
			  				result = "<input type='checkbox' name='ck' checked />";
			  			}else{
			  				result = "<input type='checkbox' name='ck' />";
			  			}
			  			return result;
	              	}
             },
             {title:'12号',field:'m12',width:60,
	              	formatter:function(v,r){
						var result = "";
						if(v && v == 1){
							result = "<input type='checkbox' name='ck' checked />";
						}else{
							result = "<input type='checkbox' name='ck' />";
						}
						return result;
	                }
              },
              {title:'13号',field:'m13',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
              		}
              },
              {title:'14号',field:'m14',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'15号',field:'m15',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'16号',field:'m16',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'17号',field:'m17',width:60,
            	  	formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'18号',field:'m18',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'19号',field:'m19',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'20号',field:'m20',width:60,
           	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                  }
              },
              {title:'21号',field:'m21',width:60,
	            	formatter:function(v,r){
		            	var result = "";
			  			if(v && v == 1){
			  				result = "<input type='checkbox' name='ck' checked />";
			  			}else{
			  				result = "<input type='checkbox' name='ck' />";
			  			}
			  			return result;
	              	}
              },
            {title:'22号',field:'m22',width:60,
	              	formatter:function(v,r){
						var result = "";
						if(v && v == 1){
							result = "<input type='checkbox' name='ck' checked />";
						}else{
							result = "<input type='checkbox' name='ck' />";
						}
						return result;
	                }
             },
             {title:'23号',field:'m23',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
             		}
             },
             {title:'24号',field:'m24',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'25号',field:'m25',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'26号',field:'m26',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'27号',field:'m27',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'28号',field:'m28',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'29号',field:'m29',width:60,
            	 	formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             },
             {title:'30号',field:'m30',width:60,
          	   		formatter:function(v,r){
	            	   var result = "";
	            	   if(v && v == 1){
	            		   result = "<input type='checkbox' name='ck' checked />";
	            	   }else{
	            		   result = "<input type='checkbox' name='ck' />";
	            	   }
	            	   return result;
                 }
             }
             ,
             {title:'31号',field:'m31',width:60,
	       	   		formatter:function(v,r){
		            	   var result = "";
		            	   if(v && v == 1){
		            		   result = "<input type='checkbox' name='ck' checked />";
		            	   }else{
		            		   result = "<input type='checkbox' name='ck' />";
		            	   }
		            	   return result;
	               }
	         }
              
           ]];