// VARIABLES
let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

// FUNCTIONS

// TIMER
function timer(seconds) {
    clearInterval(countdown); // clear any existing timer to avoid multiple intervals running
    // set Interval has issues in that it does not run exactly on time; same issue in iOS
    const now = Date.now();
    const then = now + seconds * 1000; // now is in miliseconds

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            // just returning here will not stop the interval
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

//DISPLAY TIME LEFT
function displayTimeLeft(seconds) {
    console.log(seconds);
    const minutes = Math.floor(seconds / 60); // Math.foor rounds down to the nearest integer
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display; // also update the title of the page
}

// DISPLAY END TIME
function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    const adjustedHour = hour > 12 ? hour - 12 : hour; // convert to 12-hour format
    const adjustedMinutes = minutes < 10 ? `0${minutes}` : minutes; // add leading zero if needed
    const display = `${adjustedHour}:${adjustedMinutes}`;
    document.querySelector('.display__end-time').textContent = `Be back at ${display}`;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const seconds = parseInt(button.dataset.time);
        clearInterval(countdown); // clear any existing timer
        timer(seconds);
        displayEndTime(Date.now() + seconds * 1000); // display end time based on current time + seconds
    });
});

document.customForm.addEventListener('submit', function (e) {
    e.preventDefault(); // prevent the form from submitting
    const mins = this.minutes.value; // get the value from the input field
    timer(mins * 60); // convert minutes to seconds
    displayEndTime(Date.now() + mins * 60 * 1000); // display end time based on current time + minutes in milliseconds
    this.reset(); // reset the form
})
