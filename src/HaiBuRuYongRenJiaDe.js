/* 还不如用人家的 */

// function show_not_in_list() {
//     let notInList = document.getElementsByClassName("notinlist");
//
//     let res = [];
//     for (let i = 0; i < notInList.length; i++) {
//         res[i] = notInList[i].innerHTML;
//     }
//     res = Array.from(new Set(res)).sort();
//     for (let item of res) {
//         console.log(item);
//     }
//
//
//     let res_format = '';
//     for (let i = 0; i < res.length; i++) {
//         res_format += res[i] + "\t\t\t\t";
//         if (i % 4 === 3) {
//             res_format += "\n";
//         }
//     }
//     copy(res_format);
// }
//

function showNotInList() {
    let notInList = document.getElementsByClassName("notinlist");

    let res = [];
    for (let i = 0; i < notInList.length; i++) {
        res[i] = notInList[i].innerHTML;
    }
    res = Array.from(new Set(res)).sort();
    copy(res.join("\n"));
}