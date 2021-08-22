let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [{
        name: "On my Way",
        artist: "Alan Walker, Sabrina carpenter",
        image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2ljfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        path: "assets/songs/On My Way.mp3"
    },
    {
        name: "Mood Lofi",
        artist: "Yagih Mael",
        image: "https://images.unsplash.com/photo-1504898770365-14faca6a7320?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzB8fG11c2ljfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        path: "assets/songs/mood lofi.mp3"
    },
    {
        name: "Shape of You",
        artist: "Ed Sheeran",
        image: "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bXVzaWN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
        path: "assets/songs/Shape of you.mp3"
    },
    {
        name: "Senorita",
        artist: "Shawn Medis, Camila Cabello",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzh8fG11c2ljfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        path: "assets/songs/Senorita.mp3"
    },
    {
        name: "Blank Space",
        artist: "Taylow Swift",
        image: "https://images.unsplash.com/photo-1442504028989-ab58b5f29a4a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fG11c2ljfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        path: "assets/songs/Blank Space.mp3"
    },
    {
        name: "Dance Monkey",
        artist: "Tones and I",
        image: "https://images.unsplash.com/photo-1619983081563-430f63602796?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTd8fG11c2ljfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
        path: "assets/songs/Dance Monkey.mp3"
    },

];

function random_bg_color() {

    // Get a number between 64 to 256 (for getting lighter colors)
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;

    // Construct a color withe the given values
    let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

    // Set the background to that color
    document.body.style.background = bgColor;
}

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    curr_track.src = track_list[track_index].path;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;


    updateTimer = setInterval(seekUpdate, 1000);
    curr_track.addEventListener("ended", nextTrack);
    random_bg_color();
}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length;
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;

    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);

        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}