var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var nextOscillator = function(name){
  console.log('create osc');
  osc = audioCtx.createOscillator();
  osc.type = 'sine';
  osc.frequency.value = 300;
  osc.connect(gainNode);
  return osc;
}

var osc = nextOscillator();

var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

// var WIDTH = window.innerWidth;
// var HEIGHT = window.innerHeight;

var maxFreq = 600;
var maxVol = 1;

var initialFreq = 300;
var initialVol = 0.5;

// set options for the oscillator
oscillator.type = 'sine'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
oscillator.frequency.value = initialFreq; // value in hertz
// oscillator.start();

gainNode.gain.value = initialVol;

oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);

// // Mouse pointer coordinates
// var CurX;
// var CurY;
//
// // Get new mouse pointer coordinates when mouse is moved
// // then set new gain and pitch values
//
// document.onmousemove = updatePage;
//
// function updatePage(e) {
//     CurX = (window.Event) ? e.pageX : event.clientX + (document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft);
//     CurY = (window.Event) ? e.pageY : event.clientY + (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);
//
//     oscillator.frequency.value = (CurX/WIDTH) * maxFreq;
//     gainNode.gain.value = (CurY/HEIGHT) * maxVol;
//
//      canvasDraw();
// }
//
// function random(number1,number2) {
//   var randomNo = number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
//   return randomNo;
// }
//
// var canvas = document.querySelector('.canvas');
// canvas.width = WIDTH;
// canvas.height = HEIGHT;
//
// var canvasCtx = canvas.getContext('2d');
//
// function canvasDraw() {
//   rX = CurX;
//   rY = CurY;
//   rC = Math.floor((gainNode.gain.value/maxVol)*30);
//
//   canvasCtx.globalAlpha = 0.2;
//
//   for(i=1;i<=15;i=i+2) {
//     canvasCtx.beginPath();
//     canvasCtx.fillStyle = 'rgb(' + 100+(i*10) + ',' + Math.floor((gainNode.gain.value/maxVol)*255) + ',' + Math.floor((oscillator.frequency.value/maxFreq)*255) + ')';
//     canvasCtx.arc(rX+random(0,50),rY+random(0,50),rC/2+i,(Math.PI/180)*0,(Math.PI/180)*360,false);
//     canvasCtx.fill();
//     canvasCtx.closePath();
//   }
// }

var toggle = function(osc, action){
  switch (action) {
    case 'start':
        osc.start();
      break;
    case 'stop':
        console.log('stop');
        console.log(osc);
        osc.stop();
      break;
    default:
      var value = parseInt(action + '00');
      oscillator.frequency.value = value;
      console.log(typeof(value));
  }
}

document.addEventListener('DOMContentLoaded', function(){
  var buttons = document.querySelectorAll('button');

  for (i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click', function(){
      toggle(this.id);
    });
  }
});
