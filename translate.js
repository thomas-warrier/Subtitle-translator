



async function translateText(subtitles, sourceLang, targetLang, callback) {
    if (!translated) {
        lastSubTranslated = "loading..."
        callback(lastSubTranslated,subtitles);
        fetch("https://translate.argosopentech.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: subtitles,
                source: sourceLang.toLowerCase(),
                target: targetLang.toLowerCase()
            }),
            headers: { "Content-Type": "application/json" }
        }).then(res => {
            if(!res.ok){
                throw new Error(`Error during request no response from server : ${res.responseStatus}`);
            }
            res.json().then(data => {
                console.log(data);
                translated = true;
                lastSubTranslated = data.translatedText;
                console.log('Traduction : ', lastSubTranslated);
                callback(lastSubTranslated,subtitles);
                return;
            }).catch(error => {
                console.error(error);
              });
        }).catch((error)=>{
            //pas besoin de rappeler le callback, aucun element sera afficher dans ce cas
            console.log(error);
        })
            

    }
    callback(lastSubTranslated,subtitles);
}