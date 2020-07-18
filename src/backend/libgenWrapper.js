var express = require('express');
var router = express.Router();
var  libgen = require('libgen');
var mcache = require('memory-cache');
const got = require("got")
const libgenUrl = 'http://gen.lib.rus.ec';

//get response generic method
async function getResponse(options){
    let data = await libgen.search(options, function(){});
    return data;
}
//override latest book api method by using latest book id api
async function getLastestBookApi(count = 10) {
    try {
      const mirror = 'http://libgen.is';
      const id = parseInt(await libgen.latest.id(mirror));
      let ids = [];
      for (let i = 0; i<count; i++){
        ids.push(id - i);
      }
      const url = `${mirror}/json.php?ids=${ids}&fields=*` //search api for multiple ids
      const response = await got(url)
      return JSON.parse(response.body);
    } catch (err) {
      console.dir(err)
      return []
    }
}

//Search Books Method accept q, category.

async function searchBooks(req) {
    let q = req.query.q;
    let category = reqvalidation.query.category;
    let cacheKey = `${q}_${category}`;
    let page = req.query.page || 0;
    if(page == 1){
        page = 0;
    }
    let responseData = mcache.get(cacheKey); //getting data from cache
    if(responseData){
        let pageCount = Math.ceil(responseData.length / 20);
        let count = responseData.length;
        responseData = responseData.slice(page * 10, (page * 10) + 20);
        let responseObj = {
            data: responseData,
            page: page,
            pageCount: pageCount,
            count: count
        }
        return responseObj;
    } else { //no data found in cache
        try {
            let options = {
                mirror: libgenUrl,
                query: q,
                search_in: category,
                count: 500,
                sort_by: 'year',
                reverse: true
            };
            let data = await getResponse(options);
            let n = data.length
            responseData = [];
            while (n--){
                let obj = {};
                obj.title = data[n].title;
                obj.author = data[n].author;
                obj.year = data[n].year;
                obj.desc = data[n].descr;
                obj.download = 'http://gen.lib.rus.ec/book/index.php?md5=' + data[n].md5.toLowerCase();
                responseData.push(obj);
            }
            mcache.put(cacheKey, responseData, 1000*60*60); //setting data in cache with 1 hr validate
            let count = responseData.length;
            let pageCount = Math.ceil(count / 20);
            responseData = responseData.slice(page * 20, (page * 20) + 20); //sending 20 response for per reques on the basis of page Number
            let responseObj = {
                data: responseData,
                page: page,
                pageCount: pageCount,
                count: count 

            }
            return responseObj;
        } catch (err) {
            return {};
        }
    }
}

async function getLatestBook() {
    try {
        let cacheKey = `latest_book`;
        let responseData = mcache.get(cacheKey); //get Latest Book from cache
        
        if(!responseData){
            let data = await getLastestBookApi();
            let n = data.length
            responseData = [];
            while (n--){
                let obj = {};
                obj.title = data[n].title;
                obj.author = data[n].author;
                obj.year = data[n].year;
                obj.desc = data[n].descr;
                obj.download = 'http://gen.lib.rus.ec/book/index.php?md5=' + data[n].md5.toLowerCase();
                responseData.push(obj);
            }
            mcache.put(cacheKey, responseData, 1000*60*30); //set Latest Book in cache with 30 mins validating
        }
        let responseObj = {
            data: responseData,
            page: 1,
            pageCount: 1,
            count: responseData.length
        }
        return responseObj;
    } catch (err) {
        console.error(err)
        return {};
    }
}



router.get('/', async function(req, res){ //search books routing
    const data = await searchBooks(req);
    res.json(data);
 });
 router.get('/latest', async function(req, res){ //latest books routing
     const data = await getLatestBook();
    res.json(data);
 });
module.exports = router;