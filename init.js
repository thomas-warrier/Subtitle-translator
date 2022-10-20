(
    function () {

        
        //dernier sous titre
        var lastSub = null;

        function addButtons() {
            var btn = document.createElement("input");
            btn.value = "";
            btn.id = "translate-btn";
            btn.type = "submit";
            btn.onmouseout = function (event) {
                const elements = document.getElementsByClassName("container-translation-ext");
                while (elements.length > 0) {
                    elements[0].parentNode.removeChild(elements[0]);
                }
            };
            btn.onmouseover = function (event) {
                createPopUp()
            };

            waitForElm(".ltr-1jnlk6v").then((elm) => {
                document.querySelectorAll(".ltr-1jnlk6v")[6].prepend(btn); //the query selector select the div where all of the right bottom button are
                //the prepend add the button before the childs example: parent.prepend(newChild)  will be [newChild, child1, child2]
            });
        }

        function defineTranslateButtonEvents() {

        }

        function createPopUp() {
            const sub = getSubtitles();
            if (sub) {
                //TODO Manage lang preferences
                const transleted = translateText(sub,'EN','FR',(translate)=>{
                    const popUp = document.createElement("div");
                    popUp.id = "PopUpTranslate"
                    
                    //TODO Afficher la langue de sous titrage actuelle
                    popUp.innerHTML = `
                    <div class='container-translation-ext'>
                        <div id='languages-container'>
                            <div id='from-languages'>"Langue détectée</div>
                            <div id='to-languages'>Francais</div>
                        </div>
                        <div id='from-subtitles'><span>"${lastSub}"</span></div>
                        <div id='translated-subtitles'><span>"${decodeURIComponent(translate)}"</span></div>
                    </div>
                    `
                    console.log(popUp.innerHTML); 
                    console.log("PopUp created");
                });
            }
            //aucun sous-titres
        }

        //wesh cum master
        //un agent crous te regarde
        function translateText(subtitles, fromLanguage, toLanguage, callback) {
            let apiUrl = `https://api.mymemory.translated.net/get?q=${subtitles}&langpair=${fromLanguage}|${toLanguage}&de=twarrier69@gmail.com`;
            fetch(apiUrl).then(res => res.json()).then(data => {
                //si la requete est valide par le crous manager
                if(data.responseStatus == 200){
                    callback(data.responseData.translatedText);
                    return;
                }
                //pas besoin de rappeler le callback, aucun element sera afficher dans ce cas
                console.log('Erreur durant la requete : ',data.responseStatus);
            });
        }



        function getSubtitles() {
            var childrenExist = document.querySelector("div.player-timedtext-text-container > span");
            if (childrenExist !== null) {
                let getChildren = document.querySelector("div.player-timedtext-text-container > span").children;
                var subtitlesTab = [];
                for (let i = 0; i < getChildren.length; i++) {
                    subtitlesTab.push(getChildren[i].textContent);
                }
                lastSub = subtitlesTab.join(" ");
                return lastSub;
            }
            console.log("there is no subtitle available");
            return lastSub; 
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
        waitForElm(".ltr-omkt8s").then((elm) => {
            console.log('Player is ready');
            addButtons()
            var selector = document.querySelector(".ltr-omkt8s")
            function callback(mutationsList, observer) {
                mutationsList.forEach(mutation => {
                    if (mutation.attributeName === 'class') {
                        if (selector.classList.contains("active")) {
                            addButtons()
                        }
                    }
                })
            }

            const mutationObserver = new MutationObserver(callback)

            mutationObserver.observe(selector, { attributes: true })
        });


        defineTranslateButtonEvents();
    })();