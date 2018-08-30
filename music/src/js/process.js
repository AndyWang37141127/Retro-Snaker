 (function($,root){
 	var curDuration;
 	var frameId;
 	var lastPer = 0;
 	var startTime;
 	var stopTime;
 	function renderAlltime(duration){
 		stop();
 		curDuration = duration;
 		lastPer = 0;
 		var allTime = formatTime(duration);
 		$(".all-time").html(allTime);
 	}
 	function start(per){
 		lastPer = per === undefined ? lastPer : per;
 		// console.log(lastPer);
 		startTime = new Date().getTime();
 		function frame(){
 			var curTime = new Date().getTime();
 			var percent = lastPer + (curTime - startTime) / (curDuration*1000);
 			if(percent < 1){
 				frameId = requestAnimationFrame(frame);
 				update(percent);
 			}else{
 				cancelAnimationFrame(frameId);
 				$(".next-btn").trigger("click");
 			}
 		}
 		frame();
 	}
 	function stop(){
 		stopTime = new Date().getTime();
 		lastPer += (stopTime - startTime) / (curDuration * 1000);
 		cancelAnimationFrame(frameId);
 	}
 	function update(percent) {
 		var curTime = percent * curDuration;
 		curTime = formatTime(curTime);
 		$(".cur-time").html(curTime);
 		var per = (percent - 1) * 100 + "%";
 	    $(".pro-top").css({"transform":"translateX(" + per + ")"})
 	}     
 	function formatTime(duration){
 		duration = Math.round(duration);
 		var minute = Math.floor(duration / 60);
 		var second = duration % 60;
 		if(minute < 10){
 			minute = "0" + minute;
 		}
 		if(second < 10){
 			second = "0" + second;
 		}
 		return minute + ":" + second;
 	}
 	root.process = {
 		renderAlltime : renderAlltime,
 		update : update,
 		start : start,
 		stop : stop
 	}
 })(window.Zepto,window.player || (window.player  = {}))