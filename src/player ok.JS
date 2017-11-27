// Variable Générale
var player = document.getElementById("audioPlayer");
var play = document.getElementById("playButton");
var stop = document.getElementById("stopButton");

/////////////////////////////////////////////
// Play / Pause Button
play.onclick = function play() {
    if (player.paused) {
        player.play();
        play.textContent = 'Pause';
    } else {
        player.pause();
        play.textContent = 'Play';
    }
}

// Stop Button
stop.onclick = function resume(idPlayer) {
    player.currentTime = 0;
    player.pause();
}


// Update des Timers et progress bar
player.ontimeupdate = function update () {
    var duration = player.duration;    // Durée totale
    var time     = player.currentTime; // Temps écoulé
    var fraction = time / duration;
    var percent  = Math.ceil(fraction * 100);

    var progress = document.querySelector('#progressBar');
    
    progress.style.width = percent + '%';
    progress.textContent = percent + '%';

    document.querySelector('#progressTime').textContent = formatTime(time);
    document.querySelector('#totalTime').textContent = formatTime(duration);

    // appel fonction dessin ? drawP


}

// Temps écoulé
function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var mins  = Math.floor((time % 3600) / 60);
    var secs  = Math.floor(time % 60);
	
    if (secs < 10) {
        secs = "0" + secs;
    }
	
    if (hours) {
        if (mins < 10) {
            mins = "0" + mins;
        }
		
        return hours + ":" + mins + ":" + secs; // hh:mm:ss
    } else {
        return mins + ":" + secs; // mm:ss
    }
}
////////////////////////////
// TEST //

var canvas = document.getElementById("canvas_player");
var ctx = canvas.getContext("2d");

var barLength = 300;



ctx.beginPath();
ctx.moveTo (0, 50);
ctx.lineTo (length,50);
ctx.lineWidth = "20";
ctx.strokeStyle = "lightblue"
ctx.lineCap = "round";
ctx.stroke();

function drawP (percent, duration) {
    var progBar = (barLength / duration) * time;





    ctx.clear;

    var prog = (length / 100) * percent;

    ctx.beginPath();
    ctx.moveTo (50, 50);
    ctx.lineTo (prog,50);
    ctx.lineWidth = "20";
    ctx.strokeStyle = "red"
    ctx.lineCap = "round";
    ctx.stroke();
    
    if (percent < duration);


}

drawP();





















window.onload = function() {
    
        //var canvas = document.getElementById("canvas_player");
      //  var ctx = canvas.getContext("2d");
    
        var x=225;
        var y=225;
        var r=30;
        var angleInitial= (Math.PI/180) * 270;
        var angleFinal = (Math.PI/180) * (270 + 360) // Point d'arrivée sur le cercle
        var antihoraire = false; // Horaire ou antihoraire optionel
        
        
    
        function draw() {
    
            var angleProgression = (Math.PI/180) * (270 + ( (360/100)*25)); // 25==> percent
            
            //Cercle de base = durée totale
            ctx.beginPath ();
            ctx.arc(x, y, r*5, angleInitial, angleFinal);
            ctx.lineWidth = "10";
            ctx.strokeStyle = "blue";
            ctx.stroke();
    
            function progresssBar(percent) { 
    
                ctx.save();
    
                //Cercle de progression 
                ctx.beginPath ();
                ctx.arc(x, y, r*5, angleInitial, angleProgression);
                ctx.lineWidth = "10";
                ctx.strokeStyle = "red";
                ctx.stroke();
    
                //if (percent < duration );
                    
                    
    
            }
            progresssBar();
            
    
    
    
    
            draw();
    
        }
    
    
    }






















































