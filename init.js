(function () {
    function addButtons() {
        var btn = document.createElement("input");
        btn.value = "";
        btn.id = "translate-btn";
        btn.type = "submit";
        waitForElm(".ltr-1jnlk6v").then((elm) => {
            document.querySelectorAll(".ltr-1jnlk6v")[6].prepend(btn); //the query selector select the div where all of the right bottom button are
            //the prepend add the button before the childs example: parent.prepend(newChild)  will be [newChild, child1, child2]
        });
    }

    function defineTranslateButtonEvents() {
        document.getElementById("translate-btn")
        addEventListener("click", function
            (event) {
            createPopUp();
        });
    }

    function createPopUp() {
        var popUp = document.createElement("div");
        popUp.id = "PopUpTranslate"
        popUp.innerHTML =
            <div>
                <div id="languages-container">
                    <div id="from-languages">Langue détecter</div><div id="to-languages">Francais</div>
                </div>
                <div id="from-subtitles">
                    <p>${getSubtitles()}</p>
                </div>
                <div id="translated-subtitles">
                    <p></p>
                </div>

            </div>
    }

    function getSubtitles() {
        let getChildren = document.querySelector("div.player-timedtext-text-container > span").children
        var subtitlesTab = [];
        for (let i = 0; i < getChildren.length; i++) {
            subtitlesTab.push(getChildren[i].textContent)
        }
        var stringSubtitles ="";
        subtitlesTab.forEach(element => {
                stringSubtitles+=element+'\n'
        })
        return stringSubtitles;
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


