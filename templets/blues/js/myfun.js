//隔行换色
$(function(){
    $('table.data-table tr:even').addClass('even');
	
	//获取焦点和失去焦点设置默认值
	$("input.defaultValue").focus(function(){
		if($(this).val()==this.defaultValue){
			$(this).val("");
		}
	}).blur(function(){
		if($(this).val()==""){
			$(this).val(this.defaultValue);
		}		
	})
})

//左侧菜单
$(function(){		
	$("#wLeft .leftMenu ul li").each(function(index, element) {
		var span=$("<span class='hover'></span>");
		span.css("opacity",0);
		$(this).append(span);
	});
	$("#wLeft .leftMenu ul li").hover(function(){
		var span=$(this).find(".hover");
		if(!$(this).hasClass("sel")){
			$(this).children("a").css("color","#fff");
			span.stop(true,true).animate({"left":0,"opacity":1},300,"easeOutSine");
		}
	},function(){
		var span=$(this).find(".hover");
		if(!$(this).hasClass("sel")){
			$(this).children("a").css("color","#0f0f0f");
			span.stop(true,true).animate({"left":-200,"opacity":0},300,"easeOutSine");
		}
	})
	$("#wLeft .leftMenu ul li em").click(function(){
		$(this).parent().find(".lsMenu").stop(true,true).slideToggle(600,"easeOutCirc");
	})
})

//背景淡入淡出插件
//作者：闲闪小颜
//时间：2013-11-21
;(function($) {
	$.fn.extend({
		"imgFade":function(options){
			//设置默认值
			options=$.extend({
				easing:"swing", //动画效果
				stopTime:4000, //停留时间
				time:1500, //动画时间
				mouseStop:true//鼠标经过停止                
			},options);
			
			 //插件实现代码 
			var obj=$(this); 
			var objdiv=obj.find("div");
			var length=objdiv.length;
			var i=0;
			if(length>1){
				function execute(){
					if(!objdiv.is(":animated")){
						if(i<length-1){
							objdiv.eq(i).fadeOut(options.time,options.easing);	
							objdiv.eq(i+1).fadeIn(options.time,options.easing);	
							i++;										
						}else{
							objdiv.eq(i).fadeOut(options.time,options.easing);																	
							objdiv.eq(0).fadeIn(options.time,options.easing);	
							i=0;	
						}
					}
				}		
				var timer=setInterval(execute,options.stopTime);
				if(options.mouseStop==true){														
					objdiv.mouseover(function(){	
						clearInterval(timer);								
					}).mouseleave(function(){
						timer=setInterval(execute,options.stopTime);
					})
				}
			}
			return this;  //返回this，使方法可链。
		}
	});
})(jQuery);


//单条滚动新闻插件
//作者：闲闪小颜
//时间：2013-12-2
;(function($) {
	$.fn.extend({
		"newsScr":function(options){
			//设置默认值
			options=$.extend({
				easing:"jswing", //动画效果
				stopTime:4000, //停留时间
				time:800, //动画时间
				mouseStop:true,//鼠标经过停止     
				dri:0//方向0上，1下
			},options);
			
			 //插件实现代码 
			var obj=$(this); 
			var ul=obj.children("ul");
			var lis=ul.children("li");
			var length=lis.length;
			var height=lis.height();//滚动的高度
			lis.css("position","absolute");
			var i=0;
			if(length>1){
				if(options.dri==1){
					height=height*-1;
				}
				ul.css("position","relative").css("height",parseInt(height*length)).css("overflow","hidden");		
				lis.css("top",height).css("left",0).css("width",ul.width()).css("opacity",0);//全部至于底部
				lis.eq(0).css("top",0).css("opacity",1);	//初始显示第一条											
				
				function execute(){	
					lis.eq(i-1).css("top",height).css("opacity",0);	//上一条移动到底部											
					lis.eq(i).animate({top:-height,"opacity":0},options.time,options.easing);	//当前往上移动
					if(i+1<length){
						lis.eq(i+1).animate({top:0,"opacity":1},options.time,options.easing);	//后一条往上移动	
						i++;																						
					}else{																
						lis.eq(i).animate({top:-height,"opacity":0},options.time,options.easing);	//当前往上移动		
						lis.eq(0).animate({top:0,"opacity":1},options.time,options.easing);	//第一条显示												
						i=0;	
					}														
				}		
				
				var timer=setInterval(execute,options.stopTime);
				if(options.mouseStop==true){														
					obj.mouseover(function(){	
						clearInterval(timer);								
					}).mouseleave(function(){
						timer=setInterval(execute,options.stopTime);
					})
				}
			}
		}
	});
})(jQuery);		
			
//焦点图切换插件
//作者：闲闪小颜
//时间：2013-12-3
;(function($) {
	$.fn.extend({
		"imgFocus":function(options){
			//设置默认值
			options=$.extend({
				easing:"swing", //动画效果
				stopTime:3000, //停留时间
				time:600, //动画时间
				mouseStop:true//鼠标经过停止                
			},options);
			
			 //插件实现代码 
			var obj=$(this); 
			var ul=obj.children("ul");
			var li=ul.children("li");
			var length=li.length;
			var i=0;
			var txt="";
			if(length>1){
				//构建框架
				obj.css({"position":"relative","overflow":"hidden"});
				li.css({"position":"absolute","left":0,"top":0,"display":"none"});
				li.eq(0).css("display","block");
				var title=$("<div class='IFtitle' style='position:absolute;left:0;bottom:0; width:100%;height:27px; line-height:27px; overflow:hidden; color:#161616; padding:0 10px;'></div>");
				//透明背景
				var titleBg=$("<div style='position:absolute;left:0;bottom:0;height:27px;width:100%; background-color:#fff;'></div>");
				titleBg.css("opacity",0.5);
				//数字
				var num="<div class='IFnum' style='position:absolute;right:0;bottom:5px;height:17px; line-height:17px; overflow:hidden; text-align:right; z-index:1;'><ul>";
				for(var j=1;j<=length;j++){
					num=num+"<li style='width:17px; height:17px; line-height:17px; overflow:hidden; text-align:center; background-color:#fff; color:#333;cursor:pointer;margin-right:5px; float:left;'>"+j+"</li>";
				}
				num=num+"</ul></div>";
				obj.append(num);
				obj.append(titleBg);	
				obj.append(title);	
				obj.find(".IFtitle").html(li.eq(0).find("a").attr("data-title"));										
				
				obj.find(".IFnum li").bind("hover",function(){
					i=$(this).index();
					$(this).css({"background-color":"#99defb","color":"#333"}).siblings().css({"background-color":"#fff","color":"#2c9be4;"});
					li.eq(i).stop(true,true).fadeIn(options.time,options.easing).siblings().stop(true,true).fadeOut(options.time,options.easing);								
					txt=li.eq(i).find("a").attr("data-title");	
					obj.find(".IFtitle").html(txt);
				})
				function execute(){
					if(i<length-1){
						li.eq(i).fadeOut(options.time,options.easing);	
						li.eq(i+1).fadeIn(options.time,options.easing);	
						txt=li.eq(i+1).find("a").attr("data-title");
						i++;										
					}else{														
						li.eq(0).fadeIn(options.time,options.easing);	
						li.eq(i).fadeOut(options.time,options.easing);	
						txt=li.eq(0).find("a").attr("data-title");	
						i=0;	
					}
					obj.find(".IFtitle").html(txt);
					obj.find(".IFnum li").eq(i).css({"background-color":"#99defb","color":"#333"}).siblings().css({"background-color":"#fff","color":"#2c9be4;"});
				}		
				var timer=setInterval(execute,options.stopTime);
				if(options.mouseStop==true){														
					obj.mouseover(function(){	
						clearInterval(timer);								
					}).mouseleave(function(){
						timer=setInterval(execute,options.stopTime);
					})
				}
			}
			return this;  //返回this，使方法可链。
		}
	});
})(jQuery);

//递减淡出插件
//作者：闲闪小颜
//时间：2013-12-3
;(function($) {
	$.fn.extend({
		"decShow":function(options){
			//设置默认值
			options=$.extend({
				easing:"swing", //动画效果
				waitTime:80, //延迟时间
				time:700, //动画时间    
				dri:0 //0左边，1右边            
			},options);
			
			 //插件实现代码 
			var obj=$(this); 
			var ul=obj.children("ul");
			var li=ul.children("li");
			var length=li.length;
			var width=obj.width()+100;
			if(length>1){			
				if(options.dri==1){
					width=width*-1;
				}	
				ul.css({"position":"relative","overflow":"hidden"});								
				li.css({"position":"relative","left":-width,"opacity":0});
				li.each(function(index, element) {
					li.eq(index).delay((index+1)*options.waitTime).animate({"left":0,"opacity":1},options.time,options.easing);
				});
			}
		}
	});
})(jQuery);