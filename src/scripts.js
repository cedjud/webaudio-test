function createAudio(){
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  oscillator = this.audioCtx.createOscillator();
  gainNode = audioCtx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = 300;

  gainNode.gain.value = 0.5;

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
}

function stopAudio(){
  oscillator.stop();
}

var buttonClick = function(id, osc){
  var editedId = (id * 10) + 100;

  try {
    oscillator.frequency.value = editedId;
  } catch (e) {
    console.log(e)
  }
}

// create an individual button
var createString = function(id){
  var stringStart = "<div class='item' onclick='buttonClick(" + id + ")' id='item-" + id + "'>"
  var stringEnd = "</div>";
  var stringButton1 = "<button id='start'>start</button>";

  return stringStart + stringButton1 + stringEnd;
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

// create a grid by creating rows of buttons
var createGrid = function(countX, countY){
  var grid = '';
  for (var j = 0; j < countY; j++ ){
    grid += createRow(j, countX);
  }
  return grid;
}

var getRandomCoordinate = function(){
  var num = Math.floor(Math.random()* (125 - 50) + 75); // this will get a number between 1 and 99;
  num *= Math.floor(Math.random()*2) == 1 ? 1 : -1; // this will add minus sign in 50% of cases
  return num;
}


// GSAP Animation functions
var animateDotsIn = function(items){
  for (var i = 0; i < items.length; i++){
    var x = getRandomCoordinate();
    var y = getRandomCoordinate();
    TweenMax.set(items[i], {z:0.01});
    TweenMax.from(items[i], 6, {opacity: 0, delay: 2});
    TweenMax.from(items[i], 5, {x: x, y: y, ease: Quad.easeInOut});
  }
};

var animateMiddleDots = function(dots){
  TweenMax.set(dots, {opacity: 0});
  TweenMax.to(dots, .2, {opacity: 1, delay: 10.2});
}

var animateTextIn = function(){
  TweenMax.from('#title', 1, {opacity: 0, delay: 3});
  TweenMax.to('#title', .2, {opacity: 0, delay: 10});
}

document.addEventListener('DOMContentLoaded', function(){
  var container = document.getElementById('container');

  var countX = 10;
  var countY = 9;

  var grid = createGrid(countX, countY);

  container.innerHTML += grid;

  var items = document.querySelectorAll('.item');

  var hiddenDots = [];
  var visibleDots = [];

  items.forEach(function(item, index){
    if ( (index > 31 && index < 38) || (index > 41 && index < 48) || (index > 51 && index < 58) ){
      hiddenDots.push(item);
    } else {
      visibleDots.push(item);
    }
  })

  animateDotsIn(visibleDots);
  animateMiddleDots(hiddenDots);
  animateTextIn(text);

  TweenMax.from('.btn', 1, {opacity: 0, delay: 3});
});
