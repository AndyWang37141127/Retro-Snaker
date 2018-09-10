var ul = Array.prototype.slice.call(document.getElementsByTagName('ul'));
ul.forEach(function(ele,index){
       ele.addEventListener('mouseenter',function(e){
                var event = e || window.event;
                addClass(this,event,'in');
       })
       ele.addEventListener('mouseleave',function(e){
       	        var event = e || window.event;
       	        addClass(this,event,'out');
       })
})
function addClass(ele,e,state){
      var dire = getDirection(ele,e);
      var direction;
      switch (dire){
      	  case 0 : direction = "top-";
      	  break;
      	  case 1 : direction = "right-";
      	  break;
      	  case 2 : direction = "bottom-";
      	  break;
      	  case 3 : direction = "left-";
      }
      ele.children[0].className = direction + state;
}
function getDirection(ele,e){
      var x = e.offsetX - ele.offsetWidth/2;
      var y = e.offsetY - ele.offsetHeight/2;
      return dire = (Math.round(((Math.atan2(y,x)*(180/Math.PI)) + 180)/90) + 3)%4;
      console.log(dire);     
}