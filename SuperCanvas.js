// SuperCanvas.js
// (c) 2012 datagutt
// SuperCanvas.js may be freely distributed under the MIT license.
;(function(doc, global){
	"use strict";
	var SuperCanvas = function(canvas, width, height){
		canvas = this.canvas = canvas;
		canvas.width = width || "auto";
		canvas.height = height || "auto";
		if (canvas.getContext) {
			this.context = canvas.getContext("2d");
			this.canUse = true;
		} else {
			this.canUse = false;
		}
	};
	
	SuperCanvas.prototype.font = function(size, font){
		var context = this.context;
		context.font = size + " " + font;
		return context.font;
	};
	
	SuperCanvas.prototype.color = function(color){
		var context = this.context;
		context.fillStyle = color;
		return context.fillStyle;
	};
	
	SuperCanvas.prototype.drawRectangle = function(x, y, width, height, color){
		var context = this.context;
		if (color) {	
			context.fillStyle = color;
		}
		context.beginPath();
		context.fillRect(x, y, width, height);
		context.closePath();
		return context.fill();
	};
	
	SuperCanvas.prototype.drawCircle = function(x, y, radius, color){
		var context = this.context;
		if (color) {	
			context.fillStyle = color;
		}
		context.beginPath();
		context.arc(x, y, radius, 0, Math.PI*2, true); 
		context.closePath();
		return context.fill();
	};
	
	SuperCanvas.prototype.drawImage = function(url, x, y, width, height){
		var context = this.context;
		var image = new Image();
		image.onload = function(){
			context.drawImage(image, x, y, width, height);
		};
		//image.crossOrigin = "anonymous";
		image.src = url;
	};
	
	SuperCanvas.prototype.drawText = function(text, x, y, w){
		var context = this.context;
		if (w) {
			return context.fillText(text, x, y, w);
		} else {
			return context.fillText(text, x, y);
		}
	};
	
	SuperCanvas.prototype.clear = function(){
		var context = this.context;
		context.clearRect(0, 0, this.canvas.width, this.canvas.height);	
	};
	
	// This was used to be compatible with the regular canvas api
	// I dont use it anymore because trying to be compatible just caused problems
	function initAPI(canvas, context){
		for (var key in context) {
			var obj = context[key];
			if (typeof obj == "function") {
				canvas[key] = obj;
			}
		}
	};
	
	global.SuperCanvas = SuperCanvas;
	
})(document, window);