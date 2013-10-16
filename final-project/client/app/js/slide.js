$(function(){
	setInterval("slideShow()",5000);
});

function slideShow(){
	var curPic = $("#main div.current");
	var nxtPic = curPic.next();
	if(nxtPic.length == 0){
		nxtPic = $("#main div:first");
	}
	curPic.removeClass("current").addClass("prev");

	nxtPic.css({opacity:0.0}).addClass("current").animate({
		opacity:1.0},1000,function()
		{curPic.removeClass("prev");
	})
}

$(function(){
	setInterval("slideShows()",6000);
});

function slideShows(){
	var curPic = $("#mains div.current");
	var nxtPic = curPic.next();
	if(nxtPic.length == 0){
		nxtPic = $("#mains div:first");
	}
	curPic.removeClass("current").addClass("prev");

	nxtPic.css({opacity:0.0}).addClass("current").animate({
		opacity:1.0},1000,function()
		{curPic.removeClass("prev");
	})
}