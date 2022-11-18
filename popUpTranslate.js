 // PopUp avec une traduction
 function createTranslatePopUp(translate) {

    const popUp = document.createElement("div");
    popUp.id = "PopUpTranslate"
    popUp.className = "global-popUp"

    //TODO Afficher la langue de sous titrage actuelle
    console.log("---" + extensionLanguage);
    popUp.innerHTML = `
                        <div class="title-container flex-row">
                            <h3 class='title' id='from-languages'>${extensionLanguage.langs[fromLanguage]}</h3>
                            <div class='flex-row flex'>
                                <h3 class='flex title'>${extensionLanguage.langs[toLanguage]}</h3>
                                <div class='icon-container' id='parameter-button'><span class="icon"></span><a href="#"></a><span></span></div></div>
                                
                            </div>
                        </div>
                        <div class='content-container flex-row'>
                            <p class='subtitle' id='from-subtitles'>${lastSub}</p>
                            <p class='subtitle'>${decodeURIComponent(translate)}</p>
                        </div>
                    `
    popUp.addEventListener('mouseenter', (e) => {
        if (deleteTimeout) {
            clearTimeout(deleteTimeout);
        }
    });

    popUp.addEventListener('mouseleave', (e) => {
        deletePopUpWithDelay();
    })

    popUp.addEventListener("click", (e) => { //to prevent from pause 
        e.stopPropagation();
    });

    //ajout dans le canva
    placeInCanva(popUp);
    setActivePopUp('#PopUpTranslate');
    const parameterButton = document.querySelector("#parameter-button")
    parameterButton.addEventListener('click', (e) => {
        deletePopUpInstant()
        createpopUpSettings()
    })
}