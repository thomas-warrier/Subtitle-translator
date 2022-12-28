function setSubtitlesObserver() {
    var selector = document.querySelector("div.player-timedtext");
    const mutationObserver = new MutationObserver(getSubtitles);
    mutationObserver.observe(selector, {
        childList: true
    });
}


/**
 * get from the netflix html the current subtitles if they are available, the most recent otherwise.
 * @returns the last subtitles available
 */
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
        
    }
}