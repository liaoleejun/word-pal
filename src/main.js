// 百度统计
// Google Analytics

document.getElementById("start").addEventListener("click", function(){
    let result = document.getElementById("result");
    if (result) {
        result.parentNode.removeChild(result);
    }
    result = document.createElement("div");
    result.id = "result";

    /*
     * text ---换行\n--->
     *    若为换行符, 则原样输出, 否则进行进一步判断
     * line ---空白符\s--->
     *    若为空白符, 则原样输出, 否则进行进一步判断
     * word ---全字母a-zA-Z--->
     *    若false-word则原样输出
     *    若true-word且匹配则原样输出
     *    若true-word且未匹配到, 则加span输出
     */
    let text = document.getElementById("input").value;
    if (!text.trim()) {return;}
    let lines = text.match(/([\n]+)|([^\n]+)/g);
    let unmatched = {};
    for (let line of lines) {
        if (line.match(/\n/i)) {
            for (let i = 0; i < line.match(/\n/g).length; i++) {
                let elem = document.createElement("br");
                result.appendChild(elem);
            }
            continue;
        }

        let words = line.trim().match(/([\s]+)|([^\s]+)/g);
        for (let word of words) {
            if (word.match(/[\s]/i)) {
                let text = document.createTextNode(word);
                result.appendChild(text);
                continue;
            }

            word = word.match(/([a-zA-Z]+)|([^a-zA-Z]+)/g);
            for (let x of word) {
                /*
                 * 匹配
                 * x.length > 2是为了去除字母长度为1或2, 因为去除a, an
                 */
                if (x.match(/[a-z]/i) && x.length > 2) {
                    // TODO 1. data.js完全小写化 2. wordList[x.toLowerCase()]
                    if (matchWordList(x)) {
                        let t = document.createTextNode(x);
                        result.appendChild(t);
                    } else {
                        let span = document.createElement("span");
                        span.innerText = x;
                        result.appendChild(span);
                        if (unmatched.hasOwnProperty(x)) {
                            unmatched[x] = unmatched[x] + 1;
                        } else {
                            unmatched[x] = 1;
                        }
                    }
                } else {
                    let t = document.createTextNode(x);
                    result.appendChild(t);
                }
            }
        }
    }

    let div = document.getElementById("unmatched");
    if (div) {
        div.parentNode.removeChild(div);
    }
    div = document.createElement("div");
    div.id = "unmatched";
    div.innerHTML = Object.keys(unmatched).sort().join(", ");

    document.body.appendChild(div);
    document.body.appendChild(result);

});

// https://stackoverflow.com/questions/9618504/how-to-get-the-selected-radio-button-s-value
function getRadioValueByName(name) {
    let radios = document.getElementsByName(name);
    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return(radios[i].value);
        }
    }
}

function matchWordList(x) {
    // 找到radio所指定的单词列表等级 ["3000", "5000", "a1", "a2", "b1", "b2", "c1"]
    let level = getRadioValueByName("std_level").split("_")[1];
    let arr = [];
    if (level === "3000") {
        arr = [a1_3000, a2_3000, b1_3000, b2_3000];
    } else if (level === "5000") {
        arr = [a1_3000, a2_3000, b1_3000, b2_3000, b2_5000, c1_5000];
    } else if (level === "a1") {
        arr = [a1_3000];
    } else if (level === "a2") {
        arr = [a1_3000, a2_3000];
    } else if (level === "b1") {
        arr = [a1_3000, a2_3000, b1_3000];
    } else if (level === "b2") {
        arr = [a1_3000, a2_3000, b1_3000, b2_3000, b2_5000];
    } else {
        arr = [a1_3000, a2_3000, b1_3000, b2_3000, b2_5000, c1_5000];
    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].hasOwnProperty(x.toLowerCase())) {
            return true
        }
    }

    return false;
}
