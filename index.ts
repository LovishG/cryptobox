// @ts-nocheck

let str = "hi all I am";
let key = 2;
let arr = str.split("");
let encryptedStr;
let spaceIndex = [];
let unencryptedStr = "default";
let deStr = "";
let indexOfUndefined = [];
let encryptedStr_Without_undefined;
let arr2dRowCount;
let encrypted = 0;

//getting user values on clicking encrypt button
document.querySelector(".en").addEventListener("click", function () {
  str = document.querySelector(".en-text").value;
  // console.log(str);
  key = document.querySelector(".key").value;
  // console.log(key);

  if (str !== "") {
    //spliting string to array of individual characters
    arr = str.split("");

    // getting indexes of spaces in array before encrypting string
    for (let index = 0; index < arr.length; index++) {
      if (arr[index] === " ") {
        spaceIndex.push(index);
      }
    }

    // string without spaces
    let strNoSpace = str.split(" ").join("");

    // converting string without space to 1d array of individual characters
    let strNoSpaceArr = strNoSpace.split("");

    // converting 1d array of individual characters to 2d Array
    let arr2D = sliceIntoChunks(strNoSpaceArr, key);
    arr2dRowCount = arr2D.length;
    console.log("row count is >>>>", arr2dRowCount);
    //getting the encrypted String on passing 2d Arr to function encryption
    encryptedStr = encryption(arr2D);

    //splitting encrypted string for undefined
    encryptedStr_Without_undefined = encryptedStr.split("undefined").join("");

    console.log(arr, spaceIndex, strNoSpace, strNoSpaceArr);
    console.log(arr2D);
    console.log(encryptedStr);
    console.log(encryptedStr_Without_undefined);

    //display encrypted text
    let dispaly = document.querySelector("p");
    dispaly.innerText = encryptedStr_Without_undefined;
    dispaly.style.display = "flex";

    encrypted = 1;
  }
});

// starting decryption when decrypt button is clicked
document.querySelector(".de").addEventListener("click", function () {
  if (encrypted === 1) {
    //spliting the encrypted str to 1D array
    let enStrArr = encryptedStr.split("undefined");
    for (let i = 0; i < enStrArr.length; i++) {
      enStrArr[i] += "~";
    }
    enStrArr = enStrArr.join("").split("");
    // converting 1d arr to 2D array
    let enArr2D = sliceIntoChunks(enStrArr, arr2dRowCount);
    console.log(enArr2D);
    //decrypting the string
    deStr = decryption(enArr2D);
    console.log(deStr);

    // spltiing decrypted string to 1d array of individual characters
    let deStrArr : any = [];
    deStrArr = deStr.split("");
    console.log(deStrArr);
    // adding spaces
    for (let i = 0; i < spaceIndex.length; i++) {
      let idx = spaceIndex[i];
      deStrArr.splice(idx, 0, " ");
    }

    spaceIndex = [];
    unencryptedStr = deStrArr.join("");
    console.log(unencryptedStr);

    let dispaly = document.querySelector("p");
    dispaly.innerText = unencryptedStr;
    dispaly.style.display = "flex";

    encrypted = 0;

    //clear form
    document.querySelector("form") .reset();
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
      if (arr[c][r] == "~" || arr[c][r] == undefined) continue;

      str = str + arr[c][r];
    }
  }
  return str;
}

