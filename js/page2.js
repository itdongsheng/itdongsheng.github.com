'use strict';
/*;(function(){
	addEvent(window,'DOMContentLoaded',function(){
		var oDiv=document.createElement('div');
		oDiv.innerHTML='<p>此页面图片较多，请耐心等待<strong>(3s自动关闭)</strong></p><span>3</span><i>关闭</i>';
		document.body.insertBefore(oDiv,1);
		var count=3;
		var oS=oDiv.children[1];
		var oClose=oDiv.children[2];
		var timer=setInterval(function(){
				count--;
				oS.innerHTML=count;
				if(count==0){
					oDiv.style.display='none';
					clearInterval(timer);
					bOk=false;
				}
			},1000);

		oClose.onclick=function(){
		oPen.style.display='none';
	}
	
	});



		

	
})();*/

addEvent(window,'load',function(){

nav(1);

var oPage=document.getElementById('page');
/* 轮播图*/
;(function(){
	var oBox=document.getElementById('banner');
	var oUl=oBox.children[0];
	var oOl=oBox.children[1];
	var oPrev=oBox.children[2];
	var oNext=oBox.children[3];
	var aLi=oUl.children;
	var aBtn=oOl.children;

	oUl.innerHTML+=oUl.innerHTML;  //先变成俩分
	oUl.style.width=aLi.length*aLi[0].offsetWidth+'px';  //设置ul的宽度
	var w=oUl.offsetWidth/2;			//定义变量w
	var iNow=0;
	var timer=null;
	oBox.onmouseover=function(){
		oPrev.style.display='block';
		oNext.style.display='block';
	};
	oBox.onmouseout=function(){
		oPrev.style.display='none';
		oNext.style.display='none';
	};
	for(var i=0;i<aBtn.length;i++){
		(function(index){
			aBtn[i].onmouseover=function(){
				
				if((iNow%aBtn.length==4||iNow%aBtn.length==-1)&&index%aBtn.length==0){
					iNow++;
				}
				if(iNow%aBtn.length==0&&index%aBtn.length==4){
					iNow--;
				}
				iNow=Math.floor(iNow/aBtn.length)*aBtn.length+index;
				tab();
			};
		})(i);
	}
	function tab(){
		for(var i=0;i<aBtn.length;i++){
			aBtn[i].className='';
		}
		if(iNow>0){
			aBtn[iNow%aBtn.length].className='on';
		}else{
			aBtn[(iNow%aBtn.length+aBtn.length)%aBtn.length].className='on';
		}
		startMove(oUl,-iNow*aLi[0].offsetWidth);
	
	}
	oPrev.onclick=function(){
		iNow--;
		tab();
	};
	oNext.onclick=function(){
		iNow++;
		tab();
	};
	var left = 0;
	function startMove(obj,iTarget){
		var start = left;
		var dis = iTarget-start;
		var count = Math.floor(700/30);
		var n= 0;
		clearInterval(timer);
		timer = setInterval(function(){
			n++;
			var a = 1-n/count;
			left = start+dis*(1-Math.pow(a,3));
			if(left<0){
				oUl.style.left = left%w+'px';
			}else{
				oUl.style.left = (left%w-w)%w+'px';
			}
			if(n==count){
				clearInterval(timer);
			}
		},30);
	}

})();
/* -------------------------------------------*/ 
//穿墙
	var scrollT=0;
	var scrollL=0;
		addEvent(window,'scroll',function(){
			scrollT=document.documentElement.scrollTop||document.body.scrollTop;
			scrollL=document.documentElement.scrollLeft||document.body.scrollLeft;
		});


var oSelect=document.getElementById('select');
;(function(){
  
  var oBox=document.getElementById('box');
  function getTop(obj){
  	var offSet=obj.offsetTop;
  	if(obj.offsetParent!=null) offSet+=getTop(obj.offsetParent);
  	return offSet;
  }
  function getLeft(obj){ 
	var offset=obj.offsetLeft; 
	if(obj.offsetParent!=null) offset+=getLeft(obj.offsetParent); 
	return offset; 
	} 
  function hoverDir(obj,oEvent){
    var x = getLeft(obj)+obj.offsetWidth/2-scrollL-oEvent.clientX;  
	var y = getTop(obj)+obj.offsetHeight/2-scrollT-oEvent.clientY;
	
	return Math.round((a2d(Math.atan2(y,x))+180)/90)%4;
  }
 function hoverGo(obj){
	//这个函数里面，var oS
	var oS = obj.children[0];
	obj.onmouseover=function(ev){
		var oEvent = ev||event;
		var oFrom = oEvent.fromElement||oEvent.relatedTarget;
		if(obj.contains(oFrom))return;
		var dir = hoverDir(obj,oEvent);//这里直接参数是oEvent，
		switch(dir){
			case 0:  //注意这里的是数字，而不是字符串，不需要加单引号
				oS.style.left = '230px';  //这里的上移直接就是字符串了
				oS.style.top = 0;
				break;
			case 1:
				oS.style.left = 0;
				oS.style.top = '230px';
				break;
			case 2:
				oS.style.left = '-230px';
				oS.style.top = 0;
				break;
			case 3:
				oS.style.left = 0;
				oS.style.top = '-230px';
				break;
		}
		startMove(oS,{top:0,left:0});  //注意逻辑，判断完方向以后就是运动
	};
	obj.onmouseout=function(ev){
		var oEvent = ev||event;
		var oTo = oEvent.toElement||oEvent.relatedTarget;
		if(obj.contains(oTo))return;  //处理onmouse的bug问题注意格式，死记住啊
		var dir = hoverDir(obj,oEvent);
		
		switch(dir){
			case 0:
				startMove(oS,{left:230,top:0});
				break;
			case 1:
				startMove(oS,{left:0,top:230});
				break;
			case 2:
				startMove(oS,{left:-230,top:0});
				break;
			case 3:
				startMove(oS,{left:0,top:-230});
				break;
		}
	};
}


  
  var aLi=oSelect.children;
  for(var i=0;i<aLi.length;i++){
    hoverGo(aLi[i]);
  }
})();
/*----------------------------------------*/
/*九宫格*/
;(function(){
	var oBox = document.getElementById('box_first');

	var aDiv = oBox.children;
	for(var i=0;i<aDiv.length;i++){
		changeSize(aDiv[i]);
	}
	
	function changeSize(obj){
		obj.onmousedown=function(ev){
			var oEvent = ev||event;
			oEvent.cancelBubble=true;
			var oldX = oEvent.clientX;
			var oldY = oEvent.clientY;
			var oldW = oBox.offsetWidth;
			var oldH= oBox.offsetHeight;
			var oldL = oBox.offsetLeft;
			var oldT = oBox.offsetTop;
			document.onmousemove=function(ev){
				var oEvent = ev||event;
				if(obj.className.indexOf('r')!=-1){
					oBox.style.width=oldW+(oEvent.clientX-oldX)+'px';
				}
				if(obj.className.indexOf('b')!=-1){
					oBox.style.height = oldH+(oEvent.clientY-oldY)+'px';
				}
				if(obj.className.indexOf('l')!=-1){
					oBox.style.width = oldW-(oEvent.clientX-oldX)+'px';
					oBox.style.left = oldL+(oEvent.clientX-oldX)+'px';
				}
				if(obj.className.indexOf('t')!=-1){
					oBox.style.height = oldH-(oEvent.clientY-oldY)+'px';
					oBox.style.top = oldT+(oEvent.clientY-oldY)+'px';
				}
			};
			document.onmouseup=function(){
				document.onmousemove=null;
				document.onmouseup=null;
				obj.releaseCapture&&obj.releaseCapture();
			};
			obj.setCapture&&obj.setCapture();
			return false;
		};
	}
	oBox.onmousedown=function(ev){
		var oEvent = ev||event;
		var disX = oEvent.clientX-oBox.offsetLeft;
		var disY = oEvent.clientY-oBox.offsetTop;
		
		function fnMove(ev){
			var oEvent = ev||event;
			oBox.style.left = oEvent.clientX-disX+'px';
			oBox.style.top = oEvent.clientY-disY+'px';
		}

		function fnUp(){
				removeEvent(document,'mousemove',fnMove);
				removeEvent(document,'mouseup',fnUp);
		}
		addEvent(document,'mousemove',fnMove);
		addEvent(document,'mouseup',fnUp);
		oEvent.preventDefault();
	};


})();
/*-------------------------*/
/*3d拖拽*/
;(function(){
	var oUC = document.getElementById('ul_container');
	var aLi = oUC.children;
	var x = 0;
	var y = 0;
	document.onmousedown=function(ev){
		var oEvent = ev||event;
		var disX = oEvent.clientX-x;
		var disY = oEvent.clientY-y;
		document.onmousemove=function(ev){
			var oEvent = ev||event;
			x = oEvent.clientX-disX;
			y = oEvent.clientY-disY;
			
			for(var i=0;i<aLi.length;i++){
				aLi[i].style.marginLeft=x*aLi[i].style.zIndex/20+'px';
				aLi[i].style.marginTop=y*aLi[i].style.zIndex/20+'px';
			}
		};
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			document.releaseCapture&&document.releaseCapture();
		};
		document.setCapture&&document.setCapture();
		return false;
	};
})();

/*----------------------------------*/
/*圆的拖拽*/
	

;(function(){

	var oCircle=document.getElementById('circle');
	var oDrag=getByClass(oCircle,'drag_four')[0];
	var oMove=getByClass(oCircle,'move_four')[0];
	var oBar=oDrag.children[0];
	var oStrong=oDrag.children[1];
	var oS=oMove.getElementsByTagName('span')[0];	

	var R=201;

	oBar.onmousedown=function(ev){
			var oEvent=ev||event;
			var disX=oEvent.clientX-oBar.offsetLeft;
			//var disY=oEvent.clientY-oBar.offsetTop;
			function fnMove(ev){
				var oEvent=ev||event;
				var l=oEvent.clientX-disX;
				//var t=oEvent.clientY-disY;

				if(l<0){
					l=0;
				}else if(l>oDrag.offsetWidth-oBar.offsetWidth){
					l=oDrag.offsetWidth-oBar.offsetWidth
				}
				var scal=l/(oDrag.offsetWidth-oBar.offsetWidth);
				oStrong.innerHTML=parseInt(scal*100)+'%';
				oBar.style.left=l+'px';
				//oBar.style.top=t+'px';
				var l2=R+Math.sin(scal*360*Math.PI/180)*R;
				var t2=R-Math.cos(scal*360*Math.PI/180)*R;

				oS.style.left=l2+'px';
				oS.style.top=t2+'px';
			}
			function fnUp(ev){
				
				removeEvent(document,'mousemove',fnMove);
				removeEvent(document,'mouseup',fnUp);
			}
			addEvent(document,'mousemove',fnMove);
			addEvent(document,'mouseup',fnUp);
			oEvent.preventDefault;
	};

})();
/*------------------*/
/*放大镜*/
;(function(){
	var oS = document.getElementById('s');
	var oB = document.getElementById('b');
	var oM = document.getElementById('m');
	var oImg = oB.children[0];
	oS.onmouseover=function(){
		oM.style.display='block';
		oB.style.display='block';
	};
	oS.onmouseout=function(){
		oM.style.display='none';
		oB.style.display='none';
	};
	oS.onmousemove=function(ev){
		var oEvent = ev||event;
		var l = oEvent.clientX-getLeft(oS)-oM.offsetWidth/2;
		var t = oEvent.clientY-getTop(oS)-oM.offsetHeight/2;
		if(l<0){
			l=0;
		}else if(l>oS.offsetWidth-oM.offsetWidth){
			l=oS.offsetWidth-oM.offsetWidth;
		}
		if(t<0){
			t=0;
		}else if(t>oS.offsetHeight-oM.offsetHeight){
			t=oS.offsetHeight-oM.offsetHeight;
		}
		oM.style.left = l+'px';
		oM.style.top = t+'px';
		oImg.style.left = -l/(oS.offsetWidth-oM.offsetWidth)*(oImg.offsetWidth-oB.offsetWidth)+'px';
		oImg.style.top = -t/(oS.offsetHeight-oM.offsetHeight)*(oImg.offsetHeight-oB.offsetHeight)+'px';
	};
})();
/*---------------------*/
/*拍卖倒计时*/
;(function(){

	var oBox = document.getElementById('count');
	var oP = oBox.getElementsByTagName('p')[0];
	var oSpan = oBox.getElementsByTagName('span')[0];
	var aStatus = ['即将拍卖','正在拍卖'];
	var aTime = [5,360];
	var startTime = aTime[0]+1;
	var timer = null;
	oP.innerHTML=aStatus[0];
	function countDown(){
		startTime--;
		var m = parseInt(startTime/60);
		var s = startTime%60;
		
		oSpan.innerHTML=toDou(m)+':'+toDou(s);
		if(startTime==0){
			clearInterval(timer);
			oP.innerHTML=aStatus[1];
			var startTime2 = aTime[1]+1;
			setInterval(function(){
				startTime2--;
				var m = parseInt(startTime2/60);
				var s = startTime2%60;
				oSpan.innerHTML=toDou(m)+':'+toDou(s);
				
			},1000);
		}
	}
	countDown();
	timer = setInterval(countDown,1000);
})();

/*滚轮*/
;(function(){
	var oDiv=document.getElementById('pig');
	var oImg=oDiv.children[0];
	addWheel(oDiv,function(dir,oEvent){
		var scaleX = (oEvent.clientX-oImg.offsetLeft)/oImg.offsetWidth;
		var scaleY = (oEvent.clientY-oImg.offsetTop)/oImg.offsetHeight;
		if(dir){
			//放大
			oImg.style.width=oImg.offsetWidth+10+'px';
			oImg.style.height=oImg.offsetHeight+10+'px';
		}else{
			//缩小
			oImg.style.width=oImg.offsetWidth-10+'px';
			oImg.style.height=oImg.offsetHeight-10+'px';
		}
		oImg.style.left = oEvent.clientX-scaleX*oImg.offsetWidth+'px';
		oImg.style.top = oEvent.clientY-scaleY*oImg.offsetHeight+'px';
		
		
		
	});
})();
/*-----------------------*/
/*右键各种操作*/
;(function(){
	var oContentMenu=document.getElementById('content_menu');
	var oM=document.getElementById('menu');
	var aP=oContentMenu.getElementsByTagName('p');
	var aItem=oM.children;
	var oNow=null;
	for(var i=0;i<aP.length;i++){
		aP[i].oncontextmenu=function(ev){

			var oEvent=ev||event;
			oNow=this;
			oM.style.left=oEvent.clientX+'px';
			oM.style.top=oEvent.clientY+'px';

			oM.style.display='block';
			return false;
		}

	}
	document.onclick=function(){
		oM.style.display='none';
	};
	for(var i=0;i<aItem.length;i++){
		aItem[i].onmouseover=function(){
			this.style.background='blue';
		};
		aItem[i].onmouseout=function(){
			this.style.background='#f1f1f1';
		};
		aItem[0].onclick=function(){
		window.location.reload();
	};
	aItem[1].onclick=function(){
		oNow.parentNode.removeChild(oNow);
	};
	aItem[2].onclick=function(){
		oNow.style.background='red';
	};
	aItem[3].onclick=function(){
		oNow.style.background='green';
	};
	aItem[4].onclick=function(){
		oNow.style.background='pink';
	};
	}
})();
/*-------------------*/
/*无限运动的小球*/

;(function(){

	var oBall=document.getElementById('ball');
	var oBox=oBall.children[1];

	var iSpeedX = 0;
	var iSpeedY = 0;
	var lastX = 0;      //定义lastX=0；
	var lastY = 0;
	var timer = null;
	
	oBox.onmousedown=function(ev){

		clearInterval(timer);
		var oEvent = ev||event;
		var disX = oEvent.clientX-oBox.offsetLeft;
		var disY = oEvent.clientY-oBox.offsetTop;
		

		function fnMove(ev){

			var oEvent =ev||event;
			oBox.style.left = oEvent.clientX-disX+'px';
			oBox.style.top = oEvent.clientY-disY+'px';
			iSpeedX = oEvent.clientX-lastX;        //move的时候，获得速度，速度就是鼠标移动的时候，坐标减去坐标
			iSpeedY = oEvent.clientY-lastY;
			lastX = oEvent.clientX;				//然后再把当前的坐标给了 lastX,lastY
			lastY = oEvent.clientY;
		}
		function fnUp(){
			move();
			removeEvent(document,'mousemove',fnMove);
			removeEvent(document,'mouseup',fnUp);
		}
		addEvent(document,'mousemove',fnMove);
		addEvent(document,'mouseup',fnUp);
		oEvent.preventDefault();
	};
	
	
	
	
	
	function move(){
		clearInterval(timer);
		timer = setInterval(function(){
			iSpeedY+=3;          //只有clientY,这也是日常道理，重力的作用
			var l = oBox.offsetLeft+iSpeedX;
			var t = oBox.offsetTop+iSpeedY;
			if(t>=document.documentElement.clientHeight-oBox.offsetHeight){
				t=document.documentElement.clientHeight-oBox.offsetHeight;
				iSpeedY*=-0.8;
				iSpeedX*=0.8;
			}
			if(t<0){
				t=0;
				iSpeedY*=-0.8;
				iSpeedX*=0.8;
			}
			if(l>=document.documentElement.clientWidth-oBox.offsetWidth){
				l=document.documentElement.clientWidth-oBox.offsetWidth;
				iSpeedX*=-0.8;
				iSpeedY*=0.8;
			}
			if(l<0){
				l=0;
				iSpeedX*=-0.8;
				iSpeedY*=0.8;
			}
			oBox.style.left = l+'px';
			oBox.style.top = t+'px';
			if(Math.abs(iSpeedX)<1)iSpeedX=0;
			if(Math.abs(iSpeedY)<1)iSpeedY=0;
			if(iSpeedX==0&&iSpeedY==0&&t==document.documentElement.clientHeight-oBox.offsetHeight){
				clearInterval(timer);
			}
		},30);

	}

})();

/*苹果菜单拖拽*/
;(function(){
	var oPhone=document.getElementById('phone');
	var aImg=oPhone.children;
	addEvent(document,'mousemove',function(ev){

		var oEvent = ev||event;
		for(var i=0;i<aImg.length;i++){

			var a = oPhone.offsetLeft+aImg[i].offsetLeft+aImg[i].offsetWidth/2-oEvent.clientX;
			var b = oPhone.offsetTop+aImg[i].offsetTop+aImg[i].offsetHeight/2-oEvent.clientY;
			var c = Math.sqrt(a*a+b*b);
			var scale = 1-c/500
			if(scale<0.5)scale=0.5;
			
			aImg[i].width=scale*128;
		}
	})
	

})();

/*-----------------------------*/
/*倒计时*/

/*九个穿墙的点击*/
;(function(){
	var aDiv=oSelect.getElementsByTagName('div');
	var oInmore=document.getElementById('in_more');
	var aLi=oInmore.children;

	for(var i=0;i<aDiv.length;i++){
		aDiv[i].index=i;
		aDiv[i].onclick=function(){
			for(var i=0;i<aDiv.length;i++){
				aLi[i].style.display='none';
			}		

			aLi[this.index].style.display='block';
			var oI=aLi[this.index].getElementsByTagName('i')[0];

			oI.onclick=function(){
				this.offsetParent.style.display='none';
			};
		}
	}
})();
/*---------------------------------------*/
/*猫*/
	;(function(){
	var oPlay=document.getElementById('play');
	var aLi = oPlay.getElementsByTagName('li');
	var oneW = aLi[0].offsetWidth;
	var defaultW = 40;
	
		//布局
	for(var i=1;i<aLi.length;i++){
		//第一张一直都在开始的位置，所以不应管第一张，所以i从1开始
		aLi[i].style.left = oneW-(aLi.length-i)*defaultW+'px'
		/*i       left       
		0 600   0        
		1 600 	600-160 (5-1)*40
		2		600-120 (5-2)*40
		3		600-80  (5-3)*40*/

	}
	for(var i=0;i<aLi.length;i++){
		(function(index){
			aLi[i].onmouseover=function(){
				for(var i=0;i<aLi.length;i++){
					if(i<=index){
						//aLi[i].style.left = i*defaultW+'px';
						startMove(aLi[i],{left:i*defaultW});
					}else{
						//aLi[i].style.left = oneW-(aLi.length-i)*defaultW+'px';
						startMove(aLi[i],{left:oneW-(aLi.length-i)*defaultW});
					}
				}
			};
		})(i);
	}

	})();
/*---------------------------*/
/*汽车左右拖拽开始*/
;(function(){
	var oCar=document.getElementById('car');
	var oUl=oCar.getElementsByTagName('ul')[0];
	var aLi=oUl.children;
	var aImg=oUl.getElementsByTagName('img');
	var w=aLi[0].offsetWidth;

	var divC=oCar.offsetWidth/2;

	oUl.style.width=aLi.length*w+'px';
	oUl.onmousedown=function(ev){
		var oEvent=ev||event;
		var disX=oEvent.clientX-oUl.offsetLeft;
		
		

		function fnMove(ev){
			var oEvent=ev||event;
			var l=oEvent.clientX-disX;
			if(l>divC-(0+0.5)*w){
				l=divC-(0+0.5)*w;
			}else if(l<divC-(aLi.length-1+0.5)*w){
				l=divC-(aLi.length-1+0.5)*w;
			}
			oUl.style.left=l+'px';
			changeSize();
		}
		function fnUp(){
				removeEvent(document,'mousemove',fnMove);
				removeEvent(document,'mouseup',fnUp);
		}
		addEvent(document,'mousemove',fnMove);
		addEvent(document,'mouseup',fnUp);
		oEvent.preventDefault();

	};
	function changeSize(){
		for(var i=0;i<aLi.length;i++){
			var l = Math.abs(divC-(oUl.offsetLeft+aLi[i].offsetLeft+aLi[i].offsetWidth/2));
			var scale = 1-l/500;
			if(scale<0.5)scale=0.5;
			aImg[i].style.width=scale*520+'px';
			aImg[i].style.height=scale*360+'px';
			aImg[i].style.marginLeft=-(aImg[i].offsetWidth-260)/2+'px';
			aImg[i].style.marginTop=-(aImg[i].offsetHeight-180)/2+'px';
			aLi[i].style.zIndex=scale*100000;
		}
	}

})();
/*汽车左右拖拽结束*/
/*分页开始*/
;(function(){
	var oServe=document.getElementById('serve');
	var oBtn=oServe.getElementsByTagName('p')[0];
	var aLi=oServe.getElementsByTagName('li');
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
	}
	//布局转换
	var aPos = [];
	for(var i=0;i<aLi.length;i++){
		aPos.push({t:aLi[i].offsetTop,l:aLi[i].offsetLeft});
	}
	for(var i=0;i<aLi.length;i++){
		aLi[i].style.left = aPos[i].l+'px';
		aLi[i].style.top = aPos[i].t+'px';
		aLi[i].style.position='absolute';
		aLi[i].style.margin=0;
	}
	
	var timer = null;
	var bOk = false;                 //开关，开始是假的
	oBtn.onclick=function(){
		if(bOk)return ;				//真的返回，不继续往下执行
		bOk=true;					//为的就是快速连续点击，，继续执行，
		var i = 0;
		timer = setInterval(function(){
			(function(index){
				startMove(aLi[i],{left:0,top:0,width:0,height:0,opacity:0},{end:function(){
					if(index==aLi.length-1){
						//放出来。
						i = aLi.length-1;
						timer = setInterval(function(){
							(function(index){
								aLi[index].style.background='rgb('+rnd(0,256)+','+rnd(0,256)+','+rnd(0,256)+')';
								startMove(aLi[index],{left:aPos[index].l,top:aPos[index].t,width:150,height:150,opacity:1},{end:function(){
									if(index==0){
										bOk=false;       //执行完一遍后，最后变成假的 这个开关判断诗写在第二个执行完毕的函数end里
									}
								}});
							})(i);
							i--;
							if(i==-1){
								clearInterval(timer);
							}
						},100);
					}
				}});
			})(i);
			i++;
			if(i==aLi.length){
				clearInterval(timer);
				//alert('over'); 不行
			}
		},100);
	};
})();
/*分页结束*/



});











