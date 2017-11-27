var canvasWidth = 300
var audioEl = document.getElementById("audio")
var canvas = document.getElementById("progress").getContext('2d')
var ctrl = document.getElementById('audioControl')

var x = 200;
var y = 200;
var r = 150;
var angleInitial= 1.5*Math.PI ; //(Math.PI/180) * 270;
var angleFinal = (Math.PI/180) * (270 + 360); //2*Math.PI; //(Math.PI/180) * (270 + 360) // Point d'arrivée sur le cercle
var antihoraire = false; // Horaire ou antihoraire optionel


var duration = audioEl.duration
var currentTime = audioEl.currentTime
document.getElementById("duration").innerHTML = convertElapsedTime(duration)
document.getElementById("current-time").innerHTML = convertElapsedTime(currentTime)
//canvas.fillRect(0, 0, canvasWidth, 50);

/*
audioEl.addEventListener('loadedmetadata', function() {
  var duration = audioEl.duration
  var currentTime = audioEl.currentTime
  document.getElementById("duration").innerHTML = convertElapsedTime(duration)
  document.getElementById("current-time").innerHTML = convertElapsedTime(currentTime)
  canvas.fillRect(0, 0, canvasWidth, 50);
});
*/

ctrl.onclick = function togglePlaying() {
  var play = ctrl.innerHTML === 'Play'
  var method

  if (play) {
    ctrl.innerHTML = 'Pause'
    method = 'play'
  } else {
    ctrl.innerHTML = 'Play'
    method = 'pause'
  }

  audioEl[method]()
}

audioEl.ontimeupdate = function updateBar() {
  //canvas.clearRect(0, 0, canvasWidth, 50)
  //canvas.fillStyle = "#000";
  //canvas.fillRect(0, 0, canvasWidth, 50)

  canvas.beginPath();
  canvas.arc(x, y, r, angleInitial, angleFinal, antihoraire)
  canvas.lineWidth = "8";
  canvas.strokeStyle = "#E8E8E8";
  canvas.stroke();
  
  var currentTime = audioEl.currentTime
  var duration = audioEl.duration
  
  if (currentTime === duration) {
    ctrl.innerHTML = "Play"
  }
  
  document.getElementById("current-time").innerHTML = convertElapsedTime(currentTime)
  
  var percentage = currentTime / duration
  var progress = (canvasWidth * percentage)
  //canvas.fillStyle = "lightblue"
  //canvas.fillRect(0, 0, progress, 50)
 
  var angleProgression = 1.5*Math.PI + ((600*percentage)/100); //(Math.PI/180) * (270 + ( (360/100)*currentTime));

    canvas.beginPath();
    canvas.arc(x, y, r, angleInitial, angleProgression);
    canvas.lineWidth = "6";
    canvas.strokeStyle = "#505050";
    canvas.lineCap = "round;"
    canvas.stroke();
}

function convertElapsedTime(inputSeconds) {
  var seconds = Math.floor(inputSeconds % 60)
  if (seconds < 10) {
    seconds = "0" + seconds
  }
  var minutes = Math.floor(inputSeconds / 60)
  return minutes + ":" + seconds
}

/// TEST WEB AUDIO ///
var contexteAudio = new (window.AudioContext || window.webkitAudioContext)();
var analyseur = contexteAudio.createAnalyser();

var myAudio = document.querySelector('audio');
var source = contexteAudio.createMediaElementSource(myAudio);

source.connect(analyseur);
analyseur.connect(contexteAudio.destination);

analyseur.fftSize = 256;
var tailleMemoireTampon = analyseur.frequencyBinCount;
console.log(tailleMemoireTampon);
var tableauDonnees = new Uint8Array(tailleMemoireTampon);

function dessiner() {
  dessin = requestAnimationFrame(dessiner);

  analyseur.getByteFrequencyData(tableauDonnees);

  canvas.fillStyle = 'rgb(0, 0, 0)';
  canvas.fillRect(0, 0, 400, 400);
  var largeurBarre = (400 / tailleMemoireTampon) * 2.5;
  var hauteurBarre;
  var x = 0;

  for(var i = 0; i < tailleMemoireTampon; i++) {
    hauteurBarre = tableauDonnees[i]/2;

    canvas.fillStyle = 'rgb(' + (hauteurBarre+100) + ',50,50)';
    canvas.fillRect(x,400-hauteurBarre/2,largeurBarre,hauteurBarre);

    x += largeurBarre + 1;
  }
};

dessiner();