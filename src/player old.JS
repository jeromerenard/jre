var context = new AudioContext();
var analyser = context.createAnalyser();
var WIDTH = 500;
var HEIGHT = 50;

var myAudio = document.querySelector('audio');
var audioSource = context.createMediaElementSource(myAudio);

audioSource.connect(analyser);
analyser.connect(context.destination);

var canvas = document.querySelector('.visualizer');
var myCanvas = canvas.getContext("2d");

analyser.fftSize = 256;

var bufferLength = analyser.frequencyBinCount;
console.log(bufferLength);
var dataArray = new Uint8Array(bufferLength);

myCanvas.clearRect(0, 0, WIDTH, HEIGHT);

function draw() {
  drawVisual = requestAnimationFrame(draw);

  analyser.getByteFrequencyData(dataArray);

  myCanvas.fillStyle = 'rgb(0, 0, 0)';
  myCanvas.fillRect(0, 0, WIDTH, HEIGHT);

  var barWidth = (WIDTH / bufferLength) * 2.5;
  var barHeight;
  var x = 0;

  for (var i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i]/2;

    myCanvas.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
    myCanvas.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight);

    x += barWidth + 1;

  } 
};

draw();


/////////
//TEST RMS
///////
var context = new AudioContext();
var analyser = context.createAnalyser();

analyser.minDecibels = -95;
analyser.maxDecibels = -10;

var WIDTH = 500;
var HEIGHT = 50;

var myAudio = document.querySelector('audio');
var audioSource = context.createMediaElementSource(myAudio);

audioSource.connect(analyser);
analyser.connect(context.destination)

var canvas = document.querySelector('.visualizer');
var myCanvas = canvas.getContext("2D");

analyser.smoothingTimeConstant = 0.5;
analyser.fftsize = 256;

var bufferLenght= analyser.frequencyBinCount; // capture temps morceaux? 

var dataArray = new Uint8Array(bufferLenght);

myCanvas.clearRect(0,0, WIDTH, HEIGHT);

function draw() {
  drawVisu = requestAnimationFrame(draw);

  analyser.getByteTimeDomainData(dataArray); // analyse niveau ???


  var barWidth = (WIDTH / bufferLength) * 2; //Largeur de la bar RMS a l'instant -- bufferLenght => Longueur du morceaux



  for (var i = 0; i < bufferLenght; i++){
    barHeight = dataArray[i];

  }

}

draw();









//bufferlenght => Longueur du morceaux ? 



/////////////////////////////




























/*
var c = document.getElementById("canvas_player");
var ctx = c.getContext("2d");

var x=225;
var y=225;
var r=30;

for(var i=1; i<=5; i++) {
    ctx.beginPath();
    var rayon=r*i;
    var angleInitial=0;
    var angleFinal = 2*Math.PI; // Point d'arrivée sur le cercle
    var antihoraire = true; // Horaire ou antihoraire
    ctx.arc(x, y, rayon, angleInitial, angleFinal, antihoraire);
    ctx.stroke();
}

ctx.beginPath ();
ctx.arc(x, y, r*6, angleInitial, 1.5/Math.PI, false);
ctx.stroke();
ctx.beginPath ();
ctx.arc(x, y, r*6, 2/Math.PI, 3/Math.PI, false);
ctx.stroke();


ctx.beginPath();
ctx.moveTo(x,y-r);
ctx.lineTo(x,y-(r*5));

ctx.moveTo(x,y+r);
ctx.lineTo(x,y+(r*5));

ctx.moveTo(x-r,y);
ctx.lineTo(x-(r*5),y);

ctx.moveTo(x+r,y);
ctx.lineTo(x+(r*5),y);

ctx.moveTo(x-r/Math.PI,y-r/Math.PI);
ctx.lineTo(x-(r*3.5),x-(r*3.5));

ctx.moveTo(x+r/2,y+r/2);
ctx.lineTo(x+(r*3.5),x+(r*3.5));

ctx.moveTo(x+r/2,y-r/2);
ctx.lineTo(x+(r*3.5),x-(r*3.5));

ctx.moveTo(x-r/2,y+r/2);
ctx.lineTo(x-(r*3.5),x+(r*3.5));

ctx.stroke();
*/



    /* LAST
var canvas = document.getElementById("canvas_player");
var ctx = canvas.getContext("2d");

var x=225;
var y=225;
var r=30;
var angleInitial=0;
var angleFinal = 2*Math.PI; // Point d'arrivée sur le cercle
var antihoraire = true; // Horaire ou antihoraire

ctx.beginPath ();
ctx.arc(x, y, r*5, angleInitial, angleFinal, antihoraire);
ctx.lineWidth = "10";
ctx.strokeStyle = "blue";
ctx.stroke();

for(var i=1; i<=5; i++) { 

}
*/











/*
var context = new (window.AudioContext || window.webkitAudioContext)();
var analyser = context.createAnalyser();

// Source Audio
var myAudio = document.querySelector('audio');
var audioSource = context.createMediaElementSource(myAudio);

// Connection
audioSource.connect(analyser);
analyser.connect(context.destination);

// Declaration Canvas
var canvas = document.getElementById("player");
var ctx = canvas.getContext("2D");

// Definir Taille
var WIDTH = canvas.width;
var HEIGHT = canvas.height;

// Nombre de valeur
analyser.fftSize = 256; //1024 2048

// Smoothing, or the priority of the old data over the new data 
smoothingTimeConstant: 0.2;

// Analyse Data 
var bufferLength = analyser.fftSize;
var dataArray = new Float32Array(bufferLength);

// Copy

*/


/*
var context = new (window.AudioContext || window.webkitAudioContext)();
var analyser = context.createAnalyser();

var myAudio = document.querySelector('audio');
var audioSource = context.createMediaElementSource(myAudio);

window.addEventListener('load', function(e) {

    var audioSource = context.createMediaElementSource(audio);
    audioSource.connect(analyser);
    analyser.connect(context.destination);

}, false);
    */
