const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('news.csv');

// Writing header
writeStream.write(`News \n`);

request('https://www.ndtv.com/latest', (error, response, html) => {
    if(!error && response.statusCode == 200)
    {
        const $ = cheerio.load(html);
        const pull = $('.new_storylising_contentwrap .nstory_header')
        pull.each((i, el) =>{
        //    const item = $(el).text().replace(/\s\s+/g, '');
           const item = $(el).find('a').text().replace(/,/, '').replace(/\s\s+/g, '');
           const link = $(el).find('a').attr('href');
           console.log(item, link);

           //Writing data(row) to csv file
           writeStream.write(`${item} \n`);
        });
    }
    
    console.log('completed!!');

});



