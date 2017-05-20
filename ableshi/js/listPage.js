window.onload = function(){
	function addClass(element,name){
			if(element.className == ""){
				element.className = name;
			}else{
				var oldClass = element.className;
				var regexp = new RegExp(name);
				if(!regexp.test(oldClass)){
				element.className = element.className+" "+name;
				}
			}

		}
	function removeClass(element,name){
			if(element.className == name){
				element.className = "";
			}else{
				var oldClass = element.className;
				var arr = oldClass.split(" ");
				var newArr=arr.filter(function(num){
					return num != name;
				});
				var newClass=newArr.join(" ");
				element.className = newClass;

			}
		}
	//nav切换功能
	var li = document.getElementsByClassName("shop-nav-ul")[0].getElementsByTagName("li");
	for(var i=0;i<li.length;i++){
		li[i].setAttribute("index",i);
		li[i].getElementsByTagName("a")[0].onclick = function(event){
			var index = this.parentNode.getAttribute("index");
			var shopList = document.getElementsByClassName("shop-list");
			for(var j=0;j<li.length;j++){
				removeClass(li[j],"shop-nav-active");
				removeClass(li[j].getElementsByTagName("a")[0],"red");
				shopList[j].style.display = "none";
			}
			addClass(this.parentNode,"shop-nav-active");
			addClass(this,"red");
			shopList[index].style.display = "block";
			event.preventDefault();
		}
	}
	//爱心变色
	var like =document.getElementsByClassName("like")[0];
	var state = true;
	like.onclick = function(event){
		var aixin = document.getElementsByClassName("aixin")[0];
		var num = parseFloat(document.getElementsByClassName("result")[0].innerHTML);
		if(state){
			aixin.style.color = "red";
			num+=1;
			state = false;
		}else{
			aixin.style.color = "white";
			num-=1;
			state = true;
		}
		document.getElementsByClassName("result")[0].innerHTML=num;
		event.preventDefault();
	}
	$(".btn1 a").click(function(){
		$(".btn1 a").attr("class"," ");
		$(this).attr("class","btn-active");
	})
	$(".btn2 a").click(function(){
		$(".btn2 a").attr("class"," ");
		$(this).attr("class","btn-active");
	})
	$(".btn3 a").click(function(){
		$(".btn3 a").attr("class"," ");
		$(this).attr("class","btn-active");
	})
	//图片全部指向商品详情页	
	$(".publick-list .describe img").click(function(){
			window.location.href = "detailPage.html";
		})

}

