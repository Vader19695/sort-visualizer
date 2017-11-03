//Global Vars
var N = 50; 
var counter = 0;
var numbers=Array.apply(null, {length: N}).map(Number.call, Number);
var colors=palette('tol-rainbow', N);
var color_array=[];
var sort_status=false;

function initialize(){
	for(i=0; i<N; i++)
	{
		color_array.push(new Row(shuffle(numbers), i));
	}
	updateVisual();
}

function updateRender(number){
	if(number){	
		N=number;
	}
	numbers=Array.apply(null, {length: N}).map(Number.call, Number);
	colors=palette('tol-rainbow', N);
	color_array=[];
	counter=0;
	document.getElementById("counter_value").innerHTML=counter;
	document.getElementById("sort").disabled=false;
	initialize();
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
	for(var i=0; i<N; i++){
		if(color_array[i].updateVisual){
			update=true;
		}
	}
	updateVisual();
	if(update){
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
				ctx.beginPath();
				//drawSquare(ctx, i, j,x,y, ((canvas.width-10)/N), ((canvas.height-10)/N));
				ctx.rect(x, y,((canvas.width-10)/N), ((canvas.height-10)/N) );
				ctx.fillStyle = '#'+colors[color_array[j].getArray()[i]];
			//	ctx.fillStyle = "rgb(50,50,255)";
				ctx.fill();
			}
	}
}

function drawSquare(ctx, i, j, x, y, width, height){
		ctx.beginPath();
		ctx.rect(x, y, width, height);
		ctx.fillStyle = colors[color_array[i].getArray()[j]];
		ctx.fill();
		ctx.closePath();
}

/*
function updateSquares(square1, square2, row){
	var canvas=document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var width=((canvas.width-10)/N);
    var	height=((canvas.height-10)/N);
	drawSquare(ctx, square1, row, (square1*width), (row*height), width, height);
	drawSquare(ctx, square2, row, (square2*width), (row*height), width, height);
}	
//*/
function setIntervalWrapper(callback, time) {
	  var args = Array.prototype.slice.call(arguments, 1);
	    args[0] = setInterval(function() {
			    callback.apply(sort2(), args);
				  }, time);
}

function sort(){
	if((3600/N)<500){
		time=100
	}
	else{
		time=3600/N
	}
	document.getElementById("renderButton").disabled=true;
	setIntervalWrapper(function(handle, arg1, arg2) {
		document.getElementById("sort").disabled=true;
		counter++;
		document.getElementById("counter_value").innerHTML=counter;
		if (!sort_status && counter>0) {
			clearInterval(handle);
			document.getElementById("renderButton").disabled=false;
			updateVisual();
		}
	}, time);
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
			color_array[i].cocktail_sort();
		}
	}
	else if(document.getElementById("insertionSort").checked){
		var i=Array.apply(null, Array(N)).map(Number.prototype.valueOf,1);
		var j=Array.apply(null, Array(N)).map(Number.prototype.valueOf,1);
		for(var k=0; k<N; k++){
			temp=color_array[k].insertion_sort(i[k], j[k]);
			i[k]=temp[0];
			j[k]=temp[1];
		}
	}
	else{
		sort_status=true;
	}
	sort_status=checkUpdate();
}


