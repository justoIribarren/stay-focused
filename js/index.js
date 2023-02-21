
const settings = document.querySelector('.settings');
const close = document.querySelector('.close');
const aside = document.querySelector('.aside__container');
const sections = document.querySelectorAll('.sections');
document.qu

settings.addEventListener('click', ()=>{
    aside.classList.add('aside__active');
});

close.addEventListener('click', ()=>{
    aside.classList.remove('aside__active');
});

sections.forEach((section) => {
    section.addEventListener('click', ()=>{
        aside.classList.remove('aside__active');
    }); 
});