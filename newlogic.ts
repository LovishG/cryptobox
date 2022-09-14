document.addEventListener('DOMContentLoaded', () => {
    localStorage.clear();

    let inputString: string | null = "";
    let key: string | null = "";

    function getInput(): void{
        let userInput: HTMLInputElement = <HTMLInputElement>document.getElementById('inputString');
        let userKey: HTMLInputElement = <HTMLInputElement>document.getElementById('key');

        if(userInput.value !== "" || userKey.value !== "") {
            localStorage.setItem("input", userInput.value);
            localStorage.setItem("key", userKey.value);
        }

        userInput.value = "";
        userKey.value = "";

        inputString = localStorage.getItem('input');
        key = localStorage.getItem('key');
    }

    let encryptButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById('encrypt');
    let decryptButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById('decrypt');

    encryptButton.addEventListener('click', () => {
        getInput();
        
        if(!inputString || !key)
            return;
        
        let output: string = encryptString2(inputString, parseInt(key));

        //let inputElement: HTMLSpanElement = <HTMLSpanElement> document.getElementById('input');
        let outputElement: HTMLSpanElement = <HTMLSpanElement> document.querySelector('p');
        //let resElement: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById('result');
        outputElement.style.display = 'flex';
        //inputElement.innerHTML = inputString;
        outputElement.innerText = output;
        //resElement.classList.remove('hide');

        // uncomment this to use oneTimeDecrypt()
        // localStorage.setItem("previousString", inputString);
        localStorage.setItem("input", output);
        localStorage.setItem("key", key);
    });

    decryptButton.addEventListener('click', () => {
        getInput();
        
        if(!inputString || !key)
            return;
        
        let output: string = decryptString2(inputString, parseInt(key));
        // let output: string = oneTimeDecrypt();
        // let output: string = decryptString(inputString, parseInt(key));
        
        //let inputElement: HTMLSpanElement = <HTMLSpanElement> document.getElementById('input');
        let outputElement: HTMLSpanElement = <HTMLSpanElement> document.getElementById('output');
        //let resElement: HTMLParagraphElement = <HTMLParagraphElement> document.getElementById('result');
        outputElement.style.display = 'flex';

       // inputElement.innerHTML = inputString;
        outputElement.innerHTML = output;
        // resElement.classList.remove('hide');

        localStorage.setItem("input", output);
        localStorage.setItem("key", key);
    });

    function encryptString2(input: string, key: number): string {
        // getting the space information
        let spaceIndex: number[] = [];
        for(let i: number = 0; i < input.length; i++) {
            if(input.charAt(i) === ' ') spaceIndex.push(i);
        }

        let spaceInfo = spaceIndex.join("-");
        spaceInfo = btoa(spaceInfo);

        // creating a matrix of the characters in input excluding spaces
        input = input.replace(/ /g, '');
        let matrix: string[][] = [];
        let i: number = 0;
        let l: number = input.length;

        while(i < l) {
            let arr: string[] = [];
            for(let j:number = 0; j < key; j++) {
                if(i == l) break;

                arr.push(input.charAt(i));
                i++;
            }
            matrix.push(arr);
        }

        // encrypting the matrix into result
        let result = "";
        for(let j:number = 0; j < key; j++) {
            for(let i:number = 0; i < matrix.length; i++) {
                if(j >= matrix[i].length) break;
                result += matrix[i][j];
            }
        }

        // adding space information to the result
        result += "|" + spaceInfo;

        return result;
    }

    function decryptString2(inputStr: string, key: number): string {
        // splitting the encrypted string and space information
        let splitIdx: number = inputStr.lastIndexOf('|');
        let input: string = inputStr.substring(0, splitIdx);
        let spaceInfo: string = inputStr.substring(splitIdx + 1);

        console.log(input);
        console.log(spaceInfo);

        // decrypting the encrypted string
        let newkey: number = Math.floor(input.length / key);
        let rem: number = input.length % key;

        let matrix: string[][] = [];
        let i: number = 0;
        let l: number = input.length;
        let x: number = 0;
        if(rem > 0) x = 1;

        while(i < l) {
            let arr: string[] = [];
            for(let j:number = 0; j < newkey + x; j++) {
                if(i == l) break;

                arr.push(input.charAt(i));
                i++;
            }
            if(rem > 0) rem--;
            if(rem <= 0) x = 0;

            matrix.push(arr);
        }

        console.log(matrix);

        rem = input.length % key;
        x = 0;
        if(rem > 0) x = 1;

        let result: string = "";
        for(let j:number = 0; j < newkey + x; j++) {
            for(let i:number = 0; i < matrix.length; i++) {
                if(j >= matrix[i].length) break;
                result += matrix[i][j];
            }
        }

        console.log(result);

        // adding spaces back to the decrypted string
        spaceInfo = atob(spaceInfo);
        let spaces: string[] = spaceInfo.split("-");
        console.log(spaces);
        let spaceIndex: number[] = [];
        spaces.forEach((val, i) => {
            spaceIndex.push(parseInt(val));
        });


        let newResult: string = "";
        let prevIdx: number = 0;
        x = 0;
        for(let i: number = 0; i < spaceIndex.length; i++) {
            newResult += result.substring(prevIdx, spaceIndex[i] - x);
            prevIdx = spaceIndex[i] - x;
            x++;
            newResult += " ";
        }

        newResult += result.substring(prevIdx);

        return newResult;
    }

});
//     function encryptString(input: string, key: number): string {
//         // uncomment this to use oneTimeDecrypt()
//         // input = input.replace(/ /g, '');
//         let matrix: string[][] = [];
//         let i: number = 0;
//         let l: number = input.length;

//         while(i < l) {
//             let arr: string[] = [];
//             for(let j:number = 0; j < key; j++) {
//                 if(i == l) break;

//                 arr.push(input.charAt(i));
//                 i++;
//             }
//             matrix.push(arr);
//         }

//         let result = "";
//         for(let j:number = 0; j < key; j++) {
//             for(let i:number = 0; i < matrix.length; i++) {
//                 if(j >= matrix[i].length) break;
//                 result += matrix[i][j];
//             }
//         }

//         // result = result.replace(/ /g, '&zwnj;');
//         return result;
//     }

//     function oneTimeDecrypt(): string{
//         let result: string | null = localStorage.getItem("previousString");
//         if(result == null) return "";
//         return result;
//     }

//     function decryptString(input: string, key: number): string {
//         let newkey: number = Math.floor(input.length / key);
//         let rem: number = input.length % key;

//         let matrix: string[][] = [];
//         let i: number = 0;
//         let l: number = input.length;
//         let x:number = 0;
//         if(rem > 0) x = 1;

//         while(i < l) {
//             let arr: string[] = [];
//             for(let j:number = 0; j < newkey + x; j++) {
//                 if(i == l) break;

//                 arr.push(input.charAt(i));
//                 i++;
//             }
//             if(rem > 0) rem--;
//             if(rem <= 0) x = 0;

//             matrix.push(arr);
//         }

//         rem = input.length % key;
//         x = 0;
//         if(rem > 0) x = 1;

//         let result: string = "";
//         for(let j:number = 0; j < newkey + x; j++) {
//             for(let i:number = 0; i < matrix.length; i++) {
//                 if(j >= matrix[i].length) break;
//                 result += matrix[i][j];
//             }
//         }

//         // result = result.replace(/&zwnj;/g,' ');
//         return result;
//     }