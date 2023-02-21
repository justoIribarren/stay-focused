//************* SETTINGS *************

let timer = document.querySelector('.timer__minutes'),
    breaks = document.querySelector('.break__minutes'),
    pause = document.querySelector('.longpause__minutes'),
    longPauseIntervale = document.querySelector('.interval'),
    pomodoroSessions = document.querySelector('.sessions'),
    autoStart = document.querySelector('.autostart'),
    minutes = timer.value,
    active = document.querySelector('.timer__active');

    
//************************************


const showElement = element => element.style.display = "";
const hideElement = element => element.style.display = "none";

//************** TIMER ***************

const startBtn = document.querySelector('.start'),
    pauseBtn = document.querySelector('.pause'),

    sectionTimer = document.querySelector('.section__timer');
    scrolldown = document.querySelector('.scrolldown'),
    title = document.querySelector('.title');
    
let idInterval = null, timeDifference = 0, futureDate = null;
hideElement(pauseBtn);

const startTimer = minutes => {
    showElement(pauseBtn);
    hideElement(startBtn);
    hideElement(scrolldown);
    sectionTimer.classList.add('section__active');
    // hideElement($btnDetener);
    if (futureDate) {
        futureDate = new Date(new Date().getTime() + timeDifference);
        timeDifference = 0;
    } else {
        const milliseconds = Math.floor((minutes * 60) * 1000);
        futureDate = new Date(new Date().getTime() + milliseconds).getTime();
    }
    clearInterval(idInterval);
    idInterval = setInterval(() => {
        const timeLeft = (futureDate - new Date().getTime()) + 10;
        if (timeLeft <= 0) {
            clearInterval(idInterval);
            // sonido.play();
            title.textContent = `Stay Focused!`;
            sectionTimer.classList.remove('section__active');
            hideElement(pauseBtn);
            showElement(startBtn);
        } else {

            let min = ("0" + Math.floor((timeLeft % (1000 * 60 * 60))/ (1000 * 60))).slice(-2),
                sec = ("0" + Math.floor((timeLeft % (1000 * 60))/ 1000)).slice(-2);
                
            title.textContent = `${min}:${sec} - Stay Focused!`;
            active.textContent = `${min}:${sec}`;
        }
    }, 1000);
};

const stopTimer = () => {
    hideElement(pauseBtn);
    showElement(startBtn);
    showElement(scrolldown);
    // showElement($btnDetener);
    title.textContent = `Stay Focused!`;
    sectionTimer.classList.remove('section__active');
    timeDifference = futureDate - new Date().getTime();
    clearInterval(idInterval);
}

const resetTimer = min => {
    active.textContent = `${("0" + min).slice(-2)}:00`;
    futureDate = null;
    timeDifference = 0;
    clearInterval(idInterval);
}

//************************************


//************************************

const navLink = document.querySelectorAll(".nav__link"),
    countdown = document.querySelectorAll(".timer__countdown");

navLink.forEach(link => {

    link.addEventListener('click',()=>{

        stopTimer();
        navLink.forEach(link => link.classList.remove("nav__active"));
        link.classList.add("nav__active");

        countdown.forEach( time => {

            if(time.id === link.id) time.classList.add("timer__active");
            else time.classList.remove("timer__active");

        });

        active = null;
        active = document.querySelector('.timer__active');

        if (timer.id == active.id) minutes = timer.value;
        else if (breaks.id == active.id) minutes = breaks.value;
        else if (pause.id == active.id) minutes = pause.value;

        resetTimer(minutes);
    })
});

//************************************

startBtn.addEventListener("click", () => startTimer(minutes));

pauseBtn.addEventListener("click", () => stopTimer());