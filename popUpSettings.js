function createpopUpSettings() { //to create the subssettingsPopUp
    setTimeBarVisible(false);
    const popUpSettings = document.createElement("div");
    popUpSettings.id = "PopUpSetting"
    popUpSettings.className = "PopUpSetting-Class"

    //TODO Afficher la langue de sous titrage actuelle
    popUpSettings.innerHTML = `
    <div class='container-setting-ext'>
    <div class='container-ext' id='title-container'>
        <div id='button-return'>
            <div class='return-icon'><span class="icon"></span><a href="#"></a><span></span></div>
        </div>

        <label class='title'>${extensionLanguage.parameter}</label>
    </div>
    <div>
        <div class='container-ext'> 
            <label>${extensionLanguage.source}</label>
            <div id='select-option'>
                <select class='choice-option' name="from-lang" id="from-lang">
                    <option value="EN">English</option>
                    <option value="FR">French</option>
                </select>
            </div>
        </div>
        <div class='container-ext'>
            <label>${extensionLanguage.target}</label>
            <div id='select-option'>
                <select class='choice-option' name="to-lang" id="to-lang">
                    <option value="EN">English</option>
                    <option value="FR">French</option>
                </select>
            </div>
        </div>
    </div>
    <div class='container-ext'>
            <label>${extensionLanguage.shortcut}</label>
            <input class='choice-option' type="text" id='shortcut-choice' value='${keyShortCut}' readonly>
    </div>
    <div class='container-ext' id='extension-languages'>
        <label>${extensionLanguage.extensionLang}</label>
        <div id='select-option'>
            <select class='choice-option' name="extension-lang" id="extension-lang">
                <option value="en">English</option>
                <option value="fr">French</option>
            </select>
        </div>
    </div>
</div>
            `
    popUpSettings.addEventListener("click", (e) => { //to prevent from pause 
        e.stopPropagation();
    });

    //ajout dans le canva
    placeInCanva(popUpSettings);
    setActivePopUp("#PopUpSetting");

    const selectFrom = document.getElementById('from-lang'); //to set the selected value of every settings select
    selectFrom.value = fromLanguage;
    const selectTo = document.getElementById('to-lang');
    selectTo.value = toLanguage;
    const selectExtLanguage = document.getElementById('extension-lang');
    selectExtLanguage.value = extensionLanguage;

    const returnButton = document.querySelector(".return-icon")//when the user click on the return icon
    returnButton.addEventListener('click', (e) => {
        deletePopUpInstant();
        createPopUp();
    })

    const choiceInput = document.querySelector("#shortcut-choice")//when the user click to change the shortcut
    choiceInput.addEventListener('focus', (e) => {
        choiceInput.addEventListener('keydown', (e) => {
            e.stopPropagation(); //to block the event on the document to open the popUp
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
        selectExtLanguage(e.target.value);
        chrome.storage.local.set({ "extensionLanguage": extensionLanguage });
    })
}