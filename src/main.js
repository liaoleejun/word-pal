let reqOpenDB = window.indexedDB.open(DB_NAME, DB_VERSION);
let store = null;

reqOpenDB.onsuccess = function (e) {
    if (store === null) {
        store = e.target.result.transaction([STORE_NAME], "readonly").objectStore(STORE_NAME);
    }
};

// 输出 not in list
// 输出 contrast
//
// text ----> line ----> may_word ----------> word
//       \n         \s             [a-zA-Z]
//
//
document.getElementById("start").addEventListener("click", function(){
    let contrast = document.getElementById("contrast");
    if (contrast) {contrast.parentNode.removeChild(contrast);}
    contrast = document.createElement("div");
    contrast.id = "contrast";

    let text = document.getElementById("input").value;
    if(!text.trim()) {return;}

    let lines = text.match(/[\n]+|[^\n]+/g);
    for (let line of lines) {
        if (line.match(/\n/i)) {
            for (let i = 0; i < line.match(/\n/g).length; i++) {
                let br = document.createElement("br");
                contrast.appendChild(br);
            }
        } else {
            let may_words = line.match(/([\s]+)|([^\s]+)/g);
            for (let may_word of may_words) {
                if (may_word.match(/\s/i)) {
                    let textnode = document.createTextNode(may_word);
                    textnode.innerHTML = may_word;
                    contrast.appendChild(textnode);
                } else {
                    let word = may_word.match(/([a-zA-Z]+)|([^a-zA-Z]+)/g);
                    for (let true_word of word) {
                        let textnode = document.createTextNode(true_word);
                        contrast.appendChild(textnode);
                    }
                }
            }
        }
    }

    // Not in list
    // let notInList = document.getElementById("not-in-list");
    // if (notInList) {notInList.parentNode.removeChild(notInList);}
    // notInList = document.createElement("div");
    // notInList.id = "not-in-list";
    // notInList.innerHTML = Object.keys(notInList).sort().join(", ");
    // document.body.appendChild(notInList);

    // Contrast
    document.body.appendChild(contrast);

});

function getRadioValueByName(name) {
    let radios = document.getElementsByName(name);
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return(radios[i].value);
        }
    }
}

function checkWordList(x) {
    return new Promise(function (resolve) {
        // 找到radio所指定的单词列表等级 ["oxford_3000", "oxford_5000"]
        let select_level = getRadioValueByName("std_level");

        let store = db.transaction([STORE_NAME], "readonly").objectStore(STORE_NAME);
        let reqGet = store.get(x);
        reqGet.onsuccess = function (e) {
            let result = e.target.result;
            // 不存在，返回 false
            // 存在，select_level = oxford_3000 而且存在的数据的 level = oxford_5000，返回 false
            // 存在，select_level = oxford_3000 而且存在的数据的 level = oxford_3000，返回 true
            // 存在，select_level = oxford_5000，返回 true
            if (result === undefined || (select_level === "oxford_3000" && result.level === "oxford_5000" )) {
                resolve(false);
            } else {
                resolve(true);
            }
        };
        reqGet.onerror = function (e) {
            console.log(e);
        };
    });
}
