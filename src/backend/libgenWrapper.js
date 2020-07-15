var express = require('express');
var router = express.Router();
var  libgen = require('libgen');
var mcache = require('memory-cache');

const libgenUrl = 'http://gen.lib.rus.ec';
async function getResponse(options){
    let data = await libgen.search(options, function(){});
    return data;
}

var cache = duration => {
    return (req, res, next) => {
        let key = '__bookgram__' + req.originalUrl || req.url;
        let cachedBody = mcache.get(key);
        if(cachedBody){
            res.send(cachedBody);
            return;
        } else {
            res.sendResponse = res.send
            res.send = (body) => {
                mcache.put(key, body, duration* 1000);
                res.sendResponse(body);
            }
            next();
        }
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
                reverse: false
            };
            let data = await getResponse(options);
            let n = data.length
            responseData = [];
            while (n--){
                let obj = {};
                obj.Title = data[n].title;
                obj.Author = data[n].author;
                obj.Year = data[n].year;
                obj.Download = 'http://gen.lib.rus.ec/book/index.php?md5=' + data[n].md5.toLowerCase();
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
        let options = {
            mirror: libgenUrl,
            count: 10,
            sort_by: 'year',
            reverse: false,
            fields: [
                "Title"
              ]
        };
        let data = await libgen.random.text(options);
        let n = data.length
        // console.log(data[0]);
        let responseData = [];
        while (n--){
            let obj = {};
            obj.Title = data[n].title;
            obj.Author = data[n].author;
            obj.year = data[n].year;
            obj.Download = 'http://gen.lib.rus.ec/book/index.php?md5=' + data[n].md5.toLowerCase();
            responseData.push(obj);
        }
        // console.log(responseData);
        return responseData;
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