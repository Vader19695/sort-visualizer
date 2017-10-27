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
				}
			}
			updateVisual()
			if(swapped){
				for (let i = this.array.length - 2; i > 0; i--) {
					if (this.array[i] > this.array[i + 1]) {
						this.swap(i, i + 1);
						swapped=true;
					}
				}
			}
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

	insertion_sort(i,j){
		if(i < this.array.length){
			console.log(j);
			if(j<=0){
				console.log("Here");
				i=i+1;
				j=i;
			}
			if(j>0 && this.array[j-1] > this.array[j]){
				this.swap(j-1, j);
				j=j-1;
			}
			else if(this.array[j-1] < this.array[j]){
				j=j-1;
				console.log("here2");
			}
		}
		return[i, j];
	}

	swap(index1, index2) {
		var number1 = this.array[index1];
		var number2 = this.array[index2];
		this.array[index1] = number2;
		this.array[index2] = number1;
		this.updateVisual=true;
	}
  
	getArray(){
		return this.array;
	}
	getRowNumber(){
		return this.rowNumber;
	}
}
