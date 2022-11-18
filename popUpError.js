// PopUp avec message d'erreur
function createErrorPopUp() {
    const popUpNoSub = document.createElement("div");
    popUpNoSub.id = "PopUpNoSubError"
    popUpNoSub.className = "global-popUp"
    popUpNoSub.innerHTML = `
                <h3 class="title-container">${extensionLanguage.error.noSubTitle}</h3>
                <p class="content-container" id='bottom-error'>${extensionLanguage.error.noSubMessage}</p>
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