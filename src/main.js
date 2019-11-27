// 百度统计
// Google Analytics

document.getElementById("start").addEventListener("click", function(){
    let level = getRadioValueByName("level");
    let wordList = {};
    for (let i = 0; i < data.length; i++) {
        wordList[data[i].word] = null;
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
