
/*==================================== PopUp management ====================================*/

/**
 * Create a translate pop up if there is available subtitles
 */
function createPopUp() {
    //if there is no popUp of translate and no popUp of error then you can create a popUp
    if (!document.getElementById('PopUpTranslate') && !document.getElementById('PopUpNoSubError')) {
        const sub = lastSub;
        console.log(lastSub);
        setTimeBarInvisible(true);
        if (sub) {
            //TODO Manage lang preferences
            translateText(sub, fromLanguage, toLanguage, (translate,sub) => {
                createTranslatePopUp(translate,sub);
            });
        }
        //mean there is no subtitles to display
        else {//create a popUp of error
            createErrorPopUp()
        }
    }
}

/**
 * Place the popUp in the netflix canva
 * @param {popUp} popUp the popUp wich will be placed in the netflix canva
 */
function placeInCanva(popUp) { //to place something in the canva
    const canva = document.querySelector('.ltr-omkt8s'); //select the canva
    if (canva) {
        canva.appendChild(popUp);

    } else {
        console.log('Canva not found !');
    }
}

/**
 * set the visibility of the red time bar in the netflix player wich need to be invisible when we display a pop up
 * @param {boolean} state 
 */
function setTimeBarInvisible(state) {
    document.querySelector("div.ltr-1bt0omd:nth-child(1) > div:nth-child(1)").style.visibility = state ? "hidden" : "visible";
}


/*==================================== Active PopUp management ====================================*/

/**
 * set a pop up as active so we know in wich pop up we currently are
 * @param {string} selector id of the pop up we want to set as the active pop up
 */
function setActivePopUp(selector) {
    if (activePopUp != null) {
        activePopUp.remove(); //remove the old pop up
    }
    activePopUp = document.querySelector(selector);
}

/**
 * to remove the active pop up
 */
function removeActivePopUp() {
    if (activePopUp != null) {
        activePopUp.remove();
        console.log('Active PopUp deleted');
    }
}

/**
 * to delete the active pop up with a 400 ms delay so when you slide out of the pop up it doesn't disapear instantly
 */
function deletePopUpWithDelay() {
    deleteTimeout = setTimeout(() => {
        setTimeBarInvisible(false); //when we delete the pop up the red bar is visible
        removeActivePopUp();
        deleteTimeout = null;
    }, 400);
}

/**
 * to delete the active pop instantly
 */
function deletePopUpInstant() {
    setTimeBarInvisible(false);
    removeActivePopUp();
    deleteTimeout = null;
}

