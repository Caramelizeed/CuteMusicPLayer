const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('playPause');
const progressBar = document.getElementById('progress');
const currentTimeLabel = document.getElementById('current-time');
const volumeControl = document.getElementById('volume');
const volumeLabel = document.getElementById('volume-label');
const songTitle = document.getElementById('songTitle');
const vinylImage = document.getElementById('vinylImage');

let currentSongIndex = 0;
const songList = [
    { title: 'Cigarette After Sex', src: 'Music.mp3' },
    { title: 'Voila', src: 'Music2.mp3' }
];

audio.src = songList[currentSongIndex].src;
songTitle.textContent = songList[currentSongIndex].title;
vinylImage.src = songList[currentSongIndex].src.replace('.mp3', '.jpg');

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.value = progress;
    updateCurrentTime();
    rotateVinyl();
});

audio.addEventListener('ended', () => {
    nextSong();
});

function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = 'Pause';
    } else {
        audio.pause();
        playPauseButton.textContent = 'Play';
    }
}

function seekAudio(event) {
    const seekTo = (event.target.value / 100) * audio.duration;
    audio.currentTime = seekTo;
}

function setVolume(event) {
    audio.volume = event.target.value / 100;
    volumeLabel.textContent = `${event.target.value}%`;
}

function updateCurrentTime() {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    currentTimeLabel.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function rotateVinyl() {
    const rotationSpeed = audio.currentTime * 5;  // Multiply by 5 to make it spin faster than the song length
    vinylImage.style.transform = `rotate(${rotationSpeed}deg)`;  // Faster rotation speed
}

function prevSong() {
    currentSongIndex = currentSongIndex === 0 ? songList.length - 1 : currentSongIndex - 1;
    updateSong();
}

function nextSong() {
    currentSongIndex = currentSongIndex === songList.length - 1 ? 0 : currentSongIndex + 1;
    updateSong();
}

function updateSong() {
    audio.src = songList[currentSongIndex].src;
    songTitle.textContent = songList[currentSongIndex].title;
    vinylImage.src = songList[currentSongIndex].src.replace('.mp3', '.jpg');
    audio.play();
    playPauseButton.textContent = 'Pause';
}
