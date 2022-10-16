// one database
// CREATE TABLE data (
//   id SERIAL PRIMARY KEY NOT NULL,
//   name VARCHAR(255) NOT NULL,
//   category VARCHAR(255) NOT NULL,
// );

// JSON file parsed to object => spit out one word at a time
// HTML  4 buttons, 4 key listeners, words and an array
// Label the word
// Add it to a seeds file

// import * as fs from 'fs';

// const fs = require('fs');
// const readline = require('readline');
// const d3 = require('d3-dsv');
// import * as d3 from "d3-dsv";
import * as d3 from "d3";
// tconst	titleType	primaryTitle	originalTitle	isAdult	startYear	endYear	runtimeMinutes	genres
d3.tsvParse("./scripts/data.tsv", function(d) {
  return {
    // tconst: new Date(+d.Year, 0, 1), // convert "Year" column to Date
    primaryTitle: d.primaryTitle,
    // primaryTitle: d.Model,
    // originalTitle: +d.Length // convert "Length" column to number
  };
}, function(error, rows) {
  console.log(rows);
});

// const rl = readline.createInterface({
//     input: fs.createReadStream('./scripts/data.tsv'),
//     crlfDelay: Infinity
// });



// rl.on('line', (line) => {
//     // fs.appendFileSync("./scripts/rawData.txt", line);

//     let tsvArr = line.replace('\N', 0).split(' ');
//     tsvArr.shift();
//     tsvArr.shift();
//     // tsvArr.pop();
//     // tsvArr.pop();
//     // tsvArr.pop();
//     // tsvArr.pop();
//     // tsvArr.pop();
//     // let arrString = tsvArr.join(' ').split('  ');
//     fs.appendFileSync("./scripts/rawData.txt", tsvArr.join(' ') + '.');
// });

// tt0164175	tvMovie	Sonntag	Sonntag	0	1985	\N	104	Crime

// console.log('hello');
// fs.readFileSync('./scripts/data.tsv', function(err, data) {
//   if (err) throw err;
//   console.log('hello');
//   parse_tsv(data, (row) => {
//     let tsvArr = row.split(' ');
//     let arrString = tsvArr.shift().shift().join(' ').split('  ');
//     var stream = fs.createWriteStream("./scripts/rawData.txt");
//     stream.once('open', function(fd) {
//       stream.write(arrString);
//       stream.end();
//     });

//   });
// });

// parse_tsv(tsvstring, function (row) { do something with row })
// function parse_tsv(s, f) {
//   var ix_end = 0;
//   for (var ix=0; ix<s.length; ix=ix_end+1) {
//     ix_end = s.indexOf('\n', ix);
//     if (ix_end == -1) {
//       ix_end = s.length;
//     }
//     var row = s.substring(ix, ix_end-1).split('\t');
//     f(row);
//   }
// }
