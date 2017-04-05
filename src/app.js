import { Howl } from 'howler';

import createGrid from './scripts/components/grid.js';
import animations from './scripts/animations.js';

import sampleRefs from './sampleRefs.js';


// function createAudio(){
//   audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//
//   oscillator = this.audioCtx.createOscillator();
//   gainNode = audioCtx.createGain();
//
//   oscillator.type = 'sine';
//   oscillator.frequency.value = 300;
//
//   gainNode.gain.value = 0.5;
//
//   oscillator.connect(gainNode);
//   gainNode.connect(audioCtx.destination);
//   oscillator.start();
// }
//
// function stopAudio(){
//   oscillator.stop();
// }
//
// var buttonClick = function(id, osc){
//   var editedId = (id * 10) + 100;
//
//   try {
//     oscillator.frequency.value = editedId;
//   } catch (e) {
//     console.log(e)
//   }
// }

function createSound(id){
  var sound = new Howl({
    src: ['./audio/' + sampleRefs[id].name ]
  });
  return sound;
};


var timedLoop;
var value = 0;

function createTimedLoop(bpm, bars){
  var label = document.getElementById('bpm-label');
  label.innerHTML = 'bpm ' + bpm;
  var time = (60 / bpm) * 1000;
  var columns = document.querySelectorAll('.column');
  var tickerFunction = function () {
    // Animate all children in the column
    TweenMax.to(columns[value].children, .3, {
        scale: 1.5,
        yoyo: true,
        repeat: 1
    });
    for (var k = 0; k < columns[value].children.length; k++){
      if (columns[value].children[k].children[0].checked == true){
        var singleSound = createSound(k * 10);
        singleSound.play();
      };
      console.log(columns[value].children[k].checked == true);
    }
    // Check
    value = (value >= bars - 1) ? 0 : value + 1;
  }
  // tickerFunction();
  timedLoop = setInterval(tickerFunction, time)
};


function clearCurrentInterval(t){
  clearInterval(t);
  console.log('stop timer');
};

document.addEventListener('DOMContentLoaded', function(){
  // Get DOM elements
  // Container for the sequence
  var container = document.getElementById('container');

  // Playback control buttons
  var playButton = document.getElementById('play');
  var stopButton = document.getElementById('stop');
  var bpmButton = document.getElementById('bpm');

  // Set variables
  var bars = 8;
  var tracks = 8;
  var bpm = 60;

  // Add event listeners to playback controls
  playButton.addEventListener('click', function(){
    console.log('play');
    createTimedLoop(bpm, bars);
  });

  stopButton.addEventListener('click', function(){
    console.log('stop');
    clearCurrentInterval(timedLoop);
  });

  bpmButton.addEventListener('input', function(e){
    // debugger;
    var bpms = this.value;
    console.log(this.value);
    clearCurrentInterval(timedLoop);
    createTimedLoop(bpms, bars);
  });

  var grid = createGrid(tracks, bars, container);


  // Find dots in the center for text fading animation
  var items = document.querySelectorAll('.item');

  var hiddenDots = [];
  var visibleDots = [];

  items.forEach(function(item, index){
    if (
      (index > 31 && index < 38) ||
      (index > 41 && index < 48) ||
      (index > 51 && index < 58) )
    {
      hiddenDots.push(item);
    } else {
      visibleDots.push(item);
    }
  });

  // console.log(sampleRefs);


  // Animations
  animations.animateDotsIn(visibleDots);
  // animations.animateMiddleDots(hiddenDots);
  // animations.animateTextIn(text);
  // animations.animateButtonsIn()
});
