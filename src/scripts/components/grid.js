// create an individual button
var createString = function(id){
  var stringStart = "<label class='item' for='item-" + id + "'>"
  var stringEnd = "</label>";
  var stringButton1 = "<button id='start' onclick='buttonClick(" + id + ")>start</button>";
  var stringCheckbox = "<input type='checkbox' id='item-" + id + "'/>";

  // return stringStart + stringButton1 + stringEnd;
  return stringStart + stringEnd + stringEnd;
};

// create a row of buttons
var createRow = function(id, width){
  var stringStart = "<div class='row' id='row-" + id + "'>";
  var stringEnd = "</div>";
  var string = "";

  for (var i = 0; i < width; i++){
    var buttonId = id + "" + i;
    var button = createString(buttonId);
    string += button;
  }
  return stringStart + string + stringEnd;
}

// create a colum of buttono
var createColumn = function(id, height){
  var stringStart = "<div class='column' id='column-" + id + "'>";
  var stringEnd = "</div>";
  var string = "";

  for (var i = 0; i < height; i++){
    var buttonId = id + "" + i;
    var button = createString(buttonId);
    string += button;
  }
  return stringStart + string + stringEnd;
}

// create a grid by creating rows of buttons
var createGrid = function(countX, countY, container){
  var grid = '';
  for (var j = 0; j < countY; j++ ){
    grid += createColumn(j, countX);
  }
  // return grid;
  container.innerHTML += grid;
}

export default createGrid;
