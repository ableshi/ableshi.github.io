$(document).ready(function(){
	var emailState=false,passwordState=false,userState=false;
	//邮箱检测
		$("#check-email").blur(function(){
			emailState = false;
		var value = $(this).val();
		var regexp = /^[0-9A-Za-z]{3,12}@(qq|sina|163|gmail).(com|cn|com.cn)$/;
		if (value==""){	
			$("#email-result").text("请输入邮箱").css("color","red");
			return;
		} 	
		if(regexp.test(value)){
				$("#email-result").text("输入正确").css("color","green");
				emailState = true;
		}else{
				$("#email-result").text("输入的格式错误").css("color","red");
		}
	})
		//密码检测
	var num=null;
	$("#check-password").blur(function(){
		var	password1 = $(this).val();
		var	regexp = /^[\S][^\s]{4,20}[\S]$/;
		if(password1==""){
			$("#password-result").text("请输入密码").css("color","red");
			return;
		}
		if(regexp.test(password1)){
			$("#password-result").text("密码输入正确").css("color","green");
			num = password1;
		}else{
			$("#password-result").text("密码格式错误").css("color","red");
		}
	})
	//第二次密码判断
	$("#check-password2").blur(function(){
		passwordState = false;
		var value = $(this).val();
		if(value===num){
			$("#password-result").text("两次密码正确").css("color","green");
			passwordState = true;
		}else{
			if(value==""){
				$("#password-result").text("请输入密码").css("color","red");
				return;
			}
			$("#password-result").text("两次密码不同").css("color","red");
		}
		num=null;
	})
	$("#check-user").blur(function(){
		userState = false;
		var userValue = $(this).val();
		var regexp = /^[\u4e00-\u9fa5\w_]{2,8}$/;
		if(regexp.test(userValue)){
			$("#user-result").text("输入正确").css("color","green");
			console.log(1);
			userState = true;
		}else{
			$("#user-result").text("输入错误").css("color","red");
		}
	})
	$("#submit").click(function(){
		if(emailState==true && passwordState==true && userState==true && $("#ready-rule").is(":checked")==true){
			alert("注册成功!");
		}else{
			alert("输入的信息有误!");
		}
	})
})