
var score = 0;
var moves = 0;


function gameOver(){
	$('#gameover').modal("show");
	Timer.stop();
	//$('.score').append('<p>'+score+'</p>');
}

function resetGame(){
	score = 0;
	moves = 5;
	Timer.reset();
	Timer.start();

	$("#score").html(score);
	$("#moves").html(moves);
	$('#gameover').modal("hide");
}

function initTimer(){
	Timer.init('timer');
	Timer.start();
}


$('.reset').click(resetGame);

$(".stop").click(gameOver);

initTimer();
