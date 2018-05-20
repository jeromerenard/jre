import * as $ from "jquery";

var prog = document.getElementById("Bar");



var audioContext = null;
var analyser = null;
var source = null;
var array = null;
//-- Siri Wave --//
var SW = null;


var player = document.querySelector('#myAudioPlayer');

//Update Timer
player.ontimeupdate = updateTimecode;
player.ondurationchange = updateTimecode;


var playButton = document.getElementById("playButton");
var stopButton = document.getElementById("stopButton");
var prevButton = document.getElementById("prevButton");
var nextButton = document.getElementById("nextButton");
var plltButton = document.getElementById("plltButton");
//var track = document.getElementById("trackName");

playButton.onclick = togglePlayPause;


function ensureAudioContext() {
    if (!audioContext) {
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        audioContext = new AudioContext();
        source = audioContext.createMediaElementSource(player);
        analyser = audioContext.createAnalyser();        

        source.connect(analyser);
        analyser.connect(audioContext.destination);
        analyser.fftSize = 2048;
        array = new Uint8Array(analyser.frequencyBinCount);

        SW = new SiriWave({
            style: 'default',
            speed: 0.1,
            amplitude: 1,
            //color: '#FFF',
            speedInterpolationSpeed: 1,
            container: document.getElementById('siriC'),
            autostart: true,
        });

        Swave();
    }
}

function play() {    
    player.play();
    playButton.textContent = 'pause';
}

function pause() {
    player.pause();
    playButton.textContent = 'play_arrow';
}

function updateTimecode() {
    var duration = player.duration;
    var time = player.currentTime;    
    var fraction = time / duration;
    var percent = fraction * 100;

    prog.style.width = percent + '%';
    console.log(percent + '%'); //CONSOLE LOG

    document.querySelector('#progressTime').textContent = formatTime(time);
    document.querySelector('#totalTime').textContent = formatTime(duration);
}

function togglePlayPause() {
    ensureAudioContext();
    if (player.paused) play();
    else pause();
}

//Stop Button
stopButton.onclick = function resume(idPlayer) {
    ensureAudioContext();
    player.currentTime = 0;
    pause();
    playButton.textContent = 'play_arrow';
}
//Playlist Button
$('#plltButton').click(function() {
    $('#playerOverlay').toggleClass('active');
});
/*
$('#playlist > li > a').click(e function() {
    onTrackItemClick(e.target, true));
}*/
$('#playlist > li').click(function(e) { onTrackItemClick(e.target, true); });

function onTrackItemClick(element, startPlaying) {
    if (startPlaying) ensureAudioContext();
    const selected = $(element);
    const fileName = selected.attr('src');
    const trackName = selected.html();

    player.src = fileName;
    if (startPlaying) play();
    else player.load();            

    $('#trackName').html(trackName);
    $('#playerOverlay').removeClass('active');
    $('#playlist > li').removeClass('active');
    selected.addClass('active');
}

onTrackItemClick($('#playlist > li:first'), false);
//Prev Button
prevButton.onclick = function () {
    ensureAudioContext();
    var selected = playlist.querySelector("li.active");
    if (selected && selected.previousElementSibling) {
        onTrackItemClick(selected.previousElementSibling, true);
    }
}
//Next Button
nextButton.onclick = function () {
    ensureAudioContext();
    var selected = playlist.querySelector("li.active");
    if (selected && selected.nextElementSibling) {
        onTrackItemClick(selected.nextElementSibling, true);
    }
}

//Temps écoulé
function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var mins = Math.floor((time % 3600) / 60);
    var secs = Math.floor(time % 60);

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

function SiriWaveCurve(t) { this.controller = t.controller, this.definition = t.definition } function SiriWave(t) { t = t || {}, this.phase = 0, this.run = !1, this.cache = {}, this.container = t.container, this.width = window.getComputedStyle(this.container).width.replace("px", ""), this.height = window.getComputedStyle(this.container).height.replace("px", ""), this.ratio = window.devicePixelRatio || 1, this.cache.width = this.ratio * this.width, this.cache.height = this.ratio * this.height, this.cache.height2 = this.cache.height / 2, this.cache.width2 = this.cache.width / 2, this.cache.width4 = this.cache.width / 4, this.cache.heightMax = this.cache.height2 - 4, this.amplitude = t.amplitude, this.speed = .05, this.frequency = 5, this.color = [26, 161, 178], this.speedInterpolationSpeed = .005, this.amplitudeInterpolationSpeed = .05, this.cache.interpolation = { speed: this.speed, amplitude: this.amplitude }, this.canvas = document.createElement("canvas"), this.ctx = this.canvas.getContext("2d"), this.canvas.width = this.cache.width, this.canvas.height = this.cache.height, this.canvas.style.width = this.canvas.style.height = "100%", this.curves = []; for (var i = 0; i < SiriWaveCurve.prototype.definition.length; i++)this.curves.push(new SiriWaveCurve({ controller: this, definition: SiriWaveCurve.prototype.definition[i] })); this.container.appendChild(this.canvas), this.start() } SiriWaveCurve.prototype._globAttenuationEquation = function (t) { return null == SiriWaveCurve.prototype._globAttenuationEquation.cache[t] && (SiriWaveCurve.prototype._globAttenuationEquation.cache[t] = Math.pow(4 / (4 + Math.pow(t, 4)), 4)), SiriWaveCurve.prototype._globAttenuationEquation.cache[t] }, SiriWaveCurve.prototype._globAttenuationEquation.cache = {}, SiriWaveCurve.prototype._xpos = function (t) { return this.controller.cache.width2 + t * this.controller.cache.width4 }, SiriWaveCurve.prototype._ypos = function (t) { var i = this.controller.cache.heightMax * this.controller.amplitude / this.definition.attenuation; return this.controller.cache.height2 + this._globAttenuationEquation(t) * i * Math.sin(this.controller.frequency * t - this.controller.phase) }, SiriWaveCurve.prototype.draw = function () { var t = this.controller.ctx; t.moveTo(0, 0), t.beginPath(), t.strokeStyle = "rgba(" + this.controller.color + "," + this.definition.opacity + ")", t.lineWidth = this.definition.lineWidth; for (var i = -2; i <= 2; i += .01) { var e = this._ypos(i); Math.abs(i) >= 1.9 && (e = this.controller.cache.height2), t.lineTo(this._xpos(i), e) } t.stroke() }, SiriWaveCurve.prototype.definition = [{ attenuation: -2, lineWidth: .4, opacity: .1 }, { attenuation: -6, lineWidth: .4, opacity: .2 }, { attenuation: 6, lineWidth: .4, opacity: .4 }, { attenuation: 2, lineWidth: .4, opacity: .6 }, { attenuation: 1, lineWidth: .6, opacity: 1 }], SiriWave.prototype._interpolate = function (t) { var increment = this[t + "InterpolationSpeed"]; Math.abs(this.cache.interpolation[t] - this[t]) <= increment ? this[t] = this.cache.interpolation[t] : this.cache.interpolation[t] > this[t] ? this[t] += increment : this[t] -= increment }, SiriWave.prototype._clear = function () { this.ctx.globalCompositeOperation = "destination-out", this.ctx.fillRect(0, 0, this.cache.width, this.cache.height), this.ctx.globalCompositeOperation = "source-over" }, SiriWave.prototype._draw = function () { for (var t = 0, i = this.curves.length; t < i; t++)this.curves[t].draw() }, SiriWave.prototype._startDrawCycle = function () { !1 !== this.run && (this._clear(), this._interpolate("amplitude"), this._interpolate("speed"), this._draw(), this.phase = (this.phase + Math.PI * this.speed) % (2 * Math.PI), window.requestAnimationFrame ? window.requestAnimationFrame(this._startDrawCycle.bind(this)) : setTimeout(this._startDrawCycle.bind(this), 20)) }, SiriWave.prototype.start = function () { this.phase = 0, this.run = !0, this._startDrawCycle() }, SiriWave.prototype.setAmplitude = function (t) { this.cache.interpolation.amplitude = Math.max(Math.min(t, 1), 0) }, window.SiriWave = SiriWave;




function getAverageVolume(data) {
    var values = 0;
    var length = data.length;
    for (var i = 0; i < data.length; i++) {
        values += data[i];
    }
    return values / data.length;
}

function Swave() {
    requestAnimationFrame(Swave);
    analyser.getByteFrequencyData(array);
    var average = getAverageVolume(array);
    SW.setAmplitude(average / 140);
}




/*
var token = '1030114991.1677ed0.e80794145d9e41bab9bf5989c0095077',
//userid = 9be11d9064b4484997d41f7d28405e40,
num_photos = 10;

$.ajax({
url: 'https://api.instagram.com/v1/users/self/media/recent',
dataType: 'jsonp',
type: 'GET',
data: {access_token: token, count: num_photos},
success: function(data){
    console.log(data);
    for( x in data.data ){
        $('ul').append('<li><img src="'+data.data[x].images.low_resolution.url+'"></li>');
    }
},
error: function(data){
    console.log(data);
}
});*/