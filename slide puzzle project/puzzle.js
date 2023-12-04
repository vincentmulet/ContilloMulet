var row = 3;
var col = 3;

var currentTile;
var otherTile;

var moves = 0;

var basePath = "./img/";
var imageOrder = ["4", "2", "8", "5", "1", "6", "7", "9", "3"];
//var imageOrder = ["1", "3", "2", "4", "5", "6", "7", "8", "9"]; //testing array

window.onload = function () {

  for (let rw = 0; rw < row; rw++) 
  {
    for (let cl = 0; cl < col; cl++) 
    {
      let tile = document.createElement("img");
      tile.id = rw.toString() + "-" + cl.toString();
      tile.src = basePath + imageOrder.shift() + ".jpg";

      tile.addEventListener("dragstart", dragStart);
      tile.addEventListener("dragover", dragOver);
      tile.addEventListener("dragenter", dragEnter);
      tile.addEventListener("dragleave", dragLeave);
      tile.addEventListener("drop", dragDrop);
      tile.addEventListener("dragend", dragEnd);

      document.getElementById("puzzle").append(tile);
    }
  }
};

function dragStart() {
  currentTile = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
  otherTile = this;
}

function dragEnd() {
  if (!otherTile.src.includes("3.jpg")) 
  {
    return;
  }

  let currentCordinate = currentTile.id.split("-");
  let rw = parseInt(currentCordinate[0]);
  let cl = parseInt(currentCordinate[1]);

  let otherCordinate = otherTile.id.split("-");
  let rw2 = parseInt(otherCordinate[0]);
  let cl2 = parseInt(otherCordinate[1]);

  let left = rw == rw2 && cl2 == cl - 1;
  let right = rw == rw2 && cl2 == cl + 1;

  let up = cl == cl2 && rw2 == rw - 1;
  let down = cl == cl2 && rw2 == rw + 1;

  let adjacent = left || right || up || down;

  if (adjacent) 
  {
    let currentImage = currentTile.src;
    let otherImage = otherTile.src;

    currentTile.src = otherImage;
    otherTile.src = currentImage;

    moves += 1;
    document.getElementById("moves").innerText = moves;

    puzzleComplete();
  }
}

var completePuzzle = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

function puzzleComplete() {
  let puzzleState = currentPuzzle();

  if (arraysEqual(puzzleState, completePuzzle)) 
  {
    alert("Congratulations! You've completed the puzzle!");
    replaceImage();
  }
}

function currentPuzzle() {
  let currentState = [];
  for (let rw = 0; rw < row; rw++) 
  {
    for (let cl = 0; cl < col; cl++) 
    {
      let tile = document.getElementById(rw.toString() + "-" + cl.toString());
      currentState.push(tile.src.split("/").pop().split(".")[0]);
    }
  }
  return currentState;
}

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) 
  {
    return false;
  }

  for (let i = 0; i < arr1.length; i++) 
  {
    if (arr1[i] !== arr2[i]) 
    {
      return false;
    }
  }
  return true;
}

function replaceImage(){
  for (let rw = 0; rw < row; rw++) 
  {
    for (let cl = 0; cl < col; cl++) 
    {
      let tile = document.getElementById(rw.toString() + "-" + cl.toString());
      if(tile.src.includes("3.jpg")){ 
        tile.src = basePath + "3orig.jpg"; 
      }
    }
  }
}