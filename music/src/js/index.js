var $ = window.Zepto;
var root = window.player;
var songSource;
var index = 0;
var audioControl = new root.audioControl();
function bindEvent(){
	$("body").on("play:change",function(event,index){
		audioControl.getAudio(songSource[index].audio);

		root.process.renderAlltime(songSource[index].duration);
		root.render(songSource[index]);
		root.process.update(0);
		if(audioControl.status == "play"){
			audioControl.play();
			root.process.start();
		}
	})
	$(".control").on("click",".play-btn",function(){
		if(audioControl.status == "play"){
			audioControl.pause();
			root.process.stop();
		}else{
			audioControl.play();
			root.process.start();
		}
		$(this).toggleClass("playing");
	})
	$(".control").on("click",".prev-btn",function(){
		var index = controlManager.prev();
		window.index = index;
		root.render(songSource[index]);
		$("body").trigger("play:change",index);
	})
	$(".control").on("click",".next-btn",function(){
		var index = controlManager.next();
		window.index = index;
		root.render(songSource[index]);
		$("body").trigger("play:change",index);
        // console.log(window.index);
    })

}
function bindTouch(){
	var percent = 0;
	var offset = $(".pro-wrapper").offset();
	var slider = $(".slider-pointer");
	slider.on("touchstart",function(e){
		root.process.stop();
        // audioControl.pause();
    }).on("touchmove",function(e){
    	var stopX = e.changedTouches[0].clientX;
    	percent = (stopX - offset.left) / offset.width;
    	if(percent > 1){
    		percent = 1;
    	}else if(percent < 0){
    		percent = 0;
    	}
    	root.process.update(percent);
    }).on("touchend",function(e){
    	var stopX = e.changedTouches[0].clientX;
    	percent = (stopX - offset.left) / offset.width;
    	if(percent > 1){
    		percent = 0;
    		$(".next-btn").trigger("click");
    	}else if(percent < 0){
    		percent = 0;
    	}
    	var curTime = percent * songSource[index].duration;
    	audioControl.playTo(curTime);
    	root.process.start(percent);
    	$(".play-btn").addClass("playing"); 
    	audioControl.status = "play";      
        // audioControl.play();
    })
}
function getData(url){
	$.ajax({
		type: "GET",
		url: url,
		success:function(data){
			root.render(data[0]);
			songSource = data;
			bindEvent();
			bindTouch();
			controlManager = new root.controlManager(data.length);
			audioControl.getAudio(data[0].audio);
			root.process.renderAlltime(data[0].duration);
		},
		error:function(){
			console.log("error");
		}
	})
}




getData("../mock/data.json");