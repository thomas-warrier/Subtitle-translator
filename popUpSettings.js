/**
 * Display a settings pop and add all the listener on the settings possibilities
 */
function createpopUpSettings() { //to create the subssettingsPopUp
    setTimeBarInvisible(false);
    const popUpSettings = document.createElement("div");
    popUpSettings.id = "PopUpSetting"
    popUpSettings.className = "global-popUp"

    //TODO Afficher la langue de sous titrage actuelle
    popUpSettings.innerHTML = `
    <div class='title-container flex-row'>
            <div class='icon-container' id='return-button'><span class="icon"></span></div>
            <h3>${extensionLanguage.settings.parameter}</h3>
    </div>
    <div class='content-container'>
        <div class='settings-component'> 
            <p>${extensionLanguage.settings.source}</p>
                <select class='choice-option' name="from-lang" id="from-lang">
                    <option value="EN">English</option>
                    <option value="FR">French</option>
                </select>
        </div>
        <div class='settings-component'>
            <p>${extensionLanguage.settings.target}</p>
                <select class='choice-option' name="to-lang" id="to-lang">
                    <option value="EN">English</option>
                    <option value="FR">French</option>
                </select>
        </div>
        <div class='settings-component'>
                <p>${extensionLanguage.settings.shortcut}</p>
                <input class='choice-option' type="text" id='shortcut-choice' value='${keyShortCut}' readonly>
        </div>
        <div class='settings-component' id='extension-languages'>
            <p>${extensionLanguage.settings.extensionLang}</p>
                <select class='choice-option' name="extension-lang" id="extension-lang">
                    <option value="en">${extensionLanguage.langs.EN}</option>
                    <option value="fr">${extensionLanguage.langs.FR}French</option>
                </select>
        </div>
    </div>
            `
    popUpSettings.addEventListener("click", (e) => { //to prevent pause in the netflix canva when parameter button is clicked
        e.stopPropagation();
    });

    placeInCanva(popUpSettings);  //place the settings popUp in the canva
    setActivePopUp("#PopUpSetting");

    const selectFrom = document.getElementById('from-lang'); //to set the selected value of every settings select
    selectFrom.value = fromLanguage;

    const selectTo = document.getElementById('to-lang');
    selectTo.value = toLanguage;

    const selectExtLanguage = document.getElementById('extension-lang');
    switch (extensionLanguage) {
        case langFr:
            selectExtLanguage.value = "fr";
            break;
        case langEn:
            selectExtLanguage.value = "en";
            break;
        default:
            selectExtLanguage.value = "en";
    }


    const returnButton = document.querySelector("#return-button")
    returnButton.addEventListener('click', (e) => { //when the user click on the return icon
        deletePopUpInstant();
        createPopUp();
    })

    const choiceInput = document.querySelector("#shortcut-choice")
    choiceInput.addEventListener('focus', (e) => { //when the user click to change the shortcut
        choiceInput.addEventListener('keydown', (e) => {
            e.stopPropagation(); //to prevent the event open popUp when you set the parameter
            const keyName = e.key;
            choiceInput.value = keyName; //display the selected key for the user
            keyShortCut = keyName; //set the shortCut to the key selected
            chrome.storage.local.set({ "keyShortCut": keyShortCut });
            choiceInput.blur();//unfocus the input when key is selected
        });
    });

    document.querySelector("#from-lang").addEventListener('change', (e) => { //when the user change the from language
        fromLanguage = e.target.value;
        chrome.storage.local.set({
            "fromLanguage": fromLanguage
        });
    })

    document.querySelector("#to-lang").addEventListener('change', (e) => { //when the user change the to language
        toLanguage = e.target.value;
        chrome.storage.local.set({ "toLanguage": toLanguage });
    })

    document.querySelector("#extension-lang").addEventListener('change', (e) => { //when the user change the extension language
        setExtensionLanguage(e.target.value);
        chrome.storage.local.set({ "extensionLanguage": extensionLanguage });
    })
}