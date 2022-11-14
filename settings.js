function setExtensionLanguage(newLanguage){
    if (newLanguage == null) { newLanguage = navigator.language }
    console.log(extensionLanguage);
    //TODO put this function with switch case maybe in antoher file
    switch (newLanguage) {
        case "fr":
        case "fr-FR":
            extensionLanguage = langFr;
            break;
    
        case "en-GB":
        case "en":
            extensionLanguage = langEn;
            break;
        default:
            //TODO put En in default
            extensionLanguage = langEn;
            break;
    }
    console.log(extensionLanguage);
}