(
    function () {

        //dernier sous titre
        var translated = false;
        var lastSub = null;
        var lastSubTranslated = null;
        var deleteTimeout = null;
        
        function addButtons() {
            var btn = document.createElement("input");
            btn.value = "";
            btn.id = "translate-btn";
            btn.type = "submit";
            btn.addEventListener('mouseenter',(e)=>{
                createPopUp();
            });
            btn.addEventListener('mouseleave',()=>{
                deletePopUp();
            })
            waitForElm(".ltr-1jnlk6v").then((elm) => {
                document.querySelectorAll(".ltr-1jnlk6v")[6].prepend(btn); //the query selector select the div where all of the right bottom button are
                //the prepend add the button before the childs 
            });
        }

        function deletePopUp() {
            if (lastSub != null) {
                deleteTimeout = setTimeout(() => {
                    document.querySelector("div.ltr-1bt0omd:nth-child(1) > div:nth-child(1)").style.visibility = "visible"; //to set visible the red bar timer
                    const popUpError = document.getElementById("PopUpTranslate");
                    popUpError.remove();
                    deleteTimeout = null;
                    console.log('Ben said no');
                }, 400);
            }
            else {
                deleteTimeout = setTimeout(() => {
                    document.querySelector("div.ltr-1bt0omd:nth-child(1) > div:nth-child(1)").style.visibility = "visible"; 
                    const popUpSubtitle = document.getElementById("PopUpNoSubError");
                    popUpSubtitle.remove();
                    deleteTimeout = null;
                    console.log('Ben said no');
                }, 400);
            }
            
        }

        function createPopUp() {
            if(!document.getElementById('PopUpTranslate') && !document.getElementById('PopUpNoSubError')){  
                const sub = getSubtitles();
                document.querySelector("div.ltr-1bt0omd:nth-child(1) > div:nth-child(1)").style.visibility = "hidden"; //to hide the red bar
                if (sub) {
                    //TODO Manage lang preferences
                    translateText(sub, 'EN', 'FR', (translate) => {

                        if (!document.getElementById('PopUpTranslate')) {
                            
                            const popUp = document.createElement("div");
                            popUp.id = "PopUpTranslate"
                            popUp.className = "PopUpTranslate-Class"
    
                            //TODO Afficher la langue de sous titrage actuelle
                            popUp.innerHTML = `
                            <div class='container-translation-ext'>
                                <div id='languages-container'>
                                    <div id='from-languages'><span lang='fr'>Langue détectée</span><span lang='en'>Detected language</span></div>
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
                            popUp.addEventListener('mouseenter',(e)=>{
                                console.log("ben")
                                if(deleteTimeout){
                                    clearTimeout(deleteTimeout);
                                }
                            });
    
                            popUp.addEventListener('mouseleave',(e)=>{
                                deletePopUp();
                            })
                        
                            //ajout dans le canva
                            placeInCanva(popUp);
                        }
                        
                    });
                }
                //aucun sous-titres
                else {
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
                    popUpNoSub.addEventListener('mouseenter',(e)=>{

                        if(deleteTimeout){
                            clearTimeout(deleteTimeout);
                        }
                    });

                    popUpNoSub.addEventListener('mouseleave',(e)=>{
                        
                        deletePopUp();
                    })
                    placeInCanva(popUpNoSub);
                }
            }
        }

        function placeInCanva(popUp) {
            // const canva = document.querySelector('div.ltr-1212o1j');
            const canva = document.querySelector('.ltr-omkt8s');
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
            var childrenExist = document.querySelector("div.player-timedtext-text-container > span");
            if (childrenExist !== null) {
                let getChildren = document.querySelector("div.player-timedtext-text-container > span").children;
                var subtitlesTab = [];
                for (let i = 0; i < getChildren.length; i++) {
                    subtitlesTab.push(getChildren[i].textContent);
                }
                if (lastSub != subtitlesTab.join(" ")) {
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
            elm.addEventListener('mousemove',(e)=>{

            })
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



        function createpopUpSettings() {
            const popUpSettings = document.createElement("div");
                    popUpSettings.id = "PopUpSetting"
                    popUpSettings.className = "PopUpSetting-Class"
                    
                    //TODO Afficher la langue de sous titrage actuelle
                    popUpSettings.innerHTML = `
                    <div class='container-setting-ext'>
                        <div id='title-container'>
                            <h1>Paramètre<h1>
                        </div>
                        <div id='setting-container'>
                            <div id='from-subtitles-languages'>
                                <h2>Langages sources</h2>
                                ${availableLanguages()}
                            </div>
                            <div id='to-subtitles-languages'>
                                <h2>Langages cible</h2>
                                ${availableLanguages()}
                            </div>
                        </div>  
                        <div id='extension-languages'>
                                <h2>Langue de l'extension</h2>
                                
                        </div>
                    </div>
                    `
                    //ajout dans le canva
                    placeInCanva(popUpSettings); 
        }
        
        function getLanguagesOption(lang, langExtension) {

            var select = document.createElement("select");
            select.name = "language";
            select.id = "language"

            for (const val of lang) {
                var option = document.createElement("option");
                option.value = val;
                option.text = val.valueOf(langExtension);
                select.appendChild(option);
            }


        }

        const lang = JSON.parse({
            "af": { "French": "Afrikaans", "English": "Afrikaans" },
            "sq": { "French": "Albanais", "English": "Albanian" },
            "am": { "French": "Amharique", "English": "Amharic" },
            "ar": { "French": "Arabe", "English": "Arabic" },
            "hy": { "French": "Arm\u00e9nien", "English": "Armenian" },
            "as": { "French": "Assamais*", "English": "Assamese*" },
            "ay": { "French": "Aymara*", "English": "Aymara*" },
            "az": { "French": "Az\u00e9ri", "English": "Azerbaijani" },
            "bm": { "French": "Bambara*", "English": "Bambara*" },
            "eu": { "French": "Basque", "English": "Basque" },
            "be": { "French": "Bi\u00e9lorusse", "English": "Belarusian" },
            "bn": { "French": "Bengal\u00ee", "English": "Bengali" },
            "bho": { "French": "Bhodjpouri*", "English": "Bhojpuri" },
            "bs": { "French": "Bosniaque", "English": "Bosnian" },
            "bg": { "French": "Bulgare", "English": "Bulgarian" },
            "ca": { "French": "Catalan", "English": "Catalan" },
            "ceb": { "French": "Cebuano", "English": "Cebuano" },
            "zh-CN": {
                "French": "Chinois (simplifi\u00e9)",
                "English": "Chinese (Simplified)"
            },
            "zh-TW (BCP-47)": {
                "French": "Chinois (traditionnel)",
                "English": "Chinese (Traditional)"
            },
            "co": { "French": "Corse", "English": "Corsican" },
            "hr": { "French": "Croate", "English": "Croatian" },
            "cs": { "French": "Tch\u00e8que", "English": "Czech" },
            "da": { "French": "Danois", "English": "Danish" },
            "dv": { "French": "Div\u00e9hi*", "English": "Dhivehi*" },
            "doi": { "French": "Dogri*", "English": "Dogri*" },
            "nl": { "French": "N\u00e9erlandais", "English": "Dutch" },
            "en": { "French": "Anglais", "English": "English" },
            "eo": { "French": "Esp\u00e9ranto", "English": "Esperanto" },
            "et": { "French": "Estonien", "English": "Estonian" },
            "ee": { "French": "Ewe*", "English": "Ewe*" },
            "fil": { "French": "Filipino (Tagalog)", "English": "Filipino (Tagalog)" },
            "fi": { "French": "Finnois", "English": "Finnish" },
            "fr": { "French": "Fran\u00e7ais", "English": "French" },
            "fy": { "French": "Frison", "English": "Frisian" },
            "gl": { "French": "Galicien", "English": "Galician" },
            "ka": { "French": "G\u00e9orgien", "English": "Georgian" },
            "de": { "French": "Allemand", "English": "German" },
            "el": { "French": "Grec", "English": "Greek" },
            "gn": { "French": "Guarani*", "English": "Guarani*" },
            "gu": { "French": "Gujar\u00e2t\u00ee", "English": "Gujarati" },
            "ht": { "French": "Cr\u00e9ole ha\u00eftien", "English": "Haitian Creole" },
            "ha": { "French": "Haoussa", "English": "Hausa" },
            "haw": { "French": "Hawa\u00efen", "English": "Hawaiian" },
            "he or iw": { "French": "H\u00e9breu", "English": "Hebrew" },
            "hi": { "French": "Hindi", "English": "Hindi" },
            "hmn": { "French": "Hmong", "English": "Hmong" },
            "hu": { "French": "Hongrois", "English": "Hungarian" },
            "is": { "French": "Islandais", "English": "Icelandic" },
            "ig": { "French": "Igbo", "English": "Igbo" },
            "ilo": { "French": "Ilocano*", "English": "Ilocano*" },
            "id": { "French": "Indon\u00e9sien", "English": "Indonesian" },
            "ga": { "French": "Irlandais", "English": "Irish" },
            "it": { "French": "Italien", "English": "Italian" },
            "ja": { "French": "Japonais", "English": "Japanese" },
            "jv": { "French": "Javanais", "English": "Javanese" },
            "kn": { "French": "Kannara", "English": "Kannada" },
            "kk": { "French": "Kazakh", "English": "Kazakh" },
            "km": { "French": "Khmer", "English": "Khmer" },
            "rw": { "French": "Kinyarwanda", "English": "Kinyarwanda" },
            "gom": { "French": "Konkani*", "English": "Konkani*" },
            "ko": { "French": "Cor\u00e9en", "English": "Korean" },
            "kri": { "French": "Krio*", "English": "Krio*" },
            "ku": { "French": "Kurde", "English": "Kurdish" },
            "ckb": { "French": "Kurde (Sorani)*", "English": "Kurdish (Sorani)*" },
            "ky": { "French": "Kirghyz", "English": "Kyrgyz" },
            "lo": { "French": "Laotien", "English": "Lao" },
            "la": { "French": "Latin", "English": "Latin" },
            "lv": { "French": "Letton", "English": "Latvian" },
            "ln": { "French": "Lingala*", "English": "Lingala*" },
            "lt": { "French": "Lituanien", "English": "Lithuanian" },
            "lg": { "French": "Luganda*", "English": "Luganda*" },
            "lb": { "French": "Luxembourgeois", "English": "Luxembourgish" },
            "mk": { "French": "Mac\u00e9donien", "English": "Macedonian" },
            "mai": { "French": "Ma\u00efthili*", "English": "Maithili*" },
            "mg": { "French": "Malgache", "English": "Malagasy" },
            "ms": { "French": "Malais", "English": "Malay" },
            "ml": { "French": "Malay\u00e2lam", "English": "Malayalam" },
            "mt": { "French": "Maltais", "English": "Maltese" },
            "mi": { "French": "Maori", "English": "Maori" },
            "mr": { "French": "Marathi", "English": "Marathi" },
            "mni-Mtei": {
                "French": "Meitei (Manipuri)*",
                "English": "Meiteilon (Manipuri)*"
            },
            "lus": { "French": "Mizo*", "English": "Mizo*" },
            "mn": { "French": "Mongol", "English": "Mongolian" },
            "my": { "French": "Birman", "English": "Myanmar (Burmese)" },
            "ne": { "French": "N\u00e9palais", "English": "Nepali" },
            "no": { "French": "Norv\u00e9gien", "English": "Norwegian" },
            "ny": { "French": "Nyanja (Chichewa)", "English": "Nyanja (Chichewa)" },
            "or": { "French": "Odia (Oriya)", "English": "Odia (Oriya)" },
            "om": { "French": "Oromo*", "English": "Oromo*" },
            "ps": { "French": "Pacht\u00f4", "English": "Pashto" },
            "fa": { "French": "Perse", "English": "Persian" },
            "pl": { "French": "Polonais", "English": "Polish" },
            "pt": {
                "French": "Portugais (Portugal, Br\u00e9sil)",
                "English": "Portuguese (Portugal, Brazil)"
            },
            "pa": { "French": "Panjabi", "English": "Punjabi" },
            "qu": { "French": "Quechua*", "English": "Quechua*" },
            "ro": { "French": "Roumain", "English": "Romanian" },
            "ru": { "French": "Russe", "English": "Russian" },
            "sm": { "French": "Samoan", "English": "Samoan" },
            "sa": { "French": "Sanskrit*", "English": "Sanskrit*" },
            "gd": {
                "French": "Ga\u00e9lique (\u00c9cosse)",
                "English": "Scots Gaelic"
            },
            "nso": { "French": "Sepedi*", "English": "Sepedi*" },
            "sr": { "French": "Serbe", "English": "Serbian" },
            "st": { "French": "Sesotho", "English": "Sesotho" },
            "sn": { "French": "Shona", "English": "Shona" },
            "sd": { "French": "Sindh\u00ee", "English": "Sindhi" },
            "si": { "French": "Singhalais", "English": "Sinhala (Sinhalese)" },
            "sk": { "French": "Slovaque", "English": "Slovak" },
            "sl": { "French": "Slov\u00e8ne", "English": "Slovenian" },
            "so": { "French": "Somali", "English": "Somali" },
            "es": { "French": "Spanish", "English": "Spanish" },
            "su": { "French": "Soundanais", "English": "Sundanese" },
            "sw": { "French": "Swahili", "English": "Swahili" },
            "sv": { "French": "Su\u00e9dois", "English": "Swedish" },
            "tl": { "French": "Tagalog (philippin)", "English": "Tagalog (Filipino)" },
            "tg": { "French": "Tadjik", "English": "Tajik" },
            "ta": { "French": "Tamoul", "English": "Tamil" },
            "tt": { "French": "Tatar", "English": "Tatar" },
            "te": { "French": "T\u00e9lougou", "English": "Telugu" },
            "th": { "French": "Tha\u00ef", "English": "Thai" },
            "ti": { "French": "Tigrinya*", "English": "Tigrinya*" },
            "ts": { "French": "Tsonga*", "English": "Tsonga*" },
            "tr": { "French": "Turc", "English": "Turkish" },
            "tk": { "French": "Turkm\u00e8ne", "English": "Turkmen" },
            "ak": { "French": "Twi (Akan)*", "English": "Twi (Akan)*" },
            "uk": { "French": "Ukrainien", "English": "Ukrainian" },
            "ur": { "French": "Urdu", "English": "Urdu" },
            "ug": { "French": "Ou\u00efghour", "English": "Uyghur" },
            "uz": { "French": "Ouzbek", "English": "Uzbek" },
            "vi": { "French": "Vietnamien", "English": "Vietnamese" },
            "cy": { "French": "Gallois", "English": "Welsh" },
            "xh": { "French": "Xhosa", "English": "Xhosa" },
            "yi": { "French": "Yiddish", "English": "Yiddish" },
            "yo": { "French": "Yoruba", "English": "Yoruba" },
            "zu": { "French": "Zoulou", "English": "Zulu" }
        })
    })();