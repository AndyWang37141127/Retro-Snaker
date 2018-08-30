var a,
breadth,
altitude,
arr,
arrcover,
li,
coverli,
key,
timer;
ul =document.getElementsByClassName('ulinit')[0],
coverul = document.getElementsByClassName('ulinit')[1],    
button = document.getElementsByTagName('span'),
hide = document.getElementsByClassName('hide')[0],
tips = document.getElementsByClassName('tips')[0],
onemore = document.getElementsByClassName('onemore')[0],
select = document.getElementsByClassName('select')[0];
button[0].addEventListener("click",q,false);                   
button[1].addEventListener("click",w,false);
button[2].addEventListener("click",r,false);


//简单难度的雷盘
    function q(){
               key = "q";
               breadth = 10;
               altitude = 10;
               var div = document.getElementsByClassName('body')[0];
               ul.innerHTML = "";
               coverul.innerHTML = "";
               ul.className = "chassisprimary";
               coverul.className = "coverprimary";
               for(var m = 0;m < 100;m++){
                      var createli = document.createElement('li');
                      createli.className = "origin";
                      ul.appendChild(createli);
                      var createcoverli = document.createElement('li');
                      createcoverli.className = 'start';
                      coverul.appendChild(createcoverli);
               }
               li = document.getElementsByTagName('li');
               coverli = document.getElementsByClassName('start');
               coverul.oncontextmenu = function(e){
                     return false;          
               }  
               init(altitude,breadth);
               assign();              
    }
    //中等难度的雷盘
    function w(){
               key = "w";
               breadth = 18;
               altitude = 18;
               var div = document.getElementsByClassName('body')[0];
               ul.innerHTML = "";
               coverul.innerHTML = "";
               ul.className = "chassismiddle";
               coverul.className = "covermiddle";
               for(var m = 0;m < 324;m++){
                      var createli = document.createElement('li');
                      createli.className = "origin";
                      ul.appendChild(createli);
                      var createcoverli = document.createElement('li');
                      createcoverli.className = 'start';
                      coverul.appendChild(createcoverli);
               }
               li = document.getElementsByTagName('li');
               coverli = document.getElementsByClassName('start');
               coverul.oncontextmenu = function(e){
                     return false;          
               }  
               init(altitude,breadth);
               assign();
    }
    //困难难度的雷盘
    function r(){
               key = "r";
               breadth = 24;
               altitude = 24;
               var div = document.getElementsByClassName('body')[0];
               ul.innerHTML = "";
               coverul.innerHTML = "";
               ul.className = "chassissenior";
               coverul.className = "coversenior";
               for(var m = 0;m < 576;m++){
                      var createli = document.createElement('li');
                      createli.className = "origin";
                      ul.appendChild(createli);
                      var createcoverli = document.createElement('li');
                      createcoverli.className = 'start';
                      coverul.appendChild(createcoverli);
               }
               li = document.getElementsByTagName('li');
               coverli = document.getElementsByClassName('start');
               coverul.oncontextmenu = function(e){
                     return false;          
               }  
               init(altitude,breadth);
               assign();
    }
  //计算当前格子周围的地雷数量
    function assign() {
         for(var p = 0;p < altitude;p++){
          for(var q = 0;q < breadth;q++){
               var count = 0;
               if(arr[p][q].className != "mined"){
                            if(p == 0){
                               if(q ==0){
                                        if(arr[0][1].className == "mined"){
                                                 count++;
                                        }if(arr[1][1].className == "mined"){
                                                 count++;
                                        }if(arr[1][0].className == "mined"){
                                                 count++;
                                        }
                               }else if(q == breadth - 1){
                                        if(arr[0][q - 1].className == "mined"){
                                                 count++;
                                        }if(arr[1][q - 1].className == "mined"){
                                                 count++;
                                        }if(arr[1][q].className == "mined"){
                                                 count++;
                                        }
                               }else {
                                        if(arr[0][q - 1].className == "mined"){
                                                 count++;
                                        }if(arr[0][q + 1].className == "mined"){
                                                 count++;
                                        }if(arr[1][q - 1].className == "mined"){
                                                 count++;
                                        }if(arr[1][q].className == "mined"){
                                                 count++;
                                        }if(arr[1][q + 1].className == "mined"){
                                                 count++;
                                        }
                               }
                            }else if(p == altitude - 1){
                                if(q == 0){
                                        if(arr[p - 1][0].className == "mined"){
                                                   count++;
                                        }if(arr[p - 1][1].className == "mined"){
                                                   count++;
                                        }if(arr[p][1].className == "mined"){
                                                   count++;
                                        }
                                }else if(q == breadth - 1){
                                        if(arr[p - 1][q - 1].className == "mined"){
                                                   count++;
                                        }if(arr[p - 1][q].className == "mined"){
                                                   count++;
                                        }if(arr[p][q - 1].className == "mined"){
                                                   count++;
                                        }
                                }else{
                                        if(arr[p][q - 1].className == "mined"){
                                                   count++;
                                        }if(arr[p][q + 1].className == "mined"){
                                                   count++;
                                        }if(arr[p - 1][q - 1].className == "mined"){
                                                   count++;
                                        }if(arr[p - 1][q].className == "mined"){
                                                   count++;
                                        }if(arr[p - 1][q + 1].className == "mined"){
                                                   count++;
                                        }
                                }         
                            }else if(p > 0 && p < altitude - 1){
                                if(q == 0){
                                        if(arr[p - 1][0].className == "mined"){
                                                   count++;
                                        }if(arr[p + 1][0].className == "mined"){
                                                   count++;
                                        }if(arr[p - 1][1].className == "mined"){
                                                   count++;
                                        }if(arr[p][1].className == "mined"){
                                                   count++;
                                        }if(arr[p + 1][1].className == "mined"){
                                                   count++;
                                        }
                                }else if(q == breadth - 1){
                                        if(arr[p - 1][q].className == "mined"){
                                                   count++;
                                        }if(arr[p - 1][q - 1].className == "mined"){
                                                   count++;
                                        }if(arr[p][q - 1].className == "mined"){
                                                   count++;
                                        }if(arr[p + 1][q - 1].className == "mined"){
                                                   count++;
                                        }if(arr[p + 1][q].className == "mined"){
                                                   count++;
                                        }
                                }else {
                                        if(arr[p - 1][q - 1].className == "mined"){
                                                    count++;
                                          }if(arr[p - 1][q].className == "mined"){
                                                    count++;
                                          }if(arr[p - 1][q + 1].className == "mined"){
                                                    count++;
                                          }if(arr[p][q - 1].className == "mined"){
                                                    count++;
                                          }if(arr[p][q + 1].className == "mined"){
                                                    count++;
                                          }if(arr[p + 1][q - 1].className == "mined"){
                                                    count++;
                                          }if(arr[p + 1][q].className == "mined"){
                                                    count++;
                                          }if(arr[p + 1][q + 1].className == "mined"){
                                                    count++;
                                          } 
                                }
                            } 
                              if(count != 0){
                                    arr[p][q].innerHTML = count;
                             }else{
                                    arr[p][q].innerHTML = "";
                             }                  
               }               
             }
          }
    }
    //判断是否踩雷或者是否扫雷成功的函数
    function judge() {
          var count = 0,
               num = 0;
          for(var i = 0;i < altitude;i++){
             for(var j = 0;j < breadth;j++){
                   if(arr[i][j].className != "mined" && arrcover[i][j].className != "click"){
                               count++;
                   }
                   if(arr[i][j].className == "mined" && arrcover[i][j].className != "sign"){
                            num++;
                   }
             }
          }
          if(count == 0 || num == 0){
                 hide.className = "hided";
                 tips.innerHTML = "恭喜,扫雷成功";
                 timer = setTimeout("window.location.reload()",5000);

          }
    }
    //雷盘的扩散函数
    function nonemine(i,j) {
                  // arrcover[i][j].className == "click";
                  if(i == 0){
                       if(j == 0){
                              if(arr[0][1].innerHTML == "" && arrcover[0][1].className == "start"){
                                     arrcover[0][1].className = "click";
                                     nonemine(0,1);
                              }if(arr[1][0].innerHTML == "" && arrcover[1][0].className == "start"){
                                     arrcover[1][0].className = "click";
                                     nonemine(1,0);
                              }
                       }else if(j == breadth - 1){
                                 if(arr[0][j - 1].innerHTML == "" && arrcover[0][j - 1].className == "start"){
                                         arrcover[0][j - 1].className = "click";
                                         nonemine(0,j - 1);
                                 }if(arr[1][j].innerHTML == "" && arrcover[1][j].className == "start"){
                                         arrcover[1][j].className = "click";
                                         nonemine(1,j);
                                 }
                       }else {
                              if(arr[0][j - 1].innerHTML == "" && arrcover[0][j - 1].className == "start"){
                                     arrcover[0][j - 1].className = "click";
                                     nonemine(0,j - 1);
                              }if(arr[0][j + 1].innerHTML == "" && arrcover[0][j + 1].className == "start"){
                                     arrcover[0][j + 1].className = "click";
                                     nonemine(0,j + 1);
                              }if(arr[1][j].innerHTML == "" && arrcover[1][j].className == "start"){
                                     arrcover[1][j].className = "click";
                                     nonemine(1,j);
                              }
                       }
                  }else if(i == altitude - 1){
                        if(j == 0){
                              if(arr[i - 1][0].innerHTML == "" && arrcover[i - 1][0].className == "start"){
                                     arrcover[i - 1][0].className = "click";
                                     nonemine(i - 1,0);
                              }if(arr[i][1].innerHTML == "" && arrcover[i][1].className == "start"){
                                     arrcover[i][1].className = "click";
                                     nonemine(i,j + 1);
                              }
                        }else if(j == breadth - 1){
                              if(arr[i][j - 1].innerHTML == "" && arrcover[i][j - 1].className == "start"){
                                     arrcover[i][j - 1].className = "click";
                                     nonemine(i,j - 1);
                              }if(arr[i - 1][j].innerHTML == "" && arrcover[i - 1][j].className == "start"){
                                     arrcover[i - 1][j].className = "click";
                                     nonemine(i - 1,j);
                              }
                        }else {
                              if(arr[i][j - 1].innerHTML == "" && arrcover[i][j - 1].className == "start"){
                                     arrcover[i][j - 1].className = "click";
                                     nonemine(i,j - 1);
                              }if(arr[i][j + 1].innerHTML == "" && arrcover[i][j + 1].className == "start"){
                                     arrcover[i][j + 1].className = "click";
                                     nonemine(i,j + 1);
                              }if(arr[i - 1][j].innerHTML == "" && arrcover[i - 1][j].className == "start"){
                                     arrcover[i - 1][j].className = "click";
                                     nonemine(i - 1,j);
                              }
                        }
                  }else if(i > 0 && i < altitude - 1){
                        if(j == 0){
                              if(arr[i - 1][j].innerHTML == "" && arrcover[i - 1][j].className == "start"){
                                     arrcover[i - 1][j].className = "click";
                                     nonemine(i - 1,j);
                              }if(arr[i][j + 1].innerHTML == "" && arrcover[i][j + 1].className == "start"){
                                     arrcover[i][j + 1].className = "click";
                                     nonemine(i,j + 1);
                              }if(arr[i + 1][j].innerHTML == "" && arrcover[i + 1][j].className == "start"){
                                     arrcover[i + 1][j].className = "click";
                                     nonemine(i + 1,j);
                              }
                        }else if(j == breadth - 1){
                              if(arr[i - 1][j].innerHTML == "" && arrcover[i - 1][j].className == "start"){
                                     arrcover[i - 1][j].className = "click";
                                     nonemine(i - 1,j);
                              }if(arr[i][j - 1].innerHTML == "" && arrcover[i][j - 1].className == "start"){
                                     arrcover[i][j - 1].className = "click";
                                     nonemine(i,j - 1);
                              }if(arr[i + 1][j].innerHTML == "" && arrcover[i + 1][j].className == "start"){
                                     arrcover[i + 1][j].className = "click";
                                     nonemine(i + 1,j);
                              }
                        }else {
                              if(arr[i - 1][j].innerHTML == "" && arrcover[i - 1][j].className == "start"){
                                     arrcover[i -1][j].className = "click";
                                     nonemine(i - 1,j);
                              }if(arr[i][j - 1].innerHTML == "" && arrcover[i][j - 1].className == "start"){
                                     arrcover[i][j - 1].className = "click";
                                     nonemine(i,j - 1);
                              }if(arr[i][j + 1].innerHTML == "" && arrcover[i][j + 1].className == "start"){
                                     arrcover[i][j + 1].className = "click";
                                     nonemine(i,j + 1);
                              }if(arr[i + 1][j].innerHTML == "" && arrcover[i + 1][j].className == "start"){
                                     arrcover[i + 1][j].className = "click";
                                     nonemine(i + 1,j);
                              }
                        }
                  }
    } 
    //雷盘的初始化以及地雷的随机布置
    function init(altitude,breadth) {
       arr = new Array();
       for(var i = 0;i < altitude;i++){
             arr[i] = new Array();
         for(var j = 0;j < breadth;j++){
             arr[i][j] = li[i * breadth + j];
                a = parseInt(100*Math.random());
                if(a >= 90){
                 arr[i][j].className = "mined";
                }
               
         }
       }
          arrcover = new Array();
         for(var x = 0;x < altitude;x++){
                arrcover[x] = new Array();
           for(var y =0;y < breadth; y++){
                arrcover[x][y] = coverli[x*breadth + y];
           }
         }
    }
    //鼠标的点击事件函数
    coverul.onmousedown = function(e){
        var event = e || window.event;
        if(event.button == 0){                        
                 for(var i = 0;i < altitude;i++){
                    for(var j = 0;j < breadth;j++){
                     if(arrcover[i][j] == event.srcElement){
                           event.srcElement.className = 'click';
                           if(arr[i][j].className == "mined"){
                                for(var h = 0;h < altitude;h++){
                                   for(var g = 0;g < breadth;g++){
                                       if(arr[h][g].className == "mined"){
                                           arrcover[h][g].className = 'click';
                                                }
                                         }
                                    }
                                    hide.className = "hided";
                                    tips.innerHTML = "遗憾，踩雷了";
                                    timer = setTimeout("window.location.reload()",5000);                                    
                           }else if(arr[i][j].innerHTML == ""){
                                          nonemine(i,j);
                                          judge()
                           }else {
                                   judge();
                           }                         
                     }
                     }
                 }
        }else if(event.button == 2){
                  if(event.srcElement.className == "start"){
                    event.srcElement.className = "sign";
                     judge();
                  }else if(event.srcElement.className == "sign"){
                    event.srcElement.className = "start";
                  }                 
         }
    }
    //取消右键菜单默认事件
    hide.oncontextmenu = function(e){
           return false;
    }
    //再来一次的按钮
    onemore.onclick = function(e){
           if(key == "q"){
                q();
                clearTimeout(timer);
                hide.className = "hide";
           }else if(key == "w"){
                w();
                clearTimeout(timer);                
                hide.className = "hide";
           }else if(key == "r"){
                r();
                clearTimeout(timer);                
                hide.className = "hide";
           }
    }
    select.onclick = function(e){
          window.location.reload();
    }
    