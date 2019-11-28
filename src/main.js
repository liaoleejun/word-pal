// 百度统计
// Google Analytics

document.getElementById("start").addEventListener("click", function(){
    /*
     * Get word list of the specified level
     * 找到radio所指定的登记的字典
     */
    let std_level = getRadioValueByName("std_level");
    let std = std_level.split("_")[0];
    let level = std_level.split("_")[1];
    let wordList = {};
    for (let i = 0; i < data.length; i++) {
        if (data[i][std] === level) {
            wordList[data[i].word] = true;
        }
    }

    let result = document.createElement("div");
    result.id = "result";
    document.body.appendChild(result);

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
                 */
                if (x.match(/[a-z]/i)) {
                    // TODO 1. data.js完全小写化 2. wordList[x.toLowerCase()]
                    // TODO 去除字母长度为1或2, 因为去除a, an
                    if (wordList[x]) {
                        let t = document.createTextNode(x);
                        result.appendChild(t);
                    } else {
                        let span = document.createElement("span");
                        span.innerText = x;
                        result.appendChild(span);
                    }
                } else {
                    let t = document.createTextNode(x);
                    result.appendChild(t);
                }
            }
        }
    }
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
