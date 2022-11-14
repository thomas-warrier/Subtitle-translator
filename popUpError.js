// PopUp avec message d'erreur
function createErrorPopUp() {
    console.log("Error Pop Up")
    const popUpNoSub = document.createElement("div");
    popUpNoSub.id = "PopUpNoSubError"
    popUpNoSub.className = "PopUpNoSubErrorClass"
    popUpNoSub.innerHTML = `
            <div id='error-translation-container'>
                <div id='top-container'>
                    <span>${extensionLanguage.noSubTitle}</span>
                </div>
                <div id='bottom-container'>
                    <div id='no-subtitles'>
                        <span>${extensionLanguage.noSubMessage}</span>
                    </div>
                </div>
            </div>
            `
    popUpNoSub.addEventListener('mouseenter', (e) => { //when mouse enter in popup delete timeout of normal delete
        if (deleteTimeout) {
            clearTimeout(deleteTimeout);
        }
    });

    popUpNoSub.addEventListener('mouseleave', (e) => {//when mouse leave the popUp delete the popUp
        deletePopUpWithDelay();
    })
    placeInCanva(popUpNoSub);

    setActivePopUp('#PopUpNoSubError');

}