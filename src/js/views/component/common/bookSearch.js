import {setDataToLocalStorge, getDataFromLocalStorage} from 'basePath/views/component/common/utilities';
export function SearchBooksFromCollections(key, type) {
    const booksObj = getDataFromLocalStorage('collections');
    let booksArr = [];
    if(booksObj){
        booksArr = [...booksObj.value];
    }
    if(booksArr.length > 0){
        let filteredArr = [];
        let n = booksArr.length
            
        while (n--){
            let keywords = []
            if(type=='title'){
                keywords = booksArr[n].titleTag;
            }else {
                keywords = booksArr[n].authorTag;
            }
            
            if(keywords.includes(key)){
                filteredArr.push(booksArr[n]);
            }
        }
        booksArr = filteredArr;
    }
    let searchObj = {
        data: booksArr,
        pageCount: 1,
        page: 1,
        count: booksArr.length
    }
    return searchObj;
}

export function SortBooks(sortKey, booksArr){
    if(booksArr.length > 0){
        let keyList = [];
        let keyMap = {};
        let n = booksArr.length
            
        while (n--){
            let key = booksArr[n][sortKey];
            if(!keyList.includes(key)){
                keyList.push(key);
                keyMap[key] = [booksArr[n]];
            } else {
                keyMap[key].push(booksArr[n]);
            }
        }
        keyList.sort();
        let sortedBookArr = [];
        for (let key of keyList){
            sortedBookArr = sortedBookArr.concat(keyMap[key]);
            
        }
        booksArr = sortedBookArr;
    }
    let searchObj = {
        data: booksArr,
        pageCount: 1,
        page: 1,
        count: booksArr.count

    }
    return searchObj;
}