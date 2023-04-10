const settings = document.querySelector('.header__settings'),
    close = document.querySelector('.close'),
    aside = document.querySelector('.aside__container'),
    sections = document.querySelector('.main__container');

settings.addEventListener('click', ()=> aside.classList.add('aside__active'));
close.addEventListener('click', ()=> aside.classList.remove('aside__active'));

sections.addEventListener('click', ()=>{
        aside.classList.remove('aside__active');
}); 