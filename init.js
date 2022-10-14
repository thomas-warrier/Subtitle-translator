(function (){
    function addButtons() {
        var btn = document.createElement("input");
        btn.value = "Translate Subtitles";
        btn.id = "translate-btn";
        btn.type = "submit";
        document.querySelector("div.ltr-1jnlk6v").prepend(btn); //the query selector select the div where all of the right bottom button are
        //the prepend add the button before the childs example: parent.prepend(newChild)  will be [newChild, child1, child2]
        console.log("hello there")
    }
    function defineTranslateButtonEvents() {
        document.getElementById("translate-btn")
        addEventListener("click", function
            (event) {
            createPopUp();
        });
    }
    
    function createPopUp() {
    
    }
    
    function getSubtitles() {
        let getChildren = document.querySelector("div.player-timedtext-text-container > span").children
        var subtitlesTab = [];
        for (let i = 0; i < getChildren.length; i++) {
            subtitlesTab.push(getChildren[i].textContent)
        }
        return subtitlesTab
    };

    addEventListener('mousemove',(event)=>{

    })
    addEventListener('mouseup', (event) => {
        if(event.button==0){
            addButtons()
        }
    });  
    addEventListener('keypress', (event) => {
        addButtons()
    });

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
        console.log('Element is ready');
        console.log(elm.textContent);
        var selector = document.querySelector(".ltr-omkt8s")
        function callback(mutationsList, observer) {
            console.log('Mutations:', mutationsList)
            console.log('Observer:', observer)
            mutationsList.forEach(mutation => {
                if (mutation.attributeName === 'class') {
                    console.log('Ch-ch-ch-changes!')
                }
            })
        }
        
        const mutationObserver = new MutationObserver(callback)
        
        mutationObserver.observe(selector, { attributes: true })
    });
    
    
    defineTranslateButtonEvents();
})();


