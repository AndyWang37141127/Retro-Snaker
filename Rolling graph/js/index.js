var timer;
var lock = true;
var index = 0;
var picWidth = $('li').outerWidth();
var len = $('li').length;
timer = setTimeout(autoMove,3000);


function autoMove(){
 if(lock){
  lock = false;
  $('.main').animate({left:parseInt($('.main').css('left')) - picWidth},1000,'easeOutQuint',    function(){
    if(parseInt($('.main').css('left')) == - picWidth * (len - 1)){
     $('.main').css('left',"0px");
   }                              
   timer = setTimeout(autoMove,3000);
   lock = true;	  
 });	
  if(index == len -2){
    index = -1;
  }
  index++;
  changeIndex(index);
}			   	   	           
}


function changeIndex(order){
 $('.index span').each(function(){
  $('.select').removeClass('select');
  $('span').eq(order).addClass('select');
})
}

$('.index').on('click','span',function(){
 if(lock){
   var spanIndex = $(this).index();
   clearTimeout(timer);
   lock = false;
   if(spanIndex > index){
    $('.main').css('left',- picWidth * (spanIndex - 1) + "px");
    $('.main').animate({left:parseInt($('.main').css('left')) - picWidth},1000,'easeOutQuint',function(){
      lock = true;
      timer = setTimeout(autoMove,3000);
    })
  }else if(spanIndex < index){
    $('.main').css('left',- picWidth * (spanIndex + 1) + "px");
    $('.main').animate({left:parseInt($('.main').css('left')) + picWidth},1000,'easeOutQuint',function(){
      lock = true;
      timer = setTimeout(autoMove,3000);
    })
  }
  index = spanIndex;
  changeIndex(spanIndex);
}
})

$('.wrapper').on('click','.Left',function(){
 if(lock){
  lock = false;
  clearTimeout(timer);
  index--;
  if(parseInt($('.main').css('left')) == 0){
   $('.main').css('left',- picWidth * (len - 1) + 'px');
   index = len - 2;			      	     
 }
 $('.main').animate({left:parseInt($('.main').css('left')) + picWidth},1000,'easeOutQuint',function(){
  timer = setTimeout(autoMove,3000);
  lock = true;
})
 changeIndex(index);
}			      
})
$('.wrapper').on('click','.Right',function(){
 if(lock){
  lock = false;
  clearTimeout(timer);			  	  
  if(index == len - 2){
   index = -1;
 }
 index++;
 if(parseInt($('.main').css('left')) == - picWidth * (len - 1)){
   $('.main').css('left','0px');	
 }
 $('.main').animate({left:parseInt($('.main').css('left')) - picWidth},1000,'easeOutQuint',function(){
  timer = setTimeout(autoMove,3000);
  lock = true;
})
 changeIndex(index);
}			      
})