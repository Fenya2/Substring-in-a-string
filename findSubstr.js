function getListIdx(str, substr) {
    let listIdx = []
    let lastIndex = -1
    while ((lastIndex = str.indexOf(substr, lastIndex + 1)) !== -1) {
        listIdx.push(lastIndex)
    }
    return listIdx
} // for tests

String.prototype.getHash = function (mode) {
    let hashSum = 0;
    switch (mode) {
        case "sum":
            for(let i = 0; i < this.length; i++) {
                hashSum += this.charCodeAt(i);
            }
            return hashSum;
        case "sqrSum":
            for(let i = 0; i < this.length; i++) {
                hashSum += this.charCodeAt(i)**2;
            }
            return  hashSum;
        case "Rabin–Karp algorithm":

            break;
    }
    return hashSum;
}

String.prototype.findSubstrUsingBruteForce = function (substr) {
    if(substr === "") return null;
    substr = String(substr);
    let matches = [];

    for(let i = 0; i < this.length-substr.length+1; i++) {
        if(this[i] === substr[0]) {
            let match = true;
            for(let j = 1; j < substr.length; j++) {
                if(this[i+j] !== substr[j]) {
                    match = false;
                    break;
                }
            }
            if(match) matches.push(i);
        }
    }
    if(matches.length > 0) return matches;
    else return null;
};

String.prototype.findSubstrUsingHash = function (substr, way) {
// "ways" arg watch in "ФУНДАМЕНТАЛЬНЫЕ ЗАДАЧИ ИНФОРМАТИКИ. СКРИПТЫ" by СОЛОДУШКИН Святослав Игоревич (page 36).
    if(substr === "") return null;
    substr = String(substr);
    let matches = [];
    let substrHash = 0;
    switch (way) {
        case 1: { // recount hash for each fragment of this.
            substrHash = substr.getHash("sum")
            for (let i = 0; i < this.length - substr.length + 1; i++) {
                let fragmentHash = 0;
                for (let j = 0; j < substr.length; j++)
                    fragmentHash += this.charCodeAt(i + j);
                if (fragmentHash === substrHash) {
                    let match = true;
                    for (let j = 0; j < substr.length; j++) {
                        if (this[i + j] !== substr[j]) {
                            match = false;
                            break;
                        }
                    }
                    if (match) matches.push(i);
                }
            }
            if (matches.length > 0) return matches;
            else return null;
        }
        case 2: {// count first fragment hash and then next, using previous.
            substrHash = substr.getHash("sum")
            let fragmentHash = 0;
            for (let i = 0; i < substr.length; i++)
                fragmentHash += this.charCodeAt(i);
            if (fragmentHash === substrHash) { // first entrance check individually.
                let match = true;
                for (let i = 0; i < substr.length; i++) {
                    if (this[i] !== substr[i]) {
                        match = false;
                        break;
                    }
                }
                if (match) matches.push(0);
            }
            for (let i = 1; i < this.length - substr.length + 1; i++) {
                fragmentHash += this.charCodeAt(i + substr.length - 1) - this.charCodeAt(i - 1);
                if (fragmentHash === substrHash) {
                    let match = true;
                    for (let j = 0; j < substr.length; j++) {
                        if (this[i + j] !== substr[j]) {
                            match = false;
                            break;
                        }
                    }
                    if (match) matches.push(i);
                }
            }
            if (matches.length > 0) return matches;
            else return null;
        }
        case 3: {
            substrHash = substr.getHash("sqrSum");
            let fragmentHash = 0;
            for (let i = 0; i < substr.length; i++)
                fragmentHash += this.charCodeAt(i)**2; // edition
            if (fragmentHash === substrHash) { // first entrance check individually.
                let match = true;
                for (let i = 0; i < substr.length; i++) {
                    if (this[i] !== substr[i]) {
                        match = false;
                        break;
                    }
                }
                if (match) matches.push(0);
            }
            for (let i = 1; i < this.length - substr.length + 1; i++) {
                fragmentHash += this.charCodeAt(i + substr.length - 1)**2 - this.charCodeAt(i - 1)**2; // edition
                if (fragmentHash === substrHash) {
                    let match = true;
                    for (let j = 0; j < substr.length; j++) {
                        if (this[i + j] !== substr[j]) {
                            match = false;
                            break;
                        }
                    }
                    if (match) matches.push(i);
                }
            }
            if (matches.length > 0) return matches;
            else return null;
        }
    }
    return null;
}


let str;
fs = require('fs');
//str = fs.readFileSync("./testFiles/1000000a.txt").toString();

let substr = "";
substr = substr.repeat(100) + "b";
// console.log(substr);
str += fs.readFileSync("./testFiles/war and peace(1 tome).txt").toString();
 str += fs.readFileSync("./testFiles/war and peace(2 tome).txt").toString();
 str += fs.readFileSync("./testFiles/war and peace(3 tome).txt").toString();
 str += fs.readFileSync("./testFiles/war and peace(4 tome).txt").toString();

// console.time("Андрей");
// console.log(str.findSubstrUsingBruteForce("фортификация которых производилась"));
// console.timeEnd("Андрей");
//
// console.time("князь Андрей");
// console.log(str.findSubstrUsingBruteForce(" которых производилась"));
// console.timeEnd("князь Андрей");
//
// console.time("князь Андрей Болконский");
// console.log(str.findSubstrUsingBruteForce("князь Андрей Болконский").length);
// console.timeEnd("князь Андрей Болконский");

console.time("bf");
console.log(str.findSubstrUsingBruteForce(substr));
console.timeEnd("bf");

console.time("hash");
console.log(str.findSubstrUsingHash(substr, 2));
console.timeEnd("hash");