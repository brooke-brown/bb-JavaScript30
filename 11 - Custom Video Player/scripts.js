// get our elements

const player = document.querySelector('.player'); // div with class player
const video = player.querySelector('viewer'); // video element inside player
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// build our functions

//TOGGLE PLAY/PAUSE FUNCTION

function togglePlay() {
    // will either play or pause
    if(video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// UPDATE BUTTON FUNCTION -- not included in togglePlay because can be updated from play/pause state

function updateButton() {
    // if video is paused, show play icon, otherwise show pause icon
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon; // update the button text
}

// SKIP FUNCTION

function skip() {
    // skip forward or backward by the amount specified in data-skip attribute
    video.currentTime += parseFloat(this.dataset.skip);
}

// HANDLE RANGE UPDATE FUNCTION

function handleRangeUpdate() {
    // update the video property based on the slider input
    video[this.name] = this.value;
}

// HANDLE PROGRESS FUNCTION -- progress bar update

function handleProgress() {
    // calculate the percentage of video played
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`; // update the progress bar width
}
function scrub(e) {
    // calculate the scrub time based on the click position within the progress bar
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime; // set the video's current time to the calculated scrub time
}

function scrub () {
    // calculate the scrub time based on the click position within the progress bar
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime; // set the video's current time to the calculated scrub time
}
    

// hook up event listeners

video.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);

video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', updateButton);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));

ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false; // variable to track mouse state

progress.addEventListener('click', scrub);

progress.addEventListener('mousemove', (e) => mousedown && scrub(e));

progress.addEventListener('mousedown', () => mousedown = true);

progress.addEventListener('mouseup', () => mouseup = false);