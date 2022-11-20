/**
 * Wait for an element of the page (wich will be selected by a querySelector(selector)).
 * 
 * In case the query selector return nothing, an observer will be apply to all the body of the page to wait for the element.
 * @param {string} selector is the selector of the element we want to wait
 * @returns a promise that will be resolved if the querySelector of the argument selector return something
 */
function waitForElm(selector) {
    return new Promise(resolve => { //a new promise that will be resolved if the query selector return something
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        //in the case we didnt return something
        const observer = new MutationObserver(mutations => { //A mutationObserver is connected to the selector
            if (document.querySelector(selector)) {//when the query selector finally return something
                resolve(document.querySelector(selector)); 
                observer.disconnect(); 
            }
        });
        //range action of the observer
        observer.observe(document.body, { // observer will check in all of the body of the page
            childList: true,
            subtree: true
        });
    });
}