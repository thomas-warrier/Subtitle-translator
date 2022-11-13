// PopUp management
function createPopUp() {
    //if there is no popUp of translate and no popUp of error then you can create a popUp
    if (!document.getElementById('PopUpTranslate') && !document.getElementById('PopUpNoSubError')) {
        const sub = getSubtitles();
        setTimeBarVisible(true);
        if (sub) {
            //TODO Manage lang preferences
            translateText(sub, 'EN', 'FR', (translate) => {
                createTranslatePopUp(translate)
                console.log("création d'une div popUP")
            });
        }
        //mean there is no subtitles to display
        else {//create a popUp of error
            createErrorPopUp()
        }
    }
}

function placeInCanva(popUp) { //to place something in the canva
    // const canva = document.querySelector('div.ltr-1212o1j');
    const canva = document.querySelector('.ltr-omkt8s'); //select the canva
    if (canva) {
        canva.appendChild(popUp);

    } else {
        console.log('Video non trouvée !');
    }
}

// Change TimeBarVisibility
function setTimeBarVisible(state) {
    document.querySelector("div.ltr-1bt0omd:nth-child(1) > div:nth-child(1)").style.visibility = state ? "hidden" : "visible";
}

// Active PopUp management
function setActivePopUp(selector) {
    if (activePopUp != null) {
        activePopUp.remove();
    }
    activePopUp = document.querySelector(selector);
}

function removeActivePopUp() {
    if (activePopUp != null) {
        activePopUp.remove();
        console.log('Active PopUp deleted');
    }
}


function deletePopUpWithDelay() {
    deleteTimeout = setTimeout(() => {
        setTimeBarVisible(false);
        removeActivePopUp();
        deleteTimeout = null;
    }, 400);
}

function deletePopUpInstant() {
    setTimeBarVisible(false);
    removeActivePopUp();
    deleteTimeout = null;
}

