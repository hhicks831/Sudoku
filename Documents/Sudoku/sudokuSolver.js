window.onload = init();



//generates and styles table of squares
function init(){

	var table = [];

	for(i = 0; i < 81; i++ ){


		if(i % 9 == 0){

			if(Math.floor(i / 9) == 2 || Math.floor(i / 9) == 5){
				table[i] = "<tr><td class='bold-bottom'><input type='text' id='square"+i+"'class='field-large'/></td>";
			
			}
			else{
			table[i] = "<tr><td><input type='text' id='square"+i+"'class='field-large'/></td>";
			}
		}

		else if(i % 9 == 8){

			if(Math.floor(i / 9) == 2 || Math.floor(i / 9) == 5){
				table[i] = "<td class='bold-bottom'><input type='text' id='square"+i+"'class='field-large'/></td></tr>";

			}

			else {

				table[i] = "<td><input type='text' id='square"+i+"'class='field-large'/></td></tr>";
			}
		}

		else if(i % 9 == 2 || i % 9 == 5){ 

			if(Math.floor(i / 9) == 2 || Math.floor(i / 9) == 5){

				table[i] = "<td class='bold-right bold-bottom'><input type='text' id='square"+i+"'class='field-large'/></td>";

			}

			else{
			table[i] = "<td class='bold-right'><input type='text' id='square"+i+"'class='field-large'/></td>";
			}
		}

		else {
			if(Math.floor(i / 9) == 2 || Math.floor(i / 9) == 5){

				table[i] = "<td class='bold-bottom'><input type='text' id='square"+i+"'class='field-large'/></td>";
			}
			else {
				 table[i] = "<td><input type='text' id='square"+i+"'class='field-large'/></td>";
			}
		}
	}

	document.getElementById("setup").innerHTML = table.join("");
}


//  primative for square object


// turns Square ID# into a row number
function whichRow(i){

	var row = (Math.floor(i / 9) + 1);
	return row;
}

// turns square ID into a column number
function whichColumn(i){

	var column = (i % 9) + 1;
	return column;
}

// turns square ID into a box number
function whichBox(i){

	var row = whichRow(i);
	var column = whichColumn(i);
	if((row <= 3) && (column <= 3)) {
		var box = 1;
	}
	if((row <= 3) && (3 < column) && (column <= 6)) {
		var box = 2;
	}
	if((row <= 3) && (6 < column) && (column <= 9)) {
		var box = 3;
	}
	if((3 < row) && (row <= 6) && (column <= 3)) {
		var box = 4;
	}
	if((3 < row) && (row <= 6) && (3 < column) && (column <= 6)) {
		var box = 5;
	}
	if((3 < row) && (row <= 6) && (6 < column) && (column <= 9)) {
		var box = 6;
	}
	if((6 < row) && (row <= 9) && (column <= 3)) {
		var box = 7;
	}
	if((6 < row) && (row <= 9) && (3 < column) && (column <= 6)) {
		var box = 8;
	}
	if((6 < row) && (row <= 9) && (6 < column) && (column <= 9)) {
		var box = 9;
	}

	return box;
}

//initializes possible values for a given square
function possibleValues(i){

	var possibilities = [];
	var input = document.getElementById("square"+i+"").value;

	if (input.length > 0){
		if(0 < input <=9){

			possibilities = [input];
		}
		else {

	 		possibilities = ["1","2","3","4","5","6","7","8","9"];
		}
	}
	if(input.length == 0){

			possibilities = ["1","2","3","4","5","6","7","8","9"];
	}

	return possibilities;
}


// tests to see if each user input is a number 0-9 
function checkInputs(){
	var errorMessage = "";
	document.getElementById("errors").innerHTML = errorMessage;
	var errors = [];
	for( i = 0; i < 81; i++){

		document.getElementById("square"+i+"").style.color = "black";
	}
	for(i = 0; i < 81; i++){
		var input = document.getElementById("square"+i+"").value;
		if (input == ""){}
		else if ((input >= 0) && (input <= 9)){}
		else {
			errors.push("square"+i+"")
		} 
	}
	if (errors.length > 0){

		for( i = 0; i < errors.length ; i++){

		document.getElementById(errors[i]).style.color = "red";
	}

	var errorMessage = "<h3>Errors in your puzzle are highlighted in red.  Please correct and resubmit</h3>";
	document.getElementById("errors").innerHTML = errorMessage;

	}

	else {
	checkConsistency();
}
}


function checkConsistency(){

	var errorMessage = "";
	document.getElementById("errors").innerHTML = errorMessage;
	var errors = [];
		for( i = 0; i < 81; i++){
		document.getElementById("square"+i+"").style.color = "black";
	}
	for(i = 0; i < 81; i++){
		var squareOne = document.getElementById("square"+i+"").value;
		var sO = i;
		if (squareOne == ""){}
		else {
			for(j = 0; j < 81; j++){
			var squareTwo = document.getElementById("square"+j+"").value;
			var sT = j;
			if (squareTwo == ""){}
			else {
				if (squareOne !== squareTwo){}
				else {
					if (((whichRow(sO) == whichRow(sT)) || (whichColumn(sO) == whichColumn(sT)) || (whichBox(sO) == whichBox(sT))) && (sO !== sT)) {
						errors.push("square"+sO+"");
					}

				}

				}
			}

		}


	}

		if (errors.length > 0){

		for( i = 0; i < errors.length ; i++){

		document.getElementById(errors[i]).style.color = "red";
	}

	var errorMessage = "<h3>Inconsistencies in your puzzle are highlighted in red.  Please correct and resubmit</h3>";
	document.getElementById("errors").innerHTML = errorMessage;

	}

		else{
			solve();
		}
}

function copy(o) {
   var out, v, key;
   out = Array.isArray(o) ? [] : {};
   for (key in o) {
       v = o[key];
       out[key] = (typeof v === "object") ? copy(v) : v;
   }
   return out;
}


function square(number, row, column, box, values, calcified){

	this.number = number;
	this.row = row;
	this.column = column;
	this.box = box;
	this.values = values;
	this.calcified = calcified;

}

function guess(number, oldValues, guessedValue, puzz){

	this.number = number;
	this.oldValues = oldValues;
	this.guessedValue = guessedValue;
	this.puzz = puzz;

}


function solve(){
	var puz = [];
	var oldNums = [];
	var k = 0;
	var puzzle = [];
	var rabbitHole = [];
	var a = 0;

	for(i = 0; i < 81; i++){

		puzzle[i] = new square(i, whichRow(i), whichColumn(i), whichBox(i), possibleValues(i), 0);

	}

	grind();


	function grind(){

	var solved = 0;

	for(i = 0; i < 81; i++){

		solved = solved + puzzle[i].calcified;
	}

	while(solved < 81){
		solved = 0;
		var progress = 0;
		for(i = 0; i < 81; i++){
			if((puzzle[i].values.length == 1) && (puzzle[i].calcified == 0)){

				for(j = 0; j < 81; j++){
					if (((puzzle[i].row == puzzle[j].row) || (puzzle[i].column == puzzle[j].column) || (puzzle[i].box == puzzle[j].box)) && (puzzle[i].number !== puzzle[j].number)) {
						if(puzzle[j].values.indexOf(puzzle[i].values[0]) > -1){
							var index = puzzle[j].values.indexOf(puzzle[i].values[0]);
							puzzle[j].values.splice(index, 1);
							progress++;
						}
					}

				}

				puzzle[i].calcified = 1;
			}
		}
	


		//guess function placeholder

		if(progress == 0){
			
			var minLength = 9;
			var minLengthId = 80;

			for(i = 0; i < 81; i++){
				var badGuess = 0;
				if(puzzle[i].values.length == 0){

					badGuess++;
				}

				if(badGuess > 0){

					
					if (a == 0){

						var errorMessage = "<h3> This puzzle has no valid solution.</h3>";
						document.getElementById("errors").innerHTML = errorMessage;

					}

					else{

					puzzle = new copy(rabbitHole[(a - 1)].puzz);
					puzzle[rabbitHole[(a - 1)].number].values.shift();
					puzzle[rabbitHole[(a - 1)].number].calcified = 0;
					rabbitHole.pop()
					a--;
					badGuess = 0;
					grind();
				}
				}


			}

			for(i = 0; i < 81; i++){
				
				
				if((puzzle[i].values.length > 1) && (puzzle[i].values.length < minLength)){
					minLength = puzzle[i].values.length;
					minLengthId = i;
				}
			}


			
			puz = new copy(puzzle);
			

			for (k = 0; k < puzzle[minLengthId].values.length; k++){

				oldNums[k] = puzzle[minLengthId].values[k];
			}


			rabbitHole[a] = new guess(minLengthId, oldNums, puzzle[minLengthId].values[0], puz);
			puzzle[minLengthId].values.splice(1 , puzzle[minLengthId].values.length);
			//rabbitHole[a].puzz.puzzle[minLengthId].values.splice(0);
			//rabbitHole[a].puzz.puzzle[minLengthId].values = rabbitHole[a].oldValues;


			a++;
			
			grind();

		}


			for(i = 0; i < 81; i++){

			solved = solved + puzzle[i].calcified;
			}
	}
	}
		

		for(i = 0; i < 81; i++){

		var endValue = ""+puzzle[i].values+""
		document.getElementById("square"+i+"").value = endValue;
		document.getElementById("square"+i+"").style.color = "green";

		}
}






