(
    function () {

        
        //dernier sous titre
        var translated = false;
        var lastSub = null;
        var lastSubTranslated = null;

        function addButtons() {
            var btn = document.createElement("input");
            btn.value = "";
            btn.id = "translate-btn";
            btn.type = "submit";
            btn.onmouseout = function (event) {
                const elements = document.getElementsByClassName("PopUpTranslate-Class");
                while (elements.length > 0) {
                    elements[0].parentNode.removeChild(elements[0]);
                }
            };
            btn.onmouseover = function (event) {
                createPopUp();
            };

            waitForElm(".ltr-1jnlk6v").then((elm) => {
                document.querySelectorAll(".ltr-1jnlk6v")[6].prepend(btn); //the query selector select the div where all of the right bottom button are
                //the prepend add the button before the childs example: parent.prepend(newChild)  will be [newChild, child1, child2]
            });
        }


        function createPopUp() {
            const sub = getSubtitles();
            if (sub) {
                //TODO Manage lang preferences
                translateText(sub,'EN','FR',(translate)=>{
                    const popUp = document.createElement("div");
                    popUp.id = "PopUpTranslate"
                    popUp.className = "PopUpTranslate-Class"
                    
                    //TODO Afficher la langue de sous titrage actuelle
                    popUp.innerHTML = `
                    <div class='container-translation-ext'>
                        <div id='languages-container'>
                            <div id='from-languages'>Langue détectée</div>
                            <div id='to-languages'>Francais</div>
                            <div id='parameter'></div>
                        </div>
                    <div id='traduction-container'>
                        <div id='from-subtitles'><span>${lastSub}</span></div>
                        <div id='translated-subtitles'><span>${decodeURIComponent(translate)}</span></div>
                    </div>
                    </div>
                    `
                    //ajout dans le canva
                    const canva = document.querySelector('div.ltr-1212o1j');
                    if(canva){
                        canva.appendChild(popUp);
                    }else{
                        console.log('Video non trouvée !');
                    }                    
                });
            }
            //aucun sous-titres
        }

        //wesh cum master
        //un agent crous te regarde
        function translateText(subtitles, fromLanguage, toLanguage, callback) {
            //ici faire une condition if translate = true alors pas faire ca ?
            if(!translated){
                let apiUrl = `https://api.mymemory.translated.net/get?q=${subtitles}&langpair=${fromLanguage}|${toLanguage}&de=twarrier69@gmail.com`;
                fetch(apiUrl).then(res => res.json()).then(data => {
                    //si la requete est valide par le crous manager
                    if(data.responseStatus == 200){
                        translated = true;
                        lastSubTranslated = data.responseData.translatedText;
                        console.log('Traduction : ',lastSubTranslated);
                        callback(lastSubTranslated);
                        return;
                    }
                    //pas besoin de rappeler le callback, aucun element sera afficher dans ce cas
                    console.log('Erreur durant la requete : ',data.responseStatus);
                });
            }
            callback(lastSubTranslated);
        }



        function getSubtitles() {
            var childrenExist = document.querySelector("div.player-timedtext-text-container > span");
            if (childrenExist !== null) {
                let getChildren = document.querySelector("div.player-timedtext-text-container > span").children;
                var subtitlesTab = [];
                for (let i = 0; i < getChildren.length; i++) {
                    subtitlesTab.push(getChildren[i].textContent);
                }
                if(lastSub != subtitlesTab.join(" ")){
                    translated = false;
                    lastSub = subtitlesTab.join(" ");
                }
                return lastSub;
            }
            // console.log("there is no subtitle available");
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
    })();