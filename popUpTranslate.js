 // PopUp avec une traduction
 function createTranslatePopUp(translate) {

    const popUp = document.createElement("div");
    popUp.id = "PopUpTranslate"
    popUp.className = "global-popUp"

    //TODO Afficher la langue de sous titrage actuelle
    console.log("---" + extensionLanguage);
    popUp.innerHTML = `
                        <div id='languages-container'>
                            <h3 id='from-languages'>${extensionLanguage.langs[fromLanguage]}</h3>
                            <div class="language-and-parameter">
                                <h3 id='to-languages'>${extensionLanguage.langs[toLanguage]}</h3>
                                <div class='parameter-icon-to-context'><span class="icon"></span><a href="#"></a><span></span></div></div>
                            </div>
                        </div>
                        <div id='traduction-container'>
                            <p id='from-subtitles'>${lastSub}</p>
                            <p id='translated-subtitles'>${decodeURIComponent(translate)}</p>
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
    const parameterButton = document.querySelector(".parameter-icon-to-context")
    parameterButton.addEventListener('click', (e) => {
        deletePopUpInstant()
        createpopUpSettings()
    })
}