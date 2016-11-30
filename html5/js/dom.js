var $container = $(".container");
var DrawUtils = {
	count: 0,
	//圆的中心的 x 坐标。
	x: 70,
	//圆的中心的 y 坐标。
	y: 30,
	//圆的半径。
	r: 20,
	//起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
	sAngle: 0,
	//结束角，以弧度计。
	eAngle: 2*Math.PI,
	//可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
	counterclockwise: true
};

DrawUtils.add = function() {
	DrawUtils.count++;
	$container.append("<canvas id='cas_" + DrawUtils.count + "'></canvas>");
	drawCycle(DrawUtils.x,DrawUtils.y,DrawUtils.r,DrawUtils.sAngle,DrawUtils.eAngle, DrawUtils.counterclockwise,"cas_"+DrawUtils.count);
};

DrawUtils.remove = function() {
	if ($container.find("canvas")) {
		$container.find("canvas").remove();
	}
};

DrawUtils.zoomIn = function() {
	DrawUtils.r += 5;
	if ($container.find("canvas#cas_" + DrawUtils.count)[0]) {
		drawCycle(DrawUtils.x,DrawUtils.y,DrawUtils.r,DrawUtils.sAngle,DrawUtils.eAngle, DrawUtils.counterclockwise,"cas_"+DrawUtils.count,"cas_"+DrawUtils.count);
	}
};

DrawUtils.zoomOut = function() {
	DrawUtils.r -= 5;
	if ($container.find("canvas#cas_" + DrawUtils.count)[0]) {
		drawCycle(DrawUtils.x,DrawUtils.y,DrawUtils.r,DrawUtils.sAngle,DrawUtils.eAngle, DrawUtils.counterclockwise,"cas_"+DrawUtils.count,"cas_"+DrawUtils.count);
	}
};

DrawUtils.move = function() {
	DrawUtils.x += 10;
	DrawUtils.y += 10;
	if ($container.find("canvas#cas_" + DrawUtils.count)[0]) {
		drawCycle(DrawUtils.x,DrawUtils.y,DrawUtils.r,DrawUtils.sAngle,DrawUtils.eAngle, DrawUtils.counterclockwise,"cas_"+DrawUtils.count,"cas_"+DrawUtils.count);
	}
};

function drawCycle(x,y,r,sAngle,eAngle,counterclockwise,casId){
	var canvas = document.getElementById(casId);
	var context = canvas.getContext("2d");
	context.fillStyle="#FF0000";
	context.beginPath();
	context.arc(x,y,r,sAngle,eAngle,counterclockwise);
	context.closePath();
	context.fill();
}
