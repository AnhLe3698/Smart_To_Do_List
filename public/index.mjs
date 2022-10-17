// one database
// CREATE TABLE data (
//   id SERIAL PRIMARY KEY NOT NULL,
//   name VARCHAR(255) NOT NULL,
//   category VARCHAR(255) NOT NULL,
// );

import * as fs from "fs";
import * as inspect from "util";


var buffer = '';

const readstreamFromMoviesData = function () {
  var js = fs.createReadStream('../database/seeds/data.tsv');
  js.on('data', function(chunk) {
    var lines = (buffer + chunk).split(/\r?\n/g);
    buffer = lines.pop();
    let firstWordHolder = '';
    for (var i = 0; i < lines.length; ++i) {
      let line = inspect.inspect(lines[i]);
      let arrLine = line.split(/\\t/g)[3];

      if(firstWordHolder !== arrLine.split(' ')[0] && arrLine.indexOf("'") == -1 && arrLine.length < 18 && arrLine.indexOf('Episode') === - 1 && arrLine.indexOf('episode') === - 1 && arrLine.indexOf('No.') === - 1 && arrLine.indexOf('red') === - 1){
        // console.log(arrLine.replaceAll("'", "''"));
        firstWordHolder = arrLine.split(' ')[0];
        fs.appendFileSync('../database/seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${arrLine}', 'movie');\n`);
      }
    }
  });
  js.on('end', function() {
    console.log('ended on non-empty buffer: ' + inspect.inspect(buffer));
  });
}


let rs = fs.createReadStream('../database/seeds/FastFoodRestaurants.csv');
rs.on('data', function(chunk) {
  let lines = (buffer + chunk).split(/\r?\n/g);
  buffer = lines.pop();
  let obj = {};
  // let firstWordHolder = '';
  for (let i = 0; i < lines.length; ++i) {
    let line = inspect.inspect(lines[i]);
    let arrLine = line.split(',')[6];
    let newStr = arrLine.replaceAll("'", "");
    let newStr1 = arrLine.replaceAll("'", "''");
    if(!obj[newStr]) {
      obj[newStr] = newStr
      fs.appendFileSync('../database/seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr}', 'restaurant');\n`);
      if(newStr !== newStr1) {
        fs.appendFileSync('../database/seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr1}', 'restaurant');\n`);
      }
    }
  }

});

rs.on('end', function() {
  console.log('ended on non-empty buffer: ' + inspect.inspect(buffer));
});






// JSON file parsed to object => spit out one word at a time
// HTML  4 buttons, 4 key listeners, words and an array
// Label the word
// Add it to a seeds file

// import * as fs from 'fs';

// const fs = require('fs');
// const readline = require('readline');
// const d3 = require('d3-dsv');
// import * as d3 from "d3-dsv";

// import * as d3 from "d3";
// import * as inspect from "util";
// import { index } from "d3";

// tconst	titleType	primaryTitle	originalTitle	isAdult	startYear	endYear	runtimeMinutes	genres
// fs.readFile('./scripts/data.tsv', 'utf8', (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   d3.tsvParseRows(data, function(d) {
//     return {
//       // tconst: new Date(+d.Year, 0, 1), // convert "Year" column to Date
//       primaryTitle: d.primaryTitle,
//       // primaryTitle: d.Model,
//       // originalTitle: +d.Length // convert "Length" column to number
//     };
//   }, function(error, rows) {
//     console.log(rows);
//   });
// });

// var fs = require('fs');
// var inspect = require('util').inspect;
// console.log("l'usine Lumière à Lyon'".replaceAll("'", "''"));





// d3.tsvParseRows("./scripts/data.tsv", function(d) {
//   console.log(d);
//   return {
//     // tconst: new Date(+d.Year, 0, 1), // convert "Year" column to Date
//     primaryTitle: d.primaryTitle,
//     // primaryTitle: d.Model,
//     // originalTitle: +d.Length // convert "Length" column to number
//   };
// }, function(error, rows) {
//   console.log(rows);
// });

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
