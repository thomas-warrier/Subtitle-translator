(
    function () {

        var translated = false; //true if subtitles of the popUp have been translated,false otherwise
        var lastSub = null; //contain the last subtitles of the series
        var lastSubTranslated = null; //contain the last subtitles translated of var lastSub
        var deleteTimeout = null; //contain the timer of the popUp
        var extensionLanguage = navigator.language //to get the navigator language
        var keyShortCut = 'h' //the short cut to open or close popUp
        var popUpState = false //popUp translate can be open or close
        var fromLanguage = null;
        var toLanguage = null;
        var extLang = null;

        function addButtons() { //to add the button to the netflix bar
            var btn = document.createElement("button");
            btn.value = "";
            btn.id = "translate-btn";
            btn.addEventListener('mouseenter', (e) => {
                createPopUp();
            });
            btn.addEventListener('mouseleave', () => {
                deletePopUpWithDelay();
            })
            waitForElm(".ltr-1jnlk6v").then((elm) => {
                document.querySelectorAll(".ltr-1jnlk6v")[6].prepend(btn); //the query selector select the div where all of the right bottom button are
                //the prepend add the button before the childs 
            });
        }




        function deletePopUpWithDelay() { //delete the popUp with 400 ms delay
            if (lastSub != null) { //if subtitle are not null you will have to delete a translate popUp after 400ms
                deleteTimeout = setTimeout(() => {
                    document.querySelector("div.ltr-1bt0omd:nth-child(1) > div:nth-child(1)").style.visibility = "visible"; //to set visible the red bar timer
                    const popUpSubtitle = document.getElementById("PopUpTranslate");
                    //if (popUpSubtitle != null) {
                    popUpSubtitle.remove();
                    deleteTimeout = null;
                    console.log('Ben said no');

                }, 400);
            }
            else { //else you will have to delete an error popUp after 400ms
                deleteTimeout = setTimeout(() => {
                    document.querySelector("div.ltr-1bt0omd:nth-child(1) > div:nth-child(1)").style.visibility = "visible";
                    const popUpError = document.getElementById("PopUpNoSubError");
                    popUpError.remove();
                    deleteTimeout = null;
                    console.log('Ben said no');
                }, 400);
            }

        }



        function createPopUp() {
            //if there is no popUp of translate and no popUp of error then you can create a popUp
            if (!document.getElementById('PopUpTranslate') && !document.getElementById('PopUpNoSubError')) {
                const sub = getSubtitles();
                document.querySelector("div.ltr-1bt0omd:nth-child(1) > div:nth-child(1)").style.visibility = "hidden"; //to hide the red bar
                if (sub) {
                    //TODO Manage lang preferences
                    translateText(sub, 'EN', 'FR', (translate) => {
                        createTranslatePopUp(translate)
                    });
                }
                //mean there is no subtitles to display
                else {//create a popUp of error
                    createErrorPopUp()
                }
            }
        }

        function createTranslatePopUp(translate) {
            const popUp = document.createElement("div");
            popUp.id = "PopUpTranslate"
            popUp.className = "PopUpTranslate-Class"

            //TODO Afficher la langue de sous titrage actuelle
            popUp.innerHTML = `
                            <div class='container-translation-ext'>
                                <div id='languages-container'>
                                    <div id='from-languages'><span lang='en'>Detected language</span></div>
                                    <div class="language-and-parameter">
                                        <div id='to-languages'>Francais</div>
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
                console.log("ben")
                //blockPause()
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


            const parameterButton = document.querySelector(".parameter-icon-to-context")
            parameterButton.addEventListener('click', (e) => {
                deletePopUpWithDelay()
                createpopUpSettings()
            })
        }


        function createErrorPopUp() {
            console.log("Error Pop Up")
            const popUpNoSub = document.createElement("div");
            popUpNoSub.id = "PopUpNoSubError"
            popUpNoSub.className = "PopUpNoSubErrorClass"
            popUpNoSub.innerHTML = `
                    <div id='error-translation-container'>
                        <div id='top-container'>
                            <span lang='fr'>Aucun Sous-Titres</span>
                            <span lang='en'>No subtitles available</span>
                        </div>
                        <div id='bottom-container'>
                            <div id='no-subtitles'>
                                <span lang='fr'>Aucun sous-titre disponible pour le moment</span>
                                <span lang='en'>No subtitles available for now,please wait for the first subtitles</span>
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

        function translateText(subtitles, fromLanguage, toLanguage, callback) {
            //ici faire une condition if translate = true alors pas faire ca ?
            if (!translated) {
                let apiUrl = `https://api.mymemory.translated.net/get?q=${subtitles}&langpair=${fromLanguage}|${toLanguage}&de=twarrier69@gmail.com`;
                fetch(apiUrl).then(res => res.json()).then(data => {
                    //si la requete est valide par le crous manager
                    if (data.responseStatus == 200) {
                        translated = true;
                        lastSubTranslated = data.responseData.translatedText;
                        console.log('Traduction : ', lastSubTranslated);
                        callback(lastSubTranslated);
                        return;
                    }
                    //pas besoin de rappeler le callback, aucun element sera afficher dans ce cas
                    console.log('Erreur durant la requete : ', data.responseStatus);
                });
            }
            callback(lastSubTranslated);
        }



        function getSubtitles() {
            var childrenExist = document.querySelector("div.player-timedtext-text-container > span"); //select the span where subtitles are contain (return null if there is no subtitles)
            if (childrenExist !== null) {//if a subtitle exist
                let getChildren = document.querySelector("div.player-timedtext-text-container > span").children; //get all the different subtitles
                var subtitlesTab = [];
                for (let i = 0; i < getChildren.length; i++) { //for each subtitles get their content and put it inside the array
                    subtitlesTab.push(getChildren[i].textContent);
                }
                if (lastSub != subtitlesTab.join(" ")) { //if the string of the new subtitles is different from the older subtitles 
                    translated = false; //then they are subtitles which have not been translated
                    lastSub = subtitlesTab.join(" "); //they became the new "lastsubtitles"
                }
                return lastSub;
            }
            return lastSub; //there is no new subtitles so we return the last subtitles
        }


        function waitForElm(selector) {
            return new Promise(resolve => {
                if (document.querySelector(selector)) {
                    return resolve(document.querySelector(selector));
                }

                const observer = new MutationObserver(mutations => {
                    if (document.querySelector(selector)) {
                        resolve(document.querySelector(selector));
                        observer.disconnect();
                    }
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });
            });
        }



        waitForElm(".ltr-omkt8s").then((elm) => { //we wait till the player is created
            console.log('Player is ready');
            addButtons() //then we can add the button to the canva
            var selector = document.querySelector(".ltr-omkt8s")
            function callback(mutationsList, observer) {
                mutationsList.forEach(mutation => {
                    if (mutation.attributeName === 'class') {
                        if (selector.classList.contains("active")) { //we have to add the button every time that the statusbar of the series is displayed
                            addButtons()
                        }
                    }
                })
            }

            const mutationObserver = new MutationObserver(callback)

            mutationObserver.observe(selector, { attributes: true })
        });



        function createpopUpSettings() { //to create the subssettingsPopUp
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

                <label class='title'>Paramètre</label>
            </div>
            <div>
                <div class='container-ext'>
                    <label>Langages sources</label>
                    <div id='select-option'>
                        <select class='choice-option' name="from-lang" id="from-lang">
                            <option value="English">English</option>
                            <option value="French">French</option>
                        </select>
                    </div>
                </div>
                <div class='container-ext'>
                    <label>Langages cible</label>
                    <div id='select-option'>
                        <select class='choice-option' name="to-lang" id="to-lang">
                            <option value="English">English</option>
                            <option value="French">French</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class='container-ext'>
                    <label>Raccourcis clavier</label>
                    <input class='choice-option' type="text" id='shortcut-choice' readonly>
            </div>
            <div class='container-ext' id='extension-languages'>
                <label>Langue de l'extension</label>
                <div id='select-option'>
                    <select class='choice-option' name="extension-lang" id="extension-lang">
                        <option value="English">English</option>
                        <option value="French">French</option>
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
            const returnButton = document.querySelector(".return-icon")//when the user click on the return icon
            returnButton.addEventListener('click', (e) => {
                deletePopUpWithDelay();
                createPopUp();
            })

            const choiceInput = document.querySelector("#shortcut-choice")//when the user click to change the shortcut
            choiceInput.addEventListener('focus', (e) => {
                choiceInput.addEventListener('keydown', (e) => {
                    e.stopPropagation() //to block the event on the document to open the popUp
                    const keyName = e.key;
                    choiceInput.value = keyName; //display the selected key for the user
                    keyShortCut = keyName; //set the shortCut to the key selected
                    choiceInput.blur();//unfocus the input when key is selected
                });

            });

            const choiceFromLang = document.querySelector("#from-lang")
            choiceFromLang.addEventListener('change', (e) => { fromLanguage = this.value; })
            const choiceToLang = document.querySelector("#to-lang")
            choiceToLang.addEventListener('change', (e) => { toLanguage = this.value; })
            const choiceExtLang = document.querySelector("#extension-lang")
            choiceExtLang.addEventListener('change', (e) => { extLanguage = this.value; })


        }



        document.addEventListener('keydown', (e) => {
            const keyName = e.key; //return a string of the name of the key pressed
            if (keyName === keyShortCut) { //if its the right key pressed
                console.log("good key")
                if (!popUpState) {
                    popUpState = true
                    createPopUp()
                } else {
                    popUpState = false
                    deletePopUpWithDelay() //TODO replace with instant delete
                }
            }
        })

    })();