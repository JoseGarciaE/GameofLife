function createTable() {
    var gameoflife = document.querySelector("#gameoflife");
  
    var table = document.createElement('TABLE');
    table.style.border = "1px solid black"
  
    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);
  
    for (var i = 0; i < 18; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);
        
        for (var j = 0; j < 11; j++) {
            var td = document.createElement('TD');
            td.appendChild(document.createTextNode(""));
            td.style.border = '1px solid black';
            td.setAttribute("id", "cell" + i.toString()+j.toString());
            tr.appendChild(td);
        }
    }
    gameoflife.appendChild(table);

   var button = document.createElement("BUTTON")
   button.textContent = "Start";
   button.setAttribute("id", "start");
   gameoflife.appendChild(button); 

   button = document.createElement("BUTTON")
   button.textContent = "Pause";
   button.setAttribute("id", "pause");
   gameoflife.appendChild(button); 

   

}


function updateTable(board){

    for (var i = 0; i < 18; i++){
        for (var j = 0; j < 11; j++){

            let color = board[i][j].toString();

            if(color === "1")
                color = "#293f50";
            else    
                color = "white";
            
            var element = document.querySelector("#cell" + i.toString() + j.toString());

            element.style.backgroundColor = color;
            
        }
    }

}

function neighbors(oldBoard, row, col){

	var count = 0;

	if(oldBoard[row-1][col] == 1)
		count++;
	if(oldBoard[row-1][col+1] == 1)
		count++;
	if(oldBoard[row][col+1] == 1)
		count++;
	if(oldBoard[row+1][col+1] == 1)
		count++;
	if(oldBoard[row+1][col] == 1)
		count++;
	if(oldBoard[row+1][col-1] == 1)
		count++;
	if(oldBoard[row][col-1] == 1)
		count++;
	if(oldBoard[row-1][col-1] == 1) 
		count++;

	return count;
}



function advanced(board){

    var oldBoard = [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,1,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,1,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]		 
    ];

    for(var i=0; i<18; i++){
		for(var j=0; j<11; j++){
			oldBoard[i][j] = board[i][j];
		}
	}

	for(var i=1; i<17; i++){
		for(var j=1; j<10; j++){
			if(oldBoard[i][j] == 1 && neighbors(oldBoard,i,j) < 2)
				  board[i][j] = 0;
			if(oldBoard[i][j] == 1 && neighbors(oldBoard,i,j) > 3)
				  board[i][j] = 0;
			if(oldBoard[i][j] == 1 && (neighbors(oldBoard,i,j) == 2 || neighbors(oldBoard,i,j) == 3) )
				  board[i][j] = 1;
			if(oldBoard[i][j] == 0 && neighbors(oldBoard,i,j) == 3)
				  board[i][j] = 1;
		}
	}	
    
    return board;

}


document.addEventListener("DOMContentLoaded",function(){

    createTable();

    var board = [
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,1,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,1,0,1,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0]		 
    ];

    updateTable(board);

    var iteration;

    document.querySelector("#start").addEventListener("click",function(){    
        document.querySelector("#start").disabled = true;
        iteration = setInterval(function myTimer(){
            board = advanced(board);
            updateTable(board);
        },350);
    });
        

    document.querySelector("#pause").addEventListener("click",function(){
        document.querySelector("#start").disabled = false;
        clearTimeout(iteration);
    });







    
});