		var oList = document.getElementById('ul');
		var aLi = oList.getElementsByTagName('li');
		var btn1 = document.getElementById('btn1');
		var Left = document.getElementById('left');
		var Right = document.getElementById('right');
		var Aa = document.getElementsByTagName('a');
		var Img = document.getElementsByTagName('img');
		var Num = 0;
		var arrImg = [];
		var imgLen = 25;
		var Onoff = true;
		for(var i = 0;i<imgLen;i++){
			arrImg.push('相册_files/'+i+'.jpg');
		}
		for(var i=0;i<imgLen;i++){
			createLi(i);
			norolego(aLi[i]);
			aLi[i].style.transition = "0.6s";
		}
		btn1.onclick = function(){
			if(Onoff){
				for(var i=0;i<imgLen;i++){
					rolego(aLi[i],i);
					
				}
				Onoff = false;
			}else{
				for(var i=0;i<imgLen;i++){
					norolego(aLi[i]);
					drag(aLi[i]);
				}
				Onoff = true;
			}			
		}
		Left.onclick = function(){
			Num--;
			if(Num < 0){
				Num = 24;
			}
			for(var i=0;i<imgLen;i++){
				aLi[i].style.backgroundImage = 'url('+ arrImg[Num%25] +')';
				aLi[i].style.backgroundPosition = -i%5*aLi[0].offsetWidth +'px '+ -Math.floor(i/5)*aLi[0].offsetHeight+'px';
			}
		}
		Right.onclick = function(){
			Num++;
			for(var i=0;i<imgLen;i++){
				aLi[i].style.backgroundImage = 'url('+ arrImg[Num%25] +')';
				aLi[i].style.backgroundPosition = -i%5*aLi[0].offsetWidth +'px '+ -Math.floor(i/5)*aLi[0].offsetHeight+'px';
			}
		}
	/*创建li*/
	function createLi(n){
		var oLi = document.createElement('li');
		var span = document.createElement('span');
		var a = document.createElement('a');
		var img = document.createElement('img');
		oLi.index = n;
		a.href = "javascript:";
		img.src = arrImg[n];
		// oLi.style.backgroundImage = 'url('+ arrImg[n] +')';
		span.appendChild(a);
		span.appendChild(img);
		oLi.appendChild(span);
		oLi.onmouseover = function(){
			oLi.style.transform = "scale(1.2,1.2)";
			oLi.style.zIndex = "20";
		}
		oLi.onmouseout = function(){
			oLi.style.transform = "rotate(" + (Math.random()*(Math.random()>0.5?1:-1)*30) +"deg)";
			oLi.style.zIndex = "";
		}
		oLi.ondblclick = function(){
			if(Onoff){
				Left.style.display = "block";
				Right.style.display = 'block';
				for(var i=0;i<imgLen;i++){
					 aLi[i].index = i
					rolego(aLi[i],i);
					cleardrag(aLi[i]);
					Img[i].style.display = 'none';
					for(var j=0;j<imgLen;j++){
						aLi[j].style.backgroundImage = 'url('+ arrImg[this.index] +')';
						aLi[j].style.backgroundPosition = -j%5*aLi[0].offsetWidth +'px '+ -Math.floor(j/5)*aLi[0].offsetHeight+'px';
						Num = this.index;
					}
				}
				Onoff = false;
			}else{
				for(var i=0;i<imgLen;i++){
					norolego(aLi[i]);
					drag(aLi[i]);
					Img[i].style.display = 'block';
					Left.style.display = "none";
					Right.style.display = 'none';
				}
				Onoff = true;
			}			
		}
		oList.appendChild(oLi);
		drag(oLi);	
	}
	function drag(obj){
			obj.onmousedown = function(ev){
			var ev = ev || event;
			var disX = ev.clientX - obj.offsetLeft;
			var disY = ev.clientY - obj.offsetTop;
			obj.style.transition = "0s";
			document.onmousemove = function(ev){
				var ev = ev || event;
				if(ev.clientX - disX < 0){
					obj.style.left = '0px';
				}else if(ev.clientX - disX > document.documentElement.clientWidth-obj.offsetWidth  ){
					obj.style.left = document.documentElement.clientWidth-obj.offsetWidth  + 'px';
				}else{
					obj.style.left = ev.clientX - disX +'px';
				}
				if(ev.clientY - disY < 0){
					obj.style.top = '0px';
				}else if(ev.clientY - disY > document.documentElement.clientHeight-obj.offsetHeight  ){
					obj.style.top = document.documentElement.clientHeight-obj.offsetHeight  + 'px';
				}else{
					obj.style.top = ev.clientY - disY +'px';
				}				
			}
			document.onmouseup = function(){
					document.onmousemove = document.onmouseup = null;
					obj.style.transition = "0.6s";
				}
			return false;
		}
	}
	function cleardrag(obj){
		obj.onmousedown =function(){return false;}
		document.onmousemove = null;
		document.onmouseup = null;
	}
	function norolego(obj){
		var maxL = oList.offsetWidth - aLi[0].offsetWidth;
			var maxT = oList.offsetHeight - aLi[0].offsetHeight;
			var L = Math.floor( Math.random()*maxL);
			var T = Math.floor(Math.random()*maxT);
			var rotate = Math.floor(Math.random()*36)*Math.pow(-1,Math.floor(Math.random()*1000));
			obj.style.left = L + 'px';
			obj.style.top = T + 'px';
			obj.style.webkitTransform = 'rotate('+rotate+'deg)';
			obj.onmouseover = function(){
			obj.style.transform = "scale(1.2,1.2)";
			obj.style.zIndex = "20";
		}
		obj.onmouseout = function(){
			obj.style.transform = "rotate(" + (Math.random()*(Math.random()>0.5?1:-1)*30) +"deg)";
			obj.style.zIndex = "";
		}
	}
	function rolego(obj,n){
		obj.style.webkitTransform = '';
		obj.style.left = oList.offsetWidth/4 + (n%5)*aLi[0].offsetWidth + 'px';
		obj.style.top = oList.offsetHeight/4 + Math.floor(n/5)*aLi[0].offsetHeight + 'px';
		obj.onmouseover = null;
		obj.onmouseout=null;
	}