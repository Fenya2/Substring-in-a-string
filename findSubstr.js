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
            for(let i = 0; i < this.length; i++) {
                hashSum += this.charCodeAt(i)*2**(this.length-i-1);
            }
            return hashSum;
    }
    return null;
}

String.prototype.findSubstrUsingBruteForce = function (substr) {
    if(substr === "") return null;
    //substr = String(substr);
    let matches = [];

    for(let i = 0; i < this.length-substr.length+1; i++) {
        let match = true;
        for(let j = 0; j < substr.length; j++) {
            if(this[i+j] !== substr[j]) {
                match = false;
                break;
            }
        }
        if (match) matches.push(i);
    }
    /*if(matches.length > 0)*/ return matches;
    //else return null;
};


function cmpChar(str,i,substr,array){
    let f = true
    let t = str.slice(i, i + substr.length)
    for (let j = 0; j < substr.length; j++) {
        if (substr[j] !== t[j]) {
            f = false
            break
        }
    }
    if (f) array.push(i)
}

String.prototype.BruteForce = function(substr) {
    if (substr==="") return null
    let indexBF = []
    for (let i = 0; i < this.length - substr.length+1; i++) {
        cmpChar(this,i,substr,indexBF)
    }
    return indexBF
}

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
        case 4: { // rabin-karp
            substrHash = substr.getHash("Rabin–Karp algorithm");
            let fragmentHash = 0;
            for (let i = 0; i < substr.length; i++)
                fragmentHash += this.charCodeAt(i)*2**(substr.length-i-1); // edition
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
                fragmentHash = (fragmentHash - this.charCodeAt(i-1)*2**(substr.length-1))*2 + this.charCodeAt(i + substr.length - 1); // edition
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


// let str = "ABCDEFG";
// let substr = "ABCDEFG";

fs = require('fs');
let str = fs.readFileSync("./testFiles/1000000a.txt").toString();
substr = "a".repeat(100);


// //WAR AND PEACE...
// fs = require('fs');
// let str = "";
// str += fs.readFileSync("./testFiles/war and peace(1 tome).txt").toString();
// str += fs.readFileSync("./testFiles/war and peace(2 tome).txt").toString();
// str += fs.readFileSync("./testFiles/war and peace(3 tome).txt").toString();
// str += fs.readFileSync("./testFiles/war and peace(4 tome).txt").toString();
// let substr = "князь Андрей"

console.time("sqr");
str.findSubstrUsingHash(substr, 3);
console.timeEnd("sqr");

console.time("sum");
str.findSubstrUsingHash(substr, 2);
console.timeEnd("sum");

console.time("sum(not rec)");
str.findSubstrUsingHash(substr, 1);
console.timeEnd("sum(not rec)");

console.time("bf");
str.findSubstrUsingBruteForce(substr);
console.timeEnd("bf");

console.time("rk");
str.findSubstrUsingHash(substr, 4);
console.timeEnd("rk");