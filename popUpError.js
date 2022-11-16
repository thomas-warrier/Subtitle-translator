// PopUp avec message d'erreur
function createErrorPopUp() {
    console.log("Error Pop Up")
    const popUpNoSub = document.createElement("div");
    popUpNoSub.id = "PopUpNoSubError"
    popUpNoSub.className = "PopUpNoSubErrorClass"
    popUpNoSub.innerHTML = `
                <h3 id='top-container'>${extensionLanguage.error.noSubTitle}</h3>
                <h3 id='bottom-container'>${extensionLanguage.error.noSubMessage}</h3>
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