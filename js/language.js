const options = document.querySelector('#language'),
    textsToChange = document.querySelectorAll('[data-section]');

const changeLanguage = async selected => {

    for(let option of options){
        if(option.value == selected) option.selected = true;
        else option.selected = false;
    }

    const requestJson = await fetch(`./js/languages/${selected}.json`);
    const text = await requestJson.json();

    for(const textToChange of textsToChange){
        const sections = textToChange.dataset.section;
        const value = textToChange.dataset.value;

        textToChange.innerHTML = text[sections][value];
    }                                       
}

changeLanguage(localStorage.getItem("language"));

options.addEventListener('input', ()=> {
    localStorage.setItem("language", options.options[options.selectedIndex].value);


    

    changeLanguage(localStorage.getItem("language"));
});


