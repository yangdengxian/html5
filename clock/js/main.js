(function(window, angular, undefined) {
	var myApp = angular.module("myApp",[]);
	myApp.controller("dateController",["$scope",function($scope){
		$scope.date = new Date();
	}]);

	myApp.filter("dayFilter",function(){
		return function(date) {
			var days = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
			var day = "";
			angular.forEach(days,function(number,index){
				if (index == date.getDay()) {
					day = number;
				}
			});
			return day;
		};
		
	});

	myApp.directive("clockCanvas",function(){
		return {
			restrict: 'E',
			template: '<canvas id="clock" width="400px" height="400px"></canvas>',
			replace: true,
			link : function(scope, element, attrs, ctrl) {
				var clock = document.getElementById("clock");
				var context = clock.getContext("2d");
				//这里可以这样使用 var width = attrs.width，但本人觉得，既然是html5，最好使用h5 api方法
				var width = context.canvas.width;
				var height = context.canvas.height;
				var r = width / 2;
				var rem = width / 200;

				function drawBackground() {
					context.save();
					context.translate(r,r);
					context.beginPath();
					context.lineWidth = 10 * rem;
					context.arc(0, 0, r - context.lineWidth/2, 0, 2*Math.PI, false);
					//绘制，不填充
					context.stroke();

					var hourNumbers = [3,4,5,6,7,8,9,10,11,12,1,2];
					context.font = 18 * rem + "px Arial";
					context.textAlign = "center";
					context.textBaseline="middle";
					hourNumbers.forEach(function(number,i){
						var rad = 2 * Math.PI / 12 * i;
						var x = Math.cos(rad) * (r - 30 * rem);
						var y = Math.sin(rad) * (r - 30 * rem);
						context.fillText(number,x,y);
					});

					for (var i = 0; i < 60; i++) {
						var rad = 2 * Math.PI / 60 * i;
						var x = Math.cos(rad) * (r - 18 * rem);
						var y = Math.sin(rad) * (r - 18 * rem);
						context.beginPath();
						if (i % 5 === 0) {
							context.fillStyle = "#000";
							context.arc(x ,y, 2 * rem, 0, 2*Math.PI, false);
						} else {
							context.fillStyle = "#CCC";
							context.arc(x ,y, 2 * rem, 0, 2*Math.PI, false);
						}
						
						context.fill();
					};
				}

				function drawHours(hour,minuts) {
					context.save();
					context.beginPath();
					var rad = 2*Math.PI / 12 * hour;
					var radm = 2*Math.PI / 12 / 60 * minuts;
					context.rotate(rad + radm);
					context.lineCap = "round";
					context.lineWidth = 6 * rem;
					context.moveTo(0, 10 * rem);
					context.lineTo(0, -r / 2);
					context.stroke();
					context.restore();
				}


				function drawMinuts(minuts,second) {
					context.save();
					context.beginPath();
					var rad = 2*Math.PI / 60 * minuts;
					var rads = 2*Math.PI / 60 / 60 * second;
					context.rotate(rad + rads);
					context.lineCap = "round";
					context.lineWidth = 3 * rem;
					context.moveTo(0, 10 * rem);
					context.lineTo(0, -r + 30 * rem);
					context.stroke();
					context.restore();
				}


				function drawSeconds(second) {
					context.save();
					context.beginPath();
					context.fillStyle = "#C14543";
					var rad = 2*Math.PI / 60 * second;
					context.rotate(rad);
					context.moveTo(-2 * rem, 20 * rem);
					context.lineTo(2 * rem, 20 * rem);
					context.lineTo(1, -r + 18 * rem);
					context.lineTo(-1, -r + 18 * rem);
					context.fill();
					context.restore();
				}

				function darwDot() {
					context.beginPath();
					context.fillStyle = "#fff";
					context.arc(0, 0, 3 * rem, 0, 2*Math.PI, false);
					context.fill();
				}

				function draw() {	
					context.clearRect(0, 0, width, height);
					var date = new Date();
					var hour = date.getHours(),
						minuts = date.getMinutes(),
						seconds = date.getSeconds();
					drawBackground();
					drawHours(hour,minuts);
					drawMinuts(minuts,seconds);
					drawSeconds(seconds);	
					darwDot();
					context.restore();
				}

				draw();

				setInterval(draw,1000);
			}
		};
	});
})(window,angular);
