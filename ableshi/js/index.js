window.onload=function(){
    var ul = document.getElementById("ul");
    var pic = document.getElementById("pic");
    var inner = document.getElementById("inner");
    var li = document.getElementById("ul").getElementsByTagName("a");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var index = 1;
    var timer = null;
    //设置一个变量来存放自动轮播定时器
    var timer2 = null;
    var state = false;
    prev.onclick = function(event){
        if(state){
            return;
        }
        animate(940);
        if(index==1){
            index=4;
        }else{
            index--;
        }
        showButton();
        event.preventDefault();
    }
    next.onclick = function(){
        if(state){
            return;
        }
        animate(-940);
        if(index==4){
            index=1;
        }else{
            index++;
        }
        showButton();
        return false;
    }

    function animate(offset){
        state = true;
        var time = 200;
        var interval = 10;
        var speed = offset/(time/interval);
        var newLeft = parseInt(inner.style.left) + offset;
        function go(){
            clearInterval(timer);
            if((speed < 0 && parseInt(inner.style.left) > newLeft) || (speed > 0 && parseInt(inner.style.left)) < newLeft){
                inner.style.left = parseInt(inner.style.left) + speed + "px";
                timer=setInterval(go,interval);
            }else{
                state = false;
                inner.style.left = newLeft + "px";
                if(parseInt(inner.style.left) < -3760){
                inner.style.left = -940 + "px";
                }
                if(parseInt(inner.style.left) > -940){
                inner.style.left = -3760 + "px";
                }
            }
        }
        go();    
    }

    function showButton(){
        for(var i=0;i<li.length;i++){
            if(li[i].className=="active"){
                removeClass(li[i],"active");
                break;
            }
        }
        addClass(li[index-1],"active");
    }

        ul.onclick=function(event){
            var tar = event.target;
            if(tar.nodeName.toLowerCase() == "a"){
            var id = parseInt(tar.getAttribute("id"));
            var offset = (id-index) * -940;
            if(state){
            return;
            }    
            animate(offset);
            index = id;
            showButton();
            }
            event.preventDefault();
        }

    //通过定时器来不断的点击 next按钮 来实现轮播效果.
    function play(){
        timer2 = setInterval(function(){
            next.onclick();
        },3000);
    }
    //停止轮播函数，清除定时器
    function stop(){
        clearInterval(timer2);
    }
    //给.pic添加移进悬浮和移出事件
    pic.onmouseover = stop;
    pic.onmouseout = play;
    //第一次访问页面开始轮播
    play();


    //红心点击事件
    var like = document.getElementsByClassName("like")
    for(var i=0;i<like.length;i++){
        like[i].onclick = function(event){
            var value = parseFloat(this.getElementsByTagName("span")[0].innerHTML);
            var className = this.className;
            if(className.indexOf("red")<0){
                addClass(this,"red");
                this.getElementsByTagName("span")[0].innerHTML = value+1;
            }else{
                removeClass(this,"red");
                this.getElementsByTagName("span")[0].innerHTML = value-1;
            }
        }
    }

    var img = document.getElementsByClassName("share-clothing")[0].getElementsByTagName("img");
    var img2 = document.getElementsByClassName("clothing")[0].getElementsByTagName("img");
    for(var i = 0;i<img.length;i++){
        img[i].onclick = function(){
            window.location.href = "pages/listPage.html";
        }
        img2[i].onclick = function(){
            window.location.href = "pages/listPage.html";
        }
    }


}




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