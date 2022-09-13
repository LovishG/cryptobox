let str = "Default String";
let key = 2;
let arr;
let encryptedStr;
let spaceIndex = [];
let unencryptedStr = "default";
let deStr = "";
let indexOfUndefined = [];
let encryptedStringWithoutUndefined;
let arr2dRowCount;
let encrypted = false;
document.querySelector(".encrypt-button").addEventListener("click", function () {
    str = document.querySelector(".en-text").value;
    key = document.querySelector(".key").value;
    if (str !== "") {
        arr = str.split("");
        for (let index = 0; index < arr.length; index++) {
            if (arr[index] === " ") {
                spaceIndex.push(index);
            }
        }
        let strNoSpace = str.split(" ").join("");
        let strNoSpaceArr = strNoSpace.split("");
        let arr2D = sliceIntoChunks(strNoSpaceArr, key);
        arr2dRowCount = arr2D.length;
        encryptedStr = encryption(arr2D);
        encryptedStringWithoutUndefined = encryptedStr.split("undefined").join("");
        let dispaly = document.querySelector("p");
        dispaly.innerText = encryptedStringWithoutUndefined;
        dispaly.style.display = "flex";
        encrypted = true;
    }
});
document.querySelector(".decrypt-button").addEventListener("click", function () {
    if (encrypted === true) {
        let enStrArr = encryptedStr.split("undefined");
        for (let i = 0; i < enStrArr.length; i++) {
            enStrArr[i] += "~";
        }
        enStrArr = enStrArr.join("").split("");
        let enArr2D = sliceIntoChunks(enStrArr, arr2dRowCount);
        deStr = decryption(enArr2D);
        let deStrArr = [];
        deStrArr = deStr.split("");
        for (let i = 0; i < spaceIndex.length; i++) {
            let idx = spaceIndex[i];
            deStrArr.splice(idx, 0, " ");
        }
        spaceIndex = [];
        unencryptedStr = deStrArr.join("");
        let dispaly = document.querySelector("p");
        dispaly.innerText = unencryptedStr;
        dispaly.style.display = "flex";
        encrypted = false;
        document.querySelector("form").reset();
    }
});
function sliceIntoChunks(arr, chunkSize) {
    chunkSize = parseInt(chunkSize);
    let res = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);
        res.push(chunk);
    }
    return res;
}
function encryption(arr) {
    let encryptedStr = "";
    for (let r = 0; r < key; r++) {
        for (let c = 0; c < arr.length; c++) {
            encryptedStr = encryptedStr + arr[c][r];
        }
    }
    return encryptedStr;
}
function decryption(arr) {
    let str = "";
    for (let r = 0; r < arr2dRowCount; r++) {
        for (let c = 0; c < key; c++) {
            if (arr[c][r] == "~" || arr[c][r] == undefined)
                continue;
            str = str + arr[c][r];
        }
    }
    return str;
}
