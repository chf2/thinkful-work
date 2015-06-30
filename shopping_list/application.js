$d = $(document);
$d.ready(function(){
	var numItems = 0;
	var numCheckedItems = 0;
	$('#mainform').submit(function(event){
		event.preventDefault();
		if(numItems>13){
			alert("You have too much on your plate already!");
		}else{
			$("<div class='item' >"+$('#entry').val()+"</div>").insertAfter("#entry");
			$('#entry').val("");
			numItems+=1;
		}
	});
	$('#listdiv').delegate('.item','click',function(){
		$(this).removeClass('item');
		$(this).addClass('checkeditem');
		$(this).insertAfter($('#listdiv').last())
		numCheckedItems += 1;
	});
	$('#clearall').click(function(){
		$('.item').remove();
		$('.checkeditem').remove();
		numItems=0;
	});
	$('#clearchecked').click(function(){
		$('.checkeditem').remove();
		numItems-=numCheckedItems;
		numCheckedItems=0;
	});
});