var translated = false; //true if subtitles of the popUp have been translated,false otherwise
var lastSub = null; //contain the last subtitles of the series
var lastSubTranslated = null; //contain the last subtitles translated of var lastSub
var deleteTimeout = null; //contain the timer of the popUp
var extensionLanguage = null; //to get the navigator language
var keyShortCut = 'h' //the short cut to open or close popUp
var popUpState = false //popUp translate can be open or close
var fromLanguage = null;
var toLanguage = null;
var activePopUp = null; //current popup that is being displayed
(


    function () {



        function restoreStorageVar() {
            if(localStorage.getItem('keyShortCut')!=null){keyShortCut = localStorage.getItem('keyShortCut')};
            if(localStorage.getItem('fromLanguage')!=null){fromLanguage = localStorage.getItem('fromLanguage')};
            if(localStorage.getItem('toLanguage')!=null){toLanguage = localStorage.getItem('toLanguage')};
            if(localStorage.getItem('extensionLanguage')!=null){setExtensionLanguage(localStorage.getItem('extensionLanguage'))};
        }
        // I restore the parameter of the user
        restoreStorageVar();

        

        function addButtons() { //to add the button to the netflix bar
            if (!document.querySelector("#translate-btn")) {
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

        }

        waitForElm(".ltr-omkt8s").then((elm) => { //we wait till the player is created
            console.log('Player is ready');
            addButtons() //then we can add the button to the canva
            var selector = document.querySelector(".ltr-omkt8s")
            function callback(mutationsList, observer) {
                mutationsList.forEach(mutation => {
                    if (mutation.attributeName === 'class') {
                        if (selector.classList.contains("active")) { //we have to add the button every time that the statusbar of the series is displayed
                            addButtons();
                        }
                    }
                })
            }

            const mutationObserver = new MutationObserver(callback);

            mutationObserver.observe(selector, { attributes: true });
        });

        document.addEventListener('keydown', (e) => {
            const keyName = e.key; //return a string of the name of the key pressed
            if (keyName === keyShortCut) { //if its the right key pressed
                console.log("good key");
                const canva = document.querySelector('.ltr-omkt8s');
                canva.click();
                if (!popUpState) {
                    popUpState = true;
                    createPopUp();
                    setTimeBarInvisible(true);
                } else {
                    popUpState = false;
                    removeActivePopUp();
                    setTimeBarInvisible(false);
                }
            }
        })


    })();