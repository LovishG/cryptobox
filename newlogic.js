document.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();
    let inputString = "";
    let key = "";
    function getInput() {
        let userInput = document.getElementById('inputString');
        let userKey = document.getElementById('key');
        if (userInput.value !== "" || userKey.value !== "") {
            localStorage.setItem("input", userInput.value);
            localStorage.setItem("key", userKey.value);
        }
        userInput.value = "";
        userKey.value = "";
        inputString = localStorage.getItem('input');
        key = localStorage.getItem('key');
    }
    let encryptButton = document.getElementById('encrypt');
    let decryptButton = document.getElementById('decrypt');
    encryptButton.addEventListener('click', () => {
        getInput();
        if (!inputString || !key)
            return;
        let output = encryptString2(inputString, parseInt(key));
        let outputElement = document.querySelector('p');
        outputElement.style.display = 'flex';
        outputElement.innerText = output;
        localStorage.setItem("input", output);
        localStorage.setItem("key", key);
    });
    decryptButton.addEventListener('click', () => {
        getInput();
        if (!inputString || !key)
            return;
        let output = decryptString2(inputString, parseInt(key));
        let outputElement = document.getElementById('output');
        outputElement.innerHTML = output;
        localStorage.setItem("input", output);
        localStorage.setItem("key", key);
    });
    function encryptString2(input, key) {
        let spaceIndex = [];
        for (let i = 0; i < input.length; i++) {
            if (input.charAt(i) === ' ')
                spaceIndex.push(i);
        }
        let spaceInfo = spaceIndex.join("-");
        spaceInfo = btoa(spaceInfo);
        input = input.replace(/ /g, '');
        let matrix = [];
        let i = 0;
        let l = input.length;
        while (i < l) {
            let arr = [];
            for (let j = 0; j < key; j++) {
                if (i == l)
                    break;
                arr.push(input.charAt(i));
                i++;
            }
            matrix.push(arr);
        }
        let result = "";
        for (let j = 0; j < key; j++) {
            for (let i = 0; i < matrix.length; i++) {
                if (j >= matrix[i].length)
                    break;
                result += matrix[i][j];
            }
        }
        result += "|" + spaceInfo;
        return result;
    }
    function decryptString2(inputStr, key) {
        let splitIdx = inputStr.lastIndexOf('|');
        let input = inputStr.substring(0, splitIdx);
        let spaceInfo = inputStr.substring(splitIdx + 1);
        console.log(input);
        console.log(spaceInfo);
        let newkey = Math.floor(input.length / key);
        let rem = input.length % key;
        let matrix = [];
        let i = 0;
        let l = input.length;
        let x = 0;
        if (rem > 0)
            x = 1;
        while (i < l) {
            let arr = [];
            for (let j = 0; j < newkey + x; j++) {
                if (i == l)
                    break;
                arr.push(input.charAt(i));
                i++;
            }
            if (rem > 0)
                rem--;
            if (rem <= 0)
                x = 0;
            matrix.push(arr);
        }
        console.log(matrix);
        rem = input.length % key;
        x = 0;
        if (rem > 0)
            x = 1;
        let result = "";
        for (let j = 0; j < newkey + x; j++) {
            for (let i = 0; i < matrix.length; i++) {
                if (j >= matrix[i].length)
                    break;
                result += matrix[i][j];
            }
        }
        console.log(result);
        spaceInfo = atob(spaceInfo);
        let spaces = spaceInfo.split("-");
        console.log(spaces);
        let spaceIndex = [];
        spaces.forEach((val, i) => {
            spaceIndex.push(parseInt(val));
        });
        let newResult = "";
        let prevIdx = 0;
        x = 0;
        for (let i = 0; i < spaceIndex.length; i++) {
            newResult += result.substring(prevIdx, spaceIndex[i] - x);
            prevIdx = spaceIndex[i] - x;
            x++;
            newResult += " ";
        }
        newResult += result.substring(prevIdx);
        return newResult;
    }
    function encryptString(input, key) {
        let matrix = [];
        let i = 0;
        let l = input.length;
        while (i < l) {
            let arr = [];
            for (let j = 0; j < key; j++) {
                if (i == l)
                    break;
                arr.push(input.charAt(i));
                i++;
            }
            matrix.push(arr);
        }
        let result = "";
        for (let j = 0; j < key; j++) {
            for (let i = 0; i < matrix.length; i++) {
                if (j >= matrix[i].length)
                    break;
                result += matrix[i][j];
            }
        }
        return result;
    }
    function oneTimeDecrypt() {
        let result = localStorage.getItem("previousString");
        if (result == null)
            return "";
        return result;
    }
    function decryptString(input, key) {
        let newkey = Math.floor(input.length / key);
        let rem = input.length % key;
        let matrix = [];
        let i = 0;
        let l = input.length;
        let x = 0;
        if (rem > 0)
            x = 1;
        while (i < l) {
            let arr = [];
            for (let j = 0; j < newkey + x; j++) {
                if (i == l)
                    break;
                arr.push(input.charAt(i));
                i++;
            }
            if (rem > 0)
                rem--;
            if (rem <= 0)
                x = 0;
            matrix.push(arr);
        }
        rem = input.length % key;
        x = 0;
        if (rem > 0)
            x = 1;
        let result = "";
        for (let j = 0; j < newkey + x; j++) {
            for (let i = 0; i < matrix.length; i++) {
                if (j >= matrix[i].length)
                    break;
                result += matrix[i][j];
            }
        }
        return result;
    }
});
