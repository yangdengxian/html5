function drawCycle(x,y,r,sAngle,eAngle,counterclockwise){
	var canvas = document.getElementById('cycleCanvas');
	var context = canvas.getContext("2d");
	context.fillStyle="#FF0000";
	context.beginPath();
	context.arc(x,y,r,sAngle,eAngle,counterclockwise);
	context.closePath();
	context.fill();
}
drawCycle(70,30,25,0,Math.PI*2,true);