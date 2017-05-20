$(".submit").click(function(){
	if($("#check-user").val() == false && $("#check-password").val() == false){
		alert("请输入账号和密码");
	}
})