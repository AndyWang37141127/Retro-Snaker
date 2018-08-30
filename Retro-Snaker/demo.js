var key = 0, 
lock = true,
arr,      
food,
direction,    
head = document.getElementsByClassName('part'),
body = document.getElementsByClassName('body')[0],
start = document.getElementsByClassName('start')[0],
score = document.getElementsByClassName('score')[0],
result = document.getElementsByClassName('result')[0],
tip = document.getElementsByClassName('tip')[0],
grade = document.getElementsByClassName('grade')[0],
button = document.getElementsByClassName('button')[0];
//贪吃蛇的初始化
function init(){
  arr = new Array();
  for(var i = 0;i < 4;i++){
    arr[i] = head[i];
  }
  foodPut();
  //贪吃蛇运动的函数
  direction = setInterval(function(e) {
    for(var i = arr.length - 1;i > 0;i--){
      arr[i].style.left = arr[i - 1].style.left;
      arr[i].style.top = arr[i - 1].style.top;
    }
    head[0].style.left = parseInt(getStyle(head[0],"left")) - 10 + "px";
    judge();
  },100);
}
//游戏重新开始按钮
button.addEventListener("click",function(e){
  window.location.reload();
},false)
//游戏开始按钮
start.addEventListener("click",function(e) {
  if(lock){
    lock = false;
    init();
  }
},false);
//贪吃蛇运动的控制函数
document.onkeydown = function(e) {          
  var event = e || window.event;
  if(event.keyCode == 37 && (key%2 == 1)){
    key += 1;
    clearInterval(direction);
    direction = setInterval(function() {
      for(var i = arr.length - 1;i > 0;i--){
       arr[i].style.left = arr[i - 1].style.left;
       arr[i].style.top = arr[i - 1].style.top;
     }
     head[0].style.left = parseInt(getStyle(head[0],"left")) - 10 + "px";
     judge();

   },100)
  }else if(event.keyCode == 38 && (key%2 == 0)){
    key += 1;
    clearInterval(direction);
    direction = setInterval(function() {
      for(var i = arr.length - 1;i > 0;i--){
       arr[i].style.left = arr[i - 1].style.left;
       arr[i].style.top = arr[i - 1].style.top;
     } 
     head[0].style.top = parseInt(getStyle(head[0],"top")) - 10 + "px"; 
     judge();
   },100)
  }else if(event.keyCode == 39 && (key%2 == 1)){
    key += 1;
    clearInterval(direction);
    direction = setInterval(function() {
      for(var i = arr.length - 1;i > 0;i--){
       arr[i].style.left = arr[i - 1].style.left;
       arr[i].style.top = arr[i - 1].style.top;
     } 
     head[0].style.left = parseInt(getStyle(head[0],"left")) + 10 + "px";  
     judge();
   },100)
  }else if(event.keyCode == 40 && (key%2 == 0)){
    key += 1;
    clearInterval(direction);
    direction = setInterval(function() {
      for(var i = arr.length - 1;i > 0;i--){
       arr[i].style.left = arr[i - 1].style.left;
       arr[i].style.top = arr[i - 1].style.top;
     }
     head[0].style.top = parseInt(getStyle(head[0],"top")) + 10 + "px";  
     judge();
   },100)
  }
}
//食物的随机放置 
function foodPut(){
  food = document.createElement('div');
  food.className = "part";
  body.appendChild(food);
  var x = Math.random();
  var y = Math.random();
  food.style.left = parseInt(800*x - (800*x%10)) + "px";
  food.style.top = parseInt(500*y - (500*y%10)) + "px";
}
//判断游戏是否结束函数
function judge(){
  if(parseInt(getStyle(head[0],"left")) > 790 || parseInt(getStyle(head[0],"left")) < 0 || parseInt(getStyle(head[0],"top")) < 0 || parseInt(getStyle(head[0],"top")) > 490){
    result.className = "resulting";
    tip.innerHTML = "游戏结束";
    grade.innerHTML ="你的得分是：" + score.innerHTML;
    clearInterval(direction);
  }
  for(var i = 1;i < arr.length;i++){
    if(parseInt(getStyle(head[0],"left")) == parseInt(getStyle(arr[i],"left")) && parseInt(getStyle(head[0],"top")) == parseInt(getStyle(arr[i],"top"))){
      result.className = "resulting";
      tip.innerHTML = "游戏结束";
      grade.innerHTML ="你的得分是：" + score.innerHTML;
      clearInterval(direction);
    }
  }
  if(parseInt(getStyle(food,"left")) == parseInt(getStyle(head[0],"left")) && parseInt(getStyle(food,"top")) == parseInt(getStyle(head[0],"top"))){
    arr.push(food);
    score.innerHTML++;
    foodPut();
  }

}

    //获取dom元素的css属性 
    function getStyle(elem,prop) {
      if(window.getComputedStyle){
       return window.getComputedStyle(elem,null)[prop];
     }else{
      return elem.currentStyle[prop];
    }
  }