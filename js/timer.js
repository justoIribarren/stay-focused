//************* VARIABLES *************//

//------------ settings ------------//

let $inputs = document.querySelectorAll('.input'),
    $active = document.querySelector('.nav__active'),
    pomo = 1,
    session = 1,
    [timer, breaks, pause, pI, pS, autoStart, volumeInput] = $inputs;

    let inputs = [timer, breaks, pause, pI, pS];

    let pauseInterval = pI.value,
    pomoSes = pS.value,
    vol = volumeInput.value;
    
    //------------ timer ------------//
    
    const $mainTimer = document.querySelector('.main__timer'),
    $countdown = document.querySelector(".timer__countdown"),
    $startBtn = document.querySelector('.start'),
    $pauseBtn = document.querySelector('.pause'),
    $pomoStat = document.querySelector('.pomodoro__status'),
    $scrolldown = document.querySelector('.scrolldown'),
    $volume = document.querySelector('.range__value'),
    $title = document.getElementById('title'),
    $navLink = document.querySelectorAll('.nav__link');
    
let idInterval = null, timeDifference = 0, futureDate = null, minutes = timer.value;
//***********************************/


//*********** FUNCTIONS *************//

//----------------------------------//

const showElement = element => element.style.display = "";
const hideElement = element => element.style.display = "none";
const showStat = () => {
    let $stat = document.createElement('div');
    $pomoStat.appendChild($stat);
    $stat.classList.add('status');
};
const addZero = min => {
    if (min < 10) return "0" + `${min}`;
    else return min
};
const loadSound = (source, vol)=> {
    const sound = document.createElement("audio");
    sound.src = source;
    sound.setAttribute("preload", "auto");
    sound.setAttribute("controls", "none");
    sound.style.display = "none";
    document.body.appendChild(sound);
    sound.volume = vol;
    return sound;
};

loadSound('./audio/beep.mp3', vol);

//-------------- TIMER 1--------------//

const stopTimer = () => {
    
    hideElement($pauseBtn);
    showElement($startBtn);
    showElement($scrolldown);
    $title.textContent = `Stay Focused!`;
    $mainTimer.classList.remove('main__active');
    timeDifference = futureDate - new Date().getTime();
    clearInterval(idInterval);
}

const resetTimer = min => {
    if(min == "") min = 0;
    $countdown.textContent = `${addZero(min)}:00`;
    if(min < 1){
        let sec = Math.floor(min * 60);
        $countdown.textContent = `00:${addZero(sec)}`;
    }
    
    futureDate = null;
    timeDifference = 0;
}

//-------------- FOCUS --------------//

const changeFocus = el => {
    
    minutes = 0;
    $navLink.forEach(link => link.classList.remove("nav__active"));
    el.classList.add("nav__active");
    
    $active = document.querySelector('.nav__active');

    if ($active.id == "pomodoro"){
        minutes = timer.value;
        if(minutes > 120) minutes = 120;
    }
    else if ($active.id == "break"){ 
        minutes = breaks.value;
        if(minutes > 30) minutes = 30;

    }
    else if ($active.id == "pause"){
        minutes = pause.value;
        if(minutes > 60) minutes = 60
    }
    
    resetTimer(minutes);    
    return minutes;
}

//-----------------------------------//

//-------------- TIMER 2 --------------//

const startTimer = minutes => {
    showElement($pauseBtn);
    hideElement($startBtn);
    hideElement($scrolldown);
    $mainTimer.classList.add('main__active');
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
            loadSound('./audio/beep.mp3', vol).play();
            if ((session%2) == 0 && pomo < (pomoSes)*2){ 
                showStat();
                minutes = changeFocus($navLink[0]);
            }
            else if((session%2) == 1 && session != ((pauseInterval)*2)-1) minutes = changeFocus($navLink[1]);
            else if((session%2) == 1 && session == ((pauseInterval)*2)-1){
                minutes = changeFocus($navLink[2]);
                pauseInterval = parseInt(pI.value) + parseInt(pauseInterval);
            }
            session += 1;
            if(autoStart.checked && session <= (pomoSes)*2){
                resetTimer(minutes);
                startTimer(minutes);
            } else if(!(autoStart.checked) || session >= (pomoSes)*2){
                if(session >= (pomoSes)*2) {
                    let stat = document.querySelectorAll('.status');
                    stat.forEach(s => s.remove());
                    pauseInterval = pI.value;
                }
                $title.textContent = `Stay Focused!`;
                $mainTimer.classList.remove('main__active');
                hideElement($pauseBtn);
                showElement($startBtn);
                showStat();
                pomo = 1;
                session = 1;
            }

        } else {
            let min = Math.floor((timeLeft % (1000 * 60 * 60 * 60)) / (1000 * 60)),
                sec = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
            if ($active.id == "pomodoro") $title.textContent = `${addZero(min)}:${addZero(sec)}` + ' - Stay Focused!';
            else if ($active.id == "break") $title.innerHTML = `${addZero(min)}:${addZero(sec)}` + ' - Break Time!';
            else if ($active.id == "pause") $title.innerHTML = `${addZero(min)}:${addZero(sec)}` + ' - Pause Time!';
            $countdown.textContent = `${addZero(min)}:${addZero(sec)}`;
        }
    }, 1000);
};

//*************************************/

//************** CALLS ****************//

hideElement($pauseBtn);
showStat();

$startBtn.addEventListener("click", () => startTimer(minutes));

$pauseBtn.addEventListener("click", () => stopTimer());

$navLink.forEach(link => {
    link.addEventListener('click', () => {
        stopTimer();
        changeFocus(link)
    })
});

inputs.forEach(inp => {
    inp.addEventListener('input', () => {
        stopTimer();
        changeFocus($navLink[0])
        pauseInterval = pI.value;
        pomoSes = pS.value;
    
        if(pauseInterval > 8 ) pauseInterval = 8;
        if(pomoSes > 16) pomoSes = 16;
    })
});

volumeInput.addEventListener('input', ()=>{
    vol = volumeInput.value; 
    $volume.innerHTML = `${Math.floor(vol*100)}`
})
