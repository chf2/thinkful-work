$(document).ready(function(){
	// Defines the question object
	function question(question,op1,op2,op3,op4,answer,correct){
		this.question = question;
		this.op1 = op1;
		this.op2 = op2;
		this.op3 = op3;
		this.op4 = op4;
		this.answer = answer;
		this.correct = false;
	}
	// Set all of the questions and related variables. q_idx is high level
	var question_list = [new question("What is the name of this program?","Codecademy","Learn2Code","Thoughtful","Thinkful",3), 
	                     new question("What is the name of this project?","Answer Questions","Multiple Choice","Quiz App","Quizzical",2),
						 new question("What Unit are we in?","1","2","3","4",2), 
						 new question("Which of these is not a Thinkful project?","Build a Tabloid","Google Clone","37Signals","Hot or Cold",0),
						 new question("How many questions before I ran out of ideas?","2","3","4","7",2)];
	var num_questions = question_list.length;
	q_idx = 0;
	
	// Displays a new question and set of answers
	var display_new_question = function(){
		$('#submit_button').prop('disabled',true);
		$('#question').html(question_list[q_idx].question);
		$('#op1').html(question_list[q_idx].op1);
		$('#op2').html(question_list[q_idx].op2);
		$('#op3').html(question_list[q_idx].op3);
		$('#op4').html(question_list[q_idx].op4); 
		$('#progress_tracker span').html(q_idx + "/<strong>" + num_questions+"</strong>");
	}
	
	// This enables user to submit after making a selection
	$('input').on('click',function(){
		$('#submit_button').prop('disabled',false);
	});
	// Handle an answer submission
	$('#submit_button').on('click',function(){
		event.preventDefault();
		if(check_answer()===question_list[q_idx].answer){ // Verify answer
			question_list[q_idx].correct = true;
		}
		$('input[name=answer]').attr('checked',false); // Clear buttons and increment q_idx. Check if all have been answered
		q_idx+=1;
		if(q_idx===num_questions){
			quiz_finished();
		}else{
			display_new_question();
		}
		$('#submit_button').attr('disabled',true);
	});
	
	// Gets index of user answer
	var check_answer = function(){
		return $('input[name=answer]').filter(':checked').val();
	}
	
	// Once the quiz is done, does stuff
	var quiz_finished = function(){
		var num_correct = 0;
		for(var j=0;j<num_questions;j++){
			if (question_list[j].correct)
				num_correct+=1;
		}
		$('#question_container').hide();
		$('#finished_page').show();
		
		// Display score and give feedback 
		var score = num_correct/num_questions*100;
		$fb = $('#feedback');
		$('#score span').html(score+"%");
		if(score>=90){
			$fb.html("Great job!");
		}else if(score>=70){
			$fb.html("Pretty good... but you can do better!");
		}else if(score>=40){
			$fb.html("Not your best...");
		}else{
			$fb.html("Terrible! Terrible!");
		}
	}
	
	// Opening functionality 
	$('#begin_quiz').on('click', function(){
		$('#intro').fadeOut(1000);
		$('#question_container').delay(1000).fadeIn(1000);
		$('#progress_tracker').delay(1000).fadeIn(1000);
		display_new_question();
	});
	
	// For retry, resets variables
	$('#retry').on('click',function(){
		q_idx = 0;
		$('#intro').show();
		$('#finished_page').hide();
	});	
});