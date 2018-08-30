(function($,root){
	// var $scope = $(document.body);
    function renderInfo(info){
    	var str = "<div class='song-name'>" + info.song + "</div>\
     	    <div class='singer-name'>" + info.singer + "</div>\
     	    <div class='album-name'>" + info.album + "</div>";
    	$(".song-info").html(str);
    }
    function renderImg(info){
        var img = new Image();
        img.src = info;
        img.onload = function(){
        	root.blurImg(img,$(".wrapper"))
        	$(".song-img img").attr("src" , img.src);
        }
    }
    function renderIslike(data){
        if(data){
        	$(".like-btn").addClass("liking");
        }
        else{
        	$(".like-btn").removeClass("liking");
        }
    }
    root.render = function(data){
    	renderInfo(data);
    	renderImg(data.image);
    	renderIslike(data.isLike);
    }
    
})(window.Zepto,window.player || ( window.player={} ))