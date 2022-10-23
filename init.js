(
    function () {

        
        //dernier sous titre
        var translated = false;
        var lastSub = null;
        var lastSubTranslated = null;
        var popUpHover=false;
        var errorMessage="Aucun sous-titre disponible pour le moment";



        function addButtons() {
            var btn = document.createElement("input");
            btn.value = "";
            btn.id = "translate-btn";
            btn.type = "submit";
            btn.onmouseout = function (event) {
                    deletePopUp();
            };
            btn.onmouseover = function (event) {
                document.querySelector("div.ltr-1bt0omd:nth-child(1) > div:nth-child(1)").style.visibility="hidden";
                createPopUp();

            };

            waitForElm(".ltr-1jnlk6v").then((elm) => {
                document.querySelectorAll(".ltr-1jnlk6v")[6].prepend(btn); //the query selector select the div where all of the right bottom button are
                //the prepend add the button before the childs example: parent.prepend(newChild)  will be [newChild, child1, child2]
            });
        }

        function deletePopUp(){
            if(lastSub==null){
                setTimeout(()=>{
                    const elements = document.getElementsByClassName("PopUpNoSubErrorClass");
                    while (elements.length > 0) {
                        elements[0].parentNode.removeChild(elements[0]);
                    }
                    document.querySelector("div.ltr-1bt0omd:nth-child(1) > div:nth-child(1)").style.visibility="visible";
                },400);
            }
            else{
                setTimeout(()=>{
                    const elements = document.getElementsByClassName("PopUpTranslate-Class");
                    while (elements.length > 0) {
                        elements[0].parentNode.removeChild(elements[0]);
                    }
                    document.querySelector("div.ltr-1bt0omd:nth-child(1) > div:nth-child(1)").style.visibility="visible";
                },400);
            }
                    
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
                    //ajout dans le canva
                    placeInCanva(popUp);                 
                });
            }
            //aucun sous-titres
            else{
                console.log("Error Pop Up")
                const popUpNoSub=document.createElement("div");
                popUpNoSub.id="PopUpNoSubError"
                popUpNoSub.className="PopUpNoSubErrorClass"
                popUpNoSub.innerHTML=`
                <div id='error-translation-container'>
                    <div id='top-container'>
                        Aucun Sous-Titres
                    </div>
                    <div id='bottom-container'>
                        <div id='no-subtitles'>
                            <span>${errorMessage}</span>
                        </div>
                    </div>
                </div>
                `
                placeInCanva(popUpNoSub);
            }
        }

        function placeInCanva(popUp){
            const canva = document.querySelector('div.ltr-1212o1j');
            if(canva){
                canva.appendChild(popUp);
            }else{
                console.log('Video non trouvée !');
            }   
        }

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