
// function generateLangOption(){
//     for ((key, value) in extensionLanguage.langs) {
//         `<option value="${key}">${value}</option>`
//     }
// }

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

const langFr = {
    //popUpSettings
    "settings": {
        "parameter": "Paramètres",
        "source": "Langage source",
        "target": "Langage cible",
        "shortcut": "Raccourci clavier",
        "extensionLang": "Langue de l'extension"
    },

    //Error PopUp
    "error": {
        "noSubTitle": "Aucun Sous-Titres",
        "noSubMessage": "Aucun sous-titre disponible pour le moment, veuiller attendre le premier sous-titre"
    },


    //languages
    "langs": {
        "detect": "Détecter la langue ",
        "FR": "Français",
        "EN": "Anglais",
        "ES": "Espagnol",

        "AF": "Afrikaans",
        "SQ": "Albanais",
        "AR": "Arabe",
        "AR": "Arabic",
        "HY": "Arménien",
        "AZ": "Azerbaïdjanais",
        "EU": "Basque",
        "BE": "Biélorusse",
        "BG": "Bulgare",
        "CA": "Catalan",
        "ZH-CN": "Chinois (simplifié)",
        "ZH-TW": "Chinois (traditionnel)",
        "HR": "Croate",
        "CS": "Tchèque",
        "DA": "Danois",
        "NL": "Néerlandais",
        "EN": "Anglais",
        "ET": "Estonien",
        "FI": "Finnois",
        "FR": "Français",
        "GL": "Galicien",
        "KA": "Géorgien",
        "DE": "Allemand",
        "EL": "Grec",
        "HT": "Créole haïtien",
        "IW": "Hébreu",
        "HI": "Hindi",
        "HU": "Hongrois",
        "IS": "Islandais",
        "ID": "Indonésien",
        "GA": "Irlandais",
        "IT": "Italien",
        "JA": "Japonais",
        "KO": "Coréen",
        "LV": "Letton",
        "LT": "Lituanien",
        "MK": "Macédonien",
        "MS": "Malais",
        "MT": "Maltais",
        "NO": "Norvégien",
        "FA": "Persan",
        "PL": "Polonais",
        "PT": "Portugais",
        "RO": "Roumain",
        "RU": "Russe",
        "SR": "Serbe",
        "SK": "Slovaque",
        "SL": "Slovène",
        "ES": "Espagnol",
        "SV": "Suédois",
        "TH": "Thaï",
        "TR": "Turc",
        "UK": "Ukrainien",
        "UR": "Ourdou",
        "VI": "Vietnamien",
        "CY": "Gallois",
        "YI": "Yiddish"
    }

}

const langEn = {
    //Settings PopUp
    "settings": {
        "parameter": "Parameters",
        "source": "Source language",
        "target": "Target language",
        "shortcut": "Key shortcut",
        "extensionLang": "Extension language"
    },

    //Error PopUp
    "error": {
        "noSubTitle": "No subtitles available",
        "noSubMessage": "No subtitles available for now, please wait for the first subtitles"
    },

    //languages
    "langs": {
        "detect": "Detect language",
        "FR": "French",
        "EN": "English",
        "ES": "Spanish",

        "AF": "Afrikaans",
        "SQ": "Albanian",
        "AR": "Arabic",
        "HY": "Armenian",
        "AZ": "Azerbaijani",
        "EU": "Basque",
        "BE": "Belarusian",
        "BG": "Bulgarian",
        "CA": "Catalan",
        "ZH-CN": "Chinese (Simplified)",
        "ZH-TW": "Chinese (Traditional)",
        "HR": "Croatian",
        "CS": "Czech",
        "DA": "Danish",
        "NL": "Dutch",
        "EN": "English",
        "ET": "Estonian",
        "FI": "Finnish",
        "FR": "French",
        "GL": "Galician",
        "KA": "Georgian",
        "DE": "German",
        "EL": "Greek",
        "HT": "Haitian Creole",
        "IW": "Hebrew",
        "HI": "Hindi",
        "HU": "Hungarian",
        "IS": "Icelandic",
        "ID": "Indonesian",
        "GA": "Irish",
        "IT": "Italian",
        "JA": "Japanese",
        "KO": "Korean",
        "LV": "Latvian",
        "LT": "Lithuanian",
        "MK": "Macedonian",
        "MS": "Malay",
        "MT": "Maltese",
        "NO": "Norwegian",
        "FA": "Persian",
        "PL": "Polish",
        "PT": "Portuguese",
        "RO": "Romanian",
        "RU": "Russian",
        "SR": "Serbian",
        "SK": "Slovak",
        "SL": "Slovenian",
        "ES": "Spanish",
        "SV": "Swedish",
        "TH": "Thai",
        "TR": "Turkish",
        "UK": "Ukrainian",
        "UR": "Urdu",
        "VI": "Vietnamese",
        "CY": "Welsh",
        "YI": "Yiddish"
    }
}