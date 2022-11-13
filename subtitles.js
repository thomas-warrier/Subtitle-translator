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