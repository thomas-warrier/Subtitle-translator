(function (){
    function AddButtons() {
        var btn = document.createElement("input");
        btn.value = "Translate Subtitles";
        btn.id = "translate-btn";
        btn.type = "submit";
        document.querySelector("div.ltr-1jnlk6v").prepend(btn); //the query selector select the div where all of the right bottom button are
        //the prepend add the button before the childs example: parent.prepend(newChild)  will be [newChild, child1, child2]
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

    AddButtons();
    defineTranslateButtonEvents();
})();


