var $d = $(document);

$d.ready(function(){
	var goal = Math.floor((Math.random()*100)+1);
	var guess = "", prevGuess=0;
	$('#submit').click(function(){
		if(goal==-1){
			$('#fbp').html("Please start a new game.");
		}else{
			guess = ($('#maininput').val());
			if(isNaN(guess) || guess <1 || guess > 100){
				$('#fbp').html('Please input a valid number!');
			}else if(guess==goal){
				$('#fbp').html('You Won!');
				$('#victories').append("<strong>|</strong>");
				goal = -1;
			}else if(prevGuess==0){
				if(guess>goal){
					$('#fbp').html('Hot!');
				}else{
					$('#fbp').html('Cold!');
				}
			}else if(prevGuess==guess){
				$('#fbp').html("Try harder!");
			}else if(Math.abs(guess-goal)<Math.abs(prevGuess-goal)){
				$('#fbp').html("Warmer!");
			}else{
				$('#fbp').html("Colder!");
			}
			$('#maininput').val("");
			prevGuess = guess;
		}
	});
	$('#ng').click(function(){
		$('#fbp').toggleClass("newgame");
		$('#maininput').val("");
		$('#fbp').html('Starting a new game!');
		$('#fbp').delay(500).fadeOut(750);
		prevGuess = "";
		goal = Math.floor((Math.random()*100)+1);
		//$('#fbp').html('</br>');
		//$('#fbp').fadeIn(1);
		//$('#fbp').toggleClass("newgame");
	});
});

