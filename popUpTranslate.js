 // PopUp avec une traduction
 function createTranslatePopUp(translate) {

    const popUp = document.createElement("div");
    popUp.id = "PopUpTranslate"
    popUp.className = "PopUpTranslate-Class"

    //TODO Afficher la langue de sous titrage actuelle
    console.log(extensionLanguage);
    popUp.innerHTML = `
                    <div class='container-translation-ext'>
                        <div id='languages-container'>
                            <div id='from-languages'><span lang='en'>Detected language</span></div>
                            <div class="language-and-parameter">
                                <div id='to-languages'>${extensionLanguage["FR"]}</div>
                                <div class='parameter-icon-to-context'><span class="icon"></span><a href="#"></a><span></span></div></div>
                            </div>
                        </div>
                        <div id='traduction-container'>
                            <div id='from-subtitles'><span>${lastSub}</span></div>
                            <div id='translated-subtitles'><span>${decodeURIComponent(translate)}</span></div>
                        </div>
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