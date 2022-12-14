



async function translateText(subtitles, sourceLang, targetLang, callback) {
    if (!translated) {
        lastSubTranslated = "loading..."
        callback(lastSubTranslated);
        fetch("https://translate.argosopentech.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: subtitles,
                source: sourceLang.toLowerCase(),
                target: targetLang.toLowerCase()
            }),
            headers: { "Content-Type": "application/json" }
        }).then(res => res.json()
        ).then(data => {
            console.log(data);
            translated = true;
            lastSubTranslated = data.translatedText;
            console.log('Traduction : ', lastSubTranslated);
            callback(lastSubTranslated);
            return;

            //pas besoin de rappeler le callback, aucun element sera afficher dans ce cas
            
        })
        console.log("Error during request no response from server : ", res.responseStatus);
    }
    callback(lastSubTranslated);
}