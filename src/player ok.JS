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






    <!-- WORKING AUDIO PLAYER 
                <canvas id="progress" width="400px" height="400px"></canvas>

                <audio id="audio">
                    <source src="/audio1.mp3">
                </audio>

                <br>
                <span id="current-time"></span> /
                <span id="duration"></span>
                <br>
                <button id="audioControl" >Play</button>
            -->

            <!-- Player Visu En cours de development
            <div id="player">
                <div id="main">
                    <div>
                        <div class="playback-controls">
                            <h2 id="Title">Title</h2>
                            <h3 id="Artist">Artist</h3>
                            <div class="time-holder">
                                <div class="slider">
                                    <div class="fill"></div>
                                </div>
                            </div>
                            <img class="player-button" src="/playlist.svg">
                            <div id="player-controls" class="">
                                <img class="player-button" src="/back.svg">
                                <img class="player-button" src="/play.svg">
                                <img class="player-button" src="/pause.svg" >
                                <img class="player-button" src="/next.svg">
                            </div>
                        </div>
                        <audio id="playbar" controls="" tabindex="0">
                            <source src="/audio1.mp3">
                        </audio>
                    </div>
                </div>
                <ol id="playlist">
                    <li class="active">
                        <source src="/audio1.mp3">
                        <span>Test 1</span>
                    </li>
                    <li>
                        <source src="/audio1.mp3">
                        <span>Test 2</span>
                    </li>

                </ol>
            </div>
            -->

            <!--<audio id="audioPlayer" > <!--  <audio id="audioPlayer" ontimeupdate="update(this)">
                    <source src="/audio1.mp3">
            </audio>
                
            <button id="playButton" class="control">Play</button>
            <button id="stopButton" class="control">Stop</button>

            <div>
                <div id="progressBarControl">
                    <div id="progressBar" width="250px" height="20px" color="blue" onclick="clickProgress('audioPlayer', this, event)">Pas de lecture</div>
                </div>
                <span id="progressTime">00:00</span>
                <span id="totalTime">00:00</span>
            </div>


            <canvas id="canvas_player" width="500" height="100" style="border:1px solid #000000;"></canvas>-->


            <!--<audio controls id="play">
                <source src="/audio1.mp3">
            </audio>

           <canvas id="player" width="500" height="500" style="border:1px solid #000000;"></canvas>-->

            <!--<canvas class="visualizer" id="myCanvas";width="640" height="300" style="border:1px solid #000000;"> </canvas>-->

            <!--<iframe width="80%" height="350" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/310650781%3Fsecret_token%3Ds-T9aRv&amp;color=%23ff5500&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;show_teaser=true"></iframe>-->

            <!--<iframe src="https://audiomack.com/embed/playlist/djtgut/wavy" scrolling="no" width="100%" height="400" scrollbars="no" frameborder="0"></iframe>-->

            <!-- Amplitude JS -->

            <!--
                <div id="amplitude-player">

                    <div id="amplitude-left">

                        <div id="time-container">
                            <span class="current-time">
                                <span class="amplitude-current-minutes" amplitude-main-current-minutes="true"></span>:<span class="amplitude-current-seconds" amplitude-main-current-seconds="true"></span>
                            </span>
                            <input type="range" class="amplitude-song-slider" amplitude-main-song-slider="true" step=".1"/>
							<span class="duration">
								<span class="amplitude-duration-minutes" amplitude-main-duration-minutes="true"></span>:<span class="amplitude-duration-seconds" amplitude-main-duration-seconds="true"></span>
							</span>

                        </div>

                        <div id="control-container">
                            <div class="amplitude-prev" id="previous"></div>
                            <div class="amplitude-play-pause" amplitude-main-play-pause="true" id="play-pause"></div>
                            <div class="amplitude-next" id="next"></div>
                        </div>
                        
                        <div id="meta-container">
                            <span amplitude-song-info="name" amplitude-main-song-info="true" class="song-name"></span>
							<span amplitude-song-info="artist" amplitude-main-song-info="true"></span>
                        </div>

                    </div>
                    <div id="amplitude-right" class="playlist">

                            <div class="song-meta-data">
                                <span class="song-title">Risin' High (feat Raashan Ahmad)</span>
                                <span class="song-artist">Ancient Astronauts</span>
                            </div>

                    </div>
                </div>
            -->

















































