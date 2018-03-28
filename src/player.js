//var audioCanvas = document.getElementById("playerCanvas");
//var ctxAudio = audioCanvas.getContext('2d');
var prog = document.getElementById("Bar");

var contextAudio = new AudioContext();
var analyser = contextAudio.createAnalyser();

var player = document.querySelector('audio');
var source = contextAudio.createMediaElementSource(player);

var plist = document.getElementById("playlist")

var play = document.getElementById("playButton");
var stop = document.getElementById("stopButton");
var prev = document.getElementById("prevButton");
var next = document.getElementById("nextButton");
var pllt = document.getElementById("plltButton");

//var WIDTH  = audioCanvas.width;
//var HEIGHT = audioCanvas.height;

//Play Button
play.onclick = function () {
    if (player.paused) {
        player.play();
        play.textContent = 'Pause';
        togglePlayPause();
       
    } else {
        player.pause();
        play.textContent = 'Play';
        togglePlayPause();
    }
}
//Stop Button
stop.onclick = function resume(idPlayer){
    player.currentTime = 0;
    player.pause();
    togglePlayPause();
}
//Playlist Button

//Playlist Selet Click
function playlistClick(clickedElement) {
    var selected = playlist.querySelector(".active");
    if (selected) {
        selected.classList.remove("active");
    }
    clickedElement.classList.add("active");

    player.src = clickedElement.getAttribute("href");
    player.play;
}
//Prev Button

//Next Button
next.onclick = function () {
    var selected = playlist.querySelector("li.active");
    if (selected && selected.nextSibling) {
        playlistClick(selected.nextSibling);
    }
}

//Update Timer
player.ontimeupdate = function update () {

    var duration = player.duration;
    var time     = player.currentTime;
    var fraction = time / duration;
    var percent  = Math.ceil(fraction * 100);

    prog.style.width = percent + '%';
    console.log(percent+'%'); //CONSOLE LOG

    document.querySelector('#progressTime').textContent = formatTime(time);
    document.querySelector('#totalTime').textContent = formatTime(duration);

}

//Temps écoulé
function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var mins  = Math.floor((time % 3600) / 60);
    var secs  = Math.floor(time % 60);
	
    if (secs < 10) {
        secs = "0" + secs;
    }

    if (hours) {
        if (mins < 10) {
            mins = "00" + mins;
        }
        return hours + ":" + mins + ":" + secs; // hh:mm:ss
    } else {
        return "0" + mins + ":" + secs; // mm:ss
    }
}



/*
//Forme d'onde Osci
source.connect(analyser);
analyser.connect(contextAudio.destination);

analyser.fftSize = 32; //256 2048
var bufferLength = analyser.frequencyBinCount;
console.log(bufferLength); // CONSOLE LOG
var dataArray = new Uint8Array(bufferLength);

ctxAudio.clearRect (0, 0, WIDTH, HEIGHT);

function draw () {

    requestAnimationFrame(draw); //drawVisual = 

    analyser.getByteTimeDomainData(dataArray);

    ctxAudio.fillStyle = 'rgb(200, 200, 200)';
    ctxAudio.fillRect(0, 0, WIDTH, HEIGHT); //clearRect

    ctxAudio.lineWidth = 2;
    ctxAudio.strokeStyle = 'rgb (0, 0, 0)';

    ctxAudio.beginPath();

    var segWidth = (WIDTH * 1.0 / bufferLength);
    var x = 0;

    for (var i = 0; i < bufferLength; i++) {

        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if (i === 0) {
            ctxAudio.moveTo(x, y);
        }
        else {
            ctxAudio.lineTo(x, y);
        }
        x += segWidth;
    }

    ctxAudio.lineTo (ctxAudio.width, ctxAudio.height/2);
    ctxAudio.stroke();

};
draw ();
*/

import './SiriWave';


var siriWave = new SiriWave({
	container: document.getElementById('siri-container'),
	width: 640,
	height: 200,
	/*
	speed: 0.2,
	color: '#000',
	frequency: 2
	*/
});