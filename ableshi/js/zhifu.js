window.onload = function(){
	function selectAddress(){
		var addressUl = document.getElementsByClassName("address")[0].getElementsByTagName("ul")[0];
	for(var i=0,li=addressUl.getElementsByTagName("li");i<li.length;i++){
		li[i].onclick = function(){
			for(var i=0,li=addressUl.getElementsByTagName("li");i<li.length;i++){
				li[i].className = "";
				li[i].getElementsByClassName("changeAddress")[0].innerHTML = "";
			}
			this.className = "address-active";
			this.getElementsByClassName("changeAddress")[0].innerHTML = "修改本地址";
			this.getElementsByTagName("input")[0].checked = true;
		var checkAddress = this.getElementsByClassName("check-address")[0].innerHTML;
		document.getElementsByClassName("end-address")[0].innerHTML = checkAddress;
		}
	}
	}
	selectAddress();
	
	var allCommodity = document.getElementsByClassName("now-commodity");
	//总价函数	
	function count(){
		var nowCount = document.getElementsByClassName("now-count");
		var countNum = 0;
		for(var i=0;i<allCommodity.length;i++){
			if(allCommodity[i].getElementsByClassName("check-commodity")[0].checked == true){
				countNum = countNum + parseFloat(nowCount[i].innerHTML);
			}
		}
		document.getElementsByClassName("submit-money")[0].getElementsByTagName("span")[2].innerHTML=countNum.toFixed(2);
	}

	var checkCommodity = document.getElementsByClassName("check-commodity");
	//复选框点击事件
	for(var j=0;j<checkCommodity.length;j++){
		checkCommodity[j].onclick = function(){
			count();
		}
	}
	//小计函数
	function nowCount(obj){
		var totalPrices = parseFloat(obj.getElementsByClassName("total-prices")[0].getElementsByTagName("span")[0].innerHTML);
		var freight = parseFloat(obj.getElementsByClassName("freight")[0].getElementsByTagName("span")[0].innerHTML);
		var num = 0;
		num = totalPrices+freight;
		obj.getElementsByClassName("now-count")[0].innerHTML = num.toFixed(2);
	}
	var countNum2 = document.getElementsByClassName("count-num");
	//刷新页面跟新每个商品的总价
	for(var i=0;i<allCommodity.length;i++){
		//给每个商品计算优惠价格
		disCount(allCommodity[i]);
		//快递价格；
		freightCount(allCommodity[i]);
		//给每个复选框选中;
		allCommodity[i].getElementsByClassName("check-commodity")[0].checked = true;
		//当前商品的总计
		nowCount(allCommodity[i]);
		//文本框失焦事件；
		countNum2[i].oninput= function(){
			var value = this.value;
			var resexp = /^[0-9]*[1-9][0-9]*$/;
			if(resexp.test(value)){
				disCount(this.parentNode.parentNode.parentNode.parentNode);
				nowCount(this.parentNode.parentNode.parentNode.parentNode);
				count();
			}else{
				this.value = "1";
				alert("请输入正确的数量");
			}
			
		}
		//加减添加委托事件；
		allCommodity[i].onclick = function(event){
			var tar = event.target;
			var tarClass = tar.className;
			switch (tarClass){
				case "reduce":
				var num2 = parseFloat(tar.parentNode.getElementsByClassName("count-num")[0].value);
				if(num2>1){
					num2-=1;
				}
				tar.parentNode.parentNode.parentNode.getElementsByClassName("check-commodity")[0].checked=true;
				event.preventDefault();
				tar.parentNode.getElementsByClassName("count-num")[0].value = num2;
				disCount(tar.parentNode.parentNode.parentNode.parentNode);
				nowCount(tar.parentNode.parentNode.parentNode.parentNode);
				count();
				break;

				case "add":
				var num2 = parseFloat(tar.parentNode.getElementsByClassName("count-num")[0].value);
				num2+=1;
				tar.parentNode.parentNode.parentNode.getElementsByClassName("check-commodity")[0].checked=true;
				event.preventDefault();
				tar.parentNode.getElementsByClassName("count-num")[0].value = num2;
				disCount(tar.parentNode.parentNode.parentNode.parentNode);
				nowCount(tar.parentNode.parentNode.parentNode.parentNode);
				count();
				break;
			}
		}
		//所有商品的总计
		count();
	}
	//优惠后价格函数
	function disCount(obj){
		var num3 = parseFloat(obj.getElementsByClassName("discount-select")[0].value);
		var oldMoney = parseFloat(obj.getElementsByClassName("oldMoney")[0].innerHTML);
		var num = parseFloat(obj.getElementsByClassName("count-num")[0].value);
		var num4 = num3*oldMoney*num;
		obj.getElementsByClassName("total-prices")[0].getElementsByTagName("span")[0].innerHTML = num4.toFixed(2);
	}
	//运费函数
	function freightCount(obj){
		var freightValue = parseFloat(obj.getElementsByClassName("freight-select")[0].value);
		obj.getElementsByClassName("freight")[0].getElementsByTagName("span")[0].innerHTML = freightValue.toFixed(2);
	}
	//select事件
	var discountSelect = document.getElementsByClassName("discount-select");
	var freightSelect = document.getElementsByClassName("freight-select");
	for(var i=0;i<discountSelect.length;i++){
		discountSelect[i].onchange = function(){
			disCount(this.parentNode.parentNode.parentNode);
			nowCount(this.parentNode.parentNode.parentNode);
			count();
		}
		freightSelect[i].onchange = function(){
			freightCount(this.parentNode.parentNode.parentNode);
			disCount(this.parentNode.parentNode.parentNode);
			nowCount(this.parentNode.parentNode.parentNode);
			count();
		}
	}

}