// 手动封装的ajax
function ajax(method, url, callback, data, flag) {
    var xhr = null;
    if(window.XMLHttpRequest) {
        xhr =  new XMLHttpRequest();
    }else {
        xhr = new ActiveXObject('Microsoft.XMLHttp')
    }
    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4) {
            if(xhr.status == 200) {
                callback(xhr.responseText);
            }else {
                console.log('error');
            }
        }
    }
    method = method.toUpperCase();
    if(method == 'GET') {
        var date = new Date(),
            timer = date.getTime();
        xhr.open(method, url + '?' + data + '&timer=' + timer, flag);
        xhr.send();
    }else if(method == 'POST') {
        xhr.open(method, url, flag);
        xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xhr.send(data);
    }
}

   // 封装的Cookie的对象
   var manageCookie = {
       setCookie : function(name,value,time){
            document.cookie = name + '=' + value + ';max-age=' + time;
            return this;
       },
       removeCookie : function(name){
            return this.setCookie(name,'',-1);
       },
       getCookie : function(name,callback){
            var cookieArr = document.cookie.split('; ');
            for(var i = 0;i < cookieArr.length;i++){
                  var itemCookieArr = cookieArr[i].split('=');
                  if(itemCookieArr[0] == name){
                           callback(itemCookieArr[1]);
                           break;
                  }
            } 
            callback(undefined);
            return this;
       }
   }







    // 多物体多值链式运动框架
 function startMoves(ele,object,callback)  {
                       clearInterval(ele.timer);
                       var iSpeed;
                       var iCur;
                       ele.timer = setInterval(function() {
                              var stop = true;
                              for(var attr in object){
                                    if(attr == "opacity"){
                                         iCur = parseInt(parseFloat(getStyle(ele,attr))*100);
                                         iSpeed = (object[attr] - iCur)/10;
                                         iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                                         ele.style[attr] = (iCur + iSpeed)/100 ;                                   
                                    }else if(attr == "borderRadius"){
                                         iCur = parseInt(getStyle(ele,attr));
                                         iSpeed = (object[attr] - iCur)/7;
                                         iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                                         ele.style[attr] = iCur + iSpeed + "%";
                                    }else {
                                         iCur = parseInt(getStyle(ele,attr));
                                         iSpeed = (object[attr] - iCur)/7;
                                         iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);                             
                                         ele.style[attr] = parseInt(getStyle(ele,attr)) + iSpeed + "px";
                                    } 
                                    if(iCur != object[attr]){
                                           stop = false;
                                    }  
                              }
                              if(stop == true){
                                    clearInterval(ele.timer);
                                    typeof callback ? callback() : "" ;
                              }
                       },30)
             }

   // dom元素的属性的运动
function startMove(ele,prop,target) {
                    clearInterval(ele.timer);
                    var iSpeed;
                    var iCur;
                    ele.timer = setInterval(function() {
                          if(prop == "opacity"){
                               iCur = parseInt(parseFloat(getStyle(ele,prop))*100);
                               iSpeed = (target - iCur)/10;
                               iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                               if(iCur == target){
                                    clearInterval(ele.timer);
                               }else {
                                    ele.style[prop] = (iCur + iSpeed)/100 ;
                                    console.log(ele.style[prop] );
                               }

                          }else {
                               iSpeed = (target - parseInt(getStyle(ele,prop)))/7;
                               iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                               if(parseInt(getStyle(ele,prop)) === target){
                                      clearInterval(ele.timer);
                               }else {
                                      ele.style[prop] = parseInt(getStyle(ele,prop)) + iSpeed + "px";
                               } 
                          }
                          
                    },30)
            }


      // 通过ClassName属性获取dom元素的兼容性方法
  Document.prototype.getByClassName =  function(className) {
          var arr = Array.prototype.slice.call(document.getElementsByTagName('*'));
          var resultArr = [];
          function cutClassName(ele){
                 var reg = /\s+/g;
                 ele.className = ele.className.replace(reg," ").trim();
          }
          arr.forEach(function(ele , index){
                cutClassName(ele);
                var nameArr = ele.className.split(" ");
                for(var i = 0; i < nameArr.length; i++){
                         if(nameArr[i] == className){
                                   resultArr.push(ele);
                                   break;
                         }
                }
          })
          return resultArr;
  }





// js的异步加载兼容函数
function loadScript(url,callback) {
           var script = document.createElement('script');
           script.type = "text/javascript";
           if(script.readyState){
                script.onreadystatechange = function(){
                    if(script.readyState == "complete" || script.readyState == "loaded"){
                         callback();
                    }
                }
           }else {
               script.onload = function() {
                    callback();
               }
           }
           script.src = url;
           document.head.appendChild(script);
     }



   // 元素的拖拽函数
function drag(elem){
       var disX,
           disY;
           addEvent(elem,'mousedown',function(e){
                  var event = e || window.event;
                  disX = event.clientX - parseInt(getStyle(elem,'left'));
                  disY = event.clientY - parseInt(getStyle(elem,'top'));
                  addEvent(document,'mousemove',mouseMove);
                  addEvent(document,'mouseup',mouseUp);
                  stopBubble(event);
                  cancelHandler(event);
           });
           function mouseMove(e) {
              var event = e || window.event ;
              elem.style.left = event.clientX - disX + "px";
              elem.style.top = event.clientY - disY + "px";
           }
           function mouseUp(e) {
              var event = e || window.event;
              removeEvent(document,'mousemove',mouseMove);
              removeEvent(document,'mouseUp',mouseUp);
           }
  }
    
  


       // 实现子元素查找，解决部分浏览器不兼容问题
       Element.prototype.MyChildren = function() {
             var child = this.childNodes;
             var len = child.length;
             var arr = [];
             for(var i = 0;i < len ;i++){
                   if(child[i].nodeType ==1){
                       arr.push(child[i]);
                   }
             }
             return arr;
       }
 


      // 封装hasChildren()方法，不用children属性
        Element.prototype.hasChildren = function() {
             var child = this.childNodes;
             var len = child.length;
             for(var i = 0;i < len ;i++){
                   if(child[i].nodeType ==1){
                       return true;
                   }
             }
             return false;
        }



       //       解除事件处理程序
       function removeEvent(elem,type,handle) {
             if(elem.removeEventListener){
                   elem.removeEventListener(type,handle,false);
             }else{ 
                   elem.detachEvent('on' + type ,handle);
             }
       }


      // 封装元素e的第n层的祖先元素节点
        function getParent(elem,n) {
               while(elem && n){
                    elem = elem.parentElement;
                    n --;
               }
                return elem;
        }




        // 封装取消默认事件函数
        function cancelHandler(event){
          if(event.preventDefault){
             event.preventDefault();
          }else {
              event.returnValue = false;
          }
        }


        //   封装添加事件的函数
         function addEvent(elem,type,handle){
               if(elem.addEventListener){
                      elem.addEventListener(type,handle,false)
               }else if(elem.attachEvent){
                elem.attachEvent('on' + type,function() {
                       handle.call(elem);
               });                   
               }else{
                   elem['on' + type] = handle;
               }
        }








     // 封装取消冒泡的函数
     function stopBubble(event){
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancelBubble = true;
        }
     }







    //       获取dom元素的css属性 
         function getStyle(elem,prop) {
            if(window.getComputedStyle){
                     return window.getComputedStyle(elem,null)[prop];
            }else{
                    return elem.currentStyle[prop];
            }
    }

     
    // 求dom元素相对于文档的定位
    Element.prototype.getElementPosition = function() {
         if(this.offsetParent == document.body){
               return {
                   x : this.offsetLeft,
                   y : this.offsetTop
               }
         }else {
               return {
                x : this.offsetLeft + (this.offsetParent).getElementPosition().x,
                y : this.offsetTop + (this.offsetParent).getElementPosition().y
               }
         }
    }     









      // 三分钟的计时器
      // var min = document.getElementsByTagName('input')[0];
      // var se = document.getElementsByTagName('input')[1];
      // var time = setInterval(function() {                
      //             if(se.value == 59){
      //                se.value = 0;
      //                min.value  ++;
      //                if(min.value == 3){
      //                 clearInterval(time);
      //                }
      //             }else{
      //                se.value ++;
      //              }               
      // },50)


        

     // 客户端浏览器可视区窗口尺寸
      function getViewportOffset() {
        if(window.innerWidth){
            return {
                w : window.innerWidth,
                h : window.innerHeight
                 }
              }else{
                if(document.compatMode === "BackCompat"){
                    return {
                         w : document.body.clientWidth,
                         h : document.body.clientHeight
                    }
                }else {
                     return {
                         w : document.documentElement.clientWidth,
                         h : document.documentElement.clientHeight
                     }
                }
            }
      }


     // 封装返回滚动条的滚动尺寸
     function getScrollOffset() {
          if(window.pageXOffset) {
              return {
                  x : window.pageXOffset,
                  y : window.pageYOffset
              }
          }else {
              return {
                   x : document.body.scrollLeft + document.documentElement.scrollLeft,
                   y : document.body.scrollTop + document.documentElement.scrollTop
              }
          }
     }








       
      





     // 求100以内的素数
      // function onehundred() {
      //   var a;
      //   for(var i = 2;i<=100;i++){
      //     if(i==2){
      //       document.write(i + " ");}
      //       else{
      //         for(var j = 2; j<i;j++){
      //       if(i%j==0){
      //         a = false;
      //         break;
      //       }else{            
      //            a = true;
      //       }
      //       }
      //       if(a==true){
      //         document.write(i + " ");
      //       }
      //       }   
      //   }
      // }  







     //   斐波那契第n项的值
     // function num(n) {
     //        if(n==1 || n==2){
     // 	      	return 1;
     // 	      }
     // 	     return num(n-1)+num(n-2);

     // }


   // 原型继承的圣杯模式
      function extend(Target ,Origin) {
              function F() {};
              F.prototype = Origin.prototype;
              Target.prototype = new F();
              Target.prototype.constructor = Target;
              Target.prototype.uber = Origin.prototype;
      } 


      var inherit = (function () {
        var F = function() {};
        return function(Target,Origin){
             F.prototype = Origin.prototype;
              Target.prototype = new F();
              Target.prototype.constructor = Target;
              Target.prototype.uber = Origin.prototype;
        }
      } ())









    //  // 一个由[a~z]组成的字符串，找出该字符串中第一个只出现一次的字母
    // var aa = "asljdfuhxjdubklabhjajsdkfjfjdz";
    
    // function FirstOnly(string) {         
    //       for(var i = 0;i< string.length;i++){
    //             var n = 0;
    //             for(var j = 0;j < string.length;j++){
    //                      if(string.charAt(i) ==string.charAt(j)){
    //                           n++;
    //                         }                  
    //             }
    //             if(n == 1){
    //               console.log(string.charAt(i)); 
    //               break;
    //             }
    //       }
    //       if(i == string.length){
    //         console.log("没有只出现一次的字母");
    //       }
    // }
    // FirstOnly(aa);
     






      
  //  // 字符串去重
  function StringQuChong(string) {
          var obj = {};
          var str = "";
          for(var i = 0;i < string.length;i++){
              if(!obj[string.charAt(i)]){                          
                  obj[string.charAt(i)] = string.charAt(i);
                str += string.charAt(i);
              }
          }
              return str;
  }   
     
  

    

// 查找第n个兄弟元素结点
function retSibling(elem,n) {
  while(elem && n) {
      if(n > 0){   
            if(elem.nextElementSibling){
                  elem = elem.nextElementSibling;
                  n --;
            }else{
                if(elem.nextSibling.nodeType == 1){
                          n --;
                  }
                  elem = elem.nextElementSibling;
                }                              
      }else{
            if(elem.previousElementSibling){
                  elem = elem.previousElementSibling;
                  n --;
            }else{
                if(elem.previousSibling.nodeType == 1){
                          n --;
                }
                  elem = elem.previousSibling;
             }
             
          }
        }      
    
     return elem;
  }


   



        // 封装元素的insertAfter()方法
    Element.prototype.insertAfter = function(a,b) {
           if(b == this.children[length-1]){
                  this.appendchild(a);
           }else{
            this.insertBefore(a,b.nextElementSibling);
           }
           
    } 

    




          // 封装元素的子元素倒序

     function reser(elem) {
           var i = 0,
               k = elem.children.length;
           if(k){
                   for(var j = k - 1; j > 0;j--){
                             elem.insertBefore(elem.children[k-1],elem.children[i]);
                             i++;
                   }                   
           }
           return elem; 
     }
  
    








    




   // 对象的深度克隆

    // var obj = {
    //       name : "345",
    //       sex : "female",
    //       dg : null,
    //       score : {
    //             math : 89,
    //             chinese : 90,
    //             English : 78,
    //             history : 99,
    //             grade : [1,2,3,4,5,6]      
    //       },
    //       no : ['df','jh','os','rt',sdf = { height : 183,weight : 234},'nbv'],
    //       aaa : function () {}
    // }
    //  var obj1 = {}
     
    //   function clone(Origin,Target){
                
    //               for(var prop in Origin){ 
    //                 if(Origin.hasOwnProperty(prop)){    
    //                  if(Origin[prop] instanceof Array){
    //                            Target[prop] = [];
    //                            clone(Origin[prop],Target[prop]);                  
    //                 }else if(Origin[prop] instanceof Object){
    //                             Target[prop] = {};
    //                            clone(Origin[prop],Target[prop]);
    //                         }else{
    //                         Target[prop] = Origin[prop];
    //                         }
    //                 }
    //             }   
             
    // }
    // clone(obj,obj1);



   //  var obj = {
   //        name : "345",
   //        sex : "female",
   //        dg : null,
   //        sd : "null",
   //        score : {
   //              math : 89,
   //              chinese : 90,
   //              English : 78,
   //              history : 99,
   //              grade : [1,2,3,4,5,6]      
   //        },
   //        no : ['df','jh','os','rt',sdf = { height : 183,weight : 234},'nbv'],
   //        aaaa : function () {}
   //  }
   //   var obj1 = {}
   




       // 数组的filter方法的深度克隆
   Array.prototype.myFilter = function(fn) {
        var arrCopy = [];
        var arrStr = Object.prototype.toString;
        for(var i = 0; i < this.length; i++){
          if(fn(this[i],i)){
            if(this[i] && typeof this[i] == "object"){
                       if(arrStr.call(this[i]) == "object Array"){
                             var copy = [];
                             deepClone(this[i],copy);
                             arrCopy.push(copy);
                       }else {
                             var copy = {};
                             deepClone(this[i],copy);
                             arrCopy.push(copy);
                       }
                }else {
                       arrCopy.push(this[i]);
                }
            }
                
        }
        return arrCopy;
    }
   


      // 对象的深度克隆
   function deepClone(Origin,Target) {
    var Target = Target || {};
    var toStr = Object.prototype.toString;
    var arrStr = "[object Array]";
    for(var prop in Origin){
      if(Origin.hasOwnProperty(prop)){
             if(Origin[prop] !== null && typeof(Origin[prop]) == 'object'){
                    if(toStr.call(Origin[prop]) ==arrStr){
                      Target[prop] = Target[prop] ? Target[prop] : [];
                    }else {
                      Target[prop] = Target[prop] ? Target[prop] : {};
                    }
                    deepClone(Origin[prop],Target[prop]);
             }else {
              Target[prop] = Origin[prop];
             }
      }
    }
   }




     // 数组去重
    // var arr = [1,3,4,6,5,6,5,'s','were',5,8,8,0,0,0,'s',0,0,5,2,2,2];
      
    // Array.prototype.unique = function () {
    //        var obj = {};
    //        for(var prop in this){
    //              if(this.hasOwnProperty(prop)){
    //                 obj[this[prop]] = this[prop];
    //               }                
    //        }
    //        this.splice(0);
    //        for(var i in obj){
    //              this.push(obj[i]);
    //        }
    // } 
    //Array.prototype.unique(arr);
    
    // var array = [3,3,5,1,7,5,'sdf',8,6,8,4,5,5,4,1,'sdf',0];

    // Array.prototype.unique = function() {
    //   var temp = {},
    //   arr = [],
    //   len = this.length; 
    //   for(var i = 0;i < len; i++){
    //     if(!temp[this[i]]){
    //       temp[this[i]] = "sadf";
    //       arr.push(this[i]);
    //     }
    //   }
    //   return arr; 
    // }


    //  var arr = [1,3,4,6,true,6,5,'s','were',5,8,8,0,true,0,'s',0,0,5,2,2,2];
    // Array.prototype.unique = function(){
    //         var obj = {},
    //         len = this.length;
    //         for(var i = 0;i < len; i++){
    //                 if(!obj[this[i]]){
    //                 obj[this[i]] = "example";
    //                 this.push(this[i]);
    //                 }
    //         }
    //         this.splice(0,len);
    //           //return this;
    // }












// 
     // typeof的精细化
     // function type(object) {
     //           if(typeof(object) == "undefined"){
     //            return "undefined";
     //           }else if(typeof(object) == "number"){
     //            return "number";
     //           }else if(typeof(object) == "string"){
     //            return "string";
     //           }else if(object == null){
     //            return "null";
     //           }else {
     //            return Object.prototype.toString.call(object);
     //           }
     // }

     


     // function type(Target){
     //  var result = typeof(Target);
     //  var template = {
     //       "[object Array]" : "array",
     //       "[object Object]" : "object",
     //       "[object Number]" : "number - object",
     //       "[object Boolean]" : "boolean - object",
     //       "[object String]" : "string - object"
     //  }
     //      if(Target === null){
     //        return "null";
     //      }else if(result == "object"){
     //        var content = Object.prototype.toString.call(Target);
     //        return template[content];
     //      }else {
     //        return result;
     //      }
     // }