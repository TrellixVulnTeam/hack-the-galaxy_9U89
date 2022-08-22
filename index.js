const fs = require('fs');

const buffer = fs.readFileSync('common-words.txt');

const words = {
   a: [],
   b: [],
   c: [],
   d: [],
   e: [],
   f: [],
   g: [],
   h: [],
   i: [],
   j: [],
   k: [],
   l: [],
   m: [],
   n: [],
   o: [],
   p: [],
   q: [],
   r: [],
   s: [],
   t: [],
   u: [],
   v: [],
   w: [],
   x: [],
   y: [],
   z: [],
};

const goodWords = [];

const allWords = buffer.toString().split('\r\n');

allWords.forEach((word) => {
   const firstLetter = word[0];

   if (/^[a-zA-Z]+$/.test(word) && word.length > 1) {
      words[firstLetter].push(word);
      goodWords.push(word);
   }
});

const signalArray = [];

const validWords = {};

class Signal {
   constructor(name) {
      if (currentSignal === name) {
         validWords[name] = new Map();
         signalArray.push(name);
      }
   }
}

let currentSignal = 'epalwrotavey';

let signal1 = new Signal('papsfrutesutternet'); // t
let signal2 = new Signal('epalwrotavey'); // w
let signal3 = new Signal('licagamchitetraison'); //
let signal4 = new Signal('rafietamidrey'); // t
let signal5 = new Signal('holioskinnecker'); //
let signal6 = new Signal('whildorsawen'); // h
let signal7 = new Signal('lierfictengthert'); // i
let signal8 = new Signal('litbigonesareress'); //
let signal9 = new Signal('gasmarmtechet'); // r

signalArray.forEach((signal) => {
   const firstLetter1 = signal[0];

   words[firstLetter1].forEach((firstWord) => {
      let lettersLeft1 = signal;
      let lettersLeft2 = signal;

      for (let letterNum = 0; letterNum < firstWord.length; letterNum++) {
         const letter = firstWord[letterNum];

         const index = lettersLeft1.indexOf(letter);

         if (index > -1) {
            lettersLeft1 = lettersLeft1.slice(index + 1);
            lettersLeft2 = lettersLeft2.replace(letter, '');
         } else {
            return;
         }
      }

      validWords[signal].set(firstWord, []);

      goodWords.forEach((secondWord) => {
         if (secondWord === firstWord) return;

         let passedArray = [];

         let lettersLeftWord = lettersLeft2;
         let lettersLeft3 = lettersLeftWord;

         for (let letterNum = 0; letterNum < secondWord.length; letterNum++) {
            const letter = secondWord[letterNum];
            const index = lettersLeftWord.indexOf(letter);

            if (index > -1) {
               lettersLeftWord = lettersLeftWord.slice(index + 1);
               lettersLeft3 = lettersLeft3.replace(letter, '');
            } else {
               return;
            }
         }

         goodWords.forEach((thirdWord) => {
            if (thirdWord === firstWord || thirdWord === secondWord) return;

            if (firstWord.length + secondWord.length + thirdWord.length !== signal.length - 1) {
               return;
            }

            lettersLeftWord = lettersLeft3;

            for (let letterNum = 0; letterNum < thirdWord.length; letterNum++) {
               const letter = thirdWord[letterNum];

               const includes = lettersLeftWord.includes(letter);

               if (includes) {
                  lettersLeftWord = lettersLeftWord.replace(letter, '');
               } else {
                  return;
               }
            }

            validWords[signal].get(firstWord).push([secondWord, thirdWord, lettersLeftWord]);
         });
      });
   });
});

function mapToObj(map) {
   const obj = {};
   for (let [k, v] of map) obj[k] = v;
   return obj;
}

const myMap = validWords[currentSignal];

const myJson = {};
myJson.myMap = mapToObj(myMap);
let json = JSON.stringify(myJson);

json = json.replace(/:{/g, ':\n');
json = json.replace(/:/g, ':\n');
json = json.replace(/],/g, '],\n');
json = json.replace(/]],/g, '],\n');

const file = fs.createWriteStream('output.txt');

file.on('error', (err) => {
   console.log('got an error');
});

file.write(currentSignal + '\n\n\n');
file.write(json);

file.end();
