window.onload = function(){
	//红心
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
	//图片切换
	var tabChange = document.getElementsByClassName("tab-change")[0];
	var banner = document.getElementsByClassName("banner")[0].getElementsByTagName("img")[0];
	tabChange.onclick = function(event){
		var li = tabChange.getElementsByTagName("li");
		var tar = event.target;
		if(tar.nodeName.toLowerCase() == "img"){
			var src = tar.getAttribute("src");
			banner.setAttribute("src",src);
			for(var i=0;i<li.length;i++){
				li[i].className = " ";
			}
			tar.parentNode.parentNode.className = "tab-active";
		}
		event.preventDefault();
	}
	//评论切换
	var commentTabLi = document.getElementsByClassName("comment-tab")[0].getElementsByTagName("li");
	var commentList = document.getElementsByClassName("comment-list");
	for(var i=0;i<commentTabLi.length;i++){
		commentTabLi[i].setAttribute("index",i);
		commentTabLi[i].onclick = function(){
			var index = this.getAttribute("index");
			for(var j=0;j<commentList.length;j++){
				commentList[j].style.display = "none";
				commentTabLi[j].getElementsByTagName("a")[0].className=" ";
			}
			commentList[index].style.display = "block";
			this.getElementsByTagName("a")[0].className = "comment-tab-active";
			return false;
		}
	}
	//关注按钮
	$(".attention").click(function(){
		var  attentionValue =  parseFloat($(".attention-result").text());
		if($(".attention").text() == "+ 关注"){
			$(".attention").text("取消关注");
			$(".attention-result").text(attentionValue+1);
		}else{
			$(".attention").text("+ 关注");
			$(".attention-result").text(attentionValue-1);
		}
	})
	// 随机数函数
	function selectFrom(lowerValue,uppervalue){
		var choices = uppervalue - lowerValue + 1;
		return Math.floor(Math.random()*choices+lowerValue);
	}
	//图片切换
	function imgChange(){
		var num = selectFrom(1,5);
		var imgSrc = "../images/changeImg/change"+num+".png";
		$(".guess img").attr("src",imgSrc);
	}
	function timeChange(){
		var timeValue=parseFloat($(".time").text());
		    timeValue -=1;
		 $(".time").text(timeValue);
		 if($(".time").text() == "-1"){
		 	imgChange();
		 	$(".time").text("5");
		 }
	}
	var timer=null;
	timer=setInterval(timeChange,1000);
	$(".click-change").click(function(){
		if(timer){
			clearInterval(timer);
			timer = null;
		}
		$(".time").text("5");
		imgChange();
		timer=setInterval(timeChange,1000);
	})
}