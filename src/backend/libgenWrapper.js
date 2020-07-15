var express = require('express');
var router = express.Router();
var  libgen = require('libgen');
var mcache = require('memory-cache');
const got = require("got")
const libgenUrl = 'http://gen.lib.rus.ec';
async function getResponse(options){
    let data = await libgen.search(options, function(){});
    return data;
}

async function getLastestBookApi(count = 10) {
    try {
      const mirror = 'http://libgen.is';
      const id = parseInt(await libgen.latest.id(mirror));
      let ids = [];
      for (let i = 0; i<count; i++){
        ids.push(id - i);
      }
      const url = `${mirror}/json.php?ids=${ids}&fields=*`
      const response = await got(url)
      return JSON.parse(response.body);
    } catch (err) {
      console.dir(err)
      return []
    }
}



async function searchBooks(req) {
    let q = req.query.q;
    let category = req.query.category;
    let cacheKey = `${q}_${category}`;
    let page = req.query.page || 0;
    if(page == 1){
        page = 0;
    }
    let responseData = mcache.get(cacheKey);
    if(responseData){
        let pageCount = Math.ceil(responseData.length / 20);
        responseData = responseData.slice(page * 10, (page * 10) + 20);
        let responseObj = {
            data: responseData,
            page: page,
            pageCount: pageCount
        }
        return responseObj;
    } else {
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
            mcache.put(cacheKey, responseData, 24*1000*60*60);
            let pageCount = Math.ceil(responseData.length / 20);
            responseData = responseData.slice(page * 20, (page * 20) + 20);
            let responseObj = {
                data: responseData,
                page: page,
                pageCount: pageCount

            }
            return responseObj;
        } catch (err) {
            return {};
        }
    }
}

async function getLatestBook() {
    try {
        let data = await getLastestBookApi();
        let n = data.length
        let responseData = [];
        while (n--){
            let obj = {};
            obj.title = data[n].title;
            obj.author = data[n].author;
            obj.year = data[n].year;
            obj.desc = data[n].descr;
            obj.download = 'http://gen.lib.rus.ec/book/index.php?md5=' + data[n].md5.toLowerCase();
            responseData.push(obj);
        }
        
        let responseObj = {
            data: responseData,
            page: 1,
            pageCount: 1

        }
        return responseObj;
    } catch (err) {
        console.error(err)
        return [];
    }
}



router.get('/', async function(req, res){
    const data = await searchBooks(req);
    res.json(data);
 });
 router.get('/latest', async function(req, res){
     const data = await getLatestBook();
    res.json(data);
 });
module.exports = router;