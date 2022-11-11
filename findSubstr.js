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
    if(substr === "") return [];
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
    return matches;
};

String.prototype.findSubstrUsingHash = function (substr, way) {
// "ways" arg watch in "ФУНДАМЕНТАЛЬНЫЕ ЗАДАЧИ ИНФОРМАТИКИ. СКРИПТЫ" by СОЛОДУШКИН Святослав Игоревич (page 36).
    if(substr === "") return null;
    substr = String(substr);
    let matches = [];
    let substrHash = 0;
    switch (way) {
        case 'sum': {// count first fragment hash and then next, using previous.
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
            return matches;
        }
        case 'sqr_sum': {
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
            return matches;
        }
        case 'rabin-karp': { // rabin-karp
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
            return matches;
        }
    }
    try
    {
        throw new TypeError("Can't find way for searching");
    }
    catch (e)
    {
        console.log(e.message);
        return null;
    }
}

function cool_func(str, substr) {
    let listIdx = []
    let lastIndex = -1
    while ((lastIndex = str.indexOf(substr, lastIndex + 1)) !== -1) {
        listIdx.push(lastIndex)
    }
    return listIdx
} // for tests
console.log("------------------------------TEST 1------------------------------");
console.log("Test 1. Ищем строку 'князь Андрей' в романе Л.Н.Толстого 'Война и мир', используя алгоритм поиска brute force.");

let fs = require('fs');
let str = '';

str += fs.readFileSync("./testFiles/war and peace(1 tome).txt").toString();
console.time("1 том");
console.log("Количество вхождений 'князь Андрей': ", str.findSubstrUsingBruteForce("князь Андрей").length);
console.timeEnd("1 том");

str += fs.readFileSync("./testFiles/war and peace(2 tome).txt").toString();
console.time("2 тома");
console.log("Количество вхождений 'князь Андрей': ", str.findSubstrUsingBruteForce("князь Андрей").length);
console.timeEnd("2 тома");

str += fs.readFileSync("./testFiles/war and peace(3 tome).txt").toString();
console.time("3 тома");
console.log("Количество вхождений 'князь Андрей': ", str.findSubstrUsingBruteForce("князь Андрей").length);
console.timeEnd("3 тома");

str += fs.readFileSync("./testFiles/war and peace(4 tome).txt").toString();
console.time("4 тома");
console.log("Количество вхождений 'князь Андрей': ", str.findSubstrUsingBruteForce("князь Андрей").length);
console.timeEnd("4 тома");

console.log("------------------------------TEST 2------------------------------");
console.log("Test 2. Во всем тексте романа ищем строки 'князь','князь Андрей','Князь Андрей Болконский'. ");

console.time("князь");
console.log("Количество вхождений 'князь': ", str.findSubstrUsingBruteForce("князь").length);
console.timeEnd("князь");

console.time("князь Андрей");
console.log("Количество вхождений 'князь Андрей': ", str.findSubstrUsingBruteForce("князь Андрей").length);
console.timeEnd("князь Андрей");

console.time("князь Андрей Болконский");
console.log("Количество вхождений 'князь Андрей Болконский': ", str.findSubstrUsingBruteForce("князь Андрей Болконский").length);
console.timeEnd("князь Андрей Болконский");
console.log("------------------------------TEST 3------------------------------");

console.log("В файле с миллионом 'a' ищем строку 'a{100}b' и 'ba{100}'");
str = fs.readFileSync("./testFiles/1000000a.txt").toString();
let substr = "a".repeat(100) + "b";
console.log("1) 'a{100}b'");
console.time("brute force");
console.log("Количество вхождений: ", str.findSubstrUsingBruteForce(substr).length);
console.timeEnd("brute force");

console.time("hash sum");
console.log("Количество вхождений: ", str.findSubstrUsingHash(substr, 'sum').length);
console.timeEnd("hash sum");

console.time("sqr hash sum");
console.log("Количество вхождений: ", str.findSubstrUsingHash(substr, 'sqr_sum').length);
console.timeEnd("sqr hash sum");

console.time("rabin-karp");
console.log("Количество вхождений: ", str.findSubstrUsingHash(substr, 'rabin-karp').length);
console.timeEnd("rabin-karp");


console.log("2) 'ba{100}'");
substr = "b" + "a".repeat(100);
console.time("brute force");
console.log("Количество вхождений: ", str.findSubstrUsingBruteForce(substr).length);
console.timeEnd("brute force");

console.time("hash sum");
console.log("Количество вхождений: ", str.findSubstrUsingHash(substr, 'sum').length);
console.timeEnd("hash sum");

console.time("sqr hash sum");
console.log("Количество вхождений: ", str.findSubstrUsingHash(substr, 'sqr_sum').length);
console.timeEnd("sqr hash sum");

console.time("rabin-karp");
console.log("Количество вхождений: ", str.findSubstrUsingHash(substr, 'rabin-karp').length);
console.timeEnd("rabin-karp");

console.log("-------------------------------END--------------------------------");
