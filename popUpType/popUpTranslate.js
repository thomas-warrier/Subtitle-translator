/**
 * 
 * @param {string} translate is the the text that just got translated by the api
 */
function createTranslatePopUp(translate,sub) {

    const popUp = document.createElement("div");
    popUp.id = "PopUpTranslate"
    popUp.className = "global-popUp"

    //TODO Afficher la langue de sous titrage actuelle
    popUp.innerHTML = `
                        <div class="title-container flex-row">
                            <h3 class='title' id='from-languages'>${extensionLanguage.langs[fromLanguage]}</h3>
                            <div class='flex-row flex space-between'>
                                <h3 class='title'>${extensionLanguage.langs[toLanguage]}</h3>
                                <div class='icon-container' id='parameter-button'><span class="icon"></span></div>
                                
                            </div>
                        </div>
                        <div class='content-container flex-row'>
                            <p class='subtitle' id='from-subtitles'>${sub}</p>
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
    parameterButton.addEventListener('click', (e) => { //when the user click parameter button
        deletePopUpInstant()
        createpopUpSettings()
    })
}