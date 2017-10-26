var N = 250; 
var numbers=Array.apply(null, {length: N}).map(Number.call, Number);
var colors=palette('tol-rainbow', N);
var color_array=[];
var sort_status=false;

class Row {
	constructor(colors, row_number) {
		this.rowNumber=row_number;
		this.updateVisual = false;
		this.array = colors.slice(0); 
  	}

	cocktail_sort() {
				var swapped = false
				for (var i = 0; i < this.array.length - 2; i++) {
					if (this.array[i] > this.array[i + 1]) {
						this.swap(i, i + 1);
						swapped=true;
					//	updateVisual();
					}
				}
			if(swapped){
				for (let i = this.array.length - 2; i > 0; i--) {
					if (this.array[i] > this.array[i + 1]) {
						this.swap(i, i + 1);
						swapped=true;
					//	updateVisual();
					}
				}
			}
	//	updateVisual();
		//console.log("Array "+this.rowNumber+" :: "+swapped);
	}

	bubble_sort(){
		var swapped = false
		for (var i = 0; i < this.array.length - 1; i++) {
			if (this.array[i] > this.array[i + 1]) {
				this.swap(i, i + 1);
				swapped=true;
			}
		}
	}

	swap(index1, index2) {
		var number1 = this.array[index1];
		var number2 = this.array[index2];
		this.array[index1] = number2;
		this.array[index2] = number1;
		this.updateVisual=true;
		updateSquares(index1, index2, this.rowNumber);
	}
  
	getArray(){
		return this.array;
	}
	getRowNumber(){
		return this.rowNumber;
	}
}

function initialize(){
	for(i=0; i<N; i++)
	{
		color_array.push(new Row(shuffle(numbers), i));
	}
	updateVisual();
}

function shuffle(array1) {
	for (var i = array1.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array1[i];
		array1[i] = array1[j];
		array1[j] = temp;
	}
	return array1;
}

function checkUpdate(){
	var update=false;
	//console.log("Checking update!");
	for(var i=0; i<N; i++){
		if(color_array[i].updateVisual){
			update=true;
	//		console.log("Array "+i+" updated!");
		}
	}
	if(update){
	//	console.log("Updating!");
	//	updateVisual();
		for(var i=0; i<N; i++){
			color_array[i].updateVisual=false;
		}
	}
	return update;
}

function updateVisual() {
	var canvas=document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
		for (var x = 0, i = 0; i < N; x += ((canvas.width-10)/N), i++) {
			for (var y = 0, j = 0; j < N; y += ((canvas.height-10)/N), j++) {
				//ctx.beginPath();
				drawSquare(ctx, i, j,x,y, ((canvas.width-10)/N), ((canvas.height-10)/N));
				//ctx.rect(x, y,((canvas.width-10)/N), ((canvas.height-10)/N) );
				//ctx.fillStyle = colors[color_array[j].getArray()[i]];
			//	ctx.fillStyle = "rgb(50,50,255)";
				//ctx.fill();
			}
	}
}

function drawSquare(ctx, i, j, x, y, width, height){
		ctx.beginPath();
		ctx.rect(x, y, width, height);
		ctx.fillStyle = colors[color_array[j].getArray()[i]];
	//	ctx.fillStyle = "rgb(50,50,255)";
		ctx.fill();
		ctx.closePath();
}

function updateSquares(square1, square2, row){
	var canvas=document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var width=((canvas.width-10)/N);
    var	height=((canvas.height-10)/N);
	drawSquare(ctx, square1, row, (square1*width), (row*height), width, height);
	drawSquare(ctx, square2, row, (square2*width), (row*height), width, height);
}	

function setIntervalWrapper(callback, time) {
	  var args = Array.prototype.slice.call(arguments, 1);
	    args[0] = setInterval(function() {
			    callback.apply(sort2(), args);
				  }, time);
}

function sort(){
//	console.log("Setting up interval!");
	if((3600/N)<500){
		time=500
	}
	else{
		time=3600/N
	}
	var counter = 0;
	setIntervalWrapper(function(handle, arg1, arg2) {
		document.getElementById("sort").disabled=true;
		counter++;
		document.getElementById("counter_value").innerHTML=counter;
//		console.log("Interval callback called, handle is " + handle + ". Currently at :: "+counter+" iterations.");
		if (!sort_status && counter>0) {
			clearInterval(handle);
		}
	}, time);
//	sort2();
}

function sort2(){
	//console.log("Sorting!");
	if(document.getElementById("bubbleSort").checked){
		for(var i=0; i < N; i++){
			color_array[i].bubble_sort()
		}
	}
	else if(document.getElementById("cocktailSort").checked){
		for(var i=0; i < N; i++){
			color_array[i].cocktail_sort()
		}
	}
	else{
		sort_status=true;
	}
	sort_status=checkUpdate();
}


