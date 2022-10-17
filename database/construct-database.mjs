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
  var js = fs.createReadStream('./seeds/archive/data.tsv');
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
        fs.appendFileSync('./seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${arrLine}', 'movie');\n`);
      }
    }
  });
  js.on('end', function() {
    console.log('ended on non-empty buffer: ' + inspect.inspect(buffer));
  });
}

// 2222222
const restaurantsInCanada = function() {
  let ts = fs.createReadStream('./seeds/archive/cleaned_full_data.csv');
  ts.on('data', function(chunk) {
    let lines = (buffer + chunk).split(/\r?\n/g);
    buffer = lines.pop();
    // let firstWordHolder = '';
    for (let i = 0; i < lines.length; ++i) {
      let line = inspect.inspect(lines[i]);
      let arrLine = line.split(',')[1];
      let newStr = arrLine.replaceAll("'", "");
      // let newStr1 = arrLine.replaceAll("'", "''");
      if(!obj[newStr] && !Number(newStr)) {
        obj[newStr] = newStr
        fs.appendFileSync('./seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr}', 'restaurant');\n`);
        // if(newStr !== newStr1) {
        //   fs.appendFileSync('./seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr1}', 'restaurant');\n`);
        // }
      }
    }

  });

  ts.on('end', function() {
    console.log('ended on non-empty buffer: ' + inspect.inspect(buffer));
    topMovies(); // 33333333
  });
}


// DRIVER
let obj = {};
let rs = fs.createReadStream('./seeds/archive/FastFoodRestaurants.csv');
rs.on('data', function(chunk) {
  let lines = (buffer + chunk).split(/\r?\n/g);
  buffer = lines.pop();
  for (let i = 0; i < lines.length; ++i) {
    let line = inspect.inspect(lines[i]);
    let arrLine = line.split(',')[6];
    let newStr = arrLine.replaceAll("'", "");
    // let newStr1 = arrLine.replaceAll("'", "''");
    if(!obj[newStr] && !Number(newStr)) {
      obj[newStr] = newStr
      fs.appendFileSync('./seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr}', 'restaurant');\n`);
      // if(newStr !== newStr1) {
      //   fs.appendFileSync('./seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr1}', 'restaurant');\n`);
      // }
    }
  }
});

rs.on('end', function() {
  console.log('ended on non-empty buffer: ' + inspect.inspect(buffer));
  restaurantsInCanada(); // 2222222
});

// 33333333
const topMovies = function() {
  let ts = fs.createReadStream('./seeds/archive/movies.csv');
  ts.on('data', function(chunk) {
    let lines = (buffer + chunk).split(/\r?\n/g);
    buffer = lines.pop();
    // let firstWordHolder = '';
    for (let i = 0; i < lines.length; ++i) {
      let line = inspect.inspect(lines[i]);
      let arrLine = line.split(',')[2];
      let newStr = arrLine.replaceAll("'", "");
      // let newStr1 = arrLine.replaceAll("'", "''");
      if(!obj[newStr] && !Number(newStr)) {
        obj[newStr] = newStr
        fs.appendFileSync('./seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr}', 'movie');\n`);
        // if(newStr !== newStr1) {
        //   fs.appendFileSync('./seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr1}', 'movie');\n`);
        // }
      }
    }

  });

  ts.on('end', function() {
    console.log('ended on non-empty buffer: ' + inspect.inspect(buffer));
    topShows(); // 44444444
  });
}

// 44444444
const topShows = function() {
  let ts = fs.createReadStream('./seeds/archive/topShows.csv');
  ts.on('data', function(chunk) {
    let lines = (buffer + chunk).split(/\r?\n/g);
    buffer = lines.pop();
    // let firstWordHolder = '';
    for (let i = 0; i < lines.length; ++i) {
      let line = inspect.inspect(lines[i]);
      let arrLine = line.split(',')[2];
      let newStr = arrLine.replaceAll("'", "");
      // let newStr1 = arrLine.replaceAll("'", "''");
      if(!obj[newStr] && !Number(newStr)) {
        obj[newStr] = newStr
        fs.appendFileSync('./seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr}', 'movie');\n`);
        // if(newStr !== newStr1) {
        //   fs.appendFileSync('./seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr1}', 'movie');\n`);
        // }
      }
    }

  });

  ts.on('end', function() {
    console.log('ended on non-empty buffer: ' + inspect.inspect(buffer));
    yelp(); // 5555555
  });
};



// 5555555
const yelp = function() {
  let keywords = 'Center Electronics Aesthetics Hotel Parlour Carpet Boutique Therapy Hall Grooming Video Tires Toys BIKE Medicine Chiropractic Control Tech Weight Salon Cycle Camera Interior Plumbing Heating Print Solutions Yoga Entertainment Stylists Office Law Clean Vacuum Rehab Gym Vapours Fitness Estate jeep Shop honda Chrysler Golf Concrete General Trip Store Specialty Care Therapeutic Specialists Spa Repair Furniture Insurance Credit College Gifts Door Audio Wedding Custom Supplements Learning Chores Animal Worldwide Hospital Tanning Fencing Tattoo Fit4Less Suites Cosmetics Pool Shoes Cosmetology Truck LLC Clinic Broadway Vape Florist Theatre Club Sports Media Unlimited Towing Levi Drugs TLC Dental Rental Sale FADES TV Realty Electric Computer Retail Property Communication mechanic BIO Propert Recover Healing toyota Wireless Import Flooring Shoe Library Jiu-Jitsu sport Music Learn Film Pet Works Water fashion window Outfit Locks Counsel Rink Wellness Photo Lodge Ballroom Photo Uber Saint Supply Ophthalmologists Cardio Optics allery Clini Academy Arcade Inn Hat Chevrolet Paint Handy Smith Lifestyle aam Community Neuro Construction Taxi Muscle Depo Cannabis Dodge Landscaping Laundry Radio TSA Stairs Medical Collage Jewelry Loan Esthetics Book';
  let ts = fs.createReadStream('./seeds/archive/yelp_business.csv');
  ts.on('data', function(chunk) {
    let lines = (buffer + chunk).split(/\r?\n/g);
    buffer = lines.pop();
    // let firstWordHolder = '';
    for (let i = 0; i < lines.length; ++i) {
      let line = inspect.inspect(lines[i]);
      let arrLine = line.split(',')[1];
      let newStr = arrLine.replaceAll("'", "").replaceAll('"', "");
      // let newStr1 = arrLine.replaceAll("'", "''").replaceAll('"', "");;
      let isFiltered = 0;
      ['hair','bycicle','motor','house','mouse','keyboard' ,'massage','hairdresser','barber','fishing','boat','church','school','auto','power'
      ,'mall','tour','dream','mart','clothing','board','ski','bath','bed', 'beauty', 'Studio', 'Police', 'Park' , 'Museum' , 'Nails' , 'Registration' , 'Home' , 'Dentist'
      , 'Professional' , 'Jewelers' , 'Vibratio' , 'University' , 'CrossFit' , 'Endodontics' , 'Service' , 'Swim' , 'Art' , 'Movers', 'Landscapes', 'Health'
      , 'Group'].map((key) => {
        if(newStr.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          isFiltered = 1;
        }
      })
      keywords.split(' ').map((key) => {
        if(newStr.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          isFiltered = 1;
        }
      })
      if(!obj[newStr] && !Number(newStr) && isFiltered === 0) {
        obj[newStr] = newStr
        fs.appendFileSync('./seeds/02_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr}', 'restaurant');\n`);
        // if(newStr !== newStr1) {
        //   fs.appendFileSync('./seeds/02_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr1}', 'restaurant');\n`);
        // }
      }
    }

  });

  ts.on('end', function() {
    console.log('ended on non-empty buffer: ' + inspect.inspect(buffer));
    allBooks();
  });
}

const allBooks = function() {
  let ts = fs.createReadStream('./seeds/archive/books_data.csv');
  ts.on('data', function(chunk) {
    let lines = (buffer + chunk).split(/\r?\n/g);
    buffer = lines.pop();
    // let firstWordHolder = '';
    for (let i = 0; i < lines.length; ++i) {
      let line = inspect.inspect(lines[i]);
      let arrLine = line.split(',')[0];
      let newStr = arrLine.replaceAll("'", "").replaceAll('"', "").replaceAll('`', "");
      if(newStr.indexOf('(') !== -1) {
        newStr = newStr.slice(0, newStr.indexOf('(')).trim();
      }
      // let newStr1 = arrLine.replaceAll("'", "''");
      if(!obj[newStr] && !Number(newStr)) {
        obj[newStr] = newStr;
        fs.appendFileSync('./seeds/04_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr}', 'book');\n`);
        // if(newStr !== newStr1) {
        //   fs.appendFileSync('./seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr1}', 'movie');\n`);
        // }
      }
    }

  });

  ts.on('end', function() {
    console.log('ended on non-empty buffer: ' + inspect.inspect(buffer));
    topBooks();
  });
};

const topBooks = function() {
  let ts = fs.createReadStream('./seeds/archive/books.csv');
  ts.on('data', function(chunk) {
    let lines = (buffer + chunk).split(/\r?\n/g);
    buffer = lines.pop();
    // let firstWordHolder = '';
    for (let i = 0; i < lines.length; ++i) {
      let line = inspect.inspect(lines[i]);
      let arrLine = line.split(',')[0];
      let newStr = arrLine.replaceAll("'", "").replaceAll('"', "").replaceAll('`', "");
      if(newStr.indexOf('(') !== -1) {
        newStr = newStr.slice(0, newStr.indexOf('(')).trim();
      }
      // let newStr1 = arrLine.replaceAll("'", "''");
      if(!obj[newStr] && !Number(newStr)) {
        obj[newStr] = newStr;
        fs.appendFileSync('./seeds/04_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr}', 'book');\n`);
        // if(newStr !== newStr1) {
        //   fs.appendFileSync('./seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr1}', 'movie');\n`);
        // }
      }
    }

  });

  ts.on('end', function() {
    console.log('ended on non-empty buffer: ' + inspect.inspect(buffer));
    foodItems();
    foodProducts();
    mcMenu();
  });
};

const foodProducts = function() {
  let ts = fs.createReadStream('./seeds/archive/calories.csv');
  ts.on('data', function(chunk) {
    let lines = (buffer + chunk).split(/\r?\n/g);
    buffer = lines.pop();
    // let firstWordHolder = '';
    for (let i = 0; i < lines.length; ++i) {
      let line = inspect.inspect(lines[i]);
      let arrLine = line.split(',')[1];
      let newStr = arrLine.replaceAll("'", "").replaceAll('"', "").replaceAll('`', "");
      if(newStr.indexOf('(') !== -1) {
        newStr = newStr.slice(0, newStr.indexOf('(')).trim();
      }
      // let newStr1 = arrLine.replaceAll("'", "''");
      if(!obj[newStr] && !Number(newStr)) {
        obj[newStr] = newStr;
        fs.appendFileSync('./seeds/05_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr}', 'product');\n`);
        // if(newStr !== newStr1) {
        //   fs.appendFileSync('./seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr1}', 'movie');\n`);
        // }
      }
    }

  });

  ts.on('end', function() {
    console.log('ended on non-empty buffer: ' + inspect.inspect(buffer));
  });
};

const foodItems = function() {
  let ts = fs.createReadStream('./seeds/archive/nutrition.csv');
  ts.on('data', function(chunk) {
    let lines = (buffer + chunk).split(/\r?\n/g);
    buffer = lines.pop();
    // let firstWordHolder = '';
    for (let i = 0; i < lines.length; ++i) {
      let line = inspect.inspect(lines[i]);
      let arrLine = line.split(',')[1];
      let newStr = arrLine.replaceAll("'", "").replaceAll('"', "").replaceAll('`', "");
      if(newStr.indexOf('(') !== -1) {
        newStr = newStr.slice(0, newStr.indexOf('(')).trim();
      }
      // let newStr1 = arrLine.replaceAll("'", "''");
      if(!obj[newStr] && !Number(newStr)) {
        obj[newStr] = newStr;
        fs.appendFileSync('./seeds/05_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr}', 'product');\n`);
        // if(newStr !== newStr1) {
        //   fs.appendFileSync('./seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr1}', 'movie');\n`);
        // }
      }
    }

  });

  ts.on('end', function() {
    console.log('ended on non-empty buffer: ' + inspect.inspect(buffer));
  });
};


const mcMenu = function() {
  let ts = fs.createReadStream('./seeds/archive/menu.csv');
  ts.on('data', function(chunk) {
    let lines = (buffer + chunk).split(/\r?\n/g);
    buffer = lines.pop();
    // let firstWordHolder = '';
    for (let i = 0; i < lines.length; ++i) {
      let line = inspect.inspect(lines[i]);
      let arrLine = line.split(',')[1];
      let newStr = arrLine.replaceAll("'", "").replaceAll('"', "").replaceAll('`', "");
      if(newStr.indexOf('(') !== -1) {
        newStr = newStr.slice(0, newStr.indexOf('(')).trim();
      }
      // let newStr1 = arrLine.replaceAll("'", "''");
      if(!obj[newStr] && !Number(newStr)) {
        obj[newStr] = newStr;
        fs.appendFileSync('./seeds/05_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr}', 'product');\n`);
        // if(newStr !== newStr1) {
        //   fs.appendFileSync('./seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr1}', 'movie');\n`);
        // }
      }
    }

  });

  ts.on('end', function() {
    console.log('ended on non-empty buffer: ' + inspect.inspect(buffer));
    aniCross('salesProd', 1);
    aniCross('accessories', 0);
    aniCross('art', 0);
    aniCross('bags', 0);
    aniCross('bottoms', 0);
    aniCross('construction', 0);
    aniCross('dress-up', 0);
    aniCross('fencing', 0);
    aniCross('fish', 1);
    aniCross('floors', 0);
    aniCross('headwear', 0);
    aniCross('housewares', 0);
    aniCross('insects', 1);
    aniCross('miscellaneous', 0);
    aniCross('other', 0);
    aniCross('recipes', 0);
    aniCross('shoes', 0);
    aniCross('socks', 0);
    aniCross('tools', 0);
    aniCross('tops', 0);
    aniCross('umbrellas', 0);
    aniCross('wall-mounted', 0);
  });
};


const aniCross = function(filePath, index) {
  let ts = fs.createReadStream(`./seeds/ani_crossing_archive/${filePath}.csv`);
  ts.on('data', function(chunk) {
    let lines = (buffer + chunk).split(/\r?\n/g);
    buffer = lines.pop();
    // let firstWordHolder = '';
    for (let i = 0; i < lines.length; ++i) {
      let line = inspect.inspect(lines[i]);
      let arrLine = line.split(',')[index];
      let newStr = arrLine.replaceAll("'", "").replaceAll('"', "").replaceAll('`', "");
      if(newStr.indexOf('(') !== -1) {
        newStr = newStr.slice(0, newStr.indexOf('(')).trim();
      }
      // let newStr1 = arrLine.replaceAll("'", "''");
      if(newStr.length !== 0 && !obj[newStr] && !Number(newStr)) {
        obj[newStr] = newStr;
        fs.appendFileSync('./seeds/06_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr}', 'product');\n`);
        // if(newStr !== newStr1) {
        //   fs.appendFileSync('./seeds/03_seeds.sql', `INSERT INTO data (name, category) VALUES ('${newStr1}', 'movie');\n`);
        // }
      }
    }

  });

  ts.on('end', function() {
    console.log('ended on non-empty buffer: ' + inspect.inspect(buffer));
  });
};

















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
