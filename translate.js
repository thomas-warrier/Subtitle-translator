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