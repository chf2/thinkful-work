$(document).ready(function(){

	$("#bc").mouseenter(function(){
		$("#maintext").html("<h2><span>Basecamp</span> is the project management tool you </br>"+
		" wish you had on your last project.</h2>"+
		"<h5 id='subhead2'>Are you still managing projects with email? "+
		"Are you still using Excel for your to-do lists? It's time to "+
		"upgrade to </br>Basecamp. Manage projects and collaborate with your"+
		" team and clients the modern way.</h5>");
		$("#arrow1").css("opacity","1");
	});
	$("#hr").mouseenter(function(){
		$("#maintext").html("<h2><span>Highrise</span> remembers the important things </br>"+
		" about people you'd normally forget.</h2>"+
		"<h5 id='subhead2'>Keep a permanent record of people you do business with. "+
		"Know who you talked to, when you talked to them </br> "+
		"what was said, and when to follow up next. Over 20,000,000 contacts are tracked"+
		" using Highrise.</h5>")
		$("#arrow2").css("opacity","1");
	});
	$("#cf").mouseenter(function(){
		$("#maintext").html("<h2>From near or far, <span>Campfire</span> helps teams work</br>"+
		"together over the web in real-time.</h2><h5 id='subhead2'>Share ideas, discussions, concepts, "+
		"images, code samples, videos, mockups, and documents in a real-time</br>"+
		"private chat room. It's game changing. We couldn't run our own business without Campfire.</h5>");
		$("#arrow3").css("opacity","1");
	});
	$(".bigbutton").mouseleave(function(){
		$("#maintext").html("<h1>Making collaboration productive and <br> enjoyable for"+
		" people every day.</h1><h4 id='subhead'>Frustration-free web-based apps for"+
		" collaboration, sharing information, and making decisions.</h4>");
		$("#arrow1").css("opacity","0");
		$("#arrow2").css("opacity","0");
		$("#arrow3").css("opacity","0");
	});
});