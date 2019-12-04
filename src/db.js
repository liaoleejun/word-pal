const DB_NAME = "WordPal";
const DB_VERSION = 1;
const STORE_NAME = "wordlist";

function setup() {
    let reqOpenDB = window.indexedDB.open(DB_NAME, DB_VERSION);

    reqOpenDB.onsuccess = function (e) {
        let db = e.target.result;
        // db.onerror = function(e) {
        //     alert("Sorry, an unforseen error was thrown.");
        //     console.log("***ERROR***");
        //     console.dir(e.target);
        // };
        let store = db.transaction([STORE_NAME], "readwrite").objectStore(STORE_NAME);
        for (let i = 0; i < wordlist.length; i++) {
            store.add(wordlist[i]);
        }
    };

    reqOpenDB.onerror = function () {
        console.log("Error occurred: " + reqOpenDB.error);
    };

    reqOpenDB.onupgradeneeded = function (e) {
        let db = e.target.result;
        db.createObjectStore(STORE_NAME, {keyPath: 'word'});
    };
}

setup();
